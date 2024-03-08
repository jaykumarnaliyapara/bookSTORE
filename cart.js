import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import axios from "axios"
export default function Cart() {


  let data = useCart();
  let dispatch = useDispatchCart()
  if (data.length === 0) {
    return (localStorage.getItem("authT"))
      ? (<div><Navbar />
        <div className='check'>THIS CART IS EMPTY.</div></div>
      ) : <div><Navbar /><div className='check'>do login first</div></div>
  }
  let totalPrice = data.reduce((total, item) => total + item.qty, 0)
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("E-mail");
    const Payment = async () => {
      
        let amount = totalPrice

        const { data: { key } } = await axios.get("http://localhost:5000/getkey")
        const { data: { order } } = await axios.post("http://localhost:5000/checkout", { amount })
       

        console.log(order)
        const options = {
          key,
          amount: totalPrice * 100,
          currency: "INR",
          name: "BookSTORE",
          image: "https://media.istockphoto.com/id/825022790/vector/b-initial-icon-with-black-and-white-color.jpg?s=612x612&w=0&k=20&c=lbwmREBXTV-VO4x3U5W9cvKVYTJSv7DQ_vo9XqL7gcE=",
          order_id: order.id,
          callback_url: "http://localhost:5000/pverification",
          prefill: {
            name: "Enter Name",
            email: localStorage.getItem("E-mail"),
            contact: "9111111111"
          },
          notes: { "address": "razorpay official" },
          theme: { "color": "red" }
        }
       
        const razor = new window.Razorpay(options)
        razor.open();
       
       
       
          
          if(true){
          let response = await fetch("http://localhost:5000/odata", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              order_data: data,
              email: userEmail,
              totalPrice: totalPrice,
              order_date: new Date().toDateString(),
              payment:"Not Done"


            })
          });
          //console.log(response.status)
          if (response.status === 200) {

            dispatch({ type: "DROP" })
            localStorage.removeItem("order_id")
            //alert("CART DIspatched")
            //navigate("/myorders.js")


          }
        }

       


    }
    Payment();

  }
  return ((localStorage.getItem("authT"))
    ? (<div><Navbar />

      <div className='m-5'><h1>YOUR CART!!</h1>
        <div className='container m-auto mt-5 table responsive table-responsive-sm table-responsive-md'>
          <table className='table table-hover'>
            <thead className="text-success fs-3">
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Category</th>

                <th scope='col'>RemoveItem</th>
              </tr>
              {data.map((item, index) => (
                <tr scope='row'>{index + 1}
                  <td>{item.name}</td>
                  <td> ₹{item.qty}</td>
                  <td>{item.cat}</td>

                  <td><button type="button" className='btn p-0'><h3 onClick={() => dispatch({ type: "REMOVE", index: index })}>Remove</h3></button></td>

                </tr>

              ))}    </thead>
          </table>
          <tbody>

          </tbody>
          <h2>Total:₹{totalPrice}/-</h2>
          <button type="submit" onClick={handleCheckOut} className="btn btn-primary btn align-right">CheckOut</button>
        </div>


      </div>


    </div>)
    : (<div className='d-flex'><Link className='m-2' style={{ "color": "red" }} to='/login.js'>Login</Link>
      <Navbar /><div className="check">DO LOGIN FIRST!!</div></div>)


  )
}
