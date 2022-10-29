import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { Row, Col, Container, Table, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions'
import './style.css'
import { generatePublicURL } from '../../urlConfig'
import { createCategoryList } from '../../helpers/linearCategories';

/**
* @author
* @function Products
**/

const Products = (props) => {

    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);

    const [show, setShow] = useState(false);
    const [showProdDetails, setShowProdDetails] = useState(false);
    const [prodDetails, setProdDetails] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
        const _form = new FormData();
        _form.append('name', name);
        _form.append('price', price);
        _form.append('quantity', quantity);
        _form.append('description', description);
        _form.append('category', categoryId);

        for (let pic of productPictures)
            _form.append('productPictures', pic);

        dispatch(addProduct(_form));
        setShow(false);
    };

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}
                handleSave={handleSave}
                buttonName={'Add Product'}
            >
                <Input
                    label="Product Name"
                    placeholder="Enter Product Name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Input
                    label="Product Price"
                    placeholder="Enter Price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                <Input
                    label="Product Quantity"
                    placeholder="Enter Quantity"
                    type="number"
                    min="1"
                    step="1"
                    value={quantity}
                    onChange={(e) => { setQuantity(e.target.value) }}
                />
                <Input
                    label="Product Description"
                    placeholder="Enter Product Description"
                    type="text"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
                <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option key={null} value={null}>Select Product Category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </Form.Select>
                <Input
                    placeholder=""
                    type="file"
                    multiple
                    onChange={(e) => { setProductPictures(e.target.files) }}
                />
            </Modal>
        );
    };

    const handleCloseProdDetails = () => setShowProdDetails(false);
    const handleShowProdDetails = () => setShowProdDetails(true);
    const showProdDetailsModal = (prod) => {
        setProdDetails(prod);
        handleShowProdDetails();
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} striped hover responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((prod, ind) =>
                                <tr onClick={() => showProdDetailsModal(prod)} key={prod._id} style={{ cursor:'pointer'}}>
                                    <td>{ind + 1}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.quantity}</td>
                                    <td>{prod.category.name}</td>
                                </tr>
                            ) : null
                    }
                </tbody>
            </Table>
        );
    }

    const renderShowProductDetailsModal = () => {
        if (!prodDetails) return null;
        return (
            <Modal
                show={showProdDetails}
                handleClose={handleCloseProdDetails}
                modalTitle={'Product Details'}
                handleSave={handleCloseProdDetails}
                // buttonName={'Close'}
                size="lg"
            >
                <Row>
                    <Col md={6}>
                        <label className="key">Name</label>
                        <p className="value">{prodDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Price</label>
                        <p className="value">{prodDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Quantity</label>
                        <p className="value">{prodDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Category</label>
                        <p className="value">{prodDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Description</label>
                        <p className="value">{prodDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: 'flex' }}>
                            {
                                prodDetails.productPictures && prodDetails.productPictures.length > 0 ?
                                    prodDetails.productPictures.map(picture =>
                                        <div key={picture._id} className="productImgContainer">
                                            <img src={generatePublicURL(picture.img)} alt={picture.img} />
                                        </div>
                                    )
                                    :
                                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>No product picture in database!</p>
                            }
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add Product</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderShowProductDetailsModal()}
        </Layout>
    )
}

export default Products;