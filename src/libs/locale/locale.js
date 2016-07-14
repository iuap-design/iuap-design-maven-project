/* ========================================================================
 * UUI: locale.js v1.0.0
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */
+ function(factory) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"moment",
			"i18next"
		], factory);
	} else {
		// Browser globals
		factory(jQuery, moment, i18n, this);
	}
}(function($, moment, i18n, exports) {
	'use strict';
	var time = {};
	var formatterPool = {};
	var formatter = {}
		/**
		 * 转换为服务器端时间戳
		 * @param {Object} t 输入的时间字符串
		 * @param {Object} format 输入格式
		 * @return {Number} 服务器端时间戳
		 */
	time.toServerTimespan = function(t, format) {
		var offset = iweb.Core.getEnvironment().timezoneOffset - iweb.Core.getSystemTimeZoneOffset();
		return moment(t, format).add(offset, "m").format("x")
	}


	/**
	 * 转换为服务器端时间
	 * @param {Object} t 输入的时间字符串
	 * @param {Object} format  输入格式
	 * @param {Object} format  输出格式
	 * @return {Object} 服务器端时间
	 */
	time.toServerDateTime = function(t, format, destFormat) {
		!destFormat && (destFormat = format);
		var offset = iweb.Core.getEnvironment().timezoneOffset - iweb.Core.getSystemTimeZoneOffset();
		return moment(t, format).add(offset, "m").format(format)
	}

	/**
	 * 转换为客户端端时间
	 * @param {Object} t 输入的时间字符串
	 * @param {Object} format  输入/输出格式
	 * @return {Object} 客户端时间
	 */
	time.toClientDateTime = function(t, format) {
		var offset = iweb.Core.getSystemTimeZoneOffset() - iweb.Core.getEnvironment().timezoneOffset;
		return moment(t, format).add(offset, "m").format(format)
	}



	/**
	 * 注册格式化信息
	 * @param {Object} type 格式化类型 [number,percent,currency,datetime,date,time]
	 * @param {Object} masker 格式化信息 [NumberMasker,PrecentMasker,CurrencyMasker,DateTimeMasker,DateMasker,TimeMasker]
	 */
	formatter.registerFormatter = function(type, formatter) {
		formatterPool[type] = formatter;
	}

	/**
	 * 获取格式化信息
	 * @param {Object} type  格式化类型 [number,percent,currency,datetime,date,time]
	 * @return {Object}  格式化信息 [NumberMasker,PrecentMasker,CurrencyMasker,DateTimeMasker,DateMasker,TimeMasker]
	 */
	formatter.getFormatter = function(type) {
		return createShellObject(formatterPool[type]);
	}

	/**
		$(document.body).bind("localeChange",function(){
			//TODO 修改i18next 中的资源.修改
		})
	**/


	if (exports) {
		exports.time = time
		exports.formatter = formatter
	} else {
		return {
			time: time,
			formatter: formatter
		}
	}

});