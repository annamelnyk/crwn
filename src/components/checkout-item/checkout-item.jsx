import React from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem, descreaseQuantity } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, cartItem: { name, imageUrl, price, quantity }, removeItem, addItem, descreaseQuantity }) => (
  <div className='checkout-item'>
    <div className='image-container'>
      <img src={imageUrl} alt="item" />
    </div>
    <span className='name'>{name}</span>
    <span className='quantity'>
      <span className='arrow' onClick={() => descreaseQuantity(cartItem)}>&#10094;</span>
      <span className='value'>{quantity}</span>
      <span className='arrow' onClick={() => addItem(cartItem)}>&#10095;</span>
    </span>
    <span className='price'>{price}</span>
    <div
      className='remove-button'
      onClick={() => removeItem(cartItem)}
    >
      &#10005;
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  removeItem: (cartItem) => dispatch(removeItem(cartItem)),
  addItem: (cartItem) => dispatch(addItem(cartItem)),
  descreaseQuantity: (cartItem) => dispatch(descreaseQuantity(cartItem)) 
});

export default connect(null, mapDispatchToProps)(CheckoutItem);