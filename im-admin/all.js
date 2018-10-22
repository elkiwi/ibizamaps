// JavaScript Document
$(document).ready(function () {
							
		


	/*----------------------------------------------------------------------*/
	/* Parse the data from an data-attribute of DOM Elements
	/*----------------------------------------------------------------------*/


	$.parseData = function (data, returnArray) {
		if (/^\[(.*)\]$/.test(data)) { //array
			data = data.substr(1, data.length - 2).split(',');
		}
		if (returnArray && !$.isArray(data) && data != null) {
			data = Array(data);
		}
		return data;
	};
	
	/*----------------------------------------------------------------------*/
	/* Image Preloader
	/* http://engineeredweb.com/blog/09/12/preloading-images-jquery-and-javascript
	/*----------------------------------------------------------------------*/
	


	// Arguments are image paths relative to the current page.
	$.preload = function() {
		var cache = [],
			args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		}
	};
	
	
	/*----------------------------------------------------------------------*/
	/* fadeInSlide by revaxarts.com
	/* Fades out a box and slide it up before it will get removed
	/*----------------------------------------------------------------------*/


	$.fn.fadeInSlide = function (speed, callback) {
		if ($.isFunction(speed)) callback = speed;
		if (!speed) speed = 200;
		if (!callback) callback = function () {};
		this.each(function () {

			var $this = $(this);
			$this.fadeTo(speed / 2, 1).slideDown(speed / 2, function () {
				callback();
			});
		});
		return this;
	};
	
	
	/*----------------------------------------------------------------------*/
	/* fadeOutSlide by revaxarts.com
	/* Fades out a box and slide it up before it will get removed
	/*----------------------------------------------------------------------*/


	$.fn.fadeOutSlide = function (speed, callback) {
		if ($.isFunction(speed)) callback = speed;
		if (!speed) speed = 200;
		if (!callback) callback = function () {};
		this.each(function () {

			var $this = $(this);
			$this.fadeTo(speed / 2, 0).slideUp(speed / 2, function () {
				$this.remove();
				callback();
			});
		});
		return this;
	};
	
	/*----------------------------------------------------------------------*/
	/* textFadeOut by revaxarts.com
	/* Fades out a box and slide it up before it will get removed
	/*----------------------------------------------------------------------*/


	$.fn.textFadeOut = function (text, delay, callback) {
		if (!text) return false;
		if ($.isFunction(delay)) callback = delay;
		if (!delay) delay = 2000;
		if (!callback) callback = function () {};
		this.each(function () {

			var $this = $(this);
			$this.stop().text(text).show().delay(delay).fadeOut(1000,function(){
				$this.text('').show();
				callback();
			})
		});
		return this;
	};
	
	/*----------------------------------------------------------------------*/
	/* leadingZero by revaxarts.com
	/* adds a leding zero if necessary
	/*----------------------------------------------------------------------*/
	
	
	$.leadingZero = function (value) {
		value = parseInt(value, 10);
		if(!isNaN(value)) {
			(value < 10) ? value = '0' + value : value;
		}
		return value;
	};


});

/*----------------------------------------------------------------------*/
/* jQuery UI Touch Punch 0.1.0
/* Copyright 2010, Dave Furfero
/* https://github.com/furf/jquery-ui-touch-punch
/* Extend the jQuery UI for iPad an iPhone
/* depends jquery.ui.widget.js, jquery.ui.mouse.js
/*----------------------------------------------------------------------*/


(function ($) {
	$.support.touch = typeof Touch === 'object';

	if (!$.support.touch) {
		return;
	}

	var mouseProto = $.ui.mouse.prototype,
		_mouseInit = mouseProto._mouseInit,
		_mouseDown = mouseProto._mouseDown,
		_mouseUp = mouseProto._mouseUp,

		mouseEvents = {
			touchstart: 'mousedown',
			touchmove: 'mousemove',
			touchend: 'mouseup'
		};

	function makeMouseEvent(event) {
		event.stopPropagation();
		var touch = event.originalEvent.changedTouches[0];
		return $.extend(event, {
			type: mouseEvents[event.type],
			which: 1,
			pageX: touch.pageX,
			pageY: touch.pageY,
			screenX: touch.screenX,
			screenY: touch.screenY,
			clientX: touch.clientX,
			clientY: touch.clientY
		});
	}

	mouseProto._mouseInit = function () {

		var self = this;

		self.element.bind('touchstart.' + self.widgetName, function (event) {
			return self._mouseDown(makeMouseEvent(event));
		});

		_mouseInit.call(self);
	};

	mouseProto._mouseDown = function (event) {


		var self = this,
			ret = _mouseDown.call(self, event);

		if (self.options.handle && !$(event.target).is(self.options.handle)) {
			mouseProto._mouseUp(event);
			return;
		}

		self._touchMoveDelegate = function (event) {
			return self._mouseMove(makeMouseEvent(event));
		};

		self._touchEndDelegate = function (event) {
			return self._mouseUp(makeMouseEvent(event));
		};

		$(document).bind('touchmove.' + self.widgetName, self._touchMoveDelegate).bind('touchend.' + self.widgetName, self._touchEndDelegate);

		return ret;
	};

	mouseProto._mouseUp = function (event) {

		var self = this;
		$(document).unbind('touchmove.' + self.widgetName, self._touchMoveDelegate).unbind('touchend.' + self.widgetName, self._touchEndDelegate);

		return _mouseUp.call(self, event);
	};
})(jQuery);


/*----------------------------------------------------------------------*/
/* jQuery MouseWheel Plugin by Brandon Aaron
/* http://brandonaaron.net/code/mousewheel/docs
/*----------------------------------------------------------------------*/


(function ($) {

	$.event.special.mousewheel = {
		setup: function () {
			var handler = $.event.special.mousewheel.handler;

			// Fix pageX, pageY, clientX and clientY for mozilla
			if ($.browser.mozilla) $(this).bind('mousemove.mousewheel', function (event) {
				$.data(this, 'mwcursorposdata', {
					pageX: event.pageX,
					pageY: event.pageY,
					clientX: event.clientX,
					clientY: event.clientY
				});
			});

			if (this.addEventListener) this.addEventListener(($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
			else this.onmousewheel = handler;
		},

		teardown: function () {
			var handler = $.event.special.mousewheel.handler;

			$(this).unbind('mousemove.mousewheel');

			if (this.removeEventListener) this.removeEventListener(($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
			else this.onmousewheel = function () {};

			$.removeData(this, 'mwcursorposdata');
		},

		handler: function (event) {
			var args = Array.prototype.slice.call(arguments, 1);

			event = $.event.fix(event || window.event);
			// Get correct pageX, pageY, clientX and clientY for mozilla
			$.extend(event, $.data(this, 'mwcursorposdata') || {});
			var delta = 0,
				returnValue = true;

			if (event.wheelDelta) {
				delta = (event.wheelDelta / 120);
			}
			if (event.detail) {
				delta = (-event.detail / 3);
			}
			//if ( $.browser.opera  ) delta=(event.wheelDelta/120);
			event.data = event.data || {};
			event.type = "mousewheel";

			// Add delta to the front of the arguments
			args.unshift(delta);
			// Add event to the front of the arguments
			args.unshift(event);

			return $.event.handle.apply(this, args);
		}
	};

	$.fn.extend({
		mousewheel: function (fn) {
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
		},

		unmousewheel: function (fn) {
			return this.unbind("mousewheel", fn);
		}
	});

})(jQuery);


/*----------------------------------------------------------------------*/
/* jQuery Tipsy Plugin by Jason Frame https://twitter.com/jaz303 v 1.0.0a
/* http://onehackoranother.com/projects/jquery/tipsy/
/* (c) 2008-2010 jason frame [jason@onehackoranother.com]
/* releated under the MIT license
/*
/* !!! I did some modifications on that plugin! !!!
/*----------------------------------------------------------------------*/
	


(function ($) {
	function fixTitle($ele) {
		if ($ele.attr('title') || typeof ($ele.attr('original-title')) != 'string') {
			$ele.attr('original-title', $ele.attr('title') || '').removeAttr('title');
		}
	}

	function Tipsy(element, options) {
		this.$element = $(element);
		this.options = options;
		this.enabled = true;
		fixTitle(this.$element);
	}

	Tipsy.prototype = {
		show: function () {
			var title = this.getTitle();
			if (title && this.enabled) {
				var $tip = this.tip();

				$tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
				$tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
				$tip.remove().css({
					top: 0,
					left: 0,
					visibility: 'hidden',
					display: 'block'
				}).appendTo(this.options.appendTo);
				var pos = $.extend({}, this.$element.offset(), {
					width: this.$element[0].offsetWidth,
					height: this.$element[0].offsetHeight
				});
				if(this.options.appendTo != 'body')pos.top = pos.left = 0;
				
				var actualWidth = $tip[0].offsetWidth,
					actualHeight = $tip[0].offsetHeight;
				var gravity = (typeof this.options.gravity == 'function') ? this.options.gravity.call(this.$element[0]) : this.options.gravity;

				var tp;
				var mp;
				switch (gravity.charAt(0)) {
				case 'n':
					tp = {
						top: pos.top + pos.height + this.options.offset,
						left: pos.left + pos.width / 2 - actualWidth / 2
					};
					mp = {top:15,left:-actualWidth/2};
					break;
				case 's':
					tp = {
						top: pos.top - actualHeight - this.options.offset,
						left: pos.left + pos.width / 2 - actualWidth / 2
					};
					mp = {top:-actualHeight-15,left:-actualWidth/2};
					break;
				case 'e':
					tp = {
						top: pos.top + pos.height / 2 - actualHeight / 2,
						left: pos.left - actualWidth - this.options.offset
					};
					mp = {top:-actualHeight/2,left:-12-actualWidth};
					break;
				case 'w':
					tp = {
						top: pos.top + pos.height / 2 - actualHeight / 2,
						left: pos.left + pos.width + this.options.offset
					};
					mp = {top:-actualHeight/2,left:12};
					break;
				}
				if (gravity.length == 2) {
					if (gravity.charAt(1) == 'w') {
						//tp.left = pos.left + pos.width / 2 - 15;
						tp.left = pos.left - 5;
						mp.left += actualWidth/2-15;
					} else {
						//tp.left = pos.left + pos.width / 2 - actualWidth + 15;
						mp.left -= actualWidth/2-15;
						tp.left = pos.left + pos.width - actualWidth + 5;
					}
				}
				
				if(this.options.followMouse){
					$(document).bind('mousemove.tipsy',function(e){
						var x = e.pageX+mp.left, y = e.pageY+mp.top;
						$tip.css({
							left: x,
							top: y
						});
					});
				}
				
				$tip.css(tp).addClass('tipsy-' + gravity);
				if (this.options.fade) {
					$tip.stop().css({
						opacity: 0,
						display: 'block',
						visibility: 'visible'
					}).animate({
						opacity: this.options.opacity
					});
				} else {
					$tip.css({
						visibility: 'visible',
						opacity: this.options.opacity
					});
				}
			}
		},

		hide: function () {
			if(this.options.followMouse){
				$(document).unbind('mousemove.tipsy');
			}
			if (this.options.fade) {
				this.tip().stop().fadeOut(function () {
					$(this).remove();
				});
			} else {
				this.tip().remove();
			}
		},

		getTitle: function () {
			var title, $e = this.$element,
				o = this.options;
			fixTitle($e);
			var title, o = this.options;
			if (typeof o.title == 'string') {
				title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
			} else if (typeof o.title == 'function') {
				title = o.title.call($e[0]);
			}
			if(!title) title = o.fallback;
			title = ('' + title).replace(/(^\s*|\s*$)/, "");
			return title || o.fallback;
		},
		
		setTitel: function(title) {
			this.options.fallback = title;
		},

		tip: function () {
			if (!this.$tip) {
				this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-outer"><div class="tipsy-inner"/></div></div>');
			}
			return this.$tip;
		},

		validate: function () {
			if (!this.$element[0].parentNode) {
				this.hide();
				this.$element = null;
				this.options = null;
			}
		},

		enable: function () {
			this.enabled = true;
		},
		disable: function () {
			this.enabled = false;
		},
		update: function () {
			var $tip = this.tip();
			$tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](this.options.fallback);
		},
		toggleEnabled: function () {
			this.enabled = !this.enabled;
		}
	};

	$.fn.tipsy = function (options) {

		if (options === true) {
			return this.data('tipsy');
		} else if (typeof options == 'string') {
			return this.data('tipsy')[options](arguments[1], arguments[2]);
		}

		options = $.extend({}, $.fn.tipsy.defaults, options);

		function get(ele) {
			var tipsy = $.data(ele, 'tipsy');
			if (!tipsy) {
				tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
				$.data(ele, 'tipsy', tipsy);
			}
			return tipsy;
		}

		function enter() {
			var tipsy = get(this);
			tipsy.hoverState = 'in';
			if (options.delayIn == 0) {
				tipsy.show();
			} else {
				setTimeout(function () {
					if (tipsy.hoverState == 'in') tipsy.show();
				}, options.delayIn);
			}
		};

		function leave() {
			var tipsy = get(this);
			tipsy.hoverState = 'out';
			if (options.delayOut == 0) {
				tipsy.hide();
			} else {
				setTimeout(function () {
					if (tipsy.hoverState == 'out') tipsy.hide();
				}, options.delayOut);
			}
		};

		if (!options.live) this.each(function () {
			get(this);
		});
		if (options.trigger != 'manual') {
			var binder = options.live ? 'live' : 'bind',
				eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
				eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
			this[binder](eventIn+'.tipsy', enter)[binder](eventOut+'.tipsy', leave);
		}

		return this;

	};

	$.fn.tipsy.defaults = {
		delayIn: 0,
		delayOut: 0,
		fade: false,
		fallback: '',
		gravity: 'n',
		html: false,
		live: false,
		offset: 0,
		opacity: 0.8,
		//CUSTOM followMouse
		followMouse: false,
		appendTo: 'body',
		title: 'title',
		trigger: 'hover'
	};

	// Overwrite this method to provide options on a per-element basis.
	// For example, you could store the gravity in a 'tipsy-gravity' attribute:
	// return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
	// (remember - do not modify 'options' in place!)
	$.fn.tipsy.elementOptions = function (ele, options) {
		return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
	};

	$.fn.tipsy.autoNS = function () {
		return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
	};

	$.fn.tipsy.autoWE = function () {
		return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
	};

})(jQuery);


/*----------------------------------------------------------------------*/
/* jQuery Uniform v1.7.5
/* Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
/* http://pixelmatrixdesign.com
/* License: MIT License - http://www.opensource.org/licenses/mit-license.php
/*----------------------------------------------------------------------*/
	

(function($) {
  $.uniform = {
    options: {
      selectClass:   'selector',
      radioClass: 'radio',
      checkboxClass: 'checker',
      fileClass: 'uploader',
      filenameClass: 'filename',
      fileBtnClass: 'action',
      fileDefaultText: 'No file selected',
      fileBtnText: 'Choose File',
      checkedClass: 'checked',
      focusClass: 'focus',
      disabledClass: 'disabled',
      buttonClass: 'button',
      activeClass: 'active',
      hoverClass: 'hover',
      useID: true,
      idPrefix: 'uniform',
      resetSelector: false,
      autoHide: true
    },
    elements: []
  };

  if($.browser.msie && $.browser.version < 7){
    $.support.selectOpacity = false;
  }else{
    $.support.selectOpacity = true;
  }

  $.fn.uniform = function(options) {

    options = $.extend($.uniform.options, options);

    var el = this;
    //code for specifying a reset button
    if(options.resetSelector != false){
      $(options.resetSelector).mouseup(function(){
        function resetThis(){
          $.uniform.update(el);
        }
        setTimeout(resetThis, 10);
      });
    }
    
    function doInput(elem){
      $el = $(elem);
      $el.addClass($el.attr("type"));
      storeElement(elem);
    }
    
    function doTextarea(elem){
      $(elem).addClass("uniform");
      storeElement(elem);
    }
    
    function doButton(elem){
      var $el = $(elem);
      
      var divTag = $("<div>"),
          spanTag = $("<span>");
      
      divTag.addClass(options.buttonClass);
      
      if(options.useID && $el.attr("id") != "") divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      
      var btnText;
      
      if($el.is("a") || $el.is("button")){
        btnText = $el.text();
      }else if($el.is(":submit") || $el.is(":reset") || $el.is("input[type=button]")){
        btnText = $el.attr("value");
      }
      
      btnText = btnText == "" ? $el.is(":reset") ? "Reset" : "Submit" : btnText;
      
      spanTag.html(btnText);
      
      $el.css("opacity", 0);
      $el.wrap(divTag);
      $el.wrap(spanTag);
      
      //redefine variables
      divTag = $el.closest("div");
      spanTag = $el.closest("span");
      
      if($el.is(":disabled")) divTag.addClass(options.disabledClass);
      
      divTag.bind({
        "mouseenter.uniform": function(){
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function(){
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function(){
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(e){
          if($(e.target).is("span") || $(e.target).is("div")){    
            if(elem[0].dispatchEvent){
              var ev = document.createEvent('MouseEvents');
              ev.initEvent( 'click', true, true );
              elem[0].dispatchEvent(ev);
            }else{
              elem[0].click();
            }
          }
        }
      });
      
      elem.bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        }
      });
      
      $.uniform.noSelect(divTag);
      storeElement(elem);
      
    }

    function doSelect(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.selectClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }
      
      var selected = elem.find(":selected:first");
      if(selected.length == 0){
        selected = elem.find("option:first");
      }
      spanTag.html(selected.html());
      
      elem.css('opacity', 0);
      elem.wrap(divTag);
      elem.before(spanTag);

      //redefine variables
      divTag = elem.parent("div");
      spanTag = elem.siblings("span");

      elem.bind({
        "change.uniform": function() {
          spanTag.text(elem.find(":selected").html());
          divTag.removeClass(options.activeClass);
        },
        "focus.uniform": function() {
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function() {
          divTag.removeClass(options.focusClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "keyup.uniform": function(){
          spanTag.text(elem.find(":selected").html());
        }
      });
      
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      $.uniform.noSelect(spanTag);
      
      storeElement(elem);

    }

    function doCheckbox(elem){
      var $el = $(elem);
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }
      
      divTag.addClass(options.checkboxClass);

      //assign the id of the element
      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span.
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });
      
      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check our box
        spanTag.addClass(options.checkedClass);
      }

      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);
    }

    function doRadio(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
          
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.radioClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span
            var classes = options.radioClass.split(" ")[0];
            $("." + classes + " span." + options.checkedClass + ":has([name='" + $(elem).attr('name') + "'])").removeClass(options.checkedClass);
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchend.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform touchbegin.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform touchend.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check span
        spanTag.addClass(options.checkedClass);
      }
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);

    }

    function doFile(elem){
      //sanitize input
      var $el = $(elem);

      var divTag = $('<div />'),
          filenameTag = $('<span>'+options.fileDefaultText+'</span>'),
          btnTag = $('<span>'+options.fileBtnText+'</span>');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.fileClass);
      filenameTag.addClass(options.filenameClass);
      btnTag.addClass(options.fileBtnClass);

      if(options.useID && $el.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      }

      //wrap with the proper elements
      $el.wrap(divTag);
      $el.after(btnTag);
      $el.after(filenameTag);

      //redefine variables
      divTag = $el.closest("div");
      filenameTag = $el.siblings("."+options.filenameClass);
      btnTag = $el.siblings("."+options.fileBtnClass);

      //set the size
      if(!$el.attr("size")){
        var divWidth = divTag.width();
        //$el.css("width", divWidth);
        $el.attr("size", divWidth/10);
      }

      //actions
      var setFilename = function()
      {
        var filename = $el.val();
        if (filename === '')
        {
          filename = options.fileDefaultText;
        }
        else
        {
          filename = filename.split(/[\/\\]+/);
          filename = filename[(filename.length-1)];
        }
        filenameTag.text(filename);
      };

      // Account for input saved across refreshes
      setFilename();

      $el
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "mousedown.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      // IE7 doesn't fire onChange until blur or second fire.
      if ($.browser.msie){
        // IE considers browser chrome blocking I/O, so it
        // suspends tiemouts until after the file has been selected.
        $el.bind('click.uniform.ie7', function() {
          setTimeout(setFilename, 0);
        });
      }else{
        // All other browsers behave properly
        $el.bind('change.uniform', setFilename);
      }

      //handle defaults
      if($el.attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      
      $.uniform.noSelect(filenameTag);
      $.uniform.noSelect(btnTag);
      
      storeElement(elem);

    }
    
    $.uniform.restore = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      
      $(elem).each(function(){
        if($(this).is(":checkbox")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is("select")){
          //remove sibling span
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is(":radio")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is(":file")){
          //remove sibling spans
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is("button, :submit, :reset, a, input[type='button']")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }
        
        //unbind events
        $(this).unbind(".uniform");
        
        //reset inline style
        $(this).css("opacity", "1");
        
        //remove item from list of uniformed elements
        var index = $.inArray($(elem), $.uniform.elements);
        $.uniform.elements.splice(index, 1);
      });
    };

    function storeElement(elem){
      //store this element in our global array
      elem = $(elem).get();
      if(elem.length > 1){
        $.each(elem, function(i, val){
          $.uniform.elements.push(val);
        });
      }else{
        $.uniform.elements.push(elem);
      }
    }
    
    //noSelect v1.0
    $.uniform.noSelect = function(elem) {
      function f() {
       return false;
      };
      $(elem).each(function() {
       this.onselectstart = this.ondragstart = f; // Webkit & IE
       $(this)
        .mousedown(f) // Webkit & Opera
        .css({ MozUserSelect: 'none' }); // Firefox
      });
     };

    $.uniform.update = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      //sanitize input
      elem = $(elem);

      elem.each(function(){
        //do to each item in the selector
        //function to reset all classes
        var $e = $(this);

        if($e.is("select")){
          //element is a select
          var spanTag = $e.siblings("span");
          var divTag = $e.parent("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          //reset current selected text
          spanTag.html($e.find(":selected").html());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":checkbox")){
          //element is a checkbox
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":radio")){
          //element is a radio
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":file")){
          var divTag = $e.parent("div");
          var filenameTag = $e.siblings(options.filenameClass);
          btnTag = $e.siblings(options.fileBtnClass);

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          filenameTag.text($e.val());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":submit") || $e.is(":reset") || $e.is("button") || $e.is("a") || elem.is("input[type=button]")){
          var divTag = $e.closest("div");
          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
          
        }
        
      });
    };

    return this.each(function() {
      if($.support.selectOpacity){
        var elem = $(this);

        if(elem.is("select")){
          //element is a select
          if(elem.attr("multiple") != true){
            //element is not a multi-select
            if(elem.attr("size") == undefined || elem.attr("size") <= 1){
              doSelect(elem);
            }
          }
        }else if(elem.is(":checkbox")){
          //element is a checkbox
          doCheckbox(elem);
        }else if(elem.is(":radio")){
          //element is a radio
          doRadio(elem);
        }else if(elem.is(":file")){
          //element is a file upload
          doFile(elem);
        }else if(elem.is(":text, :password, input[type='email']")){
          doInput(elem);
        }else if(elem.is("textarea")){
          doTextarea(elem);
        }else if(elem.is("a") || elem.is(":submit") || elem.is(":reset") || elem.is("button") || elem.is("input[type=button]")){
          doButton(elem);
        }
          
      }
    });
  };
})(jQuery);


/*----------------------------------------------------------------------*/
/* Elastic jQuery plugin v1.6.5
/* Copyright 2011, Jan Jarfalk
/* http://www.unwrongest.com
/* MIT License - http://www.opensource.org/licenses/mit-license.php
/*----------------------------------------------------------------------*/


