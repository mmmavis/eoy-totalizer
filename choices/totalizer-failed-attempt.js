// (function(){

  updateTotalizer(333);

  function updateTotalizer(newAmount) {
    console.log("==== updateTotalizer: "+ newAmount +" ====");
    var amtArray = splitIntoArray(newAmount);
    var currDigitLength = document.querySelectorAll("#amount .digit").length;
    var digitSlots = document.querySelectorAll("#amount .digit");
    var numUpdated = 0;

    // updating digits from the smallest to the largest
    // ie. from digit in ones and then digit in tens etc
    for (var i=0; i < amtArray.length; i++ ) {
      var slotIdxToUpdate = (currDigitLength-1)-numUpdated;
      var currSlot;
      if ( slotIdxToUpdate >= 0 ) {
        console.log("IF");
        digitSlots[slotIdxToUpdate].textContent = amtArray[i];
        currSlot = digitSlots[slotIdxToUpdate];
      } else {
        console.log("ELSE");
        document.querySelector("#amount").insertAdjacentHTML("afterbegin", "<div class='digit'>"+ amtArray[i] +"</div>");
        currSlot = document.querySelector("#amount .digit");
      }
      // add comma
      if ( i%3 == 2 && i != amtArray.length-1 ) {
        var prevSibling = currSlot.previousElementSibling;
        if ( !prevSibling || ( prevSibling && prevSibling.textContent != ',' ) ) {
          currSlot.insertAdjacentHTML("beforebegin", "<div class='comma'>,</div>");
        }
      }

      numUpdated++;
      // console.log(numUpdated);
    };

  }

  function splitIntoArray(amount) {
    console.log("==== splitIntoArray ====");
    var amtArray = [];
    while( amount ) {
      amtArray.push(amount%10);
      amount = Math.floor(amount/10);
    }
    console.log(amtArray);
    return amtArray;
  }

  function rollingEffect(slot, callback) {
    console.log("=======rollingEffect======");
    var y = 0;

    // window.setInterval(function() {
    //     $(slot).css("backgroundPosition", '0' + ' ' + ((-800)+y) + "px");
    //     y += y+50;
    // }, 300);

    $(slot).animate({
      backgroundPosition: "0 0"
    }, 2000, function(){
      // alert("hi");
    });

  }

// })();
