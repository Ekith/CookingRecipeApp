import React from 'react';
import './App.css';

import './style/common.css';
import './style/style.css';


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";


import ListeRecetteView from "./View/View/ListeRecetteView";
import CreerRecette from "./View/Create/CreerRecette";
import UpBar from "./View/Bar/UpBar";
import Login from "./View/Login";

import { createClient } from '@supabase/supabase-js';
import HomePage from "./View/HomePage";
import PrivateRoute from "./PrivateRoute";
import {useAuth} from "./useAuth";
import Disconnect from "./View/Disconnect";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseapikey = process.env.REACT_APP_SUPABASE_API_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseapikey);


function App() {

    const { user, loading } = useAuth();

    console.log(user, loading);

    return (
    <div className="App">

        <UpBar/>

        <Router>
            <Routes>
                {/* Route accessible par tous*/}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recettes" element={<ListeRecetteView />} />
                <Route path="/disconnect" element={<Disconnect />}/>

                {/* Route non accessible par tous*/}
                <Route
                    path="/creer-recette"
                    element={
                    <PrivateRoute>
                        <CreerRecette />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>


    </div>
  );
}

export default App;
