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
                <h1>ExplorerPro</h1>
                <p style={{fontSize: "16px" }}>
                Team 9: Benita Abraham, Sneha Nangelimalil, Joey Casagrande,
                Samantha Glover, and Christian Munley
            </p>
            </header>
            <hr></hr>
            <RoleDropdown></RoleDropdown>
            <hr></hr>
            {/* <img src={AL} alt="Alabama"></img>
            <img src={AR} alt="Arkansas"></img>
            <img src={AZ} alt="Arizona"></img>
            <img src={CA} alt="California"></img>
            <img src={CO} alt="Colorado"></img>
            <img src={CT} alt="Connecticut"></img>
            <img src={DE} alt="Delaware"></img>
            <img src={FL} alt="Florida"></img>
            <img src={GA} alt="Georgia"></img>
            <img src={IA} alt="Iowa"></img>
            <img src={ID} alt="Idaho"></img>
            <img src={IL} alt="Illinois"></img>
            <img src={IN} alt="Indiana"></img>
            <img src={KS} alt="Kansas"></img>
            <img src={KY} alt="Kentucky"></img>
            <img src={LA} alt="Louisiana"></img>
            <img src={MA} alt="Massachusetts"></img>
            <img src={MD} alt="Maryland"></img>
            <img src={ME} alt="Maine"></img>
            <img src={MI} alt="Michigan"></img>
            <img src={MN} alt="Minnesota"></img>
            <img src={MO} alt="Missouri"></img>
            <img src={NJ} alt="New Jersey"></img>
            <img src={NV} alt="Nevada"></img>
            <img src={NY} alt="New York"></img>
            <img src={PA} alt="Pennsylvania"></img>
            <img src={SC} alt="South Carolina"></img>
            <img src={SD} alt="South Dakota"></img>
            <img src={TN} alt="Tennessee"></img>
            <img src={TX} alt="Texas"></img>
            <img src={WA} alt="Washington"></img>
            <img src={WY} alt="Wyoming"></img> */}
        </div>
    );
}

export default App;
