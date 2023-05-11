import React, { useState } from "react";
import { UserList } from "./UserList";
import { Form } from "react-bootstrap";
import { AdminList } from "./AdminList";
import { SuperList } from "./SuperList";
import "./RoleDropdown.css";
import destinationsData from "../data/destinations.json"
import { Destination } from "../interfaces/destination";


const { DESTINATIONS }: Record<string, Destination[]> =
      // Typecast the test data that we imported to be a record matching
      //  strings to the question list
      destinationsData as Record<string, Destination[]>;

export function RoleDropdown(): JSX.Element {
  const ROLES = ["Basic", "Staff", "Faculty"];
  const DEFAULT_ROLE = ROLES[0];
  const [roleType, setRoleType] = useState<string>(DEFAULT_ROLE);
  const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);
  const [itinerary, setItinerary] = useState<Destination[]>([]);
  const [sharedList, setSharedList] = useState<Destination[]>([]);

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
        {roleType === "Basic" ? <UserList centralList={centralList} setCentralList={setCentralList} itinerary={itinerary} setItinerary={setItinerary}></UserList> : null}
        {roleType === "Staff" ? <AdminList centralList={centralList} setCentralList={setCentralList} sharedList={sharedList} setSharedList={setSharedList}></AdminList> : null}
        {roleType === "Faculty" ? <SuperList centralList={centralList} setCentralList={setCentralList} sharedList={sharedList} setSharedList={setSharedList}></SuperList> : null}
      </div>
    </div>
  );
}