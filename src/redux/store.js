import { configureStore } from '@reduxjs/toolkit';
import fruitsReducer from './features/fruits/fruitsSlice';

const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
  },
});

export default store;
