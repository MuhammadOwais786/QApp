import React, { useEffect, useState } from 'react'
import './home.css';
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';


export default function Home(props) {
    const history = useHistory()

    return (
        <div className="main">
            <h1 className="heading"> Home Page </h1>
            <Button onClick={() => history.push('/NormalUser')} variant="outline-primary" size="lg" className="normalUser">Normal User</Button> <></>
            <Button onClick={() => history.push('/companyDetails')} variant="outline-primary" size="lg" className="company">Add an Company</Button>
        </div>
    )
}