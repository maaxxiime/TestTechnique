import React from 'react'
import styled from 'styled-components'
import {colors} from '../../variable/variable'
export default function Error() {
  return (
    <div>
      <h1>Oups.... il semblerait que vous êtes sur une page qui n'existe pas</h1>
      <h2>Cliquez <a href="/">ici</a> si vous voulez revenir à l'accueil</h2>
    </div>
  )
}
