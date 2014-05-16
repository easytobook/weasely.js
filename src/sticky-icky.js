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
      var $container = this.settings.container;
      var self = this;
      $container.bind('scroll', function(ev){
        var scrollTop = $(ev.target).scrollTop();
        if(self.lastScroll < scrollTop){
          self.requestTick();
        }
        self.lastScroll = scrollTop;
      })
    };

    StickyIcky.prototype.requestTick = function(){
      if(!this.ticking) {
        requestAnimationFrame(this.update.bind(this));
        this.ticking = true;
      }
    };

    StickyIcky.prototype.update = function(){
      console.log('update!', this);
      this.$el.addClass('slide-up')
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

  window.StickyIcky = StickyIcky;




}(window, document, window.jQuery));