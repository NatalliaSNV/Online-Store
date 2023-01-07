import { IProduct, IStoreData, storeData } from '../data/data';
import getCartItems from '../utils/getCartItems';
import { ICartLot, ICode, IModalData, IPlug, ISumm } from '../styles/types';
import _notANull from '../utils/notANull';
export class CartPageModel {
    products: IProduct[];
    cartLots: ICartLot[];
    cartView: ICartLot[];
    storeData: IStoreData;
    onChangeModel!: CallableFunction;
    plug: IPlug;
    summaryVars: ISumm;
    AvailableCodes: ICode[];
    modalDate: IModalData;

    constructor() {
        _notANull();
        this.AvailableCodes = [
            { title: 'AN', description: 'Andrey`s code', discount: 10 },
            { title: 'NA', description: 'Nat`s code', discount: 10 },
        ];
        this.plug = {
            limit: 3,
            page: 1,
            startNumberID: 1,
        };
        this.summaryVars = {
            countItems: 0,
            priceTotal: 0,
            priceWithCodes: 0,
            codes: [
                { title: 'AN', description: 'Andrey`s code', discount: 10 },
                { title: 'NA', description: 'Nat`s code', discount: 10 },
            ],
        };
        this.modalDate = {
            state: false,
            name: '',
            phone: '',
            address: '',
            mail: '',
            cardNumber: NaN,
            cardType: '',
            cardValid: NaN,
            cardCVV: NaN,
        };
        this._getStartNumber(this.plug);
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.cartView = [];
        this._getCartView(this.plug);
        this._getSummaryVars();
        this.storeData = storeData;
        this.products = storeData.products;
        //this.updateURL();
    }
    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    commit(cartLots: ICartLot[], products: IProduct[]) {
        this._getSummaryVars();
        this._getStartNumber(this.plug);
        this._getCartView(this.plug);
        this._checkEmptyArray();
        localStorage.cart = JSON.stringify(cartLots);
        this.onChangeModel(this.cartView, products, this.plug, this.summaryVars, this.modalDate);
    }
    _getCartView = (plug: IPlug) => {
        if (this.cartLots.length > plug.limit) {
            this.cartView = this.cartLots.slice((plug.page - 1) * plug.limit, plug.page * plug.limit);
        } else this.cartView = this.cartLots;
    };
    _getStartNumber = (plug: IPlug) => {
        this.plug.startNumberID = plug.page * plug.limit - plug.limit + 1;
    };

