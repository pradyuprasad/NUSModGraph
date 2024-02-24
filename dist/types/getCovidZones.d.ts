import type { Venue, VenueLocationMap } from './venues';
export type CovidZone = {
    color: string;
    positions: [number, number][];
};
export type CovidZoneId = 'A' | 'B' | 'C' | 'D' | 'E' | 'Unknown';
export type CovidZones = Record<Exclude<CovidZoneId, 'Unknown'>, CovidZone>;
declare const getCovidZones: () => Promise<CovidZones>;
export declare function getVenueCovidZone(venues: VenueLocationMap, zones: CovidZones, venue: Venue): CovidZoneId;
export default getCovidZones;
