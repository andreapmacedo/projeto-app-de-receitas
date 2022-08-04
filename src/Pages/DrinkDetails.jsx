import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getRecipeDrinks } from '../services/dataDrinks';

import IngredientsRecipe from '../Components/IngredientsRecipe';

import './FoodDetails.css';

import RecomendationCardDrink from '../Components/RecomendationCardDrink';
import FavoritedDrink from '../Components/FavoritedDrink';
import { verifyRecipe } from '../services/localSorage';

export default function DrinkDetails() {
  const history = useHistory();
  const { id } = useParams();
  const localDone = JSON.parse(localStorage.getItem('doneRecipes'));

  const [recipe, setRecipe] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeDrinks(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  function recipeStatus() {
    history.push(`/drinks/${id}/in-progress`);
  }

  useEffect(() => {
    const startRecipe = 'Start Recipe';

    if (!localStorage.getItem('inProgressRecipes')) {
      setStatus(startRecipe);
    } else {
      const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const localKeys = Object.keys(local);
      const verifyKey = localKeys.some((e) => e === 'cocktails');
      if (verifyKey) {
        const objs = Object.keys(local.cocktails);
        if (objs.some((item) => item === id)) {
          const verifyContent = Object.values(local.cocktails[id]);
          return verifyContent.length === 0 || verifyContent.length !== 0
            ? setStatus('Continue Recipe') : setStatus(startRecipe);
        }
      }
      setStatus(startRecipe);
    }
  }, []);

  return (
    <div className="details-container">
      <div 
        className="header-details"
        key={ recipe.idDrink }>
          <div className="details-image-container">
            <img
              className="details-img"
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrinkThumb }
            />
          </div>
          <div className="header-title-container">
            <div className="left">  
              <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
              <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
            </div>
            <div className="header-details-btns-container"> 
              <FavoritedDrink recipe={ recipe } />
            </div>
          </div>
          </div>
          <div className="ingredients-container">
            <ul>
              <IngredientsRecipe recipe={ recipe } />
            </ul>
          </div>
          <div className="instructions-container">
            <span data-testid="instructions">{ recipe.strInstructions }</span>
          </div>
          <div className="yt-frame">
            <iframe
              src={ `https://www.youtube.com/embed/${recipe?.strYoutube?.split('=')[1]}` }
              data-testid="video"
              title="video player"
              width="360"
              heigth="420"
            />
            <div className="recommended">
              <RecomendationCardDrink />
            </div>
          </div>

        <div className="btn-start-recipe-container">
          {!(verifyRecipe(localDone, id)) && (
            <button
              className="btn-start-recipe"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ recipeStatus }
            >
              { status }
            </button>
          )}
        </div>
      
    </div>
  );
}
