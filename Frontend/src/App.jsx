import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsList from "./pages/ItemsList.jsx";
import ItemDetails from "./pages/ItemsDetails.jsx";
import SuggestedMatches from "./pages/SuggestedMatches.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SignUp from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRute.jsx";
import SubmitItem from "./pages/SubmitItem.jsx";
import Profile from "./pages/Profile.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route path="/" element={<ProtectedRoute><ItemsList /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route>
        <Route path="/submit-item" element={<ProtectedRoute><SubmitItem></SubmitItem></ProtectedRoute>}></Route>
        <Route path="/items/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
        <Route path="/matches" element={<ProtectedRoute><SuggestedMatches/></ProtectedRoute>}></Route>
        <Route path="/chat/:userId" element={<ProtectedRoute><ChatPage></ChatPage></ProtectedRoute>}></Route>
         <Route path="/chat" element={<div>Select a user to chat</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;