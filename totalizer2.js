var amountUI = document.querySelector(".odometer");
var balance = 76138;
var currVal = balance - (2000+Math.ceil(Math.random()*3000));

document.querySelector(".odometer").textContent = currVal;

var intervalID = setInterval(function(){
  currVal += parseInt((Math.random() * 100));
  console.log(currVal);
  if ( currVal <= balance ) {
    document.querySelector(".odometer").textContent = currVal;
  } else {
    console.log("don't update");
    killIt();
  }
}, 4000);


function killIt() {
  clearInterval(intervalID);
  console.log("killed")
}





