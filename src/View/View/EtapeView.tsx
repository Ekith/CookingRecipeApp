import Step from "../../Controller/Step";
import {useEffect, useState} from "react";
import {supabase} from "../../App";
import ReciepeStep from "../../Controller/ReciepeStep";



function EtapeView({etape} : {etape : Step}) {


    const [step, setStep] = useState<Step>(etape);
    const [listReciepieStep, setListReciepeStep] = useState<ReciepeStep[]>([]);


    // se déclenche au chargement de la page
    useEffect(() => {
        // fetchReciepies()
    }, [])


    async function fetchReciepies() {
        const { data : step_ingredient, error } = await supabase
            .from('a_step_ingredient')
            .select(`*, ingredient(*)`)
            .eq('id_step', step.id);


        if (error) console.log('erreur')

        console.log(step_ingredient)

        setListReciepeStep([]) // Clear the list before adding new ingredients
        for (let r of step_ingredient as any[]){
            const newReciepeStep = new ReciepeStep(r.id_step, r.id_ingredient, r.proportion);
            setListReciepeStep(prevReciepeStep => [...prevReciepeStep, newReciepeStep]);
        }
    }


    return (
        <div className="sub-container">
            <h1 className="tinyTitle">Etape {step.order}</h1>
            <p className="normal-text">{step.description}</p>
        </div>
    );
}


export default EtapeView;