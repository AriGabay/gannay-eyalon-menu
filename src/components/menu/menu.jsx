import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../services/product-service';
import AddBtn from '../addBtn/addBtn';
import './menu.css';

export default function Menu() {
  const dispatch = useDispatch();
  const { products, category } = useSelector((state) => state);
  const getProductsList = async () => {
    if (products?.length) return products;
    const res = await getProducts();
    dispatch({ type: 'SET_PRODUCTS', payload: [...res] });
  };

  useEffect(() => {
    getProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickProduct = (product) => {
    dispatch({
      type: 'SET_MODAL_IS_OPEN',
      payload: true,
    });
    dispatch({
      type: 'SET_SELECTED',
      payload: { ...product },
    });
  };

  return (
    <div>
      {products.length && Object.keys(category).length > 0 && (
        <div>
          <h1 className="menu-type-title">{category.displayName}</h1>
          <div className="menu">
            {products.length > 0 &&
              products.map((product) => {
                if (product?.categoryId !== category.id) return '';
                return (
                  <div
                    style={{ maxWidth: '270px' }}
                    key={product.id}
                    onClick={() => onClickProduct(product)}
                    className="product-with-add-btn"
                  >
                    <div className="product">
                      <div className="product-name">{product.productName}</div>
                      <div className="product-description">
                        {product.description}
                      </div>
                      <div className="product-img-container">
                        <img
                          className="product-img"
                          src={`${product?.imgUrl}`}
                          alt={`${product.productName}`}
                        />
                      </div>
                    </div>
                    <AddBtn onClick={() => onClickProduct(product)} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
