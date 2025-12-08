const { replaceInFile } = require('replace-in-file');

const options = {
	files: 'build/index.html',
	from: /href="\/CookingRecipeApp\//g,
	to: 'href="./',
};

const options2 = {
	files: 'build/index.html',
	from: /src="\/CookingRecipeApp\//g,
	to: 'src="./',
};

Promise.all([
	replaceInFile(options),
	replaceInFile(options2)
])
	.then(() => console.log('Chemins des assets corrigés dans index.html'))
	.catch(error => console.error('Erreur lors de la correction des chemins :', error));
