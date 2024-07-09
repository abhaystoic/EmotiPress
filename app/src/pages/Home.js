import React, { useState, useEffect } from 'react';
// import {Car} from '../Car.js';
// import { GoogleOAuthProvider } from "@react-oauth/google";


const Home = () => {
  const { 
    REACT_APP_API_KEY, 
    REACT_APP_TEMPLATE_ID, 
    REACT_APP_SERVICE_ID 
  } = process.env;

  const title = 'Home';
  
  useEffect(() => {
    document.title = title;
  });

  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );
  const [myCar, setMyCar] = useState("Volvo");

  const handleOptionChange = (event) => {
    setMyCar(event.target.value);
  };

  const handleChange = (event) => {
    setTextarea(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('The name you entered was:' + {textarea})
  }

  const element = (
    <><h1>{title}</h1>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
          </tr>
          <tr>
            <td>Elsa</td>
          </tr>
        </tbody>
      </table> */}
      {/* <Car/> */}
      {/* <div>
        <p>Current Name: {textarea}, current car: {myCar}</p>
        <form>
          <textarea value={textarea} onChange={handleChange} />
          <select value={myCar} onChange={handleOptionChange}>
            <option value="Ford">Ford</option>
            <option value="Volvo">Volvo</option>
            <option value="Fiat">Fiat</option>
          </select>
        </form>
      </div> */}
    </>
  );
  return element;
};

export default Home;