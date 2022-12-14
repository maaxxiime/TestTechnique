import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import { apiurl } from "../../variable/variable";
import { colors } from "../../variable/variable";

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainTitle = styled.h1`
  margin-top: 3%;
  @media screen and (max-width: 480px) {
      font-size: 1rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 1.2rem;
    }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    max-width: 350px;
    height: 30px;
    font-size: 1rem;
    border: 1px solid ${colors["border-input"]};
    background-color: ${colors["background-input"]};
    color: ${colors["font-input"]};
    border-radius: 0.25rem;
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }
  input:focus {
    background-color: ${colors["background-input-focus"]};
    outline: 2px solid ${colors["outline-input"]};
    color: ${colors["font-input"]};
    border-radius: 0.25rem;
    border: 1px solid ${colors["outline-input"]};
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }

  input::placeholder {
    color: ${colors["font-input"]};
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }

  label {
    margin-top: 20px;
    font-weight: 500;
    font-size: 0.9rem;
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }

  span {
    color: #ff0000;
    font-size: 1.2rem;
    font-weight: 500;
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }
  h3 {
    margin-top: 2rem;
    font-size: 1.1rem;
    font-weight: 500;
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }

  div {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .enable {
    background-color: ${colors["blue-btn"]};
    color: ${colors["font-white"]};
    border: none;
    cursor: pointer;
  }

  .enable:hover {
    background-color: ${colors["blue-btn-hover"]};
    transition: 0.2s;
  }
  .disabled {
    border: none;
    background-color: #e1e1e1;
    color: #6b6b6b;
  }

  .btn {
    padding: 10px;
    border-radius: 0.5rem;
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }

  .res p {
    color: red;
  }
`;

export default function Login() {
  const [Filled, setFilled] = useState(false);
  const [Res, setRes] = useState(undefined);


  // si champ vide, d??sactive le bouton de connexion, sinon ??a l'active
  function checkValues() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email && password) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }

  function send(e) {
    e.preventDefault();

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const data = {
      email: email.value,
      password: password.value,
    };

    axios
      .post(apiurl + "/users/login", qs.stringify(data))
      .then((res) => {
        const user = {
          pseudo: res.data.pseudo,
          nom: res.data.nom,
          prenom: res.data.prenom,
          email: res.data.email,
          telephone: res.data.telephone,
          adresse: res.data.adresse,
          complement: res.data.complement,
          codepostal: res.data.codepostal,
          ville: res.data.ville,
          userId: res.data.userId,
          token: res.data.token,
        };
        // assign la constante "user" dans le local storage sous la cl?? "user"
        window.localStorage.setItem("user", JSON.stringify(user));
        window.location.assign("/compte");
      })
      .catch((err) => {
        setRes(err.message);
      });
  }
  return (
    <MainSection id="main">
      <MainTitle>Connectez-vous pour profiter du site</MainTitle>

      <Form>
        <h3>
          Les champs marqu?? par <span>*</span> sont obligatoire
        </h3>

        <label htmlFor="email">
          Email <span>*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="monEmail@gmail.com"
          name="email"
          required
          onChange={() => checkValues()}
        />

        <label htmlFor="password">
          Mot de passe <span>*</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Mot de passe"
          name="password"
          required
          onChange={() => checkValues()}
        />

        <div>
          <button
            disabled={!Filled}
            className={!Filled ? "disabled btn" : "enable btn"}
            onClick={(e) => send(e)}
          >
            Se connecter
          </button>
        </div>

        {Res && (
          <div className="res">
            <p>L'email et/ou mot de passe sont incorrect</p>
          </div>
        )}
      </Form>
    </MainSection>
  );
}
