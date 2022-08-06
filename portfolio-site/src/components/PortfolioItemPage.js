import React from 'react';
import { useParams } from 'react-router-dom';

const PortfolioItemPage = () => {
  const queryParams = useParams();
  return (
    <div>
      <h1>A thing I've done</h1>
      <p>This is the portfolio item {queryParams.id}</p>
    </div>
  );
};

export default PortfolioItemPage;
