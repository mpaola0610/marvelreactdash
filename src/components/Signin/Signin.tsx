import React, { useState } from 'react'; 
import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import { Input } from '../sharedComponents/Input';
import { Container, Button, makeStyles, Typography, Snackbar } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
// Functional Component Created inside of this component
// Will be used to close the snackbar
const Alert = ( props: AlertProps ) =>{
    return <MuiAlert elevation = {6} variant = 'filled' {...props} />
}
const useStyles = makeStyles({
    googleButton: {
        backgroundColor: 'rgb(66,133,244)',
        marginTop: '2em',
        padding: 'white',
        color: 'white',
        height: '50px',
        width:'240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0, 0, 0, /25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo: {
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4CAF50'
    }
})

interface SignInProps{
    history: RouteComponentProps['history']
    location: RouteComponentProps['location']
    match: RouteComponentProps['match']
}

export const Signin = withRouter ((props:SignInProps) => {
    const auth = useAuth();
    const classes = useStyles();
    const {history} = props
    const [open, setOpen] = useState(false)

    const handleSnackOpen = () => {
        setOpen(true)
    }
    const handleSnackClose = (event?:React.SyntheticEvent, reason?:string) => {
        if ( reason === 'clickaway'){
            return
        }
        setOpen(false)
        history.push('/')
    }

    const sign_in = async () =>{
        const response = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        if(response.user){
            handleSnackOpen()
        }
    }

    const sign_out = async () => {
        await auth.signOut()
    }
    return(
        <div>
            <Container maxWidth='sm' className = {classes.containerStyle}>

                <Typography className = { classes.typographyStyle}> Sign In Here</Typography>
                <form action = "">
                    <div>
                        <label htmlFor='email'> Email </label>
                        <Input name = 'email' placeholder= 'Place Email Here' />
                    </div>
                    <div>
                        <label htmlFor='password' placeholder='Place Password Here'>Password</label>
                        <Button type='submit' variant='contained' color='primary'> Submit</Button>
                    </div>
                </form>
                <AuthCheck fallback={
                    <Button className={classes.googleButton} onClick={sign_in }>Sign in With Google</Button>
                }>
                    <Button variant= 'contained' color= 'secondary' onClick={sign_out}>Sign Out</Button>
                </AuthCheck>
                <Snackbar message = {'Success'} open ={open} autoHideDuration={6000} onClose= {handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity='success'>
                        Successful Sign In- Redirect in 6 seconds
                    </Alert>
                </Snackbar>
                    
            </Container>
        </div>
    )

})