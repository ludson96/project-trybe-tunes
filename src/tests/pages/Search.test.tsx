import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Search from '../../pages/Search';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';

vi.mock('../../services/searchAlbumsAPI');

describe('Search Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and button correctly', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByTestId('search-artist-input');
    const button = screen.getByTestId('search-artist-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Queen' } });
    expect(button).not.toBeDisabled();
  });

  it('searches albums and displays results via iTunes API mock', async () => {
    vi.mocked(searchAlbumsAPI).mockResolvedValue([
      {
        artistId: 1,
        artistName: 'Queen',
        collectionId: 10,
        collectionName: 'A Night at the Opera',
        artworkUrl100: 'https://example.com/cover.jpg',
      },
    ]);

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByTestId('search-artist-input');
    const button = screen.getByTestId('search-artist-button');

    fireEvent.change(input, { target: { value: 'Queen' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Resultado de álbuns de: Queen')).toBeInTheDocument();
      expect(screen.getByText('A Night at the Opera')).toBeInTheDocument();
      expect(screen.getByTestId('link-to-album-10')).toBeInTheDocument();
    });
  });
});
