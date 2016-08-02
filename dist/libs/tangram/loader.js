/**
 * 加载模块
 */
+ function(window, document) {
	var links = document.getElementsByTagName("link");
	var requireLibs = ['jquery', "knockout"];
	var trangrams = [];
	for (var i = 0, len = links.length; i < len; i++) {
		var link = links[i];
		if ("text/tangram" == link.getAttribute("type")) {
			var name = link.getAttribute("name");
			//pos
			document.createElement(name);
			var tm = {};
			tm.name = name;
			tm.url = link.getAttribute("url");
			tm.deps = link.getAttribute("deps").split(",");
			trangrams.push(tm);
		}
	}
	/**
	 * 初始化KO components
	 */
	require(requireLibs, function($, ko) {
		for (var i = 0, len = trangrams.length; i < len; i++) {
			var tm = trangrams[i];
			var name = tm.name;
			var urlMeta = tm.url.split("?");
			var url = urlMeta[0];

			var query = (urlMeta.length > 1) ? ("?" + urlMeta[1]) : "";
			ko.components.register(name, {
				viewModel: {
					require: url
				},
				template: {
					require: 'text!' + url + '.html' + query
				}
			});
		}


		window.tangram = {
			register: function(name, url, callback) {
				var allready = false;
				var tm = {
					name: name,
					url: url
				};
				for (var i = 0, len = trangrams.length; i < len; i++) {
					var tm = trangrams[i];
					var tmname = tm.name;
					if (name === tmname) {
						allready = true;
						break;
					}
				}
				if (!allready) {
					trangrams.push(tm);
					if(url){
						var urlMeta = url.split("?");
						url = urlMeta[0];
						var query = (urlMeta.length > 1) ? ("?" + urlMeta[1]) : "";
						$.ajax({
							url: url + '.xml' + query,
							type: "GET",
							dataType: "xml",
							async: false,
							timeout: 2000,
							error: function(xml) {
								alert('Error loading  Component  document');
							},
							success: function(xml) {
								var script = $(xml).find("script").text();
								script = script.replace("define(", "define('" + name + "',");
								eval(script);
								var template = $(xml).find("template").text();
								ko.components.register(name, {
									viewModel: {
										require: name
									},
									template: template
								});

							}
						})
					}else{
						var scriptEle = document.getElementById(name + "_script");
						var script = scriptEle.innerHTML;
						script = script.replace("define(", "define('" + name + "',");
						eval(script);
						var template = document.getElementById(name + "_template") .innerHTML;
						ko.components.register(name, {
							viewModel: {
								require: name
							},
							template: template
						}); 
					}
					

				}
			}
		}

	});


}(window, document);