import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import { Pokemon } from '../components';

const confirmPokemon = ({ name, type, averageWeight, image }) => {
  expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);

  expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);

  expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);

  const imageScreen = screen.getByAltText(`${name} sprite`);
  expect(imageScreen).toBeInTheDocument();
  expect(imageScreen.src).toBe(image);
};

describe('Name of the group', () => {
  test('Testa se é renderizado um card com as informações de um determiado pokemon', () => {
    renderWithRouter(<App />);

    confirmPokemon(pokemonList[0]);
  });

  test('Testa se o card contém um link de navegação para exibir os detalhes do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });

    expect(moreDetailsLink.href).toContain(`/pokemon/${pokemonList[0].id}`);
  });

  test('Verifica se ao clicar no link more deatils o redirecionamento ocorre', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemon/${pokemonList[0].id}`);
  });

  test('Verifica se o ícone é exibido quando um pokemon é favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);

    const starIcon = screen.getByAltText(`${pokemonList[0].name} is marked as favorite`);

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
