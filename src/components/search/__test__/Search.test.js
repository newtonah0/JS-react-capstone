import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Search from '../Search';
import fruitsReducer from '../../../redux/features/fruits/fruitsSlice';

const testStore = configureStore({
  reducer: {
    fruits: fruitsReducer,
  },
});

describe('search testing', () => {
  it('should show a search icon in the document', () => {
    render(
      <Provider store={testStore}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByTestId('search-btn')).toBeInTheDocument();
  });

  it('should be visible in the document', () => {
    render(
      <Provider store={testStore}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByTestId('search-btn')).toBeVisible();
  });

  it('should show the search bar when search icon is clicked', () => {
    render(
      <Provider store={testStore}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );

    const btnElement = screen.getByTestId('search-btn');
    fireEvent.click(btnElement);
    const searchBar = screen.getByTestId('search-box');
    expect(searchBar).toBeInTheDocument();
  });
});
