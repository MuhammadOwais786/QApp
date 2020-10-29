import React, { useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
// import '../Token/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import firebase from 'firebase';
import { storage } from 'firebase';
import MyMapComponent from '../../Component/map'


export default function AddCompany(props) {
    const history = useHistory();
    const [companyName, setCompanyName] = useState('')
    const [since, setSince] = useState('')
    const [timingsFrom, setTimingsFrom] = useState('')
    const [timingsTo, setTimingsTo] = useState('')
    const [timings, setTimings] = useState('')
    const [certificates, setCertificates] = useState('')
    const [address, setAddress] = useState('')
    // const [images, setImages] = useState([])
    // const [companyList, setCompanyList] = useState([])
    // const [companies, setCompanies] = useState([])
    const [fileUrl, setFileUrl] = useState(null)


    const onFileChange = function (e) {
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref(`Certificates/${file.name}`);
        storageRef.put(file).then(function (res) {
            console.log('res****', res)
            res.ref.getDownloadURL().then(function (url) {
                console.log('url--->', url)
                setFileUrl(url)
                console.log('file url fromstate', fileUrl)
            })
        })
    }

    console.log('URLL STATE**************************', fileUrl)

    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.firestore().collection("companiesData")
            .add({
                companyName,
                since,
                timings,
                certificates: fileUrl,
                address
            }).then(() => {
                alert("Data Has Been Submitted ");
            }).catch((error) => {
                alert(error.message);
            })

        setCompanyName('')
        setSince('')
        setTimingsFrom('')
        setCertificates('')
        setAddress('')
    }

    return (
        <div>
            <h1>Add Company Details</h1>
            <br />
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company Name" onChange={(e) => setCompanyName(e.target.value)} value={companyName} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Since</Form.Label>
                        <Form.Control
                            // type="date"
                            style={{ width: '100%' }}
                            onChange={(e) => setSince(e.target.value)}
                            value={since}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Timings</Form.Label>
                        <Form.Control
                            // type="time"
                            onChange={(e) => setTimingsFrom(e.target.value)}
                            value={timings} />
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Timings To</Form.Label>
                        <Form.Control
                            type="time"
                            onChange={(e) => setTimingsTo(e.target.files)}
                            value={timings} />
                    </Form.Group> */}

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Certificates</Form.Label>
                        <Form.Label>
                            <Form.Control
                                type="file"
                                style={{ width: '100%' }}
                                multiple
                                onChange={onFileChange}
                            /> Select Images (Max 3)
                        </Form.Label>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address} />
                </Form.Group>

                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: '500px' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />

                <br />
                <Button variant="primary" size="lg" type="submit" className="submit">
                    Submit
                </Button>
            </Form>
            <br />
            <Button onClick={() => history.goBack()} variant="outline-primary" size="lg" className="back">Back</Button>
        </div>
    )
}