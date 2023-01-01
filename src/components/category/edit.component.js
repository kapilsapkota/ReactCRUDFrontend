import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditCategory() {
    const navigate = useNavigate();

    const { id } = useParams()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [status, setStatus] = useState()
    const [existingImgSrc, setExistingImgSrc] = useState(null)
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        fetchCategory()
    },[])

    const fetchCategory = async () => {
        await axios.get(`http://localhost:8000/api/category/${id}`).then(({data})=>{
            const { title, description, status, image } = data.category
            setTitle(title)
            setDescription(description)
            setStatus(status)
            setImage(image)
            setExistingImgSrc(`http://localhost:8000/storage/category/image/${image}`)
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
        // Assuming only image
       changeImage(event)
    };

    const changeImage = (event) =>{
        var file = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setExistingImgSrc(reader.result)
        };
    }

    const updateCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('title', title)
        formData.append('description', description)
        formData.append('status', status)
        if(image!==null){
            formData.append('image', image)
        }

        await axios.post(`http://localhost:8000/api/category/${id}`, formData).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            navigate("/")
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update Category</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value])=>(
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={updateCategory}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" value={title} onChange={(event)=>{
                                                    setTitle(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Description">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={description} onChange={(event)=>{
                                                    setDescription(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Image" className="mb-3">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control type="file" onChange={changeHandler} />
                                                <Form.Label className="mt-2">Existing Image</Form.Label>
                                                <img className="mt-2" style={{ maxHeight : 200 }} width="50%" src={existingImgSrc} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Status" className="mb-3">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Select aria-label="Select Status" value={status} onChange={(event)=>{
                                                    setStatus(event.target.value)
                                                }}>
                                                    <option value="1">Active</option>
                                                    <option value="0">InActive</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Update
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
