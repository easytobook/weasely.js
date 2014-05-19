;(function(window, document, $) {

  'use strict';
  var pluginName = "stickyIcky";

  var StickyIcky = (function() {


    function StickyIcky(element, options) {
      this.$el = $(element);
      var defaults = {
        container: this.$el.parent()
      }
      this.settings = $.extend( {}, defaults, options );

      this.lastScroll = 0;

      this.init();
    }

    StickyIcky.prototype.init = function(args) {
      this.$container = this.settings.container;

      var self = this;

      this.$container.find('.scroll-container').bind('touchmove', function(ev){
        self.requestTick();
      });

      this.$container.find('.scroll-container').bind('scroll', function(ev){
        self.requestTick();

      });
    };

    StickyIcky.prototype.requestTick = function(ev){
      var self = this;
      if(!this.ticking) {
        requestAnimationFrame(function(){
          self.ticking = true;
          self.update();
        });
      }
    };

    StickyIcky.prototype.update = function(){
      var scrollTop = Math.abs(this.$container.find('.scroll-container').scrollTop());
      if(scrollTop != this.lastScroll){
        if(scrollTop > this.lastScroll){
          this.$el.addClass('slide-up');
        }
        else{
          this.$el.removeClass('slide-up');
        }
      }
      this.lastScroll = scrollTop;
      this.ticking = false;
    };
    return StickyIcky;
  })();

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" + pluginName, new StickyIcky( this, options ) );
      }
    });
  };
}(window, document, window.jQuery));