import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer'
import { useDispatchCart } from './ContextReducer';

export default function Card(props) {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  let dispatch = useDispatchCart();
  let priceRef = useRef();
  let data = useCart()
  const navigate = useNavigate();
  let price = props.fItem.price;
  const [qty, setQty] = useState(price)


  const handleCart = async () => {
    await dispatch({ type: "ADD", id: props.fItem._id, name: props.fItem.Name, qty: finalPrice, cat: props.fItem.Category })
    alert("Item Added:" + " " + props.fItem.Name + " " + "₹" + qty)
    console.log(data)

  }
  let finalPrice = parseInt(price)
  return (
    <div className='mb-2 border 3px'>
      <div className="m-3 " >
        <img src={props.fItem.img} className="card-img"></img>
        <div className="card-body">
          <h5 className="card-title">{props.fItem.Name}  </h5>
          <div>Author: {props.fItem.author}</div>
          <div>Price: ₹{props.fItem.price}</div>


          <button className={'btn btn-success justify-center ms-2'} onClick={localStorage.getItem("authT")
            ? () => handleCart() : navigate("/login.js")}>Add to Cart</button>
          <button className={'btn btn-success justify-center ms-2'} onClick={toggleDetails}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>


          {showDetails && (
            <div className="additional-details">
              <hr /><div>Description: {props.fItem.description}</div>
              <div>Available:?</div>

            </div>)}
          <hr />

        </div>
      </div>
    </div>


  )
}