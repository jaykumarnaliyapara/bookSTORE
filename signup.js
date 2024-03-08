import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function SignUP() {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location
      })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials !!")
    } else if (json.success) {
      navigate("/login.js")
      alert("Registration Successful!! Do Login")

    }

  }

  const OnChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return <html>
    <body>
      <form onSubmit={handleSubmit}>
        <section className="lgn" >

          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">

                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <h2 style={{ "color": "red", "text-align": "center" }}>SignUP </h2>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" name='name' value={credentials.name} onChange={OnChange} />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" name='email' value={credentials.email} onChange={OnChange} />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" name='password' value={credentials.password} onChange={OnChange} />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example5c" className="form-control" name='location' value={credentials.location} onChange={OnChange} />
                            <label className="form-label" htmlFor="form3Example4c">Address</label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn">Register</button>
                          <Link to="/home.js" style={{ "margin": "0px 20px" }} className="btn btn-secondary btn">Home</Link>

                        </div>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid" alt="Sample image" />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </body>
  </html>




}