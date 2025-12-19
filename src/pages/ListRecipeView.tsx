import Recipe from "../utils/Recipe";
import {useEffect, useState} from "react";
import {supabase} from "../App";
import {useAuth} from "../useAuth";
import {useNavigate} from "react-router-dom";


function ListRecipeView () {

    const [deleteMode, setDeleteMode] = useState<boolean>(false);

    const [recipies, setRecipes] = useState<Recipe[]>([]);

    const { user } = useAuth()
    const navigate = useNavigate();


    // se déclenche au chargement de la page
    useEffect(() => {
        fetchRecipies()
    }, [])


    async function fetchRecipies(filter: string = "") {

        let { data: recipe, error } = await supabase
            .from('recipe')
            .select('*')
            .order("name", { ascending: true })
            .ilike('name', `%${filter}%`) // Filter by name using case-insensitive LIKE operator

        if (error) console.log('erreur')

        setRecipes([]) // Clear the list before adding new recipies
        for (let r of recipe as any[]){
            const newRecipe = new Recipe(r.id, r.name, r.description, r.quantity, r.unit);
            setRecipes(prevRecipies => [...prevRecipies, newRecipe]);
        }
    }

    async function deleteRecipe(id: number){
        // Get all ingredient ids associated with the recette
        const { data: ingredientRecipe, error: ingredientRecipeError } = await supabase
            .from('a_recipe_ingredient')
            .select('id_ingredient')
            .eq('id_recipe', id);
        if (ingredientRecipeError) {
            console.log('Erreur lors de la récupération des ingrédients associés à la recette');
            return;
        }

        //Get all step ids associated with the recette
        const { data: recipeStep, error: recipeStepError } = await supabase
            .from('a_recipe_step')
            .select('id_step')
            .eq('id_recipe', id);
        if (recipeStepError) {
            console.log('Erreur lors de la récupération des étapes associées à la recette');
            return;
        }

        // Delete all associations in a_recipe_ingredient
        const { error: deleteIngredientRecipeError } = await supabase
            .from('a_recipe_ingredient')
            .delete()
            .eq('id_recipe', id);
        if (deleteIngredientRecipeError) {
            console.log('Erreur lors de la suppression des associations ingrédients-recette');
            return;
        }

        // Delete all associations in a_recipe_step
        const { error: deleteRecipeStepError } = await supabase
            .from('a_recipe_step')
            .delete()
            .eq('id_recipe', id);
        if (deleteRecipeStepError) {
            console.log('Erreur lors de la suppression des associations étapes-recette');
            return;
        }

        // Delete all associations in a_step_ingredient
        const { error: deleteIngredientStepError } = await supabase
            .from('a_step_ingredient')
            .delete()
            .in('id_step', recipeStep.map((rs: any) => rs.id_step));
        if (deleteIngredientStepError) {
            console.log('Erreur lors de la suppression des associations ingrédients-étapes');
            return;
        }

        // Delete all ingredients associated with the recette
        for (let ir of ingredientRecipe as any[]){
            const { error: deleteIngredientError } = await supabase
                .from('ingredient')
                .delete()
                .eq('id', ir.id_ingredient);
            if (deleteIngredientError) {
                console.log('Erreur lors de la suppression de l\'ingrédient');
                return;
            }
        }
        // Delete all steps associated with the recette
        for (let rs of recipeStep as any[]){
            const { error: deleteStepError } = await supabase
                .from('step')
                .delete()
                .eq('id', rs.id_step);
            if (deleteStepError) {
                console.log('Erreur lors de la suppression de l\'étape');
                return;
            }
        }
        // Finally, delete the recette
        const { error: deleteRecipeError } = await supabase
            .from('recipe')
            .delete()
            .eq('id', id);
        if (deleteRecipeError) {
            console.log('Erreur lors de la suppression de la recette');
            return;
        }

        console.log('Recette supprimée avec succès');
        // Refresh the list of recipies
        fetchRecipies();
    }


    function handleClick(recipe: Recipe) {
        navigate('/recipe', {
            state: {
                recipe: recipe
            }
        })
    }

    return (
        <div className="sub-container">
            <h1 className="bigTitle">Recettes :</h1>

            {user &&
                <div className="sub-container">
                    <button onClick={() => setDeleteMode(!deleteMode)} className="tinyButton">
                        {deleteMode ? 'Désactiver le mode suppression' : 'Activer le mode suppression'}
                    </button>
                </div>
            }

            <div className="sub-container">
                <input
                    type="text"
                    className="entry-tiny"
                    onChange={
                        (e) => {
                            fetchRecipies(e.target.value);
                        }
                    }
                />
            </div>

            <div className="sub-container">
                {recipies.map((recette) => (
                    <div
                        key={recette.id}
                        onClick={() => {
                            console.log("blabla", recette);
                            handleClick(recette)
                        }}
                        className="card"
                    >
                        <h3 className="tinyTitle">{recette.name}</h3>
                        <p className="normal-text">{recette.description}</p>
                        <div className="sub-container">
                            {deleteMode && (
                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation(); // Empêche la propagation du clic au parent
                                        await deleteRecipe(recette.id);
                                    }}
                                    className="tinyButton"
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListRecipeView;