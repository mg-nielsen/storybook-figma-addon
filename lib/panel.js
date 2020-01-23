"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-ignore */
const react_1 = __importStar(require("react"));
const core_events_1 = require("@storybook/core-events");
// @ts-ignore
const components_1 = require("@storybook/components");
const Image_1 = __importDefault(require("storybook-addon-designs/lib/register/components/Image"));
const util_1 = require("./util");
const typings_1 = require("./typings");
function getPanels(config, names) {
    return [...(Array.isArray(config) ? config : [config])].map((cfg, i) => {
        const meta = {
            id: `${typings_1.constants.ADDON_NAME}-${i}`,
            title: names[i] || cfg.name || '',
        };
        return [react_1.default.createElement(Image_1.default, { key: meta.id, config: cfg }), meta];
    });
}
function PlaceholderMessage(props) {
    return (react_1.default.createElement(components_1.Placeholder, null,
        react_1.default.createElement(react_1.Fragment, Object.assign({}, props))));
}
function FigmaPanel({ api, active, channel }) {
    const [config, setConfig] = react_1.useState();
    const [hasImages, setHasImages] = react_1.useState();
    const [imageNames, setNames] = react_1.useState();
    const [apiConfig, setApiConfig] = react_1.useState();
    const [storyId, changeStory] = react_1.useState();
    react_1.useEffect(() => {
        const onStoryChanged = (id) => __awaiter(this, void 0, void 0, function* () {
            changeStory(id);
            const params = api.getParameters(id, typings_1.constants.PARAM_KEY);
            setHasImages(Boolean(params));
            if (!params) {
                return;
            }
            const { ids, names } = params;
            if (ids && apiConfig) {
                setNames(names || []);
                const cfg = yield util_1.loadFigmaImagesByIDs(ids, apiConfig.projectID, apiConfig.apiToken);
                setConfig(cfg);
            }
        });
        channel.on(typings_1.constants.UPDATE_CONFIG_EVENT, setApiConfig);
        channel.on(core_events_1.STORY_CHANGED, onStoryChanged);
        channel.on(core_events_1.STORY_RENDERED, onStoryChanged);
        return () => {
            channel.removeListener(typings_1.constants.UPDATE_CONFIG_EVENT, setApiConfig);
            channel.removeListener(core_events_1.STORY_CHANGED, onStoryChanged);
            channel.removeListener(core_events_1.STORY_RENDERED, onStoryChanged);
        };
    }, [apiConfig]);
    if (!active) {
        return react_1.default.createElement("noscript", null);
    }
    if (hasImages === false) {
        return react_1.default.createElement(PlaceholderMessage, null, "This component has no figma designs \u00AF\\_(\u30C4)_/\u00AF");
    }
    if (!config || !storyId) {
        return react_1.default.createElement(PlaceholderMessage, null, "Loading designs...");
    }
    const panels = getPanels(config, imageNames);
    return (react_1.default.createElement(components_1.TabsState, { key: storyId, absolute: true, initial: panels[0][1].id }, panels.map(([el, meta]) => (react_1.default.createElement("div", { key: meta.id, id: meta.id, title: meta.title }, el)))));
}
exports.default = FigmaPanel;
//# sourceMappingURL=panel.js.map