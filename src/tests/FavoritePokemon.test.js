import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';

// beforeEach(() => {
//   global.localStorage = jest.mock(window.localStorage);

//   jest.spyOn(window.localStorage, 'setItem').mockImplementation((nameObj, value) => { localStorage[nameObj] = value; });
//   jest.spyOn(window.localStorage, 'getItem').mockImplementation((nameObj) => localStorage[nameObj]);
// });
describe('Testando a página FavoritePokemon', () => {
  test('Testa se a mensagem "No favorite pokemon found" é exibida caso não tenha nenhum pokémon favoritado', () => {
    render(<FavoritePokemon />);

    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });
});
