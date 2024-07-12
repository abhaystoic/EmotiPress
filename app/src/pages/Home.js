import React, { useState, useEffect } from 'react';


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
    <>
      <h1>{title}</h1>
    </>
  );
  return element;
};

export default Home;