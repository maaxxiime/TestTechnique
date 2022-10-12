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
margin-top: 2rem;
`;
const Form = styled.form`
display: flex;
flex-direction: column;

input {
  max-width: 350px;
  height: 30px;
  font-size: 1rem;
  border: 1px solid ${colors["border-input"]};
  background-color: #effbff;
  color: ${colors["font-input"]};
  border-radius: 0.25rem;
}
input:focus {
  background-color: #dff7ff;
  outline:2px solid ${colors["outline-input"]} ;
  color: ${colors["font-input"]};
  border-radius: 0.25rem;
  border: 1px solid ${colors["outline-input"]};
}

input::placeholder{
  color: ${colors["font-input"]};
}

label {
  margin-top: 20px;
  font-weight: 500;
  font-size: 0.9rem;
}

span {
  color: #ff0000;
  font-size: 1.2rem;
  font-weight: 500;
}
h3 {
  margin-top: 2rem;
  font-size: 1.1rem;
  font-weight: 500;
}

div {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.enable {
  background-color: #40c6ff;
  color: white;
  border: none;
  cursor: pointer;
}

.enable:hover {
  background-color: #00b3ff;
}
.disabled{
  border: none;
  background-color: #e1e1e1;
  color: #6b6b6b;
}

.btn {
  width: 120px;
  height: 40px;
  border-radius: 0.50rem;
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
        setRes(res.data.message);
        console.log(res.data);

        setTimeout(() => {
          window.location.assign("/login");
        }, 1500);
      })
      .catch((err) => {
        setRes(err.message);
        console.log(err);
      });
  }

  return (
    <MainSection>
      <MainTitle>
        Bienvenue sur la page de création de compte
      </MainTitle>

      <Form>
        <h3>Les champs marqué par <span>*</span> sont obligatoire</h3>
        <label htmlFor="pseudo"> Pseudo <span>*</span> </label>
        <input
          id="pseudo"
          type="text"
          placeholder="Maxime41"
          name="pseudo"
          required={true}
          onChange={() => checkValues()}
        />
        <label htmlFor="nom"> Nom <span>*</span> </label>
        <input
          id="nom"
          type="text"
          placeholder="Durand"
          name="nom"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="prenom"> Prenom <span>*</span> </label>
        <input
          id="prenom"
          type="text"
          placeholder="Pierre"
          name="prenom"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="email"> Email <span>*</span> </label>
        <input
          id="email"
          type="email"
          placeholder="monEmail@gmail.com"
          name="email"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="password"> Mot de passe <span>*</span> </label>
        <input
          id="password"
          type="password"
          placeholder="Mot de passe"
          name="password"
          required={true}
          onChange={() => checkValues()}
        />
        <label htmlFor="telephone"> Telephone <span>*</span> </label>
        <input
          id="telephone"
          type="number"
          placeholder="0640951701"
          name="telephone"
          required={true}
          onChange={() => checkValues()}
        />
        <label htmlFor="adresse"> Adresse <span>*</span> </label>
        <input
          id="adresse"
          type="text"
          placeholder="30 rue du btp"
          name="adresse"
          required={true}
          onChange={() => checkValues()}
        />
        <label htmlFor="complement"> Complement d'adresse:</label>
        <input
          id="complement"
          type="text"
          placeholder="Batiment B"
          name="complement"
          required={false}
          onChange={() => checkValues()}
        />
        <label htmlFor="codepostal"> Code postal <span>*</span> </label>
        <input
          id="codepostal"
          type="number"
          placeholder="41000"
          name="codepostal"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="ville"> Ville <span>*</span> </label>
        <input
          id="ville"
          type="text"
          placeholder="Paris"
          name="ville"
          required={true}
          onChange={() => checkValues()}
        />

        <div>
          <button disabled={!Filled} className={!Filled ? "disabled btn" : "enable btn"} onClick={(e) => send(e)}>
            Créer le compte
          </button>
        </div>

        {Res && (
          <div className="res">
            <p>Erreur</p>
            <p>Vérifier bien que :</p>
          </div>
        )}
      </Form>
    </MainSection>
  );
}
