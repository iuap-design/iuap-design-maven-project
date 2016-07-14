var fs = require('fs');
var curPath = process.cwd();
var path = require('path');

module.exports = {

	/**
	 * 文件处理入口
	 * @return {[type]} [description]
	 */

	//头部增加内容
	uui_header_content : '( function( factory ) {\r\n' +
		'\tif ( typeof define === "function" && define.amd ) {\r\n' +
		'\t\t// AMD. Register as an anonymous module.\r\n' +
		'\t\tdefine(["jquery"], factory );\r\n' +
		'\t} else {\r\n' +
		'\t\t// Browser globals\r\n' +
		'\t\tfactory($, ko);\r\n' +
		'\t}\r\n' +
		'}( function($, ko) {\r\n',
		
	biz_header_content : '( function( factory ) {\r\n' +
		'\tif ( typeof define === "function" && define.amd ) {\r\n' +
		'\t\t// AMD. Register as an anonymous module.\r\n' +
		'\t\tdefine(["jquery", "knockout"], factory );\r\n' +
		'\t} else {\r\n' +
		'\t\t// Browser globals\r\n' +
		'\t\tfactory($, ko);\r\n' +
		'\t}\r\n' +
		'}( function($, ko) {\r\n',

	//尾部增加内容	
	footer_content : '}));',

	uui_files:[
		'../dist/js/u.js'
	],
	biz_files : [
		'./dist/origin/js/u.biz.js',
		'./dist/js/biz/biz-only.js'
	],

	init: function() {
//		for (var i = 0; i< this.uui_files.length; i++){
//			var filePath = this.uui_files[i]
//			var data = fs.readFileSync(filePath, 'utf8');
//			data = this.uui_header_content  + data + this.footer_content;
//			fs.writeFileSync(filePath, data);
//		}
		
		for (var i = 0; i< this.biz_files.length; i++){
			var filePath = this.biz_files[i]
			var data = fs.readFileSync(filePath, 'utf8');
			data = this.biz_header_content  + data + this.footer_content;
			fs.writeFileSync(filePath, data);
		}
	},
	
};