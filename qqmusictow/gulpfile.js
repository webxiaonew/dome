var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean");//html压缩
var imgMin = require("gulp-imagemin");//img压缩
var uglify = require("gulp-uglify");//js压缩
var strip = require("gulp-strip-debug");//非开发环境下去除console
var concat=require("gulp-concat");//src文件下js文件拼接
var less = require("gulp-less");//less
var postcss = require("gulp-postcss");//添加前缀和autoprefixer配合使用
var autoprefixer = require("autoprefixer");//添加前缀
var cssnano = require("cssnano");//压缩css代码
var connect = require("gulp-connect");//生成本地服务器

var devMode = process.env.NODE_ENV== "development" //开发环境

// gulp.src();//读文件
// gulp.src();//写文件
// gulp.task();//任务
// gulp.task();//监听
var folder = {
    src:"src/",
    dist:"dist/"
}

gulp.task("html",function(){
   var page = gulp.src(folder.src+"html/*")
   .pipe(connect.reload())
   if(!devMode){
    page.pipe(htmlclean())
   }
    
    page.pipe(gulp.dest(folder.dist+"html/"))
})

gulp.task("images",function(){
    gulp.src(folder.src+"images/*")
    .pipe(imgMin())
    .pipe(gulp.dest(folder.dist+"images/"))
})

gulp.task("js",function(){
   var page = gulp.src(folder.src+"js/*")
   .pipe(connect.reload())
    // .pipe(strip())//去除调试
    if(!devMode){
        page.pipe(strip())
        .pipe(uglify())
    }
    
    page.pipe(gulp.dest(folder.dist+"js/"))
})

gulp.task("css",function(){
    var options = [autoprefixer(),cssnano()];
 var page = gulp.src(folder.src+"css/*")
 .pipe(connect.reload())
    .pipe(less())
    if(!devMode){
        page.pipe(postcss(options))
    }
    
    page.pipe(gulp.dest(folder.dist+"css/"))
})

gulp.task("watch",function(){
  gulp.watch(folder.src+"html/*",["html"]); 
  gulp.watch(folder.src+"css/*",["css"]); 
  gulp.watch(folder.src+"js/*",["js"]); 
  gulp.watch(folder.src+"images/*",["iamges"]); 
})

gulp.task("server",function(){
    connect.server({
        port:8090,
        livereload:true//页面自动刷新
    });
})

gulp.task("default",["html","images","js","css","watch","server"])