// Include gulp
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	minifyhtml = require('gulp-minify-html'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');


// Minify JavaScript
gulp.task('scripts', function() {
	gulp.src(paths.scripts)
		//.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));

});

// Minify CSS
gulp.task('styles', function() {
	gulp.src(paths.styles)
		.pipe(minifycss())
		.pipe(gulp.dest('css'));

});

// Minify HTML
gulp.task('content', function() {
		gulp.src(paths.content)
		.pipe(minifyhtml({
				empty: true,
				quotes: true
		}))
		.pipe(gulp.dest(''));
});

// Optimize Images

gulp.task('images', function () {

	gulp.src( paths.images[0] )
		.pipe(imagemin({
			optimizationLevel: 6,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('img'));

	gulp.src( paths.images[1] )
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 6,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('img'));

});


// Watch files
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
});

// Path to various files
var paths = {
	content: ['src/*.html'],
	scripts: ['src/js/*.js'],
	styles: ['src/css/*.css'],
	images: ['src/img/*.png', 'src/img/*.jpg', 'src/img/*.jpeg']
};

// Call the Gulp task
gulp.task('default', ['content', 'scripts', 'styles', 'images']);