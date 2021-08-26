import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando componente PokemonDetails.js', () => {
  const caterpie = pokemons[2].name;
  test('Teste se as informações do Pokemon são mostradas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);

    const detailsTitle = screen.getByRole('heading', {
      level: 2, name: /pikachu details/i });

    expect(detailsTitle).toBeInTheDocument();

    // Não deve existir link para detalhes dentro da página detalhes
    expect(moreDetails).not.toBeInTheDocument();

    // Na seção Detalhes deve haver um H2 "Summary"
    const summary = screen.getByRole('heading', {
      level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();

    // A seção de detalhes deve um resumo do Pokémon específico.
    const pokemonSummary = screen.getByText(/electricity/i);
    expect(pokemonSummary).toBeInTheDocument();
  });

  test('Na seção Detalhes deve haver um H2 "Locations".', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');

    const locationTitle = screen.getByRole('heading', {
      level: 2, name: `Game Locations of ${caterpie}` });
    expect(locationTitle).toBeInTheDocument();

    // Na seção Detalhes deve haver todas as Locations do pokemon
    const CaterpieLocationlength = pokemons[2].foundAt.length;

    const locationImages = screen.getAllByRole('img', { name: /caterpie location/i });
    expect(locationImages).toHaveLength(CaterpieLocationlength);

    // A imagem deve ter um atributo SRC com a URL da localização
    const location1 = pokemons[2].foundAt[0].map;
    const location2 = pokemons[2].foundAt[1].map;
    const location3 = pokemons[2].foundAt[2].map;
    const location4 = pokemons[2].foundAt[3].map;

    expect(locationImages[0]).toHaveAttribute('src', location1);
    expect(locationImages[1]).toHaveAttribute('src', location2);
    expect(locationImages[2]).toHaveAttribute('src', location3);
    expect(locationImages[3]).toHaveAttribute('src', location4);

    // A imagem deve ter um atributo ALT: "<nome do pokemon> location"
    expect(locationImages[0]).toHaveAttribute('alt', `${caterpie} location`);
    expect(locationImages[1]).toHaveAttribute('alt', `${caterpie} location`);
    expect(locationImages[2]).toHaveAttribute('alt', `${caterpie} location`);
    expect(locationImages[3]).toHaveAttribute('alt', `${caterpie} location`);

    // A página deve conter um checkbox que permite favoritar o pokemon
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
  });
});
