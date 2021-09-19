import  React from 'react';
// Imports for styling
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import spider_man from '../../assets/images/spider_man.jpg';
import { Link } from 'react-router-dom';
import { AuthCheck } from 'reactfire';
import { Suspense } from 'react';
import { isPropertySignature } from 'typescript';
interface Props {
    title: string;
}

const useStyles = makeStyles({
    root: {
        padding: '0',
        margin: '0'
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        margin: '0 0 0 0.45em'
    },
    logo_a: {
        color: 'rgb(28, 24, 22,)'
    },
        logo_navigation: {
            listStyle:'none',
            textTransformation: 'uppercase',
            textDecoration: 'none'
        },
        navigation: {
            display: 'flex'
        },
        nav_a:{
            display: 'block',
            padding: '1em',
            color: 'black'
        },
        main: {
            backgroundImage : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${spider_man})`,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute'
        },
        main_text:{
            textAlign: 'center',
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white'
        }
})
export const Home= ( props:Props ) => {
    // New Classes Variable using useStyles hook
    const classes = useStyles();
    return(
    <div className= {classes.root}>
        {/* Nav Bar */}
        <nav>
            <div className={classes.navbar_container}>
                <h1 className={ `${classes.logo}` }>
                  <Link to ='/' className= {`${classes.logo_a} ${classes.logo_navigation}`}>Brand </Link>
                </h1>
                <ul className={`${classes.navigation} ${classes.logo_navigation}`}>
                    <li>
                        <Link to='/' className={classes.nav_a}>Home</Link>
                    </li>
                    <Suspense fallback = {'loading...'}>
                        <AuthCheck fallback={
                            <li>
                                <Link to='/signin' className={classes.nav_a}>Sign In</Link> 
                            </li>
                        }>
                            <li>
                                <Link to= '/dashboard' className={classes.nav_a}>Character Selection</Link>
                            </li>
                            <li>
                                <Link to='/signin' className={classes.nav_a}>Sign Out</Link>
                            </li>
                        </AuthCheck>
                    </Suspense>
                </ul>
            </div>
        </nav>
        {/* Main Home Area */}
        <main className={classes.main}>
            <div className={classes.main_text}>
                <h1> { props.title } </h1>
                <p>Lets save the day !</p>
                <Button color= 'primary' variant ='contained'>Press This Button</Button>
            </div>
        </main>
    </div>
    )
}