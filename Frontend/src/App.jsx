// import React from 'react'
// import Login from './pages/Login'
// import { BrowserRouter, Routes,Route } from 'react-router-dom'
// import Signup from './pages/Signup'
// const App = () => {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path="/login" element={<Login/>}></Route>
//       <Route path='/register' element={<Signup></Signup>}></Route>
//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsList from "./pages/ItemsList.jsx";
import ItemDetails from "./pages/ItemsDetails.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemsList />} />
        <Route path="/items/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;