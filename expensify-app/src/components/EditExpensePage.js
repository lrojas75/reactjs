import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = () => {
  // Get Expense array from the store
  const expenses = useSelector(state => state.expenses);
  // Get id from the params
  const { id } = useParams();
  // Find the expense that matches the id
  const expense = expenses.find(expense => expense.id === id);
  // Grab dispatch function
  const dispatch = useDispatch();
  // Set navigate function to redirect after submit
  const navigate = useNavigate();

  return (
    <div>
      <ExpenseForm
        expense={expense}
        onSubmit={expense => {
          dispatch(editExpense(id, expense));
          navigate('/');
        }}
      />
      <button
        onClick={() => {
          dispatch(removeExpense({ id }));
          navigate('/');
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default EditExpensePage;
