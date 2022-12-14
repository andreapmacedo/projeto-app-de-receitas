import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

import RecipesContext from '../Context/RecipesContext';
import './DoneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const {
    doneRecipes,
  } = useContext(RecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);
  const [alertCopyboard, setAlertCopyboard] = useState(false);

  const filterDoneRecipes = (recipe) => {
    if (recipe === 'foods') {
      const foods = doneRecipes.filter((type) => type.type === 'food');
      setFilteredRecipes(foods);
      // console.log('foods', foods);
      // console.log(doneRecipes.filter((type) => type === 'food'));
    } else if (recipe === 'drinks') {
      const drinks = doneRecipes.filter((type) => type.type === 'drink');
      // console.log('drinks', drinks);
      setFilteredRecipes(drinks);
    } else {
      setFilteredRecipes(doneRecipes);
    }
  };

  function copyLinkRecipe(id) {
    if (!alertCopyboard) {
      copy(`http://localhost:3000/foods/${id}`);
    }
    setAlertCopyboard(true);
  }
  const getTags = (recipe, index) => {
    const { tags } = recipe;
    let tagList = [];

    if (typeof (tags) === 'object') {
      tagList = tags;
    }
    if (typeof (tags) === 'string') {
      tagList = tags.split(',');
    }

    const myTags = [];
    if (tagList) {
      myTags.push(tagList[0]);
    }
    if (tagList) {
      myTags.push(tagList[1]);
    }

    return (
      <>
        {myTags.map((tag) => (
          <div
            key={ tag }
            name={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </div>
        ))}
      </>
    );
  };

  function getFoodCard(recipe, index) {
    return (
      
      <div 
        key={ index }
        className="done-recipes-card"
      >
        <div
          className="done-recipes-card-image"
        >
          { alertCopyboard && <p>Link copied!</p>}
          <Link to={ `/foods/${recipe.id}` }>
            <img
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
            />
          </Link>
        </div>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
          </span>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}
          </span>
          <div className="card-bottom">
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => copyLinkRecipe(recipe.id) }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt={ shareIcon } />
            </button>
            {getTags(recipe, index)}
          </div>
      </div>
    );
  }
  function getDrinkCard(recipe, index) {
    return (
      <div 
        key={ index }
        className="done-recipes-card"
      >
        <div
          className="done-recipes-card-image"
        >
          { alertCopyboard && <p>Link copied!</p>}
          <Link to={ `/drinks/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
        </div>
        <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
        <span
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.category} - ${recipe.alcoholicOrNot}`}
        </span>
        <span
          data-testid={ `${index}-horizontal-done-date` }
        >
          {recipe.doneDate}
        </span>
        <div className="card-bottom">
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ copyLinkRecipe }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt={ shareIcon } />
          </button>
            {getTags(recipe, index)}
        </div>
      </div>
    );
  }
  return (
    <div className="done-recipes">
      <div className="explore-header">
        <Header />
      </div>
      <div className="done-recipes-menu">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => filterDoneRecipes('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => filterDoneRecipes('foods') }
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => filterDoneRecipes('drinks') }
        >
          Drinks
        </button>
      </div>
      <div className="done-recipes-container">
        <div className="bcl-r"></div>
        {filteredRecipes && filteredRecipes.length > 0
        && filteredRecipes.map((recipe, index) => {
          let result;
          if (recipe.type === 'food') {
            result = getFoodCard(recipe, index);
          } else {
            result = getDrinkCard(recipe, index);
          }
          return result;
        })}
      </div>
    </div>
  );
}
export default DoneRecipes;
