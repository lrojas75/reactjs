import React from "react";
import { useSelector } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

const ExpensesSummary = () => {
  // Grab data from store
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  // Grab visible expenses based on sort and filters
  const visibleExpenses = selectExpenses(expenses, filters);
  // Calculate data
  const expenseCount = visibleExpenses.length;
  const expensesTotal = selectExpensesTotal(visibleExpenses);
  const expensesTotalFormatted = numeral(expensesTotal / 100).format("$0,0.00");
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";

  return (
    <div>
      <h1>{`Viewing ${expenseCount} ${expenseWord} totalling ${expensesTotalFormatted}`}</h1>
    </div>
  );
};

export default ExpensesSummary;
