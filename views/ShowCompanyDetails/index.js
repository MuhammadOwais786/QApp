    import React, { useEffect, useState } from 'react'
    import { useHistory, useParams } from 'react-router-dom'
import { getSpecificCompany, getToken } from '../../config/firebase'
import { CompanyDetails } from '../CompanyDetails'
// import '../Token/node_modules/bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import * as firebase from 'firebase';
import MyMapComponent from '../../Component/map'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


function ShowCompanyDetails() {
    const classes = useStyles();
    const { companyId } = useParams()
    const history = useHistory()
    const [latitude, setLatitude] = useState(24.902752)
    const [longitude, setLongitude] = useState(67.1124084)
    const [companyData, setCompanyData] = useState(false)
    const [tokenOfToday, setTokenOfToday] = useState(false)

    useEffect(() => {
        fetchCompanyData()
        fetchTokenData()
    }, [])

    const fetchCompanyData = async () => {
        const result = await getSpecificCompany(companyId)
        setCompanyData(result.data())
    }

    const fetchTokenData = async () => {
        const dataToken = await getToken(companyId)
        let todaysToken = {}
        dataToken.forEach(doc => {
            todaysToken = doc.data()
        })
        setTokenOfToday(todaysToken)
    }
    console.log('companyData*******************************************************', setCompanyData)
    console.log('CompanyCollectionID******************** ', tokenOfToday)

    return (
        <>
            <Button onClick={() => history.goBack()}
                variant="contained" color="primary"
                style={{ marginRight: '-120%', width: '100px' }}
            >Back</Button>
            <br />

        <div className={classes.root} style={{marginLeft:"40%"}}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Logo"
                        height="140"
                        image="companyData.certificates"
                        title="Logo"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <h2>{companyData.companyName}</h2>
                       </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <h2>{companyData.address}</h2>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" variant="contained" color="primary">
                        Buy Token
                    </Button>
                    <Button size="small" variant="contained" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
            {/* <h1 style={{ marginTop: "-20px", fontSize:"50px"}}><b>{companyData.companyName}</b></h1> */}
            {/* {companyData && <div>
                <img src={companyData.certificates} style={{ height: 100 }} />
                <h3><span>Comapny Name: </span>  {companyData.companyName}</h3>
                <h3><span>Comapny Timings: </span>  {companyData.timings}</h3>
                <h3><span>Comapny Since: </span>  {companyData.since}</h3>
                <h3><span>Comapny Address: </span>  {companyData.address}</h3>
            </div>}
            <br />
            <br /> */}
            <br/>
            {tokenOfToday && <div>
                <h3><span>Total Number Of Tokens: </span>{tokenOfToday.todayToken}</h3>
                <h3><span>Token Estimate Time: </span>{tokenOfToday.tokenEstTime}</h3>

            </div>}
            <br/>
            <MyMapComponent
                isMarkerShown
                defaultCenter={{ lat: 24.903016, lng: 67.1140284 }}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px`, width: '500px' }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

        </div>
        </>
    );
}

export default ShowCompanyDetails;