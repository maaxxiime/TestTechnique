import React from "react";
import styled from "styled-components";
import { colors } from "../../variable/variable";

const Nav = styled.nav`
  display: flex;
  background-color: ${colors["blue-one"]};
  height: 80px;

  a {
    text-decoration: none;
    color: ${colors["font-white"]};
    font-size: 1.05rem;
    font-weight: 500;
    position: relative;
    height: 50%;
    padding: 0 1rem 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.3rem;

    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
      padding: 0 0.2rem 0 0.2rem;
      text-align: center;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.9rem;
      padding: 0 0.5rem 0 0.5rem;
    }
  }

  a:hover {
    background-color: ${colors["blue-two"]};
    transition: 0.4s;
  }

  button {
    border: none;
    background-color: ${colors["blue-two"]};
    cursor: pointer;
    color: ${colors["font-white"]};
    font-size: 1.05rem;
    font-weight: 500;
    position: relative;
    height: 3rem;
    border-radius: 0.5rem;

    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
      padding: 0 0.1rem 0 0.1rem;
      margin: 0 0 0 7px;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.9rem;
      padding: 0 0.5rem 0 0.5rem;
    }
  }
  h2 {
    color: ${colors["font-white"]};
    font-size: 2rem;
    @media screen and (max-width: 480px) {
      font-size: 1rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 1.3rem;
    }
  }

  div {
    display: flex;
    align-items: center;
  }
  div:nth-child(1) {
    width: 45%;
    justify-content: space-between;
    margin: 0 2% 0 3%;
  }
  div:nth-child(2) {
    width: 45%;
    justify-content: space-between;
    margin: 0 3% 0 2%;
  }

  .active::after {
    content: "";
    width: 80%;
    height: 2px;
    border-radius: 0.25rem;
    background-color: ${colors["font-white"]};
    position: absolute;
    transform: translate(-0, 22px);
  }
`;

export default function Navbar() {
  const user = window.localStorage.getItem("user");
  const userJson = JSON.parse(user);

  let url = document.location.href;
  let urlReplace = url.replace(/\/$/, "");
  let trueUrl = urlReplace.substring(urlReplace.lastIndexOf("/") + 1);

  function deconnexion() {
    window.localStorage.clear();
    window.location.assign("/");
  }

  return userJson ? (
    <Nav>
      <div>
        <h2>Deadline BTP</h2>
        <a
          id="accueil"
          // Si l'url est "localhost:3000" ??a ajoute la classe active sinon ??a ne met rien 
          className={trueUrl === "localhost:3000" ? "active" : ""}
          href="/"
        >
          {" "}
          Accueil
        </a>
      </div>
      <div>
        <a
          id="compte"
          className={trueUrl === "compte" ? "active" : ""}
          href="/compte"
        >
          {" "}
          Mon compte
        </a>
        <button onClick={() => deconnexion()}>???? D??connexion</button>
      </div>
    </Nav>
  ) : (
    <Nav>
      <div>
        <h2>Deadline BTP</h2>
        <a
          id="accueilTwo"
          className={trueUrl === "localhost:3000" ? "active" : ""}
          href="/"
        >
          {" "}
          Accueil
        </a>
      </div>
      <div>
        <a
          id="login"
          className={trueUrl === "login" ? "active" : ""}
          href="/login"
        >
          {" "}
          Connexion
        </a>
        <a
          id="signup"
          className={trueUrl === "signup" ? "active" : ""}
          href="/signup"
        >
          {" "}
          Cr??er un compte
        </a>
      </div>
    </Nav>
  );
}
