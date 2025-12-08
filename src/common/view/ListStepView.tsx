import Step from "../../utils/Step";
import StepView from "./StepView";


function ListStepView({listEtape} : {listEtape : Step[]})
{
    return (
        <div className="sub-container">
            <h1 className="title">Liste des Étapes</h1>
            <ul className="list border-up">
                {listEtape.map((etape) => (
                    <StepView etape={etape} />
                ))}
            </ul>
        </div>
    );
}

export default ListStepView;