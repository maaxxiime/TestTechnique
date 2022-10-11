import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import { apiurl } from "../../variable/variable";
import { colors } from "../../variable/variable";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

const DivInfos = styled.div`
  margin: 2rem 0;

  & h1 {
    margin: 1rem 0;
  }

  & h2 {
    margin: 0 0 1rem 0;
  }

  & div {
    border: 2px solid #a89c9c;
    width: calc(100% + 150px);
    height: 30px;
    margin: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const DivModifie = styled.div`


  & input {
    margin: 1rem 0 2rem 0;
  }

  & .myBtn {
    margin: 1rem 1rem;
  }

  & .btn-delet {
    border: none;
    background-color: ${colors.background_black};
    color: ${colors.txt_white};
    width: 11rem;
    height: 1.9rem;
    border-radius: 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
  & .btn-delet:hover {
    background-color: ${colors.btn_redhover};
  }
  & form {
    @media all and (min-width: 480px) and (max-width: 767px) {
      display: flex;
      flex-direction: column;
      width: 90%;
      align-items: center;
    }
    @media all and (max-width: 479px) {
      display: flex;
      flex-direction: column;
      width: 90%;
      align-items: center;
    }
  }
  @media all and (min-width: 480px) and (max-width: 767px) {
  }
  @media all and (max-width: 479px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;



export default function Compte() {
  const user = window.localStorage.getItem("user");
  const userJson = JSON.parse(user);

  const userToken = userJson.token;
  const userId = userJson.userId;
  const email = userJson.email;
  const adresse = userJson.adresse;
  const codePostal = userJson.codepostal;
  const complement = userJson.complement;
  const nom = userJson.nom;
  const prenom = userJson.prenom;
  const pseudo = userJson.pseudo;
  const telephone = userJson.telephone;
  const ville = userJson.ville;

  const [Put, setPut] = useState(false);

  function put() {
    setPut(true);
  }

  function NoPut() {
    setPut(false);
  }

  function modifie(e) {
    e.preventDefault();

    let email = document.getElementById("email");
    let adresse = document.getElementById("adresse");
    let complement = document.getElementById("complement");
    let codePostal = document.getElementById("codepostal");
    let ville = document.getElementById("ville");

    if (complement.value === "") {
      complement.value = "empty";
    }

    const data = {
      email: email.value,
      adresse: adresse.value,
      complement: complement.value,
      codepostal: codePostal.value,
      ville: ville.value,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    };

    axios
      // envoi l'userId, la data et le usertoken pour pouvoir comparer l'id du token et l'userId
      .put(apiurl + "/users/" + userId, qs.stringify(data), config)
      .then((res) => {
        window.localStorage.removeItem("user");
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
        window.localStorage.setItem("user", JSON.stringify(user));
        window.location.assign("/compte");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function delet() {
    const config = {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    };

    axios
      // envoi l'userId et le usertoken pour pouvoir comparer l'id du token et l'userId

      .delete(apiurl + "/users/" + userId, config)
      .then((res) => {
        localStorage.clear();
        window.location.assign("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return Put ? (
    <DivModifie>
      <h2> Modifier mon compte </h2>
      <h1>Je modifie</h1>

      <form>
        <label htmlFor="email"> Email : </label>
        <input
          id="email"
          type="email"
          placeholder="monEmail@gmail.com"
          name="email"
          required={true}
        />
        <label htmlFor="adresse"> Adresse: </label>
        <input
          id="adresse"
          type="text"
          placeholder="30 rue du btp"
          name="adresse"
          required={true}
        />
        <label htmlFor="complement"> Complement d'adresse : </label>
        <input
          id="complement"
          type="text"
          placeholder="Batiment B"
          name="complement"
          required={false}
        />
        <label htmlFor="codepostal"> Code postal : </label>
        <input
          id="codepostal"
          type="number"
          placeholder="41000"
          name="codepostal"
          required={true}
        />

        <label htmlFor="ville"> Ville : </label>
        <input
          id="ville"
          type="text"
          placeholder="Paris"
          name="ville"
          required={true}
        />

        <button onClick={(e) => modifie(e)}> modifier mon compte </button>
      </form>
        <button onClick={() => delet()}> Supprimer mon compte </button>
      <button onClick={() => NoPut()}> Annuler les modifications </button>
    </DivModifie>
  ) : (
    <Section>
      <DivInfos>
        <h1> Mon compte </h1>
        <h2> Mes informations </h2>

        <p>pseudo :</p>
        <div>
          <p> {pseudo} </p>
        </div>
        <p>nom :</p>
        <div>
          <p> {nom} </p>
        </div>
        <p>Prenom :</p>
        <div>
          <p> {prenom} </p>
        </div>
        <p>email :</p>
        <div>
          <p> {email} </p>
        </div>
        <p>Telephne :</p>
        <div>
          <p> {telephone} </p>
        </div>
        <p>Adresse :</p>
        <div>
          <p> {adresse} </p>
        </div>
        <p>Complement d'adresse :</p>
        <div>
          <p> {complement} </p>
        </div>
        <p>Code postal :</p>
        <div>
          <p> {codePostal} </p>
        </div>
        <p>Ville :</p>
        <div>
          <p> {ville} </p>
        </div>
      </DivInfos>
      <button onClick={() => put()}> Changer les information du compte </button>
    </Section>
  );
}
