import { DayText, ModuleCode, RawLesson } from './modules';
export type Venue = string;
export type VenueList = Venue[];
export type VenueOccupiedState = 'vacant' | 'occupied';
export declare const VACANT: VenueOccupiedState;
export declare const OCCUPIED: VenueOccupiedState;
export type Availability = {
    [key: string]: VenueOccupiedState;
};
export type VenueLesson = Omit<RawLesson, 'venue' | 'covidZone'> & {
    moduleCode: ModuleCode;
};
export type DayAvailability = Readonly<{
    day: DayText;
    classes: VenueLesson[];
    availability: Availability;
}>;
export type VenueInfo = Readonly<{
    [venue: string]: DayAvailability[];
}>;
export type VenueLocation = {
    readonly roomName: string;
    readonly floor?: number | string | null;
    readonly location?: {
        x: number;
        y: number;
    };
};
export type VenueLocationMap = {
    readonly [key: string]: VenueLocation;
};
