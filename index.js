/**
 * This file is used for the personal
 *
 * @summary Write a description for the file
 * @author Shijie Zhou
 *
 * Created at     : 2018-08-20 07:11:18 
 * Last modified  : 2018-08-20 07:11:51
 */

var firebaseinput = document.getElementById("firebaseinput");
var firebasebutton = document.getElementById("firebasebutton");
var firebasebutton2 = document.getElementById("firebasebutton2");

function setValue(){
  var firebaseRef = firebase.database().ref();  
  var textFirst = firebaseinput.value;
  firebaseRef.push("ok").set(textFirst);
}

function delValue(){
  var firebaseRef = firebase.database().ref();
  firebaseRef.child("ok").remove();
}