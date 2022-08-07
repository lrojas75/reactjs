import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

test('Should filter by text value: ', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[2], expenses[1]]);
});

test('Should filter by startDate with default text value: ', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[2], expenses[0]]);
});

test('Should filter by endDate with default text value: ', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days'),
  };
  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[0], expenses[1]]);
});

test('Should sort by amount with default text value and no dates: ', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});

test('Should sort by date with default text value and not start or end date: ', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);

  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});
