import {Outlet} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import {Col, Container, Row} from "react-bootstrap";


export default function GuestLayout(){
    const {token} = useStateContext()

    if(token){
        return <Navigate to="/" />
    }

return (
    <Container className="mt-4">
        <Row className="justify-content-md-center">
            <Col md="auto">
                <Outlet />
            </Col>
        </Row>
    </Container>
)
}