
import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantCard from '../Restaurant/RestaurantCard';

const Favorite = () => {
  const favorites = useSelector((state) => state.auth?.favorites);

  return (
    <div className="py-5 px-3">
      <h1 className="text-xl font-semibold text-center mb-6">My Favorites</h1>

      {!favorites || favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite items available.</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {favorites.map((item) => (
            <RestaurantCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
