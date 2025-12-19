import Recipe from "./Recipe";
import Ingredient from "./Ingredient";
import Step from "./Step";


export function recipeToHtml(recipe: Recipe, ingredients : Ingredient[], steps: Step[]): string {

  return `
  <html>
    <head>
      <style>

        .pdf-root,
        .pdf-root * {
          background-color: #ffffff !important;
          color: #000000 !important;
          box-shadow: none !important;
          filter: none !important;
        }

        body.pdf-root {
          font-family: 'Georgia', serif;
          padding: 40px;
        }

        h1 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
        }

        h2 {
          padding-bottom: 5px;
          margin-top: 30px;
          font-size: 20px;
        }

        p {
          line-height: 1.6;
          font-size: 14px;
        }

        ul {
          margin-left: 20px;
        }

        li {
          margin-bottom: 6px;
          font-size: 14px;
        }

        .steps li {
          margin-bottom: 12px;
        }

        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
        }



      </style>
    </head>

    <body class="pdf-root">
      <h1>${recipe.name}</h1>

      <h2>Description</h2>
      <p>${recipe.description}</p>
      <p>Quantités pour ${recipe.quantity} ${recipe.unit}</p>

      <h2>Ingrédients</h2>
      <ul>
        ${ingredients
          .map(
            (i: Ingredient) =>
              `<li>${i.name} : ${i.quantity} ${i.unit}</li>`
          )
          .join("")}
      </ul>

      <h2>Étapes</h2>
      <ol class="steps">
        ${steps
          .sort((a: Step, b: Step) => a.order - b.order)
          .map(
            (s: Step) =>
              `<li>${s.description}</li>`
          )
          .join("")}
      </ol>
    </body>
  </html>
  `;
}

export default recipeToHtml;