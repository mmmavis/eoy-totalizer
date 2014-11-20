// (function(){

  var TOTAL_ANIM_DURATION = 10 * 60; // in secs
  var PAUSE_SCHEDULE = 7 * 1000; // in milliseconds
  var RESUME_SCHEDULE = 5 * 1000; // in milliseconds

  var balance = 76138;
  var startPoint = balance - Math.ceil(Math.random()*2000);
  var countUpAnim;
  var intervalID;

  var amountUI = document.querySelector("#totalizer #amount");
  console.log("balance = " + balance);
  console.log("startPoint = " + startPoint);
  animation(amountUI, startPoint, balance, function() {
    console.log("animation callback===");
  });


  function animation(elem, startVal, endVal, duration) {
    countUpAnim = new countUp(
                            amountUI, // element to animate
                            startVal, // start value
                            endVal, // end value
                            0, // # of decimal
                            TOTAL_ANIM_DURATION // duration
                    );
    regularlyPause();
    countUpAnim.start(function() {
      countUpAnim = null;
      clearInterval(intervalID);
    });
  }

  function pauseAnim(){
    console.log("= pauseAnim =");
    countUpAnim.stop();
    setTimeout(resumeAnim, RESUME_SCHEDULE);
  }

  function resumeAnim() {
    console.log("= resumeAnim =");
    countUpAnim.resume();
  }

  function regularlyPause() {
    intervalID= setInterval(pauseAnim, PAUSE_SCHEDULE);
  }

// })();
