// -----------------------------
// Unfortunately, while ES6 support is not yet fully released in
// production to online platforms like Heroku, this file should stay
// in ES5 until then. Sorry!
//
// It has to stay in ES5 right now because our node code isn't passed
// through the transpiler -- Babel -- in this package.json setup.
// -----------------------------

var mocha = require('mocha'),
    chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;

//--- your setup code goes here (i.e. create test instances of your Constructors)
// var Person = require('../Person.js').Person;
//--- your setup code goes above here


//--- example tests
describe("Array", function(){ // a Constructor name
    describe("#indexOf()", function(){ // a method of said Constructor
        it("should return -1 when the value is not present", function(){
            expect([1,2,3].indexOf(5)).to.equal(-1);
            expect([1,2,3].indexOf(0)).to.equal(-1);
        })
    })
})

//--- your tests go here
