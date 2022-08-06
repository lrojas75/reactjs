import React from 'react';
import { NavLink } from 'react-router-dom';

const PortfolioPage = () => {
  return (
    <div>
      <h1>My Work</h1>
      <p>Checkout the following things I've done:</p>
      <NavLink
        to="/portfolio/1"
        className={({ isActive }) => (isActive ? 'is-active' : undefined)}
      >
        Item One
      </NavLink>
      <NavLink
        to="/portfolio/2"
        className={({ isActive }) => (isActive ? 'is-active' : undefined)}
      >
        Item Two
      </NavLink>
    </div>
  );
};

export default PortfolioPage;
