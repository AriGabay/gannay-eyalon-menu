/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../services/category-service';
import './navBar.css';

export default function NavBar({ setEventListIsOpen }) {
  const { categories, category } = useSelector((state) => state);
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

  return (
    <div className="nav-bar" style={{ color: '#f5efdf' }}>
      {categories.length > 0 &&
        categories.map((categoryy) => {
          console.log('category', category);
          return (
            <div
              className={
                categoryy.id === category.id
                  ? 'nav-link nav-link-selected'
                  : 'nav-link'
              }
              key={categoryy.id}
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: { ...categoryy } });
                setEventListIsOpen(false);
              }}
            >
              {categoryy.displayName}
            </div>
          );
        })}
    </div>
  );
}
