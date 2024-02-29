import React from 'react';
import "./styles/pagination.css";
const Pagination = ({ countPage, setCountPage, total }) => {

const handlePrev = () => {
    if (countPage > 1) {
        setCountPage(countPage  - 1);
    }
};

const handleNext = () => {
    if (countPage < total) {
    setCountPage(countPage + 1);
    }
};

  return (
    <div className='pagination'>
        <button className="btn" onClick={handlePrev}>Prev</button>
        <span>{countPage}/{total}</span>
        <button className="btn" onClick={handleNext}>Next</button>
    </div>
  )
}

export default Pagination;
