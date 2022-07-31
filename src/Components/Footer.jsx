import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Food from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  // console.log('Footer');

  const history = useHistory();
  
  // const script = () => {
  //   const list = document.querySelectorAll('.list');
  //   function activelink() {
  //     list.forEach((item) =>
  //       item.classList.remove('active'));
  //     this.classList.add('active');
  //   }
  //   list.forEach((item) =>
  //     item.addEventListener('click', activelink));
  // }

  const getClassName = (itemNav) =>  {
    const pathname = (history.location.pathname).replace('/', '');
    console.log(pathname);
    console.log(itemNav);

    if(pathname === itemNav) {
      return 'list active';
    } 
    return 'list';
  }

  // useEffect(() => {
  //   // script();
  // }, []);

  const setRoute = (route) => {
    console.log( route );
    if(route === 'drinks'){
      history.push('/drinks');
    } else if (route === 'explore') {
      history.push('/explore');
    } else if (route === 'foods') {
      history.push('/foods');
    }
  }

  return (
    <div
      className="navigation"
      data-testid="footer"
    >
      <ul>
        <li 
          className={ getClassName('drinks') }
        >
          {/* <span class="icon" style={{color: "red"}}> */}
          <span className="icon"
            onClick={ () => setRoute('drinks') }
            // onClick={ () => setTimeout(function(){
            //   setRoute('drinks');
            // }, 300) }
          >
            <button
              className="button-footer"
              src={ Drinks }
              type="button"
              data-testid="drinks-bottom-btn"
              // onClick={ () => setRoute('drinks') }
            >
              <img alt="drinks" src={ Drinks } />
            </button>
          </span>
          <span className="text">Drinks</span>
        </li>
        <li 
          className={ getClassName('explore') }
        >
          <span className="icon"
          onClick={ () => setRoute('explore') }
            // onClick={ () => setTimeout(function(){
            //   setRoute('explore');
            // }, 300) }
          >
            <button
              src={ Explore }
              type="button"
              data-testid="drinks-bottom-btn"
              // onClick={ () => setRoute('explore') }
            >
              <img alt="drinks" src={ Explore } />
            </button>
          </span>
            <span className="text">Explore</span>         
        </li>
        <li 
          className={ getClassName('foods') }
        >
          <span className="icon"
          onClick={ () => setRoute('foods') }
            // onClick={ () => setTimeout(function(){
            //   setRoute('foods');
            // }, 3000) }
          >
            <button
              src={ Food }
              type="button"
              data-testid="drinks-bottom-btn"
              // onClick={ () => setRoute('foods') }
            >
              <img alt="drinks" src={ Food } />
            </button>
          </span>
          <span className="text">Food</span>
        </li>
        <div className="indicator"></div>    
      </ul>
      <script>
        {/* {script()} */}
      </script>
      {/* <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script> */}
      {/* <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> */}
    </div>
  );
}

export default Footer;
