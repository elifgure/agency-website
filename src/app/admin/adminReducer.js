export const initialState = {
    isLoggedIn: false,
    loading: true,
    email: "",
    password: "",
    activeTab: "projects",
    items: [],
    isModalOpen: false,
    editingId: null,
    formData: {},
}
export function adminReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_FORM_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };

    case "SET_FORM_DATA":
      return {
        ...state,
        formData: action.payload,
      };

    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };

    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        editingId: null,
        formData: {},
      };

    case "SET_EDITING_ID":
      return {
        ...state,
        editingId: action.payload,
      };

    default:
      return state;
  }
}