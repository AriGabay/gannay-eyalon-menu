import axios from 'axios';

const BASE_URL = 'http://localhost:3030/api/gannay-eylon/';
// const BASE_URL = 'https://api.c-g1.com/api/gannay-eylon/';
export const getProducts = async () => {
  try {
    const result = await axios.get(BASE_URL + 'product').catch((e) => {
      if (e) throw e;
    });
    return result?.data.length > 0 ? result.data : [];
  } catch (error) {
    console.error('Error Get Request', error);
    return [];
  }
};
