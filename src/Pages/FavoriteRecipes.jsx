import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import RemoveRecipesFavoriteds from '../Components/RemoveRecipesFavoriteds';

import RecipesContext from '../Context/RecipesContext';

import Header from '../Components/Header';

import './Explore.css';
import './DoneRecipes.css';

function FavoriteRecipes() {
  const {
    setFavoriteRecipes,
    favoriteRecipes,
    changeFavorites,
  } = useContext(RecipesContext);

  function listFavoriteRecipes() {
    if (favoriteRecipes) {
      const favoriteRecipe = favoriteRecipes.map((recipe, index) => (
        <div className="favorite-recipes-container">
          <div key={ recipe.id }
            className="done-recipes-card"
          >
              <Link
                to={ recipe.type === 'food' ? `/foods/${recipe.id}` : `/drinks/${recipe.id}` }
              >
                <div className="done-recipes-card-image">
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.image }
                  />
                  </div>
                  <div className="card-bottom">
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { recipe.type === 'food'
                        ? `${recipe.nationality} - ${recipe.category}`
                        : `${recipe.alcoholicOrNot}`}
                    </span>
                  </div>
              </Link>
            <RemoveRecipesFavoriteds
              id={ recipe.id }
              index={ index }
              type={ recipe.type }
            />
          </div>
        </div>
      ));
      
        return favoriteRecipe;
    }
  }

  function handleFilterFavorited({ target }) {
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { name } = target;

    switch (name) {
    case 'All':
      setFavoriteRecipes(localFavorite?.filter((item) => item));
      break;
    case 'Foods':
      setFavoriteRecipes(localFavorite?.filter((item) => item.type === 'food'));
      break;
    case 'Drinks':
      setFavoriteRecipes(localFavorite?.filter((item) => item.type === 'drink'));
      break;
    default:
      return null;
    }
  }

  useEffect(() => {
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(localFavorite);
  }, [changeFavorites]);

  return (
    <div className="explore">
      <div className='explore-header' >
        <Header />
      </div>
      <div className="explore-content">
        <div className="bcl-r"></div>
        <button
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ handleFilterFavorited }
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          name="Foods"
          onClick={ handleFilterFavorited }
          type="button"
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="Drinks"
          onClick={ handleFilterFavorited }
          type="button"
        >
          Drinks
        </button>
      </div>
      <div className="done-recipes-container">
        { listFavoriteRecipes() }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
