import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should setup add expense action object with provided values:', () => {
  const expenseData = {
    description: 'Rent',
    notes: 'This was last months rent',
    amount: 109500,
    createdAt: 1000,
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test('Should setup the add expense action object with default values:', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      notes: '',
      amount: 0,
      createdAt: 0,
    },
  });
});

test('Should setup edit expense action object:', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { note: 'New note value' },
  });
});

test('Should setup remove expense action object:', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});
