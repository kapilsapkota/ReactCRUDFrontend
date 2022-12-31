import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import Badge from 'react-bootstrap/Badge';


export default function ListCategory() {

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetchCategories()
    },[])

    const fetchCategories = async () => {
        await axios.get(`http://localhost:8000/api/category`).then(({data})=>{
            setCategories(data)
        })
    }

    const deleteCategory = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if(!isConfirm){
            return;
        }

        await axios.delete(`http://localhost:8000/api/category/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchCategories()
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className='col-12'>
                   <h6>Category List</h6>
                </div>
                <div className='col-12'>
                    <Link className='btn btn-primary mb-2 float-end' to={"/category/create"}>
                        Create Category
                    </Link>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    categories.length > 0 && (
                                        categories.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{++key}</td>
                                                <td>{row.title}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <img width="50px" src={`http://localhost:8000/storage/category/image/${row.image}`} />
                                                </td>
                                                <td>
                                                    {
                                                        row.status === 1 ?
                                                        <Badge bg="primary">Active</Badge> :
                                                        <Badge bg="warning">InActive</Badge>
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/category/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteCategory(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}