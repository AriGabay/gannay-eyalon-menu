import axios from 'axios';

const BASE_URL = 'http://localhost:3030/api/gannay-eylon/category';

export const getCategoriesRequest = async () => {
  try {
    const result = await axios.get(BASE_URL).catch((e) => {
      if (e) throw e;
    });
    return result?.data.length ? result?.data : [];
  } catch (error) {
    console.error('Error Get Request', error);
    return [];
  }
};
