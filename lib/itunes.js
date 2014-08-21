
var debug = require('debug')('itunes');
var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;

/**
 * Expose the 'Tuner' API.
 */
exports = module.exports = new ITunes();

// expose ITunes
exports.ITunes = ITunes;

exports.version = '0.0.1';

var tellItunesTemplate = 'tell application "iTunes" to #{command}';

function ITunes() {
};

/**
 * Inherit from 'EventEmitter.prototype'.
 */
ITunes.prototype.__proto__ = EventEmitter.prototype;

ITunes.prototype.play = function() {
    this.tellItunes('play', emit(this, 'play'));
};

ITunes.prototype.stop = function() {
    this.tellItunes('stop', emit(this, 'stop'));
};

ITunes.prototype.add = function(file) {
    this.tellItunes('add POSIX file "' + file + '"', emit(this, 'added'));
};

ITunes.prototype.tellItunes = function(command, cb) {
    var applescript = tellItunesTemplate.replace(/#{command}/, command);

    debug('itunes command %s', applescript);

    var script = spawn('osascript', ["-e", applescript]);

    var result = {};

    script.stdout.on('data', function(data) {
        result = data.toString();
    });
    
    script.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });

    script.on('exit', function(code) {
        cb({result: result, code: code});
    });
};

function emit(target, event) {
    return function(result) {
        target.emit(event, result);
    };
};
