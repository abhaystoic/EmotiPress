import { useEffect } from "react";

const Blogs = () => {

  const title = 'Blog Articles';
  
  useEffect(() => {
    document.title = title;
  }, []);

  return <h1>{title}</h1>;
};

export default Blogs;