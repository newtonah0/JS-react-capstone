import {
  render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import FruitDetails from '../FruitDetails';
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
    name: 'Pear',
    id: '4',
    family: 'Rosaceae',
    nutritions: { calories: 57, fat: 0.1, sugar: 10 },
  },
];

describe('fruits details testing', () => {
  it('should render a list of fuits', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockFruits,
    });

    render(
      <Provider store={testStore}>
        <BrowserRouter>
          <FruitDetails />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => expect(screen.getByText('Strawberry')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Pear')).toBeInTheDocument());
  });
});
