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

const axios = require('axios');

axios.get('https://shijiezhou.herokuapp.com/rss.xml').then(()=>{
    console.log('work!')
});