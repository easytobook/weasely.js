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
      this.$container.bind('scroll', function(ev){
        self.requestTick();
      })
    };

    StickyIcky.prototype.requestTick = function(){
      if(!this.ticking) {
        requestAnimationFrame(this.update.bind(this));
        this.ticking = true;
      }
      // this.lastScroll = this.$container.scrollTop();
    };

    StickyIcky.prototype.update = function(){
      console.log('update!', this.lastScroll, this.$container.scrollTop());
      if(0 < this.$container.scrollTop()){
        this.$el.addClass('slide-up');
      }
      else{
        this.$el.removeClass('slide-up');
      }

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