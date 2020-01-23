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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const endpoints_1 = require("./endpoints");
const FIGMA_TOKEN_HEADER = 'X-Figma-Token';
// Convert the API images into valid arguments for https://github.com/pocka/storybook-addon-designs
const toFigmaImages = (images) => Object.entries(images).map(([name, url]) => ({
    name,
    url,
    type: 'image',
}));
function fetchImages(token, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url, {
            headers: {
                [FIGMA_TOKEN_HEADER]: token,
            },
        });
        return res.json();
    });
}
// Load asynchronously figma images by id
exports.loadFigmaImagesByIDs = lodash_1.memoize((ids, projectId, apiToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (!projectId) {
        throw new Error('The figma project id was not set.');
    }
    if (!apiToken) {
        throw new Error('Your figma api token was not set.');
    }
    // curry the file image api endpoint
    const imagesEndpointWithProjectID = lodash_1.curry(endpoints_1.fileImage)(projectId);
    // curry the fetch method
    const fetchImagesWithToken = lodash_1.curry(fetchImages)(apiToken);
    const loadImagesByIDs = lodash_1.flowRight(fetchImagesWithToken, imagesEndpointWithProjectID);
    try {
        const data = (yield loadImagesByIDs(ids));
        return toFigmaImages(data.images);
    }
    catch (error) {
        throw new Error(error);
    }
}));
//# sourceMappingURL=util.js.map