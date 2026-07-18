/**
 * Form component for adding/editing expenses
 */

import React from 'react';
import { CategoryFormData } from '../types';
import { TextField, Button, SelectBox } from '../vibes';
import { useCategoryForm } from '../hooks/useCategoryForm';
import { CATEGORY_ICONS } from '../constants/categoryEmojis';

interface CategoryFormProps {
	onSubmit: (data: CategoryFormData) => Promise<void>;
	onCancel?: () => void;
}

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
	const initialData: CategoryFormData = {
		name: '',
		icon: '📦',
	};

	const { formData, errors, isSubmitting, handleChange, handleSubmit } =
		useCategoryForm({
			initialData,
			onSubmit,
		});
	const formStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	};

	const buttonGroupStyle: React.CSSProperties = {
		display: 'flex',
		gap: '0.5rem',
		marginTop: '0.5rem',
	};

	const componentGroupStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'flex-end',
		gap: '0.5rem',
		marginTop: '0.5rem',
	};

	const selectStyle: React.CSSProperties = {
		appearance: 'none',
		WebkitAppearance: 'none',
		MozAppearance: 'none',
		background: 'none',
	};

	const selectBoxStyle: React.CSSProperties = {
		width: '3rem',
	};

	const iconOptions = CATEGORY_ICONS.map((icon) => ({
		value: icon,
		label: icon,
	}));

	return (
		<form onSubmit={handleSubmit} style={formStyle}>
			<div style={componentGroupStyle}>
				<div style={selectBoxStyle}>
					<SelectBox
						style={selectStyle}
						options={iconOptions}
						value={formData.icon}
						onChange={(e) => handleChange('icon', e.target.value)}
						error={errors.icon}
						required
						fullWidth
						removeSelectOption
					/>
				</div>
				<TextField
					type='text'
					placeholder='Enter category name'
					value={formData.name}
					onChange={(e) => handleChange('name', e.target.value)}
					error={errors.amount}
					fullWidth
					required
				/>
			</div>

			<div style={buttonGroupStyle}>
				<Button
					type='submit'
					variant='primary'
					disabled={isSubmitting}
					fullWidth>
					Add Category
				</Button>
				{onCancel && (
					<Button
						type='button'
						variant='secondary'
						onClick={onCancel}>
						Cancel
					</Button>
				)}
			</div>
		</form>
	);
}
