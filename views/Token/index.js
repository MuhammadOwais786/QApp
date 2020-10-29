import React, { useState } from 'react';
import { useHistory , useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from 'firebase'

function Token() {
    const history = useHistory()
    const { companyId } = useParams()
    const [todayToken, setTodayToken] = useState('')
    const [tokenEstTime, setTokenEstTime] = useState('')
 
    const handleSubmit = (e) => {
        e.preventDefault();

        const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        firebase.firestore().collection("todaysToken")
            .add({
                todayToken,
                tokenEstTime,
                today,
                userId: companyId
            }).then(() => {
                alert("Token Has Been Updated ");
            }).catch((error) => {
                alert(error.message);
            })
        setTodayToken('')
        setTokenEstTime('')
    }

    const tempData = async () => {
        const db = firebase.firestore()
        const tmpComData = await db.collection("todaysToken").get().then(() => {
        const tokenDay = new Date()
        if(tokenDay.date === tmpComData.getDate){
            console.log("Date  is not Match", tmpComData)
        }
    }).catch((error) => {
        console.log(error.message);
    })}


    return (
        <div>
            <Button onClick={() => history.goBack()}
                variant="primary" size="lg"
                style={{ marginRight: '-120%', width: '100px' }}
            >Back</Button>
        
            <h1>Tokens</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Token Quantity</Form.Label>
                    <Form.Control placeholder="Enter Todays Toekn Quantity"
                        type="number"
                        onChange={(e) => setTodayToken(e.target.value)}
                        value={todayToken} />
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Token Estimated Time</Form.Label>
                    <Form.Control placeholder="Enter Toekn Estimated Time"
                        type="number"
                        onChange={(e) => setTokenEstTime(e.target.value)}
                        value={tokenEstTime} />
                </Form.Group>
                {/* <Button variant="primary" size="lg" type="submit" className="submit" onClick={() => history.goBack()}> */}
                <Button variant="primary" size="lg" type="submit" className="submit" onClick={tempData}>
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default Token;
