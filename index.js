'use strict';


var fs = require('fs');
var Canvas = require('canvas');
var fourSides1px9patcher = require('four-sides-1px-9patcher');
var Resizer = require('./resize.js');


var PATH_RES = 'resources';
var PATH_DST_DIR = PATH_RES + '/android/splash';
var PREFIX = PATH_DST_DIR + '/drawable-';
var LAND = 'land';
var PORT = 'port';
var SCREENS = [
  { name: 'ldpi', length: 200 },
  { name: 'mdpi', length: 320 },
  { name: 'hdpi', length: 480 },
  { name: 'xhdpi', length: 720 },
  { name: 'xxhdpi', length: 960 },
  { name: 'xxxhdpi', length: 1280 }
];
var POSTFIX = '-screen.9.png';


function resizeAnd4sides1px9patch(src, orientationStr) {

  // load src image
  var srcImg = new Canvas.Image();
  srcImg.src = src;
  var siw = srcImg.width;
  var sih = srcImg.height;

  // convert src image to data
  var cvSrc = new Canvas(siw, sih);
  var ctxSrc = cvSrc.getContext('2d');
  ctxSrc.drawImage(srcImg, 0, 0);
  var srcImgData = ctxSrc.getImageData(0, 0, siw, sih).data;

  // For each screen...
  for (var i = 0; i < SCREENS.length; i++) {

    // parse screen info
    var screen = SCREENS[i];
    var dst = PREFIX + orientationStr + '-' + screen.name + POSTFIX;
    var length = screen.length;
    console.log('PROCESSING... dst=' + dst + ' width=' + length + ' height=' + length);

    // hi quality resize
    var resizer = new Resizer(siw, sih, length, length, true, true, false, function (buffer) {

      //console.log('RESIZED dst=' + dst);
      var cv = new Canvas(length, length);
      var ctx = cv.getContext('2d');

      // resized image data
      var imgData = ctx.createImageData(length, length);
      var data = imgData.data;
      var dataLength = data.length;
      for (var j = 0; j < dataLength; ++j) {
        //data[j] = buffer[j] & 0xFF;
        data[j] = buffer[j];
      }

      ctx.putImageData(imgData, 0, 0);
      //fs.writeFile(dst, cv.toBuffer());
      fourSides1px9patcher(cv.toBuffer(), dst);

    });

    // start hi quality resize
    resizer.resize(srcImgData);

  } //END for

} //END resizeAnd4sides1px9patch()


function make9patchedSplashIonic() {

  // delete all splash screen images
  var dstDirFiles = fs.readdirSync(PATH_DST_DIR + '/');
  for (var i in dstDirFiles) {
    if (i) {
      var fpath = PATH_DST_DIR + '/' + dstDirFiles[i];
      var ext = '.png';
      if (!fs.statSync(fpath).isDirectory() && fpath.lastIndexOf(ext) === (fpath.length - ext.length)){
        //console.log('DELETE:' + fpath);
        fs.unlink(fpath);
      }
    }
  }

  var src = PATH_RES + '/splash.png';
  resizeAnd4sides1px9patch(src, 'land');
  resizeAnd4sides1px9patch(src, 'port');

}


module.exports = make9patchedSplashIonic;
