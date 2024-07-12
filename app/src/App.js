import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import SendNotifications from './pages/SendNotifications';

function App() {
  const myelement = (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="sendNotifications" element={<SendNotifications />} />
            <Route path="chat" element={<Chat />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );

return (
    <div className="App">
      {myelement}
    </div>
  );
}

export default App;
