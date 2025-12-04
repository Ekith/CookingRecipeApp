import Ingredient from "../../Controller/Ingredient";


function IngredientView({ingredient}: { ingredient: Ingredient })
{
    return (
        <div className="sub-container">
            <h1 className="tinyTitle">{ingredient.name}</h1>
            <p className="normal-text">
                {ingredient.quantity > 0 ? ingredient.quantity : ''}{ingredient.unit}
            </p>
        </div>
    );
}

export default IngredientView;