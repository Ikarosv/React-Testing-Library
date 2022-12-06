import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

const toDetails = () => {
  const { history } = renderWithRouter(<App />);
  const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkMoreDetails);

  expect(history.location.pathname).toBe(`/pokemon/${pokemonList[0].id}`);

  expect(linkMoreDetails).not.toBeInTheDocument();
};

const verifyIfIsInTheDocument = (...components) => {
  components.forEach((component) => {
    expect(component).toBeInTheDocument();
  });
};

describe('Testando pokemon details', () => {
  test('Testa se o nome do pokemon, o title e o sumario são exibidos na tela', () => {
    toDetails();
    const pokemonName = screen.getByText(`${pokemonList[0].name} Details`);
    const title = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const summaryText = screen.getByText(pokemonList[0].summary);
    verifyIfIsInTheDocument(pokemonName, title, summaryText);
  });
  test('Testa se existe uma seção com os mapas', () => {
    toDetails();
    const locationTitle = screen.getByRole('heading', {
      name: `Game Locations of ${pokemonList[0].name}`,
      level: 2,
    });
    const firstFound = screen.getByText(pokemonList[0].foundAt[0].location);
    const secondFound = screen.getByText(pokemonList[0].foundAt[1].location);
    const pokemonImg = screen.getAllByRole('img');
    const pokemonName = screen.getByRole('heading', {
      name: `${pokemonList[0].name} Details`,
    });
    const shoulBeInTheDocument = [pokemonImg[1], pokemonImg[2], locationTitle,
      firstFound, secondFound, pokemonName];
    verifyIfIsInTheDocument(...shoulBeInTheDocument);
    expect(pokemonImg[1].src).toBe(pokemonList[0].foundAt[0].map);
    expect(pokemonImg[1].alt).toBe(`${pokemonList[0].name} location`);
    expect(pokemonImg[2].src).toBe(pokemonList[0].foundAt[1].map);
    expect(pokemonImg[2].alt).toBe(`${pokemonList[0].name} location`);
  });
  it('Testa se o usuário pode favoritar um pokemon', () => {
    toDetails();
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    verifyIfIsInTheDocument(checkbox);
    userEvent.click(checkbox);
    const starImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    verifyIfIsInTheDocument(checkbox, starImg);
    userEvent.click(checkbox);
    expect(starImg).not.toBeInTheDocument();
  });
});
