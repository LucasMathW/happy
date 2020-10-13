import React from 'react';
import {Link} from 'react-router-dom'; 

import { FiArrowRight } from 'react-icons/fi';


import '../styles/pages/landding.css';
import LogoImg from '../images/logo.svg';

function Landding(){
  return (
    <div id="page-landding">
        <div className="content-wrapper">
            <img src={LogoImg} alt="Happy" />
            
            <main>
              <h1>Leve a felicidade para o mundo</h1>
              <p>
                  Visite orfanatos e mude o dia
                  de muitas crianças.
              </p>
            </main>  

            <div className="location">
                <strong>Manaus</strong>
                <span>Amazonas</span>
            </div>

            <Link to="/app" className="enter-app">
                  <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
            </Link>      
        </div>
    </div>
  );
}

export default Landding