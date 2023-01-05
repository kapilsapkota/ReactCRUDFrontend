import {Card, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link, Outlet} from "react-router-dom";
import {useRef} from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider";

export default function SignUp(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef  = useRef()

    //place user Token in browser local storage
    const {setUser, setToken} = useStateContext()

    const postSignUp =  (e) => {
      e.preventDefault()

        //gather data in payload from form
        const payload = {
          name : nameRef.current.value,
          email : emailRef.current.value,
          password : passwordRef.current.value,
          password_confirmation : passwordConfirmationRef.current.value,
        }

        //use axiosClient from axios client
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                //if success set the user and token
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err =>{
                //if error catch the validation messages or error
                const response = err.response;
                if(response && response.status === 422){
                    console.log(response.data.errors)
                }
            })
    }

return (
    <Card style={{ width: '25rem' }}>
        {/*<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />*/}
        <Card.Body>
            <Card.Title className="text-center text-success">
                <h5 className="font-weight-bold">Sign Up Free</h5>
            </Card.Title>
        </Card.Body>
        <Card.Body>
            <Form onSubmit={postSignUp}>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Enter password.." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control ref={passwordConfirmationRef} type="password" placeholder="Retype password.." />
                </Form.Group>

                <Button variant="primary" type="submit">
                    SignUp
                </Button>
                <p className="message">
                    Already Registered?
                    <Link to="/login">Sign In</Link>
                </p>
            </Form>
        </Card.Body>
    </Card>
)
}