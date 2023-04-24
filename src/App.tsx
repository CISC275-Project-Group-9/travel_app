import React from "react";
import { RoleDropdown } from "./components/RoleDropdown";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <h1>ExplorerPro</h1>
            </header>
            <p>
                Team 9: Benita Abraham, Sneha Nangelimalil, Joey Casagrande,
                Samantha Glover, and Christian Munley
            </p>
            <hr></hr>
            <RoleDropdown></RoleDropdown>
            <hr></hr>
        </div>
    );
}

export default App;
