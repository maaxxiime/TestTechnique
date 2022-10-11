import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import qs from 'qs'
import {apiurl} from '../../variable/variable'
import {colors} from '../../variable/variable'

const MainSection = styled.section``;
const MainTitle = styled.h1``;
const Form = styled.form``;


export default function Login() {

  const [Filled, setFilled] = useState(false);
  const [Res, setRes] = useState(undefined);
  const [Log, setLog] = useState(false);

  // si user est deja connecté, alors affiche une page pour lui dire qu'il est deja connecté
  useEffect(() => {
    function checkLogin() {
      const user = window.localStorage.getItem("user");
      if (user) {
        setLog(true);
      }
    }
    checkLogin();
  }, [Log]);

  // si champ vide, desactive le bouton de connexion, sinon ça l'active
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
  e.preventDefault()

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const data = {
      email: email.value,
      password: password.value,
    };

    // const config = {
    //   headers: {
    //     "content-type": "application/x-www-form-urlencoded",
    //   },
    // };

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
        // assign la variable dans le local storage sous la clé "user"
        window.localStorage.setItem("user", JSON.stringify(user));
        setRes(res.data.message);
        window.location.assign("/compte");
      })
      .catch((err) => {
        setRes(err.message);
      });
  }

  return (
    <MainSection id="main">
      <MainTitle>
        Pensez à créer un compte si cela n'est pas déjà fait !
        <p> Connectez-vous pour profiter du site à 100% </p>
      </MainTitle>

      <Form>
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          placeholder="monemail@gmail.com"
          name="email"
          required
          onChange={() => checkValues()}
        />

        <label htmlFor="password">Mot de passe :</label>
        <input
          id="password"
          type="password"
          placeholder="monSuperMdp@54"
          name="password"
          required
          onChange={() => checkValues()}
        />

        <div>
          <button onClick={(e) => send(e)} disabled={!Filled}> Se connecter </button>
          <a href="/signup"> Créer un compte </a>
        </div>
      </Form>
    </MainSection>
  );
}
