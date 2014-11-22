(function() {

  var totalizerUI = document.querySelector(".odometer");
  var balance;
  var currVal;
  // var balance = 134875;
  // var currVal = balance - (2000+Math.ceil(Math.random()*3000));
  var TICKER_INTERVAL = parseInt(15000+Math.random()*15000);
  console.log("ticks every " + (TICKER_INTERVAL/1000) + " secs");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "fmo-counter.json", true);
  xhr.onload = function () {
    var paypalData = xhr.responseText;
    console.log(paypalData);
    balance = paypalData.amount;
    currVal = balance - (2000+Math.ceil(Math.random()*3000));

    totalizerUI.textContent = currVal;

    // initial tick
    setTimeout(function(){
      updateNumber(100, 50);
    }, 1500);

    // regularly ticks
    var countUpScheduler = setInterval(function() {
      updateNumber(30, 20);
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
  };
  xhr.overrideMimeType("application/json");
  xhr.send();

})();
