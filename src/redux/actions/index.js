import axios from "axios";
import { GET_JOKES } from "../types";

export const getJokes =
  ({ err, done }) =>
  async (dispatch) => {
    dispatch({ type: GET_JOKES, payload: { isLoading: true, jokes: null } });
    try {
      const response = await axios.get(
        "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
      );
      dispatch({
        type: GET_JOKES,
        payload: { isLoading: false, jokes: response.data?.jokes },
      });

      done && done();
    } catch (error) {
      dispatch({
        type: GET_JOKES,
        payload: { isLoading: false, jokes: null },
      });

      err && err();
    }
  };
