/**
 * Accordion Pro JS Dependencies
 */

/**
 * @name jQuery Swipe plugin (https://github.com/jgarber623/jquery-swipe)
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 *
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */
;(function(c,b,a,e){var d=function(g,f){this.elem=g;this.$elem=c(g);this.options=f;this.metadata=this.$elem.data("swipe-options")};d.prototype={defaults:{left:function(f){},right:function(f){},up:function(f){},down:function(f){},threshold:{x:100,y:50}},init:function(){this.config=c.extend({},this.defaults,this.options,this.metadata);this.coords={start:{x:0,y:0},end:{x:0,y:0}};c(this.elem).on({touchstart:c.proxy(this.touchStart,this),touchmove:c.proxy(this.touchMove,this),touchend:c.proxy(this.touchEnd,this)});return this},touchEnd:function(f){var g={x:this.coords.start.x-this.coords.end.x,y:this.coords.start.y-this.coords.end.y};if(g.y<this.config.threshold.y&&g.y>(this.config.threshold.y*-1)){if(g.x>this.config.threshold.x){this.config.left()}if(g.x<(this.config.threshold.x*-1)){this.config.right()}}else{if(g.y>=0){this.config.up()}else{this.config.down()}}},touchMove:function(f){var g=f.originalEvent.targetTouches[0];this.coords.end={x:g.pageX,y:g.pageY};f.preventDefault()},touchStart:function(f){var g=f.originalEvent.targetTouches[0];this.coords={start:{x:g.pageX,y:g.pageY},end:{x:g.pageX,y:g.pageY}}}};d.defaults=d.prototype.defaults;c.fn.swipe=function(f){return this.each(function(){new d(this,f).init()})}})(jQuery,window,document);

/*
 * Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-touch-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.csstransitions=function(){return E("transition")};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e.prefixed=function(a,b,c){return b?E(a,b,c):E(a,"pfx")},e}(this,this.document);

/**
 * jQuery animate -> CSS3 Transitions
 * http://addyosmani.com/blog/css3transitions-jquery/
 */
;(function(a){a.fn.extend({defaultAnimate:a.fn.animate,animate:function(b,c,d,e){var f=c&&typeof c=="object"?jQuery.extend({},c):{complete:e||!e&&d||jQuery.isFunction(c)&&c,duration:c,easing:e&&d||d&&!jQuery.isFunction(d)&&d};return a(this).each(function(){var d=a(this),e,g;Modernizr.csstransitions&&(d.hasClass("accordionPro")||d.hasClass("slide"))?(e=f.easing||"ease-in-out",g=Modernizr.prefixed("transition").replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()}).replace(/^ms-/,"-ms-"),d.css(g,"all "+c/1e3+"s "+e).css(b),setTimeout(function(){d.css(g),a.isFunction(f.complete)&&f.complete()},c)):(f.easing="swing",d.defaultAnimate(b,f))})}})})(jQuery);

/**
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 */
;(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}var n=e.prototype;n.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},n.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},n.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},n.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},n.on=n.addListener,n.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},n.once=n.addOnceListener,n.defineEvent=function(e){return this.getListeners(e),this},n.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},n.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},n.off=n.removeListener,n.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},n.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},n.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},n.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},n.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],o=n.listener.apply(this,t||[]),(o===this._getOnceReturnValue()||n.once===!0)&&this.removeListener(e,s[r][i].listener);return this},n.trigger=n.emitEvent,n.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},n.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define(r):e.eventie=r}(this),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===c.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,s){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?s=n:t(this.options,n),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred);var a=this;setTimeout(function(){a.check()})}function c(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},r.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&a&&s.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify(t,e)})},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},o&&(o.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(o(this))});var f={};return c.prototype=new e,c.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},c.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},c.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var o=e.jQuery,s=e.console,a=s!==void 0,c=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);

