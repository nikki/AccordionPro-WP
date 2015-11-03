/*!
 * Test for CSS3 Transitions
 * http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
 */

function supportsTransitions() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }

    return false;
}

function getPrefixed(prop){
    var i, s = document.createElement('p').style, v = ['ms','O','Moz','Webkit'];
    if( s[prop] == '' ) return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for( i = v.length; i--; )
        if( s[v[i] + prop] == '' )
            return (v[i] + prop);
}

/*!
 * jQuery Animate -> CSS3 Transitions
 * http://addyosmani.com/blog/css3transitions-jquery/
 */

;(function($) {
  $.fn.extend({
    defaultAnimate: $.fn.animate,
    animate: function(props, speed, easing, callback) {
      var options = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: callback || !callback && easing || jQuery.isFunction( speed ) && speed,
            duration: speed,
            easing: callback && easing || easing && !jQuery.isFunction(easing) && easing
          };

      return $(this).each(function() {
        var $this = $(this), easing, prefix;

          // check if transitions supported; only animate parent accordion element or slide list items
          if (supportsTransitions() && ($this.hasClass('accordionPro') || $this.hasClass('slide'))) {

            // set default css easing function
            easing = options.easing || 'ease-in-out';

            // get prefix
            prefix = (getPrefixed('transition').replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-'));

            // animate with css transitions
            $this.css(prefix, 'all ' + speed / 1000 + 's ' + easing).css(props);

            // callback
            setTimeout(function() {
              $this.css(prefix);
              if ($.isFunction(options.complete)) {
                options.complete();
              }
            }, speed);
          }
          else {
            // set default jQuery easing function
            options.easing = 'swing';

            // animate with jQuery
            $this.defaultAnimate(props, options);
          }
      })
    }
  });
})(jQuery);

/*!
 * Plugin Name:    Accordion Pro JS - a responsive accordion plugin for jQuery
 * Plugin URI:     http://stitchui.com/accordion-pro-js/
 * Version:        2.0.2
 * Author:         Nicola Hibbert
 * Author URI:     http://stitchui.com
 *
 * Copyright:      (c) 2011-2015 Stitch UI
 */
