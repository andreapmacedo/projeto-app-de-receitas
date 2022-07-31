import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getRandomRecipeDrinks } from '../services/dataDrinks';

function ExploreDrinks() {
  const history = useHistory();

  const acessRandomRecipe = async () => {
    const apiDrinksCategory = await getRandomRecipeDrinks();
    history.push(`/drinks/${apiDrinksCategory[0].idDrink}`);
  };

  return (
    <div className="explore">
      <div className='explore-header' >
        <Header />
      </div>
      <div className="explore-content">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          onClick={ () => history.push('/explore/drinks/nationalities') }
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

export default ExploreDrinks;
