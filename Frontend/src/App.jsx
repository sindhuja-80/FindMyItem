import React from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path='/register' element={<Signup></Signup>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

