import axios from 'axios';
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + 'gannay-eylon/eventDetails/';
async function getGnEventsDetails(query = {}) {
  try {
    const res = await axios.get(BASE_URL + 'many/', query);
    return res.data;
  } catch (error) {
    console.error('error', error);
  }
}
export const gnEventDetails = {
  getGnEventsDetails,
};
