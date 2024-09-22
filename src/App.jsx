// import React from 'react'

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./Components/CityList";
// import { useEffect, useState } from "react";
import CountryList from "./Components/CountriesList";
import City from "./Components/City";
import Form from "./Components/Form";
import { CitiesProvider } from "./Contexts/CityContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";

export default function App() {

  return (
    <AuthProvider>

    <CitiesProvider>
      
    <BrowserRouter> 
    <Routes>
      <Route index element={<Homepage/>} />
      <Route path="product" element={<Product/>} />
      <Route path="pricing" element={<Pricing/>} />
      <Route path="app" element={<AppLayout />}>
      <Route index element={ <Navigate replace to='cities' /> } />
      <Route path="cities" element={<CityList  />} />
      <Route path="cities/:id" element={<City />} />
      <Route path="form" element={<Form />} />
      <Route path="countries" element={<CountryList />} />
      </Route>
      
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  )
}
 