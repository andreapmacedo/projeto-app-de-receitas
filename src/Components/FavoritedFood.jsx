import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHearthIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoritedFood({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [alertCopyboard, setAlertCopyboard] = useState(false);
  const { id } = useParams();

  function handleFavorite() {
    const objRecipe = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objRecipe]));
      setIsFavorited(true);
    } else {
      const isInLocalStorage = favoriteRecipes.some(
        (item) => item.id === recipe.idMeal,
      );
      if (isInLocalStorage) {
        favoriteRecipes = favoriteRecipes.filter(
          (favorite) => favorite.id !== objRecipe.id,
        );
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        setIsFavorited(false);
      } else {
        favoriteRecipes.push(objRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        setIsFavorited(true);
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifyLocalStorage = getLocalStorage.some((item) => item.id === id);
      if (verifyLocalStorage) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [id, isFavorited]);

  function iconFavorite() {
    if (isFavorited) {
      return blackHeartIcon;
    }
    return whiteHearthIcon;
  }

  function copyLinkRecipe() {
    if (!alertCopyboard) {
      copy(`http://localhost:3000/foods/${id}`);
    }
    setAlertCopyboard(true);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLinkRecipe }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt={ shareIcon } />

      </button>
      { alertCopyboard && <h4>Link copied!</h4> }
      <button
        type="button"
        data-testid="favorite-btn"
        src={ iconFavorite() }
        onClick={ handleFavorite }
      >
        <img src={ iconFavorite() } alt={ iconFavorite() } />

      </button>
    </div>
  );
}

FavoritedFood.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};
