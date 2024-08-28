import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./Screens/MainScreen/MainScreen";

function Router() {
  return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainScreen/>} path={'/'}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
