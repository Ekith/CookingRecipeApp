import html2pdf from "html2pdf.js";
import Recipe from "./Recipe";
import { recipeToHtml } from "./recipeToHtml";
import Ingredient from "./Ingredient";
import Step from "./Step";

export function downloadRecipePdf(recipe: Recipe, ingredients: Ingredient[], steps: Step[]) {
  const html = recipeToHtml(recipe, ingredients, steps);

  const element = document.createElement("div");
  element.innerHTML = html;

  const options = {
    margin: 10,
    filename: `${recipe.name.replace(/\s+/g, "_").toLowerCase()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  } as const

  html2pdf().set(options).from(element).save();
}

