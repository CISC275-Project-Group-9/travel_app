import React from "react";
import { RoleDropdown } from "./components/RoleDropdown";
import "./App.css"; 
// import AL from './images/AL.jpeg'
// import AR from './images/AR.jpeg'
// import AZ from './images/AZ.jpeg'
// import CA from './images/CA.jpeg'
// import CO from './images/CO.jpeg'
// import CT from './images/CT.jpeg'
// import DE from './images/DE.jpeg'
// import FL from './images/FL.jpeg'
// import GA from './images/GA.jpeg'
// import IA from './images/IA.jpeg'
// import ID from './images/ID.jpeg'
// import IL from './images/IL.jpeg'
// import IN from './images/IN.jpeg'
// import KS from './images/KS.jpeg'
// import KY from './images/KY.jpeg'
// import LA from './images/LA.jpeg'
// import MA from './images/MA.jpeg'
// import MD from './images/MD.jpeg'
// import ME from './images/ME.jpeg'
// import MI from './images/MI.jpeg'
// import MN from './images/MN.jpeg'
// import MO from './images/MO.jpeg'
// import NJ from './images/NJ.jpeg'
// import NV from './images/NV.jpeg'
// import NY from './images/NY.jpeg'
// import PA from './images/PA.jpeg'
// import SC from './images/SC.jpeg'
// import SD from './images/SD.jpeg'
// import TN from './images/TN.jpeg'
// import TX from './images/TX.jpeg'
// import WA from './images/WA.jpeg'
// import WY from './images/WY.jpeg'

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
