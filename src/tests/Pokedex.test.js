import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const confirmPokemon = ({ name, type, averageWeight }) => {
  expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
  expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
  expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(`${averageWeight.value} ${averageWeight.measurementUnit}`);
};

describe('Testando o pokedex', () => {
  test('Testa se tem um h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', {
      name: 'Encountered Pokémon', level: 2 })).toBeInTheDocument();
  });

  test('Testa se é exibido o pŕoximo Pokémon da lista quando aperta o botão de Pŕoximo Pokémon', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', {
      name: 'Próximo Pokémon',
    });

    pokemonList.forEach((poke) => {
      confirmPokemon(poke);
      userEvent.click(buttonNext);
    });

    confirmPokemon(pokemonList[0]);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: 'Próximo Pokémon',
    });

    pokemonList.forEach((poke) => {
      confirmPokemon(poke);
      userEvent.click(buttonNext);
    });

    const allFilteredButtons = screen.getAllByTestId('pokemon-type-button');

    const pokemonTypes = [...new Set(pokemonList
      .reduce((types, { type }) => [...types, type], []))];

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });

    pokemonTypes.forEach((type, index) => {
      expect(buttonAll).toBeInTheDocument();
      expect(allFilteredButtons[index]).toHaveTextContent(type);
      // userEvent.click(allFilteredButtons[index]);

      // const pokemonToBeInTheDocument = pokemonList.find((poke) => poke.type === type);

      // confirmPokemon(pokemonToBeInTheDocument);
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
