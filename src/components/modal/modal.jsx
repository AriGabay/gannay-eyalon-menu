import './modal.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBtn from '../addBtn/addBtn';
import { addToEvent, countProducts } from '../../services/cart-service';

export default function Modal() {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state);
  const closeModal = () =>
    dispatch({ type: 'SET_MODAL_IS_OPEN', payload: false });
  const addToEventBtn = () => {
    const eventData = addToEvent(selected);
    // const count = countProducts();
    // dispatch({ type: 'SET_PRODUCTS_COUNT', payload: count });
    dispatch({ type: 'SET_EVENT_DATA', payload: { ...eventData } });
    setTimeout(() => closeModal(), 1000);
  };
  return (
    <div className="modal">
      <div className="exit-btn">
        <button onClick={() => closeModal()}>X</button>
      </div>
      <div className="modal-contant">
        {Object.keys(selected).length > 0 && (
          <div className="selected">
            <div className="image-selected">
              <img
                className="img-selected"
                alt={selected.productName}
                src={selected.imgUrl}
              />
            </div>
            <div className="description-seleted">{selected.description}</div>
            <div className="category-name">{selected.productName}</div>
            <div className="add-btn">
              <AddBtn onClick={() => addToEventBtn()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
