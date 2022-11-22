import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando a App.js', () => {
  test('Testa se a aplicação contém um conjuto de links;', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    expect(nav.children).toHaveLength(3);

    const firstLink = nav.children[0];
    const secondLink = nav.children[1];
    const thirdLink = nav.children[2];

    expect(firstLink).toHaveAttribute('href', '/');
    expect(firstLink).toHaveTextContent('Home');

    expect(secondLink).toHaveAttribute('href', '/about');
    expect(secondLink).toHaveTextContent('About');

    expect(thirdLink).toHaveAttribute('href', '/favorites');
    expect(thirdLink).toHaveTextContent('Favorite Pokémon');
  });

  test('Testa se clicando no link Home é redirecionado para a página inical', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se clicando no link About é redirecionado para a página about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se clicando no link Favorite Pokémons é redirecionado para a página favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se entrando em uma URL desconhecida exibe a página de not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push({
        pathname: '/not-found',
      });
    });

    const titleNotFound = screen.getByRole('heading', {
      name: 'Page requested not found',
    });
    expect(titleNotFound).toBeInTheDocument();
  });
});
