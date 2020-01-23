"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const addons_1 = __importStar(require("@storybook/addons"));
const panel_1 = __importDefault(require("./panel"));
const typings_1 = require("./typings");
addons_1.default.register(typings_1.constants.ADDON_NAME, api => {
    const render = ({ active, key }) => (react_1.default.createElement(panel_1.default, { api: api, key: key, channel: addons_1.default.getChannel(), active: active }));
    addons_1.default.add(typings_1.constants.PANEL_NAME, {
        type: addons_1.types.PANEL,
        title: typings_1.constants.ADDON_TITLE,
        render,
    });
});
//# sourceMappingURL=register.js.map