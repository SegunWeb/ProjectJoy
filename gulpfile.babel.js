"use strict";

import { src, dest, watch, parallel, series } from "gulp";
import gulpif from "gulp-if";
import browsersync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import uglify from "gulp-uglify";
import pug from "gulp-pug";
import sass from "gulp-sass";
import mincss from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGiflossy from "imagemin-giflossy";
import imageminSvgo from "imagemin-svgo";
import favicons from "gulp-favicons";
import svgSprite from "gulp-svg-sprites";
import raster from "gulp-raster";
import replace from "gulp-replace";
import plumber from "gulp-plumber";
import debug from "gulp-debug";
import clean from "gulp-clean";
import yargs from "yargs";

const argv = yargs.argv;
const production = !!argv.production;

const paths = {
	src: {
		fonts: ["./src/fonts/*"],
		pug: [
			"./src/pug/*.pug",
            "./src/pug/**/*.pug"
		],
		styles: [
			"./src/styles/styles.scss",
			"./src/styles/**/*.scss",
		],
		styles_libs: "./src/styles/librarys/**",
		scripts: "./src/js/*.js",
		scripts_libs: "./src/js/librarys/**",
		favicons: "./src/img/icons/favicon.{jpg,jpeg,png,gif}",
		images: [
			"./src/img/**/*.{jpg,jpeg,png,gif,svg}",
			"!./src/img/icons/svg/*",
			"!./src/img/icons/favicon.{jpg,jpeg,png,gif}"
		],
		sprites: "./src/img/icons/svg/*.svg",
		server_config: "./src/.htaccess"
	},
	build: {
		fonts: ["./dist/fonts/"],
		clean: ["./dist/*", "./dist/.*"],
		general: "./dist/",
		styles: "./dist/styles",
		styles_libs: "./dist/styles/librarys",
		scripts: "./dist/js",
		scripts_libs: "./dist/js/librarys",
		favicons: "./dist/img/favicons",
		images: "./dist/img",
		sprites: "./dist/img/sprites",
	}
};


export const server = () => {
	browsersync.init({
		server: paths.build.general,
		port: 9000,
		tunnel: true,
		notify: false
	});
};

export const watchCode = () => {
    watch(paths.src.fonts, folderFonts);
	watch(paths.src.pug, pugToHTML);
	watch(paths.src.styles, styles);
    watch(paths.src.styles_libs, styles_libs);
	watch(paths.src.scripts, scripts);
	watch(paths.src.scripts_libs, scripts_libs);
	watch(paths.src.images, images);
	watch(paths.src.sprites, sprites);
};

export const cleanFiles = () => src(paths.build.clean, {read: false})
	.pipe(clean())
	.pipe(debug({
		"title": "Cleaning..."
	}));

export const serverConfig = () => src(paths.src.server_config)
	.pipe(dest(paths.build.general))
	.pipe(debug({
		"title": "Server config"
	}));
export const folderFonts = () => src(paths.src.fonts)
    .pipe(dest(paths.build.fonts))
    .on("end", browsersync.reload);

export const pugToHTML = () => src(paths.src.pug)
	.pipe(pug({pretty: true}))
	.pipe(gulpif(production, replace("styles.css", "styles.min.css")))
    .pipe(gulpif(production, replace("animate.css", "animate.min.css")))
    .pipe(gulpif(production, replace("slick.css", "slick.min.css")))
    .pipe(gulpif(production, replace("bootstrap.css", "bootstrap.min.css")))
	.pipe(gulpif(production, replace("main.js", "main.min.js")))
	.pipe(dest(paths.build.general))
	.on("end", browsersync.reload);

export const styles = () => src(paths.src.styles)
	.pipe(plumber())
	.pipe(gulpif(!production, sourcemaps.init()))
	.pipe(sass())
	.pipe(gulpif(production, autoprefixer({
		browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"]
	})))
	.pipe(gulpif(production, mincss({
		compatibility: "ie8", level: {
			1: {
				specialComments: 0,
				removeEmpty: true,
				removeWhitespace: true
			},
			2: {
				mergeMedia: true,
				removeEmpty: true,
				removeDuplicateFontRules: true,
				removeDuplicateMediaBlocks: true,
				removeDuplicateRules: true,
				removeUnusedAtRules: false
			}
		}
	})))
	.pipe(gulpif(production, rename({
		suffix: ".min"
	})))
	.pipe(plumber.stop())
	.pipe(gulpif(!production, sourcemaps.write("./maps/")))
	.pipe(dest(paths.build.styles))
	.pipe(debug({
		"title": "CSS files"
	}))
	.on("end", browsersync.reload);

