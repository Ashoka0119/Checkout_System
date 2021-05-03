const { expect } = require('./expect');

const { Checkout, Product, ProductCatalogue, Level, Discount} = require('../src');

describe('Checking out articles at the supermarket', () => {
    //configure new products to system here
    const
        Kone   = new Product('Kone'),
        IronhideCartridge  = new Product('Ironhide Cartridge')
    
        //configure new levels to system here
    const
        Associate   = new Level('Associate'),
        Diamond  = new Level('Diamond')
       
    const catalogue = new ProductCatalogue();
    const discountCatalogue = new Discount();
    
    /*configure prices, level dicounts, product discounts here */
    beforeEach(() => {
        catalogue.setPriceOf(Kone, 3488.99);
        catalogue.setPriceOf(IronhideCartridge, 529.99);
        discountCatalogue.setproductDiscount(Kone, 3, 2588.99, Diamond,true);
        discountCatalogue.setproductDiscount(IronhideCartridge, 3, 2*catalogue.getPriceOf(IronhideCartridge),Diamond,false);
        discountCatalogue.setlevelDiscount(Associate,5);
        discountCatalogue.setlevelDiscount(Diamond,20);
    });

    afterEach(() => {
    catalogue.reset();
    discountCatalogue.reset();
    });

    describe(`The receipt`, () => {

        it(`should show the total price of RM 0 when the shopping cart is empty`, () => {
            const checkout = new Checkout(catalogue,discountCatalogue);
            var cart = new Map();
                cart.set(Kone,0);
            const receipt = checkout.scan(cart,Associate);

            expect(receipt.totalPrice()).to.equal(0);
        });

        describe(`with no special offers`, () => {

            it(`Level Discount should get applied when no promotional discount`, () => {
                var cart = new Map();
                cart.set(Kone,2);
                cart.set(IronhideCartridge,1);
                const checkout = new Checkout(catalogue,discountCatalogue);
               
                const receipt = checkout.scan(cart,Associate);
                console.log("Test 2: "+receipt.totalPrice());
                //expect(receipt.totalPrice().toFixed(2)).to.equal('6977.98');
                expect(receipt.totalPrice().toFixed(2)).to.equal('7132.57');
            });

            it(`Promotional discount shound not be applied for not configured levels instead level discount should get applied`, () => {
                var cart = new Map();
                cart.set(Kone,4);
                const checkout = new Checkout(catalogue,discountCatalogue);
               
                const receipt = checkout.scan(cart,Associate);
                console.log("Test 2: "+receipt.totalPrice());
                // expect(receipt.totalPrice().toFixed(2)).to.equal('10355.96');
                expect(receipt.totalPrice().toFixed(2)).to.equal('13258.16');
            });

        });

        describe(`one with promotional deal and one with level discount`, () => {
            it(`Promotional discount applied to product with get  3 for 2 deal`, () => {
                var cart = new Map();
                cart.set(Kone,1);
                cart.set(IronhideCartridge,4);
                const checkout = new Checkout(catalogue,discountCatalogue);
               
                const receipt = checkout.scan(cart,Diamond);
                console.log("Test 2: "+receipt.totalPrice());
                expect(receipt.totalPrice().toFixed(2)).to.equal('4381.16');
            });
        });

        describe(`one with pricedrop and one with no promotional offer`, () => {
            it(`Promotional discount applied to product with offer and level discount applied to product with no offer`, () => {
                var cart = new Map();
                cart.set(Kone,4);
                cart.set(IronhideCartridge,1);
                const checkout = new Checkout(catalogue,discountCatalogue);
               
                const receipt = checkout.scan(cart,Diamond);
                console.log("Test 2: "+receipt.totalPrice());
                expect(receipt.totalPrice().toFixed(2)).to.equal('10779.95');
            });
        });
    });
});
