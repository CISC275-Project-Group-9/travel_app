import React, { useState } from "react";
import UserList from "./UserList";
import { Form } from "react-bootstrap";
import { AdminList } from "./AdminList";
import { SuperList } from "./SuperList";
import "./RoleDropdown.css";

export function RoleDropdown(): JSX.Element {
  const ROLES = ["Basic", "Staff", "Faculty"];
  const DEFAULT_ROLE = ROLES[0];
  const [roleType, setRoleType] = useState<string>(DEFAULT_ROLE);

  function changeRole(event: React.ChangeEvent<HTMLSelectElement>) {
    setRoleType(event.target.value);
  }

  return (
    <div className="role-dropdown">
      <div className="roleButton">
        <div className="dropdown-label">Choose your role:</div>
        <Form.Group controlId="roleSelect">
          <Form.Select value={roleType} onChange={changeRole}>
            {ROLES.map((role: string) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <div className="list-container">
        {roleType === "Basic" ? <UserList></UserList> : null}
        {roleType === "Staff" ? <AdminList></AdminList> : null}
        {roleType === "Faculty" ? <SuperList></SuperList> : null}
      </div>
    </div>
  );
}
