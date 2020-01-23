"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BASE = 'https://api.figma.com/v1';
// https://www.figma.com/developers/docs#get-images-endpoint
function fileImage(fileKey, ids) {
    return `${BASE}/images/${fileKey}?ids=${ids}&format=svg`;
}
exports.fileImage = fileImage;
//# sourceMappingURL=endpoints.js.map