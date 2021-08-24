import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';

describe('Teste o componente About', () => {
  test('Testa se a página contém um H2', () => {
    renderWithRouter(<About />);
    const titulo = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(titulo).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos', () => {
    renderWithRouter(<About />);
    const num = 2;
    const paragrafos = screen.getAllByText(/Pokémons/i);
    expect(paragrafos).toHaveLength(num);
  });
  test('Testa se a página contém uma imagem', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
