/***
 * A representation of a destination that makes up the central list
 */
export interface Destination {
    /** The unique ID of the location */
    id: number;
    /** Name of the travel destination (Attraction) */
    name: string;
    /** Description of the destination */
    description: string;
    /** Image (link/path) of the destination */
    image: string;
    /** State and city of the destination (Ex. Albany, NY) */
    location: string;
    /** The number of days the user will stay */
    days: number;
    /** Price to attend */
    cost: number;
    /** Activities (things to do) at destination */
    activities: string[];
}