import { createContext, useEffect, useMemo, useState, ReactNode } from 'react';

export interface Category {
	id: number;
	name: string;
	icon: string;
}

interface CategoryContextType {
	categories: Category[];
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
	undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await categoryService.getCategories();
				setCategories(data);
			} catch (error) {
				console.error('Failed to load categories', error);
			}
		};

		loadCategories();
	}, []);

	const value = useMemo(
		() => ({
			categories,
			setCategories,
		}),
		[categories],
	);

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	);
}
