import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
export default function MyOrder() {
  const [orderData, setorderData] = useState({})
  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('E-mail'))
    await fetch("http://localhost:5000/myodata", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('E-mail')
      })
    }).then(async (res) => {
      let response = await res.json()
      await setorderData(response)
    })

  }

  useEffect(() => {
    fetchMyOrder()
  }, [])
  return (
    localStorage.getItem('authT') ? <div>
      <div>
        <Navbar />
      </div>

      <div className='check'><h2>MyOrders</h2>
        <div className='row'>

          {orderData != {} ? Array(orderData).map(data => {
            return (
              data.orderData ?
                data.orderData.order_data.slice(0).reverse().map((item) => {
                  return (
                    item.map((arrayData) => {
                      return (
                        <div  >
                          {arrayData.Order_date ? <div className='m-auto mt-5'>

                            {data = arrayData.Order_date}

                            <hr />
                          </div> :

                            <div className='col-12 col-md-6 col-lg-3' >
                              <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>

                                <div className="card-body">
                                  <h5 className="card-title">{arrayData.name}</h5><hr />
                                  <div className='container w-100 p-0' style={{ height: "38px" }}>

                                    <span className='m-1'>Category:{arrayData.cat}</span><br />
                                    <span className='m-1'>Price:₹{arrayData.qty}/-</span>



                                  </div>
                                </div>
                              </div>

                            </div>



                          }

                        </div>
                      )
                    })

                  )
                }) : <div className="m-2"><hr /><h4>No Previous Orders Found!! Do Shopping</h4></div>
            )
          }) : ""}
        </div>


      </div>
    </div> : <div className="check"><Navbar />

      <h2>DO LOGIN FIRST</h2></div>
  )

}