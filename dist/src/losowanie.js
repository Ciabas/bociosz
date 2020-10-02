'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (msg) {
  if (msg.content.startsWith(_common.prefix + 'losowanie')) {
    var _msg$content$match = msg.content.match(/"(.*?)"/g),
        _msg$content$match2 = _slicedToArray(_msg$content$match, 2),
        first = _msg$content$match2[0],
        second = _msg$content$match2[1];

    var firstShuffled = (0, _lodash.shuffle)(first.replace(/\"/g, '').split(','));
    var secondShuffled = (0, _lodash.shuffle)(second.replace(/\"/g, '').split(','));

    var message = 'Wylosowano:';
    firstShuffled.map(function (value, index) {
      message = message + '\n' + value.trim() + ' <=> ' + (secondShuffled[index] || '').trim();
    });

    msg.channel.send(message);
  }
};

var _lodash = require('lodash');

var _common = require('./common');