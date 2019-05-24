// function SuperType() {
//     this.property = true;
// }

// function SubType() {
//     this.subproperty = false;
// }

// SuperType.prototype.getSuperValue = function() {
//     return this.property;
// }


// // 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
// SubType.prototype = new SuperType(); 
// SubType.prototype.getSubValue = function() {
//     return this.subproperty;
// }

// var instance = new SubType();
// console.log(instance); // true

// ************

var sinon = require('sinon');

// $.ajax({
//     url: "https://shijiezhou.herokuapp.com/post"
// }).done(function( data ) {
//     console.log(data)
// });

// test here

var spy = sinon.spy();

//We can call a spy like a function
spy('Hello', 'World');
console.log(spy.firstCall.args); //output: ['Hello', 'World']