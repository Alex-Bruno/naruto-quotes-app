import { useState } from 'react'
import styled from 'styled-components'
//
import narutoImg from './../../images/naruto.png'
import { Quotes } from './../../components/quotes'
import { getQuote } from '../../services'

export function App() {
  const [quoteState, setQuoteState] = useState({ quote: 'ok', speaker: 'Speaker' })

  const onUpdate = async () => {
    const quote = await getQuote()

    setQuoteState(quote)
  }

  return (
    <Content>
      <Quotes
        {...quoteState}
        onUpdate={onUpdate}
      />
      <NarutoImg src={narutoImg} alt="Naruto with a kunai" />
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  height: 100vh;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
`;

const NarutoImg = styled.img`
  max-width: 50vw;
  align-self: flex-end;
`;
