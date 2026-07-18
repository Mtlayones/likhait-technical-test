/**
 * Form component for adding/editing expenses
 */

import React, { useState } from 'react';
import { ExpenseFormData } from '../types';
import { TextField, SelectBox, Button, Modal } from '../vibes';
import { useExpenseForm } from '../hooks/useExpenseForm';
import { useCategory } from '../hooks/useCategory';
import { CategoryForm } from './CategoryForm';

interface ExpenseFormProps {
	initialData?: Partial<ExpenseFormData>;
	onSubmit: (data: ExpenseFormData) => Promise<void>;
	onCancel?: () => void;
	submitLabel?: string;
}

export function ExpenseForm({
	initialData,
	onSubmit,
	onCancel,
	submitLabel = 'Add Expense',
}: ExpenseFormProps) {
	const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
	const { formData, errors, isSubmitting, handleChange, handleSubmit } =
		useExpenseForm({
			initialData,
			onSubmit,
		});

	const { categories, addCategory } = useCategory();

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

	const buttonStyle: React.CSSProperties = {
		display: 'flex',
		height: '2.5rem',
	};

	const categoryOptions = categories.map((category) => ({
		value: category.name,
		label: `${category.icon}  ${category.name}`,
	}));

	return (
		<div>
			<form onSubmit={handleSubmit} style={formStyle}>
				<TextField
					label='Amount'
					type='number'
					step='0.01'
					placeholder='0.00'
					value={formData.amount}
					onChange={(e) => handleChange('amount', e.target.value)}
					error={errors.amount}
					fullWidth
					required
				/>

				<TextField
					label='Description'
					type='text'
					placeholder='Enter description'
					value={formData.description}
					onChange={(e) =>
						handleChange('description', e.target.value)
					}
					error={errors.description}
					fullWidth
					required
				/>
				<div style={componentGroupStyle}>
					<SelectBox
						label='Category'
						options={categoryOptions}
						value={formData.category}
						onChange={(e) =>
							handleChange('category', e.target.value)
						}
						error={errors.category}
						required
						fullWidth
					/>
					<div style={buttonStyle}>
						<Button
							type='button'
							variant='primary'
							onClick={() => setIsAddCategoryModalOpen(true)}>
							+
						</Button>
					</div>
				</div>

				<TextField
					label='Date'
					type='date'
					value={formData.date}
					onChange={(e) => handleChange('date', e.target.value)}
					error={errors.date}
					fullWidth
					required
				/>

				<div style={buttonGroupStyle}>
					<Button
						type='submit'
						variant='primary'
						disabled={isSubmitting}
						fullWidth>
						{isSubmitting ? 'Submitting...' : submitLabel}
					</Button>
					{onCancel && (
						<Button
							type='button'
							variant='secondary'
							onClick={onCancel}
							disabled={isSubmitting}>
							Cancel
						</Button>
					)}
				</div>
			</form>
			<Modal
				isOpen={isAddCategoryModalOpen}
				onClose={() => setIsAddCategoryModalOpen(false)}
				title='Add Category'>
				<CategoryForm
					onSubmit={async (data) => {
						setIsAddCategoryModalOpen(false);
						await addCategory(data);
					}}
					onCancel={() => setIsAddCategoryModalOpen(false)}
				/>
			</Modal>
		</div>
	);
}
