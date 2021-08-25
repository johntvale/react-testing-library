import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testando componente FavoritePokemons.js', () => {
  test('Verifica se aparece na tela o texto: No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundText = screen.getByText(/No favorite pokemon found/i);

    expect(notFoundText).toBeInTheDocument();
  });

  test('Verifique se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const moreDetails = screen.getAllByText(/more details/i);

    const MORE_DETAILS_LINKS = 9;

    expect(moreDetails).toHaveLength(MORE_DETAILS_LINKS);
  });
});
