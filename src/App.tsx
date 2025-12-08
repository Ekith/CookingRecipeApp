import React from 'react';
import './App.css';

import './style/common.css';
import './style/style.css';


import {Route, Routes} from "react-router-dom";


import ListRecipeView from "./pages/ListRecipeView";
import CreateRecipe from "./pages/CreateRecipe";
import UpBar from "./common/Bar/UpBar";
import Login from "./pages/Login";

import {createClient} from '@supabase/supabase-js';
import HomePage from "./pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import {useAuth} from "./useAuth";
import Disconnect from "./pages/Disconnect";
import RecipeView from "./pages/RecipeView";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseapikey = process.env.REACT_APP_SUPABASE_API_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseapikey);


function App() {

    const { user, loading } = useAuth();

    console.log(user, loading);

    return (
    <div className="App global-container">

        <UpBar/>

        <Routes>
            {/* Route accessible par tous*/}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipes" element={<ListRecipeView />} />
            <Route path="/recipe" element={<RecipeView />} />
            <Route path="/disconnect" element={<Disconnect />}/>

            {/* Route non accessible par tous*/}
            <Route
                path="/create-recipe"
                element={
                <PrivateRoute>
                    <CreateRecipe />
                </PrivateRoute>
            } />
        </Routes>


    </div>
  );
}

export default App;