(function(jQuery){ 
	jQuery.fn.extend({  
		elastic: function() {
		
			//	We will create a div clone of the textarea
			//	by copying these attributes from the textarea to the div.
			var mimics = [
				'paddingTop',
				'paddingRight',
				'paddingBottom',
				'paddingLeft',
				'fontSize',
				'lineHeight',
				'fontFamily',
				'width',
				'fontWeight'];
			
			return this.each( function() {
				
				// Elastic only works on textareas
				if ( this.type != 'textarea' ) {
					return false;
				}
				
				var $textarea	=	jQuery(this),
					$twin		=	jQuery('<div />').css({'position': 'absolute','display':'none','word-wrap':'break-word'}),
					lineHeight	=	parseInt($textarea.css('line-height'),10) || parseInt($textarea.css('font-size'),'10'),
					minheight	=	parseInt($textarea.css('height'),10) || lineHeight*3,
					maxheight	=	parseInt($textarea.css('max-height'),10) || Number.MAX_VALUE,
					goalheight	=	0,
					i 			=	0;
				
				// Opera returns max-height of -1 if not set
				if (maxheight < 0) { maxheight = Number.MAX_VALUE; }
					
				// Append the twin to the DOM
				// We are going to meassure the height of this, not the textarea.
				$twin.appendTo($textarea.parent());
				
				// Copy the essential styles (mimics) from the textarea to the twin
				var i = mimics.length;
				while(i--){
					$twin.css(mimics[i].toString(),$textarea.css(mimics[i].toString()));
				}
				
				
				// Sets a given height and overflow state on the textarea
				function setHeightAndOverflow(height, overflow){
					curratedHeight = Math.floor(parseInt(height,10));
					if($textarea.height() != curratedHeight){
						$textarea.css({'height': curratedHeight + 'px','overflow':overflow});
						
					}
				}
				
				
				// This function will update the height of the textarea if necessary 
				function update() {
					
					// Get curated content from the textarea.
					var textareaContent = $textarea.val().replace(/&/g,'&amp;').replace(/  /g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');
					
					// Compare curated content with curated twin.
					var twinContent = $twin.html().replace(/<br>/ig,'<br />');
					
					if(textareaContent+'&nbsp;' != twinContent){
					
						// Add an extra white space so new rows are added when you are at the end of a row.
						$twin.html(textareaContent+'&nbsp;');
						
						// Change textarea height if twin plus the height of one line differs more than 3 pixel from textarea height
						if(Math.abs($twin.height() + lineHeight - $textarea.height()) > 3){
							
							var goalheight = $twin.height()+lineHeight;
							if(goalheight >= maxheight) {
								setHeightAndOverflow(maxheight,'auto');
							} else if(goalheight <= minheight) {
								setHeightAndOverflow(minheight,'hidden');
							} else {
								setHeightAndOverflow(goalheight,'hidden');
							}
							
						}
						
					}
					
				}
				
				// Hide scrollbars
				$textarea.css({'overflow':'hidden'});
				
				// Update textarea size on keyup, change, cut and paste
				$textarea.bind('keyup change cut paste', function(){
					update(); 
				});
				
				// Compact textarea on blur
				// Lets animate this....
				$textarea.bind('blur',function(){
					if($twin.height() < maxheight){
						if($twin.height() > minheight) {
							$textarea.height($twin.height());
						} else {
							$textarea.height(minheight);
						}
					}
				});
				
				// And this line is to catch the browser paste event
				$textarea.live('input paste',function(e){ setTimeout( update, 250); });				
				
				// Run update once when elastic is initialized
				update();
				
			});
			
		} 
	}); 
})(jQuery);	

/*----------------------------------------------------------------------*/
/* jQuery miniColors: A small color selector
/* Copyright 2011 Cory LaViska for A Beautiful Site, LLC.
/* http://abeautifulsite.net/blog/2011/02/jquery-minicolors-a-color-selector-for-input-controls/
/* Dual licensed under the MIT or GPL Version 2 licenses
/*----------------------------------------------------------------------*/



(function ($) {
	$.fn.miniColors = function (o, data) {


		var create = function (input, o, data) {

				//
				// Creates a new instance of the miniColors selector
				//
				// Determine initial color (defaults to white)
				var color = cleanHex(input.val());
				if (!color) color = 'FFFFFF';
				var hsb = hex2hsb(color);


				// Create trigger
				var trigger = $('<a class="miniColors-trigger" style="background-color: #' + color + '" href="#"></a>');
				trigger.insertAfter(input);

				// Add necessary attributes
				input.addClass('miniColors').attr('maxlength', 7).attr('autocomplete', 'off');

				// Set input data
				input.data('trigger', trigger);
				input.data('hsb', hsb);
				if (o.change) input.data('change', o.change);

				// Handle options
				if (o.readonly) input.attr('readonly', true);
				if (o.disabled) disable(input);

				// Show selector when trigger is clicked
				trigger.bind('click.miniColors', function (event) {
					event.preventDefault();
					input.trigger('focus');
				});

				// Show selector when input receives focus
				input.bind('focus.miniColors', function (event) {
					show(input);
				});

				// Hide on blur
				input.bind('blur.miniColors', function (event) {
					var hex = cleanHex(input.val());
					input.val(hex ? '#' + hex : '');
				});

				// Hide when tabbing out of the input
				input.bind('keydown.miniColors', function (event) {
					if (event.keyCode === 9) hide(input);
				});

				// Update when color is typed in
				input.bind('keyup.miniColors', function (event) {
					// Remove non-hex characters
					var filteredHex = input.val().replace(/[^A-F0-9#]/ig, '');
					input.val(filteredHex);
					if (!setColorFromInput(input)) {
						// Reset trigger color when color is invalid
						input.data('trigger').css('backgroundColor', '#FFF');
					}
				});

				// Handle pasting
				input.bind('paste.miniColors', function (event) {
					// Short pause to wait for paste to complete
					setTimeout(function () {
						input.trigger('keyup');
					}, 5);
				});

			};


		var destroy = function (input) {

				//
				// Destroys an active instance of the miniColors selector
				//
				hide();

				input = $(input);
				input.data('trigger').remove();
				input.removeAttr('autocomplete');
				input.removeData('trigger');
				input.removeData('selector');
				input.removeData('hsb');
				input.removeData('huePicker');
				input.removeData('colorPicker');
				input.removeData('mousebutton');
				input.removeData('moving');
				input.unbind('click.miniColors');
				input.unbind('focus.miniColors');
				input.unbind('blur.miniColors');
				input.unbind('keyup.miniColors');
				input.unbind('keydown.miniColors');
				input.unbind('paste.miniColors');
				$(document).unbind('mousedown.miniColors');
				$(document).unbind('mousemove.miniColors');

			};


		var enable = function (input) {

				//
				// Disables the input control and the selector
				//
				input.attr('disabled', false);
				input.data('trigger').css('opacity', 1);

			};


		var disable = function (input) {

				//
				// Disables the input control and the selector
				//
				hide(input);
				input.attr('disabled', true);
				input.data('trigger').css('opacity', .5);

			};


		var show = function (input) {

				//
				// Shows the miniColors selector
				//
				if (input.attr('disabled')) return false;

				// Hide all other instances 
				hide();

				// Generate the selector
				var selector = $('<div class="miniColors-selector"></div>');
				selector.append('<div class="miniColors-colors" style="background-color: #FFF;"><div class="miniColors-colorPicker"></div></div>');
				selector.append('<div class="miniColors-hues"><div class="miniColors-huePicker"></div></div>');
				selector.css({
					top: input.is(':visible') ? input.offset().top + input.outerHeight() : input.data('trigger').offset().top + input.data('trigger').outerHeight(),
					left: input.is(':visible') ? input.offset().left : input.data('trigger').offset().left,
					display: 'none'
				}).addClass(input.attr('class'));

				// Set background for colors
				var hsb = input.data('hsb');
				selector.find('.miniColors-colors').css('backgroundColor', '#' + hsb2hex({
					h: hsb.h,
					s: 100,
					b: 100
				}));

				// Set colorPicker position
				var colorPosition = input.data('colorPosition');
				if (!colorPosition) colorPosition = getColorPositionFromHSB(hsb);
				selector.find('.miniColors-colorPicker').css('top', colorPosition.y + 'px').css('left', colorPosition.x + 'px');

				// Set huePicker position
				var huePosition = input.data('huePosition');
				if (!huePosition) huePosition = getHuePositionFromHSB(hsb);
				selector.find('.miniColors-huePicker').css('top', huePosition.y + 'px');


				// Set input data
				input.data('selector', selector);
				input.data('huePicker', selector.find('.miniColors-huePicker'));
				input.data('colorPicker', selector.find('.miniColors-colorPicker'));
				input.data('mousebutton', 0);

				$('BODY').append(selector);
				selector.fadeIn(100);

				// Prevent text selection in IE
				selector.bind('selectstart', function () {
					return false;
				});

				$(document).bind('mousedown.miniColors', function (event) {
					input.data('mousebutton', 1);

					if ($(event.target).parents().andSelf().hasClass('miniColors-colors')) {
						event.preventDefault();
						input.data('moving', 'colors');
						moveColor(input, event);
					}

					if ($(event.target).parents().andSelf().hasClass('miniColors-hues')) {
						event.preventDefault();
						input.data('moving', 'hues');
						moveHue(input, event);
					}

					if ($(event.target).parents().andSelf().hasClass('miniColors-selector')) {
						event.preventDefault();
						return;
					}

					if ($(event.target).parents().andSelf().hasClass('miniColors')) return;

					hide(input);
				});

				$(document).bind('mouseup.miniColors', function (event) {
					input.data('mousebutton', 0);
					input.removeData('moving');
				});

				$(document).bind('mousemove.miniColors', function (event) {
					if (input.data('mousebutton') === 1) {
						if (input.data('moving') === 'colors') moveColor(input, event);
						if (input.data('moving') === 'hues') moveHue(input, event);
					}
				});

			};


		var hide = function (input) {

				//
				// Hides one or more miniColors selectors
				//
				// Hide all other instances if input isn't specified
				if (!input) input = '.miniColors';

				$(input).each(function () {
					var selector = $(this).data('selector');
					$(this).removeData('selector');
					$(selector).fadeOut(100, function () {
						$(this).remove();
					});
				});

				$(document).unbind('mousedown.miniColors');
				$(document).unbind('mousemove.miniColors');

			};


		var moveColor = function (input, event) {

				var colorPicker = input.data('colorPicker');

				colorPicker.hide();

				var position = {
					x: event.clientX - input.data('selector').find('.miniColors-colors').offset().left + $(document).scrollLeft() - 5,
					y: event.clientY - input.data('selector').find('.miniColors-colors').offset().top + $(document).scrollTop() - 5
				};

				if (position.x <= -5) position.x = -5;
				if (position.x >= 144) position.x = 144;
				if (position.y <= -5) position.y = -5;
				if (position.y >= 144) position.y = 144;
				input.data('colorPosition', position);
				colorPicker.css('left', position.x).css('top', position.y).show();

				// Calculate saturation
				var s = Math.round((position.x + 5) * .67);
				if (s < 0) s = 0;
				if (s > 100) s = 100;

				// Calculate brightness
				var b = 100 - Math.round((position.y + 5) * .67);
				if (b < 0) b = 0;
				if (b > 100) b = 100;

				// Update HSB values
				var hsb = input.data('hsb');
				hsb.s = s;
				hsb.b = b;

				// Set color
				setColor(input, hsb, true);

			};


		var moveHue = function (input, event) {

				var huePicker = input.data('huePicker');

				huePicker.hide();

				var position = {
					y: event.clientY - input.data('selector').find('.miniColors-colors').offset().top + $(document).scrollTop() - 1
				};

				if (position.y <= -1) position.y = -1;
				if (position.y >= 149) position.y = 149;
				input.data('huePosition', position);

				huePicker.css('top', position.y).show();

				// Calculate hue
				var h = Math.round((150 - position.y - 1) * 2.4);
				if (h < 0) h = 0;
				if (h > 360) h = 360;

				// Update HSB values
				var hsb = input.data('hsb');
				hsb.h = h;

				// Set color
				setColor(input, hsb, true);

			};


		var setColor = function (input, hsb, updateInputValue) {

				input.data('hsb', hsb);
				var hex = hsb2hex(hsb);
				if (updateInputValue) input.val('#' + hex);
				input.data('trigger').css('backgroundColor', '#' + hex);
				if (input.data('selector')) input.data('selector').find('.miniColors-colors').css('backgroundColor', '#' + hsb2hex({
					h: hsb.h,
					s: 100,
					b: 100
				}));

				if (input.data('change')) {
					input.data('change').call(input, '#' + hex, hsb2rgb(hsb));
				}

			};


		var setColorFromInput = function (input) {

				// Don't update if the hex color is invalid
				var hex = cleanHex(input.val());
				if (!hex) return false;

				// Get HSB equivalent
				var hsb = hex2hsb(hex);

				// If color is the same, no change required
				var currentHSB = input.data('hsb');
				if (hsb.h === currentHSB.h && hsb.s === currentHSB.s && hsb.b === currentHSB.b) return true;

				// Set colorPicker position
				var colorPosition = getColorPositionFromHSB(hsb);
				var colorPicker = $(input.data('colorPicker'));
				colorPicker.css('top', colorPosition.y + 'px').css('left', colorPosition.x + 'px');

				// Set huePosition position
				var huePosition = getHuePositionFromHSB(hsb);
				var huePicker = $(input.data('huePicker'));
				huePicker.css('top', huePosition.y + 'px');

				setColor(input, hsb, false);

				return true;

			};


		var getColorPositionFromHSB = function (hsb) {

				var x = Math.ceil(hsb.s / .67);
				if (x < 0) x = 0;
				if (x > 150) x = 150;

				var y = 150 - Math.ceil(hsb.b / .67);
				if (y < 0) y = 0;
				if (y > 150) y = 150;

				return {
					x: x - 5,
					y: y - 5
				};

			};


		var getHuePositionFromHSB = function (hsb) {

				var y = 150 - (hsb.h / 2.4);
				if (y < 0) h = 0;
				if (y > 150) h = 150;

				return {
					y: y - 1
				};

			};


		var cleanHex = function (hex) {

				//
				// Turns a dirty hex string into clean, 6-character hex color
				//
				hex = hex.replace(/[^A-Fa-f0-9]/, '');

				if (hex.length == 3) {
					hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
				}

				return hex.length === 6 ? hex : null;

			};


		var hsb2rgb = function (hsb) {
				var rgb = {};
				var h = Math.round(hsb.h);
				var s = Math.round(hsb.s * 255 / 100);
				var v = Math.round(hsb.b * 255 / 100);
				if (s == 0) {
					rgb.r = rgb.g = rgb.b = v;
				} else {
					var t1 = v;
					var t2 = (255 - s) * v / 255;
					var t3 = (t1 - t2) * (h % 60) / 60;
					if (h == 360) h = 0;
					if (h < 60) {
						rgb.r = t1;
						rgb.b = t2;
						rgb.g = t2 + t3;
					} else if (h < 120) {
						rgb.g = t1;
						rgb.b = t2;
						rgb.r = t1 - t3;
					} else if (h < 180) {
						rgb.g = t1;
						rgb.r = t2;
						rgb.b = t2 + t3;
					} else if (h < 240) {
						rgb.b = t1;
						rgb.r = t2;
						rgb.g = t1 - t3;
					} else if (h < 300) {
						rgb.b = t1;
						rgb.g = t2;
						rgb.r = t2 + t3;
					} else if (h < 360) {
						rgb.r = t1;
						rgb.g = t2;
						rgb.b = t1 - t3;
					} else {
						rgb.r = 0;
						rgb.g = 0;
						rgb.b = 0;
					}
				}
				return {
					r: Math.round(rgb.r),
					g: Math.round(rgb.g),
					b: Math.round(rgb.b)
				};
			};


		var rgb2hex = function (rgb) {

				var hex = [
				rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
				$.each(hex, function (nr, val) {
					if (val.length == 1) hex[nr] = '0' + val;
				});

				return hex.join('');
			};


		var hex2rgb = function (hex) {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);

				return {
					r: hex >> 16,
					g: (hex & 0x00FF00) >> 8,
					b: (hex & 0x0000FF)
				};
			};


		var rgb2hsb = function (rgb) {
				var hsb = {
					h: 0,
					s: 0,
					b: 0
				};
				var min = Math.min(rgb.r, rgb.g, rgb.b);
				var max = Math.max(rgb.r, rgb.g, rgb.b);
				var delta = max - min;
				hsb.b = max;
				hsb.s = max != 0 ? 255 * delta / max : 0;
				if (hsb.s != 0) {
					if (rgb.r == max) {
						hsb.h = (rgb.g - rgb.b) / delta;
					} else if (rgb.g == max) {
						hsb.h = 2 + (rgb.b - rgb.r) / delta;
					} else {
						hsb.h = 4 + (rgb.r - rgb.g) / delta;
					}
				} else {
					hsb.h = -1;
				}
				hsb.h *= 60;
				if (hsb.h < 0) {
					hsb.h += 360;
				}
				hsb.s *= 100 / 255;
				hsb.b *= 100 / 255;
				return hsb;
			};


		var hex2hsb = function (hex) {
				var hsb = rgb2hsb(hex2rgb(hex));
				// Zero out hue marker for black, white, and grays (saturation === 0)
				if (hsb.s === 0) hsb.h = 360;
				return hsb;
			};


		var hsb2hex = function (hsb) {
				return rgb2hex(hsb2rgb(hsb));
			};


		//
		// Handle calls to $([selector]).miniColors()
		//
		switch (o) {

		case 'readonly':

			$(this).each(function () {
				$(this).attr('readonly', data);
			});

			return $(this);

			break;

		case 'disabled':

			$(this).each(function () {
				if (data) {
					disable($(this));
				} else {
					enable($(this));
				}
			});

			return $(this);

		case 'value':

			$(this).each(function () {
				if(typeof data !== 'string'){
					data = hsb2hex(data);
				}
				$(this).val(data).trigger('keyup');
			});

			return $(this);

			break;

		case 'destroy':

			$(this).each(function () {
				destroy($(this));
			});

			return $(this);

		default:

			if (!o) o = {};

			$(this).each(function () {

				// Must be called on an input element
				if ($(this)[0].tagName.toLowerCase() !== 'input') return;

				// If a trigger is present, the control was already created
				if ($(this).data('trigger')) return;

				// Create the control
				create($(this), o, data);

			});

			return $(this);

		}


	};

})(jQuery);



/*----------------------------------------------------------------------*/
/* 
/*----------------------------------------------------------------------*/



/*
 * jQuery Iframe Transport Plugin 1.2.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

/*jslint unparam: true */
/*global jQuery */

(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts three additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s)
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: a, value: 1}, {name: b, value: 2}]
    $.ajaxTransport('iframe', function (options, originalOptions, jqXHR) {
        if (options.type === 'POST' || options.type === 'GET') {
            var form,
                iframe;
            return {
                send: function (headers, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    // javascript:false as initial iframe src
                    // prevents warning popups on HTTPS in IE6.
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    iframe = $(
                        '<iframe src="javascript:false;" name="iframe-transport-' +
                            (counter += 1) + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones;
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                } catch (e) {
                                    response = $();
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="javascript:false;"></iframe>')
                                    .appendTo(form);
                                form.remove();
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function () {
                                    $(this).prop('name', options.paramName);
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                $(input).prop('name', clone.prop('name'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo('body');
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', 'javascript'.concat(':false;'));
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, and script:
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe.text();
            },
            'iframe json': function (iframe) {
                return $.parseJSON(iframe.text());
            },
            'iframe html': function (iframe) {
                return iframe.find('body').html();
            },
            'iframe script': function (iframe) {
                return $.globalEval(iframe.text());
            }
        }
    });

}(jQuery));


/*
 * jQuery File Upload Plugin 5.0.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global document, XMLHttpRequestUpload, Blob, File, FormData, location, jQuery */

(function ($) {
    'use strict';

    // The fileupload widget listens for change events on file input fields
    // defined via fileInput setting and drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files
    // using the fileupload API.
    // By default, files added via file input selection, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {
        
        options: {
            // The namespace used for event handler binding on the dropZone and
            // fileInput collections.
            // If not set, the name of the widget ("fileupload") is used.
            namespace: undefined,
            // The drop target collection, by the default the complete document.
            // Set to null or an empty collection to disable drag & drop support:
            dropZone: $(document),
            // The file input field collection, that is listened for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null or an empty collection to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            
            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },
            
            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uplaods, else
            // once for each file selection.
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows to override plugin options as well as define ajax settings.
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                data.submit();
            },
            
            // Other callbacks:
            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);
            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);
            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);
            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);
            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);
            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);
            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);
            // Callback for change events of the fileInput collection:
            // change: function (e, data) {}, // .bind('fileuploadchange', func);
            // Callback for drop events of the dropZone collection:
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);
            // Callback for dragover events of the dropZone collection:
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);
            
            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },
        
        // A list of options that require a refresh after assigning a new value:
        _refreshOptionsList: ['namespace', 'dropZone', 'fileInput'],

        _isXHRUpload: function (options) {
            var undef = 'undefined';
            return !options.forceIframeTransport &&
                typeof XMLHttpRequestUpload !== undef && typeof File !== undef &&
                (!options.multipart || typeof FormData !== undef);
        },

        _getFormData: function (options) {
            var formData;
            if (typeof options.formData === 'function') {
                return options.formData(options.form);
            } else if ($.isArray(options.formData)) {
                return options.formData;
            } else if (options.formData) {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var total = data.total || this._getTotal(data.files),
                    loaded = parseInt(
                        e.loaded / e.total * (data.chunkSize || total),
                        10
                    ) + (data.uploadedBytes || 0);
                this._loaded += loaded - (data.loaded || data.uploadedBytes || 0);
                data.lengthComputable = true;
                data.loaded = loaded;
                data.total = total;
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger('progress', e, data);
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger('progressall', e, {
                    lengthComputable: true,
                    loaded: this._loaded,
                    total: this._total
                });
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload && xhr.upload.addEventListener) {
                xhr.upload.addEventListener('progress', function (e) {
                    that._onProgress(e, options);
                }, false);
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _initXHRData: function (options) {
            var formData,
                file = options.files[0];
            if (!options.multipart || options.blob) {
                // For non-multipart uploads and chunked uploads,
                // file meta data is not part of the request body,
                // so we transmit this data as part of the HTTP headers.
                // For cross domain requests, these headers must be allowed
                // via Access-Control-Allow-Headers or removed using
                // the beforeSend callback:
                options.headers = $.extend(options.headers, {
                    'X-File-Name': file.name,
                    'X-File-Type': file.type,
                    'X-File-Size': file.size
                });
                if (!options.blob) {
                    // Non-chunked non-multipart upload:
                    options.contentType = file.type;
                    options.data = file;
                } else if (!options.multipart) {
                    // Chunked non-multipart upload:
                    options.contentType = 'application/octet-stream';
                    options.data = options.blob;
                }
            }
            if (options.multipart && typeof FormData !== 'undefined') {
                if (options.formData instanceof FormData) {
                    formData = options.formData;
                } else {
                    formData = new FormData();
                    $.each(this._getFormData(options), function (index, field) {
                        formData.append(field.name, field.value);
                    });
                }
                if (options.blob) {
                    formData.append(options.paramName, options.blob);
                } else {
                    $.each(options.files, function (index, file) {
                        // File objects are also Blob instances.
                        // This check allows the tests to run with
                        // dummy objects:
                        if (file instanceof Blob) {
                            formData.append(options.paramName, file);
                        }
                    });
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },
        
        _initIframeSettings: function (options) {
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
        },
        
        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
            } else {
                this._initIframeSettings(options);
            }
        },
        
        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
            }
            if (!options.paramName) {
                options.paramName = options.fileInput.prop('name') ||
                    'files[]';
            }
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type || options.form.prop('method') || '')
                .toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT') {
                options.type = 'POST';
            }
        },
        
        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes = options.uploadedBytes || 0,
                mcs = options.maxChunkSize || fs,
                // Use the Blob methods with the slice implementation
                // according to the W3C Blob API specification:
                slice = file.webkitSlice || file.mozSlice || file.slice,
                upload,
                n,
                jqXHR,
                pipe;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = 'uploadedBytes';
                return this._getXHRPromise(false);
            }
            // n is the number of blobs to upload,
            // calculated via filesize, uploaded bytes and max chunk size:
            n = Math.ceil((fs - ub) / mcs);
            // The chunk upload method accepting the chunk number as parameter:
            upload = function (i) {
                if (!i) {
                    return that._getXHRPromise(true);
                }
                // Upload the blobs in sequential order:
                return upload(i -= 1).pipe(function () {
                    // Clone the options object for each chunk upload:
                    var o = $.extend({}, options);
                    o.blob = slice.call(
                        file,
                        ub + i * mcs,
                        ub + (i + 1) * mcs
                    );
                    // Store the current chunk size, as the blob itself
                    // will be dereferenced after data processing:
                    o.chunkSize = o.blob.size;
                    // Process the upload data (the blob and potential form data):
                    that._initXHRData(o);
                    // Add progress listeners for this chunk upload:
                    that._initProgressListener(o);
                    jqXHR = ($.ajax(o) || that._getXHRPromise(false, o.context))
                        .done(function () {
                            // Create a progress event if upload is done and
                            // no progress event has been invoked for this chunk:
                            if (!o.loaded) {
                                that._onProgress($.Event('progress', {
                                    lengthComputable: true,
                                    loaded: o.chunkSize,
                                    total: o.chunkSize
                                }), o);
                            }
                            options.uploadedBytes = o.uploadedBytes
                                += o.chunkSize;
                        });
                    return jqXHR;
                });
            };
            // Return the piped Promise object, enhanced with an abort method,
            // which is delegated to the jqXHR object of the current upload,
            // and jqXHR callbacks mapped to the equivalent Promise methods:
            pipe = upload(n);
            pipe.abort = function () {
                return jqXHR.abort();
            };
            return this._enhancePromise(pipe);
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
            }
            this._active += 1;
            // Initialize the global progress values:
            this._loaded += data.uploadedBytes || 0;
            this._total += this._getTotal(data.files);
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            if (!this._isXHRUpload(options)) {
                // Create a progress event for each iframe load:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: 1,
                    total: 1
                }), options);
            }
            options.result = result;
            options.textStatus = textStatus;
            options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            options.jqXHR = jqXHR;
            options.textStatus = textStatus;
            options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._loaded -= options.loaded || options.uploadedBytes || 0;
                this._total -= options.total || this._getTotal(options.files);
            }
        },

        _onAlways: function (result, textStatus, jqXHR, errorThrown, options) {
            this._active -= 1;
            options.result = result;
            options.textStatus = textStatus;
            options.jqXHR = jqXHR;
            options.errorThrown = errorThrown;
            this._trigger('always', null, options);
            if (this._active === 0) {
                // The stop callback is triggered when all uploads have
                // been completed, equivalent to the global ajaxStop event:
                this._trigger('stop');
                // Reset the global progress values:
                this._loaded = this._total = 0;
            }
        },

        _onSend: function (e, data) {
            var that = this,
                jqXHR,
                pipe,
                options = that._getAJAXSettings(data),
                send = function (resolve, args) {
                    jqXHR = jqXHR || (
                        (resolve !== false &&
                        that._trigger('send', e, options) !== false &&
                        (that._chunkedUpload(options) || $.ajax(options))) ||
                        that._getXHRPromise(false, options.context, args)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (a1, a2, a3) {
                        if (!a3 || typeof a3 === 'string') {
                            that._onAlways(undefined, a2, a1, a3, options);
                        } else {
                            that._onAlways(a1, a2, a3, undefined, options);
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads) {
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe = (this._sequence = this._sequence.pipe(send, send));
                pipe.abort = function () {
                    if (!jqXHR) {
                        return send(false, [undefined, 'abort', 'abort']);
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },
        
        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data);
            if (options.singleFileUploads && this._isXHRUpload(options)) {
                $.each(data.files, function (index, file) {
                    var newData = $.extend({}, data, {files: [file]});
                    newData.submit = function () {
                        return that._onSend(e, newData);
                    };
                    return (result = that._trigger('add', e, newData));
                });
                return result;
            } else if (data.files.length) {
                data = $.extend({}, data);
                data.submit = function () {
                    return that._onSend(e, data);
                };
                return this._trigger('add', e, data);
            }
        },
        
        // File Normalization for Gecko 1.9.1 (Firefox 3.5) support:
        _normalizeFile: function (index, file) {
            if (file.name === undefined && file.size === undefined) {
                file.name = file.fileName;
                file.size = file.fileSize;
            }
        },

        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Replace the original file input element in the fileInput
            // collection with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
        },
        
        _onChange: function (e) {
           var that = e.data.fileupload,
                data = {
                    files: $.each($.makeArray(e.target.files), that._normalizeFile),
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            if (!data.files.length) {
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                data.files = [{name: e.target.value.replace(/^.*\\/, '')}];
            }
            // Store the form reference as jQuery data for other event handlers,
            // as the form property is not available after replacing the file input: 
            if (data.form.length) {
                data.fileInput.data('blueimp.fileupload.form', data.form);
            } else {
                data.form = data.fileInput.data('blueimp.fileupload.form');
            }
            if (that.options.replaceFileInput) {
                that._replaceFileInput(data.fileInput);
            }
            if (that._trigger('change', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
        },
        
        _onDrop: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer,
                data = {
                    files: $.each(
                        $.makeArray(dataTransfer && dataTransfer.files),
                        that._normalizeFile
                    )
                };
            if (that._trigger('drop', e, data) === false ||
                    that._onAdd(e, data) === false) {
                return false;
            }
            e.preventDefault();
        },
        
        _onDragOver: function (e) {
            var that = e.data.fileupload,
                dataTransfer = e.dataTransfer = e.originalEvent.dataTransfer;
            if (that._trigger('dragover', e) === false) {
                return false;
            }
            if (dataTransfer) {
                dataTransfer.dropEffect = dataTransfer.effectAllowed = 'copy';
            }
            e.preventDefault();
        },
        
        _initEventHandlers: function () {
            var ns = this.options.namespace || this.name;
            this.options.dropZone
                .bind('dragover.' + ns, {fileupload: this}, this._onDragOver)
                .bind('drop.' + ns, {fileupload: this}, this._onDrop);
            this.options.fileInput
                .bind('change.' + ns, {fileupload: this}, this._onChange);
        },

        _destroyEventHandlers: function () {
         var ns = this.options.namespace || this.name;
            this.options.dropZone
                .unbind('dragover.' + ns, this._onDragOver)
                .unbind('drop.' + ns, this._onDrop);
            this.options.fileInput
                .unbind('change.' + ns, this._onChange);
        },
        
        _beforeSetOption: function (key, value) {
            //this._destroyEventHandlers();
        },
        
        _afterSetOption: function (key, value) {
            var options = this.options;
            if (!options.fileInput) {
                options.fileInput = $();
            }
            if (!options.dropZone) {
                options.dropZone = $();
            }
            this._initEventHandlers();
        },
        
        _setOption: function (key, value) {
            var refresh = $.inArray(key, this._refreshOptionsList) !== -1;
            if (refresh) {
                this._beforeSetOption(key, value);
            }
            $.Widget.prototype._setOption.call(this, key, value);
            if (refresh) {
                this._afterSetOption(key, value);
            }
        },

        _create: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input:file') ?
                    this.element : this.element.find('input:file');
            } else if (!options.fileInput) {
                options.fileInput = $();
            }
            if (!options.dropZone) {
                options.dropZone = $();
            }
            this._sequence = this._getXHRPromise(true);
            this._active = this._loaded = this._total = 0;
            this._initEventHandlers();
        },
        
        destroy: function () {
           // this._destroyEventHandlers();
            //$.Widget.prototype.destroy.call(this);
        },

        enable: function () {
            $.Widget.prototype.enable.call(this);
            this._initEventHandlers();
        },
        
        disable: function () {
           this._destroyEventHandlers();
            $.Widget.prototype.disable.call(this);
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            if (!data || this.options.disabled) {
                return;
            }
            data.files = $.each($.makeArray(data.files), this._normalizeFile);
            this._onAdd(null, data);
        },
        
        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                data.files = $.each($.makeArray(data.files), this._normalizeFile);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }
        
    });
    
}(jQuery));


/*
* FancyBox - jQuery Plugin
* Simple and fancy lightbox alternative
*
* Examples and documentation at: http://fancybox.net
* 
* Copyright (c) 2008 - 2010 Janis Skarnelis
* That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
* 
* Version: 1.3.4 (11/11/2010)
* Requires: jQuery v1.3+
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

;(function(b){var m,t,u,f,D,j,E,n,z,A,q=0,e={},o=[],p=0,d={},l=[],G=null,v=new Image,J=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,W=/[^\.]\.(swf)\s*$/i,K,L=1,y=0,s="",r,i,h=false,B=b.extend(b("<div/>")[0],{prop:0}),M=b.browser.msie&&b.browser.version<7&&!window.XMLHttpRequest,N=function(){t.hide();v.onerror=v.onload=null;G&&G.abort();m.empty()},O=function(){if(false===e.onError(o,q,e)){t.hide();h=false}else{e.titleShow=false;e.width="auto";e.height="auto";m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
F()}},I=function(){var a=o[q],c,g,k,C,P,w;N();e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));w=e.onStart(o,q,e);if(w===false)h=false;else{if(typeof w=="object")e=b.extend(e,w);k=e.title||(a.nodeName?b(a).attr("title"):a.title)||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?b(a).children("img:first"):b(a);if(k===""&&e.orig&&e.titleFromAlt)k=e.orig.attr("alt");c=e.href||(a.nodeName?b(a).attr("href"):a.href)||null;if(/^(?:javascript)/i.test(c)||
c=="#")c=null;if(e.type){g=e.type;if(!c)c=e.content}else if(e.content)g="html";else if(c)g=c.match(J)?"image":c.match(W)?"swf":b(a).hasClass("iframe")?"iframe":c.indexOf("#")===0?"inline":"ajax";if(g){if(g=="inline"){a=c.substr(c.indexOf("#"));g=b(a).length>0?"inline":"ajax"}e.type=g;e.href=c;e.title=k;if(e.autoDimensions)if(e.type=="html"||e.type=="inline"||e.type=="ajax"){e.width="auto";e.height="auto"}else e.autoDimensions=false;if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=
false;e.enableEscapeButton=false;e.showCloseButton=false}e.padding=parseInt(e.padding,10);e.margin=parseInt(e.margin,10);m.css("padding",e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(j.children())});switch(g){case "html":m.html(e.content);F();break;case "inline":if(b(a).parent().is("#fancybox-content")===true){h=false;break}b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",function(){b(this).replaceWith(j.children())}).bind("fancybox-cancel",
function(){b(this).replaceWith(m.children())});b(a).appendTo(m);F();break;case "image":h=false;b.fancybox.showActivity();v=new Image;v.onerror=function(){O()};v.onload=function(){h=true;v.onerror=v.onload=null;e.width=v.width;e.height=v.height;b("<img />").attr({id:"fancybox-img",src:v.src,alt:e.title}).appendTo(m);Q()};v.src=c;break;case "swf":e.scrolling="no";C='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+c+
'"></param>';P="";b.each(e.swf,function(x,H){C+='<param name="'+x+'" value="'+H+'"></param>';P+=" "+x+'="'+H+'"'});C+='<embed src="'+c+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+P+"></embed></object>";m.html(C);F();break;case "ajax":h=false;b.fancybox.showActivity();e.ajax.win=e.ajax.success;G=b.ajax(b.extend({},e.ajax,{url:c,data:e.ajax.data||{},error:function(x){x.status>0&&O()},success:function(x,H,R){if((typeof R=="object"?R:G).status==200){if(typeof e.ajax.win==
"function"){w=e.ajax.win(c,x,H,R);if(w===false){t.hide();return}else if(typeof w=="string"||typeof w=="object")x=w}m.html(x);F()}}}));break;case "iframe":Q()}}else O()}},F=function(){var a=e.width,c=e.height;a=a.toString().indexOf("%")>-1?parseInt((b(window).width()-e.margin*2)*parseFloat(a)/100,10)+"px":a=="auto"?"auto":a+"px";c=c.toString().indexOf("%")>-1?parseInt((b(window).height()-e.margin*2)*parseFloat(c)/100,10)+"px":c=="auto"?"auto":c+"px";m.wrapInner('<div style="width:'+a+";height:"+c+
";overflow: "+(e.scrolling=="auto"?"auto":e.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');e.width=m.width();e.height=m.height();Q()},Q=function(){var a,c;t.hide();if(f.is(":visible")&&false===d.onCleanup(l,p,d)){b.event.trigger("fancybox-cancel");h=false}else{h=true;b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");f.is(":visible")&&d.titlePosition!=="outside"&&f.css("height",f.height());l=o;p=q;d=e;if(d.overlayShow){u.css({"background-color":d.overlayColor,
opacity:d.overlayOpacity,cursor:d.hideOnOverlayClick?"pointer":"auto",height:b(document).height()});if(!u.is(":visible")){M&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});u.show()}}else u.hide();i=X();s=d.title||"";y=0;n.empty().removeAttr("style").removeClass();if(d.titleShow!==false){if(b.isFunction(d.titleFormat))a=d.titleFormat(s,l,p,d);else a=s&&s.length?
d.titlePosition=="float"?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+s+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+d.titlePosition+'">'+s+"</div>":false;s=a;if(!(!s||s==="")){n.addClass("fancybox-title-"+d.titlePosition).html(s).appendTo("body").show();switch(d.titlePosition){case "inside":n.css({width:i.width-d.padding*2,marginLeft:d.padding,marginRight:d.padding});
y=n.outerHeight(true);n.appendTo(D);i.height+=y;break;case "over":n.css({marginLeft:d.padding,width:i.width-d.padding*2,bottom:d.padding}).appendTo(D);break;case "float":n.css("left",parseInt((n.width()-i.width-40)/2,10)*-1).appendTo(f);break;default:n.css({width:i.width-d.padding*2,paddingLeft:d.padding,paddingRight:d.padding}).appendTo(f)}}}n.hide();if(f.is(":visible")){b(E.add(z).add(A)).hide();a=f.position();r={top:a.top,left:a.left,width:f.width(),height:f.height()};c=r.width==i.width&&r.height==
i.height;j.fadeTo(d.changeFade,0.3,function(){var g=function(){j.html(m.contents()).fadeTo(d.changeFade,1,S)};b.event.trigger("fancybox-change");j.empty().removeAttr("filter").css({"border-width":d.padding,width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2});if(c)g();else{B.prop=0;b(B).animate({prop:1},{duration:d.changeSpeed,easing:d.easingChange,step:T,complete:g})}})}else{f.removeAttr("style");j.css("border-width",d.padding);if(d.transitionIn=="elastic"){r=V();j.html(m.contents());
f.show();if(d.opacity)i.opacity=0;B.prop=0;b(B).animate({prop:1},{duration:d.speedIn,easing:d.easingIn,step:T,complete:S})}else{d.titlePosition=="inside"&&y>0&&n.show();j.css({width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2}).html(m.contents());f.css(i).fadeIn(d.transitionIn=="none"?0:d.speedIn,S)}}}},Y=function(){if(d.enableEscapeButton||d.enableKeyboardNav)b(document).bind("keydown.fb",function(a){if(a.keyCode==27&&d.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if((a.keyCode==
37||a.keyCode==39)&&d.enableKeyboardNav&&a.target.tagName!=="INPUT"&&a.target.tagName!=="TEXTAREA"&&a.target.tagName!=="SELECT"){a.preventDefault();b.fancybox[a.keyCode==37?"prev":"next"]()}});if(d.showNavArrows){if(d.cyclic&&l.length>1||p!==0)z.show();if(d.cyclic&&l.length>1||p!=l.length-1)A.show()}else{z.hide();A.hide()}},S=function(){if(!b.support.opacity){j.get(0).style.removeAttribute("filter");f.get(0).style.removeAttribute("filter")}e.autoDimensions&&j.css("height","auto");f.css("height","auto");
s&&s.length&&n.show();d.showCloseButton&&E.show();Y();d.hideOnContentClick&&j.bind("click",b.fancybox.close);d.hideOnOverlayClick&&u.bind("click",b.fancybox.close);b(window).bind("resize.fb",b.fancybox.resize);d.centerOnScroll&&b(window).bind("scroll.fb",b.fancybox.center);if(d.type=="iframe")b('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(b.browser.msie?'allowtransparency="true""':"")+' scrolling="'+e.scrolling+'" src="'+d.href+'"></iframe>').appendTo(j);
f.show();h=false;b.fancybox.center();d.onComplete(l,p,d);var a,c;if(l.length-1>p){a=l[p+1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}if(p>0){a=l[p-1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}},T=function(a){var c={width:parseInt(r.width+(i.width-r.width)*a,10),height:parseInt(r.height+(i.height-r.height)*a,10),top:parseInt(r.top+(i.top-r.top)*a,10),left:parseInt(r.left+(i.left-r.left)*a,10)};if(typeof i.opacity!=="undefined")c.opacity=a<0.5?0.5:a;f.css(c);
j.css({width:c.width-d.padding*2,height:c.height-y*a-d.padding*2})},U=function(){return[b(window).width()-d.margin*2,b(window).height()-d.margin*2,b(document).scrollLeft()+d.margin,b(document).scrollTop()+d.margin]},X=function(){var a=U(),c={},g=d.autoScale,k=d.padding*2;c.width=d.width.toString().indexOf("%")>-1?parseInt(a[0]*parseFloat(d.width)/100,10):d.width+k;c.height=d.height.toString().indexOf("%")>-1?parseInt(a[1]*parseFloat(d.height)/100,10):d.height+k;if(g&&(c.width>a[0]||c.height>a[1]))if(e.type==
"image"||e.type=="swf"){g=d.width/d.height;if(c.width>a[0]){c.width=a[0];c.height=parseInt((c.width-k)/g+k,10)}if(c.height>a[1]){c.height=a[1];c.width=parseInt((c.height-k)*g+k,10)}}else{c.width=Math.min(c.width,a[0]);c.height=Math.min(c.height,a[1])}c.top=parseInt(Math.max(a[3]-20,a[3]+(a[1]-c.height-40)*0.5),10);c.left=parseInt(Math.max(a[2]-20,a[2]+(a[0]-c.width-40)*0.5),10);return c},V=function(){var a=e.orig?b(e.orig):false,c={};if(a&&a.length){c=a.offset();c.top+=parseInt(a.css("paddingTop"),
10)||0;c.left+=parseInt(a.css("paddingLeft"),10)||0;c.top+=parseInt(a.css("border-top-width"),10)||0;c.left+=parseInt(a.css("border-left-width"),10)||0;c.width=a.width();c.height=a.height();c={width:c.width+d.padding*2,height:c.height+d.padding*2,top:c.top-d.padding-20,left:c.left-d.padding-20}}else{a=U();c={width:d.padding*2,height:d.padding*2,top:parseInt(a[3]+a[1]*0.5,10),left:parseInt(a[2]+a[0]*0.5,10)}}return c},Z=function(){if(t.is(":visible")){b("div",t).css("top",L*-40+"px");L=(L+1)%12}else clearInterval(K)};
b.fn.fancybox=function(a){if(!b(this).length)return this;b(this).data("fancybox",b.extend({},a,b.metadata?b(this).metadata():{})).unbind("click.fb").bind("click.fb",function(c){c.preventDefault();if(!h){h=true;b(this).blur();o=[];q=0;c=b(this).attr("rel")||"";if(!c||c==""||c==="nofollow")o.push(this);else{o=b("a[rel="+c+"], area[rel="+c+"]");q=o.index(this)}I()}});return this};b.fancybox=function(a,c){var g;if(!h){h=true;g=typeof c!=="undefined"?c:{};o=[];q=parseInt(g.index,10)||0;if(b.isArray(a)){for(var k=
0,C=a.length;k<C;k++)if(typeof a[k]=="object")b(a[k]).data("fancybox",b.extend({},g,a[k]));else a[k]=b({}).data("fancybox",b.extend({content:a[k]},g));o=jQuery.merge(o,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},g,a));else a=b({}).data("fancybox",b.extend({content:a},g));o.push(a)}if(q>o.length||q<0)q=0;I()}};b.fancybox.showActivity=function(){clearInterval(K);t.show();K=setInterval(Z,66)};b.fancybox.hideActivity=function(){t.hide()};b.fancybox.next=function(){return b.fancybox.pos(p+
1)};b.fancybox.prev=function(){return b.fancybox.pos(p-1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a);o=l;if(a>-1&&a<l.length){q=a;I()}else if(d.cyclic&&l.length>1){q=a>=l.length?0:l.length-1;I()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");N();e.onCancel(o,q,e);h=false}};b.fancybox.close=function(){function a(){u.fadeOut("fast");n.empty().hide();f.hide();b.event.trigger("fancybox-cleanup");j.empty();d.onClosed(l,p,d);l=e=[];p=q=0;d=e={};h=false}if(!(h||f.is(":hidden"))){h=
true;if(d&&false===d.onCleanup(l,p,d))h=false;else{N();b(E.add(z).add(A)).hide();b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");j.find("iframe").attr("src",M&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");d.titlePosition!=="inside"&&n.empty();f.stop();if(d.transitionOut=="elastic"){r=V();var c=f.position();i={top:c.top,left:c.left,width:f.width(),height:f.height()};if(d.opacity)i.opacity=1;n.empty().hide();B.prop=1;
b(B).animate({prop:0},{duration:d.speedOut,easing:d.easingOut,step:T,complete:a})}else f.fadeOut(d.transitionOut=="none"?0:d.speedOut,a)}}};b.fancybox.resize=function(){u.is(":visible")&&u.css("height",b(document).height());b.fancybox.center(true)};b.fancybox.center=function(a){var c,g;if(!h){g=a===true?1:0;c=U();!g&&(f.width()>c[0]||f.height()>c[1])||f.stop().animate({top:parseInt(Math.max(c[3]-20,c[3]+(c[1]-j.height()-40)*0.5-d.padding)),left:parseInt(Math.max(c[2]-20,c[2]+(c[0]-j.width()-40)*0.5-
d.padding))},typeof a=="number"?a:200)}};b.fancybox.init=function(){if(!b("#fancybox-wrap").length){b("body").append(m=b('<div id="fancybox-tmp"></div>'),t=b('<div id="fancybox-loading"><div></div></div>'),u=b('<div id="fancybox-overlay"></div>'),f=b('<div id="fancybox-wrap"></div>'));D=b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
D.append(j=b('<div id="fancybox-content"></div>'),E=b('<a id="fancybox-close"></a>'),n=b('<div id="fancybox-title"></div>'),z=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),A=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));E.click(b.fancybox.close);t.click(b.fancybox.cancel);z.click(function(a){a.preventDefault();b.fancybox.prev()});A.click(function(a){a.preventDefault();b.fancybox.next()});
b.fn.mousewheel&&f.bind("mousewheel.fb",function(a,c){if(h)a.preventDefault();else if(b(a.target).get(0).clientHeight==0||b(a.target).get(0).scrollHeight===b(a.target).get(0).clientHeight){a.preventDefault();b.fancybox[c>0?"prev":"next"]()}});b.support.opacity||f.addClass("fancybox-ie");if(M){t.addClass("fancybox-ie6");f.addClass("fancybox-ie6");b('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)}}};
b.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",
easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};b(document).ready(function(){b.fancybox.init()})})(jQuery);	



/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * $.jStorage
 * 
 * USAGE:
 *
 * jStorage requires Prototype, MooTools or jQuery! If jQuery is used, then
 * jQuery-JSON (http://code.google.com/p/jquery-json/) is also needed.
 * (jQuery-JSON needs to be loaded BEFORE jStorage!)
 *
 * Methods:
 *
 * -set(key, value)
 * $.jStorage.set(key, value) -> saves a value
 *
 * -get(key[, default])
 * value = $.jStorage.get(key [, default]) ->
 *    retrieves value if key exists, or default if it doesn't
 *
 * -deleteKey(key)
 * $.jStorage.deleteKey(key) -> removes a key from the storage
 *
 * -flush()
 * $.jStorage.flush() -> clears the cache
 * 
 * -storageObj()
 * $.jStorage.storageObj() -> returns a read-ony copy of the actual storage
 * 
 * -storageSize()
 * $.jStorage.storageSize() -> returns the size of the storage in bytes
 *
 * -index()
 * $.jStorage.index() -> returns the used keys as an array
 * 
 * -storageAvailable()
 * $.jStorage.storageAvailable() -> returns true if storage is available
 * 
 * -reInit()
 * $.jStorage.reInit() -> reloads the data from browser storage
 * 
 * <value> can be any JSON-able value, including objects and arrays.
 *
 **/
 

