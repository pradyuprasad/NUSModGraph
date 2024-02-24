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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVenueCovidZone = void 0;
var _ = require("lodash");
var axios_1 = require("axios");
var COVID_ZONE_URL = 'https://raw.githubusercontent.com/nusmodifications/nusmods/master/website/src/data/covidZones.json';
// Explicitly typed so it excludes MemoizedFunction typing for easier mocking
var getCovidZones = _.memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get(COVID_ZONE_URL)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); });
/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * Source: https://www.algorithms-and-technologies.com/point_in_polygon/javascript
 */
function pointInPolygon(polygon, point) {
    // A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    var odd = false;
    // For each edge (In this case for each point of the polygon and the previous one)
    for (var i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        // If a line from the point into infinity crosses this edge
        if (polygon[i][1] > point[1] !== polygon[j][1] > point[1] && // One point needs to be above, one below our y coordinate
            // ...and the edge doesn't cross our Y coordinate before our x coordinate (but between our x coordinate and infinity)
            point[0] <
                ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
                    (polygon[j][1] - polygon[i][1]) +
                    polygon[i][0]) {
            // Invert odd
            odd = !odd;
        }
        j = i;
    }
    // If the number of crossings was odd, the point is in the polygon
    return odd;
}
var getLocationCovidZone = _.memoize(function (zones, location) {
    var _a;
    // Object.entries doesn't respect Record keys, so we need to cast here
    var zoneEntries = Object.entries(zones);
    var zone = zoneEntries.find(function (_a) {
        var positions = _a[1].positions;
        return pointInPolygon(positions, [location.y, location.x]);
    });
    return (_a = zone === null || zone === void 0 ? void 0 : zone[0]) !== null && _a !== void 0 ? _a : 'Unknown';
});
function getVenueCovidZone(venues, zones, venue) {
    var venueInfo = venues[venue];
    if (!(venueInfo === null || venueInfo === void 0 ? void 0 : venueInfo.location)) {
        return 'Unknown';
    }
    return getLocationCovidZone(zones, venueInfo.location);
}
exports.getVenueCovidZone = getVenueCovidZone;
exports.default = getCovidZones;
