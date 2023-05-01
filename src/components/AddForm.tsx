import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Destination } from "../interfaces/destination";
import { useSessionStorage } from "../hooks/useSessionStorage";

export function AddForm({
  onSubmit,
}: {
  onSubmit: (newDestination: Destination) => void;
}) {
  const initialValues = {
    id: 0,
    name: "",
    description: "",
    image: "",
    location: "",
    days: 0,
    cost: 0,
    activities: [] as string[],
  };

  const [destination, setDestination] = useState<Destination>({
    id: 0,
    name: "",
    description: "",
    image: "",
    location: "",
    days: 0,
    cost: 0,
    activities: [] as string[],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination({ ...destination, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(destination);
    setDestination({
      id: 0,
      name: "",
      description: "",
      image: "",
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
          Activities:
          <input
            type="text"
            name="activity"
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

/* export function AddForm({
    handleClose, 
    addDestination
} : {
    handleClose: () => void;
    addDestination: (newDestination: Destination) => void;
})  {
    const [destName, setDestName] = useState<string>("");
    const [destActivities, setActivities] = useState<string[]>([]);
    const [price, setPrice] = useState<number>(0);

    function saveChanges(){
        addDestination({
            id: 0, 
            name: destName, 
            description: "", 
            image: "",
            location: "", 
            days: 0, 
            cost: price, 
            activities: destActivities
        });
        handleClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        onsubmit(inputs);
        setInput
    }

    return <div>
        <form onSubmit={handleSubmit}>





        </form>
        <Form.Group controlId="formAddDest">
            <Form.Label>Destination Name:</Form.Label>
            <Form.Control value = {name} onChange={updateName}></Form.Control>
            <Form.Label>Activities:</Form.Label>
            <Form.Control value = {activities} onChange={updateActivities}></Form.Control>
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" value= {price} onChange={updatePrice}></Form.Control>
        </Form.Group>
    </div>
} */
