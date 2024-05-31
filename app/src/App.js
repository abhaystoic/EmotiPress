import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

const FirstTest = () => {
  return (
    <div>
      <h2>First Test</h2>
    </div>
  )
}

const TestWithMockData = ({data, displayUnorderedList, handleClick}) => {
  return (
        <div>
            {displayUnorderedList ? 
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            {item.id}, 
                            {item.first_name},
                            <a onClick={() => {
                                console.log("email link clicked")
                                handleClick()
                            }}>{item.email}</a>

                            {item.age > 50 ? 'Senior' : 'Not senior'}

                        </li>
                    ))}
                </ul>
            : 
                <ol>
                    {data.map(item => (
                        <li key={item.id}>
                            Last name: {item.last_name}
                        </li>
                    ))}
                </ol>
            }
        </div>
      )
} 

function App() {
  const myelement = (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );

  const mockData = [
    {
        "id": 1,
        "first_name": "Fletcher",
        "last_name": "McVanamy",
        "email": "mmcvanamy0@e-recht24.de",
        "age": 30
      }, {
        "id": 2,
        "first_name": "Clarice",
        "last_name": "Harrild",
        "email": "charrild1@dion.ne.jp",
        "age": 35
      }, 
  ]
  return (
    <div className="App">
      <>
        {/* <FirstTest /> */}
        {/* <TestWithMockData data={mockData} 
                          displayUnorderedList={true} 
                          handleClick={() => console.log("email link clicked 1")}/> */}
        {myelement}
      </>
    </div>
  );
}

export default App;
