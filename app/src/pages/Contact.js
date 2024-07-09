import { useEffect } from "react";

const Contact = () => {
  const title = 'Contact Me';
  
  useEffect(() => {
    document.title = title;
  });
  
  return <h1> {title} </h1>;
};

export default Contact;