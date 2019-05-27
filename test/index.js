

var sinon = require('sinon');
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

// var Database = { save: function() {  },
// setupNewUser: function() {

// } }
// test here

// var spy = sinon.spy();

// //We can call a spy like a function
// spy('Hello', 'World');
// console.log(spy.firstCall.args); //output: ['Hello', 'World']


// it('should pass object with correct values to save only once', function() {
//     var info = { name: 'test' };
//     var expectedUser = {
//       name: info.name,
//       nameLowercase: info.name.toLowerCase()
//     };
//     var database = sinon.mock(Database);
//     database.expects('save').once().withArgs(expectedUser);
  
//     setupNewUser(info, function() { });
  
//     database.verify();
//     database.restore();
//   });

  