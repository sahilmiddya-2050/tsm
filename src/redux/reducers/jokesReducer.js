import { GET_JOKES } from "../types";

const INITIAL_STATE = {
  isLoading: false,
  jokes: null,
};

export const jokesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_JOKES: {
      return {
        isLoading: action.payload.isLoading,
        jokes: action.payload.jokes,
      };
    }

    default: {
      return state;
    }
  }
};
