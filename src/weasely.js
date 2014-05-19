;(function(window, document, $) {

  'use strict';
  var pluginName = "weasely";

  var Weasely = (function() {
    function Weasely(element, options) {
      this.$el = $(element);
      var defaults = {
        // container: this.$el.parent()
      }
      this.settings = $.extend( {}, defaults, options );
      this.elementHeight = this.$el.outerHeight();
      this.lastScroll = 0;
      this.init();
    }

    Weasely.prototype.init = function(args) {
      this.$scroller = this.$el.siblings('.weasely-scroller');
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
      if(!this.ticking) {
        requestAnimationFrame(function(){
          self.ticking = true;
          self.update();
        });
      }
    };

    Weasely.prototype.update = function(){
      var scrollTop = Math.abs(this.$scroller.scrollTop());
      var delta = scrollTop - this.lastScroll;
      if(scrollTop != this.lastScroll){
        if(scrollTop > this.lastScroll && scrollTop > this.elementHeight){
          this.$el.addClass('slide-up');
        }
        else{
          this.$el.removeClass('slide-up');
        }
      }
      this.lastScroll = scrollTop;
      this.ticking = false;
    };

    return Weasely;
  })();

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" + pluginName, new Weasely( this, options ) );
      }
    });
  };
}(window, document, window.jQuery));