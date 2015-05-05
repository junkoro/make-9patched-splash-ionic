# make-9patched-splash-ionic
In ionic project, automatically resize & 9-patch splash.png like this.

![FourSide1px9patch.png](img/FourSide1px9patch.png "FourSide1px9patch.png")


## Dependencies

junkoro/four-sides-1px-9patcher - https://github.com/junkoro/four-sides-1px-9patcher

and this is depends on this.

Automattic/node-canvas - https://github.com/Automattic/node-canvas

Installing node-canvas is bit difficult. Here is how to on mac.

```bash
$ brew install pkg-config
$ brew install pixman
$ brew install cairo
$ export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig
```

## Installation
```bash
$ npm install make-9patched-splash-ionic
$ cp node_modules/make-9patched-splash-ionic/make-9patched-splash-ionic.js .
```

## Usage
```bash
$ node make-9patched-splash-ionic.js
```
**!!!! DANGER !!!!**
This script will **delete all PNG files** under resources/android/splash, so watch out!

## License

WTFPL - http://www.wtfpl.net/
