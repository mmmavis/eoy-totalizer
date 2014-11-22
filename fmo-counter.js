(function() {

  var balance;
  var currVal;
  var totalizerUI = document.querySelector(".odometer");

  var STARTING_GAP_BASE = 2000;
  var STARTING_GAP_RANGE = 3000;
  var INITIAL_TICK_ADDI_BASE = 100;
  var INITIAL_TICK_ADDI_RANGE = 50;
  var INITIAL_TICK_DELAY = 1500; // in milliseconds
  var TICK_ADDI_BASE = 20;
  var TICK_ADDI_RANGE = 30;
  var TICKER_INTERVAL = parseInt(15000+Math.random()*15000); // in milliseconds
  console.log("ticks every " + (TICKER_INTERVAL/1000) + " secs");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "fmo-counter.json", true);
  xhr.onerror = function(error) {
    console.log("XMLHttpRequest error");
    console.log(error);
    hideTotalizer();
  };
  xhr.onload = function() {
    var paypalData;
    try {
      paypalData = JSON.parse(xhr.responseText);
    } catch(e) {
      console.log(e);
      hideTotalizer();
      return;
    }
    console.log(paypalData);
    if ( paypalData.amount ) {
      balance = paypalData.amount;
      currVal = setStartingTotal(parseInt(paypalData.lastAmount));
      console.log(currVal);
      totalizerUI.textContent = currVal;

      // initial tick, the animation starts soon after page load
      setTimeout(function(){
        updateNumber(INITIAL_TICK_ADDI_BASE, INITIAL_TICK_ADDI_RANGE);
      }, INITIAL_TICK_DELAY);

      // regularly ticks
      var countUpScheduler = setInterval(function() {
        updateNumber(TICK_ADDI_BASE, TICK_ADDI_RANGE);
        if ( currVal >= balance ) {
          console.log("don't update");
          clearInterval(countUpScheduler);
          console.log("killed scheduler");
        }
      }, TICKER_INTERVAL);

      function updateNumber(increBase, increRange) {
        currVal += parseInt(increBase+(Math.random()*increRange));
        console.log(currVal);
        if ( currVal < balance ) {
          totalizerUI.textContent = currVal;
        }
      }
    } else {
      hideTotalizer();
    }
  };
  xhr.overrideMimeType("application/json");
  xhr.send();

  // starting amount for the totalizer should be equal or greater than the previous real income we got from PayPal
  function setStartingTotal(lastRealAmount) {
    // randomly pick a number as the starting amount
    var startingTotal = balance - (STARTING_GAP_BASE+Math.ceil(Math.random()*STARTING_GAP_RANGE));
    if ( startingTotal < lastRealAmount ) {
      startingTotal = lastRealAmount;
    }
    return startingTotal;
  }

  function hideTotalizer() {
    document.querySelector("#totalizer").style.display = "none";
  }

})();