(function($){
    if(!$ || !($.toJSON || Object.toJSON || window.JSON) && !$.browser.msie){
        throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");
    }
    
    var
        /* This is the object, that holds the cached values */ 
        _storage = {},

        /* Actual browser storage (localStorage or globalStorage['domain']) */
        _storage_service = {jStorage:"{}"},

        /* DOM element for older IE versions, holds userData behavior */
        _storage_elm = null,
        
        /* How much space does the storage take */
        _storage_size = 0,

        /* function to encode objects to JSON strings */
        json_encode = $.toJSON || Object.toJSON || (window.JSON && (JSON.encode || JSON.stringify)),

        /* function to decode objects from JSON strings */
        json_decode = $.evalJSON || (window.JSON && (JSON.decode || JSON.parse)) || function(str){
            return String(str).evalJSON();
        },
        
        /* which backend is currently used */
        _backend = false;
        
        /**
         * XML encoding and decoding as XML nodes can't be JSON'ized
         * XML nodes are encoded and decoded if the node is the value to be saved
         * but not if it's as a property of another object
         * Eg. -
         *   $.jStorage.set("key", xmlNode);        // IS OK
         *   $.jStorage.set("key", {xml: xmlNode}); // NOT OK
         */
        _XMLService = {
            
            /**
             * Validates a XML node to be XML
             * based on jQuery.isXML function
             */
            isXML: function(elm){
                var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            },
            
            /**
             * Encodes a XML node to string
             * based on http://www.mercurytide.co.uk/news/article/issues-when-working-ajax/
             */
            encode: function(xmlNode) {
                if(!this.isXML(xmlNode)){
                    return false;
                }
                try{ // Mozilla, Webkit, Opera
                    return new XMLSerializer().serializeToString(xmlNode);
                }catch(E1) {
                    try {  // IE
                        return xmlNode.xml;
                    }catch(E2){}
                }
                return false;
            },
            
            /**
             * Decodes a XML node from string
             * loosely based on http://outwestmedia.com/jquery-plugins/xmldom/
             */
            decode: function(xmlString){
                var dom_parser = ("DOMParser" in window && (new DOMParser()).parseFromString) ||
                        (window.ActiveXObject && function(_xmlString) {
                    var xml_doc = new ActiveXObject('Microsoft.XMLDOM');
                    xml_doc.async = 'false';
                    xml_doc.loadXML(_xmlString);
                    return xml_doc;
                }),
                resultXML;
                if(!dom_parser){
                    return false;
                }
                resultXML = dom_parser.call("DOMParser" in window && (new DOMParser()) || window, xmlString, 'text/xml');
                return this.isXML(resultXML)?resultXML:false;
            }
        };

    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * Initialization function. Detects if the browser supports DOM Storage
     * or userData behavior and behaves accordingly.
     * @returns undefined
     */
    function _init(){
        /* Check if browser supports localStorage */
        if("localStorage" in window){
            try {
                if(window.localStorage) {
                    _storage_service = window.localStorage;
                    _backend = "localStorage";
                }
            } catch(E3) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports globalStorage */
        else if("globalStorage" in window){
            try {
                if(window.globalStorage) {
                    _storage_service = window.globalStorage[window.location.hostname];
                    _backend = "globalStorage";
                }
            } catch(E4) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports userData behavior */
        else {
            _storage_elm = document.createElement('link');
            if(_storage_elm.addBehavior){

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                var data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }else{
                _storage_elm = null;
                return;
            }
        }

        _load_storage();
    }
    
    /**
     * Loads the data from the storage based on the supported mechanism
     * @returns undefined
     */
    function _load_storage(){
        /* if jStorage string is retrieved, then decode it */
        if(_storage_service.jStorage){
            try{
                _storage = json_decode(String(_storage_service.jStorage));
            }catch(E6){_storage_service.jStorage = "{}";}
        }else{
            _storage_service.jStorage = "{}";
        }
        _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;    
    }

    /**
     * This functions provides the "save" mechanism to store the jStorage object
     * @returns undefined
     */
    function _save(){
        try{
            _storage_service.jStorage = json_encode(_storage);
            // If userData is used as the storage engine, additional
            if(_storage_elm) {
                _storage_elm.setAttribute("jStorage",_storage_service.jStorage);
                _storage_elm.save("jStorage");
            }
            _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
        }catch(E7){/* probably cache is full, nothing is saved this way*/}
    }

    /**
     * Function checks if a key is set and is string or numberic
     */
    function _checkKey(key){
        if(!key || (typeof key != "string" && typeof key != "number")){
            throw new TypeError('Key name must be string or numeric');
        }
        return true;
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    $.jStorage = {
        /* Version number */
        version: "0.1.5.2",

        /**
         * Sets a key's value.
         * 
         * @param {String} key - Key to set. If this value is not set or not
         *              a string an exception is raised.
         * @param value - Value to set. This can be any value that is JSON
         *              compatible (Numbers, Strings, Objects etc.).
         * @returns the used value
         */
        set: function(key, value){
            _checkKey(key);
            if(_XMLService.isXML(value)){
                value = {_is_xml:true,xml:_XMLService.encode(value)};
            }
            _storage[key] = value;
            _save();
            return value;
        },
        
        /**
         * Looks up a key in cache
         * 
         * @param {String} key - Key to look up.
         * @param {mixed} def - Default value to return, if key didn't exist.
         * @returns the key value, default value or <null>
         */
        get: function(key, def){
            _checkKey(key);
            if(key in _storage){
                if(_storage[key] && typeof _storage[key] == "object" &&
                        _storage[key]._is_xml &&
                            _storage[key]._is_xml){
                    return _XMLService.decode(_storage[key].xml);
                }else{
                    return _storage[key];
                }
            }
            return typeof(def) == 'undefined' ? null : def;
        },
        
        /**
         * Deletes a key from cache.
         * 
         * @param {String} key - Key to delete.
         * @returns true if key existed or false if it didn't
         */
        deleteKey: function(key){
            _checkKey(key);
            if(key in _storage){
                delete _storage[key];
                _save();
                return true;
            }
            return false;
        },

        /**
         * Deletes everything in cache.
         * 
         * @returns true
         */
        flush: function(){
            _storage = {};
            _save();
            return true;
        },
        
        /**
         * Returns a read-only copy of _storage
         * 
         * @returns Object
        */
        storageObj: function(){
            function F() {}
            F.prototype = _storage;
            return new F();
        },
        
        /**
         * Returns an index of all used keys as an array
         * ['key1', 'key2',..'keyN']
         * 
         * @returns Array
        */
        index: function(){
            var index = [], i;
            for(i in _storage){
                if(_storage.hasOwnProperty(i)){
                    index.push(i);
                }
            }
            return index;
        },
        
        /**
         * How much space in bytes does the storage take?
         * 
         * @returns Number
         */
        storageSize: function(){
            return _storage_size;
        },
        
        /**
         * Which backend is currently in use?
         * 
         * @returns String
         */
        currentBackend: function(){
            return _backend;
        },
        
        /**
         * Test if storage is available
         * 
         * @returns Boolean
         */
        storageAvailable: function(){
            return !!_backend;
        },
        
        /**
         * Reloads the data from browser storage
         * 
         * @returns undefined
         */
        reInit: function(){
            var new_storage_elm, data;
            if(_storage_elm && _storage_elm.addBehavior){
                new_storage_elm = document.createElement('link');
                
                _storage_elm.parentNode.replaceChild(new_storage_elm, _storage_elm);
                _storage_elm = new_storage_elm;
                
                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }
            
            _load_storage();
        }
    };

    // Initialize jStorage
    _init();

})(window.jQuery || window.$);

/**
 * jQuery custom checkboxes
 * 
 * Copyright (c) 2008 Khavilo Dmitry (http://widowmaker.kiev.ua/checkbox/)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 1.3.0 Beta 1
 * @author Khavilo Dmitry
 * @mailto wm.morgun@gmail.com
 * modified for White Label by Xaver Birsak revaxarts.com
**/

(function($){
	/* Little trick to remove event bubbling that causes events recursion */
	var CB = function(e)
	{
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	};
	
	$.fn.checkbox = function(options) {
		
		/* Default settings */
		var settings = {
			cls: 'jquery-checkbox'  /* checkbox  */
		};
		
		/* Processing settings */
		settings = $.extend(settings, options || {});
		
		/* Adds check/uncheck & disable/enable events */
		var addEvents = function(object)
		{
			var checked = object.checked;
			var disabled = object.disabled;
			var $object = $(object);
			
			if ( object.stateInterval )
				clearInterval(object.stateInterval);
			
			object.stateInterval = setInterval(
				function() 
				{
					if ( object.disabled != disabled )
						$object.trigger( (disabled = !!object.disabled) ? 'disable' : 'enable');
					if ( object.checked != checked )
						$object.trigger( (checked = !!object.checked) ? 'check' : 'uncheck');
				}, 
				10 /* in miliseconds. Low numbers this can decrease performance on slow computers, high will increase responce time */
			);
			return $object;
		};
		
		/* Wrapping all passed elements */
		return this.each(function() 
		{
			var ch = this; /* Reference to DOM Element*/
			var $ch = addEvents(ch),/* Adds custom events and returns, jQuery enclosed object */
				elClass = ($(ch).is(':radio')) ? 'radio' : 'checkbox'; 
			
			/* Removing wrapper if already applied  */
			if (ch.wrapper) ch.wrapper.remove();
			
			/* Creating wrapper for checkbox and assigning "hover" event */
			ch.wrapper = $('<span class="' + settings.cls + ' ' + elClass + '"><span><span class="checkboxplaceholder"></span></span></span>');
			ch.wrapperInner = ch.wrapper.children('span:eq(0)');
			ch.wrapper.bind({
				"click" : function(e) { $ch.trigger('click'); return false; },
				"mouseover" : function(e) { ch.wrapperInner.addClass('hover'); },
				"mouseout" : function(e) { ch.wrapperInner.removeClass('hover'); },
				"mousedown" : function(e) { ch.wrapperInner.addClass('pressed'); },
				"mouseup" : function(e) { ch.wrapperInner.removeClass('pressed'); }
			});
			
			/* Wrapping checkbox */
			$ch.css({position: 'absolute', zIndex: -1, visibility: 'hidden'}).after(ch.wrapper);
			
			/* Ttying to find "our" label */
			var label = false;
/*			if ($ch.attr('id')) {
				label = $('label[for='+$ch.attr('id')+']');
				if (!label.length) label = false;
			}
*/			if (!label) {
				label = $ch.closest('label');
				if (!label.length) label = false;
			}
			/* Label found, applying event hanlers */
			if (label) {
				label.bind({
					"click" : function(e) { $ch.trigger('click'); return false; },
					"mouseover" : function(e) { ch.wrapper.trigger('mouseover'); },
					"mouseout" : function(e) { ch.wrapper.trigger('mouseout'); },
					"mousedown" : function(e) { ch.wrapper.addClass('pressed'); },
					"mouseup" : function(e) { ch.wrapper.removeClass('pressed'); }
				});
			}
			
			$ch.bind('disable', function() { ch.wrapperInner.addClass('disabled');}).bind('enable', function() { ch.wrapperInner.removeClass( 'disabled' );});
			$ch.bind('check', function() { ch.wrapper.addClass('checked' );}).bind('uncheck', function() { ch.wrapper.removeClass( 'checked' );});
			
			/* Firefox antiselection hack */
			if ( window.getSelection )
				ch.wrapper.css('MozUserSelect', 'none');
			
			/* Applying checkbox state */
			if ( ch.checked )
				ch.wrapper.addClass('checked');
			if ( ch.disabled )
				ch.wrapperInner.addClass('disabled');			
		});
	}
})(jQuery);


$(document).ready(function () {

	/**
	 * WYSIWYG - jQuery plugin 0.97
	 * (0.97.2 - From infinity)
	 *
	 * Copyright (c) 2008-2009 Juan M Martinez, 2010-2011 Akzhan Abdulin and all contributors
	 * https://github.com/akzhan/jwysiwyg
	 *
	 * Dual licensed under the MIT and GPL licenses:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *   http://www.gnu.org/licenses/gpl.html
	 *
	 */

	/*jslint browser: true, forin: true */

	(function ($) {
		"use strict"; /* Wysiwyg namespace: private properties and methods */

		var console = window.console ? window.console : {
			log: $.noop,
			error: function (msg) {
				$.error(msg);
			}
		};
		var supportsProp = (('prop' in $.fn) && ('removeProp' in $.fn));

		function Wysiwyg() {
			this.controls = {
				bold: {
					groupIndex: 0,
					visible: false,
					tags: ["b", "strong"],
					css: {
						fontWeight: "bold"
					},
					tooltip: "Bold",
					hotkey: {
						"ctrl": 1,
						"key": 66
					}
				},

				copy: {
					groupIndex: 8,
					visible: false,
					tooltip: "Copy"
				},

				colorpicker: {
					visible: false,
					groupIndex: 1,
					tooltip: "Colorpicker",
					exec: function() {
						$.wysiwyg.controls.colorpicker.init(this);
					}
				},

				createLink: {
					groupIndex: 6,
					visible: false,
					exec: function () {
						var self = this;
						if ($.wysiwyg.controls && $.wysiwyg.controls.link) {
							$.wysiwyg.controls.link.init(this);
						} else if ($.wysiwyg.autoload) {
							$.wysiwyg.autoload.control("wysiwyg.link.js", function () {
								self.controls.createLink.exec.apply(self);
							});
						} else {
							console.error("$.wysiwyg.controls.link not defined. You need to include wysiwyg.link.js file");
						}
					},
					tags: ["a"],
					tooltip: "Create link"
				},

				cut: {
					groupIndex: 8,
					visible: false,
					tooltip: "Cut"
				},

				decreaseFontSize: {
					groupIndex: 9,
					visible: false,
					tags: ["small"],
					tooltip: "Decrease font size",
					exec: function () {
						this.decreaseFontSize();
					}
				},

				h1: {
					groupIndex: 7,
					visible: false,
					className: "h1",
					command: ($.browser.msie || $.browser.safari || $.browser.opera) ? "FormatBlock" : "heading",
					"arguments": ($.browser.msie || $.browser.safari || $.browser.opera) ? "<h1>" : "h1",
					tags: ["h1"],
					tooltip: "Header 1"
				},

				h2: {
					groupIndex: 7,
					visible: false,
					className: "h2",
					command: ($.browser.msie || $.browser.safari || $.browser.opera) ? "FormatBlock" : "heading",
					"arguments": ($.browser.msie || $.browser.safari || $.browser.opera) ? "<h2>" : "h2",
					tags: ["h2"],
					tooltip: "Header 2"
				},

				h3: {
					groupIndex: 7,
					visible: false,
					className: "h3",
					command: ($.browser.msie || $.browser.safari || $.browser.opera) ? "FormatBlock" : "heading",
					"arguments": ($.browser.msie || $.browser.safari || $.browser.opera) ? "<h3>" : "h3",
					tags: ["h3"],
					tooltip: "Header 3"
				},
				h4: {
					groupIndex: 7,
					visible: false,
					className: "h4",
					command: ($.browser.msie || $.browser.safari || $.browser.opera) ? "FormatBlock" : "heading",
					"arguments": ($.browser.msie || $.browser.safari || $.browser.opera) ? "<h4>" : "h4",
					tags: ["h4"],
					tooltip: "Header 4"
				},

				h5: {
					groupIndex: 7,
					visible: false,
					className: "h5",
					command: ($.browser.msie || $.browser.safari || $.browser.opera) ? "FormatBlock" : "heading",
					"arguments": ($.browser.msie || $.browser.safari || $.browser.opera) ? "<h5>" : "h5",
					tags: ["h5"],
					tooltip: "Header 5"
				},

				h6: {
					groupIndex: 7,
					visible: false,
					className: "h6",
					command: ($.browser.msie || $.browser.safari || $.browser.opera) ? "FormatBlock" : "heading",
					"arguments": ($.browser.msie || $.browser.safari || $.browser.opera) ? "<h6>" : "h6",
					tags: ["h6"],
					tooltip: "Header 6"
				},

				highlight: {
					tooltip: "Highlight",
					className: "highlight",
					groupIndex: 1,
					visible: false,
					css: {
						backgroundColor: "rgb(255, 255, 102)"
					},
					exec: function () {
						var command, node, selection, args;

						if ($.browser.msie || $.browser.safari) {
							command = "backcolor";
						} else {
							command = "hilitecolor";
						}

						if ($.browser.msie) {
							node = this.getInternalRange().parentElement();
						} else {
							selection = this.getInternalSelection();
							node = selection.extentNode || selection.focusNode;

							while (node.style === undefined) {
								node = node.parentNode;
								if (node.tagName && node.tagName.toLowerCase() === "body") {
									return;
								}
							}
						}

						if (node.style.backgroundColor === "rgb(255, 255, 102)" || node.style.backgroundColor === "#ffff66") {
							args = "#ffffff";
						} else {
							args = "#ffff66";
						}

						this.editorDoc.execCommand(command, false, args);
					}
				},

				html: {
					groupIndex: 10,
					visible: false,
					exec: function () {
						var elementHeight;

						if (this.options.resizeOptions && $.fn.resizable) {
							elementHeight = this.element.height();
						}

						if (this.viewHTML) {
							this.setContent(this.original.value);

							$(this.original).hide();
							this.editor.show();

							if (this.options.resizeOptions && $.fn.resizable) {
								// if element.height still the same after frame was shown
								if (elementHeight === this.element.height()) {
									this.element.height(elementHeight + this.editor.height());
								}

								this.element.resizable($.extend(true, {
									alsoResize: this.editor
								}, this.options.resizeOptions));
							}

							this.ui.toolbar.find("li").each(function () {
								var li = $(this);

								if (li.hasClass("html")) {
									li.removeClass("active");
								} else {
									li.removeClass('disabled');
								}
							});
						} else {
							this.saveContent();

							$(this.original).css({
								width: this.element.outerWidth() - 6,
								height: this.element.height() - this.ui.toolbar.height() - 6,
								resize: "none"
							}).show();
							this.editor.hide();

							if (this.options.resizeOptions && $.fn.resizable) {
								// if element.height still the same after frame was hidden
								if (elementHeight === this.element.height()) {
									this.element.height(this.ui.toolbar.height());
								}

								this.element.resizable("destroy");
							}

							this.ui.toolbar.find("li").each(function () {
								var li = $(this);

								if (li.hasClass("html")) {
									li.addClass("active");
								} else {
									if (false === li.hasClass("fullscreen")) {
										li.removeClass("active").addClass('disabled');
									}
								}
							});
						}

						this.viewHTML = !(this.viewHTML);
					},
					tooltip: "View source code"
				},

				increaseFontSize: {
					groupIndex: 9,
					visible: false,
					tags: ["big"],
					tooltip: "Increase font size",
					exec: function () {
						this.increaseFontSize();
					}
				},

				insertImage: {
					groupIndex: 6,
					visible: false,
					exec: function () {
						var self = this;

						if ($.wysiwyg.controls && $.wysiwyg.controls.image) {
							$.wysiwyg.controls.image.init(this);
						} else if ($.wysiwyg.autoload) {
							$.wysiwyg.autoload.control("wysiwyg.image.js", function () {
								self.controls.insertImage.exec.apply(self);
							});
						} else {
							console.error("$.wysiwyg.controls.image not defined. You need to include wysiwyg.image.js file");
						}
					},
					tags: ["img"],
					tooltip: "Insert image"
				},

				insertOrderedList: {
					groupIndex: 5,
					visible: false,
					tags: ["ol"],
					tooltip: "Insert Ordered List"
				},

				insertTable: {
					groupIndex: 6,
					visible: false,
					exec: function () {
						var self = this;

						if ($.wysiwyg.controls && $.wysiwyg.controls.table) {
							$.wysiwyg.controls.table(this);
						} else if ($.wysiwyg.autoload) {
							$.wysiwyg.autoload.control("wysiwyg.table.js", function () {
								self.controls.insertTable.exec.apply(self);
							});
						} else {
							console.error("$.wysiwyg.controls.table not defined. You need to include wysiwyg.table.js file");
						}
					},
					tags: ["table"],
					tooltip: "Insert table"
				},

				insertUnorderedList: {
					groupIndex: 5,
					visible: false,
					tags: ["ul"],
					tooltip: "Insert Unordered List"
				},

				italic: {
					groupIndex: 0,
					visible: false,
					tags: ["i", "em"],
					css: {
						fontStyle: "italic"
					},
					tooltip: "Italic",
					hotkey: {
						"ctrl": 1,
						"key": 73
					}
				},

				justifyLeft: {
					visible: false,
					groupIndex: 1,
					css: {
						textAlign: "left"
					},
					tooltip: "Justify Left"
				},

				justifyCenter: {
					groupIndex: 1,
					visible: false,
					tags: ["center"],
					css: {
						textAlign: "center"
					},
					tooltip: "Justify Center"
				},

				justifyRight: {
					groupIndex: 1,
					visible: false,
					css: {
						textAlign: "right"
					},
					tooltip: "Justify Right"
				},

				justifyFull: {
					groupIndex: 1,
					visible: false,
					css: {
						textAlign: "justify"
					},
					tooltip: "Justify Full"
				},

				ltr: {
					groupIndex: 9,
					visible: false,
					exec: function () {
						var p = this.dom.getElement("p");

						if (!p) {
							return false;
						}

						$(p).attr("dir", "ltr");
						return true;
					},
					tooltip: "Left to Right"
				},

				rtl: {
					groupIndex: 9,
					visible: false,
					exec: function () {
						var p = this.dom.getElement("p");

						if (!p) {
							return false;
						}

						$(p).attr("dir", "rtl");
						return true;
					},
					tooltip: "Right to Left"
				},

				indent: {
					groupIndex: 2,
					visible: false,
					tooltip: "Indent"
				},

				outdent: {
					groupIndex: 2,
					visible: false,
					tooltip: "Outdent"
				},

				insertHorizontalRule: {
					groupIndex: 5,
					visible: false,
					tags: ["hr"],
					tooltip: "Insert Horizontal Rule"
				},

				paragraph: {
					groupIndex: 7,
					visible: false,
					className: "paragraph",
					command: "FormatBlock",
					"arguments": ($.browser.msie || $.browser.safari || $.browser.opera) ? "<p>" : "p",
					tags: ["p"],
					tooltip: "Paragraph"
				},

				paste: {
					groupIndex: 8,
					visible: false,
					tooltip: "Paste"
				},

				undo: {
					groupIndex: 4,
					visible: false,
					tooltip: "Undo"
				},

				redo: {
					groupIndex: 4,
					visible: false,
					tooltip: "Redo"
				},

				removeFormat: {
					groupIndex: 10,
					visible: false,
					exec: function () {
						this.removeFormat();
					},
					tooltip: "Remove formatting"
				},


				underline: {
					groupIndex: 0,
					visible: false,
					tags: ["u"],
					css: {
						textDecoration: "underline"
					},
					tooltip: "Underline",
					hotkey: {
						"ctrl": 1,
						"key": 85
					}
				},

				strikeThrough: {
					groupIndex: 0,
					visible: false,
					tags: ["s", "strike"],
					css: {
						textDecoration: "line-through"
					},
					tooltip: "Strike-through"
				},

				subscript: {
					groupIndex: 3,
					visible: false,
					tags: ["sub"],
					tooltip: "Subscript"
				},

				superscript: {
					groupIndex: 3,
					visible: false,
					tags: ["sup"],
					tooltip: "Superscript"
				},

				code: {
					visible: false,
					groupIndex: 6,
					tooltip: "Code snippet",
					exec: function () {
						var range = this.getInternalRange(),
							common = $(range.commonAncestorContainer),
							$nodeName = range.commonAncestorContainer.nodeName.toLowerCase();
						if (common.parent("code").length) {
							common.unwrap();
						} else {
							if ($nodeName !== "body") {
								common.wrap("<code/>");
							}
						}
					}
				},

				cssWrap: {
					visible: false,
					groupIndex: 6,
					tooltip: "CSS Wrapper",
					exec: function () {
						$.wysiwyg.controls.cssWrap.init(this);
					}
				}

			};

			this.defaults = {
				html: '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>INITIAL_CONTENT</body></html>',
				debug: false,
				controls: {},
				css: {},
				events: {},
				autoGrow: false,
				autoSave: true,
				brIE: true,
				// http://code.google.com/p/jwysiwyg/issues/detail?id=15
				formHeight: 270,
				formWidth: 440,
				iFrameClass: null,
				initialContent: "<p>Initial content</p>",
				maxHeight: 10000,
				// see autoGrow
				maxLength: 0,
				messages: {
					nonSelection: "Select the text you wish to link"
				},
				toolbarHtml: '<ul role="menu" class="toolbar"></ul>',
				removeHeadings: false,
				replaceDivWithP: false,
				resizeOptions: false,
				rmUnusedControls: false,
				// https://github.com/akzhan/jwysiwyg/issues/52
				rmUnwantedBr: true,
				// http://code.google.com/p/jwysiwyg/issues/detail?id=11
				tableFiller: null,
				initialMinHeight: null,

				controlImage: {
					forceRelativeUrls: false
				},

				controlLink: {
					forceRelativeUrls: false
				},

				plugins: { // placeholder for plugins settings
					autoload: false,
					i18n: false,
					rmFormat: {
						rmMsWordMarkup: false
					}
				}
			};

			this.availableControlProperties = ["arguments", "callback", "className", "command", "css", "custom", "exec", "groupIndex", "hotkey", "icon", "tags", "tooltip", "visible"];

			this.editor = null;
			this.editorDoc = null;
			this.element = null;
			this.options = {};
			this.original = null;
			this.savedRange = null;
			this.timers = [];
			this.validKeyCodes = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

			this.isDestroyed = false;

			this.dom = { // DOM related properties and methods
				ie: {
					parent: null // link to dom
				},
				w3c: {
					parent: null // link to dom
				}
			};
			this.dom.parent = this;
			this.dom.ie.parent = this.dom;
			this.dom.w3c.parent = this.dom;

			this.ui = {}; // UI related properties and methods
			this.ui.self = this;
			this.ui.toolbar = null;
			this.ui.initialHeight = null; // ui.grow
			this.dom.getAncestor = function (element, filterTagName) {
				filterTagName = filterTagName.toLowerCase();

				while (element && "body" !== element.tagName.toLowerCase()) {
					if (filterTagName === element.tagName.toLowerCase()) {
						return element;
					}

					element = element.parentNode;
				}

				return null;
			};

			this.dom.getElement = function (filterTagName) {
				var dom = this;

				if (window.getSelection) {
					return dom.w3c.getElement(filterTagName);
				} else {
					return dom.ie.getElement(filterTagName);
				}
			};

			this.dom.ie.getElement = function (filterTagName) {
				var dom = this.parent,
					selection = dom.parent.getInternalSelection(),
					range = selection.createRange(),
					element;

				if ("Control" === selection.type) {
					// control selection
					if (1 === range.length) {
						element = range.item(0);
					} else {
						// multiple control selection
						return null;
					}
				} else {
					element = range.parentElement();
				}

				return dom.getAncestor(element, filterTagName);
			};

			this.dom.w3c.getElement = function (filterTagName) {
				var dom = this.parent,
					range = dom.parent.getInternalRange(),
					element;

				if (!range) {
					return null;
				}

				element = range.commonAncestorContainer;

				if (3 === element.nodeType) {
					element = element.parentNode;
				}

				// if startContainer not Text, Comment, or CDATASection element then
				// startOffset is the number of child nodes between the start of the
				// startContainer and the boundary point of the Range
				if (element === range.startContainer) {
					element = element.childNodes[range.startOffset];
				}

				return dom.getAncestor(element, filterTagName);
			};

			this.ui.addHoverClass = function () {
				$(this).addClass("wysiwyg-button-hover");
			};

			this.ui.appendControls = function () {
				var ui = this,
					self = this.self,
					controls = self.parseControls(),
					hasVisibleControls = true,
					// to prevent separator before first item
					groups = [],
					controlsByGroup = {},
					i, currentGroupIndex, // jslint wants all vars at top of function
					iterateGroup = function (controlName, control) {
						if (control.groupIndex && currentGroupIndex !== control.groupIndex) {
							currentGroupIndex = control.groupIndex;
							hasVisibleControls = false;
						}

						if (!control.visible) {
							return;
						}

						if (!hasVisibleControls) {
							ui.appendItemSeparator();
							hasVisibleControls = true;
						}

						if (control.custom) {
							ui.appendItemCustom(controlName, control);
						} else {
							ui.appendItem(controlName, control);
						}
					};

				$.each(controls, function (name, c) {
					var index = "empty";

					if (undefined !== c.groupIndex) {
						if ("" === c.groupIndex) {
							index = "empty";
						} else {
							index = c.groupIndex;
						}
					}

					if (undefined === controlsByGroup[index]) {
						groups.push(index);
						controlsByGroup[index] = {};
					}
					controlsByGroup[index][name] = c;
				});

				groups.sort(function (a, b) {
					if ("number" === typeof (a) && typeof (a) === typeof (b)) {
						return (a - b);
					} else {
						a = a.toString();
						b = b.toString();

						if (a > b) {
							return 1;
						}

						if (a === b) {
							return 0;
						}

						return -1;
					}
				});

				if (0 < groups.length) {
					// set to first index in groups to proper placement of separator
					currentGroupIndex = groups[0];
				}

				for (i = 0; i < groups.length; i += 1) {
					$.each(controlsByGroup[groups[i]], iterateGroup);
				}
			};

			this.ui.appendItem = function (name, control) {
				var self = this.self,
					className = control.className || control.command || name || "empty",
					tooltip = control.tooltip || control.command || name || "";

				return $('<li role="menuitem" unselectable="on">' + (className) + "</li>").addClass(className).attr("title", tooltip).hover(this.addHoverClass, this.removeHoverClass).click(function () {
					if ($(this).hasClass("disabled")) {
						return false;
					}

					self.triggerControl.apply(self, [name, control]);

					this.blur();
					self.ui.returnRange();
					self.ui.focus();
					return true;
				}).appendTo(self.ui.toolbar);
			};

			this.ui.appendItemCustom = function (name, control) {
				var self = this.self,
					tooltip = control.tooltip || control.command || name || "";

				if (control.callback) {
					$(window).bind("trigger-" + name + ".wysiwyg", control.callback);
				}

				return $('<li role="menuitem" unselectable="on" style="background: url(\'' + control.icon + '\') no-repeat;"></li>').addClass("custom-command-" + name).addClass("wysiwyg-custom-command").addClass(name).attr("title", tooltip).hover(this.addHoverClass, this.removeHoverClass).click(function () {
					if ($(this).hasClass("disabled")) {
						return false;
					}

					self.triggerControl.apply(self, [name, control]);

					this.blur();
					self.ui.returnRange();
					self.ui.focus();

					self.triggerControlCallback(name);
					return true;
				}).appendTo(self.ui.toolbar);
			};

			this.ui.appendItemSeparator = function () {
				var self = this.self;
				return $('<li role="separator" class="separator"></li>').appendTo(self.ui.toolbar);
			};

			this.autoSaveFunction = function () {
				this.saveContent();
			};

			this.ui.checkTargets = function (element) {
				var self = this.self;

				$.each(self.options.controls, function (name, control) {
					var className = control.className || control.command || name || "empty",
						tags, elm, css, el, checkActiveStatus = function (cssProperty, cssValue) {
							var handler;

							if ("function" === typeof (cssValue)) {
								handler = cssValue;
								if (handler(el.css(cssProperty).toString().toLowerCase(), self)) {
									self.ui.toolbar.find("." + className).addClass("active");
								}
							} else {
								if (el.css(cssProperty).toString().toLowerCase() === cssValue) {
									self.ui.toolbar.find("." + className).addClass("active");
								}
							}
						};

					if ("fullscreen" !== className) {
						self.ui.toolbar.find("." + className).removeClass("active");
					}

					if (control.tags || (control.options && control.options.tags)) {
						tags = control.tags || (control.options && control.options.tags);

						elm = element;
						while (elm) {
							if (elm.nodeType !== 1) {
								break;
							}

							if ($.inArray(elm.tagName.toLowerCase(), tags) !== -1) {
								self.ui.toolbar.find("." + className).addClass("active");
							}

							elm = elm.parentNode;
						}
					}

					if (control.css || (control.options && control.options.css)) {
						css = control.css || (control.options && control.options.css);
						el = $(element);

						while (el) {
							if (el[0].nodeType !== 1) {
								break;
							}
							$.each(css, checkActiveStatus);

							el = el.parent();
						}
					}
				});
			};

			this.ui.designMode = function () {
				var attempts = 3,
					self = this.self,
					runner;
				runner = function (attempts) {
					if ("on" === self.editorDoc.designMode) {
						if (self.timers.designMode) {
							window.clearTimeout(self.timers.designMode);
						}

						// IE needs to reget the document element (this.editorDoc) after designMode was set
						if (self.innerDocument() !== self.editorDoc) {
							self.ui.initFrame();
						}

						return;
					}

					try {
						self.editorDoc.designMode = "on";
					} catch (e) {}

					attempts -= 1;
					if (attempts > 0) {
						self.timers.designMode = window.setTimeout(function () {
							runner(attempts);
						}, 100);
					}
				};

				runner(attempts);
			};

			this.destroy = function () {
				this.isDestroyed = true;

				var i, $form = this.element.closest("form");

				for (i = 0; i < this.timers.length; i += 1) {
					window.clearTimeout(this.timers[i]);
				}

				// Remove bindings
				$form.unbind(".wysiwyg");
				this.element.remove();
				$.removeData(this.original, "wysiwyg");
				$(this.original).show();
				return this;
			};

			this.getRangeText = function () {
				var r = this.getInternalRange();

				if (r.toString) {
					r = r.toString();
				} else if (r.text) { // IE
					r = r.text;
				}

				return r;
			};
			//not used?
			this.execute = function (command, arg) {
				if (typeof (arg) === "undefined") {
					arg = null;
				}
				this.editorDoc.execCommand(command, false, arg);
			};

			this.extendOptions = function (options) {
				var controls = {};

				/**
				 * If the user set custom controls, we catch it, and merge with the
				 * defaults controls later.
				 */
				if ("object" === typeof options.controls) {
					controls = options.controls;
					delete options.controls;
				}

				options = $.extend(true, {}, this.defaults, options);
				options.controls = $.extend(true, {}, controls, this.controls, controls);

				if (options.rmUnusedControls) {
					$.each(options.controls, function (controlName) {
						if (!controls[controlName]) {
							delete options.controls[controlName];
						}
					});
				}

				return options;
			};

			this.ui.focus = function () {
				var self = this.self;

				self.editor.get(0).contentWindow.focus();
				return self;
			};

			this.ui.returnRange = function () {
				var self = this.self,
					sel;

				if (self.savedRange !== null) {
					if (window.getSelection) { //non IE and there is already a selection
						sel = window.getSelection();
						if (sel.rangeCount > 0) {
							sel.removeAllRanges();
						}
						try {
							sel.addRange(self.savedRange);
						} catch (e) {
							console.error(e);
						}
					} else if (window.document.createRange) { // non IE and no selection
						window.getSelection().addRange(self.savedRange);
					} else if (window.document.selection) { //IE
						self.savedRange.select();
					}

					self.savedRange = null;
				}
			};

			this.increaseFontSize = function () {
				if ($.browser.mozilla || $.browser.opera) {
					this.editorDoc.execCommand('increaseFontSize', false, null);
				} else if ($.browser.safari) {
					var newNode = this.editorDoc.createElement('big');
					this.getInternalRange().surroundContents(newNode);
				} else {
					console.error("Internet Explorer?");
				}
			};

			this.decreaseFontSize = function () {
				if ($.browser.mozilla || $.browser.opera) {
					this.editorDoc.execCommand('decreaseFontSize', false, null);
				} else if ($.browser.safari) {
					var newNode = this.editorDoc.createElement('small');
					this.getInternalRange().surroundContents(newNode);
				} else {
					console.error("Internet Explorer?");
				}
			};

			this.getContent = function () {
				if (this.viewHTML) {
					this.setContent(this.original.value);
				}
				return this.events.filter('getContent', this.editorDoc.body.innerHTML);
			};

			/**
			 * A jWysiwyg specific event system.
			 *
			 * Example:
			 * 
			 * $("#editor").getWysiwyg().events.bind("getContent", function (orig) {
			 *     return "<div id='content'>"+orgi+"</div>";
			 * });
			 * 
			 * This makes it so that when ever getContent is called, it is wrapped in a div#content.
			 */
			this.events = {
				_events: {},

				/**
				 * Similar to jQuery's bind, but for jWysiwyg only.
				 */
				bind: function (eventName, callback) {
					if (typeof (this._events.eventName) !== "object") {
						this._events[eventName] = [];
					}
					this._events[eventName].push(callback);
				},

				/**
				 * Similar to jQuery's trigger, but for jWysiwyg only.
				 */
				trigger: function (eventName, args) {
					if (typeof (this._events.eventName) === "object") {
						var editor = this.editor;
						$.each(this._events[eventName], function (k, v) {
							if (typeof (v) === "function") {
								v.apply(editor, args);
							}
						});
					}
				},

				/**
				 * This "filters" `originalText` by passing it as the first argument to every callback
				 * with the name `eventName` and taking the return value and passing it to the next function.
				 *
				 * This function returns the result after all the callbacks have been applied to `originalText`.
				 */
				filter: function (eventName, originalText) {
					if (typeof (this._events[eventName]) === "object") {
						var editor = this.editor,
							args = Array.prototype.slice.call(arguments, 1);

						$.each(this._events[eventName], function (k, v) {
							if (typeof (v) === "function") {
								originalText = v.apply(editor, args);
							}
						});
					}
					return originalText;
				}
			};

			this.getElementByAttributeValue = function (tagName, attributeName, attributeValue) {
				var i, value, elements = this.editorDoc.getElementsByTagName(tagName);

				for (i = 0; i < elements.length; i += 1) {
					value = elements[i].getAttribute(attributeName);

					if ($.browser.msie) { /** IE add full path, so I check by the last chars. */
						value = value.substr(value.length - attributeValue.length);
					}

					if (value === attributeValue) {
						return elements[i];
					}
				}

				return false;
			};

			this.getInternalRange = function () {
				var selection = this.getInternalSelection();

				if (!selection) {
					return null;
				}

				if (selection.rangeCount && selection.rangeCount > 0) { // w3c
					return selection.getRangeAt(0);
				} else if (selection.createRange) { // ie
					return selection.createRange();
				}

				return null;
			};

			this.getInternalSelection = function () {
				// firefox: document.getSelection is deprecated
				if (this.editor.get(0).contentWindow) {
					if (this.editor.get(0).contentWindow.getSelection) {
						return this.editor.get(0).contentWindow.getSelection();
					}
					if (this.editor.get(0).contentWindow.selection) {
						return this.editor.get(0).contentWindow.selection;
					}
				}
				if (this.editorDoc.getSelection) {
					return this.editorDoc.getSelection();
				}
				if (this.editorDoc.selection) {
					return this.editorDoc.selection;
				}

				return null;
			};

			this.getRange = function () {
				var selection = this.getSelection();

				if (!selection) {
					return null;
				}

				if (selection.rangeCount && selection.rangeCount > 0) { // w3c
					selection.getRangeAt(0);
				} else if (selection.createRange) { // ie
					return selection.createRange();
				}

				return null;
			};

			this.getSelection = function () {
				return (window.getSelection) ? window.getSelection() : window.document.selection;
			};

			// :TODO: you can type long string and letters will be hidden because of overflow
			this.ui.grow = function () {
				var self = this.self,
					innerBody = $(self.editorDoc.body),
					innerHeight = $.browser.msie ? innerBody[0].scrollHeight : innerBody.height() + 2 + 20,
					// 2 - borders, 20 - to prevent content jumping on grow
					minHeight = self.ui.initialHeight,
					height = Math.max(innerHeight, minHeight);

				height = Math.min(height, self.options.maxHeight);

				self.editor.attr("scrolling", height < self.options.maxHeight ? "no" : "auto"); // hide scrollbar firefox
				innerBody.css("overflow", height < self.options.maxHeight ? "hidden" : ""); // hide scrollbar chrome
				self.editor.get(0).height = height;

				return self;
			};

			this.init = function (element, options) {
				var self = this,
					$form = $(element).closest("form"),
					newX = element.width || element.clientWidth || 0,
					newY = element.height || element.clientHeight || 0;

				this.options = this.extendOptions(options);
				this.original = element;
				this.ui.toolbar = $(this.options.toolbarHtml);

				if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
					this.options.autoGrow = false;
				}

				if (newX === 0 && element.cols) {
					newX = (element.cols * 8) + 21;
				}
				if (newY === 0 && element.rows) {
					newY = (element.rows * 16) + 16;
				}

				this.editor = $(window.location.protocol === "https:" ? '<iframe src="javascript:false;"></iframe>' : "<iframe></iframe>").attr("frameborder", "0");

				if (this.options.iFrameClass) {
					this.editor.addClass(this.options.iFrameClass);
				} else {
					this.editor.css({
						minHeight: (newY - 6).toString() + "px",
						// fix for issue 12 ( http://github.com/akzhan/jwysiwyg/issues/issue/12 )
						width: (newX > 50) ? (newX - 8).toString() + "px" : ""
					});
					if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
						this.editor.css("height", newY.toString() + "px");
					}
				}
				/**
				 * http://code.google.com/p/jwysiwyg/issues/detail?id=96
				 */
				this.editor.attr("tabindex", $(element).attr("tabindex"));

				this.element = $("<div/>").addClass("wysiwyg");

				if (!this.options.iFrameClass) {
					this.element.css({
						width: (newX > 0) ? newX.toString() + "px" : "100%"
					});
				}

				$(element).hide().before(this.element);

				this.viewHTML = false;

				/**
				 * @link http://code.google.com/p/jwysiwyg/issues/detail?id=52
				 */
				this.initialContent = $(element).val();
				this.ui.initFrame();

				if (this.options.resizeOptions && $.fn.resizable) {
					this.element.resizable($.extend(true, {
						alsoResize: this.editor
					}, this.options.resizeOptions));
				}

				if (this.options.autoSave) {
					$form.bind("submit.wysiwyg", function () {
						self.autoSaveFunction();
					});
				}

				$form.bind("reset.wysiwyg", function () {
					self.resetFunction();
				});
			};

			this.ui.initFrame = function () {
				var self = this.self,
					stylesheet, growHandler, saveHandler;

				self.ui.appendControls();
				self.element.append(self.ui.toolbar).append($("<div><!-- --></div>").css({
					clear: "both"
				})).append(self.editor);

				self.editorDoc = self.innerDocument();

				if (self.isDestroyed) {
					return null;
				}

				self.ui.designMode();
				self.editorDoc.open();
				self.editorDoc.write(
				self.options.html
				/**
				 * @link http://code.google.com/p/jwysiwyg/issues/detail?id=144
				 */
				.replace(/INITIAL_CONTENT/, function () {
					return self.wrapInitialContent();
				}));
				self.editorDoc.close();

				$.wysiwyg.plugin.bind(self);

				$(self.editorDoc).trigger("initFrame.wysiwyg");

				$(self.editorDoc).bind("click.wysiwyg", function (event) {
					self.ui.checkTargets(event.target ? event.target : event.srcElement);
				});

				/**
				 * @link http://code.google.com/p/jwysiwyg/issues/detail?id=20
				 */
				$(self.original).focus(function () {
					if ($(this).filter(":visible")) {
						return;
					}
					self.ui.focus();
				});

				$(self.editorDoc).keydown(function (event) {
					var emptyContentRegex;
					if (event.keyCode === 8) { // backspace
						emptyContentRegex = /^<([\w]+)[^>]*>(<br\/?>)?<\/\1>$/;
						if (emptyContentRegex.test(self.getContent())) { // if content is empty
							event.stopPropagation(); // prevent remove single empty tag
							return false;
						}
					}
					return true;
				});

				if (!$.browser.msie) {
					$(self.editorDoc).keydown(function (event) {
						var controlName;

						/* Meta for Macs. tom@punkave.com */
						if (event.ctrlKey || event.metaKey) {
							for (controlName in self.controls) {
								if (self.controls[controlName].hotkey && self.controls[controlName].hotkey.ctrl) {
									if (event.keyCode === self.controls[controlName].hotkey.key) {
										self.triggerControl.apply(self, [controlName, self.controls[controlName]]);

										return false;
									}
								}
							}
						}

						return true;
					});
				} else if (self.options.brIE) {
					$(self.editorDoc).keydown(function (event) {
						if (event.keyCode === 13) {
							var rng = self.getRange();
							rng.pasteHTML("<br/>");
							rng.collapse(false);
							rng.select();

							return false;
						}

						return true;
					});
				}

				if (self.options.plugins.rmFormat.rmMsWordMarkup) {
					$(self.editorDoc).bind("keyup.wysiwyg", function (event) {
						if (event.ctrlKey || event.metaKey) {
							// CTRL + V (paste)
							if (86 === event.keyCode) {
								if ($.wysiwyg.rmFormat) {
									if ("object" === typeof (self.options.plugins.rmFormat.rmMsWordMarkup)) {
										$.wysiwyg.rmFormat.run(self, {
											rules: {
												msWordMarkup: self.options.plugins.rmFormat.rmMsWordMarkup
											}
										});
									} else {
										$.wysiwyg.rmFormat.run(self, {
											rules: {
												msWordMarkup: {
													enabled: true
												}
											}
										});
									}
								}
							}
						}
					});
				}

				if (self.options.autoSave) {
					$(self.editorDoc).keydown(function () {
						self.autoSaveFunction();
					}).keyup(function () {
						self.autoSaveFunction();
					}).mousedown(function () {
						self.autoSaveFunction();
					}).bind($.support.noCloneEvent ? "input.wysiwyg" : "paste.wysiwyg", function () {
						self.autoSaveFunction();
					});
				}

				if (self.options.autoGrow) {
					if (self.options.initialMinHeight !== null) {
						self.ui.initialHeight = self.options.initialMinHeight;
					} else {
						self.ui.initialHeight = $(self.editorDoc).height();
					}
					$(self.editorDoc.body).css("border", "1px solid white"); // cancel margin collapsing
					growHandler = function () {
						self.ui.grow();
					};

					$(self.editorDoc).keyup(growHandler);
					$(self.editorDoc).bind("editorRefresh.wysiwyg", growHandler);

					// fix when content height > textarea height
					self.ui.grow();
				}

				if (self.options.css) {
					if (String === self.options.css.constructor) {
						if ($.browser.msie) {
							stylesheet = self.editorDoc.createStyleSheet(self.options.css);
							$(stylesheet).attr({
								"media": "all"
							});
						} else {
							stylesheet = $("<link/>").attr({
								"href": self.options.css,
								"media": "all",
								"rel": "stylesheet",
								"type": "text/css"
							});

							$(self.editorDoc).find("head").append(stylesheet);
						}
					} else {
						self.timers.initFrame_Css = window.setTimeout(function () {
							$(self.editorDoc.body).css(self.options.css);
						}, 0);
					}
				}

				if (self.initialContent.length === 0) {
					if ("function" === typeof (self.options.initialContent)) {
						self.setContent(self.options.initialContent());
					} else {
						self.setContent(self.options.initialContent);
					}
				}

				if (self.options.maxLength > 0) {
					$(self.editorDoc).keydown(function (event) {
						if ($(self.editorDoc).text().length >= self.options.maxLength && $.inArray(event.which, self.validKeyCodes) === -1) {
							event.preventDefault();
						}
					});
				}

				// Support event callbacks
				$.each(self.options.events, function (key, handler) {
					$(self.editorDoc).bind(key + ".wysiwyg", function (event) {
						// Trigger event handler, providing the event and api to 
						// support additional functionality.
						handler.apply(self.editorDoc, [event, self]);
					});
				});

				// restores selection properly on focus
				if ($.browser.msie) {
					// Event chain: beforedeactivate => focusout => blur.
					// Focusout & blur fired too late to handle internalRange() in dialogs.
					// When clicked on input boxes both got range = null
					$(self.editorDoc).bind("beforedeactivate.wysiwyg", function () {
						self.savedRange = self.getInternalRange();
					});
				} else {
					$(self.editorDoc).bind("blur.wysiwyg", function () {
						self.savedRange = self.getInternalRange();
					});
				}

				$(self.editorDoc.body).addClass("wysiwyg");
				if (self.options.events && self.options.events.save) {
					saveHandler = self.options.events.save;

					$(self.editorDoc).bind("keyup.wysiwyg", saveHandler);
					$(self.editorDoc).bind("change.wysiwyg", saveHandler);

					if ($.support.noCloneEvent) {
						$(self.editorDoc).bind("input.wysiwyg", saveHandler);
					} else {
						$(self.editorDoc).bind("paste.wysiwyg", saveHandler);
						$(self.editorDoc).bind("cut.wysiwyg", saveHandler);
					}
				}

				/**
				 * XHTML5 {@link https://github.com/akzhan/jwysiwyg/issues/152}
				 */
				if (self.options.xhtml5 && self.options.unicode) {
					var replacements = {
						ne: 8800,
						le: 8804,
						para: 182,
						xi: 958,
						darr: 8595,
						nu: 957,
						oacute: 243,
						Uacute: 218,
						omega: 969,
						prime: 8242,
						pound: 163,
						igrave: 236,
						thorn: 254,
						forall: 8704,
						emsp: 8195,
						lowast: 8727,
						brvbar: 166,
						alefsym: 8501,
						nbsp: 160,
						delta: 948,
						clubs: 9827,
						lArr: 8656,
						Omega: 937,
						Auml: 196,
						cedil: 184,
						and: 8743,
						plusmn: 177,
						ge: 8805,
						raquo: 187,
						uml: 168,
						equiv: 8801,
						laquo: 171,
						rdquo: 8221,
						Epsilon: 917,
						divide: 247,
						fnof: 402,
						chi: 967,
						Dagger: 8225,
						iacute: 237,
						rceil: 8969,
						sigma: 963,
						Oslash: 216,
						acute: 180,
						frac34: 190,
						lrm: 8206,
						upsih: 978,
						Scaron: 352,
						part: 8706,
						exist: 8707,
						nabla: 8711,
						image: 8465,
						prop: 8733,
						zwj: 8205,
						omicron: 959,
						aacute: 225,
						Yuml: 376,
						Yacute: 221,
						weierp: 8472,
						rsquo: 8217,
						otimes: 8855,
						kappa: 954,
						thetasym: 977,
						harr: 8596,
						Ouml: 214,
						Iota: 921,
						ograve: 242,
						sdot: 8901,
						copy: 169,
						oplus: 8853,
						acirc: 226,
						sup: 8835,
						zeta: 950,
						Iacute: 205,
						Oacute: 211,
						crarr: 8629,
						Nu: 925,
						bdquo: 8222,
						lsquo: 8216,
						apos: 39,
						Beta: 914,
						eacute: 233,
						egrave: 232,
						lceil: 8968,
						Kappa: 922,
						piv: 982,
						Ccedil: 199,
						ldquo: 8220,
						Xi: 926,
						cent: 162,
						uarr: 8593,
						hellip: 8230,
						Aacute: 193,
						ensp: 8194,
						sect: 167,
						Ugrave: 217,
						aelig: 230,
						ordf: 170,
						curren: 164,
						sbquo: 8218,
						macr: 175,
						Phi: 934,
						Eta: 919,
						rho: 961,
						Omicron: 927,
						sup2: 178,
						euro: 8364,
						aring: 229,
						Theta: 920,
						mdash: 8212,
						uuml: 252,
						otilde: 245,
						eta: 951,
						uacute: 250,
						rArr: 8658,
						nsub: 8836,
						agrave: 224,
						notin: 8713,
						ndash: 8211,
						Psi: 936,
						Ocirc: 212,
						sube: 8838,
						szlig: 223,
						micro: 181,
						not: 172,
						sup1: 185,
						middot: 183,
						iota: 953,
						ecirc: 234,
						lsaquo: 8249,
						thinsp: 8201,
						sum: 8721,
						ntilde: 241,
						scaron: 353,
						cap: 8745,
						atilde: 227,
						lang: 10216,
						__replacement: 65533,
						isin: 8712,
						gamma: 947,
						Euml: 203,
						ang: 8736,
						upsilon: 965,
						Ntilde: 209,
						hearts: 9829,
						Alpha: 913,
						Tau: 932,
						spades: 9824,
						dagger: 8224,
						THORN: 222,
						"int": 8747,
						lambda: 955,
						Eacute: 201,
						Uuml: 220,
						infin: 8734,
						rlm: 8207,
						Aring: 197,
						ugrave: 249,
						Egrave: 200,
						Acirc: 194,
						rsaquo: 8250,
						ETH: 208,
						oslash: 248,
						alpha: 945,
						Ograve: 210,
						Prime: 8243,
						mu: 956,
						ni: 8715,
						real: 8476,
						bull: 8226,
						beta: 946,
						icirc: 238,
						eth: 240,
						prod: 8719,
						larr: 8592,
						ordm: 186,
						perp: 8869,
						Gamma: 915,
						reg: 174,
						ucirc: 251,
						Pi: 928,
						psi: 968,
						tilde: 732,
						asymp: 8776,
						zwnj: 8204,
						Agrave: 192,
						deg: 176,
						AElig: 198,
						times: 215,
						Delta: 916,
						sim: 8764,
						Otilde: 213,
						Mu: 924,
						uArr: 8657,
						circ: 710,
						theta: 952,
						Rho: 929,
						sup3: 179,
						diams: 9830,
						tau: 964,
						Chi: 935,
						frac14: 188,
						oelig: 339,
						shy: 173,
						or: 8744,
						dArr: 8659,
						phi: 966,
						iuml: 239,
						Lambda: 923,
						rfloor: 8971,
						iexcl: 161,
						cong: 8773,
						ccedil: 231,
						Icirc: 206,
						frac12: 189,
						loz: 9674,
						rarr: 8594,
						cup: 8746,
						radic: 8730,
						frasl: 8260,
						euml: 235,
						OElig: 338,
						hArr: 8660,
						Atilde: 195,
						Upsilon: 933,
						there4: 8756,
						ouml: 246,
						oline: 8254,
						Ecirc: 202,
						yacute: 253,
						auml: 228,
						permil: 8240,
						sigmaf: 962,
						iquest: 191,
						empty: 8709,
						pi: 960,
						Ucirc: 219,
						supe: 8839,
						Igrave: 204,
						yen: 165,
						rang: 10217,
						trade: 8482,
						lfloor: 8970,
						minus: 8722,
						Zeta: 918,
						sub: 8834,
						epsilon: 949,
						yuml: 255,
						Sigma: 931,
						Iuml: 207,
						ocirc: 244
					};
					self.events.bind("getContent", function (text) {
						return text.replace(/&(?:amp;)?(?!amp|lt|gt|quot)([a-z][a-z0-9]*);/gi, function (str, p1) {
							if (!replacements[p1]) {
								p1 = p1.toLowerCase();
								if (!replacements[p1]) {
									p1 = "__replacement";
								}
							}

							var num = replacements[p1]; /* Numeric return if ever wanted: return replacements[p1] ? "&#"+num+";" : ""; */
							return String.fromCharCode(num);
						});
					});
				}
			};

			this.innerDocument = function () {
				var element = this.editor.get(0);

				if (element.nodeName.toLowerCase() === "iframe") {
					if (element.contentDocument) { // Gecko
						return element.contentDocument;
					} else if (element.contentWindow) { // IE
						return element.contentWindow.document;
					}

					if (this.isDestroyed) {
						return null;
					}

					console.error("Unexpected error in innerDocument");

/*
					 return ( $.browser.msie )
					 ? document.frames[element.id].document
					 : element.contentWindow.document // contentDocument;
					 */
				}

				return element;
			};

			this.insertHtml = function (szHTML) {
				var img, range;

				if (!szHTML || szHTML.length === 0) {
					return this;
				}

				if ($.browser.msie) {
					this.ui.focus();
					this.editorDoc.execCommand("insertImage", false, "#jwysiwyg#");
					img = this.getElementByAttributeValue("img", "src", "#jwysiwyg#");
					if (img) {
						$(img).replaceWith(szHTML);
					}
				} else {
					if ($.browser.mozilla) { // @link https://github.com/akzhan/jwysiwyg/issues/50
						if (1 === $(szHTML).length) {
							range = this.getInternalRange();
							range.deleteContents();
							range.insertNode($(szHTML).get(0));
						} else {
							this.editorDoc.execCommand("insertHTML", false, szHTML);
						}
					} else {
						if (!this.editorDoc.execCommand("insertHTML", false, szHTML)) {
							this.editor.focus();
/* :TODO: place caret at the end
							if (window.getSelection) {
							} else {
							}
							this.editor.focus();
							*/
							this.editorDoc.execCommand("insertHTML", false, szHTML);
						}
					}
				}

				this.saveContent();

				return this;
			};

			this.parseControls = function () {
				var self = this;

				$.each(this.options.controls, function (controlName, control) {
					$.each(control, function (propertyName) {
						if (-1 === $.inArray(propertyName, self.availableControlProperties)) {
							throw controlName + '["' + propertyName + '"]: property "' + propertyName + '" not exists in Wysiwyg.availableControlProperties';
						}
					});
				});

				if (this.options.parseControls) {
					return this.options.parseControls.call(this);
				}

				return this.options.controls;
			};

			this.removeFormat = function () {
				if ($.browser.msie) {
					this.ui.focus();
				}

				if (this.options.removeHeadings) {
					this.editorDoc.execCommand("formatBlock", false, "<p>"); // remove headings
				}

				this.editorDoc.execCommand("removeFormat", false, null);
				this.editorDoc.execCommand("unlink", false, null);

				if ($.wysiwyg.rmFormat && $.wysiwyg.rmFormat.enabled) {
					if ("object" === typeof (this.options.plugins.rmFormat.rmMsWordMarkup)) {
						$.wysiwyg.rmFormat.run(this, {
							rules: {
								msWordMarkup: this.options.plugins.rmFormat.rmMsWordMarkup
							}
						});
					} else {
						$.wysiwyg.rmFormat.run(this, {
							rules: {
								msWordMarkup: {
									enabled: true
								}
							}
						});
					}
				}

				return this;
			};

			this.ui.removeHoverClass = function () {
				$(this).removeClass("wysiwyg-button-hover");
			};

			this.resetFunction = function () {
				this.setContent(this.initialContent);
			};

			this.saveContent = function () {
				if (this.viewHTML) {
					return; // no need
				}
				if (this.original) {
					var content, newContent;

					content = this.getContent();

					if (this.options.rmUnwantedBr) {
						content = content.replace(/<br\/?>$/, "");
					}

					if (this.options.replaceDivWithP) {
						newContent = $("<div/>").addClass("temp").append(content);

						newContent.children("div").each(function () {
							var element = $(this),
								p = element.find("p"),
								i;

							if (0 === p.length) {
								p = $("<p></p>");

								if (this.attributes.length > 0) {
									for (i = 0; i < this.attributes.length; i += 1) {
										p.attr(this.attributes[i].name, element.attr(this.attributes[i].name));
									}
								}

								p.append(element.html());

								element.replaceWith(p);
							}
						});

						content = newContent.html();
					}

					$(this.original).val(content);

					if (this.options.events && this.options.events.save) {
						this.options.events.save.call(this);
					}
				}

				return this;
			};

			this.setContent = function (newContent) {
				this.editorDoc.body.innerHTML = newContent;
				this.saveContent();

				return this;
			};

			this.triggerControl = function (name, control) {
				var cmd = control.command || name,
					args = control["arguments"] || [];

				if (control.exec) {
					control.exec.apply(this);
				} else {
					this.ui.focus();
					this.ui.withoutCss();
					// when click <Cut>, <Copy> or <Paste> got "Access to XPConnect service denied" code: "1011"
					// in Firefox untrusted JavaScript is not allowed to access the clipboard
					try {
						this.editorDoc.execCommand(cmd, false, args);
					} catch (e) {
						console.error(e);
					}
				}

				if (this.options.autoSave) {
					this.autoSaveFunction();
				}
			};

			this.triggerControlCallback = function (name) {
				$(window).trigger("trigger-" + name + ".wysiwyg", [this]);
			};

			this.ui.withoutCss = function () {
				var self = this.self;

				if ($.browser.mozilla) {
					try {
						self.editorDoc.execCommand("styleWithCSS", false, false);
					} catch (e) {
						try {
							self.editorDoc.execCommand("useCSS", false, true);
						} catch (e2) {}
					}
				}

				return self;
			};

			this.wrapInitialContent = function () {
				var content = this.initialContent,
					found = content.match(/<\/?p>/gi);

				if (!found) {
					return "<p>" + content + "</p>";
				} else {
					// :TODO: checking/replacing
				}

				return content;
			};
		}

		/*
		 * Wysiwyg namespace: public properties and methods
		 */
		$.wysiwyg = {
			messages: {
				noObject: "Something goes wrong, check object"
			},

			/**
			 * Custom control support by Alec Gorge ( http://github.com/alecgorge )
			 */
			addControl: function (object, name, settings) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg"),
						customControl = {},
						toolbar;

					if (!oWysiwyg) {
						return this;
					}

					customControl[name] = $.extend(true, {
						visible: true,
						custom: true
					}, settings);
					$.extend(true, oWysiwyg.options.controls, customControl);

					// render new toolbar
					toolbar = $(oWysiwyg.options.toolbarHtml);
					oWysiwyg.ui.toolbar.replaceWith(toolbar);
					oWysiwyg.ui.toolbar = toolbar;
					oWysiwyg.ui.appendControls();
				});
			},

			clear: function (object) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg");

					if (!oWysiwyg) {
						return this;
					}

					oWysiwyg.setContent("");
				});
			},

			console: console,
			// let our console be available for extensions
			destroy: function (object) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg");

					if (!oWysiwyg) {
						return this;
					}

					oWysiwyg.destroy();
				});
			},

			"document": function (object) {
				// no chains because of return
				var oWysiwyg = object.data("wysiwyg");

				if (!oWysiwyg) {
					return undefined;
				}

				return $(oWysiwyg.editorDoc);
			},

			getContent: function (object) {
				// no chains because of return
				var oWysiwyg = object.data("wysiwyg");

				if (!oWysiwyg) {
					return undefined;
				}

				return oWysiwyg.getContent();
			},

			init: function (object, options) {
				return object.each(function () {
					var opts = $.extend(true, {}, options),
						obj;

					// :4fun:
					// remove this textarea validation and change line in this.saveContent function
					// $(this.original).val(content); to $(this.original).html(content);
					// now you can make WYSIWYG editor on h1, p, and many more tags
					if (("textarea" !== this.nodeName.toLowerCase()) || $(this).data("wysiwyg")) {
						return;
					}

					obj = new Wysiwyg();
					obj.init(this, opts);
					$.data(this, "wysiwyg", obj);

					$(obj.editorDoc).trigger("afterInit.wysiwyg");
				});
			},

			insertHtml: function (object, szHTML) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg");

					if (!oWysiwyg) {
						return this;
					}

					oWysiwyg.insertHtml(szHTML);
				});
			},

			plugin: {
				listeners: {},

				bind: function (Wysiwyg) {
					var self = this;

					$.each(this.listeners, function (action, handlers) {
						var i, plugin;

						for (i = 0; i < handlers.length; i += 1) {
							plugin = self.parseName(handlers[i]);

							$(Wysiwyg.editorDoc).bind(action + ".wysiwyg", {
								plugin: plugin
							}, function (event) {
								$.wysiwyg[event.data.plugin.name][event.data.plugin.method].apply($.wysiwyg[event.data.plugin.name], [Wysiwyg]);
							});
						}
					});
				},

				exists: function (name) {
					var plugin;

					if ("string" !== typeof (name)) {
						return false;
					}

					plugin = this.parseName(name);

					if (!$.wysiwyg[plugin.name] || !$.wysiwyg[plugin.name][plugin.method]) {
						return false;
					}

					return true;
				},

				listen: function (action, handler) {
					var plugin;

					plugin = this.parseName(handler);

					if (!$.wysiwyg[plugin.name] || !$.wysiwyg[plugin.name][plugin.method]) {
						return false;
					}

					if (!this.listeners[action]) {
						this.listeners[action] = [];
					}

					this.listeners[action].push(handler);

					return true;
				},

				parseName: function (name) {
					var elements;

					if ("string" !== typeof (name)) {
						return false;
					}

					elements = name.split(".");

					if (2 > elements.length) {
						return false;
					}

					return {
						name: elements[0],
						method: elements[1]
					};
				},

				register: function (data) {
					if (!data.name) {
						console.error("Plugin name missing");
					}

					$.each($.wysiwyg, function (pluginName) {
						if (pluginName === data.name) {
							console.error("Plugin with name '" + data.name + "' was already registered");
						}
					});

					$.wysiwyg[data.name] = data;

					return true;
				}
			},

			removeFormat: function (object) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg");

					if (!oWysiwyg) {
						return this;
					}

					oWysiwyg.removeFormat();
				});
			},

			save: function (object) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg");

					if (!oWysiwyg) {
						return this;
					}

					oWysiwyg.saveContent();
				});
			},

			selectAll: function (object) {
				var oWysiwyg = object.data("wysiwyg"),
					oBody, oRange, selection;

				if (!oWysiwyg) {
					return this;
				}

				oBody = oWysiwyg.editorDoc.body;
				if (window.getSelection) {
					selection = oWysiwyg.getInternalSelection();
					selection.selectAllChildren(oBody);
				} else {
					oRange = oBody.createTextRange();
					oRange.moveToElementText(oBody);
					oRange.select();
				}
			},

			setContent: function (object, newContent) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg");

					if (!oWysiwyg) {
						return this;
					}

					oWysiwyg.setContent(newContent);
				});
			},

			triggerControl: function (object, controlName) {
				return object.each(function () {
					var oWysiwyg = $(this).data("wysiwyg");

					if (!oWysiwyg) {
						return this;
					}

					if (!oWysiwyg.controls[controlName]) {
						console.error("Control '" + controlName + "' not exists");
					}

					oWysiwyg.triggerControl.apply(oWysiwyg, [controlName, oWysiwyg.controls[controlName]]);
				});
			},


			support: {
				prop: supportsProp
			},

			utils: {
				extraSafeEntities: [
					["<", ">", "'", '"', " "],
					[32]
				],

				encodeEntities: function (str) {
					var self = this,
						aStr, aRet = [];

					if (this.extraSafeEntities[1].length === 0) {
						$.each(this.extraSafeEntities[0], function (i, ch) {
							self.extraSafeEntities[1].push(ch.charCodeAt(0));
						});
					}
					aStr = str.split("");
					$.each(aStr, function (i) {
						var iC = aStr[i].charCodeAt(0);
						if ($.inArray(iC, self.extraSafeEntities[1]) && (iC < 65 || iC > 127 || (iC > 90 && iC < 97))) {
							aRet.push('&#' + iC + ';');
						} else {
							aRet.push(aStr[i]);
						}
					});

					return aRet.join('');
				}
			}
		};

		$.fn.wysiwyg = function (method) {
			var args = arguments,
				plugin;

			if ("undefined" !== typeof $.wysiwyg[method]) {
				// set argument object to undefined
				args = Array.prototype.concat.call([args[0]], [this], Array.prototype.slice.call(args, 1));
				return $.wysiwyg[method].apply($.wysiwyg, Array.prototype.slice.call(args, 1));
			} else if ("object" === typeof method || !method) {
				Array.prototype.unshift.call(args, this);
				return $.wysiwyg.init.apply($.wysiwyg, args);
			} else if ($.wysiwyg.plugin.exists(method)) {
				plugin = $.wysiwyg.plugin.parseName(method);
				args = Array.prototype.concat.call([args[0]], [this], Array.prototype.slice.call(args, 1));
				return $.wysiwyg[plugin.name][plugin.method].apply($.wysiwyg[plugin.name], Array.prototype.slice.call(args, 1));
			} else {
				console.error("Method '" + method + "' does not exist on jQuery.wysiwyg.\nTry to include some extra controls or plugins");
			}
		};

		$.fn.getWysiwyg = function () {
			return $.data(this, "wysiwyg");
		};
	})(jQuery);



	/**
	 * Controls: Image plugin
	 *
	 * Depends on jWYSIWYG
	 */
	(function ($) {
		if (undefined === $.wysiwyg) {
			throw "wysiwyg.image.js depends on $.wysiwyg";
		}

		if (!$.wysiwyg.controls) {
			$.wysiwyg.controls = {};
		}

		/*
		 * Wysiwyg namespace: public properties and methods
		 */
		$.wysiwyg.controls.image = {
			init: function (Wysiwyg) {
				var self = this,
					elements, dialog, formImageHtml, dialogReplacements, key, translation, img = {
						alt: "",
						self: Wysiwyg.dom.getElement("img"),
						// link to element node
						src: "http://",
						title: ""
					};

				dialogReplacements = {
					legend: "Insert Image",
					preview: "Preview",
					url: "URL",
					title: "Title",
					description: "Description",
					width: "Width",
					height: "Height",
					original: "Original W x H",
					"float": "Float",
					floatNone: "None",
					floatLeft: "Left",
					floatRight: "Right",
					submit: "Insert Image",
					loading: "loading",
					reset: "Cancel"
				};

				formImageHtml = '<form class="wysiwyg" title="{legend}">' + '<img src="" alt="{preview}" width="100%"><br>' + '{url}: <input type="text" name="src" value=""><br>' + '{title}: <input type="text" name="imgtitle" value=""><br>' + '{description}: <input type="text" name="description" value=""><br>' + '{width} x {height}: <input type="text" name="width" value="" class="width integer"> x <input type="text" name="height" value="" class="height integer"><br>' + '{float}: <select name="float">' + '<option value="">{floatNone}</option>' + '<option value="left">{floatLeft}</option>' + '<option value="right">{floatRight}</option></select></label><hr>' + '<button class="button" id="wysiwyg_submit">{submit}</button> ' + '<button class="button" id="wysiwyg_reset">{reset}</button></form>';

				for (key in dialogReplacements) {
					if ($.wysiwyg.i18n) {
						translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs.image");

						if (translation === dialogReplacements[key]) { // if not translated search in dialogs 
							translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs");
						}

						dialogReplacements[key] = translation;
					}

					formImageHtml = formImageHtml.replace("{" + key + "}", dialogReplacements[key]);
				}

				if (img.self) {
					img.src = img.self.src ? img.self.src : "";
					img.alt = img.self.alt ? img.self.alt : "";
					img.title = img.self.title ? img.self.title : "";
					img.width = img.self.width ? img.self.width : "";
					img.height = img.self.height ? img.self.height : "";
					img.asp = img.width / img.width;
				}

				elements = $(formImageHtml);
				elements = self.makeForm(elements, img);

				dialog = elements.appendTo("body");
				dialog.dialog({
					modal: true,
					resizable: false,
					open: function (ev, ui) {
						$("#wysiwyg_submit", dialog).click(function (e) {
							self.processInsert(dialog.container, Wysiwyg, img);

							$(dialog).dialog("close");
							return false;
						});
						$("#wysiwyg_reset", dialog).click(function (e) {
							$(dialog).dialog("close");
							return false;
						});
						$('fieldset', dialog).click(function (e) {
							e.stopPropagation();
						});
						$("select, input[type=text]", dialog).uniform();
						$('.width', dialog).wl_Number({
							step: 10,
							onChange: function (value) {
								$('.height', dialog).val(Math.ceil(value / (img.asp || 1)));
							}
						});
						$('.height', dialog).wl_Number({
							step: 10,
							onChange: function (value) {
								$('.width', dialog).val(Math.floor(value * (img.asp || 1)));
							}
						});
						$('input[name="src"]', dialog).wl_URL();

					},
					close: function (ev, ui) {
						dialog.dialog("destroy");
						dialog.remove();
					}
				});

				$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
			},

			processInsert: function (context, Wysiwyg, img) {
				var image, url = $('input[name="src"]', context).val(),
					title = $('input[name="imgtitle"]', context).val(),
					description = $('input[name="description"]', context).val(),
					width = $('input[name="width"]', context).val(),
					height = $('input[name="height"]', context).val(),
					styleFloat = $('select[name="float"]', context).val(),
					style = [],
					found, baseUrl;

				if (Wysiwyg.options.controlImage.forceRelativeUrls) {
					baseUrl = window.location.protocol + "//" + window.location.hostname;
					if (0 === url.indexOf(baseUrl)) {
						url = url.substr(baseUrl.length);
					}
				}

				if (img.self) {
					// to preserve all img attributes
					$(img.self).attr("src", url).attr("title", title).attr("alt", description).css("float", styleFloat);

					if (width.toString().match(/^[0-9]+(px|%)?$/)) {
						$(img.self).css("width", width);
					} else {
						$(img.self).css("width", "");
					}

					if (height.toString().match(/^[0-9]+(px|%)?$/)) {
						$(img.self).css("height", height);
					} else {
						$(img.self).css("height", "");
					}

					Wysiwyg.saveContent();
				} else {
					found = width.toString().match(/^[0-9]+(px|%)?$/);
					if (found) {
						if (found[1]) {
							style.push("width: " + width + ";");
						} else {
							style.push("width: " + width + "px;");
						}
					}

					found = height.toString().match(/^[0-9]+(px|%)?$/);
					if (found) {
						if (found[1]) {
							style.push("height: " + height + ";");
						} else {
							style.push("height: " + height + "px;");
						}
					}

					if (styleFloat.length > 0) {
						style.push("float: " + styleFloat + ";");
					}

					if (style.length > 0) {
						style = ' style="' + style.join(" ") + '"';
					}

					image = "<img src='" + url + "' title='" + title + "' alt='" + description + "'" + style + "/>";
					Wysiwyg.insertHtml(image);
				}
			},

			makeForm: function (form, img) {
				form.find("input[name=src]").val(img.src);
				form.find("input[name=imgtitle]").val(img.title);
				form.find("input[name=description]").val(img.alt);
				form.find('input[name="width"]').val(img.width);
				form.find('input[name="height"]').val(img.height);
				form.find('img').attr("src", img.src);
				img.asp = img.width / img.height;

				form.find("input[name=src]").bind("change", function () {
					var image = new Image();
					var text = $('#wysiwyg_submit', form).find('span').text();
					form.find('img').removeAttr("src");

					$('#wysiwyg_submit', form).prop('disabled', true).find('span').text('wait...');

					image.onload = function () {

						form.find('img').attr("src", image.src);
						img.asp = image.width / image.height;
						form.find('input[name="width"]').val(image.width);
						form.find('input[name="height"]').val(image.height);
						$('#wysiwyg_submit', form).find('span').text(text);
						$('#wysiwyg_submit', form).prop('disabled', false);

					};
					image.src = this.value;
				});

				return form;
			}
		};

		$.wysiwyg.insertImage = function (object, url, attributes) {
			return object.each(function () {
				var Wysiwyg = $(this).data("wysiwyg"),
					image, attribute;

				if (!Wysiwyg) {
					return this;
				}

				if (!url || url.length === 0) {
					return this;
				}

				if ($.browser.msie) {
					Wysiwyg.ui.focus();
				}

				if (attributes) {
					Wysiwyg.editorDoc.execCommand("insertImage", false, "#jwysiwyg#");
					image = Wysiwyg.getElementByAttributeValue("img", "src", "#jwysiwyg#");

					if (image) {
						image.src = url;

						for (attribute in attributes) {
							if (attributes.hasOwnProperty(attribute)) {
								image.setAttribute(attribute, attributes[attribute]);
							}
						}
					}
				} else {
					Wysiwyg.editorDoc.execCommand("insertImage", false, url);
				}

				Wysiwyg.saveContent();

				$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");

				return this;
			});
		};
	})(jQuery);


	/**
	 * Controls: Table plugin
	 * 
	 * Depends on jWYSIWYG
	 */
	(function ($) {
		if (undefined === $.wysiwyg) {
			throw "wysiwyg.table.js depends on $.wysiwyg";
		}

		if (!$.wysiwyg.controls) {
			$.wysiwyg.controls = {};
		}

		var insertTable = function (colCount, rowCount, filler) {
				if (isNaN(rowCount) || isNaN(colCount) || rowCount === null || colCount === null) {
					return;
				}

				var i, j, html = ['<table border="1" style="width: 100%;"><tbody>'];

				colCount = parseInt(colCount, 10);
				rowCount = parseInt(rowCount, 10);

				if (filler === null) {
					filler = "&nbsp;";
				}
				filler = "<td>" + filler + "</td>";

				for (i = rowCount; i > 0; i -= 1) {
					html.push("<tr>");
					for (j = colCount; j > 0; j -= 1) {
						html.push(filler);
					}
					html.push("</tr>");
				}
				html.push("</tbody></table>");

				return this.insertHtml(html.join(""));
			};

		/*
		 * Wysiwyg namespace: public properties and methods
		 */
		$.wysiwyg.controls.table = function (Wysiwyg) {
			var dialog, colCount, rowCount, formTableHtml, formTextLegend = "Insert table",
				formTextCols = "Count of columns",
				formTextRows = "Count of rows",
				formTextSubmit = "Insert table",
				formTextReset = "Cancel";

			if ($.wysiwyg.i18n) {
				formTextLegend = $.wysiwyg.i18n.t(formTextLegend, "dialogs.table");
				formTextCols = $.wysiwyg.i18n.t(formTextCols, "dialogs.table");
				formTextRows = $.wysiwyg.i18n.t(formTextRows, "dialogs.table");
				formTextSubmit = $.wysiwyg.i18n.t(formTextSubmit, "dialogs.table");
				formTextReset = $.wysiwyg.i18n.t(formTextReset, "dialogs");
			}

			formTableHtml = '<form class="wysiwyg" title="' + formTextLegend + '">' + formTextCols + ': <input type="text" name="colCount" value="3" class="integer" ><br>' + formTextRows + ': <input type="text" name="rowCount" value="3" class="integer" ><hr>' + '<button class="button" id="wysiwyg_submit">' + formTextSubmit + '</button> ' + '<button class="button" id="wysiwyg_reset">' + formTextReset + '</button></form>';

			if (!Wysiwyg.insertTable) {
				Wysiwyg.insertTable = insertTable;
			}

			dialog = $(formTableHtml).appendTo("body");
			dialog.dialog({
				modal: true,
				resizable: false,
				open: function (event, ui) {
					$("#wysiwyg_submit", dialog).click(function (e) {
						e.preventDefault();
						rowCount = $('input[name="rowCount"]', dialog).val();
						colCount = $('input[name="colCount"]', dialog).val();

						Wysiwyg.insertTable(colCount, rowCount, Wysiwyg.defaults.tableFiller);
						$(dialog).dialog("close");
					});
					$("#wysiwyg_reset", dialog).click(function (e) {
						e.preventDefault();
						$(dialog).dialog("close");
					});

					$("select, input[type=text]", dialog).uniform();
					$('.integer', dialog).wl_Number();

				},
				close: function (event, ui) {
					dialog.dialog("destroy");
					dialog.remove();
				}
			});

			$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
		};

		$.wysiwyg.insertTable = function (object, colCount, rowCount, filler) {
			return object.each(function () {
				var Wysiwyg = $(this).data("wysiwyg");

				if (!Wysiwyg.insertTable) {
					Wysiwyg.insertTable = insertTable;
				}

				if (!Wysiwyg) {
					return this;
				}

				Wysiwyg.insertTable(colCount, rowCount, filler);
				$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");

				return this;
			});
		};
	})(jQuery);

	/**
	 * Controls: Link plugin
	 *
	 * Depends on jWYSIWYG
	 *
	 * By: Esteban Beltran (academo) <sergies@gmail.com>
	 */
	(function ($) {
		if (undefined === $.wysiwyg) {
			throw "wysiwyg.link.js depends on $.wysiwyg";
		}

		if (!$.wysiwyg.controls) {
			$.wysiwyg.controls = {};
		}

		/*
		 * Wysiwyg namespace: public properties and methods
		 */
		$.wysiwyg.controls.link = {
			init: function (Wysiwyg) {
				var self = this,
					elements, dialog, url, a, selection, formLinkHtml, formTextLegend, formTextUrl, formTextTitle, formTextTarget, formTextSubmit, formTextReset, baseUrl;

				formTextLegend = "Insert Link";
				formTextUrl = "Link URL";
				formTextTitle = "Link Title";
				formTextTarget = "Link Target";
				formTextSubmit = "Insert Link";
				formTextReset = "Cancel";

				if ($.wysiwyg.i18n) {
					formTextLegend = $.wysiwyg.i18n.t(formTextLegend, "dialogs.link");
					formTextUrl = $.wysiwyg.i18n.t(formTextUrl, "dialogs.link");
					formTextTitle = $.wysiwyg.i18n.t(formTextTitle, "dialogs.link");
					formTextTarget = $.wysiwyg.i18n.t(formTextTarget, "dialogs.link");
					formTextSubmit = $.wysiwyg.i18n.t(formTextSubmit, "dialogs.link");
					formTextReset = $.wysiwyg.i18n.t(formTextReset, "dialogs");
				}

				formLinkHtml = '<form class="wysiwyg" title="' + formTextLegend + '">' + formTextUrl + ': <input type="text" name="linkhref" value="">' + formTextTitle + ': <input type="text" name="linktitle" value="">' + formTextTarget + ': <input type="text" name="linktarget" value=""><hr>' + '<button class="button" id="wysiwyg_submit">' + formTextSubmit + '</button> ' + '<button class="button" id="wysiwyg_reset">' + formTextReset + '</button></form>';

				a = {
					self: Wysiwyg.dom.getElement("a"),
					// link to element node
					href: "http://",
					title: "",
					target: ""
				};

				if (a.self) {
					a.href = a.self.href ? a.self.href : a.href;
					a.title = a.self.title ? a.self.title : "";
					a.target = a.self.target ? a.self.target : "";
				}

				elements = $(formLinkHtml);
				elements.find("input[name=linkhref]").val(a.href);
				elements.find("input[name=linktitle]").val(a.title);
				elements.find("input[name=linktarget]").val(a.target);

				if ($.browser.msie) {
					dialog = elements.appendTo(Wysiwyg.editorDoc.body);
				} else {
					dialog = elements.appendTo("body");
				}

				dialog.dialog({
					modal: true,
					resizable: false,
					open: function (ev, ui) {
						$("#wysiwyg_submit", dialog).click(function (e) {
							e.preventDefault();

							var url = $('input[name="linkhref"]', dialog).val(),
								title = $('input[name="linktitle"]', dialog).val(),
								target = $('input[name="linktarget"]', dialog).val(),
								baseUrl;

							if (Wysiwyg.options.controlLink.forceRelativeUrls) {
								baseUrl = window.location.protocol + "//" + window.location.hostname;
								if (0 === url.indexOf(baseUrl)) {
									url = url.substr(baseUrl.length);
								}
							}

							if (a.self) {
								if ("string" === typeof (url)) {
									if (url.length > 0) {
										// to preserve all link attributes
										$(a.self).attr("href", url).attr("title", title).attr("target", target);
									} else {
										$(a.self).replaceWith(a.self.innerHTML);
									}
								}
							} else {
								if ($.browser.msie) {
									Wysiwyg.ui.returnRange();
								}

								//Do new link element
								selection = Wysiwyg.getRangeText();
								img = Wysiwyg.dom.getElement("img");

								if ((selection && selection.length > 0) || img) {
									if ($.browser.msie) {
										Wysiwyg.ui.focus();
									}

									if ("string" === typeof (url)) {
										if (url.length > 0) {
											Wysiwyg.editorDoc.execCommand("createLink", false, url);
										} else {
											Wysiwyg.editorDoc.execCommand("unlink", false, null);
										}
									}

									a.self = Wysiwyg.dom.getElement("a");

									$(a.self).attr("href", url).attr("title", title);

									/**
									 * @url https://github.com/akzhan/jwysiwyg/issues/16
									 */
									$(a.self).attr("target", target);
								} else if (Wysiwyg.options.messages.nonSelection) {
									$.dialog(Wysiwyg.options.messages.nonSelection);
								}
							}

							Wysiwyg.saveContent();

							$(dialog).dialog("close");
						});
						$("#wysiwyg_reset", dialog).click(function (e) {
							e.preventDefault();
							$(dialog).dialog("close");
						});

						$("select, input", dialog).uniform();
						$('input[name="linkhref"]', dialog).wl_URL();

					},
					close: function (ev, ui) {
						dialog.dialog("destroy");
						dialog.remove();
					}
				});

				$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
			}
		};

		$.wysiwyg.createLink = function (object, url) {
			return object.each(function () {
				var oWysiwyg = $(this).data("wysiwyg"),
					selection;

				if (!oWysiwyg) {
					return this;
				}

				if (!url || url.length === 0) {
					return this;
				}

				selection = oWysiwyg.getRangeText();

				if (selection && selection.length > 0) {
					if ($.browser.msie) {
						oWysiwyg.ui.focus();
					}
					oWysiwyg.editorDoc.execCommand("unlink", false, null);
					oWysiwyg.editorDoc.execCommand("createLink", false, url);
				} else if (oWysiwyg.options.messages.nonSelection) {
					window.alert(oWysiwyg.options.messages.nonSelection);
				}
			});
		};
	})(jQuery);

	/**
	 * Controls: Element CSS Wrapper plugin
	 *
	 * Depends on jWYSIWYG
	 * 
	 * By Yotam Bar-On (https://github.com/tudmotu)
	 */
	(function ($) {
		if (undefined === $.wysiwyg) {
			throw "wysiwyg.cssWrap.js depends on $.wysiwyg";
		}
/* For core enhancements #143
	$.wysiwyg.ui.addControl("cssWrap", {
		visible : false,
		groupIndex: 6,
		tooltip: "CSS Wrapper",
		exec: function () { 
				$.wysiwyg.controls.cssWrap.init(this);
			}
	}
	*/
		if (!$.wysiwyg.controls) {
			$.wysiwyg.controls = {};
		}

		/*
		 * Wysiwyg namespace: public properties and methods
		 */
		$.wysiwyg.controls.cssWrap = {
			init: function (Wysiwyg) {
				var self = this,
					formWrapHtml, key, translation, dialogReplacements = {
						legend: "Wrap Element",
						wrapperType: "Wrapper Type",
						ID: "ID",
						"class": "Class",
						wrap: "Wrap",
						unwrap: "Unwrap",
						cancel: "Cancel"
					};

				formWrapHtml = '<form class="wysiwyg" title="{legend}"><fieldset>' + '{wrapperType}: <select name="type"><option value="span">Span</option><option value="div">Div</option></select><br>' + '{ID}: <input name="id" type="text"><br>' + '{class}: <input name="class" type="text" ><hr>' + '<button class="cssWrap-unwrap" style="display:none;">{unwrap}</button> ' + '<button class="cssWrap-submit">{wrap}</button> ' + '<button class="cssWrap-cancel">{cancel}</button></fieldset></form>';

				for (key in dialogReplacements) {
					if ($.wysiwyg.i18n) {
						translation = $.wysiwyg.i18n.t(dialogReplacements[key]);
						if (translation === dialogReplacements[key]) { // if not translated search in dialogs 
							translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs");
						}
						dialogReplacements[key] = translation;
					}
					formWrapHtml = formWrapHtml.replace("{" + key + "}", dialogReplacements[key]);
				}
				if (!$(".wysiwyg-dialog-wrapper").length) {
					$(formWrapHtml).appendTo("body");
					$("form.wysiwyg").dialog({
						modal: true,
						resizable: false,
						open: function (ev, ui) {
							$this = $(this);
							var range = Wysiwyg.getInternalRange(),
								common;
							// We make sure that there is some selection:
							if (range) {
								if ($.browser.msie) {
									Wysiwyg.ui.focus();
								}
								common = $(range.commonAncestorContainer);
							} else {
								alert("You must select some elements before you can wrap them.");
								$this.dialog("close");
								return 0;
							}
							var $nodeName = range.commonAncestorContainer.nodeName.toLowerCase();
							// If the selection is already a .wysiwygCssWrapper, then we want to change it and not double-wrap it.
							if (common.parent(".wysiwygCssWrapper").length) {
								alert(common.parent(".wysiwygCssWrapper").get(0).nodeName.toLowerCase());
								$this.find("select[name=type]").val(common.parent(".wysiwygCssWrapper").get(0).nodeName.toLowerCase());
								$this.find("select[name=type]").attr("disabled", "disabled");
								$this.find("input[name=id]").val(common.parent(".wysiwygCssWrapper").attr("id"));
								$this.find("input[name=class]").val(common.parent(".wysiwygCssWrapper").attr("class").replace('wysiwygCssWrapper ', ''));
								// Add the "unwrap" button:
								$("form.wysiwyg").find(".cssWrap-unwrap").show();
								$("form.wysiwyg").find(".cssWrap-unwrap").click(function (e) {
									e.preventDefault();
									if ($nodeName !== "body") {
										common.unwrap();
									}
									$this.dialog("close");
									return 1;
								});
							}
							// Submit button.
							$("form.wysiwyg").find(".cssWrap-submit").click(function (e) {
								e.preventDefault();
								var $wrapper = $("form.wysiwyg").find("select[name=type]").val();
								var $id = $("form.wysiwyg").find("input[name=id]").val();
								var $class = $("form.wysiwyg").find("input[name=class]").val();
								if ($nodeName !== "body") {
									// If the selection is already a .wysiwygCssWrapper, then we want to change it and not double-wrap it.
									if (common.parent(".wysiwygCssWrapper").length) {
										common.parent(".wysiwygCssWrapper").attr("id", $class);
										common.parent(".wysiwygCssWrapper").attr("class", $class);
									} else {
										common.wrap('<' + $wrapper + ' id="' + $id + '" class="' + "wysiwygCssWrapper " + $class + '"/>');
									}
								} else {
									// Currently no implemntation for if $nodeName == 'body'.
								}
								$this.dialog("close");
							});
							// Cancel button.
							$("form.wysiwyg").find(".cssWrap-cancel").click(function (e) {
								e.preventDefault();
								$this.dialog("close");
								return 1;
							});
							$("form.wysiwyg").find("select, input[type=text]").uniform();
						},
						close: function () {
							$(this).dialog("destroy");
							$(this).remove();
						}
					});
					Wysiwyg.saveContent();
				}
				$(Wysiwyg.editorDoc).trigger("editorRefresh.wysiwyg");
				return 1;
			}
		}
	})(jQuery);

	/**
	 * Controls: Colorpicker plugin
	 * 
	 * Depends on jWYSIWYG, wl_Color Plugin
	 */
	(function ($) {
		"use strict";

		if (undefined === $.wysiwyg) {
			throw "wysiwyg.colorpicker.js depends on $.wysiwyg";
		}

		if (!$.wysiwyg.controls) {
			$.wysiwyg.controls = {};
		}

		/*
		 * Wysiwyg namespace: public properties and methods
		 */
		$.wysiwyg.controls.colorpicker = {
			modalOpen: false,

			init: function (Wysiwyg) {
				if ($.wysiwyg.controls.colorpicker.modalOpen === true) {
					return false;
				} else {
					$.wysiwyg.controls.colorpicker.modalOpen = true;
				}
				var self = this,
					elements, dialog, colorpickerHtml, dialogReplacements, key, translation;

				dialogReplacements = {
					legend: "Colorpicker",
					color: "Color",
					submit: "Apply",
					cancel: "Cancel"
				};

				colorpickerHtml = '<form class="wysiwyg" title="{legend}">' + '{color}: <input type="text" class="color" id="wysiwyg_colorpicker" name="wysiwyg_colorpicker" value=""><hr>' + '<button id="wysiwyg_colorpicker-submit">{submit}</button> ' + '<button id="wysiwyg_colorpicker-cancel">{cancel}</button></form>';

				for (key in dialogReplacements) {
					if ($.wysiwyg.i18n) {
						translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs.colorpicker");

						if (translation === dialogReplacements[key]) { // if not translated search in dialogs 
							translation = $.wysiwyg.i18n.t(dialogReplacements[key], "dialogs");
						}

						dialogReplacements[key] = translation;
					}

					colorpickerHtml = colorpickerHtml.replace("{" + key + "}", dialogReplacements[key]);
				}

				elements = $(colorpickerHtml);

				dialog = elements.appendTo("body");
				dialog.dialog({
					modal: true,
					resizable: false,
					open: function (event, ui) {
						if ($.browser.msie) {
							Wysiwyg.ui.returnRange();
						}
						var selection = Wysiwyg.getRangeText(),
							content = Wysiwyg.getContent(),
							color = '',
							regexp = /#([a-fA-F0-9]{3,6})/;
						if (content.match(regexp)) {
							regexp.exec(content);
							color = RegExp.$1;
						} else {
							regexp = /rgb\((\d+), (\d+), (\d+)\)/;
							if (content.match(regexp)) {
								regexp.exec(content);
								var r = RegExp.$1,
									g = RegExp.$2,
									b = RegExp.$3;
								color = parseInt(r).toString(16) + parseInt(g).toString(16) + parseInt(b).toString(16);
							}
						}
						$('#wysiwyg_colorpicker').val('#' + color).wl_Color();
						$("#wysiwyg_colorpicker-submit").click(function (e) {
							e.preventDefault();
							var color = $('#wysiwyg_colorpicker').val();

							if ($.browser.msie) {
								Wysiwyg.ui.returnRange();
								Wysiwyg.ui.focus();
							}

							if (color) Wysiwyg.editorDoc.execCommand('ForeColor', false, color);
							Wysiwyg.saveContent();
							$(dialog).dialog("close");
							return false;
						});
						$("#wysiwyg_colorpicker-cancel").click(function (e) {
							e.preventDefault();
							if ($.browser.msie) {
								Wysiwyg.ui.returnRange();
							}

							$(dialog).dialog("close");
							return false;
						});
					},

					close: function (event, ui) {
						$.wysiwyg.controls.colorpicker.modalOpen = false;
						dialog.dialog("destroy");
						dialog.remove();
					}
				});
			}
		};
	})(jQuery);
});
	
	$(document).ready(function () {
	/**
	 * @preserve
	 * FullCalendar v1.5.1
	 * http://arshaw.com/fullcalendar/
	 *
	 * Use fullcalendar.css for basic styling.
	 * For event drag & drop, requires jQuery UI draggable.
	 * For event resizing, requires jQuery UI resizable.
	 *
	 * Copyright (c) 2011 Adam Shaw
	 * Dual licensed under the MIT and GPL licenses, located in
	 * MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
	 *
	 * Date: Sat Apr 9 14:09:51 2011 -0700
	 *
	 */
	 
	(function($, undefined) {
	
	
	var defaults = {
	
		// display
		defaultView: 'month',
		aspectRatio: 1.35,
		header: {
			left: 'title',
			center: '',
			right: 'today prev,next'
		},
		weekends: true,
		
		// editing
		//editable: false,
		//disableDragging: false,
		//disableResizing: false,
		
		allDayDefault: true,
		ignoreTimezone: true,
		
		// event ajax
		lazyFetching: true,
		startParam: 'start',
		endParam: 'end',
		
		// time formats
		titleFormat: {
			month: 'MMMM yyyy',
			week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",
			day: 'dddd, MMM d, yyyy'
		},
		columnFormat: {
			month: 'ddd',
			week: 'ddd M/d',
			day: 'dddd M/d'
		},
		timeFormat: { // for event elements
			'': 'h(:mm)t' // default
		},
		
		// locale
		isRTL: false,
		firstDay: 0,
		monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
		dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
		buttonText: {
			prev: '&nbsp;&#9668;&nbsp;',
			next: '&nbsp;&#9658;&nbsp;',
			prevYear: '&nbsp;&lt;&lt;&nbsp;',
			nextYear: '&nbsp;&gt;&gt;&nbsp;',
			today: 'today',
			month: 'month',
			week: 'week',
			day: 'day'
		},
		
		// jquery-ui theming
		theme: false,
		buttonIcons: {
			prev: 'circle-triangle-w',
			next: 'circle-triangle-e'
		},
		
		//selectable: false,
		unselectAuto: true,
		
		dropAccept: '*'
		
	};
	
	// right-to-left defaults
	var rtlDefaults = {
		header: {
			left: 'next,prev today',
			center: '',
			right: 'title'
		},
		buttonText: {
			prev: '&nbsp;&#9658;&nbsp;',
			next: '&nbsp;&#9668;&nbsp;',
			prevYear: '&nbsp;&gt;&gt;&nbsp;',
			nextYear: '&nbsp;&lt;&lt;&nbsp;'
		},
		buttonIcons: {
			prev: 'circle-triangle-e',
			next: 'circle-triangle-w'
		}
	};
	
	
	
	var fc = $.fullCalendar = { version: "1.5.1" };
	var fcViews = fc.views = {};
	
	
	$.fn.fullCalendar = function(options) {
	
	
		// method calling
		if (typeof options == 'string') {
			var args = Array.prototype.slice.call(arguments, 1);
			var res;
			this.each(function() {
				var calendar = $.data(this, 'fullCalendar');
				if (calendar && $.isFunction(calendar[options])) {
					var r = calendar[options].apply(calendar, args);
					if (res === undefined) {
						res = r;
					}
					if (options == 'destroy') {
						$.removeData(this, 'fullCalendar');
					}
				}
			});
			if (res !== undefined) {
				return res;
			}
			return this;
		}
		
		
		// would like to have this logic in EventManager, but needs to happen before options are recursively extended
		var eventSources = options.eventSources || [];
		delete options.eventSources;
		if (options.events) {
			eventSources.push(options.events);
			delete options.events;
		}
		
	
		options = $.extend(true, {},
			defaults,
			(options.isRTL || options.isRTL===undefined && defaults.isRTL) ? rtlDefaults : {},
			options
		);
		
		
		this.each(function(i, _element) {
			var element = $(_element);
			var calendar = new Calendar(element, options, eventSources);
			element.data('fullCalendar', calendar); // TODO: look into memory leak implications
			calendar.render();
		});
		
		
		return this;
		
	};
	
	
	// function for adding/overriding defaults
	function setDefaults(d) {
		$.extend(true, defaults, d);
	}
	
	
	
	 
	function Calendar(element, options, eventSources) {
		var t = this;
		
		
		// exports
		t.options = options;
		t.render = render;
		t.destroy = destroy;
		t.refetchEvents = refetchEvents;
		t.reportEvents = reportEvents;
		t.reportEventChange = reportEventChange;
		t.rerenderEvents = rerenderEvents;
		t.changeView = changeView;
		t.select = select;
		t.unselect = unselect;
		t.prev = prev;
		t.next = next;
		t.prevYear = prevYear;
		t.nextYear = nextYear;
		t.today = today;
		t.gotoDate = gotoDate;
		t.incrementDate = incrementDate;
		t.formatDate = function(format, date) { return formatDate(format, date, options) };
		t.formatDates = function(format, date1, date2) { return formatDates(format, date1, date2, options) };
		t.getDate = getDate;
		t.getView = getView;
		t.option = option;
		t.trigger = trigger;
		
		
		// imports
		EventManager.call(t, options, eventSources);
		var isFetchNeeded = t.isFetchNeeded;
		var fetchEvents = t.fetchEvents;
		
		
		// locals
		var _element = element[0];
		var header;
		var headerElement;
		var content;
		var tm; // for making theme classes
		var currentView;
		var viewInstances = {};
		var elementOuterWidth;
		var suggestedViewHeight;
		var absoluteViewElement;
		var resizeUID = 0;
		var ignoreWindowResize = 0;
		var date = new Date();
		var events = [];
		var _dragElement;
		
		
		
		/* Main Rendering
		-----------------------------------------------------------------------------*/
		
		
		setYMD(date, options.year, options.month, options.date);
		
		
		function render(inc) {
			if (!content) {
				initialRender();
			}else{
				calcSize();
				markSizesDirty();
				markEventsDirty();
				renderView(inc);
			}
		}
		
		
		function initialRender() {
			tm = options.theme ? 'ui' : 'fc';
			element.addClass('fc');
			if (options.isRTL) {
				element.addClass('fc-rtl');
			}
			if (options.theme) {
				element.addClass('ui-widget');
			}
			content = $("<div class='fc-content' style='position:relative'/>")
				.prependTo(element);
			header = new Header(t, options);
			headerElement = header.render();
			if (headerElement) {
				element.prepend(headerElement);
			}
			changeView(options.defaultView);
			$(window).resize(windowResize);
			// needed for IE in a 0x0 iframe, b/c when it is resized, never triggers a windowResize
			if (!bodyVisible()) {
				lateRender();
			}
		}
		
		
		// called when we know the calendar couldn't be rendered when it was initialized,
		// but we think it's ready now
		function lateRender() {
			setTimeout(function() { // IE7 needs this so dimensions are calculated correctly
				if (!currentView.start && bodyVisible()) { // !currentView.start makes sure this never happens more than once
					renderView();
				}
			},0);
		}
		
		
		function destroy() {
			$(window).unbind('resize', windowResize);
			header.destroy();
			content.remove();
			element.removeClass('fc fc-rtl ui-widget');
		}
		
		
		
		function elementVisible() {
			return _element.offsetWidth !== 0;
		}
		
		
		function bodyVisible() {
			return $('body')[0].offsetWidth !== 0;
		}
		
		
		
		/* View Rendering
		-----------------------------------------------------------------------------*/
		
		// TODO: improve view switching (still weird transition in IE, and FF has whiteout problem)
		
		function changeView(newViewName) {
			if (!currentView || newViewName != currentView.name) {
				ignoreWindowResize++; // because setMinHeight might change the height before render (and subsequently setSize) is reached
	
				unselect();
				
				var oldView = currentView;
				var newViewElement;
					
				if (oldView) {
					(oldView.beforeHide || noop)(); // called before changing min-height. if called after, scroll state is reset (in Opera)
					setMinHeight(content, content.height());
					oldView.element.hide();
				}else{
					setMinHeight(content, 1); // needs to be 1 (not 0) for IE7, or else view dimensions miscalculated
				}
				content.css('overflow', 'hidden');
				
				currentView = viewInstances[newViewName];
				if (currentView) {
					currentView.element.show();
				}else{
					currentView = viewInstances[newViewName] = new fcViews[newViewName](
						newViewElement = absoluteViewElement =
							$("<div class='fc-view fc-view-" + newViewName + "' style='position:absolute'/>")
								.appendTo(content),
						t // the calendar object
					);
				}
				
				if (oldView) {
					header.deactivateButton(oldView.name);
				}
				header.activateButton(newViewName);
				
				renderView(); // after height has been set, will make absoluteViewElement's position=relative, then set to null
				
				content.css('overflow', '');
				if (oldView) {
					setMinHeight(content, 1);
				}
				
				if (!newViewElement) {
					(currentView.afterShow || noop)(); // called after setting min-height/overflow, so in final scroll state (for Opera)
				}
				
				ignoreWindowResize--;
			}
		}
		
		
		
		function renderView(inc) {
			if (elementVisible()) {
				ignoreWindowResize++; // because renderEvents might temporarily change the height before setSize is reached
	
				unselect();
				
				if (suggestedViewHeight === undefined) {
					calcSize();
				}
				
				var forceEventRender = false;
				if (!currentView.start || inc || date < currentView.start || date >= currentView.end) {
					// view must render an entire new date range (and refetch/render events)
					currentView.render(date, inc || 0); // responsible for clearing events
					setSize(true);
					forceEventRender = true;
				}
				else if (currentView.sizeDirty) {
					// view must resize (and rerender events)
					currentView.clearEvents();
					setSize();
					forceEventRender = true;
				}
				else if (currentView.eventsDirty) {
					currentView.clearEvents();
					forceEventRender = true;
				}
				currentView.sizeDirty = false;
				currentView.eventsDirty = false;
				updateEvents(forceEventRender);
				
				elementOuterWidth = element.outerWidth();
				
				header.updateTitle(currentView.title);
				var today = new Date();
				if (today >= currentView.start && today < currentView.end) {
					header.disableButton('today');
				}else{
					header.enableButton('today');
				}
				
				ignoreWindowResize--;
				currentView.trigger('viewDisplay', _element);
			}
		}
		
		
		
		/* Resizing
		-----------------------------------------------------------------------------*/
		
		
		function updateSize() {
			markSizesDirty();
			if (elementVisible()) {
				calcSize();
				setSize();
				unselect();
				currentView.clearEvents();
				currentView.renderEvents(events);
				currentView.sizeDirty = false;
			}
		}
		
		
		function markSizesDirty() {
			$.each(viewInstances, function(i, inst) {
				inst.sizeDirty = true;
			});
		}
		
		
		function calcSize() {
			if (options.contentHeight) {
				suggestedViewHeight = options.contentHeight;
			}
			else if (options.height) {
				suggestedViewHeight = options.height - (headerElement ? headerElement.height() : 0) - vsides(content);
			}
			else {
				suggestedViewHeight = Math.round(content.width() / Math.max(options.aspectRatio, .5));
			}
		}
		
		
		function setSize(dateChanged) { // todo: dateChanged?
			ignoreWindowResize++;
			currentView.setHeight(suggestedViewHeight, dateChanged);
			if (absoluteViewElement) {
				absoluteViewElement.css('position', 'relative');
				absoluteViewElement = null;
			}
			currentView.setWidth(content.width(), dateChanged);
			ignoreWindowResize--;
		}
		
		
		function windowResize() {
			if (!ignoreWindowResize) {
				if (currentView.start) { // view has already been rendered
					var uid = ++resizeUID;
					setTimeout(function() { // add a delay
						if (uid == resizeUID && !ignoreWindowResize && elementVisible()) {
							if (elementOuterWidth != (elementOuterWidth = element.outerWidth())) {
								ignoreWindowResize++; // in case the windowResize callback changes the height
								updateSize();
								currentView.trigger('windowResize', _element);
								ignoreWindowResize--;
							}
						}
					}, 200);
				}else{
					// calendar must have been initialized in a 0x0 iframe that has just been resized
					lateRender();
				}
			}
		}
		
		
		
		/* Event Fetching/Rendering
		-----------------------------------------------------------------------------*/
		
		
		// fetches events if necessary, rerenders events if necessary (or if forced)
		function updateEvents(forceRender) {
			if (!options.lazyFetching || isFetchNeeded(currentView.visStart, currentView.visEnd)) {
				refetchEvents();
			}
			else if (forceRender) {
				rerenderEvents();
			}
		}
		
		
		function refetchEvents() {
			fetchEvents(currentView.visStart, currentView.visEnd); // will call reportEvents
		}
		
		
		// called when event data arrives
		function reportEvents(_events) {
			events = _events;
			rerenderEvents();
		}
		
		
		// called when a single event's data has been changed
		function reportEventChange(eventID) {
			rerenderEvents(eventID);
		}
		
		
		// attempts to rerenderEvents
		function rerenderEvents(modifiedEventID) {
			markEventsDirty();
			if (elementVisible()) {
				currentView.clearEvents();
				currentView.renderEvents(events, modifiedEventID);
				currentView.eventsDirty = false;
			}
		}
		
		
		function markEventsDirty() {
			$.each(viewInstances, function(i, inst) {
				inst.eventsDirty = true;
			});
		}
		
	
	
		/* Selection
		-----------------------------------------------------------------------------*/
		
	
		function select(start, end, allDay) {
			currentView.select(start, end, allDay===undefined ? true : allDay);
		}
		
	
		function unselect() { // safe to be called before renderView
			if (currentView) {
				currentView.unselect();
			}
		}
		
		
		
		/* Date
		-----------------------------------------------------------------------------*/
		
		
		function prev() {
			renderView(-1);
		}
		
		
		function next() {
			renderView(1);
		}
		
		
		function prevYear() {
			addYears(date, -1);
			renderView();
		}
		
		
		function nextYear() {
			addYears(date, 1);
			renderView();
		}
		
		
		function today() {
			date = new Date();
			renderView();
		}
		
		
		function gotoDate(year, month, dateOfMonth) {
			if (year instanceof Date) {
				date = cloneDate(year); // provided 1 argument, a Date
			}else{
				setYMD(date, year, month, dateOfMonth);
			}
			renderView();
		}
		
		
		function incrementDate(years, months, days) {
			if (years !== undefined) {
				addYears(date, years);
			}
			if (months !== undefined) {
				addMonths(date, months);
			}
			if (days !== undefined) {
				addDays(date, days);
			}
			renderView();
		}
		
		
		function getDate() {
			return cloneDate(date);
		}
		
		
		
		/* Misc
		-----------------------------------------------------------------------------*/
		
		
		function getView() {
			return currentView;
		}
		
		
		function option(name, value) {
			if (value === undefined) {
				return options[name];
			}
			if (name == 'height' || name == 'contentHeight' || name == 'aspectRatio') {
				options[name] = value;
				updateSize();
			}
		}
		
		
		function trigger(name, thisObj) {
			if (options[name]) {
				return options[name].apply(
					thisObj || _element,
					Array.prototype.slice.call(arguments, 2)
				);
			}
		}
		
		
		
		/* External Dragging
		------------------------------------------------------------------------*/
		
		if (options.droppable) {
			$(document)
				.bind('dragstart', function(ev, ui) {
					var _e = ev.target;
					var e = $(_e);
					if (!e.parents('.fc').length) { // not already inside a calendar
						var accept = options.dropAccept;
						if ($.isFunction(accept) ? accept.call(_e, e) : e.is(accept)) {
							_dragElement = _e;
							currentView.dragStart(_dragElement, ev, ui);
						}
					}
				})
				.bind('dragstop', function(ev, ui) {
					if (_dragElement) {
						currentView.dragStop(_dragElement, ev, ui);
						_dragElement = null;
					}
				});
		}
		
	
	}
	
	function Header(calendar, options) {
		var t = this;
		
		
		// exports
		t.render = render;
		t.destroy = destroy;
		t.updateTitle = updateTitle;
		t.activateButton = activateButton;
		t.deactivateButton = deactivateButton;
		t.disableButton = disableButton;
		t.enableButton = enableButton;
		
		
		// locals
		var element = $([]);
		var tm;
		
	
	
		function render() {
			tm = options.theme ? 'ui' : 'fc';
			var sections = options.header;
			if (sections) {
				element = $("<table class='fc-header' style='width:100%'/>")
					.append(
						$("<tr/>")
							.append(renderSection('left'))
							.append(renderSection('center'))
							.append(renderSection('right'))
					);
				return element;
			}
		}
		
		
		function destroy() {
			element.remove();
		}
		
		
		function renderSection(position) {
			var e = $("<td class='fc-header-" + position + "'/>");
			var buttonStr = options.header[position];
			if (buttonStr) {
				$.each(buttonStr.split(' '), function(i) {
					if (i > 0) {
						e.append("<span class='fc-header-space'/>");
					}
					var prevButton;
					$.each(this.split(','), function(j, buttonName) {
						if (buttonName == 'title') {
							e.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>");
							if (prevButton) {
								prevButton.addClass(tm + '-corner-right');
							}
							prevButton = null;
						}else{
							var buttonClick;
							if (calendar[buttonName]) {
								buttonClick = calendar[buttonName]; // calendar method
							}
							else if (fcViews[buttonName]) {
								buttonClick = function() {
									button.removeClass(tm + '-state-hover'); // forget why
									calendar.changeView(buttonName);
								};
							}
							if (buttonClick) {
								var icon = options.theme ? smartProperty(options.buttonIcons, buttonName) : null; // why are we using smartProperty here?
								var text = smartProperty(options.buttonText, buttonName); // why are we using smartProperty here?
								var button = $(
									"<span class='fc-button fc-button-" + buttonName + " " + tm + "-state-default'>" +
										"<span class='fc-button-inner'>" +
											"<span class='fc-button-content'>" +
												(icon ?
													"<span class='fc-icon-wrap'>" +
														"<span class='ui-icon ui-icon-" + icon + "'/>" +
													"</span>" :
													text
													) +
											"</span>" +
											"<span class='fc-button-effect'><span></span></span>" +
										"</span>" +
									"</span>"
								);
								if (button) {
									button
										.click(function() {
											if (!button.hasClass(tm + '-state-disabled')) {
												buttonClick();
											}
										})
										.mousedown(function() {
											button
												.not('.' + tm + '-state-active')
												.not('.' + tm + '-state-disabled')
												.addClass(tm + '-state-down');
										})
										.mouseup(function() {
											button.removeClass(tm + '-state-down');
										})
										.hover(
											function() {
												button
													.not('.' + tm + '-state-active')
													.not('.' + tm + '-state-disabled')
													.addClass(tm + '-state-hover');
											},
											function() {
												button
													.removeClass(tm + '-state-hover')
													.removeClass(tm + '-state-down');
											}
										)
										.appendTo(e);
									if (!prevButton) {
										button.addClass(tm + '-corner-left');
									}
									prevButton = button;
								}
							}
						}
					});
					if (prevButton) {
						prevButton.addClass(tm + '-corner-right');
					}
				});
			}
			return e;
		}
		
		
		function updateTitle(html) {
			element.find('h2')
				.html(html);
		}
		
		
		function activateButton(buttonName) {
			element.find('span.fc-button-' + buttonName)
				.addClass(tm + '-state-active');

		}
		
		
		function deactivateButton(buttonName) {
			element.find('span.fc-button-' + buttonName)
				.removeClass(tm + '-state-active');
		}
		
		
		function disableButton(buttonName) {
			element.find('span.fc-button-' + buttonName)
				.addClass(tm + '-state-disabled');
		}
		
		
		function enableButton(buttonName) {
			element.find('span.fc-button-' + buttonName)
				.removeClass(tm + '-state-disabled');
		}
	
	
	}
	
	fc.sourceNormalizers = [];
	fc.sourceFetchers = [];
	
	var ajaxDefaults = {
		dataType: 'json',
		cache: false
	};
	
	var eventGUID = 1;
	
	
	function EventManager(options, _sources) {
		var t = this;
		
		
		// exports
		t.isFetchNeeded = isFetchNeeded;
		t.fetchEvents = fetchEvents;
		t.addEventSource = addEventSource;
		t.removeEventSource = removeEventSource;
		t.updateEvent = updateEvent;
		t.renderEvent = renderEvent;
		t.removeEvents = removeEvents;
		t.clientEvents = clientEvents;
		t.normalizeEvent = normalizeEvent;
		
		
		// imports
		var trigger = t.trigger;
		var getView = t.getView;
		var reportEvents = t.reportEvents;
		
		
		// locals
		var stickySource = { events: [] };
		var sources = [ stickySource ];
		var rangeStart, rangeEnd;
		var currentFetchID = 0;
		var pendingSourceCnt = 0;
		var loadingLevel = 0;
		var cache = [];
		
		
		for (var i=0; i<_sources.length; i++) {
			_addEventSource(_sources[i]);
		}
		
		
		
		/* Fetching
		-----------------------------------------------------------------------------*/
		
		
		function isFetchNeeded(start, end) {
			return !rangeStart || start < rangeStart || end > rangeEnd;
		}
		
		
		function fetchEvents(start, end) {
			rangeStart = start;
			rangeEnd = end;
			cache = [];
			var fetchID = ++currentFetchID;
			var len = sources.length;
			pendingSourceCnt = len;
			for (var i=0; i<len; i++) {
				fetchEventSource(sources[i], fetchID);
			}
		}
		
		
		function fetchEventSource(source, fetchID) {
			_fetchEventSource(source, function(events) {
				if (fetchID == currentFetchID) {
					if (events) {
						for (var i=0; i<events.length; i++) {
							events[i].source = source;
							normalizeEvent(events[i]);
						}
						cache = cache.concat(events);
					}
					pendingSourceCnt--;
					if (!pendingSourceCnt) {
						reportEvents(cache);
					}
				}
			});
		}
		
		
		function _fetchEventSource(source, callback) {
			var i;
			var fetchers = fc.sourceFetchers;
			var res;
			for (i=0; i<fetchers.length; i++) {
				res = fetchers[i](source, rangeStart, rangeEnd, callback);
				if (res === true) {
					// the fetcher is in charge. made its own async request
					return;
				}
				else if (typeof res == 'object') {
					// the fetcher returned a new source. process it
					_fetchEventSource(res, callback);
					return;
				}
			}
			var events = source.events;
			if (events) {
				if ($.isFunction(events)) {
					pushLoading();
					events(cloneDate(rangeStart), cloneDate(rangeEnd), function(events) {
						callback(events);
						popLoading();
					});
				}
				else if ($.isArray(events)) {
					callback(events);
				}
				else {
					callback();
				}
			}else{
				var url = source.url;
				if (url) {
					var success = source.success;
					var error = source.error;
					var complete = source.complete;
					var data = $.extend({}, source.data || {});
					var startParam = firstDefined(source.startParam, options.startParam);
					var endParam = firstDefined(source.endParam, options.endParam);
					if (startParam) {
						data[startParam] = Math.round(+rangeStart / 1000);
					}
					if (endParam) {
						data[endParam] = Math.round(+rangeEnd / 1000);
					}
					pushLoading();
					$.ajax($.extend({}, ajaxDefaults, source, {
						data: data,
						success: function(events) {
							events = events || [];
							var res = applyAll(success, this, arguments);
							if ($.isArray(res)) {
								events = res;
							}
							callback(events);
						},
						error: function() {
							applyAll(error, this, arguments);
							callback();
						},
						complete: function() {
							applyAll(complete, this, arguments);
							popLoading();
						}
					}));
				}else{
					callback();
				}
			}
		}
		
		
		
		/* Sources
		-----------------------------------------------------------------------------*/
		
	
		function addEventSource(source) {
			source = _addEventSource(source);
			if (source) {
				pendingSourceCnt++;
				fetchEventSource(source, currentFetchID); // will eventually call reportEvents
			}
		}
		
		
		function _addEventSource(source) {
			if ($.isFunction(source) || $.isArray(source)) {
				source = { events: source };
			}
			else if (typeof source == 'string') {
				source = { url: source };
			}
			if (typeof source == 'object') {
				normalizeSource(source);
				sources.push(source);
				return source;
			}
		}
		
	
		function removeEventSource(source) {
			sources = $.grep(sources, function(src) {
				return !isSourcesEqual(src, source);
			});
			// remove all client events from that source
			cache = $.grep(cache, function(e) {
				return !isSourcesEqual(e.source, source);
			});
			reportEvents(cache);
		}
		
		
		
		/* Manipulation
		-----------------------------------------------------------------------------*/
		
		
		function updateEvent(event) { // update an existing event
			var i, len = cache.length, e,
				defaultEventEnd = getView().defaultEventEnd, // getView???
				startDelta = event.start - event._start,
				endDelta = event.end ?
					(event.end - (event._end || defaultEventEnd(event))) // event._end would be null if event.end
					: 0;                                                      // was null and event was just resized
			for (i=0; i<len; i++) {
				e = cache[i];
				if (e._id == event._id && e != event) {
					e.start = new Date(+e.start + startDelta);
					if (event.end) {
						if (e.end) {
							e.end = new Date(+e.end + endDelta);
						}else{
							e.end = new Date(+defaultEventEnd(e) + endDelta);
						}
					}else{
						e.end = null;
					}
					e.title = event.title;
					e.url = event.url;
					e.allDay = event.allDay;
					e.className = event.className;
					e.editable = event.editable;
					e.color = event.color;
					e.backgroudColor = event.backgroudColor;
					e.borderColor = event.borderColor;
					e.textColor = event.textColor;
					normalizeEvent(e);
				}
			}
			normalizeEvent(event);
			reportEvents(cache);
		}
		
		
		function renderEvent(event, stick) {
			normalizeEvent(event);
			if (!event.source) {
				if (stick) {
					stickySource.events.push(event);
					event.source = stickySource;
				}
				cache.push(event);
			}
			reportEvents(cache);
		}
		
		
		function removeEvents(filter) {
			if (!filter) { // remove all
				cache = [];
				// clear all array sources
				for (var i=0; i<sources.length; i++) {
					if ($.isArray(sources[i].events)) {
						sources[i].events = [];
					}
				}
			}else{
				if (!$.isFunction(filter)) { // an event ID
					var id = filter + '';
					filter = function(e) {
						return e._id == id;
					};
				}
				cache = $.grep(cache, filter, true);
				// remove events from array sources
				for (var i=0; i<sources.length; i++) {
					if ($.isArray(sources[i].events)) {
						sources[i].events = $.grep(sources[i].events, filter, true);
					}
				}
			}
			reportEvents(cache);
		}
		
		
		function clientEvents(filter) {
			if ($.isFunction(filter)) {
				return $.grep(cache, filter);
			}
			else if (filter) { // an event ID
				filter += '';
				return $.grep(cache, function(e) {
					return e._id == filter;
				});
			}
			return cache; // else, return all
		}
		
		
		
		/* Loading State
		-----------------------------------------------------------------------------*/
		
		
		function pushLoading() {
			if (!loadingLevel++) {
				trigger('loading', null, true);
			}
		}
		
		
		function popLoading() {
			if (!--loadingLevel) {
				trigger('loading', null, false);
			}
		}
		
		
		
		/* Event Normalization
		-----------------------------------------------------------------------------*/
		
		
		function normalizeEvent(event) {
			var source = event.source || {};
			var ignoreTimezone = firstDefined(source.ignoreTimezone, options.ignoreTimezone);
			event._id = event._id || (event.id === undefined ? '_fc' + eventGUID++ : event.id + '');
			if (event.date) {
				if (!event.start) {
					event.start = event.date;
				}
				delete event.date;
			}
			event._start = cloneDate(event.start = parseDate(event.start, ignoreTimezone));
			event.end = parseDate(event.end, ignoreTimezone);
			if (event.end && event.end <= event.start) {
				event.end = null;
			}
			event._end = event.end ? cloneDate(event.end) : null;
			if (event.allDay === undefined) {
				event.allDay = firstDefined(source.allDayDefault, options.allDayDefault);
			}
			if (event.className) {
				if (typeof event.className == 'string') {
					event.className = event.className.split(/\s+/);
				}
			}else{
				event.className = [];
			}
			// TODO: if there is no start date, return false to indicate an invalid event
		}
		
		
		
		/* Utils
		------------------------------------------------------------------------------*/
		
		
		function normalizeSource(source) {
			if (source.className) {
				// TODO: repeat code, same code for event classNames
				if (typeof source.className == 'string') {
					source.className = source.className.split(/\s+/);
				}
			}else{
				source.className = [];
			}
			var normalizers = fc.sourceNormalizers;
			for (var i=0; i<normalizers.length; i++) {
				normalizers[i](source);
			}
		}
		
		
		function isSourcesEqual(source1, source2) {
			return source1 && source2 && getSourcePrimitive(source1) == getSourcePrimitive(source2);
		}
		
		
		function getSourcePrimitive(source) {
			return ((typeof source == 'object') ? (source.events || source.url) : '') || source;
		}
	
	
	}
	
	
	fc.addDays = addDays;
	fc.cloneDate = cloneDate;
	fc.parseDate = parseDate;
	fc.parseISO8601 = parseISO8601;
	fc.parseTime = parseTime;
	fc.formatDate = formatDate;
	fc.formatDates = formatDates;
	
	
	
	/* Date Math
	-----------------------------------------------------------------------------*/
	
	var dayIDs = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
		DAY_MS = 86400000,
		HOUR_MS = 3600000,
		MINUTE_MS = 60000;
		
	
	function addYears(d, n, keepTime) {
		d.setFullYear(d.getFullYear() + n);
		if (!keepTime) {
			clearTime(d);
		}
		return d;
	}
	
	
	function addMonths(d, n, keepTime) { // prevents day overflow/underflow
		if (+d) { // prevent infinite looping on invalid dates
			var m = d.getMonth() + n,
				check = cloneDate(d);
			check.setDate(1);
			check.setMonth(m);
			d.setMonth(m);
			if (!keepTime) {
				clearTime(d);
			}
			while (d.getMonth() != check.getMonth()) {
				d.setDate(d.getDate() + (d < check ? 1 : -1));
			}
		}
		return d;
	}
	
	
	function addDays(d, n, keepTime) { // deals with daylight savings
		if (+d) {
			var dd = d.getDate() + n,
				check = cloneDate(d);
			check.setHours(9); // set to middle of day
			check.setDate(dd);
			d.setDate(dd);
			if (!keepTime) {
				clearTime(d);
			}
			fixDate(d, check);
		}
		return d;
	}
	
	
	function fixDate(d, check) { // force d to be on check's YMD, for daylight savings purposes
		if (+d) { // prevent infinite looping on invalid dates
			while (d.getDate() != check.getDate()) {
				d.setTime(+d + (d < check ? 1 : -1) * HOUR_MS);
			}
		}
	}
	
	
	function addMinutes(d, n) {
		d.setMinutes(d.getMinutes() + n);
		return d;
	}
	
	
	function clearTime(d) {
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0); 
		d.setMilliseconds(0);
		return d;
	}
	
	
	function cloneDate(d, dontKeepTime) {
		if (dontKeepTime) {
			return clearTime(new Date(+d));
		}
		return new Date(+d);
	}
	
	
	function zeroDate() { // returns a Date with time 00:00:00 and dateOfMonth=1
		var i=0, d;
		do {
			d = new Date(1970, i++, 1);
		} while (d.getHours()); // != 0
		return d;
	}
	
	
	function skipWeekend(date, inc, excl) {
		inc = inc || 1;
		while (!date.getDay() || (excl && date.getDay()==1 || !excl && date.getDay()==6)) {
			addDays(date, inc);
		}
		return date;
	}
	
	
	function dayDiff(d1, d2) { // d1 - d2
		return Math.round((cloneDate(d1, true) - cloneDate(d2, true)) / DAY_MS);
	}
	
	
	function setYMD(date, y, m, d) {
		if (y !== undefined && y != date.getFullYear()) {
			date.setDate(1);
			date.setMonth(0);
			date.setFullYear(y);
		}
		if (m !== undefined && m != date.getMonth()) {
			date.setDate(1);
			date.setMonth(m);
		}
		if (d !== undefined) {
			date.setDate(d);
		}
	}
	
	
	
	/* Date Parsing
	-----------------------------------------------------------------------------*/
	
	
	function parseDate(s, ignoreTimezone) { // ignoreTimezone defaults to true
		if (typeof s == 'object') { // already a Date object
			return s;
		}
		if (typeof s == 'number') { // a UNIX timestamp
			return new Date(s * 1000);
		}
		if (typeof s == 'string') {
			if (s.match(/^\d+(\.\d+)?$/)) { // a UNIX timestamp
				return new Date(parseFloat(s) * 1000);
			}
			if (ignoreTimezone === undefined) {
				ignoreTimezone = true;
			}
			return parseISO8601(s, ignoreTimezone) || (s ? new Date(s) : null);
		}
	
		// TODO: never return invalid dates (like from new Date(<string>)), return null instead
		return null;
	}
	
	
	function parseISO8601(s, ignoreTimezone) { // ignoreTimezone defaults to false
		// derived from http://delete.me.uk/2005/03/iso8601.html
		// TODO: for a know glitch/feature, read tests/issue_206_parseDate_dst.html
		var m = s.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
		if (!m) {
			return null;
		}
		var date = new Date(m[1], 0, 1);
		if (ignoreTimezone || !m[14]) {
			var check = new Date(m[1], 0, 1, 9, 0);
			if (m[3]) {
				date.setMonth(m[3] - 1);
				check.setMonth(m[3] - 1);
			}
			if (m[5]) {
				date.setDate(m[5]);
				check.setDate(m[5]);
			}
			fixDate(date, check);
			if (m[7]) {
				date.setHours(m[7]);
			}
			if (m[8]) {
				date.setMinutes(m[8]);
			}
			if (m[10]) {
				date.setSeconds(m[10]);
			}
			if (m[12]) {
				date.setMilliseconds(Number("0." + m[12]) * 1000);
			}
			fixDate(date, check);
		}else{
			date.setUTCFullYear(
				m[1],
				m[3] ? m[3] - 1 : 0,
				m[5] || 1
			);
			date.setUTCHours(
				m[7] || 0,
				m[8] || 0,
				m[10] || 0,
				m[12] ? Number("0." + m[12]) * 1000 : 0
			);
			var offset = Number(m[16]) * 60 + (m[18] ? Number(m[18]) : 0);
			offset *= m[15] == '-' ? 1 : -1;
			date = new Date(+date + (offset * 60 * 1000));
		}
		return date;
	}
	
	
	function parseTime(s) { // returns minutes since start of day
		if (typeof s == 'number') { // an hour
			return s * 60;
		}
		if (typeof s == 'object') { // a Date object
			return s.getHours() * 60 + s.getMinutes();
		}
		var m = s.match(/(\d+)(?::(\d+))?\s*(\w+)?/);
		if (m) {
			var h = parseInt(m[1], 10);
			if (m[3]) {
				h %= 12;
				if (m[3].toLowerCase().charAt(0) == 'p') {
					h += 12;
				}
			}
			return h * 60 + (m[2] ? parseInt(m[2], 10) : 0);
		}
	}
	
	
	
	/* Date Formatting
	-----------------------------------------------------------------------------*/
	// TODO: use same function formatDate(date, [date2], format, [options])
	
	
	function formatDate(date, format, options) {
		return formatDates(date, null, format, options);
	}
	
	
	function formatDates(date1, date2, format, options) {
		options = options || defaults;
		var date = date1,
			otherDate = date2,
			i, len = format.length, c,
			i2, formatter,
			res = '';
		for (i=0; i<len; i++) {
			c = format.charAt(i);
			if (c == "'") {
				for (i2=i+1; i2<len; i2++) {
					if (format.charAt(i2) == "'") {
						if (date) {
							if (i2 == i+1) {
								res += "'";
							}else{
								res += format.substring(i+1, i2);
							}
							i = i2;
						}
						break;
					}
				}
			}
			else if (c == '(') {
				for (i2=i+1; i2<len; i2++) {
					if (format.charAt(i2) == ')') {
						var subres = formatDate(date, format.substring(i+1, i2), options);
						if (parseInt(subres.replace(/\D/, ''), 10)) {
							res += subres;
						}
						i = i2;
						break;
					}
				}
			}
			else if (c == '[') {
				for (i2=i+1; i2<len; i2++) {
					if (format.charAt(i2) == ']') {
						var subformat = format.substring(i+1, i2);
						var subres = formatDate(date, subformat, options);
						if (subres != formatDate(otherDate, subformat, options)) {
							res += subres;
						}
						i = i2;
						break;
					}
				}
			}
			else if (c == '{') {
				date = date2;
				otherDate = date1;
			}
			else if (c == '}') {
				date = date1;
				otherDate = date2;
			}
			else {
				for (i2=len; i2>i; i2--) {
					if (formatter = dateFormatters[format.substring(i, i2)]) {
						if (date) {
							res += formatter(date, options);
						}
						i = i2 - 1;
						break;
					}
				}
				if (i2 == i) {
					if (date) {
						res += c;
					}
				}
			}
		}
		return res;
	};
	
	
	var dateFormatters = {
		s	: function(d)	{ return d.getSeconds() },
		ss	: function(d)	{ return zeroPad(d.getSeconds()) },
		m	: function(d)	{ return d.getMinutes() },
		mm	: function(d)	{ return zeroPad(d.getMinutes()) },
		h	: function(d)	{ return d.getHours() % 12 || 12 },
		hh	: function(d)	{ return zeroPad(d.getHours() % 12 || 12) },
		H	: function(d)	{ return d.getHours() },
		HH	: function(d)	{ return zeroPad(d.getHours()) },
		d	: function(d)	{ return d.getDate() },
		dd	: function(d)	{ return zeroPad(d.getDate()) },
		ddd	: function(d,o)	{ return o.dayNamesShort[d.getDay()] },
		dddd: function(d,o)	{ return o.dayNames[d.getDay()] },
		M	: function(d)	{ return d.getMonth() + 1 },
		MM	: function(d)	{ return zeroPad(d.getMonth() + 1) },
		MMM	: function(d,o)	{ return o.monthNamesShort[d.getMonth()] },
		MMMM: function(d,o)	{ return o.monthNames[d.getMonth()] },
		yy	: function(d)	{ return (d.getFullYear()+'').substring(2) },
		yyyy: function(d)	{ return d.getFullYear() },
		t	: function(d)	{ return d.getHours() < 12 ? 'a' : 'p' },
		tt	: function(d)	{ return d.getHours() < 12 ? 'am' : 'pm' },
		T	: function(d)	{ return d.getHours() < 12 ? 'A' : 'P' },
		TT	: function(d)	{ return d.getHours() < 12 ? 'AM' : 'PM' },
		u	: function(d)	{ return formatDate(d, "yyyy-MM-dd'T'HH:mm:ss'Z'") },
		S	: function(d)	{
			var date = d.getDate();
			if (date > 10 && date < 20) {
				return 'th';
			}
			return ['st', 'nd', 'rd'][date%10-1] || 'th';
		}
	};
	
	
	
	fc.applyAll = applyAll;
	
	
	/* Event Date Math
	-----------------------------------------------------------------------------*/
	
	
	function exclEndDay(event) {
		if (event.end) {
			return _exclEndDay(event.end, event.allDay);
		}else{
			return addDays(cloneDate(event.start), 1);
		}
	}
	
	
	function _exclEndDay(end, allDay) {
		end = cloneDate(end);
		return allDay || end.getHours() || end.getMinutes() ? addDays(end, 1) : clearTime(end);
	}
	
	
	function segCmp(a, b) {
		return (b.msLength - a.msLength) * 100 + (a.event.start - b.event.start);
	}
	
	
	function segsCollide(seg1, seg2) {
		return seg1.end > seg2.start && seg1.start < seg2.end;
	}
	
	
	
	/* Event Sorting
	-----------------------------------------------------------------------------*/
	
	
	// event rendering utilities
	function sliceSegs(events, visEventEnds, start, end) {
		var segs = [],
			i, len=events.length, event,
			eventStart, eventEnd,
			segStart, segEnd,
			isStart, isEnd;
		for (i=0; i<len; i++) {
			event = events[i];
			eventStart = event.start;
			eventEnd = visEventEnds[i];
			if (eventEnd > start && eventStart < end) {
				if (eventStart < start) {
					segStart = cloneDate(start);
					isStart = false;
				}else{
					segStart = eventStart;
					isStart = true;
				}
				if (eventEnd > end) {
					segEnd = cloneDate(end);
					isEnd = false;
				}else{
					segEnd = eventEnd;
					isEnd = true;
				}
				segs.push({
					event: event,
					start: segStart,
					end: segEnd,
					isStart: isStart,
					isEnd: isEnd,
					msLength: segEnd - segStart
				});
			}
		} 
		return segs.sort(segCmp);
	}
	
	
	// event rendering calculation utilities
	function stackSegs(segs) {
		var levels = [],
			i, len = segs.length, seg,
			j, collide, k;
		for (i=0; i<len; i++) {
			seg = segs[i];
			j = 0; // the level index where seg should belong
			while (true) {
				collide = false;
				if (levels[j]) {
					for (k=0; k<levels[j].length; k++) {
						if (segsCollide(levels[j][k], seg)) {
							collide = true;
							break;
						}
					}
				}
				if (collide) {
					j++;
				}else{
					break;
				}
			}
			if (levels[j]) {
				levels[j].push(seg);
			}else{
				levels[j] = [seg];
			}
		}
		return levels;
	}
	
	
	
	/* Event Element Binding
	-----------------------------------------------------------------------------*/
	
	
	function lazySegBind(container, segs, bindHandlers) {
		container.unbind('mouseover').mouseover(function(ev) {
			var parent=ev.target, e,
				i, seg;
			while (parent != this) {
				e = parent;
				parent = parent.parentNode;
			}
			if ((i = e._fci) !== undefined) {
				e._fci = undefined;
				seg = segs[i];
				bindHandlers(seg.event, seg.element, seg);
				$(ev.target).trigger(ev);
			}
			ev.stopPropagation();
		});
	}
	
	
	
	/* Element Dimensions
	-----------------------------------------------------------------------------*/
	
	
	function setOuterWidth(element, width, includeMargins) {
		for (var i=0, e; i<element.length; i++) {
			e = $(element[i]);
			e.width(Math.max(0, width - hsides(e, includeMargins)));
		}
	}
	
	
	function setOuterHeight(element, height, includeMargins) {
		for (var i=0, e; i<element.length; i++) {
			e = $(element[i]);
			e.height(Math.max(0, height - vsides(e, includeMargins)));
		}
	}
	
	
	// TODO: curCSS has been deprecated (jQuery 1.4.3 - 10/16/2010)
	
	
	function hsides(element, includeMargins) {
		return hpadding(element) + hborders(element) + (includeMargins ? hmargins(element) : 0);
	}
	
	
	function hpadding(element) {
		return (parseFloat($.curCSS(element[0], 'paddingLeft', true)) || 0) +
			   (parseFloat($.curCSS(element[0], 'paddingRight', true)) || 0);
	}
	
	
	function hmargins(element) {
		return (parseFloat($.curCSS(element[0], 'marginLeft', true)) || 0) +
			   (parseFloat($.curCSS(element[0], 'marginRight', true)) || 0);
	}
	
	
	function hborders(element) {
		return (parseFloat($.curCSS(element[0], 'borderLeftWidth', true)) || 0) +
			   (parseFloat($.curCSS(element[0], 'borderRightWidth', true)) || 0);
	}
	
	
	function vsides(element, includeMargins) {
		return vpadding(element) +  vborders(element) + (includeMargins ? vmargins(element) : 0);
	}
	
	
	function vpadding(element) {
		return (parseFloat($.curCSS(element[0], 'paddingTop', true)) || 0) +
			   (parseFloat($.curCSS(element[0], 'paddingBottom', true)) || 0);
	}
	
	
	function vmargins(element) {
		return (parseFloat($.curCSS(element[0], 'marginTop', true)) || 0) +
			   (parseFloat($.curCSS(element[0], 'marginBottom', true)) || 0);
	}
	
	
	function vborders(element) {
		return (parseFloat($.curCSS(element[0], 'borderTopWidth', true)) || 0) +
			   (parseFloat($.curCSS(element[0], 'borderBottomWidth', true)) || 0);
	}
	
	
	function setMinHeight(element, height) {
		height = (typeof height == 'number' ? height + 'px' : height);
		element.each(function(i, _element) {
			_element.style.cssText += ';min-height:' + height + ';_height:' + height;
			// why can't we just use .css() ? i forget
		});
	}
	
	
	
	/* Misc Utils
	-----------------------------------------------------------------------------*/
	
	
	//TODO: arraySlice
	//TODO: isFunction, grep ?
	
	
	function noop() { }
	
	
	function cmp(a, b) {
		return a - b;
	}
	
	
	function arrayMax(a) {
		return Math.max.apply(Math, a);
	}
	
	
	function zeroPad(n) {
		return (n < 10 ? '0' : '') + n;
	}
	
	
	function smartProperty(obj, name) { // get a camel-cased/namespaced property of an object
		if (obj[name] !== undefined) {
			return obj[name];
		}
		var parts = name.split(/(?=[A-Z])/),
			i=parts.length-1, res;
		for (; i>=0; i--) {
			res = obj[parts[i].toLowerCase()];
			if (res !== undefined) {
				return res;
			}
		}
		return obj[''];
	}
	
	
	function htmlEscape(s) {
		return s.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/'/g, '&#039;')
			.replace(/"/g, '&quot;')
			.replace(/\n/g, '<br />');
	}
	
	
	function cssKey(_element) {
		return _element.id + '/' + _element.className + '/' + _element.style.cssText.replace(/(^|;)\s*(top|left|width|height)\s*:[^;]*/ig, '');
	}
	
	
	function disableTextSelection(element) {
		element
			.attr('unselectable', 'on')
			.css('MozUserSelect', 'none')
			.bind('selectstart.ui', function() { return false; });
	}
	
	
	/*
	function enableTextSelection(element) {
		element
			.attr('unselectable', 'off')
			.css('MozUserSelect', '')
			.unbind('selectstart.ui');
	}
	*/
	
	
	function markFirstLast(e) {
		e.children()
			.removeClass('fc-first fc-last')
			.filter(':first-child')
				.addClass('fc-first')
			.end()
			.filter(':last-child')
				.addClass('fc-last');
	}
	
	
	function setDayID(cell, date) {
		cell.each(function(i, _cell) {
			_cell.className = _cell.className.replace(/^fc-\w*/, 'fc-' + dayIDs[date.getDay()]);
			// TODO: make a way that doesn't rely on order of classes
		});
	}
	
	
	function getSkinCss(event, opt) {
		var source = event.source || {};
		var eventColor = event.color;
		var sourceColor = source.color;
		var optionColor = opt('eventColor');
		var backgroundColor =
			event.backgroundColor ||
			eventColor ||
			source.backgroundColor ||
			sourceColor ||
			opt('eventBackgroundColor') ||
			optionColor;
		var borderColor =
			event.borderColor ||
			eventColor ||
			source.borderColor ||
			sourceColor ||
			opt('eventBorderColor') ||
			optionColor;
		var textColor =
			event.textColor ||
			source.textColor ||
			opt('eventTextColor');
		var statements = [];
		if (backgroundColor) {
			statements.push('background-color:' + backgroundColor);
		}
		if (borderColor) {
			statements.push('border-color:' + borderColor);
		}
		if (textColor) {
			statements.push('color:' + textColor);
		}
		return statements.join(';');
	}
	
	
	function applyAll(functions, thisObj, args) {
		if ($.isFunction(functions)) {
			functions = [ functions ];
		}
		if (functions) {
			var i;
			var ret;
			for (i=0; i<functions.length; i++) {
				ret = functions[i].apply(thisObj, args) || ret;
			}
			return ret;
		}
	}
	
	
	function firstDefined() {
		for (var i=0; i<arguments.length; i++) {
			if (arguments[i] !== undefined) {
				return arguments[i];
			}
		}
	}
	
	
	
	fcViews.month = MonthView;
	
	function MonthView(element, calendar) {
		var t = this;
		
		
		// exports
		t.render = render;
		
		
		// imports
		BasicView.call(t, element, calendar, 'month');
		var opt = t.opt;
		var renderBasic = t.renderBasic;
		var formatDate = calendar.formatDate;
		
		
		
		function render(date, delta) {
			if (delta) {
				addMonths(date, delta);
				date.setDate(1);
			}
			var start = cloneDate(date, true);
			start.setDate(1);
			var end = addMonths(cloneDate(start), 1);
			var visStart = cloneDate(start);
			var visEnd = cloneDate(end);
			var firstDay = opt('firstDay');
			var nwe = opt('weekends') ? 0 : 1;
			if (nwe) {
				skipWeekend(visStart);
				skipWeekend(visEnd, -1, true);
			}
			addDays(visStart, -((visStart.getDay() - Math.max(firstDay, nwe) + 7) % 7));
			addDays(visEnd, (7 - visEnd.getDay() + Math.max(firstDay, nwe)) % 7);
			var rowCnt = Math.round((visEnd - visStart) / (DAY_MS * 7));
			if (opt('weekMode') == 'fixed') {
				addDays(visEnd, (6 - rowCnt) * 7);
				rowCnt = 6;
			}
			t.title = formatDate(start, opt('titleFormat'));
			t.start = start;
			t.end = end;
			t.visStart = visStart;
			t.visEnd = visEnd;
			renderBasic(6, rowCnt, nwe ? 5 : 7, true);
		}
		
		
	}
	
	fcViews.basicWeek = BasicWeekView;
	
	function BasicWeekView(element, calendar) {
		var t = this;
		
		
		// exports
		t.render = render;
		
		
		// imports
		BasicView.call(t, element, calendar, 'basicWeek');
		var opt = t.opt;
		var renderBasic = t.renderBasic;
		var formatDates = calendar.formatDates;
		
		
		
		function render(date, delta) {
			if (delta) {
				addDays(date, delta * 7);
			}
			var start = addDays(cloneDate(date), -((date.getDay() - opt('firstDay') + 7) % 7));
			var end = addDays(cloneDate(start), 7);
			var visStart = cloneDate(start);
			var visEnd = cloneDate(end);
			var weekends = opt('weekends');
			if (!weekends) {
				skipWeekend(visStart);
				skipWeekend(visEnd, -1, true);
			}
			t.title = formatDates(
				visStart,
				addDays(cloneDate(visEnd), -1),
				opt('titleFormat')
			);
			t.start = start;
			t.end = end;
			t.visStart = visStart;
			t.visEnd = visEnd;
			renderBasic(1, 1, weekends ? 7 : 5, false);
		}
		
		
	}
	
	fcViews.basicDay = BasicDayView;
	
	//TODO: when calendar's date starts out on a weekend, shouldn't happen
	
	
	function BasicDayView(element, calendar) {
		var t = this;
		
		
		// exports
		t.render = render;
		
		
		// imports
		BasicView.call(t, element, calendar, 'basicDay');
		var opt = t.opt;
		var renderBasic = t.renderBasic;
		var formatDate = calendar.formatDate;
		
		
		
		function render(date, delta) {
			if (delta) {
				addDays(date, delta);
				if (!opt('weekends')) {
					skipWeekend(date, delta < 0 ? -1 : 1);
				}
			}
			t.title = formatDate(date, opt('titleFormat'));
			t.start = t.visStart = cloneDate(date, true);
			t.end = t.visEnd = addDays(cloneDate(t.start), 1);
			renderBasic(1, 1, 1, false);
		}
		
		
	}
	
	setDefaults({
		weekMode: 'fixed'
	});
	
	
	function BasicView(element, calendar, viewName) {
		var t = this;
		
		
		// exports
		t.renderBasic = renderBasic;
		t.setHeight = setHeight;
		t.setWidth = setWidth;
		t.renderDayOverlay = renderDayOverlay;
		t.defaultSelectionEnd = defaultSelectionEnd;
		t.renderSelection = renderSelection;
		t.clearSelection = clearSelection;
		t.reportDayClick = reportDayClick; // for selection (kinda hacky)
		t.dragStart = dragStart;
		t.dragStop = dragStop;
		t.defaultEventEnd = defaultEventEnd;
		t.getHoverListener = function() { return hoverListener };
		t.colContentLeft = colContentLeft;
		t.colContentRight = colContentRight;
		t.dayOfWeekCol = dayOfWeekCol;
		t.dateCell = dateCell;
		t.cellDate = cellDate;
		t.cellIsAllDay = function() { return true };
		t.allDayRow = allDayRow;
		t.allDayBounds = allDayBounds;
		t.getRowCnt = function() { return rowCnt };
		t.getColCnt = function() { return colCnt };
		t.getColWidth = function() { return colWidth };
		t.getDaySegmentContainer = function() { return daySegmentContainer };
		
		
		// imports
		View.call(t, element, calendar, viewName);
		OverlayManager.call(t);
		SelectionManager.call(t);
		BasicEventRenderer.call(t);
		var opt = t.opt;
		var trigger = t.trigger;
		var clearEvents = t.clearEvents;
		var renderOverlay = t.renderOverlay;
		var clearOverlays = t.clearOverlays;
		var daySelectionMousedown = t.daySelectionMousedown;
		var formatDate = calendar.formatDate;
		
		
		// locals
		
		var head;
		var headCells;
		var body;
		var bodyRows;
		var bodyCells;
		var bodyFirstCells;
		var bodyCellTopInners;
		var daySegmentContainer;
		
		var viewWidth;
		var viewHeight;
		var colWidth;
		
		var rowCnt, colCnt;
		var coordinateGrid;
		var hoverListener;
		var colContentPositions;
		
		var rtl, dis, dit;
		var firstDay;
		var nwe;
		var tm;
		var colFormat;
		
		
		
		/* Rendering
		------------------------------------------------------------*/
		
		
		disableTextSelection(element.addClass('fc-grid'));
		
		
		function renderBasic(maxr, r, c, showNumbers) {
			rowCnt = r;
			colCnt = c;
			updateOptions();
			var firstTime = !body;
			if (firstTime) {
				buildSkeleton(maxr, showNumbers);
			}else{
				clearEvents();
			}
			updateCells(firstTime);
		}
		
		
		
		function updateOptions() {
			rtl = opt('isRTL');
			if (rtl) {
				dis = -1;
				dit = colCnt - 1;
			}else{
				dis = 1;
				dit = 0;
			}
			firstDay = opt('firstDay');
			nwe = opt('weekends') ? 0 : 1;
			tm = opt('theme') ? 'ui' : 'fc';
			colFormat = opt('columnFormat');
		}
		
		
		
		function buildSkeleton(maxRowCnt, showNumbers) {
			var s;
			var headerClass = tm + "-widget-header";
			var contentClass = tm + "-widget-content";
			var i, j;
			var table;
			
			s =
				"<table class='fc-border-separate' style='width:100%' cellspacing='0'>" +
				"<thead>" +
				"<tr>";
			for (i=0; i<colCnt; i++) {
				s +=
					"<th class='fc- " + headerClass + "'/>"; // need fc- for setDayID
			}
			s +=
				"</tr>" +
				"</thead>" +
				"<tbody>";
			for (i=0; i<maxRowCnt; i++) {
				s +=
					"<tr class='fc-week" + i + "'>";
				for (j=0; j<colCnt; j++) {
					s +=
						"<td class='fc- " + contentClass + " fc-day" + (i*colCnt+j) + "'>" + // need fc- for setDayID
						"<div>" +
						(showNumbers ?
							"<div class='fc-day-number'/>" :
							''
							) +
						"<div class='fc-day-content'>" +
						"<div style='position:relative'>&nbsp;</div>" +
						"</div>" +
						"</div>" +
						"</td>";
				}
				s +=
					"</tr>";
			}
			s +=
				"</tbody>" +
				"</table>";
			table = $(s).appendTo(element);
			
			head = table.find('thead');
			headCells = head.find('th');
			body = table.find('tbody');
			bodyRows = body.find('tr');
			bodyCells = body.find('td');
			bodyFirstCells = bodyCells.filter(':first-child');
			bodyCellTopInners = bodyRows.eq(0).find('div.fc-day-content div');
			
			markFirstLast(head.add(head.find('tr'))); // marks first+last tr/th's
			markFirstLast(bodyRows); // marks first+last td's
			bodyRows.eq(0).addClass('fc-first'); // fc-last is done in updateCells
			
			dayBind(bodyCells);
			
			daySegmentContainer =
				$("<div style='position:absolute;z-index:8;top:0;left:0'/>")
					.appendTo(element);
		}
		
		
		
		function updateCells(firstTime) {
			var dowDirty = firstTime || rowCnt == 1; // could the cells' day-of-weeks need updating?
			var month = t.start.getMonth();
			var today = clearTime(new Date());
			var cell;
			var date;
			var row;
		
			if (dowDirty) {
				headCells.each(function(i, _cell) {
					cell = $(_cell);
					date = indexDate(i);
					cell.html(formatDate(date, colFormat));
					setDayID(cell, date);
				});
			}
			
			bodyCells.each(function(i, _cell) {
				cell = $(_cell);
				date = indexDate(i);
				if (date.getMonth() == month) {
					cell.removeClass('fc-other-month');
				}else{
					cell.addClass('fc-other-month');
				}
				if (+date == +today) {
					cell.addClass(tm + '-state-highlight fc-today');
				}else{
					cell.removeClass(tm + '-state-highlight fc-today');
				}
				cell.find('div.fc-day-number').text(date.getDate());
				if (dowDirty) {
					setDayID(cell, date);
				}
			});
			
			bodyRows.each(function(i, _row) {
				row = $(_row);
				if (i < rowCnt) {
					row.show();
					if (i == rowCnt-1) {
						row.addClass('fc-last');
					}else{
						row.removeClass('fc-last');
					}
				}else{
					row.hide();
				}
			});
		}
		
		
		
		function setHeight(height) {
			viewHeight = height;
			
			var bodyHeight = viewHeight - head.height();
			var rowHeight;
			var rowHeightLast;
			var cell;
				
			if (opt('weekMode') == 'variable') {
				rowHeight = rowHeightLast = Math.floor(bodyHeight / (rowCnt==1 ? 2 : 6));
			}else{
				rowHeight = Math.floor(bodyHeight / rowCnt);
				rowHeightLast = bodyHeight - rowHeight * (rowCnt-1);
			}
			
			bodyFirstCells.each(function(i, _cell) {
				if (i < rowCnt) {
					cell = $(_cell);
					setMinHeight(
						cell.find('> div'),
						(i==rowCnt-1 ? rowHeightLast : rowHeight) - vsides(cell)
					);
				}
			});
			
		}
		
		
		function setWidth(width) {
			viewWidth = width;
			colContentPositions.clear();
			colWidth = Math.floor(viewWidth / colCnt);
			setOuterWidth(headCells.slice(0, -1), colWidth);
		}
		
		
		
		/* Day clicking and binding
		-----------------------------------------------------------*/
		
		
		function dayBind(days) {
			days.click(dayClick)
				.mousedown(daySelectionMousedown);
		}
		
		
		function dayClick(ev) {
			if (!opt('selectable')) { // if selectable, SelectionManager will worry about dayClick
				var index = parseInt(this.className.match(/fc\-day(\d+)/)[1]); // TODO: maybe use .data
				var date = indexDate(index);
				trigger('dayClick', this, date, true, ev);
			}
		}
		
		
		
		/* Semi-transparent Overlay Helpers
		------------------------------------------------------*/
		
		
		function renderDayOverlay(overlayStart, overlayEnd, refreshCoordinateGrid) { // overlayEnd is exclusive
			if (refreshCoordinateGrid) {
				coordinateGrid.build();
			}
			var rowStart = cloneDate(t.visStart);
			var rowEnd = addDays(cloneDate(rowStart), colCnt);
			for (var i=0; i<rowCnt; i++) {
				var stretchStart = new Date(Math.max(rowStart, overlayStart));
				var stretchEnd = new Date(Math.min(rowEnd, overlayEnd));
				if (stretchStart < stretchEnd) {
					var colStart, colEnd;
					if (rtl) {
						colStart = dayDiff(stretchEnd, rowStart)*dis+dit+1;
						colEnd = dayDiff(stretchStart, rowStart)*dis+dit+1;
					}else{
						colStart = dayDiff(stretchStart, rowStart);
						colEnd = dayDiff(stretchEnd, rowStart);
					}
					dayBind(
						renderCellOverlay(i, colStart, i, colEnd-1)
					);
				}
				addDays(rowStart, 7);
				addDays(rowEnd, 7);
			}
		}
		
		
		function renderCellOverlay(row0, col0, row1, col1) { // row1,col1 is inclusive
			var rect = coordinateGrid.rect(row0, col0, row1, col1, element);
			return renderOverlay(rect, element);
		}
		
		
		
		/* Selection
		-----------------------------------------------------------------------*/
		
		
		function defaultSelectionEnd(startDate, allDay) {
			return cloneDate(startDate);
		}
		
		
		function renderSelection(startDate, endDate, allDay) {
			renderDayOverlay(startDate, addDays(cloneDate(endDate), 1), true); // rebuild every time???
		}
		
		
		function clearSelection() {
			clearOverlays();
		}
		
		
		function reportDayClick(date, allDay, ev) {
			var cell = dateCell(date);
			var _element = bodyCells[cell.row*colCnt + cell.col];
			trigger('dayClick', _element, date, allDay, ev);
		}
		
		
		
		/* External Dragging
		-----------------------------------------------------------------------*/
		
		
		function dragStart(_dragElement, ev, ui) {
			hoverListener.start(function(cell) {
				clearOverlays();
				if (cell) {
					renderCellOverlay(cell.row, cell.col, cell.row, cell.col);
				}
			}, ev);
		}
		
		
		function dragStop(_dragElement, ev, ui) {
			var cell = hoverListener.stop();
			clearOverlays();
			if (cell) {
				var d = cellDate(cell);
				trigger('drop', _dragElement, d, true, ev, ui);
			}
		}
		
		
		
		/* Utilities
		--------------------------------------------------------*/
		
		
		function defaultEventEnd(event) {
			return cloneDate(event.start);
		}
		
		
		coordinateGrid = new CoordinateGrid(function(rows, cols) {
			var e, n, p;
			headCells.each(function(i, _e) {
				e = $(_e);
				n = e.offset().left;
				if (i) {
					p[1] = n;
				}
				p = [n];
				cols[i] = p;
			});
			p[1] = n + e.outerWidth();
			bodyRows.each(function(i, _e) {
				if (i < rowCnt) {
					e = $(_e);
					n = e.offset().top;
					if (i) {
						p[1] = n;
					}
					p = [n];
					rows[i] = p;
				}
			});
			p[1] = n + e.outerHeight();
		});
		
		
		hoverListener = new HoverListener(coordinateGrid);
		
		
		colContentPositions = new HorizontalPositionCache(function(col) {
			return bodyCellTopInners.eq(col);
		});
		
		
		function colContentLeft(col) {
			return colContentPositions.left(col);
		}
		
		
		function colContentRight(col) {
			return colContentPositions.right(col);
		}
		
		
		
		
		function dateCell(date) {
			return {
				row: Math.floor(dayDiff(date, t.visStart) / 7),
				col: dayOfWeekCol(date.getDay())
			};
		}
		
		
		function cellDate(cell) {
			return _cellDate(cell.row, cell.col);
		}
		
		
		function _cellDate(row, col) {
			return addDays(cloneDate(t.visStart), row*7 + col*dis+dit);
			// what about weekends in middle of week?
		}
		
		
		function indexDate(index) {
			return _cellDate(Math.floor(index/colCnt), index%colCnt);
		}
		
		
		function dayOfWeekCol(dayOfWeek) {
			return ((dayOfWeek - Math.max(firstDay, nwe) + colCnt) % colCnt) * dis + dit;
		}
		
		
		
		
		function allDayRow(i) {
			return bodyRows.eq(i);
		}
		
		
		function allDayBounds(i) {
			return {
				left: 0,
				right: viewWidth
			};
		}
		
		
	}
	
	function BasicEventRenderer() {
		var t = this;
		
		
		// exports
		t.renderEvents = renderEvents;
		t.compileDaySegs = compileSegs; // for DayEventRenderer
		t.clearEvents = clearEvents;
		t.bindDaySeg = bindDaySeg;
		
		
		// imports
		DayEventRenderer.call(t);
		var opt = t.opt;
		var trigger = t.trigger;
		//var setOverflowHidden = t.setOverflowHidden;
		var isEventDraggable = t.isEventDraggable;
		var isEventResizable = t.isEventResizable;
		var reportEvents = t.reportEvents;
		var reportEventClear = t.reportEventClear;
		var eventElementHandlers = t.eventElementHandlers;
		var showEvents = t.showEvents;
		var hideEvents = t.hideEvents;
		var eventDrop = t.eventDrop;
		var getDaySegmentContainer = t.getDaySegmentContainer;
		var getHoverListener = t.getHoverListener;
		var renderDayOverlay = t.renderDayOverlay;
		var clearOverlays = t.clearOverlays;
		var getRowCnt = t.getRowCnt;
		var getColCnt = t.getColCnt;
		var renderDaySegs = t.renderDaySegs;
		var resizableDayEvent = t.resizableDayEvent;
		
		
		
		/* Rendering
		--------------------------------------------------------------------*/
		
		
		function renderEvents(events, modifiedEventId) {
			reportEvents(events);
			renderDaySegs(compileSegs(events), modifiedEventId);
		}
		
		
		function clearEvents() {
			reportEventClear();
			getDaySegmentContainer().empty();
		}
		
		
		function compileSegs(events) {
			var rowCnt = getRowCnt(),
				colCnt = getColCnt(),
				d1 = cloneDate(t.visStart),
				d2 = addDays(cloneDate(d1), colCnt),
				visEventsEnds = $.map(events, exclEndDay),
				i, row,
				j, level,
				k, seg,
				segs=[];
			for (i=0; i<rowCnt; i++) {
				row = stackSegs(sliceSegs(events, visEventsEnds, d1, d2));
				for (j=0; j<row.length; j++) {
					level = row[j];
					for (k=0; k<level.length; k++) {
						seg = level[k];
						seg.row = i;
						seg.level = j; // not needed anymore
						segs.push(seg);
					}
				}
				addDays(d1, 7);
				addDays(d2, 7);
			}
			return segs;
		}
		
		
		function bindDaySeg(event, eventElement, seg) {
			if (isEventDraggable(event)) {
				draggableDayEvent(event, eventElement);
			}
			if (seg.isEnd && isEventResizable(event)) {
				resizableDayEvent(event, eventElement, seg);
			}
			eventElementHandlers(event, eventElement);
				// needs to be after, because resizableDayEvent might stopImmediatePropagation on click
		}
		
		
		
		/* Dragging
		----------------------------------------------------------------------------*/
		
		
		function draggableDayEvent(event, eventElement) {
			var hoverListener = getHoverListener();
			var dayDelta;
			eventElement.draggable({
				zIndex: 9,
				delay: 50,
				opacity: opt('dragOpacity'),
				revertDuration: opt('dragRevertDuration'),
				start: function(ev, ui) {
					trigger('eventDragStart', eventElement, event, ev, ui);
					hideEvents(event, eventElement);
					hoverListener.start(function(cell, origCell, rowDelta, colDelta) {
						eventElement.draggable('option', 'revert', !cell || !rowDelta && !colDelta);
						clearOverlays();
						if (cell) {
							//setOverflowHidden(true);
							dayDelta = rowDelta*7 + colDelta * (opt('isRTL') ? -1 : 1);
							renderDayOverlay(
								addDays(cloneDate(event.start), dayDelta),
								addDays(exclEndDay(event), dayDelta)
							);
						}else{
							//setOverflowHidden(false);
							dayDelta = 0;
						}
					}, ev, 'drag');
				},
				stop: function(ev, ui) {
					hoverListener.stop();
					clearOverlays();
					trigger('eventDragStop', eventElement, event, ev, ui);
					if (dayDelta) {
						eventDrop(this, event, dayDelta, 0, event.allDay, ev, ui);
					}else{
						eventElement.css('filter', ''); // clear IE opacity side-effects
						showEvents(event, eventElement);
					}
					//setOverflowHidden(false);
				}
			});
		}
	
	
	}
	
	fcViews.agendaWeek = AgendaWeekView;
	
	function AgendaWeekView(element, calendar) {
		var t = this;
		
		
		// exports
		t.render = render;
		
		
		// imports
		AgendaView.call(t, element, calendar, 'agendaWeek');
		var opt = t.opt;
		var renderAgenda = t.renderAgenda;
		var formatDates = calendar.formatDates;
		
		
		
		function render(date, delta) {
			if (delta) {
				addDays(date, delta * 7);
			}
			var start = addDays(cloneDate(date), -((date.getDay() - opt('firstDay') + 7) % 7));
			var end = addDays(cloneDate(start), 7);
			var visStart = cloneDate(start);
			var visEnd = cloneDate(end);
			var weekends = opt('weekends');
			if (!weekends) {
				skipWeekend(visStart);
				skipWeekend(visEnd, -1, true);
			}
			t.title = formatDates(
				visStart,
				addDays(cloneDate(visEnd), -1),
				opt('titleFormat')
			);
			t.start = start;
			t.end = end;
			t.visStart = visStart;
			t.visEnd = visEnd;
			renderAgenda(weekends ? 7 : 5);
		}
		
	
	}
	
	fcViews.agendaDay = AgendaDayView;
	
	function AgendaDayView(element, calendar) {
		var t = this;
		
		
		// exports
		t.render = render;
		
		
		// imports
		AgendaView.call(t, element, calendar, 'agendaDay');
		var opt = t.opt;
		var renderAgenda = t.renderAgenda;
		var formatDate = calendar.formatDate;
		
		
		
		function render(date, delta) {
			if (delta) {
				addDays(date, delta);
				if (!opt('weekends')) {
					skipWeekend(date, delta < 0 ? -1 : 1);
				}
			}
			var start = cloneDate(date, true);
			var end = addDays(cloneDate(start), 1);
			t.title = formatDate(date, opt('titleFormat'));
			t.start = t.visStart = start;
			t.end = t.visEnd = end;
			renderAgenda(1);
		}
		
	
	}
	
	setDefaults({
		allDaySlot: true,
		allDayText: 'all-day',
		firstHour: 6,
		slotMinutes: 30,
		defaultEventMinutes: 120,
		axisFormat: 'h(:mm)tt',
		timeFormat: {
			agenda: 'h:mm{ - h:mm}'
		},
		dragOpacity: {
			agenda: .5
		},
		minTime: 0,
		maxTime: 24
	});
	
	
	// TODO: make it work in quirks mode (event corners, all-day height)
	// TODO: test liquid width, especially in IE6
	
	
	function AgendaView(element, calendar, viewName) {
		var t = this;
		
		
		// exports
		t.renderAgenda = renderAgenda;
		t.setWidth = setWidth;
		t.setHeight = setHeight;
		t.beforeHide = beforeHide;
		t.afterShow = afterShow;
		t.defaultEventEnd = defaultEventEnd;
		t.timePosition = timePosition;
		t.dayOfWeekCol = dayOfWeekCol;
		t.dateCell = dateCell;
		t.cellDate = cellDate;
		t.cellIsAllDay = cellIsAllDay;
		t.allDayRow = getAllDayRow;
		t.allDayBounds = allDayBounds;
		t.getHoverListener = function() { return hoverListener };
		t.colContentLeft = colContentLeft;
		t.colContentRight = colContentRight;
		t.getDaySegmentContainer = function() { return daySegmentContainer };
		t.getSlotSegmentContainer = function() { return slotSegmentContainer };
		t.getMinMinute = function() { return minMinute };
		t.getMaxMinute = function() { return maxMinute };
		t.getBodyContent = function() { return slotContent }; // !!??
		t.getRowCnt = function() { return 1 };
		t.getColCnt = function() { return colCnt };
		t.getColWidth = function() { return colWidth };
		t.getSlotHeight = function() { return slotHeight };
		t.defaultSelectionEnd = defaultSelectionEnd;
		t.renderDayOverlay = renderDayOverlay;
		t.renderSelection = renderSelection;
		t.clearSelection = clearSelection;
		t.reportDayClick = reportDayClick; // selection mousedown hack
		t.dragStart = dragStart;
		t.dragStop = dragStop;
		
		
		// imports
		View.call(t, element, calendar, viewName);
		OverlayManager.call(t);
		SelectionManager.call(t);
		AgendaEventRenderer.call(t);
		var opt = t.opt;
		var trigger = t.trigger;
		var clearEvents = t.clearEvents;
		var renderOverlay = t.renderOverlay;
		var clearOverlays = t.clearOverlays;
		var reportSelection = t.reportSelection;
		var unselect = t.unselect;
		var daySelectionMousedown = t.daySelectionMousedown;
		var slotSegHtml = t.slotSegHtml;
		var formatDate = calendar.formatDate;
		
		
		// locals
		
		var dayTable;
		var dayHead;
		var dayHeadCells;
		var dayBody;
		var dayBodyCells;
		var dayBodyCellInners;
		var dayBodyFirstCell;
		var dayBodyFirstCellStretcher;
		var slotLayer;
		var daySegmentContainer;
		var allDayTable;
		var allDayRow;
		var slotScroller;
		var slotContent;
		var slotSegmentContainer;
		var slotTable;
		var slotTableFirstInner;
		var axisFirstCells;
		var gutterCells;
		var selectionHelper;
		
		var viewWidth;
		var viewHeight;
		var axisWidth;
		var colWidth;
		var gutterWidth;
		var slotHeight; // TODO: what if slotHeight changes? (see issue 650)
		var savedScrollTop;
		
		var colCnt;
		var slotCnt;
		var coordinateGrid;
		var hoverListener;
		var colContentPositions;
		var slotTopCache = {};
		
		var tm;
		var firstDay;
		var nwe;            // no weekends (int)
		var rtl, dis, dit;  // day index sign / translate
		var minMinute, maxMinute;
		var colFormat;
		
	
		
		/* Rendering
		-----------------------------------------------------------------------------*/
		
		
		disableTextSelection(element.addClass('fc-agenda'));
		
		
		function renderAgenda(c) {
			colCnt = c;
			updateOptions();
			if (!dayTable) {
				buildSkeleton();
			}else{
				clearEvents();
			}
			updateCells();
		}
		
		
		
		function updateOptions() {
			tm = opt('theme') ? 'ui' : 'fc';
			nwe = opt('weekends') ? 0 : 1;
			firstDay = opt('firstDay');
			if (rtl = opt('isRTL')) {
				dis = -1;
				dit = colCnt - 1;
			}else{
				dis = 1;
				dit = 0;
			}
			minMinute = parseTime(opt('minTime'));
			maxMinute = parseTime(opt('maxTime'));
			colFormat = opt('columnFormat');
		}
		
		
		
		function buildSkeleton() {
			var headerClass = tm + "-widget-header";
			var contentClass = tm + "-widget-content";
			var s;
			var i;
			var d;
			var maxd;
			var minutes;
			var slotNormal = opt('slotMinutes') % 15 == 0;
			
			s =
				"<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'>" +
				"<thead>" +
				"<tr>" +
				"<th class='fc-agenda-axis " + headerClass + "'>&nbsp;</th>";
			for (i=0; i<colCnt; i++) {
				s +=
					"<th class='fc- fc-col" + i + ' ' + headerClass + "'/>"; // fc- needed for setDayID
			}
			s +=
				"<th class='fc-agenda-gutter " + headerClass + "'>&nbsp;</th>" +
				"</tr>" +
				"</thead>" +
				"<tbody>" +
				"<tr>" +
				"<th class='fc-agenda-axis " + headerClass + "'>&nbsp;</th>";
			for (i=0; i<colCnt; i++) {
				s +=
					"<td class='fc- fc-col" + i + ' ' + contentClass + "'>" + // fc- needed for setDayID
					"<div>" +
					"<div class='fc-day-content'>" +
					"<div style='position:relative'>&nbsp;</div>" +
					"</div>" +
					"</div>" +
					"</td>";
			}
			s +=
				"<td class='fc-agenda-gutter " + contentClass + "'>&nbsp;</td>" +
				"</tr>" +
				"</tbody>" +
				"</table>";
			dayTable = $(s).appendTo(element);
			dayHead = dayTable.find('thead');
			dayHeadCells = dayHead.find('th').slice(1, -1);
			dayBody = dayTable.find('tbody');
			dayBodyCells = dayBody.find('td').slice(0, -1);
			dayBodyCellInners = dayBodyCells.find('div.fc-day-content div');
			dayBodyFirstCell = dayBodyCells.eq(0);
			dayBodyFirstCellStretcher = dayBodyFirstCell.find('> div');
			
			markFirstLast(dayHead.add(dayHead.find('tr')));
			markFirstLast(dayBody.add(dayBody.find('tr')));
			
			axisFirstCells = dayHead.find('th:first');
			gutterCells = dayTable.find('.fc-agenda-gutter');
			
			slotLayer =
				$("<div style='position:absolute;z-index:2;left:0;width:100%'/>")
					.appendTo(element);
					
			if (opt('allDaySlot')) {
			
				daySegmentContainer =
					$("<div style='position:absolute;z-index:8;top:0;left:0'/>")
						.appendTo(slotLayer);
			
				s =
					"<table style='width:100%' class='fc-agenda-allday' cellspacing='0'>" +
					"<tr>" +
					"<th class='" + headerClass + " fc-agenda-axis'>" + opt('allDayText') + "</th>" +
					"<td>" +
					"<div class='fc-day-content'><div style='position:relative'/></div>" +
					"</td>" +
					"<th class='" + headerClass + " fc-agenda-gutter'>&nbsp;</th>" +
					"</tr>" +
					"</table>";
				allDayTable = $(s).appendTo(slotLayer);
				allDayRow = allDayTable.find('tr');
				
				dayBind(allDayRow.find('td'));
				
				axisFirstCells = axisFirstCells.add(allDayTable.find('th:first'));
				gutterCells = gutterCells.add(allDayTable.find('th.fc-agenda-gutter'));
				
				slotLayer.append(
					"<div class='fc-agenda-divider " + headerClass + "'>" +
					"<div class='fc-agenda-divider-inner'/>" +
					"</div>"
				);
				
			}else{
			
				daySegmentContainer = $([]); // in jQuery 1.4, we can just do $()
			
			}
			
			slotScroller =
				$("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>")
					.appendTo(slotLayer);
					
			slotContent =
				$("<div style='position:relative;width:100%;overflow:hidden'/>")
					.appendTo(slotScroller);
					
			slotSegmentContainer =
				$("<div style='position:absolute;z-index:8;top:0;left:0'/>")
					.appendTo(slotContent);
			
			s =
				"<table class='fc-agenda-slots' style='width:100%' cellspacing='0'>" +
				"<tbody>";
			d = zeroDate();
			maxd = addMinutes(cloneDate(d), maxMinute);
			addMinutes(d, minMinute);
			slotCnt = 0;
			for (i=0; d < maxd; i++) {
				minutes = d.getMinutes();
				s +=
					"<tr class='fc-slot" + i + ' ' + (!minutes ? '' : 'fc-minor') + "'>" +
					"<th class='fc-agenda-axis " + headerClass + "'>" +
					((!slotNormal || !minutes) ? formatDate(d, opt('axisFormat')) : '&nbsp;') +
					"</th>" +
					"<td class='" + contentClass + "'>" +
					"<div style='position:relative'>&nbsp;</div>" +
					"</td>" +
					"</tr>";
				addMinutes(d, opt('slotMinutes'));
				slotCnt++;
			}
			s +=
				"</tbody>" +
				"</table>";
			slotTable = $(s).appendTo(slotContent);
			slotTableFirstInner = slotTable.find('div:first');
			
			slotBind(slotTable.find('td'));
			
			axisFirstCells = axisFirstCells.add(slotTable.find('th:first'));
		}
		
		
		
		function updateCells() {
			var i;
			var headCell;
			var bodyCell;
			var date;
			var today = clearTime(new Date());
			for (i=0; i<colCnt; i++) {
				date = colDate(i);
				headCell = dayHeadCells.eq(i);
				headCell.html(formatDate(date, colFormat));
				bodyCell = dayBodyCells.eq(i);
				if (+date == +today) {
					bodyCell.addClass(tm + '-state-highlight fc-today');
				}else{
					bodyCell.removeClass(tm + '-state-highlight fc-today');
				}
				setDayID(headCell.add(bodyCell), date);
			}
		}
		
		
		
		function setHeight(height, dateChanged) {
			if (height === undefined) {
				height = viewHeight;
			}
			viewHeight = height;
			slotTopCache = {};
		
			var headHeight = dayBody.position().top;
			var allDayHeight = slotScroller.position().top; // including divider
			var bodyHeight = Math.min( // total body height, including borders
				height - headHeight,   // when scrollbars
				slotTable.height() + allDayHeight + 1 // when no scrollbars. +1 for bottom border
			);
			
			dayBodyFirstCellStretcher
				.height(bodyHeight - vsides(dayBodyFirstCell));
			
			slotLayer.css('top', headHeight);
			
			slotScroller.height(bodyHeight - allDayHeight - 1);
			
			slotHeight = slotTableFirstInner.height() + 1; // +1 for border
			
			if (dateChanged) {
				resetScroll();
			}
		}
		
		
		
		function setWidth(width) {
			viewWidth = width;
			colContentPositions.clear();
			
			axisWidth = 0;
			setOuterWidth(
				axisFirstCells
					.width('')
					.each(function(i, _cell) {
						axisWidth = Math.max(axisWidth, $(_cell).outerWidth());
					}),
				axisWidth
			);
			
			var slotTableWidth = slotScroller[0].clientWidth; // needs to be done after axisWidth (for IE7)
			//slotTable.width(slotTableWidth);
			
			gutterWidth = slotScroller.width() - slotTableWidth;
			if (gutterWidth) {
				setOuterWidth(gutterCells, gutterWidth);
				gutterCells
					.show()
					.prev()
					.removeClass('fc-last');
			}else{
				gutterCells
					.hide()
					.prev()
					.addClass('fc-last');
			}
			
			colWidth = Math.floor((slotTableWidth - axisWidth) / colCnt);
			setOuterWidth(dayHeadCells.slice(0, -1), colWidth);
		}
		
	
	
		function resetScroll() {
			var d0 = zeroDate();
			var scrollDate = cloneDate(d0);
			scrollDate.setHours(opt('firstHour'));
			var top = timePosition(d0, scrollDate) + 1; // +1 for the border
			function scroll() {
				slotScroller.scrollTop(top);
			}
			scroll();
			setTimeout(scroll, 0); // overrides any previous scroll state made by the browser
		}
		
		
		function beforeHide() {
			savedScrollTop = slotScroller.scrollTop();
		}
		
		
		function afterShow() {
			slotScroller.scrollTop(savedScrollTop);
		}
		
		
		
		/* Slot/Day clicking and binding
		-----------------------------------------------------------------------*/
		
	
		function dayBind(cells) {
			cells.click(slotClick)
				.mousedown(daySelectionMousedown);
		}
	
	
		function slotBind(cells) {
			cells.click(slotClick)
				.mousedown(slotSelectionMousedown);
		}
		
		
		function slotClick(ev) {
			if (!opt('selectable')) { // if selectable, SelectionManager will worry about dayClick
				var col = Math.min(colCnt-1, Math.floor((ev.pageX - dayTable.offset().left - axisWidth) / colWidth));
				var date = colDate(col);
				var rowMatch = this.parentNode.className.match(/fc-slot(\d+)/); // TODO: maybe use data
				if (rowMatch) {
					var mins = parseInt(rowMatch[1]) * opt('slotMinutes');
					var hours = Math.floor(mins/60);
					date.setHours(hours);
					date.setMinutes(mins%60 + minMinute);
					trigger('dayClick', dayBodyCells[col], date, false, ev);
				}else{
					trigger('dayClick', dayBodyCells[col], date, true, ev);
				}
			}
		}
		
		
		
		/* Semi-transparent Overlay Helpers
		-----------------------------------------------------*/
		
	
		function renderDayOverlay(startDate, endDate, refreshCoordinateGrid) { // endDate is exclusive
			if (refreshCoordinateGrid) {
				coordinateGrid.build();
			}
			var visStart = cloneDate(t.visStart);
			var startCol, endCol;
			if (rtl) {
				startCol = dayDiff(endDate, visStart)*dis+dit+1;
				endCol = dayDiff(startDate, visStart)*dis+dit+1;
			}else{
				startCol = dayDiff(startDate, visStart);
				endCol = dayDiff(endDate, visStart);
			}
			startCol = Math.max(0, startCol);
			endCol = Math.min(colCnt, endCol);
			if (startCol < endCol) {
				dayBind(
					renderCellOverlay(0, startCol, 0, endCol-1)
				);
			}
		}
		
		
		function renderCellOverlay(row0, col0, row1, col1) { // only for all-day?
			var rect = coordinateGrid.rect(row0, col0, row1, col1, slotLayer);
			return renderOverlay(rect, slotLayer);
		}
		
	
		function renderSlotOverlay(overlayStart, overlayEnd) {
			var dayStart = cloneDate(t.visStart);
			var dayEnd = addDays(cloneDate(dayStart), 1);
			for (var i=0; i<colCnt; i++) {
				var stretchStart = new Date(Math.max(dayStart, overlayStart));
				var stretchEnd = new Date(Math.min(dayEnd, overlayEnd));
				if (stretchStart < stretchEnd) {
					var col = i*dis+dit;
					var rect = coordinateGrid.rect(0, col, 0, col, slotContent); // only use it for horizontal coords
					var top = timePosition(dayStart, stretchStart);
					var bottom = timePosition(dayStart, stretchEnd);
					rect.top = top;
					rect.height = bottom - top;
					slotBind(
						renderOverlay(rect, slotContent)
					);
				}
				addDays(dayStart, 1);
				addDays(dayEnd, 1);
			}
		}
		
		
		
		/* Coordinate Utilities
		-----------------------------------------------------------------------------*/
		
		
		coordinateGrid = new CoordinateGrid(function(rows, cols) {
			var e, n, p;
			dayHeadCells.each(function(i, _e) {
				e = $(_e);
				n = e.offset().left;
				if (i) {
					p[1] = n;
				}
				p = [n];
				cols[i] = p;
			});
			p[1] = n + e.outerWidth();
			if (opt('allDaySlot')) {
				e = allDayRow;
				n = e.offset().top;
				rows[0] = [n, n+e.outerHeight()];
			}
			var slotTableTop = slotContent.offset().top;
			var slotScrollerTop = slotScroller.offset().top;
			var slotScrollerBottom = slotScrollerTop + slotScroller.outerHeight();
			function constrain(n) {
				return Math.max(slotScrollerTop, Math.min(slotScrollerBottom, n));
			}
			for (var i=0; i<slotCnt; i++) {
				rows.push([
					constrain(slotTableTop + slotHeight*i),
					constrain(slotTableTop + slotHeight*(i+1))
				]);
			}
		});
		
		
		hoverListener = new HoverListener(coordinateGrid);
		
		
		colContentPositions = new HorizontalPositionCache(function(col) {
			return dayBodyCellInners.eq(col);
		});
		
		
		function colContentLeft(col) {
			return colContentPositions.left(col);
		}
		
		
		function colContentRight(col) {
			return colContentPositions.right(col);
		}
		
		
		
		
		function dateCell(date) { // "cell" terminology is now confusing
			return {
				row: Math.floor(dayDiff(date, t.visStart) / 7),
				col: dayOfWeekCol(date.getDay())
			};
		}
		
		
		function cellDate(cell) {
			var d = colDate(cell.col);
			var slotIndex = cell.row;
			if (opt('allDaySlot')) {
				slotIndex--;
			}
			if (slotIndex >= 0) {
				addMinutes(d, minMinute + slotIndex * opt('slotMinutes'));
			}
			return d;
		}
		
		
		function colDate(col) { // returns dates with 00:00:00
			return addDays(cloneDate(t.visStart), col*dis+dit);
		}
		
		
		function cellIsAllDay(cell) {
			return opt('allDaySlot') && !cell.row;
		}
		
		
		function dayOfWeekCol(dayOfWeek) {
			return ((dayOfWeek - Math.max(firstDay, nwe) + colCnt) % colCnt)*dis+dit;
		}
		
		
		
		
		// get the Y coordinate of the given time on the given day (both Date objects)
		function timePosition(day, time) { // both date objects. day holds 00:00 of current day
			day = cloneDate(day, true);
			if (time < addMinutes(cloneDate(day), minMinute)) {
				return 0;
			}
			if (time >= addMinutes(cloneDate(day), maxMinute)) {
				return slotTable.height();
			}
			var slotMinutes = opt('slotMinutes'),
				minutes = time.getHours()*60 + time.getMinutes() - minMinute,
				slotI = Math.floor(minutes / slotMinutes),
				slotTop = slotTopCache[slotI];
			if (slotTop === undefined) {
				slotTop = slotTopCache[slotI] = slotTable.find('tr:eq(' + slotI + ') td div')[0].offsetTop; //.position().top; // need this optimization???
			}
			return Math.max(0, Math.round(
				slotTop - 1 + slotHeight * ((minutes % slotMinutes) / slotMinutes)
			));
		}
		
		
		function allDayBounds() {
			return {
				left: axisWidth,
				right: viewWidth - gutterWidth
			}
		}
		
		
		function getAllDayRow(index) {
			return allDayRow;
		}
		
		
		function defaultEventEnd(event) {
			var start = cloneDate(event.start);
			if (event.allDay) {
				return start;
			}
			return addMinutes(start, opt('defaultEventMinutes'));
		}
		
		
		
		/* Selection
		---------------------------------------------------------------------------------*/
		
		
		function defaultSelectionEnd(startDate, allDay) {
			if (allDay) {
				return cloneDate(startDate);
			}
			return addMinutes(cloneDate(startDate), opt('slotMinutes'));
		}
		
		
		function renderSelection(startDate, endDate, allDay) { // only for all-day
			if (allDay) {
				if (opt('allDaySlot')) {
					renderDayOverlay(startDate, addDays(cloneDate(endDate), 1), true);
				}
			}else{
				renderSlotSelection(startDate, endDate);
			}
		}
		
		
		function renderSlotSelection(startDate, endDate) {
			var helperOption = opt('selectHelper');
			coordinateGrid.build();
			if (helperOption) {
				var col = dayDiff(startDate, t.visStart) * dis + dit;
				if (col >= 0 && col < colCnt) { // only works when times are on same day
					var rect = coordinateGrid.rect(0, col, 0, col, slotContent); // only for horizontal coords
					var top = timePosition(startDate, startDate);
					var bottom = timePosition(startDate, endDate);
					if (bottom > top) { // protect against selections that are entirely before or after visible range
						rect.top = top;
						rect.height = bottom - top;
						rect.left += 2;
						rect.width -= 5;
						if ($.isFunction(helperOption)) {
							var helperRes = helperOption(startDate, endDate);
							if (helperRes) {
								rect.position = 'absolute';
								rect.zIndex = 8;
								selectionHelper = $(helperRes)
									.css(rect)
									.appendTo(slotContent);
							}
						}else{
							rect.isStart = true; // conside rect a "seg" now
							rect.isEnd = true;   //
							selectionHelper = $(slotSegHtml(
								{
									title: '',
									start: startDate,
									end: endDate,
									className: ['fc-select-helper'],
									editable: false
								},
								rect
							));
							selectionHelper.css('opacity', opt('dragOpacity'));
						}
						if (selectionHelper) {
							slotBind(selectionHelper);
							slotContent.append(selectionHelper);
							setOuterWidth(selectionHelper, rect.width, true); // needs to be after appended
							setOuterHeight(selectionHelper, rect.height, true);
						}
					}
				}
			}else{
				renderSlotOverlay(startDate, endDate);
			}
		}
		
		
		function clearSelection() {
			clearOverlays();
			if (selectionHelper) {
				selectionHelper.remove();
				selectionHelper = null;
			}
		}
		
		
		function slotSelectionMousedown(ev) {
			if (ev.which == 1 && opt('selectable')) { // ev.which==1 means left mouse button
				unselect(ev);
				var dates;
				hoverListener.start(function(cell, origCell) {
					clearSelection();
					if (cell && cell.col == origCell.col && !cellIsAllDay(cell)) {
						var d1 = cellDate(origCell);
						var d2 = cellDate(cell);
						dates = [
							d1,
							addMinutes(cloneDate(d1), opt('slotMinutes')),
							d2,
							addMinutes(cloneDate(d2), opt('slotMinutes'))
						].sort(cmp);
						renderSlotSelection(dates[0], dates[3]);
					}else{
						dates = null;
					}
				}, ev);
				$(document).one('mouseup', function(ev) {
					hoverListener.stop();
					if (dates) {
						if (+dates[0] == +dates[1]) {
							reportDayClick(dates[0], false, ev);
						}
						reportSelection(dates[0], dates[3], false, ev);
					}
				});
			}
		}
		
		
		function reportDayClick(date, allDay, ev) {
			trigger('dayClick', dayBodyCells[dayOfWeekCol(date.getDay())], date, allDay, ev);
		}
		
		
		
		/* External Dragging
		--------------------------------------------------------------------------------*/
		
		
		function dragStart(_dragElement, ev, ui) {
			hoverListener.start(function(cell) {
				clearOverlays();
				if (cell) {
					if (cellIsAllDay(cell)) {
						renderCellOverlay(cell.row, cell.col, cell.row, cell.col);
					}else{
						var d1 = cellDate(cell);
						var d2 = addMinutes(cloneDate(d1), opt('defaultEventMinutes'));
						renderSlotOverlay(d1, d2);
					}
				}
			}, ev);
		}
		
		
		function dragStop(_dragElement, ev, ui) {
			var cell = hoverListener.stop();
			clearOverlays();
			if (cell) {
				trigger('drop', _dragElement, cellDate(cell), cellIsAllDay(cell), ev, ui);
			}
		}
	
	
	}
	
	function AgendaEventRenderer() {
		var t = this;
		
		
		// exports
		t.renderEvents = renderEvents;
		t.compileDaySegs = compileDaySegs; // for DayEventRenderer
		t.clearEvents = clearEvents;
		t.slotSegHtml = slotSegHtml;
		t.bindDaySeg = bindDaySeg;
		
		
		// imports
		DayEventRenderer.call(t);
		var opt = t.opt;
		var trigger = t.trigger;
		//var setOverflowHidden = t.setOverflowHidden;
		var isEventDraggable = t.isEventDraggable;
		var isEventResizable = t.isEventResizable;
		var eventEnd = t.eventEnd;
		var reportEvents = t.reportEvents;
		var reportEventClear = t.reportEventClear;
		var eventElementHandlers = t.eventElementHandlers;
		var setHeight = t.setHeight;
		var getDaySegmentContainer = t.getDaySegmentContainer;
		var getSlotSegmentContainer = t.getSlotSegmentContainer;
		var getHoverListener = t.getHoverListener;
		var getMaxMinute = t.getMaxMinute;
		var getMinMinute = t.getMinMinute;
		var timePosition = t.timePosition;
		var colContentLeft = t.colContentLeft;
		var colContentRight = t.colContentRight;
		var renderDaySegs = t.renderDaySegs;
		var resizableDayEvent = t.resizableDayEvent; // TODO: streamline binding architecture
		var getColCnt = t.getColCnt;
		var getColWidth = t.getColWidth;
		var getSlotHeight = t.getSlotHeight;
		var getBodyContent = t.getBodyContent;
		var reportEventElement = t.reportEventElement;
		var showEvents = t.showEvents;
		var hideEvents = t.hideEvents;
		var eventDrop = t.eventDrop;
		var eventResize = t.eventResize;
		var renderDayOverlay = t.renderDayOverlay;
		var clearOverlays = t.clearOverlays;
		var calendar = t.calendar;
		var formatDate = calendar.formatDate;
		var formatDates = calendar.formatDates;
		
		
		
		/* Rendering
		----------------------------------------------------------------------------*/
		
	
		function renderEvents(events, modifiedEventId) {
			reportEvents(events);
			var i, len=events.length,
				dayEvents=[],
				slotEvents=[];
			for (i=0; i<len; i++) {
				if (events[i].allDay) {
					dayEvents.push(events[i]);
				}else{
					slotEvents.push(events[i]);
				}
			}
			if (opt('allDaySlot')) {
				renderDaySegs(compileDaySegs(dayEvents), modifiedEventId);
				setHeight(); // no params means set to viewHeight
			}
			renderSlotSegs(compileSlotSegs(slotEvents), modifiedEventId);
		}
		
		
		function clearEvents() {
			reportEventClear();
			getDaySegmentContainer().empty();
			getSlotSegmentContainer().empty();
		}
		
		
		function compileDaySegs(events) {
			var levels = stackSegs(sliceSegs(events, $.map(events, exclEndDay), t.visStart, t.visEnd)),
				i, levelCnt=levels.length, level,
				j, seg,
				segs=[];
			for (i=0; i<levelCnt; i++) {
				level = levels[i];
				for (j=0; j<level.length; j++) {
					seg = level[j];
					seg.row = 0;
					seg.level = i; // not needed anymore
					segs.push(seg);
				}
			}
			return segs;
		}
		
		
		function compileSlotSegs(events) {
			var colCnt = getColCnt(),
				minMinute = getMinMinute(),
				maxMinute = getMaxMinute(),
				d = addMinutes(cloneDate(t.visStart), minMinute),
				visEventEnds = $.map(events, slotEventEnd),
				i, col,
				j, level,
				k, seg,
				segs=[];
			for (i=0; i<colCnt; i++) {
				col = stackSegs(sliceSegs(events, visEventEnds, d, addMinutes(cloneDate(d), maxMinute-minMinute)));
				countForwardSegs(col);
				for (j=0; j<col.length; j++) {
					level = col[j];
					for (k=0; k<level.length; k++) {
						seg = level[k];
						seg.col = i;
						seg.level = j;
						segs.push(seg);
					}
				}
				addDays(d, 1, true);
	
			}
			return segs;
		}
		
		
		function slotEventEnd(event) {
			if (event.end) {
				return cloneDate(event.end);
			}else{
				return addMinutes(cloneDate(event.start), opt('defaultEventMinutes'));
			}
		}
		
		
		// renders events in the 'time slots' at the bottom
		
		function renderSlotSegs(segs, modifiedEventId) {
		
			var i, segCnt=segs.length, seg,
				event,
				classes,
				top, bottom,
				colI, levelI, forward,
				leftmost,
				availWidth,
				outerWidth,
				left,
				html='',
				eventElements,
				eventElement,
				triggerRes,
				vsideCache={},
				hsideCache={},
				key, val,
				contentElement,
				height,
				slotSegmentContainer = getSlotSegmentContainer(),
				rtl, dis, dit,
				colCnt = getColCnt();
				
			if (rtl = opt('isRTL')) {
				dis = -1;
				dit = colCnt - 1;
			}else{
				dis = 1;
				dit = 0;
			}
				
			// calculate position/dimensions, create html
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				event = seg.event;
				top = timePosition(seg.start, seg.start);
				bottom = timePosition(seg.start, seg.end);
				colI = seg.col;
				levelI = seg.level;
				forward = seg.forward || 0;
				leftmost = colContentLeft(colI*dis + dit);
				availWidth = colContentRight(colI*dis + dit) - leftmost;
				availWidth = Math.min(availWidth-6, availWidth*.95); // TODO: move this to CSS
				if (levelI) {
					// indented and thin
					outerWidth = availWidth / (levelI + forward + 1);
				}else{
					if (forward) {
						// moderately wide, aligned left still
						outerWidth = ((availWidth / (forward + 1)) - (12/2)) * 2; // 12 is the predicted width of resizer =
					}else{
						// can be entire width, aligned left
						outerWidth = availWidth;
					}
				}
				left = leftmost +                                  // leftmost possible
					(availWidth / (levelI + forward + 1) * levelI) // indentation
					* dis + (rtl ? availWidth - outerWidth : 0);   // rtl
				seg.top = top;
				seg.left = left;
				seg.outerWidth = outerWidth;
				seg.outerHeight = bottom - top;
				html += slotSegHtml(event, seg);
			}
			slotSegmentContainer[0].innerHTML = html; // faster than html()
			eventElements = slotSegmentContainer.children();
			
			// retrieve elements, run through eventRender callback, bind event handlers
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				event = seg.event;
				eventElement = $(eventElements[i]); // faster than eq()
				triggerRes = trigger('eventRender', event, event, eventElement);
				if (triggerRes === false) {
					eventElement.remove();
				}else{
					if (triggerRes && triggerRes !== true) {
						eventElement.remove();
						eventElement = $(triggerRes)
							.css({
								position: 'absolute',
								top: seg.top,
								left: seg.left
							})
							.appendTo(slotSegmentContainer);
					}
					seg.element = eventElement;
					if (event._id === modifiedEventId) {
						bindSlotSeg(event, eventElement, seg);
					}else{
						eventElement[0]._fci = i; // for lazySegBind
					}
					reportEventElement(event, eventElement);
				}
			}
			
			lazySegBind(slotSegmentContainer, segs, bindSlotSeg);
			
			// record event sides and title positions
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				if (eventElement = seg.element) {
					val = vsideCache[key = seg.key = cssKey(eventElement[0])];
					seg.vsides = val === undefined ? (vsideCache[key] = vsides(eventElement, true)) : val;
					val = hsideCache[key];
					seg.hsides = val === undefined ? (hsideCache[key] = hsides(eventElement, true)) : val;
					contentElement = eventElement.find('div.fc-event-content');
					if (contentElement.length) {
						seg.contentTop = contentElement[0].offsetTop;
					}
				}
			}
			
			// set all positions/dimensions at once
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				if (eventElement = seg.element) {
					eventElement[0].style.width = Math.max(0, seg.outerWidth - seg.hsides) + 'px';
					height = Math.max(0, seg.outerHeight - seg.vsides);
					eventElement[0].style.height = height + 'px';
					event = seg.event;
					if (seg.contentTop !== undefined && height - seg.contentTop < 10) {
						// not enough room for title, put it in the time header
						eventElement.find('div.fc-event-time')
							.text(formatDate(event.start, opt('timeFormat')) + ' - ' + event.title);
						eventElement.find('div.fc-event-title')
							.remove();
					}
					trigger('eventAfterRender', event, event, eventElement);
				}
			}
						
		}
		
		
		function slotSegHtml(event, seg) {
			var html = "<";
			var url = event.url;
			var skinCss = getSkinCss(event, opt);
			var skinCssAttr = (skinCss ? " style='" + skinCss + "'" : '');
			var classes = ['fc-event', 'fc-event-skin', 'fc-event-vert'];
			if (isEventDraggable(event)) {
				classes.push('fc-event-draggable');
			}
			if (seg.isStart) {
				classes.push('fc-corner-top');
			}
			if (seg.isEnd) {
				classes.push('fc-corner-bottom');
			}
			classes = classes.concat(event.className);
			if (event.source) {
				classes = classes.concat(event.source.className || []);
			}
			if (url) {
				html += "a href='" + htmlEscape(event.url) + "'";
			}else{
				html += "div";
			}
			html +=
				" class='" + classes.join(' ') + "'" +
				" style='position:absolute;z-index:8;top:" + seg.top + "px;left:" + seg.left + "px;" + skinCss + "'" +
				">" +
				"<div class='fc-event-inner fc-event-skin'" + skinCssAttr + ">" +
				"<div class='fc-event-head fc-event-skin'" + skinCssAttr + ">" +
				"<div class='fc-event-time'>" +
				htmlEscape(formatDates(event.start, event.end, opt('timeFormat'))) +
				"</div>" +
				"</div>" +
				"<div class='fc-event-content'>" +
				"<div class='fc-event-title'>" +
				htmlEscape(event.title) +
				"</div>" +
				"</div>" +
				"<div class='fc-event-bg'></div>" +
				"</div>"; // close inner
			if (seg.isEnd && isEventResizable(event)) {
				html +=
					"<div class='ui-resizable-handle ui-resizable-s'>=</div>";
			}
			html +=
				"</" + (url ? "a" : "div") + ">";
			return html;
		}
		
		
		function bindDaySeg(event, eventElement, seg) {
			if (isEventDraggable(event)) {
				draggableDayEvent(event, eventElement, seg.isStart);
			}
			if (seg.isEnd && isEventResizable(event)) {
				resizableDayEvent(event, eventElement, seg);
			}
			eventElementHandlers(event, eventElement);
				// needs to be after, because resizableDayEvent might stopImmediatePropagation on click
		}
		
		
		function bindSlotSeg(event, eventElement, seg) {
			var timeElement = eventElement.find('div.fc-event-time');
			if (isEventDraggable(event)) {
				draggableSlotEvent(event, eventElement, timeElement);
			}
			if (seg.isEnd && isEventResizable(event)) {
				resizableSlotEvent(event, eventElement, timeElement);
			}
			eventElementHandlers(event, eventElement);
		}
		
		
		
		/* Dragging
		-----------------------------------------------------------------------------------*/
		
		
		// when event starts out FULL-DAY
		
		function draggableDayEvent(event, eventElement, isStart) {
			var origWidth;
			var revert;
			var allDay=true;
			var dayDelta;
			var dis = opt('isRTL') ? -1 : 1;
			var hoverListener = getHoverListener();
			var colWidth = getColWidth();
			var slotHeight = getSlotHeight();
			var minMinute = getMinMinute();
			eventElement.draggable({
				zIndex: 9,
				opacity: opt('dragOpacity', 'month'), // use whatever the month view was using
				revertDuration: opt('dragRevertDuration'),
				start: function(ev, ui) {
					trigger('eventDragStart', eventElement, event, ev, ui);
					hideEvents(event, eventElement);
					origWidth = eventElement.width();
					hoverListener.start(function(cell, origCell, rowDelta, colDelta) {
						clearOverlays();
						if (cell) {
							//setOverflowHidden(true);
							revert = false;
							dayDelta = colDelta * dis;
							if (!cell.row) {
								// on full-days
								renderDayOverlay(
									addDays(cloneDate(event.start), dayDelta),
									addDays(exclEndDay(event), dayDelta)
								);
								resetElement();
							}else{
								// mouse is over bottom slots
								if (isStart) {
									if (allDay) {
										// convert event to temporary slot-event
										eventElement.width(colWidth - 10); // don't use entire width
										setOuterHeight(
											eventElement,
											slotHeight * Math.round(
												(event.end ? ((event.end - event.start) / MINUTE_MS) : opt('defaultEventMinutes'))
												/ opt('slotMinutes')
											)
										);
										eventElement.draggable('option', 'grid', [colWidth, 1]);
										allDay = false;
									}
								}else{
									revert = true;
								}
							}
							revert = revert || (allDay && !dayDelta);
						}else{
							resetElement();
							//setOverflowHidden(false);
							revert = true;
						}
						eventElement.draggable('option', 'revert', revert);
					}, ev, 'drag');
				},
				stop: function(ev, ui) {
					hoverListener.stop();
					clearOverlays();
					trigger('eventDragStop', eventElement, event, ev, ui);
					if (revert) {
						// hasn't moved or is out of bounds (draggable has already reverted)
						resetElement();
						eventElement.css('filter', ''); // clear IE opacity side-effects
						showEvents(event, eventElement);
					}else{
						// changed!
						var minuteDelta = 0;
						if (!allDay) {
							minuteDelta = Math.round((eventElement.offset().top - getBodyContent().offset().top) / slotHeight)
								* opt('slotMinutes')
								+ minMinute
								- (event.start.getHours() * 60 + event.start.getMinutes());
						}
						eventDrop(this, event, dayDelta, minuteDelta, allDay, ev, ui);
					}
					//setOverflowHidden(false);
				}
			});
			function resetElement() {
				if (!allDay) {
					eventElement
						.width(origWidth)
						.height('')
						.draggable('option', 'grid', null);
					allDay = true;
				}
			}
		}
		
		
		// when event starts out IN TIMESLOTS
		
		function draggableSlotEvent(event, eventElement, timeElement) {
			var origPosition;
			var allDay=false;
			var dayDelta;
			var minuteDelta;
			var prevMinuteDelta;
			var dis = opt('isRTL') ? -1 : 1;
			var hoverListener = getHoverListener();
			var colCnt = getColCnt();
			var colWidth = getColWidth();
			var slotHeight = getSlotHeight();
			eventElement.draggable({
				zIndex: 9,
				scroll: false,
				grid: [colWidth, slotHeight],
				axis: colCnt==1 ? 'y' : false,
				opacity: opt('dragOpacity'),
				revertDuration: opt('dragRevertDuration'),
				start: function(ev, ui) {
					trigger('eventDragStart', eventElement, event, ev, ui);
					hideEvents(event, eventElement);
					origPosition = eventElement.position();
					minuteDelta = prevMinuteDelta = 0;
					hoverListener.start(function(cell, origCell, rowDelta, colDelta) {
						eventElement.draggable('option', 'revert', !cell);
						clearOverlays();
						if (cell) {
							dayDelta = colDelta * dis;
							if (opt('allDaySlot') && !cell.row) {
								// over full days
								if (!allDay) {
									// convert to temporary all-day event
									allDay = true;
									timeElement.hide();
									eventElement.draggable('option', 'grid', null);
								}
								renderDayOverlay(
									addDays(cloneDate(event.start), dayDelta),
									addDays(exclEndDay(event), dayDelta)
								);
							}else{
								// on slots
								resetElement();
							}
						}
					}, ev, 'drag');
				},
				drag: function(ev, ui) {
					minuteDelta = Math.round((ui.position.top - origPosition.top) / slotHeight) * opt('slotMinutes');
					if (minuteDelta != prevMinuteDelta) {
						if (!allDay) {
							updateTimeText(minuteDelta);
						}
						prevMinuteDelta = minuteDelta;
					}
				},
				stop: function(ev, ui) {
					var cell = hoverListener.stop();
					clearOverlays();
					trigger('eventDragStop', eventElement, event, ev, ui);
					if (cell && (dayDelta || minuteDelta || allDay)) {
						// changed!
						eventDrop(this, event, dayDelta, allDay ? 0 : minuteDelta, allDay, ev, ui);
					}else{
						// either no change or out-of-bounds (draggable has already reverted)
						resetElement();
						eventElement.css('filter', ''); // clear IE opacity side-effects
						eventElement.css(origPosition); // sometimes fast drags make event revert to wrong position
						updateTimeText(0);
						showEvents(event, eventElement);
					}
				}
			});
			function updateTimeText(minuteDelta) {
				var newStart = addMinutes(cloneDate(event.start), minuteDelta);
				var newEnd;
				if (event.end) {
					newEnd = addMinutes(cloneDate(event.end), minuteDelta);
				}
				timeElement.text(formatDates(newStart, newEnd, opt('timeFormat')));
			}
			function resetElement() {
				// convert back to original slot-event
				if (allDay) {
					timeElement.css('display', ''); // show() was causing display=inline
					eventElement.draggable('option', 'grid', [colWidth, slotHeight]);
					allDay = false;
				}
			}
		}
		
		
		
		/* Resizing
		--------------------------------------------------------------------------------------*/
		
		
		function resizableSlotEvent(event, eventElement, timeElement) {
			var slotDelta, prevSlotDelta;
			var slotHeight = getSlotHeight();
			eventElement.resizable({
				handles: {
					s: 'div.ui-resizable-s'
				},
				grid: slotHeight,
				start: function(ev, ui) {
					slotDelta = prevSlotDelta = 0;
					hideEvents(event, eventElement);
					eventElement.css('z-index', 9);
					trigger('eventResizeStart', this, event, ev, ui);
				},
				resize: function(ev, ui) {
					// don't rely on ui.size.height, doesn't take grid into account
					slotDelta = Math.round((Math.max(slotHeight, eventElement.height()) - ui.originalSize.height) / slotHeight);
					if (slotDelta != prevSlotDelta) {
						timeElement.text(
							formatDates(
								event.start,
								(!slotDelta && !event.end) ? null : // no change, so don't display time range
									addMinutes(eventEnd(event), opt('slotMinutes')*slotDelta),
								opt('timeFormat')
							)
						);
						prevSlotDelta = slotDelta;
					}
				},
				stop: function(ev, ui) {
					trigger('eventResizeStop', this, event, ev, ui);
					if (slotDelta) {
						eventResize(this, event, 0, opt('slotMinutes')*slotDelta, ev, ui);
					}else{
						eventElement.css('z-index', 8);
						showEvents(event, eventElement);
						// BUG: if event was really short, need to put title back in span
					}
				}
			});
		}
		
	
	}
	
	
	function countForwardSegs(levels) {
		var i, j, k, level, segForward, segBack;
		for (i=levels.length-1; i>0; i--) {
			level = levels[i];
			for (j=0; j<level.length; j++) {
				segForward = level[j];
				for (k=0; k<levels[i-1].length; k++) {
					segBack = levels[i-1][k];
					if (segsCollide(segForward, segBack)) {
						segBack.forward = Math.max(segBack.forward||0, (segForward.forward||0)+1);
					}
				}
			}
		}
	}
	
	
	
	
	function View(element, calendar, viewName) {
		var t = this;
		
		
		// exports
		t.element = element;
		t.calendar = calendar;
		t.name = viewName;
		t.opt = opt;
		t.trigger = trigger;
		//t.setOverflowHidden = setOverflowHidden;
		t.isEventDraggable = isEventDraggable;
		t.isEventResizable = isEventResizable;
		t.reportEvents = reportEvents;
		t.eventEnd = eventEnd;
		t.reportEventElement = reportEventElement;
		t.reportEventClear = reportEventClear;
		t.eventElementHandlers = eventElementHandlers;
		t.showEvents = showEvents;
		t.hideEvents = hideEvents;
		t.eventDrop = eventDrop;
		t.eventResize = eventResize;
		// t.title
		// t.start, t.end
		// t.visStart, t.visEnd
		
		
		// imports
		var defaultEventEnd = t.defaultEventEnd;
		var normalizeEvent = calendar.normalizeEvent; // in EventManager
		var reportEventChange = calendar.reportEventChange;
		
		
		// locals
		var eventsByID = {};
		var eventElements = [];
		var eventElementsByID = {};
		var options = calendar.options;
		
		
		
		function opt(name, viewNameOverride) {
			var v = options[name];
			if (typeof v == 'object') {
				return smartProperty(v, viewNameOverride || viewName);
			}
			return v;
		}
	
		
		function trigger(name, thisObj) {
			return calendar.trigger.apply(
				calendar,
				[name, thisObj || t].concat(Array.prototype.slice.call(arguments, 2), [t])
			);
		}
		
		
		/*
		function setOverflowHidden(bool) {
			element.css('overflow', bool ? 'hidden' : '');
		}
		*/
		
		
		function isEventDraggable(event) {
			return isEventEditable(event) && !opt('disableDragging');
	
		}
		
		
		function isEventResizable(event) { // but also need to make sure the seg.isEnd == true
			return isEventEditable(event) && !opt('disableResizing');
		}
		
		
		function isEventEditable(event) {
			return firstDefined(event.editable, (event.source || {}).editable, opt('editable'));
		}
		
		
		
		/* Event Data
		------------------------------------------------------------------------------*/
		
		
		// report when view receives new events
		function reportEvents(events) { // events are already normalized at this point
			eventsByID = {};
			var i, len=events.length, event;
			for (i=0; i<len; i++) {
				event = events[i];
				if (eventsByID[event._id]) {
					eventsByID[event._id].push(event);
				}else{
					eventsByID[event._id] = [event];
				}
			}
		}
		
		
		// returns a Date object for an event's end
		function eventEnd(event) {
			return event.end ? cloneDate(event.end) : defaultEventEnd(event);
		}
		
		
		
		/* Event Elements
		------------------------------------------------------------------------------*/
		
		
		// report when view creates an element for an event
		function reportEventElement(event, element) {
			eventElements.push(element);
			if (eventElementsByID[event._id]) {
				eventElementsByID[event._id].push(element);
			}else{
				eventElementsByID[event._id] = [element];
			}
		}
		
		
		function reportEventClear() {
			eventElements = [];
			eventElementsByID = {};
		}
		
		
		// attaches eventClick, eventMouseover, eventMouseout
		function eventElementHandlers(event, eventElement) {
			eventElement
				.click(function(ev) {
					if (!eventElement.hasClass('ui-draggable-dragging') &&
						!eventElement.hasClass('ui-resizable-resizing')) {
							return trigger('eventClick', this, event, ev);
						}
				})
				.hover(
					function(ev) {
						trigger('eventMouseover', this, event, ev);
					},
					function(ev) {
						trigger('eventMouseout', this, event, ev);
					}
				);
			// TODO: don't fire eventMouseover/eventMouseout *while* dragging is occuring (on subject element)
			// TODO: same for resizing
		}
		
		
		function showEvents(event, exceptElement) {
			eachEventElement(event, exceptElement, 'show');
		}
		
		
		function hideEvents(event, exceptElement) {
			eachEventElement(event, exceptElement, 'hide');
		}
		
		
		function eachEventElement(event, exceptElement, funcName) {
			var elements = eventElementsByID[event._id],
				i, len = elements.length;
			for (i=0; i<len; i++) {
				if (!exceptElement || elements[i][0] != exceptElement[0]) {
					elements[i][funcName]();
				}
			}
		}
		
		
		
		/* Event Modification Reporting
		---------------------------------------------------------------------------------*/
		
		
		function eventDrop(e, event, dayDelta, minuteDelta, allDay, ev, ui) {
			var oldAllDay = event.allDay;
			var eventId = event._id;
			moveEvents(eventsByID[eventId], dayDelta, minuteDelta, allDay);
			trigger(
				'eventDrop',
				e,
				event,
				dayDelta,
				minuteDelta,
				allDay,
				function() {
					// TODO: investigate cases where this inverse technique might not work
					moveEvents(eventsByID[eventId], -dayDelta, -minuteDelta, oldAllDay);
					reportEventChange(eventId);
				},
				ev,
				ui
			);
			reportEventChange(eventId);
		}
		
		
		function eventResize(e, event, dayDelta, minuteDelta, ev, ui) {
			var eventId = event._id;
			elongateEvents(eventsByID[eventId], dayDelta, minuteDelta);
			trigger(
				'eventResize',
				e,
				event,
				dayDelta,
				minuteDelta,
				function() {
					// TODO: investigate cases where this inverse technique might not work
					elongateEvents(eventsByID[eventId], -dayDelta, -minuteDelta);
					reportEventChange(eventId);
				},
				ev,
				ui
			);
			reportEventChange(eventId);
		}
		
		
		
		/* Event Modification Math
		---------------------------------------------------------------------------------*/
		
		
		function moveEvents(events, dayDelta, minuteDelta, allDay) {
			minuteDelta = minuteDelta || 0;
			for (var e, len=events.length, i=0; i<len; i++) {
				e = events[i];
				if (allDay !== undefined) {
					e.allDay = allDay;
				}
				addMinutes(addDays(e.start, dayDelta, true), minuteDelta);
				if (e.end) {
					e.end = addMinutes(addDays(e.end, dayDelta, true), minuteDelta);
				}
				normalizeEvent(e, options);
			}
		}
		
		
		function elongateEvents(events, dayDelta, minuteDelta) {
			minuteDelta = minuteDelta || 0;
			for (var e, len=events.length, i=0; i<len; i++) {
				e = events[i];
				e.end = addMinutes(addDays(eventEnd(e), dayDelta, true), minuteDelta);
				normalizeEvent(e, options);
			}
		}
		
	
	}
	
	function DayEventRenderer() {
		var t = this;
	
		
		// exports
		t.renderDaySegs = renderDaySegs;
		t.resizableDayEvent = resizableDayEvent;
		
		
		// imports
		var opt = t.opt;
		var trigger = t.trigger;
		var isEventDraggable = t.isEventDraggable;
		var isEventResizable = t.isEventResizable;
		var eventEnd = t.eventEnd;
		var reportEventElement = t.reportEventElement;
		var showEvents = t.showEvents;
		var hideEvents = t.hideEvents;
		var eventResize = t.eventResize;
		var getRowCnt = t.getRowCnt;
		var getColCnt = t.getColCnt;
		var getColWidth = t.getColWidth;
		var allDayRow = t.allDayRow;
		var allDayBounds = t.allDayBounds;
		var colContentLeft = t.colContentLeft;
		var colContentRight = t.colContentRight;
		var dayOfWeekCol = t.dayOfWeekCol;
		var dateCell = t.dateCell;
		var compileDaySegs = t.compileDaySegs;
		var getDaySegmentContainer = t.getDaySegmentContainer;
		var bindDaySeg = t.bindDaySeg; //TODO: streamline this
		var formatDates = t.calendar.formatDates;
		var renderDayOverlay = t.renderDayOverlay;
		var clearOverlays = t.clearOverlays;
		var clearSelection = t.clearSelection;
		
		
		
		/* Rendering
		-----------------------------------------------------------------------------*/
		
		
		function renderDaySegs(segs, modifiedEventId) {
			var segmentContainer = getDaySegmentContainer();
			var rowDivs;
			var rowCnt = getRowCnt();
			var colCnt = getColCnt();
			var i = 0;
			var rowI;
			var levelI;
			var colHeights;
			var j;
			var segCnt = segs.length;
			var seg;
			var top;
			var k;
			segmentContainer[0].innerHTML = daySegHTML(segs); // faster than .html()
			daySegElementResolve(segs, segmentContainer.children());
			daySegElementReport(segs);
			daySegHandlers(segs, segmentContainer, modifiedEventId);
			daySegCalcHSides(segs);
			daySegSetWidths(segs);
			daySegCalcHeights(segs);
			rowDivs = getRowDivs();
			// set row heights, calculate event tops (in relation to row top)
			for (rowI=0; rowI<rowCnt; rowI++) {
				levelI = 0;
				colHeights = [];
				for (j=0; j<colCnt; j++) {
					colHeights[j] = 0;
				}
				while (i<segCnt && (seg = segs[i]).row == rowI) {
					// loop through segs in a row
					top = arrayMax(colHeights.slice(seg.startCol, seg.endCol));
					seg.top = top;
					top += seg.outerHeight;
					for (k=seg.startCol; k<seg.endCol; k++) {
						colHeights[k] = top;
					}
					i++;
				}
				rowDivs[rowI].height(arrayMax(colHeights));
			}
			daySegSetTops(segs, getRowTops(rowDivs));
		}
		
		
		function renderTempDaySegs(segs, adjustRow, adjustTop) {
			var tempContainer = $("<div/>");
			var elements;
			var segmentContainer = getDaySegmentContainer();
			var i;
			var segCnt = segs.length;
			var element;
			tempContainer[0].innerHTML = daySegHTML(segs); // faster than .html()
			elements = tempContainer.children();
			segmentContainer.append(elements);
			daySegElementResolve(segs, elements);
			daySegCalcHSides(segs);
			daySegSetWidths(segs);
			daySegCalcHeights(segs);
			daySegSetTops(segs, getRowTops(getRowDivs()));
			elements = [];
			for (i=0; i<segCnt; i++) {
				element = segs[i].element;
				if (element) {
					if (segs[i].row === adjustRow) {
						element.css('top', adjustTop);
					}
					elements.push(element[0]);
				}
			}
			return $(elements);
		}
		
		
		function daySegHTML(segs) { // also sets seg.left and seg.outerWidth
			var rtl = opt('isRTL');
			var i;
			var segCnt=segs.length;
			var seg;
			var event;
			var url;
			var classes;
			var bounds = allDayBounds();
			var minLeft = bounds.left;
			var maxLeft = bounds.right;
			var leftCol;
			var rightCol;
			var left;
			var right;
			var skinCss;
			var html = '';
			// calculate desired position/dimensions, create html
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				event = seg.event;
				classes = ['fc-event', 'fc-event-skin', 'fc-event-hori'];
				if (isEventDraggable(event)) {
					classes.push('fc-event-draggable');
				}
				if (rtl) {
					if (seg.isStart) {
						classes.push('fc-corner-right');
					}
					if (seg.isEnd) {
						classes.push('fc-corner-left');
					}
					leftCol = dayOfWeekCol(seg.end.getDay()-1);
					rightCol = dayOfWeekCol(seg.start.getDay());
					left = seg.isEnd ? colContentLeft(leftCol) : minLeft;
					right = seg.isStart ? colContentRight(rightCol) : maxLeft;
				}else{
					if (seg.isStart) {
						classes.push('fc-corner-left');
					}
					if (seg.isEnd) {
						classes.push('fc-corner-right');
					}
					leftCol = dayOfWeekCol(seg.start.getDay());
					rightCol = dayOfWeekCol(seg.end.getDay()-1);
					left = seg.isStart ? colContentLeft(leftCol) : minLeft;
					right = seg.isEnd ? colContentRight(rightCol) : maxLeft;
				}
				classes = classes.concat(event.className);
				if (event.source) {
					classes = classes.concat(event.source.className || []);
				}
				url = event.url;
				skinCss = getSkinCss(event, opt);
				if (url) {
					html += "<a href='" + htmlEscape(url) + "'";
				}else{
					html += "<div";
				}
				html +=
					" class='" + classes.join(' ') + "'" +
					" style='position:absolute;z-index:8;left:"+left+"px;" + skinCss + "'" +
					">" +
					"<div" +
					" class='fc-event-inner fc-event-skin'" +
					(skinCss ? " style='" + skinCss + "'" : '') +
					">";
				if (!event.allDay && seg.isStart) {
					html +=
						"<span class='fc-event-time'>" +
						htmlEscape(formatDates(event.start, event.end, opt('timeFormat'))) +
						"</span>";
				}
				html +=
					"<span class='fc-event-title'>" + htmlEscape(event.title) + "</span>" +
					"</div>";
				if (seg.isEnd && isEventResizable(event)) {
					html +=
						"<div class='ui-resizable-handle ui-resizable-" + (rtl ? 'w' : 'e') + "'>" +
						"&nbsp;&nbsp;&nbsp;" + // makes hit area a lot better for IE6/7
						"</div>";
				}
				html +=
					"</" + (url ? "a" : "div" ) + ">";
				seg.left = left;
				seg.outerWidth = right - left;
				seg.startCol = leftCol;
				seg.endCol = rightCol + 1; // needs to be exclusive
			}
			return html;
		}
		
		
		function daySegElementResolve(segs, elements) { // sets seg.element
			var i;
			var segCnt = segs.length;
			var seg;
			var event;
			var element;
			var triggerRes;
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				event = seg.event;
				element = $(elements[i]); // faster than .eq()
				triggerRes = trigger('eventRender', event, event, element);
				if (triggerRes === false) {
					element.remove();
				}else{
					if (triggerRes && triggerRes !== true) {
						triggerRes = $(triggerRes)
							.css({
								position: 'absolute',
								left: seg.left
							});
						element.replaceWith(triggerRes);
						element = triggerRes;
					}
					seg.element = element;
				}
			}
		}
		
		
		function daySegElementReport(segs) {
			var i;
			var segCnt = segs.length;
			var seg;
			var element;
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				element = seg.element;
				if (element) {
					reportEventElement(seg.event, element);
				}
			}
		}
		
		
		function daySegHandlers(segs, segmentContainer, modifiedEventId) {
			var i;
			var segCnt = segs.length;
			var seg;
			var element;
			var event;
			// retrieve elements, run through eventRender callback, bind handlers
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				element = seg.element;
				if (element) {
					event = seg.event;
					if (event._id === modifiedEventId) {
						bindDaySeg(event, element, seg);
					}else{
						element[0]._fci = i; // for lazySegBind
					}
				}
			}
			lazySegBind(segmentContainer, segs, bindDaySeg);
		}
		
		
		function daySegCalcHSides(segs) { // also sets seg.key
			var i;
			var segCnt = segs.length;
			var seg;
			var element;
			var key, val;
			var hsideCache = {};
			// record event horizontal sides
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				element = seg.element;
				if (element) {
					key = seg.key = cssKey(element[0]);
					val = hsideCache[key];
					if (val === undefined) {
						val = hsideCache[key] = hsides(element, true);
					}
					seg.hsides = val;
				}
			}
		}
		
		
		function daySegSetWidths(segs) {
			var i;
			var segCnt = segs.length;
			var seg;
			var element;
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				element = seg.element;
				if (element) {
					element[0].style.width = Math.max(0, seg.outerWidth - seg.hsides) + 'px';
				}
			}
		}
		
		
		function daySegCalcHeights(segs) {
			var i;
			var segCnt = segs.length;
			var seg;
			var element;
			var key, val;
			var vmarginCache = {};
			// record event heights
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				element = seg.element;
				if (element) {
					key = seg.key; // created in daySegCalcHSides
					val = vmarginCache[key];
					if (val === undefined) {
						val = vmarginCache[key] = vmargins(element);
					}
					seg.outerHeight = element[0].offsetHeight + val;
				}
			}
		}
		
		
		function getRowDivs() {
			var i;
			var rowCnt = getRowCnt();
			var rowDivs = [];
			for (i=0; i<rowCnt; i++) {
				rowDivs[i] = allDayRow(i)
					.find('td:first div.fc-day-content > div'); // optimal selector?
			}
			return rowDivs;
		}
		
		
		function getRowTops(rowDivs) {
			var i;
			var rowCnt = rowDivs.length;
			var tops = [];
			for (i=0; i<rowCnt; i++) {
				tops[i] = rowDivs[i][0].offsetTop; // !!?? but this means the element needs position:relative if in a table cell!!!!
			}
			return tops;
		}
		
		
		function daySegSetTops(segs, rowTops) { // also triggers eventAfterRender
			var i;
			var segCnt = segs.length;
			var seg;
			var element;
			var event;
			for (i=0; i<segCnt; i++) {
				seg = segs[i];
				element = seg.element;
				if (element) {
					element[0].style.top = rowTops[seg.row] + (seg.top||0) + 'px';
					event = seg.event;
					trigger('eventAfterRender', event, event, element);
				}
			}
		}
		
		
		
		/* Resizing
		-----------------------------------------------------------------------------------*/
		
		
		function resizableDayEvent(event, element, seg) {
			var rtl = opt('isRTL');
			var direction = rtl ? 'w' : 'e';
			var handle = element.find('div.ui-resizable-' + direction);
			var isResizing = false;
			
			// TODO: look into using jquery-ui mouse widget for this stuff
			disableTextSelection(element); // prevent native <a> selection for IE
			element
				.mousedown(function(ev) { // prevent native <a> selection for others
					ev.preventDefault();
				})
				.click(function(ev) {
					if (isResizing) {
						ev.preventDefault(); // prevent link from being visited (only method that worked in IE6)
						ev.stopImmediatePropagation(); // prevent fullcalendar eventClick handler from being called
													   // (eventElementHandlers needs to be bound after resizableDayEvent)
					}
				});
			
			handle.mousedown(function(ev) {
				if (ev.which != 1) {
					return; // needs to be left mouse button
				}
				isResizing = true;
				var hoverListener = t.getHoverListener();
				var rowCnt = getRowCnt();
				var colCnt = getColCnt();
				var dis = rtl ? -1 : 1;
				var dit = rtl ? colCnt-1 : 0;
				var elementTop = element.css('top');
				var dayDelta;
				var helpers;
				var eventCopy = $.extend({}, event);
				var minCell = dateCell(event.start);
				clearSelection();
				$('body')
					.css('cursor', direction + '-resize')
					.one('mouseup', mouseup);
				trigger('eventResizeStart', this, event, ev);
				hoverListener.start(function(cell, origCell) {
					if (cell) {
						var r = Math.max(minCell.row, cell.row);
						var c = cell.col;
						if (rowCnt == 1) {
							r = 0; // hack for all-day area in agenda views
						}
						if (r == minCell.row) {
							if (rtl) {
								c = Math.min(minCell.col, c);
							}else{
								c = Math.max(minCell.col, c);
							}
						}
						dayDelta = (r*7 + c*dis+dit) - (origCell.row*7 + origCell.col*dis+dit);
						var newEnd = addDays(eventEnd(event), dayDelta, true);
						if (dayDelta) {
							eventCopy.end = newEnd;
							var oldHelpers = helpers;
							helpers = renderTempDaySegs(compileDaySegs([eventCopy]), seg.row, elementTop);
							helpers.find('*').css('cursor', direction + '-resize');
							if (oldHelpers) {
								oldHelpers.remove();
							}
							hideEvents(event);
						}else{
							if (helpers) {
								showEvents(event);
								helpers.remove();
								helpers = null;
							}
						}
						clearOverlays();
						renderDayOverlay(event.start, addDays(cloneDate(newEnd), 1)); // coordinate grid already rebuild at hoverListener.start
					}
				}, ev);
				
				function mouseup(ev) {
					trigger('eventResizeStop', this, event, ev);
					$('body').css('cursor', '');
					hoverListener.stop();
					clearOverlays();
					if (dayDelta) {
						eventResize(this, event, dayDelta, 0, ev);
						// event redraw will clear helpers
					}
					// otherwise, the drag handler already restored the old events
					
					setTimeout(function() { // make this happen after the element's click event
						isResizing = false;
					},0);
				}
				
			});
		}
		
	
	}
	
	//BUG: unselect needs to be triggered when events are dragged+dropped
	
	function SelectionManager() {
		var t = this;
		
		
		// exports
		t.select = select;
		t.unselect = unselect;
		t.reportSelection = reportSelection;
		t.daySelectionMousedown = daySelectionMousedown;
		
		
		// imports
		var opt = t.opt;
		var trigger = t.trigger;
		var defaultSelectionEnd = t.defaultSelectionEnd;
		var renderSelection = t.renderSelection;
		var clearSelection = t.clearSelection;
		
		
		// locals
		var selected = false;
	
	
	
		// unselectAuto
		if (opt('selectable') && opt('unselectAuto')) {
			$(document).mousedown(function(ev) {
				var ignore = opt('unselectCancel');
				if (ignore) {
					if ($(ev.target).parents(ignore).length) { // could be optimized to stop after first match
						return;
					}
				}
				unselect(ev);
			});
		}
		
	
		function select(startDate, endDate, allDay) {
			unselect();
			if (!endDate) {
				endDate = defaultSelectionEnd(startDate, allDay);
			}
			renderSelection(startDate, endDate, allDay);
			reportSelection(startDate, endDate, allDay);
		}
		
		
		function unselect(ev) {
			if (selected) {
				selected = false;
				clearSelection();
				trigger('unselect', null, ev);
			}
		}
		
		
		function reportSelection(startDate, endDate, allDay, ev) {
			selected = true;
			trigger('select', null, startDate, endDate, allDay, ev);
		}
		
		
		function daySelectionMousedown(ev) { // not really a generic manager method, oh well
			var cellDate = t.cellDate;
			var cellIsAllDay = t.cellIsAllDay;
			var hoverListener = t.getHoverListener();
			var reportDayClick = t.reportDayClick; // this is hacky and sort of weird
			if (ev.which == 1 && opt('selectable')) { // which==1 means left mouse button
				unselect(ev);
				var _mousedownElement = this;
				var dates;
				hoverListener.start(function(cell, origCell) { // TODO: maybe put cellDate/cellIsAllDay info in cell
					clearSelection();
					if (cell && cellIsAllDay(cell)) {
						dates = [ cellDate(origCell), cellDate(cell) ].sort(cmp);
						renderSelection(dates[0], dates[1], true);
					}else{
						dates = null;
					}
				}, ev);
				$(document).one('mouseup', function(ev) {
					hoverListener.stop();
					if (dates) {
						if (+dates[0] == +dates[1]) {
							reportDayClick(dates[0], true, ev);
						}
						reportSelection(dates[0], dates[1], true, ev);
					}
				});
			}
		}
	
	
	}
	 
	function OverlayManager() {
		var t = this;
		
		
		// exports
		t.renderOverlay = renderOverlay;
		t.clearOverlays = clearOverlays;
		
		
		// locals
		var usedOverlays = [];
		var unusedOverlays = [];
		
		
		function renderOverlay(rect, parent) {
			var e = unusedOverlays.shift();
			if (!e) {
				e = $("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>");
			}
			if (e[0].parentNode != parent[0]) {
				e.appendTo(parent);
			}
			usedOverlays.push(e.css(rect).show());
			return e;
		}
		
	
		function clearOverlays() {
			var e;
			while (e = usedOverlays.shift()) {
				unusedOverlays.push(e.hide().unbind());
			}
		}
	
	
	}
	
	function CoordinateGrid(buildFunc) {
	
		var t = this;
		var rows;
		var cols;
		
		
		t.build = function() {
			rows = [];
			cols = [];
			buildFunc(rows, cols);
		};
		
		
		t.cell = function(x, y) {
			var rowCnt = rows.length;
			var colCnt = cols.length;
			var i, r=-1, c=-1;
			for (i=0; i<rowCnt; i++) {
				if (y >= rows[i][0] && y < rows[i][1]) {
					r = i;
					break;
				}
			}
			for (i=0; i<colCnt; i++) {
				if (x >= cols[i][0] && x < cols[i][1]) {
					c = i;
					break;
				}
			}
			return (r>=0 && c>=0) ? { row:r, col:c } : null;
		};
		
		
		t.rect = function(row0, col0, row1, col1, originElement) { // row1,col1 is inclusive
			var origin = originElement.offset();
			return {
				top: rows[row0][0] - origin.top,
				left: cols[col0][0] - origin.left,
				width: cols[col1][1] - cols[col0][0],
				height: rows[row1][1] - rows[row0][0]
			};
		};
	
	}
	
	function HoverListener(coordinateGrid) {
	
	
		var t = this;
		var bindType;
		var change;
		var firstCell;
		var cell;
		
		
		t.start = function(_change, ev, _bindType) {
			change = _change;
			firstCell = cell = null;
			coordinateGrid.build();
			mouse(ev);
			bindType = _bindType || 'mousemove';
			$(document).bind(bindType, mouse);
		};
		
		
		function mouse(ev) {
			var newCell = coordinateGrid.cell(ev.pageX, ev.pageY);
			if (!newCell != !cell || newCell && (newCell.row != cell.row || newCell.col != cell.col)) {
				if (newCell) {
					if (!firstCell) {
						firstCell = newCell;
					}
					change(newCell, firstCell, newCell.row-firstCell.row, newCell.col-firstCell.col);
				}else{
					change(newCell, firstCell);
				}
				cell = newCell;
			}
		}
		
		
		t.stop = function() {
			$(document).unbind(bindType, mouse);
			return cell;
		};
		
		
	}
	
	function HorizontalPositionCache(getElement) {
	
		var t = this,
			elements = {},
			lefts = {},
			rights = {};
			
		function e(i) {
			return elements[i] = elements[i] || getElement(i);
		}
		
		t.left = function(i) {
			return lefts[i] = lefts[i] === undefined ? e(i).position().left : lefts[i];
		};
		
		t.right = function(i) {
			return rights[i] = rights[i] === undefined ? t.left(i) + e(i).width() : rights[i];
		};
		
		t.clear = function() {
			elements = {};
			lefts = {};
			rights = {};
		};
		
	}
	
	})(jQuery);
	
	
