import { IngredientTmp } from "./types";
import { FieldUpdaterTmp } from "./types";

interface CreerIngredientProps {
    data: IngredientTmp;
    onChange: FieldUpdaterTmp<IngredientTmp>;
}

export default function CreerIngredient({ data, onChange }: CreerIngredientProps) {
    return (
        <div className="sub-container">

            <div className="text-and-entry">
                <label className="text-entry">Nom :</label>
                <input
                    value={data.name}
                    placeholder="Nom ingrédient"
                    onChange={(e) => onChange("name", e.target.value)}
                    className="entry"
                />
            </div>

            <div className="text-and-entry">
                <label className="text-entry">Quantité et unité :</label>
                <div className="row-entries">
                    <input
                        value={data.quantity}
                        placeholder="Quantité"
                        onChange={(e) => onChange("quantity", e.target.value)}
                        className="entry"
                    />
                    <input
                        value={data.unit}
                        placeholder="Unité"
                        onChange={(e) => onChange("unit", e.target.value)}
                        className="entry"
                    />
                </div>
            </div>


        </div>
    );
}
