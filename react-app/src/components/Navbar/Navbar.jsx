import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../variable/variable";

const Nav = styled.nav`
  display: flex;
  background-color: ${colors["background-navbar"]};
  height: 80px;

  a {
    text-decoration: none;
    color: ${colors["font-navbar"]};
    font-size: 1.050rem;
    font-weight: 500;
    position: relative;
    height: 50%;
    padding: 0 1rem 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.30rem;
  }

  a:hover{
    background-color: ${colors["background-button-deconnexion"]};
    transition: 0.4s;
  }

  button {
    border: none;
    background-color: ${colors["background-button-deconnexion"]};
    cursor: pointer;
    color: ${colors["font-navbar"]};
    font-size: 1.050rem;
    font-weight: 500;
    position: relative;
    height: 3rem;
    border-radius: 0.5rem;
    
  }
  h2 {
    color: ${colors["font-navbar"]};
    font-size: 2rem;
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
    background-color: ${colors["font-navbar"]};
    position: absolute;
    transform: translate(-0 , 22px);

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
      <a id="accueil" className={trueUrl === "localhost:3000" ? "active" : ""} href="/"> Accueil</a>
      </div>
      <div>
      <a id="compte" className={trueUrl === "compte" ? "active" : ""} href="/compte"> Mon compte</a>
      <button onClick={() => deconnexion()}>🔓 Déconnexion</button>
      </div>
    </Nav>
  ) : (
    <Nav>
      <div>
      <h2>Deadline BTP</h2>
      <a id="accueilTwo" className={trueUrl === "localhost:3000" ? "active" : ""} href="/"> Accueil</a>
      </div>
      <div>
      <a id="login" className={trueUrl === "login" ? "active" : ""} href="/login"> Connexion</a>
      <a id="signup" className={trueUrl === "signup" ? "active" : ""} href="/signup"> Créer un compte</a>
      </div>
    </Nav>
  );
}
