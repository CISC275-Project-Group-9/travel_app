import React, { useState } from "react";
import { UserList } from "./UserList";
import { Form } from "react-bootstrap";
import { AdminList } from "./AdminList";
import { SuperList } from "./SuperList";
import "./RoleDropdown.css";
import destinationsData from "../data/destinations.json";
import { Destination } from "../interfaces/destination";
import { AddUserForm } from "./AddUserForm";

export interface User {
  id: number;
  name: string;
  role: string;
  itinerary: Destination[];
}

const { DESTINATIONS }: Record<string, Destination[]> =
  // Typecast the test data that we imported to be a record matching
  //  strings to the question list
  destinationsData as Record<string, Destination[]>;

export function RoleDropdown(): JSX.Element {
  const ROLES = ["Basic", "Staff", "Faculty"];
  const DEFAULT_ROLE = ROLES[0];
  const [roleType, setRoleType] = useState<string>(DEFAULT_ROLE);
  const [centralList, setCentralList] = useState<Destination[]>(DESTINATIONS);
  const [sharedList, setSharedList] = useState<Destination[]>([]);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Default Basic User",
      role: "Basic",
      itinerary: [],
    },
    {
      id: 2,
      name: "Default Staff User",
      role: "Staff",
      itinerary: [],
    },
    {
      id: 3,
      name: "Default Faculty User",
      role: "Faculty",
      itinerary: [],
    },
  ]);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  function addNewUser(newUser: User) {
    if (!users.includes(newUser)) {
      const newUsers = [...users, newUser];
      setUsers(newUsers);
      setCurrentUser(newUser);
      setRoleType(newUser.role);
    }
  }

  function handleAddUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setRoleType(users.filter((user: User) => event.target.value === user.name)[0].role);
    setCurrentUser(
      users.filter((user: User) => event.target.value === user.name)[0]
    );
  }

  function setItinerary(newItinerary: Destination[]) {
    const newUsers = [...users];
    const index = newUsers.findIndex(
      (user: User) => user.name === currentUser.name
    );
    newUsers[index].itinerary = newItinerary;
    setUsers(newUsers);
    setCurrentUser(newUsers[index]);
  }

  return (
    // note role-dropdown was the old style and now we have users.
    <div className="role-dropdown">
      <div className="roleButton">
        <div className="dropdown-label">Choose your user:</div>
        <Form.Group controlId="userSelect">
          <Form.Select value={currentUser.name} onChange={handleAddUser}>
            {users.map((user: User) => (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <div className="userLabel">
        <h5>Current User: {currentUser.name}</h5>
      </div>
      <div className="addUser">
        <AddUserForm onSubmit={addNewUser}></AddUserForm>
      </div>
      <div className="list-container">
        {roleType === "Basic" && (
          <UserList
            centralList={centralList}
            setCentralList={setCentralList}
            itinerary={currentUser.itinerary}
            setItinerary={setItinerary}
            currentUser={currentUser}
          ></UserList>
        )}
        {roleType === "Staff" && (
          <AdminList
            centralList={centralList}
            setCentralList={setCentralList}
            sharedList={sharedList}
            setSharedList={setSharedList}
          ></AdminList>
        )}
        {roleType === "Faculty" && (
          <SuperList
            centralList={centralList}
            setCentralList={setCentralList}
            sharedList={sharedList}
            setSharedList={setSharedList}
          ></SuperList>
        )}
        {roleType !== "Basic" &&
          roleType !== "Staff" &&
          roleType !== "Faculty" && <div>Invalid role type</div>}
      </div>
    </div>
  );
}
