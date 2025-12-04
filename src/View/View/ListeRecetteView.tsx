import Reciepe from "../../Controller/Reciepe";
import RecetteView from "./RecetteView";
import {useEffect, useState} from "react";
import {supabase} from "../../App";
import {useAuth} from "../../useAuth";


function ListeRecetteView () {

    const maxColumns = 3;
    const [deleteMode, setDeleteMode] = useState<boolean>(false);

    const [selectedRecette, setSelectedRecette] = useState<Reciepe | null>(null);
    const [reciepies, setReciepes] = useState<Reciepe[]>([]);

    const { user, loading } = useAuth()

    // se déclenche au chargement de la page
    useEffect(() => {
        fetchReciepies()
    }, [])


    async function fetchReciepies(){
        let { data: reciepe, error } = await supabase
            .from('reciepe')
            .select('*')

        if (error) console.log('erreur')

        setReciepes([]) // Clear the list before adding new reciepies
        for (let r of reciepe as any[]){
            const newReciepe = new Reciepe(r.id, r.name, r.description, r.quantity, r.unit);
            setReciepes(prevReciepies => [...prevReciepies, newReciepe]);
        }
    }

    async function deleteReciepe(id: number){
        // Get all ingredient ids associated with the recette
        const { data: ingredientReciepe, error: ingredientReciepeError } = await supabase
            .from('a_reciepe_ingredient')
            .select('id_ingredient')
            .eq('id_reciepe', id);
        if (ingredientReciepeError) {
            console.log('Erreur lors de la récupération des ingrédients associés à la recette');
            return;
        }

        //Get all step ids associated with the recette
        const { data: reciepeStep, error: reciepeStepError } = await supabase
            .from('a_reciepe_step')
            .select('id_step')
            .eq('id_reciepe', id);
        if (reciepeStepError) {
            console.log('Erreur lors de la récupération des étapes associées à la recette');
            return;
        }

        // Delete all associations in a_reciepe_ingredient
        const { error: deleteIngredientReciepeError } = await supabase
            .from('a_reciepe_ingredient')
            .delete()
            .eq('id_reciepe', id);
        if (deleteIngredientReciepeError) {
            console.log('Erreur lors de la suppression des associations ingrédients-recette');
            return;
        }

        // Delete all associations in a_reciepe_step
        const { error: deleteReciepeStepError } = await supabase
            .from('a_reciepe_step')
            .delete()
            .eq('id_reciepe', id);
        if (deleteReciepeStepError) {
            console.log('Erreur lors de la suppression des associations étapes-recette');
            return;
        }

        // Delete all associations in a_step_ingredient
        const { error: deleteIngredientStepError } = await supabase
            .from('a_step_ingredient')
            .delete()
            .in('id_step', reciepeStep.map((rs: any) => rs.id_step));
        if (deleteIngredientStepError) {
            console.log('Erreur lors de la suppression des associations ingrédients-étapes');
            return;
        }

        // Delete all ingredients associated with the recette
        for (let ir of ingredientReciepe as any[]){
            const { error: deleteIngredientError } = await supabase
                .from('ingredient')
                .delete()
                .eq('id', ir.id_ingredient);
            if (deleteIngredientError) {
                console.log('Erreur lors de la suppression de l\'ingrédient');
                return;
            }
        }
        // Delete all steps associated with the recette
        for (let rs of reciepeStep as any[]){
            const { error: deleteStepError } = await supabase
                .from('step')
                .delete()
                .eq('id', rs.id_step);
            if (deleteStepError) {
                console.log('Erreur lors de la suppression de l\'étape');
                return;
            }
        }
        // Finally, delete the recette
        const { error: deleteReciepeError } = await supabase
            .from('reciepe')
            .delete()
            .eq('id', id);
        if (deleteReciepeError) {
            console.log('Erreur lors de la suppression de la recette');
            return;
        }

        console.log('Recette supprimée avec succès');
        // Refresh the list of reciepies
        fetchReciepies();
    }


    if (selectedRecette) {
        return (
            <div className="global-container">
                <RecetteView recette={selectedRecette} />
            </div>
        );
    }

    return (
        <div className="global-container">
            <h1 className="bigTitle">Recettes :</h1>

            {user &&
                <div className="sub-container">
                    <button onClick={() => setDeleteMode(!deleteMode)} className="tinyButton">
                        {deleteMode ? 'Désactiver le mode suppression' : 'Activer le mode suppression'}
                    </button>
                </div>
            }

            <div className="sub-container">
                {reciepies.map((recette) => (
                    <div
                        key={recette.id}
                        onClick={() => setSelectedRecette(recette)}
                        className="card"
                    >
                        <h3 className="tinyTitle">{recette.nom}</h3>
                        <p className="normal-text">{recette.description}</p>
                        <div className="sub-container">
                            {deleteMode && (
                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation(); // Empêche la propagation du clic au parent
                                        await deleteReciepe(recette.id);
                                    }}
                                    className="tinyButton"
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListeRecetteView;