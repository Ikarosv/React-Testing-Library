import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testa o componente not found', () => {
  test('Testa se contém um h2 com o texto "Page requested not found".', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  test('TEsta se a imagem que aparece está correta', () => {
    render(<NotFound />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
