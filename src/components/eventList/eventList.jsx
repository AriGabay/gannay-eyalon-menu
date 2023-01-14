import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../menu/menu.css';
import RemoveBtn from '../removeBtn/removeBtn';
import { removeFromEvent } from '../../services/cart-service';

export default function EventList() {
  const eventData = useSelector((state) => state.eventData);
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const copy = {};
    Object.keys(eventData).forEach((categoryId) => {
      if (!Object.keys(eventData[categoryId]).length) {
        delete eventData[categoryId];
        return;
      }
      Object.keys(eventData[categoryId]).forEach((productId) => {
        copy[productId] = { ...eventData[categoryId][productId] };
        setProducts({ ...copy });
      });
    });
  }, [eventData]);

  const removeBtn = (product) => {
    const eventDataNew = removeFromEvent(product);
    dispatch({ type: 'SET_EVENT_DATA', payload: { ...eventDataNew } });
    const newProducts = {};
    Object.keys(products).forEach((key) => {
      if (products[key]?.id !== product.id)
        newProducts[products[key].id] = { ...products[key] };
    });
    setProducts({ ...newProducts });
  };

  return (
    <div className="event-list" style={{ color: '#f5efdf' }}>
      <h1>פריטים שנוספו לאירוע</h1>
      {Object.keys(products).length ? (
        <div className="menu">
          {Object.keys(products).map((product) => (
            <div style={{ maxWidth: '270px' }} key={products[product].id}>
              <div className="product">
                <div className="product-name">
                  {products[product].productName}
                </div>
                <div className="product-description">
                  {products[product].description}
                </div>
                <div className="product-img-container">
                  <img
                    className="product-img"
                    src={`${products[product]?.imgUrl}`}
                    alt={`${products[product].productName}`}
                  />
                </div>
              </div>
              <RemoveBtn onClick={() => removeBtn(products[product])} />
            </div>
          ))}
        </div>
      ) : (
        <h3 style={{ margin: '0 auto' }}>לא נוספו מוצרים</h3>
      )}
    </div>
  );
}