;(function($) {

  function AccordionPro(elem, options) {

    /**
     * Merge defaults with options in new settings object
     */

    var settings = $.extend(true, {}, this.defaults, options);


    /**
     * "Globals"
     */

    var $window = $(window),
        parent = { w : 0, h : 0 },
        slides = elem.children('ol').children('li'),
        slide = { w : 0, h : 0, l : 0 },
        tabs = slides.children(':first-child'),
        tab = { w : 0, h : settings.tab.size },
        panels = tabs.next(),
        border = 0,
        offset = 0,
        padding = 0,
        tabBorder = 0,
        horizontal = settings.orientation === 'horizontal' ? 1 : 0,
        easing = 'ease-in-out',
        fitToContent = !horizontal && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent'),
        touch = !!('ontouchstart' in window),
        sheet;


    /**
     * PLUGIN HELPERS
     */

    /**
     * Finds the accordion stylesheet
     */

    (function findStyleSheet() {
      var sheets = document.styleSheets,
          safeList = [];

      for (var i in sheets) { // stylesheet must be on same domain
        if (sheets[i].href && sheets[i].href.indexOf(window.location.origin) >= 0) {
          // list of same origin stylesheets
          safeList.push(i);

          // find accordion stylesheet
          if (sheets[i].href.indexOf('accordionpro') >= 0) {
            sheet = sheets[i];
            return;
          }
        }
      }

      if (!sheet) { // can't find the accordion stylesheet?
        // get the first from the safe list
        sheet = sheets[safeList.pop()];
      }
    })();


    /**
     * Convenience method for adding CSS rules to stylesheet
     * (One of the few instances where IE's syntax makes more sense!)
     */

    function addRule(selector, rules) {
      if (!sheet) return;

      if ('insertRule' in sheet) {
        sheet.insertRule(selector + '{' + rules + '}', (sheet.cssRules ? sheet.cssRules.length : 0));
      } else if ('addRule' in sheet) {
        sheet.addRule(selector, rules, (sheet.rules ? sheet.rules.length : 0));
      }
    }
    /**
     * SETUP PLUGIN
     */

    var setup = {

      /**
       * Backwards compatibility
       */

      backwardsCompatibility: function() {
        // remove span from old versions
        tabs.each(function() {
          var $this = $(this);
          if ($this.children().length) {
            $this.text($this.children().text());
          }
        });

        // theme
        if (settings.theme === 'dark') {
          settings.theme = 'bordered';
          settings.colour = {
            scheme : 'charcoal',
            style : 'gradient'
          };
        }

        if (settings.theme === 'light') {
          settings.theme = 'bordered';
          settings.colour = {
            scheme : 'white',
            style : 'gradient'
          };
        }
      },


      /**
       * Set plugin classes
       */

      setPluginClasses : function() {
        var classNames = 'accordionPro ';

        // set orientation classname
        classNames += horizontal ? 'horizontal ' : 'vertical ';

        // theme
        classNames += settings.theme + ' ';

        // there is no stitch gradient, only stitch flat
        if (settings.theme === 'stitch') settings.colour.style = 'flat';

        // colour scheme and style
        classNames += settings.colour.scheme ? ('scheme-' + settings.colour.scheme + ' ' + 'style-' + settings.colour.style + ' ') : '';

        // rounded
        classNames += settings.rounded ? 'rounded ' : '';

        // rtl
        classNames += settings.rtl ? 'rtl ' : '';

        // start closed
        classNames += settings.startClosed ? 'closed ' : '';

        // fitToContent
        classNames += (!horizontal && fitToContent) ? 'fitToContent ' : '';

        // scrollable
        classNames += settings.panel.scrollable ? 'scrollable ' : '';

        // scale images
        classNames += settings.panel.scaleImages ? 'scaleImages ' : '';

        // set classnames
        elem.addClass(classNames);
      },


      /**
       * Add slide number and data to each slide
       */

      setSlideClasses : function() {
        slides.each(function(index) {
          $(this)
            .addClass('slide slide-' + (index + 1))
            .attr('data-slide-name', elem[0].id + '-slide-' + (index + 1));
        });
      },


      /**
       * Add classes to tabs for styling
       */

      setTabClasses : function() {
        var classNames = '';

        // tab icon
        if (settings.tab.icon !== 'none') {
          classNames += settings.tab.icon;
        }

        // alternate text orientation
        if (settings.tab.textOrientation !== 'normal') {
          classNames += ' alt-text-orientation';
        }

        // set classnames
        tabs.addClass(classNames);
      },


      /**
       * Set plugin width and height
       */

      setPluginDimensions : function() {
        elem
          .outerWidth(horizontal ? settings.horizontalWidth : settings.verticalWidth)
          .outerHeight(horizontal ? settings.horizontalHeight : settings.verticalHeight);
      },


      /**
       * Calculate border, padding, etc
       */

      calcBoxDimensions : function() {
        var firstPanel = slides.eq(0).children('div');

        // cache parent height and width values
        parent.w = elem.width();
        parent.h = elem.height();

        // calculate slide border
        border = elem.outerHeight() - elem.height();

        // calculate slide offset (once only)
        offset =
          parseInt(firstPanel.css('marginLeft'), 10) ||
          parseInt(firstPanel.css('marginRight'), 10) ||
          parseInt(firstPanel.css('marginBottom'), 10) || 0;

        // calculate padding and tab border (a lot more work than it should be because FF gets it wrong)
        if (horizontal) {
          padding = parseInt(elem.css('paddingLeft'), 10) + parseInt(elem.css('paddingRight'), 10);
          tabBorder = Math.ceil(+(tabs.eq(0).css('borderTopWidth')).slice(0, -2)) * 2;
        } else {
          padding = parseInt(elem.css('paddingTop'), 10) + parseInt(elem.css('paddingBottom'), 10);
          tabBorder = Math.ceil(+(tabs.eq(0).css('borderLeftWidth')).slice(0, -2)) * 2;
        }
      },


      /**
       * Calculate slide widths, heights, positions
       */

      calcSlideDimensions : function(index, panelH, selected) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = slide.w + tab.h;
          calc.height = '100%';
          calc.position = { left : index * tab.h, top : 0 };

          if (settings.rtl) {
            calc.position = { right : index * tab.h, top : 0 };
          }

          // compensate for selected slide (position)
          if (selected && index > slides.index(selected)) {
            calc.position[settings.rtl ? 'right' : 'left'] += slide.w;
          }
        } else {
          // variable height or flexible (fitToContent) height
          if (fitToContent) {
            calc.height = transparent ? panelH : panelH + tab.h + padding; // variable height
          } else {
            calc.height = slide.h + tab.h; // fixed height
          }

          // width and default position
          calc.width = '100%';
          calc.position = { top : index * tab.h, left : 0 };

          // compensate for selected slide (position)
          if (selected && index > slides.index(selected)) {
            if (fitToContent) {
              calc.position.top += selected.height() - tab.h;
            } else {
              calc.position.top += slide.h;
            }
          }
        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },


      /**
       * Set individual slide widths, heights, positions
       */

      setSlideDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },


      /**
       * Set all slide widths, heights, positions
       */

      setSlidesDimensions : function() {
        var _this = this, selected;

        // cache slide length
        slide.l = slides.length;

        // calculate global slide dimensions
        if (horizontal) {
          slide.w = parent.w - slide.l * tab.h;
          slide.h = parent.h;
        } else {
          slide.w = tabs.eq(0).width(); // px value
          slide.h = parent.h - slide.l * tab.h;
        }

        // set selected slide class if startClosed option is not enabled
        if (!settings.startClosed) {
          selected = slides.eq(settings.tab.selected - 1).addClass('selected');
        }

        // set dimensions of each slide
        slides.each(function(index) {
          var $this = $(this),
              panelH = $this.children('div').height(),
              calc = _this.calcSlideDimensions(index, panelH, selected);

          _this.setSlideDimensions.call($this, calc);
        });
      },


      /**
       * Set individual tab widths, heights, positions
       */

      setTabDimensions : function(ie) {
        this
          .width(tab.w)
          .height(tab.h - (tabBorder ? (tabBorder + padding) : 0))
          .css({
            'font-size' : settings.tab.fontSize + 'px',
            'line-height' : (tab.h - (tabBorder ? (tabBorder + padding) : padding)) + 'px',
            'font-family' : settings.tab.font
          });

        // fixes for stitch // !!! refactor
        if ((settings.theme === 'stitch' || settings.theme === 'bordered')) {
          this.width((ie ? tab.w : this.width()) - tabBorder);
        }
      },


      /**
       * Set all tab widths, heights, positions
       */

      setTabsDimensions : function() {
        var _this = this,
            $first = tabs.first(),
            calc;

        // calculate global tab dimensions
        tab.w = horizontal ? slide.h : '100%';

        // set dimensions of each tab
        tabs.each(function(index) {
          _this.setTabDimensions.call($(this));
        });

        // adjust line-height on :after
        if (padding) {
          calc = (tab.h - (tabBorder ? (tabBorder + padding) : padding));
          calc += (calc % 2) ? 0.5 : 0;

          // add rule to css
          addRule('#' + elem[0].id + ' .slide > :first-child:after', 'height: ' + calc + 'px');
        }
      },


      /**
       * Calculate panel widths, heights, positions
       */

      calcPanelDimensions : function(index) {
        var calc = {
          width : 0,
          height : 0,
          position : {}
        };

        if (horizontal) {
          calc.width = transparent ? slide.w + tab.h : slide.w - offset - padding;
          calc.height = slide.h;
          calc.position = { left : (transparent ? 0 : tab.h), top : 0 };

          if (settings.rtl) {
            calc.position = { right : (transparent ? 0 - offset : tab.h - offset), top : 0 };
          }
        } else {
          if (fitToContent) {
            calc.height = slides.eq(index).children('div').height();
          } else {
            calc.height = transparent ? (slide.h + tab.h) : slide.h - offset - padding;
          }

          // panel positions
          calc.width = '100%';
          calc.position = { top : (transparent ? 0 : tab.h), left : 0 };
        }

        return {
          width : calc.width,
          height : calc.height,
          position : calc.position
        }
      },


      /**
       * Set individual panel widths, heights, positions
       */

      setPanelDimensions : function(calc) {
        this
          .width(calc.width)
          .height(calc.height)
          .css(calc.position);
      },


      /**
       * Set all panel widths, heights, positions
       */

      setPanelsDimensions : function() {
        var _this = this;

        panels.each(function(index) {
          var calc = _this.calcPanelDimensions(index);
          _this.setPanelDimensions.call($(this), calc);
        });
      },


      /**
       * Set custom tab images
       */

      setCustomTabImages : function() {
        var imgs = [];

        if (settings.tab.icon !== 'custom') return;
        if (!settings.tab.customIcons.length) return;

        // short ref to image array
        imgs = settings.tab.customIcons;

        // create styles for icons
        // using a relative path? Path will be relative to CSS file location
        // best to use an absolute path instead
        tabs.each(function(index) {
          addRule('#' + elem[0].id + ' .slide-' + (index + 1) + ' > :first-child:after', 'background-image: url(' + imgs[index % imgs.length] + ')');
        });
      },


      /**
       * Set custom tab colours
       */

      setCustomTabColours : function() {
        var colours = [];

        if (!settings.tab.customColours.length) return;

        // short ref to colours array
        colours = settings.tab.customColours;

        // create styles for custom colours (so no need to remove style attr on destroy())
        tabs.each(function(index) {
          addRule('#' + elem[0].id + ' .slide-' + (index + 1) + ' > :first-child', 'background: ' + colours[index] + ' !important');
          addRule('#' + elem[0].id + '.stitch .slide-' + (index + 1) + ' > :first-child', 'background-image: url("data:image/png;base64,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") !important');
          addRule('#' + elem[0].id + ' .slide-' + (index + 1) + '.selected > :first-child:before', 'background-color: ' + colours[index] + ' !important');
        });
      },


      /**
       * Set plugin width and height when closed on init
       */

      setClosedPluginDimensions : function() {
        if (!settings.startClosed) return;

        if (horizontal) {
          elem.css('width', (slide.l * tab.h) + border - padding - 1);
        } else {
          elem.css('height', slide.l * tab.h + border);
        }
      },


      /**
       * Show plugin
       */

      setPluginVisible : function() {
        elem.css('visibility', 'visible');

        setTimeout(function() {
          elem.css('transition', 'all ' + settings.slideSpeed + 'ms ease-in-out');
        }, 100);
      },


      /**
       * Additional fixes for Internet Explo(d|r)er
       */

      internetExploder : function() {
        var _this = this,
            ua = navigator.userAgent,
            index = ua.indexOf('MSIE');

        // not ie
        if (index < 0) return;

        // ie
        if (index !== -1) {
          ua = +(ua.slice(index + 5, index + 7));

          // ie 10+ doesn't need additional styles...
          if (ua > 9) return;

          // fixes for ie 8 & 9
          if (ua <= 9) {
            // fixes for bordered calculating incorrect tab width before page fully loaded
            if (settings.theme === 'bordered' && settings.colour.style === 'gradient') {
              // re-set dimensions of each tab
              tabs.each(function(index) {
                _this.setTabDimensions.call($(this), true);
              });
            }
          }

          // fixes for ie8
          if (ua === 8) {
            if (horizontal) {
              // tab transforms
              tabs.css((settings.rtl ? 'right' : 'left'), -(tab.w - tab.h + padding) + 'px');

              // fixes responsive
              slides.css('minHeight', tab.w + 'px');
              if (!settings.startClosed) {
                elem.children('ol').css({
                  'minWidth' : (settings.horizontalWidth - border) + 'px',
                  'minHeight' : tab.w + 'px'
                });
              }
            }

            // slides zIndex
            slides.each(function(index) {
              $(this).css({ 'zIndex' : 100 + index });
            });
          }

          // ie 7 and below
          if (ua <= 7) {
            methods.destroy();
            throw new Error('This plugin supports IE8+ only.');
          }

          // add ie classes for css fallbacks
          elem.addClass('ie' + ua);
        }
      },


      /**
       * Init plugin setup
       */

      init : function() {
        var _this = this;

        // set plugin dimensions, plugin and slide classes
        this.backwardsCompatibility();
        this.setPluginDimensions();
        this.setPluginClasses();
        this.setSlideClasses();
        this.setTabClasses();
        this.setCustomTabImages();
        this.setCustomTabColours();

        // check images are loaded before setting up slide positions
        $(window).on('load', function() {
          _this.calcBoxDimensions();
          _this.setSlidesDimensions();
          _this.setTabsDimensions();
          _this.setPanelsDimensions();

          _this.setClosedPluginDimensions();
          _this.setPluginVisible();
          _this.internetExploder();

          // init autoPlay
          if (!settings.startClosed && settings.autoPlay) methods.play();

          // init fitToContent
          if (!settings.startClosed && fitToContent) core.fitToContent();

          // trigger callbacks for first slide
          core.triggerCallbacks();
        });
      }
    };


    /**
     * BIND EVENTS
     */

    var events = {

      /**
       * Bind click
       */

      click : function() {
        if (settings.activateOn === 'click') {
          // trigger animation cycle
          tabs.on('click.accordionPro touchstart.accordionPro', methods.trigger);

          if (settings.startClosed) {
            tabs.on('click.accordionPro.closed touchstart.accordionPro.closed', core.triggerFromClosed);
          }
        }
      },


      /**
       * Bind mouseover
       */

      mouseover : function() {
        if (settings.activateOn === 'mouseover') {
          // trigger animation cycle
          tabs.on('mouseover.accordionPro touchstart.accordionPro', methods.trigger);

          // fire start closed event once
          if (settings.startClosed) {
            tabs.on('mouseover.accordionPro.closed touchstart.accordionPro.closed', core.triggerFromClosed);
          }
        }
      },


      /**
       * Pause autoPlay on hover
       */

      hover : function() {
        if (settings.pauseOnHover && settings.autoPlay && !touch) {
          elem
            .on({
              'mouseover.accordionPro' : function() {
                if (!elem.hasClass('closed')) {
                  core.timer && methods.stop();
                }
              },
              'mouseout.accordionPro' : function() {
                if (!elem.hasClass('closed')) {
                  !core.timer && methods.play();
                }
              }
            });
        }
      },


      /**
       * Pause autoPlay on touch interaction
       */

      touch : function() {
        if (settings.autoPlay && touch) {
          elem
            .on({
              'touchmove.accordionPro' : function() {
                core.timer && methods.pause();
              }
            });
        }
      },


      /**
       * Bind swipe for touch enabled devices
       */

      swipe : function() {
        var tap = false,
            startPos = {
              x : 0,
              y : 0
            };

        /**
         * Helper -> get position of client touch
         */

        function getTouchPos(e, maxTouches) {
          var x, y;

          if (touch && e.touches) {
            if (e.touches.length > maxTouches) return;
            x = e[maxTouches ? 'touches' : 'changedTouches'][0].clientX;
            y = e[maxTouches ? 'touches' : 'changedTouches'][0].clientY;
          } else {
            x = e.clientX;
            y = e.clientY;
          }

          return { x : x, y : y };
        }


        /**
         * Trigger swipe on touch enabled devices
         */

        if (touch) {
          // unbind existing events
          tabs.off('click.accordionPro mouseover.accordionPro');

          // scrollable panels aren't compatible with swipe events
          if (settings.panel.scrollable) return;

          // bind swipe events
          slides.on({
            'touchstart.accordionPro' : function(e) {
              if ($(e.target).is(tabs)) {
                tap = true;
              }

              startPos = getTouchPos(e.originalEvent, 1);
            },

            'touchmove.accordionPro' : function(e) {
              e.preventDefault();
            },

            'touchend.accordionPro' : function(e) {
              var endPos = getTouchPos(e.originalEvent, 0);

              // calculate swipe direction
              var dx = endPos.x - startPos.x,
                  absDx = Math.abs(dx),
                  dy = endPos.y - startPos.y,
                  absDy = Math.abs(dy);

              // trigger slide (if the tab wasn't tapped)
              if (!tap) core.triggerDirection(absDx > absDy ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
              tap = false;
            }
          });
        }
      },


      /**
       * Bind hashchange
       */

      hashchange : function() {
        if (settings.linkable) {
          $window.on('load.accordionPro hashchange.accordionPro', core.triggerLink);
        }
      },


      /**
       * Bind resize and orientationchange
       */

      resize : function() { // +orientationchange
        var timer = 0;

        if (horizontal && settings.responsive) {
          // set initial scale (before 200ms timeout)
          core.scalePlugin();

          // on load...
          $window.on('load.accordionPro resize.accordionPro orientationchange.accordionPro', function() {
            // approximates onresizeend
            clearTimeout(timer);

            // trigger scaling
            timer = setTimeout(function() {
              core.scalePlugin();
            }, 200);
          });
        }
      },


      /**
       * Init event binds
       */

      init : function() {
        for (var i in this) {
          if (this.hasOwnProperty(i)) {
            if (i !== 'init') this[i]();
          }
        }
      }
    };


    /**
     * PLUGIN CORE
     */

    var core = {
      // interval counter
      timer : 0,

      // animation flag
      isPlaying : false,

      // counter for autoPlay
      currentSlide : settings.tab.selected - 1,

      // previous slide
      previousSlide : -1,


      /**
       * Set next slide ref
       */

      nextSlide : function() {
        var t = core.currentSlide;
        return ++t % slide.l;
      },


      /**
       * Update slide counters
       */

      updateSlideRefs : function() {
        core.previousSlide = core.currentSlide;
        core.currentSlide = slides.index(this);
      },


      /**
       * Animate single slide
       */

      animateSlide : function(props) {
        // animate single slide
        this
          .stop(true)
          .animate(
            props,
            settings.slideSpeed
          )
      },


      /**
       * Animate group of slides
       */

      animateSlides : function(p) {
        var expr = '',
            pos = 0;

        // side 0 = left/top, side 1 = bottom/right
        pos = p.side ? 0 : fitToContent ? p.triggerHeight : slide[horizontal ? 'w' : 'h'];

        // build expression
        expr += p.side ? ':lt(' : ':gt(';
        expr += p.side ? p.index + 1 : p.index;
        expr += ')';

        // animate slides
        slides
          .filter(expr)
          .each(function() {
            var $this = $(this);

            // redefine index
            p.index = slides.index($this);

            // set position
            p[p.position] = (p.index * tab.h) + pos;

            // animate single slide
            core.animateSlide.call($this, p);
          });

        // set selected
        core.setSelectedSlide.call(p.selected ? this.prev() : this);
      },


      /**
       * Trigger slide animation
       */

      trigger : function(e) {
        var $slide = $(this).parent(),
            props = {
              index : slides.index($slide),
              position : horizontal ? (settings.rtl ? 'right' : 'left') : 'top',
              triggerHeight : 0,
              side : 0,
              selected : false
            };

        // side 0 = left/top, side 1 = bottom/right (flipped for rtl)
        props.side = parseInt($slide.css(props.position), 10) > props.index * tab.h;

        // if slide already selected, push to other side of expr
        if ($slide.hasClass('selected') && !props.side) {
          props.selected = props.index;
          props.index -= props.selected ? 1 : 0;
        };

        props.triggerHeight = slides.eq(props.index).height() - tab.h;

        // update slide refs
        core.updateSlideRefs.call(props.selected ? $slide.prev() : $slide);

        // animate slides
        core.animateSlides.call($slide, props);

        // animate both sides for vertical fitToContent
        if (fitToContent) {
          if (props.side) { // bottom/right
            props.side = false;
            core.animateSlides.call($slide, props);
          }

          // fit accordion dimensions to content
          core.fitToContent(props);
        }

        // update hash on user click
        if (settings.linkable && typeof e !== 'number') {
          history.replaceState(null, null, '#' + elem[0].id + '-slide-' + (core.currentSlide + 1));
        }
      },


      /**
       * Set currently selected slide class, update slide refs, trigger callbacks
       */

      setSelectedSlide : function() {
        var index = slides.index(this);

        // remove selected class
        slides.removeClass('selected');

        // add selected class to selected slide
        this.addClass('selected');
      },


      /**
       *
       */

      triggerCallbacks : function() {
        if (core.currentSlide === core.previousSlide) return;

        // trigger onSlideOpen callback
        settings.onSlideOpen.call(slides.eq(core.currentSlide).children('div'));

        // trigger onSlideClose callback
        settings.onSlideClose.call(slides.eq(core.previousSlide).children('div'));
      },


      /**
       * Fit the accordion to the content height (vertical fitToContent option)
       */

      fitToContent : function(p) {
        var height = p && (p.triggerHeight + tab.h) || slides.eq(core.currentSlide).height();

        // // set height
        elem.height(((slide.l - 1) * tab.h) + height);
      },


      /**
       * Activate closed accordion
       */

      triggerFromClosed : function(e) {
        if (fitToContent) {
          core.fitToContent();
        } else {
          setup.setPluginDimensions();
        }

        // remove closed class
        elem.removeClass('closed');

        // unbind event
        tabs.off('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed');

        // trigger autoplay
        if (settings.autoPlay) methods.play();
      },


      /**
       * Trigger slide animation from a link
       */

      triggerLink : function(e) {
        var name;

        // still closed?
        if (elem.hasClass('closed')) return;

        // link refers to a slide?
        name = slides.filter(function() {
          return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
        });

        // if slide name exists, trigger slide
        if (name && name.length) {
          methods.trigger(slides.index(name));
          methods.pause();
        }
      },


      /**
       *
       */

      triggerDirection : function(dir) {
        switch (dir) {
          case 'left':
            if (horizontal) {
              if (settings.rtl) {
                // don't select previous slide if current slide is index zero
                if (core.currentSlide) methods.prev();
              } else {
                methods.next();
              }
            }

            break;
          case 'right':
            if (horizontal) {
              if (settings.rtl) {
                methods.next();
              } else {
                if (core.currentSlide) methods.prev();
              }
            }

            break;
          case 'up':
            if (!horizontal) {
              methods.next();
            }

            break;
          case 'down':
            if (!horizontal && core.currentSlide) {
              methods.prev();
            }

            break;
          default:
            break;
        }
      },


      /**
       *
       */

      scalePlugin : function() {
        var scale = Math.min(elem.parent().width() / settings.horizontalWidth), // linear scale
            prefixes = ['Webkit', 'Moz', 'Ms', 'O', ''];

        // only scale horizontal accordions
        if (!horizontal) return;

        // limit max scale to 1
        scale = +(Math.min(scale, 1).toFixed(2));

        // css3 scaling not supported in ie8
        if (!elem.hasClass('ie8')) {
          $.each(prefixes, function(index, prefix) {
            elem.css((prefix + 'Transform'), 'scale(' + scale + ')');
          });

          // scale margin bottom
          elem.css('margin-bottom', -(settings.horizontalHeight - (settings.horizontalHeight * scale)).toFixed(2));
        } else {
          elem.css('zoom', scale);
        }
      }
    };


    /**
     * PUBLIC METHODS
     */

    var methods = {
      trigger : function(e) {
        var _this = (typeof e === 'number') ? tabs.eq(e)[0] : this;

        core.trigger.call(_this, e);
        core.triggerCallbacks();
      },

      play : function() {
        if (core.timer) return;

        // start autoplay
        core.timer = setInterval(function() {
          methods.trigger(core.nextSlide());
        }, settings.cycleSpeed);
      },

      stop : function() {
        clearInterval(core.timer);
        core.timer = 0;
      },

      pause : function() {
        methods.stop();

        // pause
        if (settings.autoPlay) methods.play();
      },

      next : function() {
        methods.pause();
        methods.trigger(core.nextSlide());
      },

      prev : function() {
        methods.pause();
        methods.trigger(core.currentSlide - 1);
      },

      destroy : function() {
        // stop autoplay
        methods.stop();

        // remove hashchange and resize events bound to window
        $(window).off('.accordionPro');

        // remove generated styles, classes, data, events
        this
          .off('.accordionPro')
          .removeData('accordionPro')
          .removeAttr('style')
          .removeClass();

        slides
          .off('.accordionPro')
          .removeAttr('data-slide-name')
          .removeAttr('style')
          .removeClass()
          .children()
          .removeAttr('style');

        tabs
          .off('.accordionPro')
          .removeClass();
      },

      debug : function() {
        return {
          elem : elem,
          settings : settings,
          methods : methods,
          setup : setup,
          core : core
        };
      }
    };


    /**
     * Init plugin
     */

    setup.init();
    events.init();


    /**
     * Return methods
     */

    methods._settings = settings;
    return methods;
  }


 /**
   * PLUGIN DEFAULTS
   */

  AccordionPro.prototype.defaults = {
    /* layout */
    orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
    startClosed : false,                    // start in a closed position

    /* aesthetics */
    theme : 'basic',                        // 'basic', 'bordered', 'stitch' or 'transparent'
    colour : {
      scheme : 'charcoal',                  // colour scheme, 'charcoal' set by default; choose from 'charcoal', 'white', 'silver', 'grey', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'light-blue', 'blue', and 'dark-blue'
      style : 'flat'                        // choose from 'flat' or 'gradient'
    },
    rounded : false,                        // square or rounded corners
    rtl : false,                            // right to left layout

    /* horizontal accordion options */
    responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
    horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
    horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value

    /* vertical accordion options */
    verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
    verticalHeight : 500,                   // base vertical accordion height; fixed (px [integer])
    verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

    /* tabs */
    tab : {
      size : 48,                            // set tab size
      fontSize : 16,                        // set tab font size
      font : 'Arial',                       // set tab font family
      icon : 'number',                      // set tab icon -> 'number', 'chevron', 'disc', 'square', 'custom', or 'none'
      customIcons : [],                     // set a custom image for each icon
      customColours : [],                   // set a custom colour for each tab
      selected : 1                          // displays slide (n) on page load
    },

    /* panels */
    panel : {
      scrollable : false,                   // trigger scrollbar on vertical overflow
      scaleImages : true                    // scales images to fit slide width and height
    },

    /* events */
    activateOn : 'click',                   // click or mouseover
    onSlideOpen : function() {},            // callback on slide open
    onSlideClose : function() {},           // callback on slide animation complete

    /* animations */
    autoPlay : false,                       // automatically cycle through slides
    cycleSpeed : 6000,                      // time between slide cycles
    slideSpeed : 800,                       // slide animation speed

    /* miscellaneous */
    pauseOnHover : true,                    // pause on hover
    linkable : false                        // link slides via hash
  };


  /**
   * ADD PLUGIN TO $.fn
   */

  $.fn.accordionPro = function(method, param) {
    var elem = this,
        instance = elem.data('accordionPro');

    // if creating a new instance
    if (typeof method === 'object' || !method) {
      return elem.each(function() {
        // if plugin already instantiated, return
        if (instance) return;

        // otherwise create a new instance
        elem.data('accordionPro', new AccordionPro(elem, method));
      });

    // otherwise, call method on current instance
    } else if (typeof method === 'string' && instance[method]) {
      // debug method isn't chainable b/c we need the debug object to be returned
      if (method === 'debug') {
        return instance[method].call(elem);
      } else {
        // zero-based index for trigger method
        if (method === 'trigger' && typeof param === 'number') param -= 1;

        // chainable methods
        instance[method].call(elem, param);
        return elem;
      }
    }
  };

})(jQuery);