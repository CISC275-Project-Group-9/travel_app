import { Destination } from "../interfaces/destination";
import { AddForm } from "./AddForm";
import { CentralListProps } from "../interfaces/props";
import { DestItem } from "./DestItem";

export function SuperList({centralList, setCentralList} : CentralListProps): JSX.Element {

    function newDestinationToList(newDestination: Destination) {
        if (!centralList.includes(newDestination)) {
            const newCentralList = [...centralList, newDestination];
            setCentralList(newCentralList);
        }
    }

    return (
        <div>
            <h3>Destinations:</h3>
            <AddForm onSubmit={newDestinationToList}></AddForm>
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
        </div>
    );
}
