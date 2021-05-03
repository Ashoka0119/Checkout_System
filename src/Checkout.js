const { Receipt } = require('./Receipt');

class Checkout {
    constructor(catalogue,discountCatalogue) {
        this.catalogue = catalogue;
        this.discountCatalogue = discountCatalogue;
    }
    
    scan(products,level) {
        const receipt = new Receipt();
        try {
            products.forEach((cartQty,cartProduct)=>{
                var productDiscounts = this.discountCatalogue.getproductDiscount(cartProduct);
                    if(productDiscounts && level == productDiscounts[2] && cartQty >= productDiscounts[0]){
                        if(productDiscounts[3]){
                            var offerTotal = productDiscounts[1] * cartQty; 
                            receipt.addLineItem(cartProduct, cartQty, offerTotal);
                        } else {
                                var numberOfOfferMatches = Math.floor(cartQty / productDiscounts[0]);
                                var unmatchedItems = cartQty % productDiscounts[0];
                                var offerTotal = productDiscounts[1] * numberOfOfferMatches; 
                                if(unmatchedItems > 0)
                                offerTotal = offerTotal + (unmatchedItems * this.catalogue.getPriceOf(cartProduct))
                                receipt.addLineItem(cartProduct, cartQty, offerTotal);
                        }
                    } else {
                    var total = this.catalogue.getPriceOf(cartProduct)*cartQty;
                    var leveldiscount = this.discountCatalogue.getlevelDiscount(level);
                    var percent = leveldiscount * 0.01;
                    var discountTotal = total* percent;
                    var offerTotal = total - discountTotal;
                    receipt.addLineItem(cartProduct, cartQty,offerTotal );
                }
            })
        } catch (error) {
            console.log(error);
        }
        return receipt;
    }
}

module.exports = {
    Checkout,
};
