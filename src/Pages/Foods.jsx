import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../Components/Header';
import apiFoods from '../services/dataFoods';
import RecipesContext from '../Context/RecipesContext';
import Footer from '../Components/Footer';
import Category from '../Components/Category';

import './Foods.css';
import './Card.css';

function Foods() {
  const history = useHistory();
  const {
    dataApiFoods,
    setDataApiFoods,
    typeFilter,
    exploreSearch,
  } = useContext(RecipesContext);

  const handleResponse = () => {
    const { idMeal } = dataApiFoods[0];
    history.push(`/foods/${idMeal}`);
  };

  useEffect(() => {
    if (!exploreSearch.isCameExplore) {
      const fetch = async () => {
        const returnApiFoods = await apiFoods('name-ingredient', '');
        setDataApiFoods(returnApiFoods.meals);
      };
      fetch();
    } else {
      const getRecipe = async () => {
        const api = await apiFoods('ingredient', exploreSearch.nameIngredient);
        setDataApiFoods(api.meals);
      };
      getRecipe();
    }
  }, []);

  
  const MAX_QUANTITY_RECIPES = 12;
  return (
    <div className="foods">
      <Header />
      <Category />
      <div className="item-container">
        <div className="bcl"></div>
        {dataApiFoods.length === 1 && typeFilter === 'input' ? handleResponse()
          : dataApiFoods.map((food, index) => (
            (index < MAX_QUANTITY_RECIPES)
          && (
            <Link key={ index } to={ `/foods/${food.idMeal}` }>
              <div
                className="card"
                data-testid={ `${index}-recipe-card` }
              >
                <div className="card-container">
                  <div className="card-img-container">
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ food.strMealThumb }
                      alt={ food.strMealThumb }
                    />
                  </div>
                  <div
                    className="card-name-container">
                    <span data-testid={ `${index}-card-name` }>{ food.strMeal }</span>
                  </div>
                </div>
              </div>
            </Link>)
          ))
        }
      </div>
      <div className="up-level" ></div>
      <Footer />
    </div>
  );
}

export default Foods;
