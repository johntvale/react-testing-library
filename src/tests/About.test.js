import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';

describe('Teste o componente About', () => {
  test('Verifica se a página contém um H2', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos', () => {
    renderWithRouter(<About />);
    const TWO = 2;
    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph).toHaveLength(TWO);
  });
  test('Verifica se a página contém uma imagem', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
