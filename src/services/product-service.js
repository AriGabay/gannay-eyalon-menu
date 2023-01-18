import axios from 'axios';
import { addToEvent } from './cart-service';

const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + 'gannay-eylon/product';

export const getProducts = async () => {
  try {
    const result = await axios.get(BASE_URL).catch((e) => {
      if (e) throw e;
    });
    let eventData = {};
    result.data.forEach((product) => {
      if (product.autoAdd === true) {
        eventData = addToEvent(product);
      }
    });
    return result?.data.length > 0
      ? { productsReq: result.data, eventData }
      : [];
  } catch (error) {
    console.error('Error Get Request', error);
    return [];
  }
};
