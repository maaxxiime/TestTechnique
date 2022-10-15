import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import { apiurl, colors } from "../../variable/variable";
// import { colors } from "../../variable/variable";

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
    margin-top: 0.8rem;
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

  .res {
    margin: 0.5rem;
    max-width: 350px;
    text-align: center;
  }

  .res p {
    color: red;
    font-size: 0.8rem;
  }
`;

export default function Signup() {
  const [Filled, setFilled] = useState(false);
  const [Res, setRes] = useState(undefined);

  // si champ vide, desactive le bouton de création de compte, sinon ça l'active
  function checkValues() {
    let pseudo = document.getElementById("pseudo").value;
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let telephone = document.getElementById("telephone").value;
    let adresse = document.getElementById("adresse").value;
    let codePostal = document.getElementById("codepostal").value;
    let ville = document.getElementById("ville").value;

    if (
      pseudo &&
      nom &&
      prenom &&
      email &&
      password &&
      telephone &&
      adresse &&
      codePostal &&
      ville
    ) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }

  function send(e) {
    e.preventDefault();

    let pseudo = document.getElementById("pseudo");
    let nom = document.getElementById("nom");
    let prenom = document.getElementById("prenom");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let telephone = document.getElementById("telephone");
    let adresse = document.getElementById("adresse");
    let complement = document.getElementById("complement");
    let codePostal = document.getElementById("codepostal");
    let ville = document.getElementById("ville");

    if (complement.value === "") {
      complement.value = "empty";
    }

    const data = {
      pseudo: pseudo.value,
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      password: password.value,
      telephone: telephone.value,
      adresse: adresse.value,
      complement: complement.value,
      codepostal: codePostal.value,
      ville: ville.value,
    };

    axios
      .post(apiurl + "/users/signup", qs.stringify(data))
      .then((res) => {
        console.log(res.data);
        window.location.assign("/login");
      })
      .catch((err) => {
        setRes(err.message);
        console.log(err);
      });
  }

  return (
    <MainSection>
      <MainTitle>Bienvenue sur la page de création de compte</MainTitle>

      <Form>
        <h3>
          Les champs marqué par <span>*</span> sont obligatoire
        </h3>
        <label htmlFor="pseudo">
          {" "}
          Pseudo <span>*</span>{" "}
        </label>
        <input
          id="pseudo"
          type="text"
          placeholder="Maxime41"
          name="pseudo"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>Vérifiez que le pseudo fasse entre 4 et 30 caractères</p>
          </div>
        )}
        <label htmlFor="nom">
          {" "}
          Nom <span>*</span>{" "}
        </label>
        <input
          id="nom"
          type="text"
          placeholder="Durand"
          name="nom"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>Vérifiez que le nom fasse entre 2 et 30 caractères</p>
          </div>
        )}

        <label htmlFor="prenom">
          {" "}
          Prénom <span>*</span>{" "}
        </label>
        <input
          id="prenom"
          type="text"
          placeholder="Pierre"
          name="prenom"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>Vérifiez que le prénom fasse entre 2 et 30 caractères</p>
          </div>
        )}

        <label htmlFor="email">
          {" "}
          Email <span>*</span>{" "}
        </label>
        <input
          id="email"
          type="email"
          placeholder="monEmail@gmail.com"
          name="email"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>
              Vérifiez que l'email fasse entre 4 et 40 caractères et qu'il ne
              soit pas déjà utilisé
            </p>
          </div>
        )}

        <label htmlFor="password">
          {" "}
          Mot de passe <span>*</span>{" "}
        </label>
        <input
          id="password"
          type="password"
          placeholder="Mot de passe"
          name="password"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>Vérifiez que le mot de passe fasse entre 6 et 200 caractères</p>
          </div>
        )}
        <label htmlFor="telephone">
          {" "}
          Téléphone <span>*</span>{" "}
        </label>
        <input
          id="telephone"
          type="number"
          placeholder="0640951701"
          name="telephone"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>
              Vérifiez que le téléphone fasse 10 chiffres et qu'il ne soit pas
              déjà utilisé
            </p>
          </div>
        )}
        <label htmlFor="adresse">
          {" "}
          Adresse <span>*</span>{" "}
        </label>
        <input
          id="adresse"
          type="text"
          placeholder="30 rue du btp"
          name="adresse"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>Vérifiez que le l'adresse fasse entre 4 et 60 caractères</p>
          </div>
        )}
        <label htmlFor="complement"> Complément d'adresse:</label>
        <input
          id="complement"
          type="text"
          placeholder="Batiment B"
          name="complement"
          required={false}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>
              Vérifiez que le complément d'adresse fasse entre 4 et 60
              caractères
            </p>
          </div>
        )}
        <label htmlFor="codepostal">
          {" "}
          Code postal <span>*</span>{" "}
        </label>
        <input
          id="codepostal"
          type="number"
          placeholder="41000"
          name="codepostal"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>Vérifiez que le code postal fasse 5 chiffres</p>
          </div>
        )}

        <label htmlFor="ville">
          {" "}
          Ville <span>*</span>{" "}
        </label>
        <input
          id="ville"
          type="text"
          placeholder="Paris"
          name="ville"
          required={true}
          onChange={() => checkValues()}
        />
        {Res && (
          <div className="res">
            <p>Vérifiez que la ville fasse entre 2 et 50 caractères</p>
          </div>
        )}

        <div>
          <button
            disabled={!Filled}
            className={!Filled ? "disabled btn" : "enable btn"}
            onClick={(e) => send(e)}
          >
            Créer le compte
          </button>
        </div>
      </Form>
    </MainSection>
  );
}
