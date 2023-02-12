import '../eventList/eventList.css';
import './modal.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBtn from '../addBtn/addBtn';
import {
  addToEvent,
  getProductIdsCart,
  removeFromEvent,
} from '../../services/cart-service';
import { ImageCloud } from '../ImageCloud/ImageCloud';
import { toast } from 'react-toastify';
import RemoveBtn from '../removeBtn/removeBtn';

export default function Modal() {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state);

  const closeModal = () =>
    dispatch({ type: 'SET_MODAL_IS_OPEN', payload: false });

  const addToEventBtn = () => {
    const event = addToEvent(selected);
    const productIdsCart = getProductIdsCart();
    dispatch({ type: 'SET_EVENT_DATA', payload: { ...event } });
    dispatch({ type: 'SET_PRODUCT_IDS_CART', payload: [...productIdsCart] });
    setTimeout(() => closeModal(), 1000);
    toast.success('נוסף לאירוע');
  };
  const inputComment = {};
  const handelChange = ({ target }) => {
    const { name, value } = target;
    inputComment[name] = value;
  };
  const updateSelectedComment = () => {
    dispatch({
      type: 'SET_SELECTED',
      payload: { ...selected, ...inputComment },
    });
  };
  const removeBtn = (product) => {
    const eventDataNew = removeFromEvent(product);
    dispatch({ type: 'SET_EVENT_DATA', payload: { ...eventDataNew } });
    toast.success('הוסר מהאירוע');
    const productIdsCart = getProductIdsCart();
    dispatch({ type: 'SET_PRODUCT_IDS_CART', payload: [...productIdsCart] });
    setTimeout(() => closeModal(), 1000);
  };
  return (
    <div className="backgroud-modal">
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
                {!(selected.autoAdd === true) ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <label htmlFor="comments-selected-input">הערות</label>
                    <textarea
                      id="comments-selected-input"
                      className="input-area"
                      title="הערות"
                      name="comment"
                      onBlur={() => updateSelectedComment()}
                      onChange={(event) => handelChange(event)}
                      style={{ marginBottom: '20px' }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '100%',
                      }}
                    >
                      <RemoveBtn onClick={() => removeBtn(selected)} />
                      <AddBtn onClick={() => addToEventBtn()} />
                    </div>
                  </div>
                ) : (
                  <h3>הפריט נוסף אוטומטי לאירוע</h3>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
