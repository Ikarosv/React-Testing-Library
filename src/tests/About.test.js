import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testando o component About', () => {
  test('Testa se a página contém informações sobre a Pokédex', () => {
    render(<About />);

    expect(screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    })).toBeInTheDocument();
  });

  test('Testa se a página contém 2 parágrafos com texto sobe a Pokédex', () => {
    render(<About />);
    expect(screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon')).toBeInTheDocument();

    expect(screen.getByText('One can filter Pokémon by type, and see more details for each one of them')).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem com a src correta', () => {
    render(<About />);

    const image = screen.getByAltText('Pokédex');

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
