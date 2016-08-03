var gulp = require('gulp');
var zip = require('gulp-zip');

var process = require('child_process');
var fs = require('fs');

// maven 配置信息
var publishConfig = {
    command: "mvn",
    repositoryId: "iUAP-Stagings",
    repositoryURL: "http://172.16.51.12:8081/nexus/content/repositories/iUAP-Stagings",
    artifactId: "iuap-design-vendor",
    groupId: "com.yonyou.iuap",
    version: "3.0.0"
};

/**
 * 打包为war
 * @param  {[type]} "package" [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
gulp.task("package", function(){
  return gulp.src('./dist/**')
      .pipe(zip('iuap-design-vendor.war'))
      .pipe(gulp.dest('./'));

  // console.info('package ok!');
});

/**
 * install 到本地
 * @param  {[type]} "install" [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
gulp.task("install", ["package"], function(){

  var targetPath = fs.realpathSync('.');

  // 安装命令
  var installCommandStr = publishConfig.command +
      " install:install-file -Dfile=" + targetPath +
      "/iuap-design-vendor.war   -DgroupId="+ publishConfig.groupId +
      " -DartifactId=" + publishConfig.artifactId +
      "  -Dversion="+ publishConfig.version +" -Dpackaging=war";

	var installWarProcess =	process.exec(installCommandStr, function(err,stdout,stderr){
		if(err) {
			console.log('install war error:'+stderr);
		}
	});

	installWarProcess.stdout.on('data',function(data){
		console.info(data);
	});
	installWarProcess.on('exit',function(data){
    console.info('install war success');
  })

});

/**
 * 发布到maven仓库中
 * @param  {[type]} "deploy"    [description]
 * @param  {[type]} ["package"] [description]
 * @param  {[type]} function(   [description]
 * @return {[type]}             [description]
 */
gulp.task("deploy", ["install"], function(){
  var targetPath = fs.realpathSync('.');

  var publishCommandStr =  publishConfig.command + " deploy:deploy-file  -Dfile="+ targetPath+"/iuap-design-vendor.war   -DgroupId="+ publishConfig.groupId +" -DartifactId="+ publishConfig.artifactId +"  -Dversion="+ publishConfig.version +" -Dpackaging=war  -DrepositoryId="+ publishConfig.repositoryId +" -Durl=" +publishConfig.repositoryURL;

  console.info(publishCommandStr);

  var publishWarProcess =	process.exec(publishCommandStr, function(err,stdout,stderr){
    if(err) {
      console.log('publish war error:'+stderr);
    }
  });

  publishWarProcess.stdout.on('data',function(data){
    console.info(data);
  });
  publishWarProcess.on('exit',function(data){
    console.info('publish  war success');
  });

})

gulp.task('default', [ 'deploy']);
