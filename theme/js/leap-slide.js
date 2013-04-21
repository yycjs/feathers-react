/*!
 * Leap Slide
 * Copyright (c) 2013, Eric Kryski & David Luecke
 * All rights reserved.
 *
 * Swipe through slides with your muthaf*ckin' hands!!
 */
(function(){
  var stutterFixTimer;
  function stutterFix(callback, delay){
    clearTimeout(stutterFixTimer);
    stutterFixTimer = setTimeout(function(){
      callback();
    }, delay);
  }


  function detectSwipeDirection(gesture){
    if (gesture.state() === 'stop'){
      stutterFix(function(){
        var e = jQuery.Event("keydown");

        // TODO: Trigger 'swipeLeft' or 'swipeRight events'
        gesture.direction().x < 0 ? e.keyCode = 37 : e.keyCode = 39;
        $(document).trigger(e);
      }, 100);
    }
  }

  // Create a controller to connect to the Leap Motion
  var myController = new Leap.Controller("ws://localhost:6437/");

  // Create a listener
  var myListener = new Leap.Listener();

  // Listener.onFrame is called each time a frame is received
  myListener.onFrame = function(controller){
      var frame = controller.frame();
      var hands = frame.hands();
      var pointables = frame.pointables();
      var gestures = frame.gestures();
      
      if(gestures.length) {
        $.each(gestures, function(index, gesture){
          if (gesture.type() === 'swipe'){
            detectSwipeDirection(gesture);
          }
        });
      }
  };

  // Add the listener to the controller
  myController.addListener(myListener);

  // Enable the screenTap gesture
  myController.enableGesture("swipe", true);

  // Listener.onConnect is called when the connection is open
  myListener.onConnect = function(controller){
      console.log('LEAP Connected', controller);
  };
})();