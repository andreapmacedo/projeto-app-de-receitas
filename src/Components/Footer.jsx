import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Drinks from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import Food from '../images/mealIcon.svg';
import './Footer.css';
import { ForkKnife, Wine, ArrowsOutCardinal } from 'phosphor-react';

function Footer() {
  // console.log('Footer');

  const history = useHistory();
  
  const [activedBtn, setActivedBtn] = useState('foods');

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
    // console.log(pathname);
    // console.log(itemNav);

    if(pathname === itemNav) {
      return 'list active';
    } 
    return 'list';
  }

  // useEffect(() => {
  //   // script();
  // }, []);

  const setRoute = (route) => {
    // console.log( route );
    if(route === 'drinks'){
      setActivedBtn('drinks');
      history.push('/drinks');
    } else if (route === 'explore') {
      setActivedBtn('explore');
      history.push('/explore');
    } else if (route === 'foods') {
      setActivedBtn('foods');
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
          <div className="item-navigator-container">
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
                {/* <img alt="drinks" src={ Drinks } /> */}
                {/* <Wine size={36} color="#a01818" /> */}
                {activedBtn === 'explore' ? <Wine size={36} color="#a01818" />  : <Wine size={36} color="#ffffff" />}
              </button>
            </span>
            <span className="text">Drinks</span>
          </div>
        </li>
        <li 
          className={ getClassName('explore') }
        >
          <div className="item-navigator-container">
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
                {/* <img alt="drinks" src={ Explore } /> */}
                {/* <ArrowsOutCardinal size={36} color="#a01818" /> */}
                {activedBtn === 'explore' ? <ArrowsOutCardinal size={36} color="#a01818" />  : <ArrowsOutCardinal size={36} color="#ffffff" />}
              </button>
            </span>
              <span className="text">Explore</span>         
          </div>
        </li>
        <li 
          className={ getClassName('foods') }
        >
          <div className="item-navigator-container">
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
                {/* <img alt="drinks" src={ Food } /> */}
                { activedBtn === 'foods' ? <ForkKnife size={36} color="#a01818" /> : <ForkKnife size={36} color="#ffffff" /> }
                {/* <ForkKnife size={36} color="#a01818" /> */}
              </button>
            </span>
            <span className="text">Food</span>
          </div>
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
