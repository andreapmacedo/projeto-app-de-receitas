import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import './InProgress.css'

import IngredientsRecipeDrinkInProgress
from '../Components/IngredientsRecipeDrinkInProgress';

import { getRecipeDrinks } from '../services/dataDrinks';
import FavoritedDrink from '../Components/FavoritedDrink';
// import { setDoneDrinkRecipe } from '../services/localSorage';

export default function DrinkInProgress() {
  const { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [allChecked, setAllChecked] = useState(true);
  const {
    setDoneRecipes,
  } = useContext(RecipesContext);

  const verifyRecipe = (local) => local?.some((e) => e.id === id);

  function setDoneDrinkRecipe() {
    // console.log('recipe', recipe);
    // console.log('recipe.area', recipe.strArea);
    const data = new Date();
    const doneRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      // nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: data.toLocaleDateString(),
      tags: recipe.strTags,
    };
    // console.log('doneRecipe out', doneRecipe);
    // const doneRecipeString = JSON.stringify([doneRecipe]);
    const doneRecipeString = JSON.stringify([doneRecipe]);
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', doneRecipeString);
      setDoneRecipes(doneRecipe);
    } else {
      // console.log('doneRecipe else', doneRecipe);
      const local = JSON.parse(localStorage.getItem('doneRecipes'));
      // console.log('veri', verifyRecipe(local, doneRecipe.id));
      // console.log('veri', doneRecipe.id);
      // console.log('local', local);
      if (!(verifyRecipe(local))) {
        // console.log('doneRecipe in', doneRecipe);
        localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRecipe]));
        setDoneRecipes([...local, doneRecipe]);
      }
    }
  }

  const doneRecipe = () => {
    setDoneDrinkRecipe();
    history.push('/done-recipes');
  };

  useEffect(() => {
    async function getRecipe() {
      const api = await getRecipeDrinks(id);
      setRecipe(api[0]);
    }
    getRecipe();
  }, [id]);

  const countIngredients = (checked, total) => {
    if (total > 0 && checked === total) {
      setAllChecked(false);
      setIsDisabled(false);
    } else {
      setAllChecked(true);
      setIsDisabled(true);
    }
  };

  return (
    <div className="in-progress-container" >
      <div key={ recipe.idDrink } className="header-details">
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
      <div className="ingredients-container">
        <ul>
          <IngredientsRecipeDrinkInProgress
            recipe={ recipe }
            countIngredients={ countIngredients }
          />
        </ul>
      </div>
      <div className="instructions-container">
        <span data-testid="instructions">{ recipe.strInstructions }</span>
      </div>

        <div className="btn-start-recipe-container">
          <button
            // className="btn-start-recipe"
            className={ isDisabled ? 'btn-finish-recipe-disabled' : 'btn-finish-recipe-active' }
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ doneRecipe }
            disabled={ allChecked }
          >
            Finish Recipe
          </button>

        </div>
      </div>
    </div>
  );
}
