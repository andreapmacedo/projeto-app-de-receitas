import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './Explore.css';

import { getIngredientsFoods } from '../services/dataFoods';

import { getIngredientsDrinks } from '../services/dataDrinks';

import RecipesContext from '../Context/RecipesContext';

function ExploreRecipesByIngredient() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);

  const {
    setExploreSearch,
  } = useContext(RecipesContext);

  const isLink = history.location.pathname.includes('foods');
  const [foodsOrDrinks] = useState(isLink ? 'foods' : 'drinks');

  useEffect(() => {
    if (foodsOrDrinks === 'foods') {
      const getIngredients1 = async () => {
        const apiIngredients = await getIngredientsFoods();
        setIngredients(apiIngredients);
      };
      getIngredients1();
    } else {
      const getIngredients2 = async () => {
        const apiIngredients = await getIngredientsDrinks();
        setIngredients(apiIngredients);
      };
      getIngredients2();
    }
  }, []);

  function getImageIngredient(name) {
    if (foodsOrDrinks === 'foods') {
      return `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
    }
    return `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
  }

  function invitePrincipal(name) {
    setExploreSearch({ isCameExplore: true, nameIngredient: name });
  }

  return (
    // <div className="explore">
    <div className="recipes-by-ingredient-page">
      <div className="bcl"></div>   
      <div className='explore-header' >
        <Header />
      </div>
      <div className="recipes-by-ingredient-container">
        { foodsOrDrinks === 'foods' ? (
          ingredients.map((ingredient, index) => (
            <Link
              key={ ingredient.idIngredient }
              onClick={ () => invitePrincipal(ingredient.strIngredient) }
              to="/foods"
            >
              <div className="ingredient-card" data-testid={ `${index}-ingredient-card` }>
                <img
                  className="card-img-container"
                  data-testid={ `${index}-card-img` }
                  src={ getImageIngredient(ingredient.strIngredient) }
                  alt={ ingredient.strIngredient }
                />
                <div className="card-name-container">
                  <span
                    data-testid={ `${index}-card-name` }
                  >
                    { ingredient.strIngredient }
                  </span>
                </div>
              </div>
            </Link>))
        ) : (
          ingredients.map((ingredient, index) => (
            <Link
              key={ ingredient.strIngredient1 }
              onClick={ () => invitePrincipal(ingredient.strIngredient1) }
              to="/drinks"
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ getImageIngredient(ingredient.strIngredient1) }
                  alt={ ingredient.strIngredient1 }
                />
                <span
                  data-testid={ `${index}-card-name` }
                >
                  { ingredient.strIngredient1 }
                </span>
              </div>
            </Link>))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreRecipesByIngredient;
