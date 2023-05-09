import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Destination } from "../interfaces/destination";

function randomInt(min: number, max: number): number {
  let result: number = Math.floor(Math.random() * (max - min + 1)) + min
  console.log(result)
  return result;
}

export function AddForm({
  onSubmit,
}: {
  onSubmit: (newDestination: Destination) => void;
}) {
  const [idNum, setIdNum] = useState<number>(40);
  const [destination, setDestination] = useState<Destination>({
    id: idNum,
    name: "",
    description: "",
    image: "panda.JPG",
    location: "",
    days: 0,
    cost: 0,
    activities: [] as string[],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === "activities"){
      setDestination({ ...destination, [event.target.name]: event.target.value.split(",") });
    } else {
      setDestination({ ...destination, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(destination);
    setIdNum(idNum + 1);
    setDestination({
      id: randomInt(35,100),
      name: "",
      description: "",
      image: "panda.JPG",
      location: "",
      days: 0,
      cost: 0,
      activities: [] as string[],
    });
  };

  //const notify = () => toast("Business added sucessfully to Browse!");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={destination.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={destination.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={destination.location}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Cost:
          <input
            type="text"
            name="cost"
            value={destination.cost}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Activities:
          <input
            type="text"
            name="activities"
            value={destination.activities}
            onChange={handleChange}
          />
        </label>
      </div>
      <br></br>
      <Button type="submit">
        Add Destination
      </Button>
    </form>
  );
}
