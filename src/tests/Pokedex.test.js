import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
// import userEvent from '@testing-library/user-event';

describe('Testando componente Pokedex.js', () => {
  test('Verifica se aparece na tela o texto: Encountered pokémons', () => {
    renderWithRouter(<App />);
    const EncounteredText = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(EncounteredText).toBeInTheDocument();
  });
});
