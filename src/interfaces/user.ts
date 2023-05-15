import { Destination } from './destination';

export interface User {
    id: number;
    name: string;
    role: string;
    itinerary: Destination[];
  }