import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './Explore.css';

function Profile() {
  const deleteItens = () => {
    localStorage.clear();
  };

  const email = JSON.parse(localStorage?.getItem('user'));

  return (
    <div className="explore">
      <div className='explore-header' >
        <Header />
      </div>
      <div className="user-container">
        <p data-testid="profile-email">{email?.email}</p>
      </div>
      <div className="profile-content">
        <div className="profile-btn-container">
          <Link to="/done-recipes">
            <button 
              data-testid="profile-done-btn"
              type="submit"
              className="profile-btn"
            >
              Done Recipes
            </button>
          </Link>
        </div>
        <div className="profile-btn-container">
        <Link to="/favorite-recipes">
          <button 
            data-testid="profile-favorite-btn"
            type="submit"
            className="profile-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        </div>
        <div className="profile-btn-container">
          <Link to="/"> 
            <button
              className="profile-btn"
              data-testid="profile-logout-btn"
              type="submit"
              onClick={ deleteItens }
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
