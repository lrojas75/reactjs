import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
  const navigate = useNavigate();
  return (
    <div>
      <NavLink to={`/edit/${id}`}>
        <h3>{description}</h3>
      </NavLink>
      <p>
        {amount} - {createdAt}
      </p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
    </div>
  );
};

export default ExpenseListItem;
