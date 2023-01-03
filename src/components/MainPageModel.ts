import { storeData, IProduct, IFilterData } from '../data/data';

export class MainPageModel {
    products: IProduct[];
    filter: IFilterData;
    onChangeModel: any;

    constructor() {
        this.onChangeModel = () => {
            return undefined;
        };
        this.products = storeData.products;
        this.filter = {
            categories: [],
            brands: [],
            minPrice: null,
            maxPrice: null,
            minStock: null,
            maxStock: null,
            search: '',
            sort: '',
        };
    }

    addRemoveCategory(category: string) {
        if (this.filter.categories.includes(category)) {
            this.filter.categories = this.filter.categories.filter((cur) => cur !== category);
            //console.log('remove', this.filter.categories);
        } else {
            this.filter.categories.push(category);
            //console.log('add', this.filter.categories);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        //console.log('add category filter:');
    }

    addRemoveBrand(brand: string) {
        if (this.filter.brands.includes(brand)) {
            this.filter.brands = this.filter.brands.filter((cur) => cur !== brand);
            //console.log('remove', this.filter.categories);
        } else {
            this.filter.brands.push(brand);
            //console.log('add', this.filter.categories);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        //console.log('add category filter:');
    }

    changeMinPrice(minPrice: number) {
        this.filter.minPrice = minPrice;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    changeMaxPrice(maxPrice: number) {
        this.filter.maxPrice = maxPrice;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    changeMinStock(minStock: number) {
        this.filter.minStock = minStock;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    changeMaxStock(maxStock: number) {
        this.filter.maxStock = maxStock;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    // filter products

    filterByCategory(products: IProduct[], categories: string[]) {
        if (categories.length === 0) return products;
        const productsFiltered: IProduct[] = [];
        this.products.map((cur) => {
            for (const currentCategory of categories) {
                if (cur.category === currentCategory) {
                    // console.log('match');
                    productsFiltered.push(cur);
                }
            }
        });
        //console.log('filterByCategory productsFiltered', productsFiltered);
        return productsFiltered;
    }

    filterByBrand(products: IProduct[], brands: string[]) {
        console.log('filterBrand brands', brands);
        console.log('filterBrand products', products);
        if (brands.length === 0) return products;
        const productsFiltered: IProduct[] = [];
        this.products.map((cur) => {
            for (const currentBrand of brands) {
                if (cur.brand === currentBrand) {
                    // console.log('match');
                    productsFiltered.push(cur);
                }
            }
        });
        console.log('filterBrand productsFiltered', productsFiltered);
        return productsFiltered;
    }

    filterPrice(products: IProduct[], minPrice: number | null, maxPrice: number | null) {
        if (minPrice === null && maxPrice === null) return products;
        const productsFiltered = this.products.filter((cur) => {
            if (minPrice === null && maxPrice !== null) {
                cur.price <= maxPrice;
            } else if (maxPrice === null && minPrice !== null) {
                cur.price >= minPrice;
            } else if (maxPrice !== null && minPrice !== null) {
                cur.price >= minPrice && cur.price <= maxPrice;
            }
        });
        return productsFiltered;
    }

    filterStock(products: IProduct[], minStock: number | null, maxStock: number | null) {
        if (minStock === null && maxStock === null) return products;
        const productsFiltered = this.products.filter((cur) => {
            if (minStock === null && maxStock !== null) {
                cur.stock <= maxStock;
            } else if (maxStock === null && minStock !== null) {
                cur.stock >= minStock;
            } else if (maxStock !== null && minStock !== null) {
                cur.stock >= minStock && cur.stock <= maxStock;
            }
        });
        return productsFiltered;
    }

    getProductsToShow(products: IProduct[], filter: IFilterData) {
        // return this.filterStock(
        //     this.filterPrice(
        //         this.filterBrand(this.filterByCategory(products, filter.categories), filter.brands),
        //         filter.minPrice,
        //         filter.maxPrice
        //     ),
        //     filter.minStock,
        //     filter.maxStock
        // );
        const productFilteredByCategory: IProduct[] = this.filterByCategory(products, filter.categories);
        const productFilteredByBrand: IProduct[] = this.filterByBrand(products, filter.brands);
        const productFiltered: IProduct[] = [];
        productFilteredByCategory.map((itemCategory) => {
            productFilteredByBrand.map((itemBrand) => {
                if (itemBrand === itemCategory) {
                    productFiltered.push(itemBrand);
                }
            });
        });
        return productFiltered;
    }

    bindChangeModel(
        callback: (products: IProduct[], filter: IFilterData, totalCost: number, numProducts: number) => void
    ) {
        this.onChangeModel = callback;
    }
}
