;(function(window, document, $) {

  'use strict';
  var pluginName = "weasely";

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());



  var Weasely = (function() {
    function Weasely(element, options) {
      this.$el = $(element);
      var defaults = {
        hideClass: 'slide-up',
        scrollingElement: '.weasely-scroller'
      }
      this.settings = $.extend( {}, defaults, options );
      this.elementHeight = this.$el.outerHeight();
      this.lastScroll = 0;
      this.disabled = false;
      this.threshold = this.settings.threshold || 0;
      this.init();
    }

    Weasely.prototype.init = function(args) {
      this.$scroller = $(this.settings.scrollingElement);
      var self = this;
      this.$scroller.bind('touchmove', function(ev){
        self.requestTick();
      });
      this.$scroller.bind('scroll', function(ev){
        self.requestTick();
      });
    };

    Weasely.prototype.requestTick = function(ev){
      var self = this;
      if(!this.ticking && !this.disabled) {
        requestAnimationFrame(function(){
          self.ticking = true;
          self.update();
        });
      }
    };

    Weasely.prototype.update = function(){
      var scrollTop = Math.abs(this.$scroller.scrollTop());
      if(scrollTop != this.lastScroll){
        if(scrollTop > this.lastScroll && scrollTop > this.elementHeight && scrollTop > this.threshold){
          this.$el.addClass(this.settings.hideClass);
        }
        else{
          this.$el.removeClass(this.settings.hideClass);
        }
      }
      this.lastScroll = scrollTop;
      this.ticking = false;
    };

    Weasely.prototype.off = function(){

      this.disabled = true;
      this.$el.removeClass(this.settings.hideClass);
    };

    Weasely.prototype.on = function(){
      this.disabled = false;
    };

    return Weasely;
  })();

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if ( !$.data( this, pluginName ) ) {
        $.data( this, pluginName, new Weasely( this, options ) );
      }
    });
  };
}(window, document, window.jQuery));