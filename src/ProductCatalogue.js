class ProductCatalogue {
    constructor() {
        this.priceList = new Map();
    }

    setPriceOf(product, price) {
        this.priceList.set(product, price);
    }

    getPriceOf(product) {
        return this.priceList.get(product);
    }

    reset() {
        this.priceList.clear();
    }
}

module.exports = {
    ProductCatalogue,
};
