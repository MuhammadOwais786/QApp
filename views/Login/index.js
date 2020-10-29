import React, { useEffect, useState } from 'react'
import './App.css';
import { useHistory } from "react-router-dom"
import { registerUser, loginUser, getPosts } from '../../config/firebase'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            maxWidth: 345,
        },
    },
}));

export default function Login(props) {
    const classes = useStyles();
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    // const [ list, setList ] = useState('')

    // useEffect(() => {
    //     updatePostList()
    // }, [])

    // const updatePostList = async function() {
    //     try {
    //         const response = await getPosts()
    //         const result = await response.json()
    //         console.log('result***', result)
    //         setList(result)
    //     } catch (e) {
    //         console.log('e***', e)
    //     }
    // }

    const registerUser = async function () {
        //Exceptional Handling or Error Handling
        try {
            const user = await (email, password)
            setMessage('User is registered Successfully!')
        } catch (error) {
            setMessage(error.message)
        }
    }

    const onLogin = async function () {
        try {
            await loginUser(email, password)
            history.replace('/home')
        } catch (error) {
            setMessage(error.message)
        }
    }

    const updateMessage = function (message) {
        setMessage()
    }

    return (
        <>
            <div className={classes.root} noValidate id="card">
                <h1>Q App</h1>
                <TextField required id="standard-required,outlined-basic" label="Full Name" variant="outlined" className="TextField"
                    onChange={e => setEmail(e.target.value)} />
                <TextField required id="standard-required , outlined-basic" label="Number" variant="outlined" type="number" className="TextField"
                    onChange={e => setPassword(e.target.value)} />
                <br />
                <TextField required id="standard-required,outlined-basic" label="Email" variant="outlined" type="email" className="TextField"
                    onChange={e => setEmail(e.target.value)} />
                <TextField required id="standard-required , outlined-basic" label="Password" variant="outlined" type="password" className="TextField"
                    onChange={e => setPassword(e.target.value)} />
                <br /><br/>
                <Button variant="contained" color="primary" onClick={registerUser} className="signup">
                    Sign Up
                </Button> <br/><br/>
                <Button variant="contained" color="primary" onClick={onLogin} className="login">
                    Login
                </Button>

                {/* <button onClick={registerUser}>Sign up</button>
                <p>{message}</p>
                <button onClick={onLogin}>Login</button> */}
            </div>
        </>
    )
}