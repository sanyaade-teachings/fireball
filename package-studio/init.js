var VERSION = '0.1.0';

var Fs = require('fire-fs');
var Path = require('fire-path');

Editor.log( 'Initializing Fireball Package Studio' );

Editor.versions['package-studio'] = VERSION;

// initialize ~/.fireball/package-studio/
var localPath = Path.join(Editor.appHome, 'package-studio');
if ( !Fs.existsSync(localPath) ) {
    Fs.makeTreeSync(localPath);
}
Editor.registerProfilePath( 'local', localPath );

//
Editor.registerDefaultLayout( Editor.url('app://package-studio/static/layout.json') );

//
Editor.registerPackagePath( Editor.url('editor-framework://demo/') );

// mixin app
Editor.JS.mixin(Editor.App, {
    run: function () {
        // create main window
        var win = new Editor.Window('main', {
            'title': 'Fireball - Package Studio',
            'width': 1280,
            'height': 720,
            'min-width': 1280,
            'min-height': 720,
            'show': false,
            'resizable': true,
        });
        Editor.mainWindow = win;

        // restore window size and position
        win.restorePositionAndSize();

        // load and show main window
        win.show();

        // page-level test case
        win.load( 'app://package-studio/index.html' );

        // open dev tools if needed
        if ( Editor.showDevtools ) {
            win.openDevTools({
                detach: true
            });
        }
        win.focus();
    },

    load: function () {
        // TODO
        // console.log('app load');
    },

    unload: function () {
        // TODO
        // console.log('app unload');
    },
});
