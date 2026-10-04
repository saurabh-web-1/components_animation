 import React from 'react'
 import { Routes,Route } from 'react-router-dom'
 import Componnent from "./component/Carousel3D/Carousel3D"
 
 function App() {
   return (
     <Routes>
      <Route
  path="/"
  element={
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <Componnent />
    </div>
  }
/>
     </Routes>
   )
 }
 
 export default App