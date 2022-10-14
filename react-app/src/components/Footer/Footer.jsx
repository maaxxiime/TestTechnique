import React from "react";
import styled from "styled-components";
import { colors } from "../../variable/variable";

// import img
import facebook from "../../assets/img/facebook.png";
import instagram from "../../assets/img/instagram.png";
import linkedin from "../../assets/img/linkedin.png";
import pinterest from "../../assets/img/pinterest.png";

const Foot = styled.footer`
  display: flex;
  background-color: ${colors["background-navbar"]};
  margin-top: 2%;
  height: 140px;
  color: white;
  align-items: center;
  flex-direction: column;

  .name {
    margin-top: 10px;
    font-size: 1.1rem;

    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.9rem;
    }
  }

  .reseaux {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.9rem;
    }

    h3::before {
      content: "";
      position: absolute;
      height: 2px;
      background-color: white;
      width: 4.5rem;
      transform: translate(-130%, 10px);
    }

    h3::after {
      content: "";
      position: absolute;
      height: 2px;
      background-color: white;
      width: 4.5rem;
      transform: translate(30%, 10px);
    }

    div {
      display: flex;
      width: 150%;
      justify-content: space-around;

      img {
        margin-top: 10px;

        @media screen and (max-width: 480px) {
          width: 20px;
          height: 20px;
        }
        @media screen and (min-width: 480px) and (max-width: 720px) {
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  .facebook-img {
    background-color: white;
    border-radius: 0.3rem;
  }
`;

export default function Footer() {
  return (
    <Foot>
      <div className="name">
        <h2>Deadline BTP</h2>
      </div>

      <div className="reseaux">
        <h3>Rejoingnez-nous</h3>
        <div>
          <a href="">
            <img className="facebook-img" src={facebook} alt="logo-facebook" />
          </a>
          <a href="">
            <img src={instagram} alt="logo-instagram" />
          </a>
          <a href="">
            <img src={linkedin} alt="logo-linkedin" />
          </a>
          <a href="">
            <img src={pinterest} alt="logo-pinterest" />
          </a>
        </div>
      </div>
    </Foot>
  );
}
