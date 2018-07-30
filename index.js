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