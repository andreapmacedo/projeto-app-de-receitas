import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import './Foods.css';
import './Explore.css';

function Explore() {
  return (
    <div className="explore">
      <Header />
      <Link to="/explore/foods">
        <button type="button" data-testid="explore-foods">
          Explore Foods
        </button>
      </Link>

      <Link to="/explore/drinks">
        <button type="button" data-testid="explore-drinks">
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
