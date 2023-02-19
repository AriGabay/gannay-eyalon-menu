import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + 'gannay-eylon/eventDetails';

const KEY = 'event';
export const addToEvent = (dataToAdd) => {
  if (!Object.keys(dataToAdd).length) return;
  const data = sessionStorage.getItem(KEY);
  if (!data) {
    return buildEvent(dataToAdd);
  }
  let event = getEvent();
  if (Object.keys(event).length) {
    if (
      event[dataToAdd.categoryId] &&
      Object.keys(event[dataToAdd.categoryId])?.length > 0
    ) {
      event[dataToAdd.categoryId][dataToAdd.id] = {
        ...dataToAdd,
      };
    } else {
      event[dataToAdd.categoryId] = {};
      event[dataToAdd.categoryId][dataToAdd.id] = { ...dataToAdd };
    }
  } else {
    event[dataToAdd.categoryId] = {};
    event[dataToAdd.categoryId][dataToAdd.id] = { ...dataToAdd };
  }
  saveEvent(event);
  return event;
};
export const getProductIdsCart = () => {
  const event = getEvent();
  if (!Object.keys(event).length) return [];
  const productIdsCart = [];
  Object.keys(event).forEach((catagoryId) =>
    Object.keys(event[catagoryId]).forEach((productId) =>
      productIdsCart.push(Number(productId))
    )
  );
  return productIdsCart;
};

export const removeFromEvent = (product) => {
  const eventData = getEvent();
  delete eventData[product.categoryId][product.id];
  if (!Object.keys(eventData[product.categoryId]).length)
    delete eventData[product.categoryId];
  saveEvent(eventData);
  return { ...eventData };
};

const buildEvent = (dataToAdd) => {
  const hash = {};
  hash[dataToAdd.categoryId] = {};
  hash[dataToAdd.categoryId][dataToAdd.id] = { ...dataToAdd };
  sessionStorage.setItem(KEY, JSON.stringify({ ...hash }));
  return hash;
};
export const getEvent = () => {
  const data = sessionStorage.getItem(KEY);
  return JSON.parse(data);
};

const saveEvent = (dataEvent) => {
  sessionStorage.setItem(KEY, JSON.stringify(dataEvent));
};
export const countProducts = (eventData) => {
  let count = 0;
  if (!eventData || !Object.keys(eventData).length) return 0;
  Object.keys(eventData).forEach(
    (categoryId) => (count += Object.keys(eventData[categoryId]).length)
  );
  return count;
};
export const sendEvent = async (eventData) => {
  try {
    const eventDetails = getEvent();
    const eventInfoStr = sessionStorage.getItem('eventInfo');
    const hashTitleStr = sessionStorage.getItem('hashTitle');
    const eventInfo = JSON.parse(eventInfoStr);
    const hashTitle = JSON.parse(hashTitleStr);
    const res = await axios
      .post(
        BASE_URL,
        { eventDetails, ...eventData, eventInfo, hashTitle },
        {
          responseType: 'stream',
        }
      )
      .catch((error) => {
        throw error;
      });
    if (res.status === 200) {
      sessionStorage.clear();
    }
    return res;
  } catch (error) {
    console.error('error :', error);
  }
};
export const updateEvent = async (
  eventDetails,
  eventInfo,
  hashTitle,
  eventDetailsId
) => {
  try {
    const res = await axios
      .put(
        BASE_URL,
        { eventDetails, eventInfo, hashTitle, eventDetailsId },
        {
          responseType: 'stream',
        }
      )
      .catch((e) => {
        throw e;
      });
    return res;
  } catch (error) {
    console.error('error :', error);
  }
};
