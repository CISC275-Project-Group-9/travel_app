import { Destination } from './destination';

export interface User {
    id: number;
    name: string;
    role: string;
    itinerary1: Destination[];
    itinerary2: Destination[];
    currItinerary: number;
  }