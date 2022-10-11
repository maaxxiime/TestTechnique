import React from "react";
import styled from "styled-components";
import { colors } from "../../variable/variable";

const Nav = styled.nav`
  display: flex;
  background-color: #54a6ee;
  height: 80px;

  a {
    text-decoration: none;
    color: white;
    font-size: 1.050rem;
    font-weight: 500;
    position: relative;
  }

  button {
    border: none;
    background-color: #54a6ee;
    cursor: pointer;
    color: white;
    font-size: 1.050rem;
    font-weight: 500;
    position: relative;
  }
  h2 {
    color: white;
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
    width: 100%;
    height: 2px;
    border-radius: 0.25rem;
    background-color: white;
    position: absolute;
    transform: translate(-100% , 27px);

  }
`;

export default function Navbar() {
  const user = window.localStorage.getItem("user");
  const userJson = JSON.parse(user);

  function deconnexion() {
    window.localStorage.clear();
    window.location.assign("/");
  }

  return userJson ? (
    <Nav>
      <div>
      <h2>Deadline BTP</h2>
      <a href="/"> Accueil</a>
      </div>
      <div>
      <a href="/compte"> Mon compte</a>
      <button onClick={() => deconnexion()}> Déconnexion</button>
      </div>
    </Nav>
  ) : (
    <Nav>
      <div>
      <h2>Deadline BTP</h2>
      <a href="/"> Accueil</a>
      </div>
      <div>
      <a href="/login"> Connexion</a>
      <a href="/signup"> Créer un compte</a>
      </div>
    </Nav>
  );
}
