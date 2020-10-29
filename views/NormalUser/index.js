import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSpecificCompany, getCompanies } from '../../config/firebase'
// import '../Token/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import firebase from 'firebase';


function NormalUser() {
    const history = useHistory()
    const [companiesData, setCompaniesData] = useState([])
    const [buyToken, setBuyToken] = useState()
    const [limit, setLimit] = useState(20)
    let loading = false


    useEffect(() => {
        fetcToken()

        document.addEventListener('scroll', trackScrolling)
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [])


    useEffect(() => {
        getAllCompanies()
        console.log('limit useEffect***', limit)
        document.addEventListener('scroll', trackScrolling)
    }, [limit])


    const getAllCompanies = async () => {
        loading = true
        const compData = await getCompanies(limit)
        const list = []
        compData.forEach(doc => {
            list.push({ ...doc.data(), companyId: doc.id })
            console.log(doc.data())
        })
        setCompaniesData(list)
        loading = false
    }


    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight + 10;
    }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('header')
        if (isBottom(wrappedElement) && !loading) {
            console.log('header bottom reached', limit);
            setLimit(limit + 10)

            document.removeEventListener('scroll', trackScrolling);
        }
    };


    const fetcToken = async () => {
        const db = firebase.firestore()
        const dataToken = await db.collection("todaysToken").get()

        const todaysToken = []
        dataToken.forEach(doc => {
            console.log('ID OF Document ****************** ', doc.id)
            todaysToken.push({ ...doc.data(), TokenID: doc.id })
        })

        setBuyToken(todaysToken)
        console.log(todaysToken)
    }



    return (
        <div className="App" id="header">
            <h1 style={{ marginTop: "-20px" }}>Normal User</h1>
            <br />
            <input placeholder='Search Here.... '  onChange={(e) => {
          getAllCompanies(e.target.value)
        }} />
            <br />
            <br />
            <Table striped bordered hover style={{ backgroundColor: 'white', width: "100%" }}>
                <thead className="thead-light">
                    <tr>
                        <th>SR NO</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {companiesData.map((compData, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td key={compData.companyName}>{compData.companyName}</td>
                                <td>
                                    <Button
                                        key={index}
                                        onClick={() => history.push(`/ShowCompanyDetails/${compData.companyId}`)}

                                    // onClick={() => history.push('/showCompanyDetails')}
                                    >View Details</Button>
                                </td>
                            </tr>
                        ))}
                    </>
                </tbody>
            </Table>

            {/* <Button onClick={() => history.push`('/addCompany')}
                variant="outline-primary" size="lg" block
                style={{ marginRight: '-120%' }}
            >ADD New Company Details</Button> */}
            <br />
            <Button onClick={() => history.goBack()}
                variant="outline-primary" size="lg"
                style={{ marginRight: '-120%', width: '100px' }}
            >Back</Button>

        </div>
    );
}

export default NormalUser;