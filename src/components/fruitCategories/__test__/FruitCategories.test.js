import {
  render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import FruitCategories from '../FruitCategories';
import fruitsReducer from '../../../redux/features/fruits/fruitsSlice';

const testStore = configureStore({
  reducer: {
    fruits: fruitsReducer,
  },
});

const mockFruits = [
  {
    name: 'Strawberry',
    id: '3',
    family: 'Rosaceae',
    nutritions: { calories: 29, fat: 0.4, sugar: 5.4 },
  },
  {
    name: 'Banana',
    id: '1',
    family: 'Musaceae',
    nutritions: { calories: 96, fat: 0.2, sugar: 17 },
  },
];

describe('fruits categories testing', () => {
  it('should render a list of fuit categories', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockFruits,
    });

    render(
      <Provider store={testStore}>
        <BrowserRouter>
          <FruitCategories />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText('Rosaceae')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Musaceae')).toBeInTheDocument());
  });
});
