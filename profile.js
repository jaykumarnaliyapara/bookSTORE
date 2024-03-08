import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/Navbar";


function Profile() {

  const [data, setData] = useState([]);
  const [credentials, setcredentials] = useState({ location: "" })
  const OnChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  const Pupdate = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/udata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: localStorage.getItem("E-mail"),
        location: credentials.location
      })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Location Not Updated")
    } else if (json.success) {
      alert("Location Updated!!")
      window.location.reload(true);
    }

  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/pdata', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: localStorage.getItem("E-mail")
        })
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }


  };

  return (localStorage.getItem("authT") ?
    <div className="check"><Navbar />

      <h1>Profile Data</h1><hr />

      {data.map((item) => (
        <h3 key={item._id}>User_Name:{item.name}<br />User_Email:{item.email}<br />User_Location:  {item.location}<br />Registration_Date:  {item.date}</h3>

      ))}<hr /><div align="right">
        <input type="text" className="background-color: solid-black" name='location' onChange={OnChange} />
        <button type="submit" className="btn btn-primary btn" style={{ "margin": "0px 20px" }} onClick={Pupdate}>Update Location</button>
        <hr /></div>

    </div> : <div div className="check"><Navbar /><h3>DO LOGIN FIRST</h3></div>
  );
}

export default Profile;