    _checkEmptyArray = () => {
        if (this.cartLots !== undefined && this.cartLots.length !== 0) {
            while (this.cartView.length === 0) {
                this.plug.page -= 1;
                this._getCartView(this.plug);
            }
        }
    };
    _getSummaryVars = () => {
        const count = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.count, 0);
        };
        const priceTotal = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.price * obj.count, 0);
        };
        const priceWithCodes = () => {
            return (priceTotal() * (100 - this._discountSummary()) * 0.01).toFixed(2);
        };

        this.summaryVars.countItems = count();
        this.summaryVars.priceTotal = priceTotal();
        this.summaryVars.priceWithCodes = +priceWithCodes();
    };
    _discountSummary = () => {
        const arr: ICode[] = this.summaryVars.codes;
        if (arr.length > 0) {
            return arr.reduce((acc, obj) => acc + obj.discount, 0);
        } else return 0;
    };
    // updateURL() {
    //     if (history.pushState) {
    //         const baseUrl = window.location;
    //         const newUrl = baseUrl + `?limit:${this.plug.limit}&page:${this.plug.page}`;
    //         history.pushState(null, 'null', newUrl);
    //     } else {
    //         console.warn('History API не поддерживается');
    //     }
    // }

    handleCardItemIncrement(productId: number) {
        let maxCount: number;
        this.products.forEach((obj) => {
            if (obj.id === productId) {
                maxCount = obj.stock;
            }
        });
        this.cartLots.forEach((obj) => {
            if (obj.id === productId && obj.count < maxCount) {
                obj.count += 1;
            }
            return obj;
        });

        this.commit(this.cartLots, this.products);
    }
    handleCardItemDecrement(productId: number) {
        const _tempArray = this.cartLots
            .map((obj) => {
                if (obj.id === productId) {
                    if (obj.count > 1) {
                        obj.count -= 1;
                    } else {
                        return '';
                    }
                }
                return obj;
            })
            .filter((obj) => {
                return obj !== '';
            });
        if (this.cartView.length === 1) {
            this.plug.page -= 1;
        }
        this.cartLots = _tempArray as ICartLot[];
        this.commit(this.cartLots, this.products);
    }

    bindGetCartItems() {
        getCartItems();
    }
    handlePageIncrement() {
        if (this.cartLots.length > this.plug.page * this.plug.limit) {
            this.plug.page += 1;
        }
        this.commit(this.cartLots, this.products);
    }

    handlePageDecrement() {
        if (this.plug.page > 1) {
            this.plug.page -= 1;
        }
        this.commit(this.cartLots, this.products);
    }
    handleLimitChanged(limit: number) {
        this.plug.limit = limit;
        if (this.cartLots.length <= this.plug.limit) {
            if (this.plug.page > 1) {
                this.plug.page -= 1;
            }
        }
        this.commit(this.cartLots, this.products);
    }
    handleCodeEntrances(codeValue: string) {
        let check = true;
        this.summaryVars.codes.map((val) => {
            if (val.title === codeValue) {
                check = false;
            }
        });
        if (check == true) {
            this.AvailableCodes.map((obj) => {
                if (obj.title === codeValue) {
                    this.summaryVars.codes.push(obj);
                }
            });
        }
        this.commit(this.cartLots, this.products);
    }
    handleCodeDrop(dropTitle: string) {
        this.summaryVars.codes = this.summaryVars.codes.filter((val) => {
            if (val.title !== dropTitle) {
                return val;
            }
        });
        this.commit(this.cartLots, this.products);
    }
    handleOpenModalWindow() {
        this.modalDate.state = true;
        this.commit(this.cartLots, this.products);
    }
    handleCloseModalWindow() {
        this.modalDate.state = false;
        this.commit(this.cartLots, this.products);
    }
    //todo
    handleName(value: string) {
        const letters = /^[A-Za-z\s]+$/;
        if (letters.test(value)) {
            this.modalDate.name = value;
        } else {
            this.modalDate.name = 'error';
            console.log('error');
        }
        this.commit(this.cartLots, this.products);
    }
    handlePhone(value: string) {
        const numbers = /^[+0-9()\s]+$/;
        if (numbers.test(value)) {
            this.modalDate.phone = value;
        } else {
            this.modalDate.phone = 'error';
            console.log('error', value);
        }
        this.commit(this.cartLots, this.products);
    }
    handleAddress(value: string) {
        const letters = /^[0-9a-zA-Z\s,.]+$/;
        if (letters.test(value)) {
            this.modalDate.address = value;
        } else {
            this.modalDate.address = 'error';
            console.log('error');
        }
        this.commit(this.cartLots, this.products);
    }
    handleMail(value: string) {
        const letters = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        if (letters.test(value)) {
            this.modalDate.mail = value;
        } else {
            this.modalDate.mail = 'error';
            console.log('error');
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardNumber(value: string) {
        const letters = /\d{4}([-]|)\d{4}([-]|)\d{4}([-]|)\d{4}/;
        if (letters.test(value)) {
            this.modalDate.cardNumber = +value;
            switch (value[0]) {
                case '4':
                    this.modalDate.cardType = '../sources/icons/card/visa.png';
                    break;
                case '5':
                    this.modalDate.cardType = '../sources/icons/card/mastercard.png';
                    break;
                case '3':
                    this.modalDate.cardType = '../sources/icons/card/american-express.png';
                    break;
                case '1':
                    this.modalDate.cardType = '../sources/icons/card/paypal.png';
                    break;
                default:
                    this.modalDate.cardType = '../sources/icons/card/unistream.png';
            }
        } else {
            this.modalDate.cardNumber = 0;
            console.log('error');
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardValid(value: string) {
        const letters = /^[0-9]+$/;
        if (letters.test(value)) {
            this.modalDate.cardValid = +value;
        } else {
            this.modalDate.cardValid = 0;
            console.log('error');
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardCVV(value: string) {
        const letters = /^[0-9]+$/;
        if (letters.test(value)) {
            this.modalDate.cardCVV = +value;
        } else {
            this.modalDate.cardCVV = 0;
            console.log('error');
        }
        this.commit(this.cartLots, this.products);
    }
    handleConfirmButton() {
        this.commit(this.cartLots, this.products);
    }
}
