import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
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
  console.log('Footer');
  const history = useHistory();
  const setRoute = (route) => {
    console.log( route );
    if(route === 'drinks'){
      history.push('/drinks');
    } else if (route === 'explore') {
      history.push('/explore');
    } else if (route === 'food') {
      history.push('/foods');
    }
  }
  
  return (
    <div
      className="navigation"
      data-testid="footer"
    >
      <ul>
        <li className="list active">
          {/* <a href="#"> */}
            {/* <span class="icon" style={{color: "red"}}> */}
            <span className="icon">
              <button
                src={ Drinks }
                type="button"
                data-testid="drinks-bottom-btn"
                onClick={ () => setRoute('drinks') }
              >
                <img alt="drinks" src={ Drinks } />
              </button>
            </span>
            <span className="text">Drinks</span>
          {/* </a>           */}
        </li>
        <li className="list">
          <a href="#">
          <span className="icon">
          {/* <ion-icon name="settings-outline"></ion-icon> */}
            <button
              src={ Explore }
              type="button"
              data-testid="drinks-bottom-btn"
              onClick={ () => setRoute('explore') }
            >
              <img alt="drinks" src={ Explore } />
            </button>
          </span>
            <span className="text">Explore</span>
          </a>          
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              {/* <ion-icon name="camera-outline"></ion-icon> */}
              <button
                src={ Food }
                type="button"
                data-testid="drinks-bottom-btn"
                onClick={ () => setRoute('foods') }
              >
                <img alt="drinks" src={ Food } />
              </button>
            </span>
            <span className="text">Food</span>
          </a>      
        </li>
        <div className="indicator"></div>    
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
