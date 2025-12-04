import { useState } from "react";
import { IngredientTmp } from "./types";
import CreerIngredient from "./CreerIngredient";

interface ListeCreerIngredientProps {
    onChange: (ingredients: IngredientTmp[]) => void;
}

export default function ListeCreerIngredient({ onChange }: ListeCreerIngredientProps) {
    const [ingredients, setIngredients] = useState<IngredientTmp[]>([]);

    const addIngredient = () => {
        const updated = [...ingredients, { name: "", quantity: "", unit: "" }];
        setIngredients(updated);
        onChange(updated);
    };

    const updateIngredient = (
        index: number,
        field: keyof IngredientTmp,
        value: IngredientTmp[keyof IngredientTmp]
    ) => {
        const updated = [...ingredients];
        updated[index][field] = value;
        setIngredients(updated);
        onChange(updated);
    };

    return (
        <div className="sub-container">
            <h1 className="title">Ingrédients</h1>

            {ingredients.map((ing, i) => (
                <div className="sub-container">
                    <h1 className="tinyTitle">Ingredient {i+1}</h1>
                    <CreerIngredient
                        key={i}
                        data={ing}
                        onChange={(field, value) => updateIngredient(i, field, value)}
                    />
                </div>
    ))}

            <button onClick={addIngredient} className="tinyButton">Ajouter un ingrédient</button>
        </div>
    );
}
