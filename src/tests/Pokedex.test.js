import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando componente Pokedex.js', () => {
  const POKEMON_NAME = 'pokemon-name';
  test('Verifica se aparece na tela o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const EncounteredText = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(EncounteredText).toBeInTheDocument();
  });

  test('Verifica se existe o botão "Próximo Pokemon"', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toHaveTextContent(/Próximo pokémon/);
  });

  test('testa se aparece outro pokemon quando clica no botão "Próximo Pokemon"', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.map((pokemon) => {
      userEvent.click(nextButton);
      const foundPokemon = screen.getByTestId(POKEMON_NAME, { name: pokemon.name });
      return expect(foundPokemon).toBeInTheDocument();
    });
  });

  test('Verifica se o próximo pokemon, após o último, é o primeiro da lista', () => {
    renderWithRouter(<App />);
    const FistAfterTheLast = (pokemons.length) + 1;
    console.log(FistAfterTheLast);

    const firstPokemon = screen.getByTestId(POKEMON_NAME);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    for (let index = 0; index < FistAfterTheLast; index += 1) {
      userEvent.click(nextButton);
    }

    const lastPokemon = screen.getByTestId(POKEMON_NAME);
    expect(lastPokemon).toBe(firstPokemon);
  });

  test('Verifica se aparece apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const secondPokemon = screen.getAllByTestId(POKEMON_NAME);
    expect(secondPokemon).toHaveLength(1);
  });

  test('Verifica se existe um botão para cada tipo de pokemon', () => {
    renderWithRouter(<App />);
    const DIFF_TYPES = 7;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(DIFF_TYPES);
  });

  test('Verifica se aparece um pokemon do filtro selecionado', () => {
    renderWithRouter(<App />);
    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(buttonDragon);
    const foundPokemon = screen.getByAltText(/dragonair sprite/i);
    expect(foundPokemon).toBeInTheDocument();
  });

  test('Verifica se o texto do botão corresponde ao tipo', () => {
    renderWithRouter(<App />);
    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(buttonDragon);
    const foundPokemon = screen.getByTestId('pokemon-type', { name: /dragon/i });
    expect(foundPokemon).toBeInTheDocument();
  });

  test('Verifica se existe um botão para limpar o filtro, botão All', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });
});
