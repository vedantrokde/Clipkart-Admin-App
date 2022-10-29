import React, { useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryList } from '../../helpers/linearCategories';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { addPage } from '../../actions';
import './style.css';

/**
* @author
* @function Page
**/

const Page = (props) => {

    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);
    const [createModal, setCreateModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [pageDetails, setPageDetails] = useState('');
    const dispatch = useDispatch();

    const handleCreateModalClose = () => setCreateModal(false);
    const handleCreateModalShow = () => {
        setCreateModal(true);
    };
    const handleCreateModal = () => {
        const _form = new FormData();
        _form.append('title', title);
        _form.append('desc', desc);
        _form.append('category', categoryId);

        const type = createCategoryList(category.categories).find(cate => cate.value === categoryId).type;
        _form.append('type', type);

        for (let pic of banners)
            _form.append('banners', pic);

        for (let pic of products)
            _form.append('products', pic);

        dispatch(addPage(_form));

        setTitle('');
        setDesc('');
        setCategoryId('');
        setBanners([]);
        setProducts([]);
        setCreateModal(false);
    };

    const handleDetailsModalClose = () => setDetailsModal(false);
    const handleDetailsModalShow = (pag) => {
        setPageDetails(pag);
        setDetailsModal(true);
    }

    const renderPages = () => {
        return (
            <Table style={{ fontSize: 12 }} striped hover responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Last Edited</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        page.pages.length > 0 ?
                            page.pages.map((pag, ind) =>
                                <tr onClick={() => handleDetailsModalShow(pag)} key={pag._id} style={{ cursor: 'pointer' }}>
                                    <td>{ind + 1}</td>
                                    <td>{pag.title}</td>
                                    <td>{pag.category.name ? pag.category.name : '--' }</td>
                                    <td>{pag.category.type ? pag.category.type.toUpperCase() : 'PRODUCT'}</td>
                                    <td>{pag.createdAt.replace(/[a-zA-Z]/g, ' ')}</td>
                                    <td>{pag.updatedAt.replace(/[a-zA-Z]/g, ' ')}</td>
                                </tr>
                            ) : null
                    }
                </tbody>
            </Table>
        );
    }
    const renderPageDetailsModal = (pag) => {
        if (!pageDetails) return null;
        return (
            <Modal
                show={detailsModal}
                handleClose={handleDetailsModalClose}
                modalTitle={'Page Details'}
                size="lg"
            >
                <Row>
                    <Col md={12}>
                        <label className="key">Title</label>
                        <p className="value">{pageDetails.title}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Category</label>
                        <p className="value">{pageDetails.category.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Page Type</label>
                        <p className="value">{pageDetails.category.type}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Created At</label>
                        <p className="value">{pageDetails.createdAt}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Last Edited</label>
                        <p className="value">{pageDetails.updatedAt}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Description</label>
                        <p className="value">{pageDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Banners</label>
                        <div style={{ display: 'flex' }}>
                            {
                                pageDetails.banners && pageDetails.banners.length > 0 ?
                                    pageDetails.banners.map(picture =>
                                        <div key={picture._id} className="productImgContainer">
                                            <img src={picture.img} alt={picture._id} title={picture.navigateTo} />
                                            {/* <span>{picture.navigateTo}</span> */}
                                        </div>
                                    )
                                    :
                                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>No banners for this page in database!</p>
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Products</label>
                        <div style={{ display: 'flex' }}>
                            {
                                pageDetails.products && pageDetails.products.length > 0 ?
                                    pageDetails.products.map(picture =>
                                        <div key={picture._id} className="productImgContainer">
                                            <img src={picture.img} alt={picture._id} title={picture.navigateTo} />
                                        </div>
                                    )
                                    :
                                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>No products for this page in database!</p>
                            }
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Pages</h3>
                            <button onClick={handleCreateModalShow}>Create Page</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderPages()}
                    </Col>
                </Row>
            </Container>
            {renderPageDetailsModal()}

            <Modal
                show={createModal}
                handleClose={handleCreateModalClose}
                handleSave={handleCreateModal}
                modalTitle={'Create New Page'}
                buttonName={'Create'}
            >
                <Row>
                    <Col>
                        <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-select-sm">
                            <option key={null} value={null}>Select Page Category</option>
                            {
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Input
                            label=""
                            placeholder="Enter Page Title"
                            type="text"
                            value={title}
                            className="form-control-sm"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            label=""
                            placeholder="Enter Page Description"
                            type="text"
                            value={desc}
                            className="form-control-sm"
                            onChange={(e) => setDesc(e.target.value)}
                        />

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            placeholder=""
                            label="Upload Banner(s):"
                            type="file"
                            name="banners"
                            className="form-control-sm"
                            multiple
                            onChange={(e) => setBanners(e.target.files)}
                        />
                    </Col>
                    <Col>
                        <Input
                            placeholder=""
                            label="Upload Product Picture(s):"
                            type="file"
                            name="products"
                            className="form-control-sm"
                            multiple
                            onChange={(e) => setProducts(e.target.files)}
                        />
                    </Col>
                </Row>
            </Modal>
        </Layout>
    )

}

export default Page