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
    const pikachuId = 25;
    const charmanderId = 4;
    const caterpieId = 10;
    const ekans = 23;
    const alakazam = 65;
    const mew = 151;
    const rapidash = 78;
    const snorlax = 143;
    const dragonair = 148;

    const pokemonsIds = [
      pikachuId,
      charmanderId,
      caterpieId,
      ekans,
      alakazam,
      mew,
      rapidash,
      snorlax,
      dragonair,
    ];

    const favoritePokemon = pokemons
      .filter((pokemon) => pokemonsIds.includes(pokemon.id));

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const moreDetails = screen.getAllByText(/more details/i);

    const NINE_POKEMONS = 9;

    expect(moreDetails).toHaveLength(NINE_POKEMONS);
  });
});
