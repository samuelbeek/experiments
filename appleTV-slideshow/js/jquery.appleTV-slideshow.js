(function($) {
  
  var PROP_NAME = 'atv';
  
  function AppleTV() {
    this._defaults = {
      source: 'flickr',
      nsid: '39474694@N00',
      lang: 'en-us'
    };
  }
  
  $.extend(AppleTV.prototype, {
    
    markerClassName: 'hasAppleTV',
    baseFlickrURL: 'http://api.flickr.com/services/feeds/photos_public.gne?',
    flickrUserURL: 'id={nsid}&lang={lang}&format=json&jsoncallback=?',
    
    _attachAppleTVPlugin: function(target, settings) {
      target = $(target);
      if (target.hasClass(this.markerClassName)) {
        // prevent attaching functionality to same element more than once
        return;
      }
      target.addClass(this.markerClassName);

      target.hide();
      var instance = {settings: $.extend({}, this._defaults)};
  		$.data(target[0], PROP_NAME, instance);
      this._fetchFlickrData(target, settings);
    },
    
    _fetchFlickrData: function(element, settings) {
      var instance = $.data(element[0], PROP_NAME);
      $.extend(instance.settings, settings);
      var self = this;
      
      $.getJSON(this._generateFlickrUrl(element, settings), function(data) {
        self._processPhotosArray(data.items, element, settings);
      });
    },
    
    _processPhotosArray: function(photosArray, element, settings) {
      var instance = $.data(element[0], PROP_NAME);
      $.extend(instance.settings, settings);
      
      $('<ul/>').appendTo(element);
      
      $(photosArray).each(function(i, item) {
        var elem = $('<li/>').html($('<img/>').attr('src', item.media.m).addClass('photo')).appendTo($('ul', element));
      });
      
      this._startPlayback(element, settings);
    },
    
    _startPlayback: function(element, settings) {
      var instance = $.data(element[0], PROP_NAME);
      $.extend(instance.settings, settings);
      var self = this;
      
      var items = $(element).find('img');
      for(var i=0; i<items.length; i++) {
        var item = items[i];
        self._animatePhoto(item);
      }
      
      $(element).fadeIn();
      // move this to a webkitAnimationEnd event
      setTimeout(function() {
        $(element).addClass('flip');
      }, 2000);
    },
    
    _animatePhoto: function(photo) {
      /* random position on screen within 1000x1000 roughly */
      var xPos = Math.floor(Math.random() * 800) + 'px';
      var yPos = Math.floor(Math.random() * 800) + 'px';
      
      /* random size 25%, 50%, 75%, or 100% */
      var sizes = ['25', '50', '75', '100'];
      var size = sizes[Math.floor(Math.random()*sizes.length)];
      $(photo).addClass('size' + size);
      
      $(photo).css('position', 'absolute').
               css({'left': xPos, 'top': yPos}).
               addClass('moveUp').
               fadeIn(1000);
      
    },
    
    _generateFlickrUrl: function(element, settings) {
      var instance = $.data(element[0], PROP_NAME);
      $.extend(instance.settings, settings);
      var url = this.baseFlickrURL + this.flickrUserURL;
      url = url.replace(/\{nsid\}/, instance.settings.nsid);
      url = url.replace(/\{lang\}/, instance.settings.lang);
      return url;
    }
    
  });
  
  $.fn.appleTV = function(options) {
    return this.each(function() {
      if (typeof options == 'string') {
        $.appleTV['_' + options + 'AppleTV'].
          apply($.appleTV, [this].concat(otherArgs));
      }
      else {
        $.appleTV._attachAppleTVPlugin(this, options || {});
      }
    });
  };

  $.appleTV = new AppleTV(); // singleton instance
  
})(jQuery);