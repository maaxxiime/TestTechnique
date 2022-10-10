import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import { apiurl } from "../../variable/variable";
// import { colors } from "../../variable/variable";

const MainSection = styled.section``;
const MainTitle = styled.h1``;
const Form = styled.form``;

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

  function send() {
    let pseudo = document.getElementById("pseudo").value;
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let telephone = document.getElementById("telephone").value;
    let adresse = document.getElementById("adresse").value;
    let complement = document.getElementById("complement").value;
    let codePostal = document.getElementById("codepostal").value;
    let ville = document.getElementById("ville").value;

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

    const config = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(apiurl + "/users/signup", qs.stringify(data), config)
      .then((res) => {
        setRes(res.data.message);

        // setTimeout(() => {
        //   window.location.assign("/login");
        // }, 1500);
      })
      .catch((err) => {
        setRes(err.message);
      });
  }

  return (
    <MainSection id="main">
      <MainTitle>
        {" "}
        Créer votre compte dès maintenant pour pouvoir profiter du site à 100% !{" "}
      </MainTitle>

      <Form>
        <label htmlFor="pseudo"> Pseudo : </label>
        <input
          id="pseudo"
          type="text"
          placeholder="Maxime41"
          name="pseudo"
          required={true}
          onChange={() => checkValues()}
        />
        <label htmlFor="prenom"> Nom : </label>
        <input
          id="nom"
          type="text"
          placeholder="Maxime"
          name="nom"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="prenom"> Prenom : </label>
        <input
          id="prenom"
          type="text"
          placeholder="Potter"
          name="prenom"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="email"> Email : </label>
        <input
          id="email"
          type="email"
          placeholder="monEmail@gmail.com"
          name="email"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="password"> Mot de passe : </label>
        <input
          id="password"
          type="password"
          placeholder="monSuperMdp@54"
          name="password"
          required={true}
          onChange={() => checkValues()}
        />
                <label htmlFor="telephone"> Telephone: </label>
        <input
          id="telephone"
          type="text"
          placeholder="0640010101"
          name="telephone"
          required={true}
          onChange={() => checkValues()}
        />
        <label htmlFor="adresse"> Adresse: </label>
        <input
          id="adresse"
          type="text"
          placeholder="30 rue du btp"
          name="adresse"
          required={true}
          onChange={() => checkValues()}
        />
        <label htmlFor="complement"> Complement d'adresse : </label>
        <input
          id="complement"
          type="text"
          placeholder="Batiment B"
          name="complement"
          onChange={() => checkValues()}
        />
        <label htmlFor="codepostal"> Code postal : </label>
        <input
          id="codepostal"
          type="text"
          placeholder="41000"
          name="codepostal"
          required={true}
          onChange={() => checkValues()}
        />

        <label htmlFor="ville"> Ville : </label>
        <input
          id="ville"
          type="text"
          placeholder="Paris"
          name="ville"
          required={true}
          onChange={() => checkValues()}
        />

        <div>
          <button disabled={!Filled} onClick={() => send()}> Créer le compte</button>
        </div>

        {Res && (
          <div className="res">
            <p>{Res}</p>
          </div>
        )}
      </Form>
    </MainSection>
  );
}
