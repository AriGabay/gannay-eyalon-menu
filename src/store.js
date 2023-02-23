import { countProducts } from './services/cart-service';
const initialState = {
  products: [],
  productIdsCart: [],
  selected: {},
  menuType: null,
  categories: [],
  category: {},
  modalIsOpen: false,
  eventData: {},
  productsCount: 0,
  eventInfo: {},
  countProductsByCategory: {},
};
const rootReducer = (state = initialState, action) => {
  switch (action?.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_SELECTED':
      return { ...state, selected: action.payload };
    case 'SET_MENU_TYPE':
      return { ...state, menuType: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_MODAL_IS_OPEN':
      return { ...state, modalIsOpen: action.payload };
    case 'SET_PRODUCT_IDS_CART':
      return {
        ...state,
        productIdsCart: [...action.payload],
      };
    case 'SET_PRODUCTS_COUNT':
      return {
        ...state,
        productsCount: action.payload,
      };
    case 'SET_EVENT_DATA':
      const count = countProducts(action.payload);
      return { ...state, eventData: action.payload, productsCount: count };
    case 'SET_EVENT_INFO':
      return { ...state, eventInfo: action.payload };
    case 'SET_COUNT_PRODUCTS_BY_CATEGORY':
      return { ...state, countProductsByCategory: action.payload };
    case 'REMOVE_PRODUCT_EVENT_DATA':
      const { product } = action.payload;
      delete state.eventData[product.categoryId][product.id];
      if (!Object.keys(state.eventData[product.categoryId]).length) {
        delete state.eventData[product.categoryId];
      }
      return {
        ...state,
        eventData: { ...state.eventData },
        productsCount: --state.productsCount,
      };

    default:
      return state;
  }
};

export default rootReducer;
