import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { User } from "./RoleDropdown";

export function DeleteUserForm({
  onSubmit,
  users,
}: {
  onSubmit: (u: User) => void;
  users: User[];
}) {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "Default Basic User",
    role: "Basic",
    itinerary: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({
      ...user,
      name: event.target.value,
    });
  }    

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(user);
    setUser({
      id: 0,
      name: "",
      role: "",
      itinerary: [],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ paddingTop: 10 }}>
        <Row>
          <Col>
            <h5>Delete User:</h5>
          </Col>
          <Col>
            <Form.Group controlId="formUser">
              <Form.Label
                style={{
                  display: "inline-block",
                  float: "left",
                  paddingRight: 10,
                  marginBottom: "0px",
                }}
              ></Form.Label>
              <select
                data-testid = "deleteUserDropdown"
                name="user"
                value={user.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  minWidth: "100px",
                  height: "30px",
                }}
              >
                {users.map((user: User) => (
                  <option key={user.name} value={user.name}>
                    {" "}
                    {user.name}{" "}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col>
            <div style={{ textAlign: "right", minWidth: "50px" }}>
              <Button type="submit">Delete User</Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}
