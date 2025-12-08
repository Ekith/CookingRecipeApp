import Ingredient from "../../utils/Ingredient";
import IngredientView from "./IngredientView";


function ListIngredientView({listeIngredients}: {listeIngredients: Ingredient[]}) {
    const numberColumns = 3;

    if (!listeIngredients || listeIngredients.length === 0) {
        listeIngredients = [new Ingredient(-1, "Aucun ingrédient disponible", 0, "")];
    }

      return (
          <div className="sub-container">
              <h1 className="title">Ingrédients :</h1>
                  <table className="myTable border-up">
                      <tbody className="myBody">
                      {Array.from({ length: Math.ceil(listeIngredients.length / numberColumns) }).map((_, rowIndex) => (
                          <tr key={rowIndex} className="myRow">
                              {listeIngredients.slice(rowIndex * numberColumns, (rowIndex + 1) * numberColumns).map((ingredient, colIndex) => (
                                  <td key={colIndex} className="myCell">
                                      <IngredientView ingredient={ingredient} />
                                  </td>
                              ))}
                          </tr>
                      ))}
                      </tbody>
                  </table>
          </div>
      );
}

export default ListIngredientView;