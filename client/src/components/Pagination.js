import React from "react";
import '../App.css';

const Pagination = ({ pageNumber, decreasePage, increasePage }) => {

    return (
        <>
            <button className="button" onClick={decreasePage}>
                ← Previous
            </button>
            <span className="card">{pageNumber}</span>
            <button className="button" onClick={increasePage}>
                Next →
            </button>
        </>
    )
}

export default Pagination
