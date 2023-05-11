import React, { useState } from "react";
import { Destination } from "../interfaces/destination";
import "./UserList.css";
import { DestItem } from "./DestItem";

export function SharedList(): JSX.Element {

    const [sharedList, setSharedList] = useState<Destination[]>([]);


    return (
        <div>
            {sharedList.map((dest: Destination) => {
                return (
                    <><DestItem
                        id={dest.id}
                        key={dest.id}
                        name={dest.name}
                        description={dest.description}
                        image={dest.image}
                        location={dest.location}
                        cost={dest.cost}
                        days={dest.days}
                        activities={dest.activities}
                    ></DestItem></>
                );
            })}
        </div>
    )
};