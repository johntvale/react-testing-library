import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando componente Pokemon.js', () => {
  const PIKACHU_SPRITE = 'Pikachu sprite';
  test('Verifica se aparece um card com informações de um pokemon"', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText(PIKACHU_SPRITE);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeigth).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(pokemonImg).toBeInTheDocument();
  });

  test('Verifica se o card tem um link de navegação funcional', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/more details/i);

    userEvent.click(moreDetailsLink);
    const foundPath = history.location.pathname;
    expect(foundPath).toBe('/pokemons/25');
  });

  test('Verifica a imagem do pokemon atual', () => {
    renderWithRouter(<App />);
    const { image } = pokemons[0]; // img source
    const pokemonImg = screen.getByAltText(PIKACHU_SPRITE);

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('alt', PIKACHU_SPRITE);
    expect(pokemonImg).toHaveAttribute('src', image);
  });

  test('Verifica se existe um ícone de estrelas nos pokemons favoritos', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/more details/i);
    userEvent.click(moreDetailsLink);

    const checkButton = screen.getByRole('checkbox');
    userEvent.click(checkButton);

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
