import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

describe('Testando componente NotFound.js', () => {
  test('Verifica se aparece na tela o texto: No favorite pokemon found', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Verifica se a página contém uma imagem (gif)', () => {
    renderWithRouter(<NotFound />);
    const notFoundImage = screen.getByAltText(/pikachu crying/i);
    expect(notFoundImage)
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
