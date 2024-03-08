import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import Card from '../components/card.js'
import Navbar from '../components/Navbar.js';
export default function Home() {
    const [search, setsearch] = useState('');

    const [itemC, setitemC] = useState([]);
    const [itemI, setitemI] = useState([]);
    const loaddata = async () => {
        let response = await fetch("http://localhost:5000/vdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        response = await response.json();
        setitemC(response[0])
        setitemI(response[1])

    }
    useEffect(() => {
        loaddata()
    }, [])
    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-inner">
                    <div className="carousel-caption" style={{ zIndex: "1" }}>
                        <div className="d-flex justify-content-center" >
                            <input className="form-control me-2" type="search" placeholder="Search book with {name/category/author}" aria-label="Search " value={search} onChange={(e) => { setsearch(e.target.value) }} />
                            {/* <button className="btn btn-outline-success" type="submit" >Search</button>*/}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://media.istockphoto.com/id/1346036453/photo/books-bookcase-shop-self-background.jpg?s=1024x1024&w=is&k=20&c=v1idgmWq1WvV2oHRp5sAuP37xE6MViXqMO-wBvmez-s=" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/1222563369/photo/bookstore-shop-exterior-with-books-and-textbooks-in-showcase.jpg?s=1024x1024&w=is&k=20&c=nJwm6JxOPIephzEQLAzC7NQD_eQaItyT8Y-zxMKaqPA=" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/1193397692/vector/online-book-library-concept-vector-graphic-illustration-with-characters-reading-books-online.jpg?s=1024x1024&w=is&k=20&c=O7fTAnyUV61WSWBuiPZ6o3z0Us_1S4C6WJI6Rk6re6U=" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className="container">
                {
                    itemI != []
                        ? itemI.map((data) => {
                            return (<div className="row mb-3"><div key={data._id} className="fs-3 m-3">
                                <hr /> {data.Category}
                            </div>

                                {
                                    itemC != []
                                        ? itemC.filter((item => (item.Category === data.Category) && item.Name.toLowerCase().includes(search.toLocaleLowerCase()) | item.Category.toLowerCase().includes(search.toLocaleLowerCase()) | item.author.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                                            return (<div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                <Card fItem={filterItems} ></Card>
                                                </div>)
                                        }) : ""}</div>)

                        }) : (<div>no category</div>)
                }</div>

        </div>

    )
}