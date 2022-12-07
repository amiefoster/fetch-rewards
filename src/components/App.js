import { useState, useEffect } from "react";
import "../App.css";

import Header from "./Header";
import SignUpForm from "./SignUpForm";

function App() {
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);

    useEffect(() => {
      //fetch occupation and state from api 
      fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((response) => {
        if (response.ok){
          return response.json()
        }
      })
      .then((data) => checkIfOccAndStateLoaded(data));
   }, []);

   const checkIfOccAndStateLoaded = (obj) => {
     //function to check if obj has been fetched 
      //if it has then set occupations and states state to those values and send to form component
    if (!!obj) {
        setOccupations(obj.occupations);
        setStates(obj.states);
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <SignUpForm occupations={occupations} states={states}/>
      </div>
    </div>
  );
}

export default App;
