import { ADD_USER } from "./actions";

const initialState = {
  products: [],
  categories: [],
  currentCategory: "",
  cart: [],
  cartOpen: false,
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        user: [...state.user, action.payload]
      }
    }
    default:
      return state;
  }
};

export default reducers;
