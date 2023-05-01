import React, {useState} from "react";
import { Form } from "react-bootstrap";

export function AddForm(): JSX.Element{
    const initialValues = {
        name: "",
        activities: "",
        price: 0
    }

    const [name, setName] = useState<string>("");
    const [activities, setActivities] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const [newListItem, setNewListItem] = useState("");

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    return <div>
        <Form.Group controlId="formAddDest">
            <Form.Label>Destination Name:</Form.Label>
            <Form.Control value = {name} onChange={updateName}></Form.Control>
        </Form.Group>
    </div>
}