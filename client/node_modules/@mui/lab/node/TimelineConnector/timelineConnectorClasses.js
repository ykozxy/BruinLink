"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTimelineConnectorUtilityClass = getTimelineConnectorUtilityClass;

var _core = require("@mui/core");

function getTimelineConnectorUtilityClass(slot) {
  return (0, _core.generateUtilityClass)('MuiTimelineConnector', slot);
}

const timelineConnectorClasses = (0, _core.generateUtilityClasses)('MuiTimelineConnector', ['root']);
var _default = timelineConnectorClasses;
exports.default = _default;