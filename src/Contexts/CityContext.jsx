import { createContext, useContext, useEffect, useReducer } from "react";
/*eslint-disable react/prop-types */

const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,  // Added to handle error state
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;  // Adding default case to handle unexpected action types
  }
}

function CitiesProvider({ children }) {
  const BASE_URL = "http://localhost:9000";

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Error While Fetching Data" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {

    if(Number(id) ===currentCity.id) return
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error While Fetching Data" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",  // Fixed typo here
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error While Creating Data" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Error While Deleting Data" });
    }
  }

  return (
    <CityContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity, error }}>
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined) throw new Error("CityContext was used outside the CityProvider");
  return context;
}

export { CitiesProvider, useCities };
