import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
  const navigate = useNavigate();
  return (
    <div>
      <NavLink to={`/edit/${id}`}>
        <h3>{description}</h3>
      </NavLink>
      <p>
        {numeral(amount / 100).format("$0,0.00")}-
        {moment(createdAt).format("MMMM Do YYYY")}
      </p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
    </div>
  );
};

export default ExpenseListItem;
