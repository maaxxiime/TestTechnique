import React from 'react'
import styled from 'styled-components'
import {colors} from '../../variable/variable'

const MainSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;

h1 {
  margin-top: 10%;
}

a {
  text-decoration: none;
  color: ${colors['background-navbar']};
}

`


export default function Error() {
  return (
    <MainSection>
      <h1>Oups.... il semblerait que vous êtes sur une page qui n'existe pas</h1>
      <h2>Cliquez <a href="/">ici</a> pour revenir à l'accueil</h2>
    </MainSection>
  )
}
