export const initialStore = () => {
  return {
    message: null,

    token: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "set_token":
      return {
        ...store,
        token: action.payload,
      };
    default:
      console.warn("Acción desconocida en storeReducer:", action);
      return state;
  }
}
