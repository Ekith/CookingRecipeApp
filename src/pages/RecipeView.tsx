import Recipe from '../utils/Recipe';
import ListIngredientView from "../common/view/ListIngredientView";
import ListStepView from "../common/view/ListStepView";
import {useEffect, useState} from "react";
import {supabase} from "../App";
import Ingredient from "../utils/Ingredient";
import Step from "../utils/Step";
import {useLocation} from "react-router-dom";


function RecipeView() {

    const [recipe, setRecipe] = useState<Recipe>(new Recipe(-1, '', '', 0, ''));
    const [listIngredients, setListIngredients] = useState<Ingredient[]>([]);
    const [listStep, setListStep] = useState<Step[]>([]);

    const location = useLocation()

    // se déclenche au chargement de la page
    useEffect(() => {
        console.log(location.state)
        if (location.state?.recipe) {
            setRecipe(location.state.recipe)
            fetchRecipies(location.state.recipe);
            fetchRecipies2(location.state.recipe);
        }
    }, [])

    async function fetchRecipies(recipe : Recipe) {
        let {data: a_recipe_ingredient, error} = await supabase
            .from('a_recipe_ingredient')
            .select(`*, ingredient(*)`)
            .eq('id_recipe', recipe.id);

        if (error) console.log('erreur')


        setListIngredients([]) // Clear the list before adding new ingredients
        for (let r of a_recipe_ingredient as any[]) {
            const newIngr = new Ingredient(r.ingredient.id, r.ingredient.name, r.quantity, r.unit);
            setListIngredients(prevIngredients => [...prevIngredients, newIngr]);
        }
    }

    async function fetchRecipies2(recipe : Recipe) {
        let { data: a_recipe_step, error } = await supabase
            .from('a_recipe_step')
            .select(`*, step(*)`)
            .eq('id_recipe', recipe.id);

        if (error) console.log('erreur')

        setListStep([]) // Clear the list before adding new steps
        for (let r of a_recipe_step as any[]){
            const newStep = new Step(r.step.id, r.step.description, r.order, []);
            setListStep(prevSteps => [...prevSteps, newStep]);
        }
    }

    return (
        <div className="sub-container">
            <h1 className="bigTitle">{recipe.nom}</h1>
            <div className="sub-container">
                <p className="sub-container normal-text">Quantités pour {recipe.quantity} {recipe.unit}</p>
                <p className="sub-container normal-text">{recipe.description}</p>
            </div>
            <div className="sub-container">
                <ListIngredientView listeIngredients={listIngredients}/>
            </div>
            <div className="sub-container">
                <ListStepView listEtape={listStep} />
            </div>
        </div>
  );
}

export default RecipeView;