export const styles_libs = () => src(paths.src.styles_libs)
	.pipe(plumber())
	.pipe(gulpif(!production, sourcemaps.init()))
	.pipe(gulpif(production, autoprefixer({
		browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"]
	})))
	.pipe(gulpif(production, mincss({
		compatibility: "ie8", level: {
			1: {
				specialComments: 0,
				removeEmpty: true,
				removeWhitespace: true
			},
			2: {
				mergeMedia: true,
				removeEmpty: true,
				removeDuplicateFontRules: true,
				removeDuplicateMediaBlocks: true,
				removeDuplicateRules: true,
				removeUnusedAtRules: false
			}
		}
	})))
	.pipe(gulpif(production, rename({
		suffix: ".min"
	})))
	.pipe(plumber.stop())
	.pipe(gulpif(!production, sourcemaps.write("./maps/")))
	.pipe(dest(paths.build.styles_libs))
	.pipe(debug({
		"title": "CSS librarys files"
	}))
	.on("end", browsersync.reload);

export const scripts = () => browserify({
		entries: "./src/js/main.js",
		debug: true
	})
	.bundle()
	.pipe(source("main.js"))
	.pipe(buffer())
	.pipe(gulpif(!production, sourcemaps.init()))
	.pipe(babel())
	.pipe(gulpif(production, uglify()))
	.pipe(gulpif(production, rename({
		suffix: ".min"
	})))
	.pipe(gulpif(!production, sourcemaps.write("./maps/")))
	.pipe(dest(paths.build.scripts))
	.pipe(debug({
		"title": "JS files"
	}))
	.on("end", browsersync.reload);

export const scripts_libs = () => src(paths.src.scripts_libs)
	.pipe(dest(paths.build.scripts_libs))
	.pipe(debug({
		"title": "JS librarys files"
	}))
	.on("end", browsersync.reload);

export const images = () => src(paths.src.images)
	.pipe(gulpif(production, imagemin([
		imageminGiflossy({
			optimizationLevel: 3,
			optimize: 3,
			lossy: 2
		}),
		imageminPngquant({
			speed: 5,
			quality: 75
		}),
		imageminZopfli({
			more: true
		}),
		imageminMozjpeg({
			progressive: true,
			quality: 70
		}),
		imageminSvgo({
			plugins: [{
				removeViewBox: true,
				removeComments: true,
				removeEmptyAttrs: true,
				removeEmptyText: true,
				removeUnusedNS:true,
				cleanupIDs: true,
				collapseGroups: true
			}]
		})
	])))
	.pipe(dest(paths.build.images))
	.pipe(debug({
		"title": "Images"
	}))
	.on("end", browsersync.reload);

export const sprites = () => src(paths.src.sprites)
	.pipe(svgSprite({
		preview: false,
		cssFile: "../../../src/styles/components/_sprite.scss",
		svgPath: "../img/sprites/sprite.svg",
		pngPath: "../img/sprites/sprite.png",
		svg: {
			sprite: "sprite.svg"
		}
	}))
	.pipe(dest(paths.build.sprites))
	.pipe(debug({
		"title": "Sprites"
	}))
	.on("end", browsersync.reload);

export const svg2png = () => src(`${paths.build.sprites}**/*.svg`)
	.pipe(raster())
	.pipe(rename({ extname: ".png"}))
	.pipe(dest(paths.build.sprites));

export const favs = () => src(paths.src.favicons)
	.pipe(favicons({
		icons: {
			appleIcon: true,
			favicons: true,
			online: false,
			appleStartup: false,
			android: false,
			firefox: false,
			yandex: false,
			windows: false,
			coast: false
		}
	}))
	.pipe(dest(paths.build.favicons))
	.pipe(debug({
		"title": "Favicons"
	}));

export const development = series(cleanFiles, sprites, svg2png, parallel(folderFonts, pugToHTML, styles, styles_libs, scripts, scripts_libs, images, favs),
	parallel(watchCode, server));

export const prod = series(cleanFiles, sprites, svg2png, serverConfig, folderFonts, pugToHTML, styles, styles_libs, scripts, scripts_libs, images, favs);

export default development;