import {useState} from "react";
import {IngredientTmp, RecipeTmp, StepTmp} from "./types";
import ListeCreerIngredient from "./ListeCreerIngredient";
import ListeCreerEtape from "./ListeCreerEtape";
import {supabase} from "../../App";




export default function CreerRecette() {
    const [recipeData, setRecipeData] = useState<RecipeTmp>({
        name: "",
        description: "",
        quantity: "",
        unit: "",
        ingredients: [],
        steps: []
    });

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
        console.log("RECETTE :", recipeData);

        const { data : id, error } = await supabase
            .from('reciepe')
            .insert([
                { description: recipeData.description, quantity: parseFloat(recipeData.quantity), unit: recipeData.unit, name: recipeData.name },
            ])
            .select()

        if (error) {
            console.error("Erreur lors de la création de la recette :", error);
            return;
        }
        const reciepeId = id ? id[0].id : -1;

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
            console.log("Ingr", ingredientId);
            await supabase
                .from('a_reciepe_ingredient')
                .insert([
                    { id_reciepe: reciepeId, id_ingredient: ingredientId, quantity: ing.quantity, unit: ing.unit },
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
                .from('a_reciepe_step')
                .insert([
                    { id_reciepe: reciepeId, id_step: stepId, order: step.order },
                ]);
            if (stepError) {
                console.error("Erreur lors de la création de l'association étape-recette :", stepError);
                return;
            }
        }
        window.location.href = "/recettes";

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

                <ListeCreerIngredient onChange={updateIngredients} />
                <ListeCreerEtape onChange={updateSteps} />

                <button onClick={handleSubmit} className="validateButton">Créer</button>
            </div>
        </div>
    );
}
