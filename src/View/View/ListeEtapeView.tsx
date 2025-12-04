import Step from "../../Controller/Step";
import EtapeView from "./EtapeView";


function ListeEtapeView({listEtape} : {listEtape : Step[]})
{
    return (
        <div className="sub-container">
            <h1 className="title">Liste des Étapes</h1>
            <ul className="list border-up">
                {listEtape.map((etape) => (
                    <EtapeView etape={etape} />
                ))}
            </ul>
        </div>
    );
}

export default ListeEtapeView;