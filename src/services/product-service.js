import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + 'gannay-eylon/product';

export const getProducts = async () => {
  try {
    const result = await axios.get(BASE_URL).catch((e) => {
      if (e) throw e;
    });
    return result?.data.length > 0 ? result.data : [];
  } catch (error) {
    console.error('Error Get Request', error);
    return [];
  }
};
