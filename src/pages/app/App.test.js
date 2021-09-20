import { render, screen, fireEvent } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
//
import { App } from './App'

const response = { speaker: 'Speaker', quote: 'test quote' }

const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, context) => {
      return res(context.json(response))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders the app with a button, a quote and a button', () => {
  render(<App />)

  const buttonElement = screen.getByRole('button')
  const imageElement = screen.getByRole('img')
  const textElement = screen.getByText(/Speaker/i)

  expect(buttonElement).toBeInTheDocument()
  expect(imageElement).toBeInTheDocument()
  expect(textElement).toBeInTheDocument()
})

test('calls api on button click and update its text', async () => {
  render(<App />)

  const buttonElement = screen.getByRole('button')
  fireEvent.click(buttonElement)

  const quoteElement = await screen.findByText(response.quote)

  expect(quoteElement).toBeInTheDocument()
})