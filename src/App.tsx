import React from "react";
import { RoleDropdown } from "./components/RoleDropdown";
import "./App.css"; 

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title">ExplorerPro</h1>
            </header>
            <RoleDropdown></RoleDropdown>
            <footer className="App-footer">Team 9: Benita Abraham, Sneha Nangelimalil, Joey Casagrande,
                Samantha Glover, and Christian Munley
            </footer>
        </div>
    );
}

export default App;
