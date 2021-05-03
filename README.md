# Checkout-System

This repository contains code for Checkout system that can scan articles from a shopping cart and produce a receipt. 

This system has a catalogue with different types of products (Kone,Ironhide Catridge,..). 
Each product has a price, and the total price of the shopping cart is the total of all the prices.

This system also runs on special deals, for example:
 - Price drops for selected products
 - Buy 2 get 3
 - level discounts


### Goal

The goal of the exercise is to implement a `Checkout`to offer different amount of discount for different level of recipients: 

	- Different levels of target audience should get offered different Discounts
		•	Associate, get 5% discount on all non-promotional items
		•	Diamond, get 20% discount on all non-promotional items
	- Special pricing rules shouldbe applied for selected level target audience
		•	Diamond
			1.	Get a discount on Kone where 3 or more purchased. The price dropped to RM 2588.99 per unit
			2.	Get a 3 for 2 deal on Ironhide Cartridge
	- For item that does not meet the special pricing rules will still be considered as non-promotional items.
	- The Products, Levels , Discount can be added/edited/removed upon requirement


### Running the tests

The tests under `spec` directory are written using [Mocha](https://mochajs.org/) test framework 
and [Chai](http://chaijs.com/) assertion library. 
They are configured to use Chai's [`expect`](http://chaijs.com/api/bdd/) assertion style and can be executed as follows:

 - download the Checkout-System folder
 - run command npm install
 - run command npm run test
