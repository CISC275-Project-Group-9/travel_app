import React, { useState } from "react";
import { UserList } from "./UserList";
import { Form } from "react-bootstrap";
import { AdminList } from "./AdminList";
import { SuperList } from "./SuperList";
import "./RoleDropdown.css";
import destinationsData from "../data/destinations.json";
import { Destination } from "../interfaces/destination";
import { AddUserForm } from "./AddUserForm";
import { DeleteUserForm } from "./DeleteUserForm";
import { User } from "../interfaces/user";

const { DESTINATIONS }: Record<string, Destination[]> =
  // Typecast the test data that we imported to be a record matching
  //  strings to the question list
  destinationsData as Record<string, Destination[]>;

export function RoleDropdown(): JSX.Element {
  // state hooks
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
      itinerary1: [],
      itinerary2: [],
      currItinerary: 1,
    },
    {
      id: 2,
      name: "Default Staff User",
      role: "Staff",
      itinerary1: [],
      itinerary2: [],
      currItinerary: 1,
    },
    {
      id: 3,
      name: "Default Faculty User",
      role: "Faculty",
      itinerary1: [],
      itinerary2: [],
      currItinerary: 1,
    },
  ]);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  // user functions
  function addNewUser(newUser: User) {
    if (!users.includes(newUser)) {
      const newUsers = [...users, newUser];
      setUsers(newUsers);
      setCurrentUser(newUser);
      setRoleType(newUser.role);
    }
  }

  function selectUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setRoleType(
      users.filter((user: User) => event.target.value === user.name)[0].role
    );
    setCurrentUser(
      users.filter((user: User) => event.target.value === user.name)[0]
    );
  }

  function deleteUser(user: User) {
    const newUsers = users.filter((u: User) => u.name !== user.name);
    setUsers(newUsers);
  }

  // function to set the current user's itinerary, passed as props to user list so it can modify user state here
  function setItinerary(newItinerary: Destination[]) {
    const newUsers = [...users];
    const index = newUsers.findIndex(
      (user: User) => user.name === currentUser.name
    );
    if (currentUser.currItinerary === 1) {
      newUsers[index].itinerary1 = newItinerary;
    } else {
      newUsers[index].itinerary2 = newItinerary;
    }
    setUsers(newUsers);
    setCurrentUser(newUsers[index]);
  }

  return (
    <div className="role-dropdown">
      <div className="roleButton">
        <div className="dropdown-label">Choose your user:</div>
        <Form.Group controlId="userSelect">
          <Form.Select data-testid={"changeUser"} value={currentUser.name} onChange={selectUser}>
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
        {/* add user form included here instead of in faculty list: */}
        {roleType === "Faculty" && (
          <>
            <AddUserForm onSubmit={addNewUser} />
            <DeleteUserForm onSubmit={deleteUser} users={users} />
          </>
        )}{" "}
      </div>
      <div className="list-container">
        {/* display based on user type: */}
        {roleType === "Basic" && (
          <UserList
            centralList={centralList}
            setCentralList={setCentralList}
            itinerary1={currentUser.itinerary1}
            itinerary2={currentUser.itinerary2}
            setItinerary={setItinerary}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            users={users}
            setUsers={setUsers} 
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
        {/* invalid role type - shouldnt ever occur */}
        {roleType !== "Basic" &&
          roleType !== "Staff" &&
          roleType !== "Faculty" && <div>Invalid role type</div>}
      </div>
    </div>
  );
}
