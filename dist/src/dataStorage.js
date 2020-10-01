'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadData = exports.saveData = undefined;

var _fsSync = require('fs-sync');

var _fsSync2 = _interopRequireDefault(_fsSync);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveData = exports.saveData = function saveData() {};

var loadData = exports.loadData = function loadData() {
  _fsSync2.default.readJSON('data.json', function (err, data) {
    if (err) throw err;
    var parsedData = JSON.parse(data);
    console.log(data);
  });
};