import React from 'react'
import styled from 'styled-components'
import {colors} from '../../variable/variable'

const Section = styled.section`
display: flex;
align-items: center;
justify-content: center;
`

export default function Home() {
  return (
    <Section>
      Bienvenue sur le site de Deadline BTP
    </Section>
  )
}
