"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("./typings");
const addons_1 = __importStar(require("@storybook/addons"));
const wrapper = (getStory, context, { options }) => {
    const channel = addons_1.default.getChannel();
    channel.emit(typings_1.constants.UPDATE_CONFIG_EVENT, options);
    return getStory(context);
};
exports.withFigma = addons_1.makeDecorator({
    name: typings_1.constants.DECORATOR_NAME,
    parameterName: typings_1.constants.PARAM_KEY,
    skipIfNoParameterOrOptions: true,
    wrapper,
});
if (module && module.hot && module.hot.decline) {
    module.hot.decline();
}
//# sourceMappingURL=index.js.map