/*
 * FullCalendar v1.5.1 Google Calendar Plugin
 *
 * Copyright (c) 2011 Adam Shaw
 * Dual licensed under the MIT and GPL licenses, located in
 * MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
 *
 * Date: Sat Apr 9 14:09:51 2011 -0700
 *
 */
 
(function($) {


var fc = $.fullCalendar;
var formatDate = fc.formatDate;
var parseISO8601 = fc.parseISO8601;
var addDays = fc.addDays;
var applyAll = fc.applyAll;


fc.sourceNormalizers.push(function(sourceOptions) {
	if (sourceOptions.dataType == 'gcal' ||
		sourceOptions.dataType === undefined &&
		(sourceOptions.url || '').match(/^(http|https):\/\/www.google.com\/calendar\/feeds\//)) {
			sourceOptions.dataType = 'gcal';
			if (sourceOptions.editable === undefined) {
				sourceOptions.editable = false;
			}
		}
});


fc.sourceFetchers.push(function(sourceOptions, start, end) {
	if (sourceOptions.dataType == 'gcal') {
		return transformOptions(sourceOptions, start, end);
	}
});


function transformOptions(sourceOptions, start, end) {

	var success = sourceOptions.success;
	var data = $.extend({}, sourceOptions.data || {}, {
		'start-min': formatDate(start, 'u'),
		'start-max': formatDate(end, 'u'),
		'singleevents': true,
		'max-results': 9999
	});
	
	var ctz = sourceOptions.currentTimezone;
	if (ctz) {
		data.ctz = ctz = ctz.replace(' ', '_');
	}

	return $.extend({}, sourceOptions, {
		url: sourceOptions.url.replace(/\/basic$/, '/full') + '?alt=json-in-script&callback=?',
		dataType: 'jsonp',
		data: data,
		startParam: false,
		endParam: false,
		success: function(data) {
			var events = [];
			if (data.feed.entry) {
				$.each(data.feed.entry, function(i, entry) {
					var startStr = entry['gd$when'][0]['startTime'];
					var start = parseISO8601(startStr, true);
					var end = parseISO8601(entry['gd$when'][0]['endTime'], true);
					var allDay = startStr.indexOf('T') == -1;
					var url;
					$.each(entry.link, function(i, link) {
						if (link.type == 'text/html') {
							url = link.href;
							if (ctz) {
								url += (url.indexOf('?') == -1 ? '?' : '&') + 'ctz=' + ctz;
							}
						}
					});
					if (allDay) {
						addDays(end, -1); // make inclusive
					}
					events.push({
						id: entry['gCal$uid']['value'],
						title: entry['title']['$t'],
						url: url,
						start: start,
						end: end,
						allDay: allDay,
						location: entry['gd$where'][0]['valueString'],
						description: entry['content']['$t']
					});
				});
			}
			var args = [events].concat(Array.prototype.slice.call(arguments, 1));
			var res = applyAll(success, this, args);
			if ($.isArray(res)) {
				return res;
			}
			return events;
		}
	});
	
}


// legacy
fc.gcalFeed = function(url, sourceOptions) {
	return $.extend({}, sourceOptions, { url: url, dataType: 'gcal' });
};


})(jQuery);
	
	
	
});