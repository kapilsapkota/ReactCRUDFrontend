import {Link, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Col, Nav, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";


export default function DefaultLayout(){
    const {user, token} = useStateContext()
    
    const onLogout = (ev) => {
      ev.preventDefault();

    }

    if(!token){
        // Swal.fire({
        //     icon:"error",
        //     text:"You must have token to visit this."
        // })
        return  <Navigate to="/login" />;
    }
return (
    <>
        <Navbar bg="primary" variant="dark">
            <Container fluid={"xxl"}>
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                    React Bootstrap</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Welcome, {user.name}
                        <a href="#" className="btn btn-sm"
                           onClick={onLogout}>Logout</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container className="mt-2">
           <Row>
               <Col className="bg-success text-white" sm={3}>
                   <Row>
                       <Col><Link to="/dashboard">Dashboard</Link></Col>
                   </Row>
                   <Row>
                       <Col><Link to="/users">Users</Link></Col>
                   </Row>
               </Col>
               <Col sm={9}>
                   <Outlet />
               </Col>
           </Row>
        </Container>
    </>
)
}