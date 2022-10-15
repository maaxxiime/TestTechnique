import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import { apiurl } from "../../variable/variable";
import { colors } from "../../variable/variable";

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 3%;
    text-align: center;
    @media screen and (max-width: 480px) {
      font-size: 1.1rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 1.3rem;
    }
  }
`;
const DivInfos = styled.div`
  .collumn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    background-color: #e4f3ff;
    width: 300px;
    border-radius: 0.3rem;
    margin: 1rem;
    box-shadow: rgba(0, 153, 255, 0.2) 0px 2px 8px 0px;
    text-align: center;
    max-width: 400px;
  }
  .container h5 {
    margin: 6px 0;
    font-size: 1rem;

    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.9rem;
    }
  }

  .container p {
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }
`;

const DivButtonModifie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 3%;
    background-color: ${colors["blue-btn"]};
    color: ${colors["font-white"]};
    border: none;
    width: 150px;
    height: 40px;
    border-radius: 0.5rem;
    cursor: pointer;
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
    @media screen and (min-width: 480px) and (max-width: 720px) {
      font-size: 0.8rem;
    }
  }

  button:hover {
    background-color: ${colors["blue-btn-hover"]};
    transition: 0.2s;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivModifie = styled.div`
  form {
    display: flex;
    flex-direction: column;
    margin-top: 3%;
    button {
      margin-top: 6%;
      background-color: #3cff00;
      color: ${colors["font-white"]};
      padding: 10px;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      width: 200px;
      @media screen and (max-width: 480px) {
        font-size: 0.8rem;
      }
      @media screen and (min-width: 480px) and (max-width: 720px) {
        font-size: 0.9rem;
      }
    }

    button:hover {
      background-color: #27e700;
      transition: 0.2s;
    }
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  input {
    width: 320px;
    height: 30px;
    font-size: 1rem;
    border: 1px solid ${colors["border-input"]};
    background-color: ${colors["background-input"]};
    color: ${colors["font-input"]};
    border-radius: 0.25rem;
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

  .btn-delete {
    margin-top: 6%;
    background-color: #ff0000;
    color: ${colors["font-white"]};
    padding: 10px;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .btn-back {
    margin-top: 6%;
    background-color: #40c6ff;
    color: ${colors["font-white"]};
    padding: 10px;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .btn-delete:hover {
    background-color: #e30000;
    transition: 0.2s;
  }
  .btn-back:hover {
    background-color: #00b3ff;
    transition: 0.2s;
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
      email: email.value || userJson.email,
      adresse: adresse.value || userJson.adresse,
      complement: complement.value || userJson.complement,
      codepostal: codePostal.value || userJson.codepostal,
      ville: ville.value || userJson.ville,
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
    <Section>
      <DivModifie>
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
          <label htmlFor="complement"> Complément d'adresse : </label>
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
          <div>
            <button onClick={(e) => modifie(e)}> modifier mon compte </button>
            <button className="btn-back" onClick={() => NoPut()}>
              {" "}
              Annuler les modifications{" "}
            </button>
            <button className="btn-delete" onClick={() => delet()}>
              Supprimer mon compte
            </button>
          </div>
        </form>
      </DivModifie>
    </Section>
  ) : (
    <MainSection>
      <DivInfos>
        <h2> Mes informations personnelles </h2>

        <div className="collumn">
          <div className="container">
            <h5>Pseudo :</h5>
            <p> {pseudo} </p>
          </div>

          <div className="container">
            <h5>Nom :</h5>
            <p> {nom} </p>
          </div>

          <div className="container">
            <h5>Prénom :</h5>
            <p> {prenom} </p>
          </div>

          <div className="container">
            <h5>Email :</h5>
            <p> {email} </p>
          </div>

          <div className="container">
            <h5>Téléphone :</h5>
            <p> {telephone} </p>
          </div>

          <div className="container">
            <h5>Adresse :</h5>
            <p> {adresse} </p>
          </div>

          <div className="container">
            <h5>Complément d'adresse :</h5>
            <p> {complement} </p>
          </div>
          <div className="container">
            <h5>Code postal :</h5>
            <p> {codePostal} </p>
          </div>

          <div className="container">
            <h5>Ville :</h5>
            <p> {ville} </p>
          </div>
        </div>
      </DivInfos>
      <DivButtonModifie>
        <button onClick={() => put()}>
          {" "}
          Changer les informations du compte{" "}
        </button>
      </DivButtonModifie>
    </MainSection>
  );
}
