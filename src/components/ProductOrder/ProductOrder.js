import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { Button, Dropdown } from '@/shared';

import './ProductOrder.scss';

export const CN = 'product-order';

const ProductOrder = (props) => {
  const {
    title,
    description,
    price,
    sizes,
    colors,
    quantity,
    onClickAddToWishlist,
    onClickAddToCart,
    className
  } = props;

  // The following function should be replaced when the proper functionality for dropdowns is added.
  const onDropdownChangeFunc = () => (true);

  return (
    <div className={cx(CN, className)}>
      <h2 className={`${CN}__heading`}>{title}</h2>
      <p className={`${CN}__description`}>{description}</p>
      <span className={`${CN}__price`}>{price}</span>
      <div className={`${CN}__dropdowns-wrapper`}>
        <Dropdown menuOptions={sizes} placeholder="size:" onDropdownChange={onDropdownChangeFunc} />
        <Dropdown menuOptions={colors} placeholder="color:" onDropdownChange={onDropdownChangeFunc} />
        <Dropdown menuOptions={quantity} placeholder="qty:" onDropdownChange={onDropdownChangeFunc} />
      </div>
      <div className={`${CN}__buttons-wrapper`}>
        <Link to="/cart">
          <Button onClick={onClickAddToCart} className={`${CN}__cart-btn`}>add to cart</Button>
        </Link>
        <Button
          className={`${CN}__wishlist-btn`}
          icon="heart"
          onClick={onClickAddToWishlist}
        >
          wishlist
        </Button>
      </div>
    </div>
  );
};

ProductOrder.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.array,
  sizes: PropTypes.array,
  colors: PropTypes.array,
  onClickAddToWishlist: PropTypes.func.isRequired,
  onClickAddToCart: PropTypes.func.isRequired
};

ProductOrder.defaultProps = {
  title: '',
  description: '',
  price: '',
  quantity: [],
  sizes: [],
  colors: []
};

export default ProductOrder;
