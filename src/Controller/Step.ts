import IngredientStep from "./IngredientStep";


class Step {
    id: number;
    description: string;
    order: number;
    ingredientsStep: IngredientStep[];

    constructor(id : number, description: string, order: number, ingredientsStep: IngredientStep[]) {
        this.id = id;
        this.description = description;
        this.order = order;
        this.ingredientsStep = ingredientsStep;
    }
}

export default Step;