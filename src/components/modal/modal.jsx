import './modal.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBtn from '../addBtn/addBtn';
import { addToEvent } from '../../services/cart-service';
import { ImageCloud } from '../ImageCloud/ImageCloud';

export default function Modal() {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state);
  const closeModal = () =>
    dispatch({ type: 'SET_MODAL_IS_OPEN', payload: false });
  const addToEventBtn = () => {
    const eventData = addToEvent(selected);
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
              <ImageCloud
                alt={selected.productName}
                ClassName="img-selected"
                imageId={selected.imgUrl}
              />
            </div>
            <div className="description-seleted">{selected.description}</div>
            <div className="category-name">{selected.productName}</div>
            <div className="add-btn">
              {!(selected.autoAdd === true) && (
                <AddBtn onClick={() => addToEventBtn()} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
