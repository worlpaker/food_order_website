import React from "react";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import Restaurants from "./components/Restaurants";
import { Order } from "./components/Order";
import { Orderhistory } from "./components/Orderhistory";
import Restaurantsfood from "./components/Restaurantsfood";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { Adminpanel } from "./components/Adminpanel";

function App() {
  return (

    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Restaurants" element={<Restaurants />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Restaurants_food" element={<Restaurantsfood />} />
        <Route path="/Orderhistory" element={<Orderhistory />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin" element={<Adminpanel />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
