import { useState } from "react";
import { StepTmp } from "./types";
import CreerEtape from "./CreerEtape";

interface ListeCreerEtapeProps {
    onChange: (steps: StepTmp[]) => void;
}

export default function ListeCreerEtape({ onChange }: ListeCreerEtapeProps) {
    const [steps, setSteps] = useState<StepTmp[]>([]);

    const addStep = () => {
        const updated = [...steps, { description: "", order: steps.length + 1 }];
        setSteps(updated);
        onChange(updated);
    };

    const updateStep = <K extends keyof StepTmp>(
        index: number,
        field: K,
        value: StepTmp[K]
    ) => {
        const updated = [...steps];
        updated[index][field] = value;
        setSteps(updated);
        onChange(updated);
    };

    return (
        <div className="sub-container">
            <h1 className="title">Étapes :</h1>
            {steps.map((step, i) => (
                <div className="sub-container">
                    <h1 className="tinyTitle">Étape {i+1}</h1>
                    <CreerEtape
                        key={i}
                        data={step}
                        onChange={(field, value) => updateStep(i, field, value)}
                    />
                </div>
            ))}
            <button onClick={addStep} className="tinyButton">Ajouter une étape</button>
        </div>
    );
}
