(function($) {
    $.fn.gLoad = function(options) {
        var settings = {
            threshold : 0,
            failurelimit : 0,
            event : "scroll",
            effect : "show",
            container : window,
            placeholderAsBg : false
        };
        if(options) {
            $.extend(settings, options);
        }
        var elements = this;
        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll", function(event) {
                var counter = 0;
                elements.each(function() {
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                            $(this).trigger("appear");
                    } else {
                        if (counter++ > settings.failurelimit) {
                            return false;
                        }
                    }
                });
                var temp = $.grep(elements, function(element) {
                    return !element.loaded;
                });
                elements = $(temp);
            });
        }
        this.each(function() {
            var self = this;
            
            if ("scroll" != settings.event ||
                    $(self).find("img").length  == 0 ||
                    settings.placeholder == $(self).find("img").attr('src') ||
                    ($.abovethetop(self, settings) ||
                     $.leftofbegin(self, settings) ||
                     $.belowthefold(self, settings) ||
                     $.rightoffold(self, settings) )) {
                        
                if (settings.placeholder && settings.placeholderAsBg) {
                    $(self).css('background', 'transparent URL(' + settings.placeholder + ') no-repeat center center')
                } 
                else if(settings.placeholder) {
                    $('<img />').attr('src', settings.placeholder).appendTo(self);
                }
                self.loaded = false;
            } else {
                self.loaded = true;
            }
            $(self).one("appear", function() {
                if (!this.loaded) {
                    var i = $(this).find('img');
                    if(i.length > 0) {
                      $("<img />").bind("load", function() {
                              $(i)
                                  .hide()
                                  .attr("src", $(self).attr("data-src"))
                                  [settings.effect](settings.effectspeed);
                              self.loaded = true;
                      }).attr("src", $(self).attr("data-src"));
                    } else {
                      $('<img />').attr("src", $(self).attr("data-src")).appendTo(self);
                    }
                    $(self).removeAttr('data-src');
                    if(settings.placeholderAsBg) {
                      $(self).css('background', 'none');
                    }
                };
            });

            if ("scroll" != settings.event) {
                $(self).bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });

        $(settings.container).trigger(settings.event);
        return this;

    };
    $.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience. */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold" : "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold" : "!$.rightoffold(a, {threshold : 0, container: window})"
    });
    
})(jQuery);
