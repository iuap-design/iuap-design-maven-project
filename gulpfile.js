var gulp = require('gulp');
var zip = require('gulp-zip');

var process = require('child_process');
var fs = require('fs');

// maven 配置信息
var publishConfig = {
    command:"mvn",
    repositoryId:"iUAP-Snapshots",
    repositoryURL:"http://172.16.51.12:8081/nexus/content/repositories/iUAP-Snapshots",
    artifactId:"integration_fe",
    groupId:"com.yonyou.iuap.portal",
    version:"3.0.27-SNAPSHOT"
};

/**
 * 打包为war
 * @param  {[type]} "package" [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
gulp.task("package", function(){
  gulp.src('./src/**')
      .pipe(zip('iuap-design.war'))
      .pipe(gulp.dest('./'));

  console.info('package ok!');
});

/**
 * 安装到maven中
 * @param  {[type]} "install" [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
gulp.task("deploy", ["package"], function(){

  var targetPath = fs.realpathSync('.');

  // 安装命令
  var installCommandStr = publishConfig.command +
      " install:install-file -Dfile=" + targetPath +
      "/iuap-design.war   -DgroupId="+ publishConfig.groupId +
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

gulp.task('default', ['deploy']);
