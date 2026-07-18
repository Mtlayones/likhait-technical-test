import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

export function useCategory() {
	const context = useContext(CategoryContext);

	if (!context) {
		throw new Error('useCategory must be used inside CategoryProvider');
	}

	return context;
}
