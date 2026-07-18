/* 
    Context provider for managing category state and providing access to category data and actions
*/

import { createContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { getCategories, createCategory } from '../services/api';
import { Category, CategoryFormData } from '../types';

interface CategoryContextType {
	categories: Category[];
	loadCategories: () => Promise<void>;
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
	addCategory: (data: CategoryFormData) => Promise<Category>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
	undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
	const [categories, setCategories] = useState<Category[]>([]);

	// dispatcher action for loading categories from the API and updating the state
	const loadCategories = async () => {
		try {
			const data = await getCategories();
			setCategories(data);
		} catch (error) {
			console.error('Failed to load categories', error);
		}
	};

	// dispatcher action for adding a new category and updating the state
	const addCategory = async (data: CategoryFormData) => {
		const category = await createCategory(data);

		setCategories((prev: Category[]) => [...prev, category]);

		return category;
	};

	// loading categories when the component mounts
	useEffect(() => {
		loadCategories();
	}, []);

	const value = useMemo(
		() => ({
			categories,
			setCategories,
			addCategory,
		}),
		[categories],
	);

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	);
}