/**
 * Project:    Accordion Pro JS - a responsive accordion plugin for jQuery
 * Author:     Nicola Hibbert
 * URL:        http://codecanyon.net/item/accordion-pro-js-responsive-jquery-accordion/5480772?ref=nicolahibbert
 *
 * Version:    1.0
 * Copyright:  (c) 2010-2013 Nicola Hibbert
 */ /* build */

;(function($) {

  var AccordionPro = function(elem, options) {
    var defaults = {},
        settings = {},
        methods = {},
        setup = {},
        core = {};

    /**
     * Plugin defaults
     */

    defaults = {
      /* layout */
      orientation : 'horizontal',             // 'horizontal' or 'vertical' accordion
      startClosed : false,                    // start in a closed position
      firstSlide : 1,                         // displays slide (n) on page load

      /* aesthetics */
      theme : 'basic',                        // basic, dark, light, stitch or transparent
      rounded : false,                        // square or rounded corners
      rtl : false,                            // right to left layout
      showSlideNumbers : true,                // display numbers on slides

      /* horizontal accordion options */
      responsive : true,                      // accordion will adapt itself to the page layout, based on width of parent element
      scaleImages : true,                     // scales images to fit slide width and height
      horizontalWidth : 900,                  // base width; fixed (px [integer]) - responsive scaling is relative to this value
      horizontalHeight : 300,                 // base horizontal accordion height; fixed (px [integer]) - responsive scaling is relative to this value

      /* vertical accordion options */
      verticalWidth : '100%',                 // fixed (px [integer]) or fluid (% [string])
      verticalHeight : 500,                   // base vertical accordion height; fixed (px [integer])
      verticalSlideHeight : 'fixed',          // vertical accordion slide heights can be 'fixed' or 'fitToContent'

      /* events */
      activateOn : 'click',                   // click or mouseover
      touchEnabled : true,                    // touch events?
      onSlideOpen : function() {},            // callback on slide open
      onSlideClose : function() {},           // callback on slide animation complete

      /* animations */
      autoPlay : false,                       // automatically cycle through slides
      cycleSpeed : 6000,                      // time between slide cycles
      slideSpeed : 800,                       // slide animation speed
      easing : 'ease-in-out',                 // animation easing

      /* miscellaneous */
      pauseOnHover : true,                    // pause on hover
      linkable : false                        // link slides via hash
    };

    /**
     * Merge defaults with options in new settings object
     */

    settings = $.extend({}, defaults, options);

    /**
     * "Globals"
     */

    var parent = { w : 0, h : 0 },
        slides = elem.children('ol').children('li'),
        slide = { w : 0, h : 0, l : 0 },
        tabs = slides.children(':first-child'),
        tab = { w : 0, h : 48 },
        padding = 0,
        border = 0,
        offset = 0,
        orientation = settings.orientation === 'horizontal' ? 1 : 0,
        easingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
        easing = $.inArray(settings.easing, easingFns) >= 0 ? settings.easing : defaults.easing,
        fitToContent = !orientation && settings.verticalSlideHeight === 'fitToContent' ? true : false,
        transparent = (settings.theme === 'transparent');

    /**
     * Public methods for triggering animation events
     */

    // start elem animation
    methods.play = function(index) {
      var next;
      if (core.playing) return;

      // assign next slide value
      next = core.nextSlide(index && index);

      // start autoplay
      core.playing = setTimeout(function() {
        tabs.eq(next()).trigger('click.accordionPro');
      }, settings.cycleSpeed);
    };

    // stop elem animation
    methods.stop = function() {
      clearTimeout(core.playing);
      core.playing = 0;
    };

    // trigger next slide
    methods.next = function() {
      methods.stop();
      tabs.eq(core.currentSlide === slide.length - 1 ? 0 : core.currentSlide + 1).trigger('click.accordionPro');
    };

    // trigger previous slide
    methods.prev = function() {
      methods.stop();
      tabs.eq(core.currentSlide - 1).trigger('click.accordionPro');
    };

    // destroy plugin instance
    methods.destroy = function() {
      // stop autoplay
      methods.stop();

      // remove hashchange and resize events bound to window
      $(window).off('.accordionPro');

      // remove generated styles, classes, data, events
      elem
        .off('.accordionPro')
        .removeData('accordionPro')
        .removeAttr('style')
        .removeClass('accordionPro horizontal vertical basic dark light stitch transparent rounded rtl closed responsive fitToContent scaleImages')
        .find('li > :first-child')
        .off('.accordionPro')
        .end()
        .find('b')
        .remove();

      slides
        .removeClass('slide selected')
        .removeAttr('style')
        .removeAttr('data-slide-name')
        .children()
        .removeAttr('style');
    };

    // poke around the internals (NOT CHAINABLE)
    methods.debug = function() {
      return {
        elem : elem,
        defaults : defaults,
        settings : settings,
        methods : methods,
        setup : setup,
        core : core
      };
    };

    /**
     * Internal plugin setup methods
     */

    setup.styles = function() {
      // set parent theme and corner style
      elem
        .outerWidth(orientation ? settings.horizontalWidth : settings.verticalWidth)
        .outerHeight(orientation ? settings.horizontalHeight : settings.verticalHeight)
        .addClass('accordionPro')
        .addClass(orientation ? 'horizontal' : 'vertical')
        .addClass(settings.rounded && 'rounded')
        .addClass(settings.theme)
        .addClass(settings.rtl && 'rtl')
        .addClass(settings.startClosed && 'closed')
        .addClass(!orientation && fitToContent && 'fitToContent')
        .addClass(settings.scaleImages && 'scaleImages');

      // add slide class to each slide
      slides.addClass('slide');

      // cache slide length
      slide.l = slides.length;
    };

    setup.dimensions = function() {
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

      // calculate padding
      if (orientation) {
        padding = parseInt(elem.css('paddingLeft'), 10) + parseInt(elem.css('paddingRight'), 10);
      } else {
        padding = parseInt(elem.css('paddingTop'), 10) + parseInt(elem.css('paddingBottom'), 10);
      }
    };

    setup.getSlideCss = function(index, selected) {
      var $this = this,
          css = {
            slide : {},
            tab : {},
            panel : {}
          };

      if (orientation) { // horizontal
        // calculate global slide dimensions
        slide.w = parent.w - slide.l * tab.h;
        slide.h = parent.h;

        // calculate slide properties
        css.slide = { width : slide.w + tab.h, height : '100%', position : { left : index * tab.h, top : 0 }};

        // calculate tab properties
        css.tab.width = slide.h;

        // calculate content panel properties
        css.panel = transparent
          ? { width : slide.w + tab.h, height : slide.h, position : { left : 0, top : 0 }}
          : { width : slide.w - offset, height : slide.h, position : { left : tab.h, top : 0 }};

        // adjust for rtl if necessary
        if (settings.rtl) {
          css.slide.position = { left : 'auto', right : index * tab.h, top : 0 };
          css.panel.position = transparent ? { left : 'auto', right : 0 - offset, top : 0 } : { left : 'auto', right : tab.h - offset, top : 0 };
        }

        // compensate for pre-selected slide
        if (selected.length && index > slides.index(selected)) css.slide.position[settings.rtl ? 'right' : 'left'] += slide.w;
      } else { // vertical
        // calculate global slide dimensions
        slide.w = tabs.eq(0).width(); // px value
        slide.h = parent.h - slide.l * tab.h;

        // calculate slide properties
        if (fitToContent) {
          css.panel.height = $this.children('div').height();
          css.slide.height = transparent ? css.panel.height : css.panel.height + tab.h;
        } else {
          // fixed height
          css.slide.height = slide.h + tab.h;
          css.panel.height = transparent ? css.slide.height : css.slide.height - tab.h - offset;
        }

        // panel positions
        css.panel.position = transparent ? { top : 0, left : 0 } : { top : tab.h, left : 0 };
        css.slide.position = { top : index * tab.h, left : 0 };
        css.slide.width = css.tab.width = css.panel.width = '100%';

        // compensate for pre-selected slide
        if (selected.length) {
          if (index > slides.index(selected)) {
            if (fitToContent) {
              css.slide.position.top += selected.height() - tab.h;
            } else {
              css.slide.position.top += slide.h;
            }
          }
        }
      }

      return css;
    };

    setup.slidePositions = function() {
      var selected = slides.filter('.selected');

      // account for already selected slide if startClosed option not enabled
      if (!selected.length && !settings.startClosed) {
        slides.eq(settings.firstSlide - 1).addClass('selected');
        selected = slides.filter('.selected');
      }

      // wait a tick to get calculated heights
      slides.each(function(index) {
        var $this = $(this),
            css = setup.getSlideCss.call($this, index, selected),
            h = $this.children('h2'),
            b = h.children('b');

        // set each slide position
        $this
          .width(css.slide.width)
          .height(css.slide.height)
          .css(css.slide.position)
          // slide name = div id + -slide- + index
          .attr('data-slide-name', elem[0].id + '-slide-' + (index + 1))
            .children('h2')
            .width(css.tab.width)
            .height(tab.h)
            .next()
              .width(css.panel.width)
              .height(css.panel.height)
              .css(css.panel.position);

        // add number to bottom of tab
        if (settings.showSlideNumbers) {
          if (b.length) return;
          h.append('<b>' + (index + 1) + '</b>');
        } else {
          // hide b if exists
          if (b.length) b.hide();
        }

        // compensate for <= ie8's lack of transform origin
        if (elem.hasClass('ie8') && elem.hasClass('horizontal') && elem.hasClass('rtl')) {
          $this.children('h2').css('marginRight', -(slide.h - tab.h));
        }
      });

      // fit to content on init
      if (fitToContent) core.fitToContent(selected);
    };

    setup.startClosed = function() {
      // start accordion in closed position
      if (orientation) {
        elem.css('width', (slide.l * tab.h) + (border / 2) + (padding * 2) - 1);
      } else {
        elem.css('height', slide.l * tab.h + border);
      }
    };

    setup.events = function() {
      var resizeTimer = 0;

      // bind click and mouseover events
      if (settings.activateOn === 'click') {
        // trigger animation cycle
        tabs.on('click.accordionPro touchstart.accordionPro', core.animationCycle);

        // fire start closed event once
        if (settings.startClosed) tabs.on('click.accordionPro.closed touchstart.accordionPro.closed', core.startClosed);
      } else if (settings.activateOn === 'mouseover') {
        // trigger animation cycle
        tabs.on('click.accordionPro touchstart.accordionPro mouseover.accordionPro', core.animationCycle);

        // fire start closed event once
        if (settings.startClosed) tabs.on('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed', core.startClosed);
      }

      // bind touch events (swipe)
      if (Modernizr.touch && settings.touchEnabled) {
        slides.swipe({
          left : function() {
            if (orientation) {
              if (settings.rtl) {
                // don't select previous slide if current slide is index zero
                if (core.currentSlide) methods.prev();
              } else {
                methods.next();
              }
            }
          },
          right : function() {
            if (orientation) {
              if (settings.rtl) {
                methods.next();
              } else {
                if (core.currentSlide) methods.prev();
              }
            }
          },
          up : function() {
            if (!orientation) methods.next();
          },
          down : function() {
            if (!orientation && core.currentSlide) methods.prev();
          },
          threshold: { x: 80, y: 80 }
        });
      }

      // pause on hover (can't use custom events with $.hover())
      if (settings.pauseOnHover && settings.autoPlay) {
        elem
          .on('mouseover.accordionPro', function() {
            if (!elem.hasClass('closed')) core.playing && methods.stop();
          })
          .on('mouseout.accordionPro', function() {
            if (!elem.hasClass('closed')) !core.playing && methods.play(core.currentSlide);
          });
      }

      // bind hashchange event
      if (settings.linkable) {
        $(window).on('load.accordionPro hashchange.accordionPro', function(e) {
          var url = slides.filter(function() {
            return $(this).attr('data-slide-name') === window.location.hash.split('#')[1];
          });

          // if slide name exists, trigger slide
          if (url.length) core.animationCycle.call(url.children('h2')[0], e);
        });
      }

      // bind resize events if responsive or fluid options set
      if (orientation && settings.responsive) {
        // responsive layout (first run)
        core.scale();

        // resize and orientationchange
        $(window).on('resize.accordionPro orientationchange.accordionPro', function() {
          // approximates 'onresizeend'
          clearTimeout(resizeTimer);

          resizeTimer = setTimeout(function() {
            // responsive layout
            core.scale();
          }, 200);
        });
      }
    };

    setup.ie = function() {
      var ua = navigator.userAgent,
          index = ua.indexOf('MSIE');

      // not ie
      if (index < 0) return;

      // ie
      if (index !== -1) {
        ua = ua.slice(index + 5, index + 7);
        ua = +ua;

        // ie versions
        // ie 7 and below
        if (ua <= 7) methods.destroy();

        // ie 10+ doesn't need additional styles...
        if (ua >= 10) return;

        // ... but ie 8 does :(
        if (ua === 8) {
          if (orientation) { // horizontal accordion
            // ie8 responsive hax
            if (!settings.startClosed) {
              elem.children('ol').css({
                'min-width' : settings.horizontalWidth - border + padding,
                'min-height' : settings.horizontalHeight - border
              });
            } else {
              elem.children('ol').css({
                'min-width' : slide.l * tab.h,
                'min-height' : settings.horizontalHeight - border
              });
            }
          }

          // css = ie8 responsive hax
          slides.each(function(index) {
            $(this).addClass('slide-' + index).css({ 'min-height' : settings.horizontalHeight - border });
          });
        }

        // add ie classes for css fallbacks
        elem.addClass('ie ie' + ua);
      }
    };

    /**
     * Core scale and animation methods
     */

    core.startClosed = function() {
      if (elem.hasClass('closed')) {
        // redeclare parent height and width values
        if (orientation) { // horizontal
          elem.css('width', settings.horizontalWidth);

          // stupid ie8 responsive hax
          if (elem.hasClass('ie8')) { // then I hate you so much.
              elem.children('ol').css({
                'min-width' : settings.horizontalWidth - border + padding
              });
          }
        } else { // vertical
          elem
            .animate({
              height : fitToContent ? (slide.l - 1) * tab.h + border + slides.filter('.selected').height() : settings.verticalHeight
            }, settings.slideSpeed);
        }

        // remove closed class
        elem.removeClass('closed');

        // unbind event
        tabs.off('click.accordionPro.closed touchstart.accordionPro.closed mouseover.accordionPro.closed');

        // trigger responsive reflow
        if (orientation && settings.responsive) core.scale();

        // trigger autoplay
        if (!settings.startClosed && settings.autoPlay) methods.play();
      }
    };

    core.fitToContent = function(selected) {
      if (!elem.hasClass('closed')) {
        elem
          .animate({
            height : (slide.l - 1) * tab.h + border + selected.height()
          }, settings.slideSpeed);

        // consideration of border not required with height
        elem.height((slide.l - 1) * tab.h + selected.height());
      }
    };

    core.scale = function() {
      var scale = Math.min(elem.parent().outerWidth(true) / settings.horizontalWidth); // linear scale
      var ieOl;

      // limit max scale to 1
      // scale = ().toFixed(2);
      scale = Math.min(scale, 1);

      // css3 scaling not supported in ie8
      if (!elem.hasClass('ie8')) {
        elem.css(Modernizr.prefixed('transform'), 'scale(' + scale + ')');

        if (orientation) { // horizontal?
          elem.css('margin-bottom', -(settings.horizontalHeight - (settings.horizontalHeight * scale)).toFixed(2));
        }
      } else {
        elem.css('zoom', scale);
      }
    };

    // counter for autoPlay (zero index firstSlide on init)
    core.currentSlide = settings.firstSlide - 1;

    // previous slide
    core.previousSlide = core.currentSlide;

    // next slide index
    core.nextSlide = function(index) {
      var next = index + 1 || core.currentSlide + 1;

      // closure
      return function() {
        return next++ % slide.l;
      };
    };

    // interval counter
    core.playing = 0;

    // animation active flag
    core.animationFlag = false;

    // calculate position of individual slide
    core.getSlidePosition = function(index, pos) {
      var position = {};

      if (typeof pos === 'number') {
        // group of slides
        if (orientation) { // horizontal
          if (settings.rtl) {
            position = { right : pos + index * tab.h };
          } else {
            position = { left : pos + index * tab.h };
          }
        } else { // vertical
          position = { top : pos + index * tab.h};
        }
      } else {
        // single slide above mid point
        if (orientation) { // horizontal
          if (settings.rtl) {
            position = { right : slide.w + index * tab.h };
          } else {
            position = { left : slide.w + index * tab.h };
          }
        } else { // vertical
          // fixed height
          position = { top : slide.h + index * tab.h };
        }
      }

      return position;
    };

    // trigger animation cycle
    core.animationCycle = function(e) {
      var $this = $(this),
          active = {
            slide : $this.parent(),
            index : tabs.index($this)
          };

      // additional props of active slide
      active.next = active.slide.next();
      active.prev = active.slide.prev();

      // update core.previousSlide, core.currentSlide
      core.previousSlide = core.currentSlide;
      core.currentSlide = active.index;

      // reset onSlideOpen callback flag
      core.animationFlag = false;

      // animate
      if (active.slide.hasClass('selected')) {
        // trigger callback in context of previous slide's panel <div>
        settings.onSlideOpen.call(active.prev.children('div')[0]);

        // animate single selected slide
        if (orientation) { // horizontal
          if ((settings.rtl && active.slide.position().left > parent.w / 2) || active.slide.position().left < parent.w / 2) {
            // animate single slide
            core.animateSlide.call(active);
          }
        } else { // vertical
          if (fitToContent && active.index) {
            // animate group (slide not index zero)
            core.animateGroup(active, true);

            // wrap height of accordion around slides
            core.fitToContent(active.prev);
          } else if (active.slide.position().top < parent.h / 2) {
            // animate single slide
            core.animateSlide.call(active);
          }
        }
      } else {
        // trigger callback in context of current slide's panel <div>
        // after delay of slideSpeed
        setTimeout(function() {
          settings.onSlideOpen.call(active.slide.children('div')[0]);
        }, settings.slideSpeed);

        // animate group of slides
        core.animateGroup(active);

        // wrap height of accordion around slides
        if (fitToContent) core.fitToContent(active.slide);
      }

      // stop autoplay, reset current slide index in core.nextSlide closure
      if (settings.autoPlay) {
        methods.stop();
        methods.play(tabs.index(slides.filter('.selected')));
      }
    };

    // animate single slide
    core.animateSlide = function(trigger) {
      var position;

      // set position for single selected tab
      if (typeof this.position === 'undefined') {
        this.position = core.getSlidePosition.call(this, this.index);
        // remove, then add selected class on single slide
        if (this.index) slides.removeClass('selected').filter(this.prev).addClass('selected');
      } else if (typeof this.position === 'number') { // group, or single tab below mid point
        position = this.position;
        this.position = core.getSlidePosition(this.index, position);
      }

      // if slide index not zero
      if (this.index) core.transition.call(this, trigger);
    };

    // animate group of slides
    core.animateGroup = function(trigger, single) {
      var group = ['left', 'right'];

      $.each(group, function(index, side) {
        var filterExpr, position;

        if (!index)  {
          // left side of expr (left or top position)
          if (single) {
            filterExpr = ':lt(' + (trigger.index) + ')';
          } else {
            filterExpr = ':lt(' + (trigger.index + 1) + ')';
          }
          position = 0;
        } else {
          // right side of expr (bottom or right position)
          if (single) {
            filterExpr = ':gt(' + (trigger.index - 1) + ')';
          } else {
            filterExpr = ':gt(' + trigger.index + ')';
          }

          if (orientation) { // horizontal
            position = slide.w;
          } else { // vertical
            if (fitToContent) {
              if (single) {
                position = trigger.prev.height() - tab.h;
              } else {
                // fit to content
                position = trigger.slide.height() - tab.h;
              }
            } else {
              // fixed height
              position = slide.h;
            }
          }
        }

        slides
          .filter(filterExpr)
          .each(function() {
            var $this = $(this),
                active = {
                  slide : $this,
                  index : slides.index($this),
                  next : $this.next(),
                  prev : $this.prev(),
                  position : position
                };

            // trigger item anim, pass original trigger context for callback fn
            core.animateSlide.call(active, trigger);
          });
      });

      // remove, then add selected class
      slides.removeClass('selected').filter(single ? trigger.prev : trigger.slide).addClass('selected');
    };

    // animate with css transitions, else fallback to jQuery animation
    core.transition = function(trigger) {
      var _this = this;

      // animate slide
      this
        .slide
        .stop(true)
        .animate(
          this.position,
          settings.slideSpeed,
          easing,
          function() {
            // flag ensures that fn is only called one time per triggerSlide
            if (!core.animationFlag) {
              // trigger slide callback
              settings.onSlideClose.call(slides.eq(core.previousSlide).children('div'));

              // set animation flag
              core.animationFlag = true;
            }
          });
    };

    core.init = function() {
      // check width and baseHeight are integers
      if (typeof settings.horizontalWidth !== 'number' || typeof settings.horizontalHeight !== 'number' || typeof settings.verticalHeight !== 'number') {
        throw new Error('horizontalWidth, horizontalHeight, and verticalHeight options must be integers.');
      }

      // FOUC prevention
      elem.hide();

      // fitToContent and scaleImages not compatible (?)
      if (fitToContent) settings.scaleImages = false;

      // linkable and startClosed not compatible
      if (settings.linkable) settings.startClosed = false;

      // check slide speed is not faster than cycle speed
      if (settings.cycleSpeed < settings.slideSpeed) settings.cycleSpeed = settings.slideSpeed;

      // setup dimensions, styles, slide positions and events
      setup.styles();

      // check images are loaded before setting up slide positions
      imagesLoaded(elem, function() {
        setup.dimensions();
        setup.ie();
        elem.delay(500).css('display', 'block'); // images loaded -> set plugin to visible before slidepositions need setting
        setup.slidePositions();
        setup.events();
        if (settings.startClosed) setup.startClosed();
      });

      // init autoplay
      if (!settings.startClosed && settings.autoPlay) methods.play();
    };

    // init plugin
    core.init();

    // expose methods
    return methods;
  };

  /**
   * Add plugin to $.fn
   */

  $.fn.accordionPro = function(method) {
    var elem = this,
        instance = elem.data('accordionPro');

    // if creating a new instance
    if (typeof method === 'object' || !method) {
      return elem.each(function() {
        var accordionPro;

        // if plugin already instantiated, return
        if (instance) return;

        // otherwise create a new instance
        accordionPro = new AccordionPro(elem, method);
        elem.data('accordionPro', accordionPro);
      });

    // otherwise, call method on current instance
    } else if (typeof method === 'string' && instance[method]) {
      // debug method isn't chainable b/c we need the debug object to be returned
      if (method === 'debug') {
        return instance[method].call(elem);
      } else { // the rest of the methods are chainable though
        instance[method].call(elem);
        return elem;
      }
    }
  };

})(jQuery);

