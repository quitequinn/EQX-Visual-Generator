const { series, parallel, src, dest, watch } = require('gulp');
const buildPath = "./dist/";
const buildEQXPath = "./for-EQX-upload/";

// Start
function start(cb, context=""){
	console.log("");
	console.log("Start" + context);
	console.log("———————————————————");
	cb();
}

// BrowserSync
const browserSync = require('browser-sync');
const server = browserSync.create();
function reload(done) {
	server.reload();
	done();
}
function serve(done) {
  	server.init({
    	server: {
			baseDir: buildPath,
			directory: true
    	}
  	});
  	done();
}


// Styles
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const inject = require('gulp-inject-string');

const stylSrc = './styles/styles.styl';
const stylDist = buildPath + 'styles.css';
function buildCSS(cb){
	return src(stylSrc)
		.pipe(stylus())
     	.pipe(autoprefixer())
     	.pipe(uglifycss())
		.pipe(inject.prepend('<style>'))
		.pipe(inject.append('</style>'))
		.pipe(rename('styles.css'))
		.pipe(dest(buildPath));
}

const stylEQXSrc = buildPath + 'remove-for-eqx.css';
const stylEQXDist = buildPath + 'styles.css';
function buildEQXCSS(cb){
	return src(stylEQXSrc)
		.pipe(stylus())
     	.pipe(autoprefixer())
     	.pipe(uglifycss())
		.pipe(inject.prepend('<style>'))
		.pipe(inject.append('</style>'))
		.pipe(rename('stylEQXDist.css'))
		.pipe(dest(buildPath));
}


// Javascript Defaults
const uglify = require('gulp-uglify');
const jsDefaultsSrc = './defaults.js';
const jsDefaultsDist = buildPath + 'defaults.js';
function buildDefaults(cb) {
	return src(jsDefaultsSrc)
		.pipe(uglify())
		.pipe(inject.prepend('<script>'))
		.pipe(inject.append('</script>'))
		.pipe(rename('defaults.js'))
		.pipe(dest(buildPath));
}


// Build
const concat = require('gulp-concat');
const flatmap = require('gulp-flatmap');
const del = require('del');
const rename = require("gulp-rename");
const htmlSrc = './src/*';
const htmlmin = require('gulp-htmlmin');
function build(cb) {
	return src(htmlSrc)
		.pipe(flatmap((stream, file) => {
			return src([
				'./partials/header.html', 
				file.path, 
				stylDist,
				stylEQXDist,
				jsDefaultsDist,
				'./partials/footer.html'
			])
			.pipe(concat(file.path.replace(file.base, "")))
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(rename(function (path) {
				path.extname = ".html";
			}))
			.pipe(dest(buildPath))
			.pipe(server.stream());
		}));
}

function buildForEQX(cb) {
	return src(htmlSrc)
		.pipe(flatmap((stream, file) => {
			return src([
				'./partials/header.html', 
				file.path, 
				stylDist,
				jsDefaultsDist,
				'./partials/footer.html'
			])
			.pipe(concat(file.path.replace(file.base, "")))
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(rename(function (path) {
				path.extname = ".html";
			}))
			.pipe(dest(buildEQXPath))
			.pipe(server.stream());
		}));
}


// Clean
function preClean(cb) {
	return del(buildPath + "**/*");
}
function postClean(cb) {
	return del([stylDist, jsDefaultsDist]);
}


// Listen
function listen(cb){
  	watch(stylSrc, series(start, preClean, parallel(buildCSS, buildEQXCSS, buildDefaults), postClean, build, buildForEQX, complete, reload));
  	watch(jsDefaultsSrc, series(start, preClean, parallel(buildCSS, buildEQXCSS, buildDefaults), postClean, build, buildForEQX, complete, reload));
  	watch(htmlSrc, series(start, preClean, parallel(buildCSS, buildEQXCSS, buildDefaults), postClean, build, buildForEQX, complete, reload));
}


// Complete
function complete(cb, context=""){
	console.log("");
	console.log("Complete : Check " + __dirname + "/build/");
	console.log("———————————————————");
	cb();
}

 
exports.build		= series( start, preClean, parallel(buildCSS, buildEQXCSS, buildDefaults), build, buildForEQX, postClean, complete);
exports.default 	= series( start, preClean, parallel(buildCSS, buildEQXCSS, buildDefaults), build, buildForEQX, postClean, complete, serve, listen);
