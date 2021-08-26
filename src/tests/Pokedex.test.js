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

  test('Verifica se os pokemon mudam conforme o filtro selecionado', () => {
    renderWithRouter(<App />);
    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(buttonDragon);
    const dragonair = screen.getByAltText(/dragonair sprite/i);
    expect(dragonair).toBeInTheDocument();
    const buttonAll = screen.getByRole('button', { name: /All/i });

    // retira o filtro, volta para o primeiro pokemon da lista
    userEvent.click(buttonAll);
    const pikachu = screen.getByAltText(/pikachu sprite/i);
    expect(pikachu).toBeInTheDocument();
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
    const maxImg = 1;
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    // máximo de um pokemon por tela
    const foundPokemon = screen.getAllByRole('img');
    expect(foundPokemon).toHaveLength(maxImg);
  });

  test('Verifica se botão All está sempre visível', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(buttonElectric);
    expect(buttonAll).toBeInTheDocument();
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFire);
    expect(buttonAll).toBeInTheDocument();
    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(buttonBug);
    expect(buttonAll).toBeInTheDocument();
    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    userEvent.click(buttonPoison);
    expect(buttonAll).toBeInTheDocument();
    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(buttonPsychic);
    expect(buttonAll).toBeInTheDocument();
    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    userEvent.click(buttonNormal);
    expect(buttonAll).toBeInTheDocument();
    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    userEvent.click(buttonDragon);
    expect(buttonAll).toBeInTheDocument();
  });
});
