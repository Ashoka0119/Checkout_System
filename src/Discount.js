class Discount {
    constructor() {
        this.productDiscount = new Map();
		this.levelDiscount = new Map();
    }

    setproductDiscount(product,qty,price,level,isPriceDrop) {
        this.productDiscount.set(product,[qty,price,level,isPriceDrop]);
    }

    getproductDiscount(product) {
        return this.productDiscount.get(product);
    }

	setlevelDiscount(level,percent) {
        this.levelDiscount.set(level,percent);
    }

    getlevelDiscount(level) {
        return this.levelDiscount.get(level);
    }

    reset() {
		this.levelDiscount.clear();
        this.productDiscount.clear();
    }
}

module.exports = {
    Discount,
};

