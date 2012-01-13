/**
 * jQuery.tabUI
 * using jQuery JavaScript Framework
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.3.1
 * @since      2011-09-14 17:57:34
 */

(function($) {

$.fn.tabUI = function (options) {
	var opt = options || {};
	opt.element = this;
	if (this[0]) { this.data('tabUI', new TabUI(opt)); }
	return this;
};
function TabUI() {
	this.options = {};
	$.extend(this.options, this.defaultOptions, arguments[0]);
	this.element = this.options.element;
	this._create();
}
TabUI.prototype = {
	defaultOptions: {
		element: {},
		classNamePostfix: '',
		onClassName: 'on',
		offClassName: 'off',
		defaultIndex: 0,
		effect: true
	},
	_create: function () {
		var self = this;
		this.targets = [];
		// process to change contents
		this.element.each(function (i, tab) {
			self._initTab($(tab));
		});
		this.container = this.targets[0].parent();

		// initial content
		var defaultTarget = this.targets[this.options.defaultIndex];
		var defaultTab = this.element[this.options.defaultIndex];
		defaultTarget.show();
		defaultTab.className = this._addPostfix(defaultTab.className);
		this.element.each(function (i, tab) {
			if (i === self.options.defaultIndex) {
				$(tab).addClass(self.options.onClassName);
			} else {
				$(tab).addClass(self.options.offClassName);
			}
		});
		self._bindEvent();
		self._watchURI();
	},

	_initTab: function (tab) {
		var targetId = tab.attr('href');
		targetId = targetId.slice(targetId.lastIndexOf('#'));
		var target = $(targetId).hide();
		this.targets.push(target);
		tab.data('target', target);
	},

	_bindEvent: function () {
		var self = this;
		this.element.click(function (e) {
			var clickedTab = this;
			if (self.container.is(':animated')) {
				// animation is in progress
				return false;
			}
			self._show(clickedTab);
			self._switchTab(clickedTab);
			e.preventDefault();
		});
	},

	_switchTab: function (clickedTab) {
		var self = this;
		this.element.each(function (i, tab) {
			$(tab).removeClass(self.options.offClassName).removeClass(self.options.onClassName);
			if (clickedTab === tab) {
				tab.className = self._addPostfix(tab.className);
				$(tab).addClass(self.options.onClassName);
			} else {
				tab.className = self._removePostfix(tab.className);
				$(tab).addClass(self.options.offClassName);
			}
		});
	},

	_show: function (clickedTab) {
		var self = this;
		var target = $(clickedTab).data('target');
		var currentHeight = this.container.height(); // save height
		if (!target) { return; }
		$.each(this.targets, function () {
			if (target != this) {
				this.hide();
			} else {
				this.css('visibility', 'hidden').show();
			}
		});
		if (this.options.effect) {
			// with effect
			this.container.stop(true, true).css({
				overflow: 'hidden',
				height: currentHeight 
			}).animate({
				height: target.outerHeight()
			}, 500, function() {
				target.hide().css('visibility', 'visible').fadeIn();
				self.container.css({
					overflow: '',
					height: ''
				});
			});
		} else {
			// no effect
			target.css('visibility', 'visible');
		}
	},

	_watchURI: function () {
		var self = this;
		// initial hash modulation
		var targetTab = this._getTargetTabFromURI(location.href);
		if (targetTab) {
			this._show(targetTab);
			this._switchTab(targetTab);
		}
	},

	_getTargetTabFromURI: function (uri) {
		var targetTab;
		var hash = "";
		var hashRegExp = /#[a-zA-Z0-9\-_]+$/;
		if (hashRegExp.test(uri)) {
			hash = uri.slice(uri.search(hashRegExp));
			$.each(this.element, function () {
				if (hash === this.href.slice(this.href.search(hashRegExp))) {
					targetTab = this;
				}
			});
			return targetTab;
		} else {
			return false;
		}
	},

	/**
	 * functions for postfix
	 */
	_addPostfix: function (className) {
		var self = this,
			postfix = self.options.classNamePostfix,
			textArray = className.split(/\s/);
		$.each(textArray, function (i, text) {
			// prevent double postfix
			var endText = text.slice(text.lastIndexOf(postfix));
			if (endText != postfix) {
				// add postfix
				text = text + postfix;
			}
			textArray[i] = text;
		});
		return textArray.join(' ');
	},
	_removePostfix: function (className) {
		var self = this,
			postfix = self.options.classNamePostfix,
			textArray = className.split(/\s/);
		$.each(textArray, function (i, text) {
			var postfixPos = text.lastIndexOf(postfix);
			if (postfixPos != -1) {
				// remove postfix
				text = text.slice(0, postfixPos);
			}
			textArray[i] = text;
		});
		return textArray.join(' ');
	}
};

})(jQuery);
