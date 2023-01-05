import {Card, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

export default function Login(){
    const postForm = (event) => {
      event.preventDefault()
    }
return (
    <Card style={{ width: '25rem' }}>
        {/*<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />*/}
        <Card.Body>
            <Card.Title className="text-center text-success">
                <h5 className="font-weight-bold">Login Now</h5>
            </Card.Title>
        </Card.Body>
        <Card.Body>
            <Form onSubmit={postForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p className="message">
                    Not Registered Yet?
                    <Link to="/signup">Create an account</Link>
                </p>
            </Form>
        </Card.Body>
    </Card>
)
}