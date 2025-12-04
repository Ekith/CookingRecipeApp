export interface IngredientTmp {
	name: string;
	quantity: string;
	unit: string;
}

export interface StepTmp {
	description: string;
	order: number;
}

export interface RecipeTmp {
	name: string;
	description: string;
	quantity: string;
	unit: string;
	ingredients: IngredientTmp[];
	steps: StepTmp[];
}

export type FieldUpdaterTmp<T> = (field: keyof T, value: T[keyof T]) => void;
