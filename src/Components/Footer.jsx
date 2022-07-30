import React from 'react';
import { Link } from 'react-router-dom';
import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Food from '../images/mealIcon.svg';
import './Footer.css';


const script = () => {
  const list = document.querySelectorAll('.list');
  function activelink(){
    list.forEach((item) =>
    item.classList.remove('active'));
    this.classList.add('active');
  }
  list.forEach((item) =>
  item.addEventListener('click', activelink));  
}

function Footer() {
  return (
    <div
      className="navigation"
      data-testid="footer"
    >
      <ul>
        <li class="list active">
          <a href="#">
            <button
              src={ Drinks }
              type="button"
              data-testid="drinks-bottom-btn"
            >
              <img alt="drinks" src={ Drinks } />
            </button>
            <span class="text">Drinks</span>
          </a>          
        </li>
        <li class="list active">
          <a href="#">
            <button
              src={ Explore }
              type="button"
              data-testid="drinks-bottom-btn"
            >
              <img alt="drinks" src={ Explore } />
            </button>
            <span class="text">Explore</span>
          </a>          
        </li>
        <li class="list active">
          <a href="#">
            <button
              src={ Food }
              type="button"
              data-testid="drinks-bottom-btn"
            >
              <img alt="drinks" src={ Food } />
            </button>
            <span class="text">Food</span>
          </a>          
        </li>
      </ul>


      <script>
        {script()}
      </script>
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>



      {/* <Link to="/drinks">
        <button
          src={ Drinks }
          type="button"
          data-testid="drinks-bottom-btn"
        >
          <img alt="drinks" src={ Drinks } />

        </button>
      </Link>
      <Link to="/explore">
        <button
          src={ Explore }
          type="button"
          data-testid="explore-bottom-btn"
        >
          <img alt="drinks" src={ Explore } />
        </button>
      </Link>
      <Link to="/foods">
        <button
          src={ Food }
          type="button"
          data-testid="food-bottom-btn"
        >
          <img alt="drinks" src={ Food } />
        </button>
      </Link> */}
    </div>
  );
}

export default Footer;
