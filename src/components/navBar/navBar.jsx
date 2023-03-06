/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countProductsByCategory as countProductsByCategoryFunc } from '../../services/cart-service';
import { getCategoriesRequest } from '../../services/category-service';
import './navBar.css';

export default function NavBar() {
  const { categories, category, countProductsByCategory, eventData } =
    useSelector((state) => state);
  const getCategories = async () => {
    const categories = await getCategoriesRequest();
    if (categories?.length) {
      dispatch({ type: 'SET_CATEGORIES', payload: [...categories] });
      dispatch({ type: 'SET_CATEGORY', payload: { ...categories[0] } });
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    const countProducts = countProductsByCategoryFunc(eventData);

    dispatch({
      type: 'SET_COUNT_PRODUCTS_BY_CATEGORY',
      payload: { ...countProducts },
    });
  }, [eventData]);

  return (
    <ul className="nav-bar">
      {categories.length > 0 &&
        Object.keys(countProductsByCategory).length &&
        categories.map((categoryy) => {
          return (
            <li
              className={
                categoryy.id === category.id
                  ? 'nav-link nav-link-selected'
                  : 'nav-link'
              }
              key={categoryy.id}
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: { ...categoryy } });
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{categoryy.displayName}</div>
              <div className="category-count-text">
                <br />
                <p>נוספו לאירוע : </p>
                <p style={{ textDecoration: 'underline 1.5px' }}>
                  {countProductsByCategory[categoryy.id]
                    ? countProductsByCategory[categoryy.id]
                    : 0}{' '}
                  פריטים
                </p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
