import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

// Recebi ajuda do Thiago souza para auxiliar na resolução do projeto
// Reposiório do Thiago Souza: https://github.com/tryber/sd-013-b-project-react-testing-library/tree/thiagoSouza-react-testing/src/tests

describe('Testando componente App.js', () => {
  test('Verifica se o topo tem 3 links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getAllByRole('link')[0];
    const about = screen.getAllByRole('link')[1];
    const favorites = screen.getAllByRole('link')[2];

    expect(home).toBeInTheDocument();
    expect(home).toHaveTextContent('Home');
    expect(about).toBeInTheDocument();
    expect(about).toHaveTextContent('About');
    expect(favorites).toBeInTheDocument();
    expect(favorites).toHaveTextContent('Favorite Pokémons');
  });

  test('verifica se redireciona para a página Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getAllByRole('link')[0];
    userEvent.click(home);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('verifica se redireciona para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getAllByRole('link')[1];
    userEvent.click(about);
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  test('verifica se redireciona para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getAllByRole('link')[2];
    userEvent.click(favorites);
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  test('verifica se redireciona para a página Not Found ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rotaNaoEncontrada');
    const notFoundText = screen.getByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
