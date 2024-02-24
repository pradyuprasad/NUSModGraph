import * as _ from 'lodash';
import axios from 'axios';
const COVID_ZONE_URL = 'https://raw.githubusercontent.com/nusmodifications/nusmods/master/website/src/data/covidZones.json';
// Explicitly typed so it excludes MemoizedFunction typing for easier mocking
const getCovidZones = _.memoize(async () => {
    const response = await axios.get(COVID_ZONE_URL);
    return response.data;
});
/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * Source: https://www.algorithms-and-technologies.com/point_in_polygon/javascript
 */
function pointInPolygon(polygon, point) {
    // A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    let odd = false;
    // For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
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
const getLocationCovidZone = _.memoize((zones, location) => {
    // Object.entries doesn't respect Record keys, so we need to cast here
    const zoneEntries = Object.entries(zones);
    const zone = zoneEntries.find(([, { positions }]) => pointInPolygon(positions, [location.y, location.x]));
    return zone?.[0] ?? 'Unknown';
});
export function getVenueCovidZone(venues, zones, venue) {
    const venueInfo = venues[venue];
    if (!venueInfo?.location) {
        return 'Unknown';
    }
    return getLocationCovidZone(zones, venueInfo.location);
}
export default getCovidZones;
