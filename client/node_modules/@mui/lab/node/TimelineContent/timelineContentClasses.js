"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTimelineContentUtilityClass = getTimelineContentUtilityClass;

var _core = require("@mui/core");

function getTimelineContentUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTimelineContent', slot);
}

const timelineContentClasses = (0, _core.generateUtilityClasses)('MuiTimelineContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineContentClasses;
exports.default = _default;