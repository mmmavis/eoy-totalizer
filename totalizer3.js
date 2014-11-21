var amountUI = $("#counter");
var balance = 76138;
var currVal = balance - (2000+Math.ceil(Math.random()*3000));

var clock = $('#counter').FlipClock(currVal, {
  clockFace: 'Counter'
});
addComma();

var increment;
var ticker;
createTicker();

function createTicker() {
  ticker =  setInterval(function(){
            if ( currVal <= balance ) {
              clock.increment();
              currVal++;
              console.log("currVal = " + currVal );
              addComma();
            } else {
              console.log("don't update");
              killScheduler(ticker);
              killScheduler(pauser);
            }
          }, 100);
}

var pauser =  setInterval(function(){
                killScheduler(ticker);
                setTimeout(createTicker, parseInt(1500+Math.random()*6000));
              }, 10000);

function addComma() {
  var slots = $(".flip.play");
  var length = slots.length;
  $(".comma").remove();
  $(".flip.play:nth-last-child(3)").not(":first-child").before("<div class='comma'>,</div>");
}

function killScheduler(intervalID) {
  if ( intervalID ) {
    clearInterval(intervalID);
    console.log("killed");
  }
}



