;(function($) {

/*
    defaults = {
      orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
      startClosed : false,                    // start in a closed position
      firstSlide : 1,                         // displays slide (n) on page load

      theme : 'basic',                        // basic, dark, light, stitch or transparent
      rounded : false,                        // square or rounded corners
      rtl : false,                            // right to left layout
      showSlideNumbers : true,                // display numbers on slides

      responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
      scaleImages : true,                     // scales images to fit slide width and height
      horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
      horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value

      verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
      verticalHeight : 500,                   // base vertical accordion height; fixed (px [integer])
      verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

      activateOn : 'click',                   // click or mouseover
      touchEnabled : true,                    // touch events?
      onSlideOpen : function() {},            // callback on slide open
      onSlideClose : function() {},           // callback on slide animation complete

      autoPlay : false,                       // automatically cycle through slides
      cycleSpeed : 6000,                      // time between slide cycles
      slideSpeed : 800,                       // slide animation speed
      easing : 'ease-in-out',                 // animation easing

      pauseOnHover : true,                    // pause on hover
      linkable : false                        // link slides via hash
    };
*/






  var demo = $('#demo'),
      selects = $('.options select'),
      easing = $('#easing'),
      easingFn,
      outputToggle = $('.output h2 a'),
      resetBtn = $('#reset'),
      options,

      update = function() {
        var defaults = demo.accordionPro('debug').defaults;
          // reset 'global' options obj
          options = {};

          // set new opts
          selects.each(function() {
            var current = this.value,
            value;

            if (!isNaN(parseInt(current, 10))) {
              value = parseInt(current, 10);
            } else if (current === 'custom') {
                // value = parseInt($(this).next().val(), 10);
                value = $(this).next().val();
              } else if (current === 'true') {
                value = true;
              } else if (current === 'false') {
                value = false;
              } else {
                value = current;
              }

              if (defaults[this.name] !== value) {
                options[this.name] = value;
              }
            });

            // destroy and create new accordion with new opts
            demo.accordionPro('destroy').accordionPro(options);

            // output settings to textarea
            $('.output textarea').text('$("#yourAccordion").accordionPro(' + JSON.stringify(options) + ');');
          },

          reset = function() {
            options = {};

            selects.each(function() {
              $(this).children().eq(0).attr('selected', true);
            });

            $('.options').find('input[type=text]').remove();
            easing.find('option[value=swing]').attr('selected', true);

            demo.accordionPro('destroy');
            demo.accordionPro();

            $('.output textarea').text('$("#yourAccordion").accordionPro();');
          };
/*
    // create easing select options from plugin
    for (easingFn in $.easing) {
      if (easingFn !== 'def') {
        easing.append($('<option value="' + easingFn + '">' + easingFn +'</option>')); // should use a frag, cba tho.
      }
    }

    easing.find('option[value=swing]').attr('selected', true);
*/

    // init accordion
    demo.accordionPro();

    // get new options on change event
    selects.change(function() {
      this.value === 'custom' ? $(this).after('<input type="text" />') : update();
    });

    // new opts on enter
    $(window).keyup(function(e) {
      if (e.keyCode === 13) update();
    });

    // reset
    resetBtn.click(function(e) {
      reset();
      e.preventDefault();
    });

    // show/hide code output
    outputToggle.click(function(e) {
      $(this).parent().next().slideToggle();
      e.preventDefault();
    });

  })(jQuery);