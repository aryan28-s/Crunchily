import React from 'react';
import RestaurantCard from './Card';

const restaurants = [
  { id: 1, name: 'Green Bites', image: 'https://source.unsplash.com/400x300/?restaurant,organic', rating: 4.6, location: 'Mumbai' },
  { id: 2, name: 'The Vegan Spot', image: 'https://source.unsplash.com/400x300/?restaurant,vegan', rating: 4.8, location: 'Delhi' },
  { id: 3, name: 'Seafood Delight', image: 'https://source.unsplash.com/400x300/?restaurant,seafood', rating: 4.5, location: 'Goa' },
  { id: 4, name: 'Farm Fresh Deli', image: 'https://source.unsplash.com/400x300/?restaurant,healthy', rating: 4.7, location: 'Bangalore' },
  { id: 5, name: 'Tropical Tastes', image: 'https://source.unsplash.com/400x300/?restaurant,tropical', rating: 4.9, location: 'Kolkata' }
];

function RestaurantList() {
  return (
    <div className="container1" style={{ backgroundColor: 'black' }}>
      <div className="container mt-5 hello ">
      <h2 className="mb-4 text-primary">Top Restaurants</h2>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="col-md-4 mb-4" key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default RestaurantList;
