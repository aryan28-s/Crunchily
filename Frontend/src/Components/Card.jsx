import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, description }) => {
    return (
        <Link className="navbar-brand" to="/menu">
            <div className="card bg-dark text-white">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
            </div>
        </Link>
    );
};

export default Card;