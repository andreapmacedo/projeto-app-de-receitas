import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { getRandomRecipeFoods } from '../services/dataFoods';
import './Explore.css';

function ExploreFoods() {
  const history = useHistory();

  const acessRandomRecipe = async () => {
    const apiFoodsCategory = await getRandomRecipeFoods();
    history.push(`/foods/${apiFoodsCategory[0].idMeal}`);
  };

  return (
    <div className="explore">
      <div className="bcl"></div>
      <div className='explore-header' >
        <Header />
      </div>
      <div className="explore-content">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          type="button"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ acessRandomRecipe }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
