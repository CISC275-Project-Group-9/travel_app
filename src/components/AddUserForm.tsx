import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { User } from "../interfaces/user";

export function AddUserForm({ onSubmit }: { onSubmit: (u: User) => void }) {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    role: "Basic",
    itinerary1: [],
    itinerary2: [],
    currItinerary: 1,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({
      ...user,
      role: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(user);
    setUser({
      id: 0,
      name: "",
      role: "",
      itinerary1: [],
      itinerary2: [],
      currItinerary: 1,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <h5>Add User:</h5>
          </Col>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label
                style={{
                  display: "inline-block",
                  float: "left",
                  paddingRight: 10,
                }}
              >
                Name:
                <input
                  data-testid="newUserName"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    minWidth: "100px",
                  }}
                />
              </Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formRole">
              <Form.Label
                style={{
                  display: "inline-block",
                  float: "left",
                  paddingRight: 10,
                  marginBottom: "0px",
                }}
              >
                Role:
              </Form.Label>
              <select
                data-testid="role"
                name="role"
                value={user.role}
                onChange={handleRoleChange}
                style={{
                  width: "100%",
                  minWidth: "100px",
                  height: "30px",
                }}
              >
                <option value="Basic">Basic</option>
                <option value="Staff">Staff</option>
                <option value="Faculty">Faculty</option>
              </select>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col>
            <div style={{ textAlign: "right", minWidth: "50px" }}>
              <Button type="submit">Add User</Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}
