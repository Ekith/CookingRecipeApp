

class RecipeStep {

    recipeId: number;
    stepId: number;
    order: number;

    constructor(recipeId: number, stepId: number, order: number) {
        this.recipeId = recipeId;
        this.stepId = stepId;
        this.order = order;
    }

}

export default RecipeStep;