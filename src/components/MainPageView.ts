import '../styles/styleMainPage.scss';
import { IProduct, IFilterData, storeData } from '../data/data'; //TODO удалить storeData, когда это будет возможно
import { View } from './BaseView';
import createElement from '../modules/createElement';
import displayFilterCategory from '../modules/displayFilterCategory';
import displayFilterBrands from '../modules/displayFilterBrands';
//import { ControllerMainPage } from 'MainPageController';

export class MainPageView extends View {
    //app: HTMLElement | undefined;
    filters: HTMLElement;
    filtersWrapper: HTMLElement;
    goods: HTMLElement;
    top: HTMLElement;
    cards: HTMLElement;
    modelFilter1: HTMLElement;
    modelFilter2: HTMLElement;
    modelFilter3: HTMLElement;
    modelFilter3Name: HTMLElement;
    modelFilter3Main: HTMLElement;
    modelFilter3Text: HTMLElement;
    modelFilter4: HTMLElement;
    modelFilter4Name: HTMLElement;
    modelFilter4Main: HTMLElement;
    modelFilter4Text: HTMLElement;
    cardDiv: Array<HTMLElement>;

    constructor() {
        super();

        this.filters = createElement('div', 'filters');
        this.filtersWrapper = createElement('div', 'filters__wrapper');
        this.modelFilter1 = displayFilterCategory() as HTMLElement;
        this.modelFilter2 = displayFilterBrands() as HTMLElement;

        this.modelFilter3 = createElement('div', 'modelFilter');
        this.modelFilter3Name = createElement('div', 'modelFilter__name');
        this.modelFilter3Text = createElement('p', 'modelFilter__text');
        this.modelFilter3Text.textContent = 'Price';
        this.modelFilter3Main = createElement('div', 'modelFilter__main');

        this.modelFilter4 = createElement('div', 'modelFilter');
        this.modelFilter4Name = createElement('div', 'modelFilter__name');
        this.modelFilter4Text = createElement('p', 'modelFilter__text');
        this.modelFilter4Text.textContent = 'Stock';
        this.modelFilter4Main = createElement('div', 'modelFilter__main');

        this.goods = createElement('div', 'goods');
        this.top = createElement('div', 'top');

        this.cards = createElement('div', 'cards');
        this.cardDiv = [];
        for (let i = 0; i < storeData.total; i++) {
            this.cardDiv[i] = createElement('div', 'cardDiv');
            this.cardDiv[i].style.background = `url(${storeData.products[i].thumbnail})`;
            this.cardDiv[i].style.backgroundSize = 'cover';
            this.cardDiv[i].id = `${i}`;
            this.cards.append(this.cardDiv[i]);
        }

        // собираем страницу
        this.modelFilter3Name.append(this.modelFilter3Text);
        this.modelFilter4Name.append(this.modelFilter4Text);
        this.modelFilter3.append(this.modelFilter3Name, this.modelFilter3Main);
        this.modelFilter4.append(this.modelFilter4Name, this.modelFilter4Main);
        this.filtersWrapper.append(this.modelFilter1, this.modelFilter2, this.modelFilter3, this.modelFilter4);
        this.filters.append(this.filtersWrapper);
        this.goods.append(this.top, this.cards);
        this.mainWrapper.append(this.filters, this.goods);
    }

    bindAddDetailAddress(handler: (cardNumber: number) => void) {
        this.cards.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('cardDiv')) {
                const cardNumber = Number(target.id);
                handler(cardNumber);
            }
        });
    }

    bindRemoveCategory(handler: (category: string) => void) {
        // обработчик удаления категории

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler('category');
    }

    bindAddCategory(handler: (category: string) => void) {
        // обработчик выбора новой категории

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler('category');
    }

    bindRemoveBrand(handler: (brand: string) => void) {
        // обработчик удаления бренда

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler('brand');
    }

    bindAddBrand(handler: (brand: string) => void) {
        // обработчик выбора нового бренда

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler('brand');
    }

    bindChangeMinPrice(handler: (minPrice: number) => void) {
        // обработчик изменения минимальной цены

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler(0);
    }

    bindChangeMaxPrice(handler: (maxPrice: number) => void) {
        // обработчик изменения максимальной цены

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler(0);
    }

    bindChangeMinStock(handler: (minStock: number) => void) {
        // обработчик изменения минимального количества на складе

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler(0);
    }

    bindChangeMaxStock(handler: (maxStock: number) => void) {
        // обработчик изменения максимального количества на складе

        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;

        //         handler(category);
        //     }
        // })
        handler(0);
    }

    renderPage(
        products: IProduct[],
        productsFiltered: IProduct[],
        filter: IFilterData,
        totalCost: number,
        numProducts: number
    ) {
        //отрисовка MainPage

        this.renderHeader(totalCost, numProducts);
        this.renderFilters(products, filter);
        this.renderProductCards(productsFiltered);
        this.renderFooter();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    renderHeader(totalCost: number, numProducts: number) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    renderFilters(products: IProduct[], filter: IFilterData) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    renderProductCards(products: IProduct[]) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    renderFooter() {}
}
