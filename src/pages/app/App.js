import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
//
import narutoImg from './../../images/naruto.png'
import jutsoSound from '../../sounds/jutso.mp3'
import { Quotes } from './../../components/quotes'
import { getQuote } from '../../services'

const audio = new Audio(jutsoSound)

export function App() {
  let isMounted = useRef(true)

  const [quoteState, setQuoteState] = useState({
    quote: 'loading quote...',
    speaker: 'loading Speaker...'
  })

  const onUpdate = async () => {
    const resQuote = await getQuote()

    if (isMounted.current) {
      setQuoteState(resQuote)
      audio.play()
    }
  }

  useEffect(() => {
    onUpdate()

    return () => {
      isMounted.current = false
    }
  }, [])

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

