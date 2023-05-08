import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import destinationsData from "../data/destinations.json"
import { DestItem } from "./DestItem";

export function CentralList(): JSX.Element {
    const { DESTINATIONS }: Record<string, Destination[]> =
      // Typecast the test data that we imported to be a record matching
      //  strings to the question list
      destinationsData as Record<string, Destination[]>;

    const [centralList] = useState<Destination[]>(DESTINATIONS);

    return (
        <div>
            {centralList.map((dest: Destination) => {
                return (
                    <DestItem
                    id={dest.id}
                    key={dest.id}
                    name={dest.name}
                    description={dest.description}
                    image={dest.image}
                    location={dest.location}
                    cost={dest.cost}
                    days={dest.days}
                    activities={dest.activities}
                    ></DestItem>
                );
            })}
        </div>
    )
};