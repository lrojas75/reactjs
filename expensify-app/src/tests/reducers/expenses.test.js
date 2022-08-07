import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state: ', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('Should add an expense: ', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '109',
      description: 'Laptop',
      note: '',
      amount: 29500,
      createdAt: 20000,
    },
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([...expenses, action.expense]);
});

test('Should edit an expense: ', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount: 122000,
      note: 'Updated expense',
    },
  };
  const state = expensesReducer(expenses, action);

  expect(state[1].amount).toBe(action.updates.amount);
});

test('Should not edit an expense if expense not found: ', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    udpates: {
      amount: 122000,
      note: 'Not Found expense',
    },
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('Should remove an expense by id: ', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove an expense if id is not found: ', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '-1' };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});
