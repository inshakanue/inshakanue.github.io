/* 
  GULP BUILD CONFIGURATION
  ========================
  This file defines the build process for the Jekyll portfolio website.
  It handles compilation, minification, and live reloading during development.
  
  Build Process:
  1. Compile SCSS to CSS and minify
  2. Concatenate and minify JavaScript files
  3. Copy and optimize images
  4. Build Jekyll site
  5. Start development server with live reload
  
  Usage:
  - `gulp` or `npx gulp` - Start development server with live reload
  - `gulp sass` - Compile SCSS to CSS
  - `gulp js` - Compile and minify JavaScript
  - `gulp imagemin` - Copy images to assets folder
  - `gulp jekyll-build` - Build Jekyll site
*/

/* 
  DEPENDENCIES
  ============
  Import all required Gulp plugins and modules
*/
var gulp = require('gulp');                    // Main Gulp module
var csso = require('gulp-csso');              // CSS minification and optimization
var uglify = require('gulp-uglify');          // JavaScript minification
var concat = require('gulp-concat');          // File concatenation
var sass = require('gulp-sass')(require('sass')); // SCSS compilation with Dart Sass
var plumber = require('gulp-plumber');        // Error handling for Gulp streams
var cp = require('child_process');            // Child process execution (for Jekyll)
var browserSync = require('browser-sync');    // Live reload development server

/* 
  JEKYLL COMMAND DETECTION
  ========================
  Detect the operating system and use the appropriate Jekyll command.
  Windows uses 'jekyll.bat', Unix-based systems use 'jekyll'.
*/
var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/* 
  JEKYLL BUILD TASK
  =================
  Builds the Jekyll site by running the Jekyll build command.
  This generates the static HTML files in the _site directory.
  
  Process:
  1. Spawn a child process running Jekyll build
  2. Inherit stdio to show build output in terminal
  3. Call done() when the process completes
*/
gulp.task('jekyll-build', function (done) {
	return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'})
		.on('close', done);
});

/* 
  JEKYLL REBUILD TASK
  ===================
  Rebuilds the Jekyll site and reloads the browser.
  This is used during development when HTML files change.
  
  Process:
  1. Run jekyll-build task
  2. Reload browser-sync when build completes
*/
gulp.task('jekyll-rebuild', gulp.series('jekyll-build', function () {
	browserSync.reload();
}));

/* 
  BROWSER-SYNC TASK
  =================
  Starts the development server with live reload functionality.
  Serves the built Jekyll site and automatically reloads when files change.
  
  Process:
  1. Run jekyll-build task first
  2. Start browser-sync server pointing to _site directory
*/
gulp.task('browser-sync', gulp.series('jekyll-build', function() {
	browserSync({
		server: {
			baseDir: '_site'                    // Serve files from Jekyll build directory
		}
	});
}));

/* 
  SASS COMPILATION TASK
  =====================
  Compiles SCSS files to CSS and optimizes the output.
  
  Process:
  1. Source: All .scss files in src/styles/ directory
  2. Error handling: Use plumber to prevent crashes on SCSS errors
  3. Compile: Convert SCSS to CSS using Dart Sass
  4. Optimize: Minify and optimize CSS using csso
  5. Output: Save to assets/css/ directory
  
  Input:  src/styles/main.scss
  Output: assets/css/main.css
*/
gulp.task('sass', function() {
  return gulp.src('src/styles/**/*.scss')     // Source: all SCSS files
    .pipe(plumber())                          // Error handling
    .pipe(sass())                             // Compile SCSS to CSS
    .pipe(csso())                             // Minify and optimize CSS
    .pipe(gulp.dest('assets/css'));           // Output to assets directory
});

/* 
  IMAGE PROCESSING TASK
  =====================
  Copies images from source to assets directory.
  Note: Image optimization was removed due to dependency compatibility issues.
  
  Process:
  1. Source: All image files in src/img/ directory
  2. Error handling: Use plumber for error handling
  3. Output: Copy to assets/img/ directory
  
  Supported formats: JPG, PNG, GIF, SVG
  Input:  src/img/*.{jpg,png,gif,svg}
  Output: assets/img/*.{jpg,png,gif,svg}
*/
gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*.{jpg,png,gif,svg}')  // Source: all image files
		.pipe(plumber())                                 // Error handling
		.pipe(gulp.dest('assets/img/'));                // Output to assets directory
});

/* 
  JAVASCRIPT COMPILATION TASK
  ===========================
  Concatenates and minifies JavaScript files.
  
  Process:
  1. Source: All .js files in src/js/ directory
  2. Error handling: Use plumber for error handling
  3. Concatenate: Combine all JS files into one
  4. Minify: Remove whitespace and optimize code
  5. Output: Save to assets/js/ directory
  
  Input:  src/js/app.js
  Output: assets/js/main.js
*/
gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')         // Source: all JS files
		.pipe(plumber())                       // Error handling
		.pipe(concat('main.js'))              // Concatenate into single file
		.pipe(uglify())                        // Minify JavaScript
		.pipe(gulp.dest('assets/js/'))        // Output to assets directory
});

/* 
  FILE WATCHING TASK
  ==================
  Monitors source files for changes and automatically rebuilds when needed.
  This enables live reloading during development.
  
  Watched files:
  - SCSS files: Triggers sass task
  - JS files: Triggers js task
  - Images: Triggers imagemin task
  - HTML files: Triggers jekyll-rebuild task
*/
gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', gulp.series('sass'));                    // Watch SCSS files
  gulp.watch('src/js/**/*.js', gulp.series('js'));                           // Watch JS files
	gulp.watch('src/img/**/*.{jpg,png,gif,svg}', gulp.series('imagemin'));    // Watch image files
  gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html'], gulp.series('jekyll-rebuild')); // Watch HTML files
});

/* 
  DEFAULT TASK
  ============
  The main task that runs when you execute 'gulp' or 'npx gulp'.
  This starts the complete development workflow.
  
  Process:
  1. Compile JavaScript (js)
  2. Compile SCSS (sass)
  3. Start browser-sync server (browser-sync)
  4. Start file watching (watch)
  
  This task runs all build processes and starts the development server.
*/
gulp.task('default', gulp.series('js', 'sass', 'browser-sync', 'watch'));