import Step from "../../utils/Step";
import {useEffect, useState} from "react";
import {supabase} from "../../App";
import RecipeStep from "../../utils/RecipeStep";


function StepView({etape} : {etape : Step}) {


    const [step, setStep] = useState<Step>(etape);
    const [listRecipieStep, setListRecipeStep] = useState<RecipeStep[]>([]);


    // se déclenche au chargement de la page
    useEffect(() => {
        // fetchReciepies()
    }, [])


    async function fetchReciepies() {
        const { data : step_ingredient, error } = await supabase
            .from('a_step_ingredient')
            .select(`*, ingredient(*)`)
            .eq('id_step', step.id);


        if (error) console.log("error", error.message);

        console.log(step_ingredient)

        setListRecipeStep([]) // Clear the list before adding new ingredients
        for (let r of step_ingredient as any[]){
            const newRecipeStep = new RecipeStep(r.id_step, r.id_ingredient, r.proportion);
            setListRecipeStep(prevRecipeStep => [...prevRecipeStep, newRecipeStep]);
        }
    }


    return (
        <div className="sub-container">
            <h1 className="tinyTitle">Etape {step.order}</h1>
            <p className="normal-text">{step.description}</p>
        </div>
    );
}


export default StepView;