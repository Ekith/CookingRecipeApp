import Ingredient from "./Ingredient";
import Step from "./Step";


class Reciepe {
    id : number;
    nom : string;
    description : string;
    quantity : number;
    unit : string;

    ingredients : Ingredient[];
    steps : Step[];

    constructor(id: number, nom: string, description: string, quantity: number, units: string, ingredients: Ingredient[] = [], steps: Step[] = []) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.quantity = quantity;
        this.unit = units;
        this.ingredients = ingredients;
        this.steps = steps;
    }
}


export default Reciepe;