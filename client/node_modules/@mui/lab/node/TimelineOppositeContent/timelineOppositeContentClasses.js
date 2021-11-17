"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTimelineOppositeContentUtilityClass = getTimelineOppositeContentUtilityClass;

var _core = require("@mui/core");

function getTimelineOppositeContentUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTimelineOppositeContent', slot);
}

const timelineOppositeContentClasses = (0, _core.generateUtilityClasses)('MuiTimelineOppositeContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
var _default = timelineOppositeContentClasses;
exports.default = _default;