import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export function EditMode(): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);

    return (
        <div>
            <h3>Edit Mode</h3>
            {editMode ? (
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(event.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formIsStudent">
                        <Form.Check
                            type="checkbox"
                            label="Is a student?"
                            checked={isStudent}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setIsStudent(event.target.checked);
                            }}
                        />
                    </Form.Group>
                </Form>
            ) : (
                <p>
                    {name} is {isStudent ? "a student" : "not a student"}.
                </p>
            )}
            <Form.Group controlId="formEditModeSwitch">
                <Form.Check
                    type="switch"
                    label="Edit Mode"
                    checked={editMode}
                    onChange={() => setEditMode(!editMode)}
                />
            </Form.Group>
        </div>
    );
}
