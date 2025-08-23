import { configureStore } from '@reduxjs/toolkit';
import playgroundReducer from './playgroundSlice';

const store = configureStore({
  reducer: {
    playground: playgroundReducer,
  },
});

export default store;
