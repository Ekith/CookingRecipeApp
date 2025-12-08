import {useState} from "react";
import {IngredientTmp, RecipeTmp, StepTmp} from "../utils/types";
import ListCreateIngredient from "../common/create/ListCreateIngredient";
import ListCreateStep from "../common/create/ListCreateStep";
import {supabase} from "../App";
import {useNavigate} from "react-router-dom";


export default function CreateRecipe() {
    const [recipeData, setRecipeData] = useState<RecipeTmp>({
        name: "",
        description: "",
        quantity: "",
        unit: "",
        ingredients: [],
        steps: []
    });
    const navigate = useNavigate();


    // Mise à jour d'un champ simple
    const updateField = (field: keyof RecipeTmp, value: RecipeTmp[keyof RecipeTmp]) => {
        setRecipeData(prev => ({ ...prev, [field]: value }));
    };

    // Mise à jour globale de la liste des ingrédients
    const updateIngredients = (list: IngredientTmp[]) => {
        setRecipeData(prev => ({ ...prev, ingredients: list }));
    };

    // Mise à jour globale des étapes
    const updateSteps = (list: StepTmp[]) => {
        setRecipeData(prev => ({ ...prev, steps: list }));
    };

    const handleSubmit = async () => {

        const confirmDelete = window.confirm(
            "Voulez-vous enregistrer cette recette ?"
        );

        if (!confirmDelete) {
            return;
        }

        const { data : id, error } = await supabase
            .from('recipe')
            .insert([
                { description: recipeData.description, quantity: parseFloat(recipeData.quantity), unit: recipeData.unit, name: recipeData.name },
            ])
            .select()

        if (error) {
            console.error("Erreur lors de la création de la recette :", error);
            return;
        }
        const recipeId = id ? id[0].id : -1;

        for (const ing of recipeData.ingredients) {
            const { data : id, error: ingError } = await supabase
                .from('ingredient')
                .insert([
                    { name: ing.name},
                ])
                .select();
            if (ingError) {
                console.error("Erreur lors de la création de l'ingrédient :", ingError);
                return;
            }

            const ingredientId = id ? id[0].id : -1;
            await supabase
                .from('a_recipe_ingredient')
                .insert([
                    { id_recipe: recipeId, id_ingredient: ingredientId, quantity: ing.quantity, unit: ing.unit },
                ]);
        }

        for (const step of recipeData.steps) {
            const { data : id, error: stepError } = await supabase
                .from('step')
                .insert([
                    { description: step.description },
                ])
                .select();
            if (stepError) {
                console.error("Erreur lors de la création de l'étape :", stepError);
                return;
            }
            const stepId = id ? id[0].id : -1;
            await supabase
                .from('a_recipe_step')
                .insert([
                    { id_recipe: recipeId, id_step: stepId, order: step.order },
                ]);
            if (stepError) {
                console.error("Erreur lors de la création de l'association étape-recette :", stepError);
                return;
            }
        }

        navigate("/recipes");
    };

    return (
        <div className="global-container">
            <h1 className="bigTitle">Nouvelle recette</h1>
            <div className="form-container">
                <div className="text-and-entry">
                    <label className="text-entry">Nom :</label>
                    <input onChange={(e) => updateField("name", e.target.value)} placeholder="Nom" className="entry"/>
                </div>
                <div className="text-and-entry">
                    <label className="text-entry">Description :</label>
                    <input onChange={(e) => updateField("description", e.target.value)} placeholder="Description" className="entry"/>
                </div>
                <div className="text-and-entry">
                    <label className="text-entry">Quantité et Unité :</label>
                    <div className="row-entries">
                        <input onChange={(e) => updateField("quantity", e.target.value)} placeholder="Quantité" className="entry"/>
                        <input onChange={(e) => updateField("unit", e.target.value)} placeholder="Unité" className="entry"/>
                    </div>
                </div>

                <ListCreateIngredient onChange={updateIngredients} />
                <ListCreateStep onChange={updateSteps} />

                <button onClick={handleSubmit} className="validateButton">Créer</button>
            </div>
        </div>
    );
}
