import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../../redux/features/auth/favoriteSlice.js";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../../Utils/localStorage.js";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  // **Check if product is valid before using it**
  if (!product || !product._id) {
    console.error("Invalid product passed to HeartIcon:", product);
    return null; // Prevents crashing the UI
  }

  const isFavorite = favorites.some((p) => p?._id === product?._id);

  // **Load favorites from localStorage on mount**
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage() || [];
    if (Array.isArray(favoritesFromLocalStorage)) {
      dispatch(setFavorites(favoritesFromLocalStorage));
    } else {
      console.error(
        "Invalid favorites in localStorage:",
        favoritesFromLocalStorage
      );
    }
  }, [dispatch]); // Added `dispatch` to dependencies

  const toggleFavorites = () => {
    if (!product || !product._id) {
      console.error("Invalid product in toggleFavorites:", product);
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;
