/**
 * jQuery.tabUI
 * using jQuery JavaScript Framework
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.1
 * @since      2011-09-14 17:57:34
 * @update     2011-10-16 15:20:25
 */

(function($) {

$.fn.tabUI = function (options) {
	var opt = (options) ? options : {};
	opt.element = this;
	this.data('tabUI', new TabUI(opt));
	return this;
};
function TabUI() {
	$.extend(this, this.defaultOptions, arguments[0]);
	this._create();
}
TabUI.prototype = {
	defaultOptions: {
		element: {},
		classNamePostfix: '',
		onClassName: 'on',
		offClassName: 'off',
		defaultIndex: 0
	},
	_create: function () {
		var self = this;
		this.targets = [];
		// process to change contents
		this.element.each(function (i, tab) {
			self._initTab($(tab));
		});
		this.targets[this.defaultIndex].show();
		this.element.click(function (e) {
			var $this = $(this);
			$.each(self.targets, function (i, target) {
				if (target != $this) {
					target.hide();
				}
			});
			self._show($this.data('target'), container);
			e.preventDefault();
		});

		// process to change tab status
		this.element.each(function (i, tab) {
			self._initTabStyle($(tab));
		});

		// for change effect
		var container = this.targets[0].parent();
		container.css({
			overflow: 'hidden',
			height: container.height()
		});
	},

	_initTab: function (tab) {
		var targetId = tab.attr('href');
		targetId = targetId.slice(targetId.lastIndexOf('#'));
		var target = $(targetId).hide();
		this.targets.push(target);
		tab.data('target', target);
	},

	/**
	 * functions to change tab status
	 */
	_initTabStyle: function (tab) {
		var self = this,
			orgClassName = tab[0].className,
			newClassName = this._addPostfix(orgClassName);

		this.element.click(function (e) {
			var clickedTab = this;
			self.element.each(function (i, tab) {
				if (clickedTab === tab) {
					tab.className = self._addPostfix(tab.className);
				} else {
					tab.className = self._removePostfix(tab.className);
				}
			});
		});
	},

	/**
	 * function to change effect
	 */
	_show: function (element, container) {
		element.css('visibility', 'hidden').show();
		container.animate({
			height: element.outerHeight()
		}, function() {
			element.hide().css('visibility', 'visible').fadeIn();
		});
	},

	/**
	 * functions for postfix
	 */
	_addPostfix: function (className) {
		var self = this,
			postfix = self.classNamePostfix,
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
			postfix = self.classNamePostfix,
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
