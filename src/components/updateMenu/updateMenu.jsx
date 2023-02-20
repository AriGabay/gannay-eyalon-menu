import React, { useEffect, useRef, useState } from 'react';
import { gnEventDetails } from '../../services/event-details';
import { InputLabel } from '../inputLabel/inputLabel';
import { getProducts } from '../../services/product-service';
import Select from 'react-select';
import { updateEvent } from '../../services/cart-service';
import SignatureCanvas from 'react-signature-canvas';
import './updateMenu.css';

export const UpdateMenu = () => {
  const [eventsDetails, setEventsDetails] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(-1);
  const [eventInfo, setEventInfo] = useState({});
  const [eventDetails, setEventDetails] = useState({});
  const [hashTitle, setHashTitle] = useState({});
  const [page, setPage] = useState(0);
  const [productsReq, setProductsReq] = useState([]);
  const [selectNewProduct, setSelectNewProduct] = useState({});
  let signCanvas = useRef(null);

  useEffect(() => {
    const getEventsDetails = async () => {
      const eventsDetails = await gnEventDetails.getGnEventsDetails();
      setEventsDetails([...eventsDetails]);
      const { productsReq } = await getProducts();
      setProductsReq(productsReq);
    };

    getEventsDetails();
  }, []);

  useEffect(() => {
    if (selectedEventId > -1) {
      const eventSelected = eventsDetails.filter(
        (eventsDetails) => Number(eventsDetails.id) === Number(selectedEventId)
      );
      if (!Object.keys(eventSelected[0]).length) return;
      const localEventInfo = JSON.parse(eventSelected[0].eventInfo);
      const localHashTitle = JSON.parse(eventSelected[0].hashTitle);
      Object.keys(localHashTitle).forEach((title) => {
        if (!localEventInfo[title]) {
          localEventInfo[title] = '';
        }
      });
      setEventInfo(localEventInfo);
      setHashTitle(localHashTitle);
      setEventDetails(JSON.parse(eventSelected[0].eventDetails));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventId]);
  useEffect(() => {
    if (eventInfo?.sign) {
      signCanvas.current.fromDataURL(eventInfo.sign, {
        width: 250,
        height: 150,
      });
    }
  }, [eventInfo]);
  const handelChange = ({ target }) => {
    const { name, value } = target;
    eventInfo[name] = value;
  };
  const handelChangeProduct = ({ target }, productId) => {
    const { name, value } = target;
    Object.keys(eventDetails).forEach((categoryId) => {
      if (
        eventDetails &&
        eventDetails[categoryId] &&
        eventDetails[categoryId][productId] &&
        Object.keys(eventDetails).length &&
        Object.keys(eventDetails[categoryId]).length &&
        Object.keys(eventDetails[categoryId][productId]).length
      ) {
        eventDetails[categoryId][productId][name] = value;
      }
    });
    setEventDetails({ ...eventDetails });
  };

  const removeProduct = (id) => {
    Object.keys(eventDetails).forEach((categoryId) => {
      if (
        eventDetails &&
        eventDetails[categoryId] &&
        eventDetails[categoryId][id] &&
        Object.keys(eventDetails).length &&
        Object.keys(eventDetails[categoryId]).length &&
        Object.keys(eventDetails[categoryId][id]).length
      ) {
        const { [id]: _, ...newData } = eventDetails[categoryId];
        eventDetails[categoryId] = { ...newData };
      }
    });
    setEventDetails({ ...eventDetails });
  };
  const handelSelect = () => {
    const { value } = selectNewProduct;
    const product = JSON.parse(value);
    product.comment = '';
    if (
      eventDetails &&
      eventDetails[product.categoryId] &&
      Object.keys(eventDetails[product.categoryId]).length
    ) {
      eventDetails[product.categoryId][product.id] = { ...product };
    } else {
      eventDetails[product.categoryId] = {};
      eventDetails[product.categoryId][product.id] = { ...product };
    }
    setEventDetails({ ...eventDetails });
  };
  const updateMenu = async () => {
    await updateEvent(eventDetails, eventInfo, hashTitle, selectedEventId);
  };
  return page === 0 ? (
    <div>
      <h2>עריכה</h2>
      {eventsDetails.length && (
        <div>
          <Select
            onChange={(val) => setSelectedEventId(val.value)}
            options={eventsDetails.map((item) => ({
              value: item.id,
              label: `${item.eventDate} - אירוע מספר ${item.id}`,
            }))}
            styles={{
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: 'black',
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                minWidth: '20rem',
              }),
              container: (baseStyles, state) => ({
                ...baseStyles,
                minWidth: '20rem',
              }),
            }}
          ></Select>
          {eventInfo &&
            Object.keys(eventInfo).length > 0 &&
            Object.keys(eventInfo).map((item) => {
              if (item === 'sign') {
                return (
                  <div className="flex-container">
                    <div className="title-sign">
                      <label className="label-input">חתימה :</label>
                      <button
                        onClick={() => {
                          signCanvas.current.clear();
                          eventInfo.sign = '';
                        }}
                      >
                        נקוי
                      </button>
                    </div>
                    <SignatureCanvas
                      canvasProps={{
                        width: 250,
                        height: 150,
                        className: 'signCanvas',
                        style: { background: 'white', borderRadius: '20px' },
                      }}
                      ref={signCanvas}
                      onEnd={(event) => {
                        eventInfo.sign = event.target.toDataURL();
                      }}
                    />
                  </div>
                );
              }
              return (
                <div key={item} className="flex-container">
                  <InputLabel
                    labelText={hashTitle[item] ? hashTitle[item] : item}
                    onChange={handelChange}
                    valueInput={eventInfo}
                    inputId={item}
                  />
                </div>
              );
            })}
          <button className="next-btn" onClick={() => setPage(1)}>
            עמוד הבא
          </button>
        </div>
      )}
    </div>
  ) : (
    <div>
      {eventDetails &&
        Object.keys(eventDetails).length > 0 &&
        Object.keys(eventDetails).map((categoryId) => {
          return Object.keys(eventDetails[categoryId]).map((productId) => {
            const product = eventDetails[categoryId][productId];
            return (
              <div className="product-container">
                <h2>{product.productName}</h2>
                {product && (product.comment || product.comment === '') ? (
                  <React.Fragment>
                    <label
                      style={{ marginBottom: '20px' }}
                      htmlFor={`update-product-comment-${productId}`}
                    >
                      הערות :
                    </label>
                    <textarea
                      id={`update-product-comment-${productId}`}
                      name="comment"
                      onChange={(event) =>
                        handelChangeProduct(event, productId)
                      }
                      defaultValue={product.comment}
                    />
                  </React.Fragment>
                ) : (
                  ''
                )}
                {product.autoAdd === false ? (
                  <h3>נוסף ידני</h3>
                ) : (
                  <h3>נוסף אוטומטי</h3>
                )}
                <button onClick={() => removeProduct(productId)}>מחק</button>
              </div>
            );
          });
        })}
      <div className="add-product-container">
        <h1>הוספת פריטים</h1>
        <Select
          styles={{
            option: (baseStyles, state) => ({
              ...baseStyles,
              color: 'black',
              minWidth: '150px',
            }),
            container: (baseStyles, state) => ({
              ...baseStyles,
              minWidth: '150px',
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              maxHeight: '8rem',
              overflow: 'hidden',
            }),
          }}
          options={productsReq.map((product) => ({
            value: JSON.stringify(product),
            label: product.productName,
          }))}
          onChange={setSelectNewProduct}
        ></Select>
        <button onClick={handelSelect}>הוספת פריט</button>
      </div>
      <div className="add-product-container">
        <button onClick={() => setPage(0)}>הקודם</button>
        <button onClick={() => updateMenu()}>שלח</button>
      </div>
    </div>
  );
};
