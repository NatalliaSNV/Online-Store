import { MainPageView } from 'MainPageView';
import { MainPageModel } from 'MainPageModel';
import { IProduct, IFilterData } from '../data/data';

export class ControllerMainPage {
    view: MainPageView;
    model: MainPageModel;

    constructor(view: MainPageView, model: MainPageModel) {
        this.view = view;
        this.model = model;
        this.view.bindAddDetailAddress(this.handleAddDetailAddress);
        this.view.bindRemoveCategory(this.handleRemoveCategory);
        this.view.bindAddCategory(this.handleAddCategory);
        this.view.bindRemoveBrand(this.handleRemoveBrand);
        this.view.bindAddBrand(this.handleAddBrand);
        this.view.bindChangeMinPrice(this.handleChangeMinPrice);
        this.view.bindChangeMaxPrice(this.handleChangeMaxPrice);
        this.view.bindChangeMinStock(this.handleChangeMinStock);
        this.view.bindChangeMaxStock(this.handleChangeMaxStock);
        this.displayMainPage(this.model.products, this.model.filter, 0, 0); //TODO 0, 0 временно, далее доработать логику и заменить переменными
    }

    handleAddDetailAddress = (cardNumber: number) => {
        window.location.hash = `details/${cardNumber + 1}`;
    };

    displayMainPage = (products: IProduct[], filter: IFilterData, totalCost: number, numProducts: number) => {
        this.view.renderPage(products, this.model.getProductsToShow(products, filter), filter, totalCost, numProducts);
    };

    handleRemoveCategory = (category: string) => {
        this.model.removeCategory(category);
    };

    handleAddCategory = (category: string) => {
        this.model.addCategory(category);
    };

    handleRemoveBrand = (brand: string) => {
        this.model.removeBrand(brand);
    };

    handleAddBrand = (brand: string) => {
        this.model.addBrand(brand);
    };

    handleChangeMinPrice = (minPrice: number) => {
        this.model.changeMinPrice(minPrice);
    };

    handleChangeMaxPrice = (maxPrice: number) => {
        this.model.changeMaxPrice(maxPrice);
    };

    handleChangeMinStock = (minStock: number) => {
        this.model.changeMinStock(minStock);
    };

    handleChangeMaxStock = (maxStock: number) => {
        this.model.changeMaxPrice(maxStock);
    };
}
