import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import Modal from '../../components/UI/Modal'
import { Row, Col, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, updateCategory, deleteCategory } from '../../actions'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown, IoIosAdd, IoIosTrash, IoMdCreate } from 'react-icons/io';
import { createCategoryList } from '../../helpers/linearCategories';
import './style.css';

/**
* @author
* @function Category
**/

const Category = (props) => {

    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [check, setCheck] = useState([]);
    const [expand, setExpand] = useState([]);
    const [checkArr, setCheckArr] = useState([]);
    const [expandArr, setExpandArr] = useState([]);
    const dispatch = useDispatch();

    const renderCategories = (categories) => {
        let cats = [];
        for (let cat of categories) {
            cats.push({
                label: cat.name,
                value: cat._id,
                children: cat.children && cat.children.length > 0 && renderCategories(cat.children)
            });
        }
        return cats;
    };

    const updateSelectedCategories = () => {
        const categories = createCategoryList(category.categories);
        const arr1 = [], arr2 = [];
        check.length > 0 && check.forEach((catId, ind) => {
            const cate = categories.find((_cat, _ind) => catId === _cat.value)
            cate && arr1.push(cate);
        })
        expand.length > 0 && expand.forEach((catId, ind) => {
            const cate = categories.find((_cat, _ind) => catId === _cat.value)
            cate && arr2.push(cate);
        })
        setCheckArr(arr1); setExpandArr(arr2);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
        const _form = new FormData();
        _form.append('name', categoryName);
        _form.append('parentId', parentCategoryId);
        _form.append('categoryImage', categoryImage);
        _form.append('type', categoryType);

        dispatch(addCategory(_form));

        setCategoryImage('');
        setCategoryName('');
        setParentCategoryId('');
        setCategoryType('');
        setShow(false);
    };

    const handleUpdateModalClose = () => setUpdateCategoryModal(false);
    const handleUpdateModalShow = () => {
        updateSelectedCategories();
        setUpdateCategoryModal(true);
    };
    const handleCategoryInput = (key, value, index, type = "expand") => {
        if (type === "check") {
            const updatedArr = checkArr.map((_cat, _ind) => index === _ind ? { ..._cat, [key]: value } : _cat)
            setCheckArr(updatedArr);
        } else {
            const updatedArr = expandArr.map((_cat, _ind) => index === _ind ? { ..._cat, [key]: value } : _cat)
            setExpandArr(updatedArr);
        }
    };
    const handleUpdateCategory = () => {
        const _form = new FormData();
        expandArr.forEach((cate, ind) => {
            _form.append('_id', cate.value);
            _form.append('name', cate.name);
            _form.append('parentId', cate.parentId ? cate.parentId : "");
            // _form.append('categoryImage', categoryImage);
            _form.append('type', cate.type);
        })
        checkArr.forEach((cate, ind) => {
            _form.append('_id', cate.value);
            _form.append('name', cate.name);
            _form.append('parentId', cate.parentId ? cate.parentId : "");
            _form.append('type', cate.type);
        })

        dispatch(updateCategory(_form));

        setCheck([]);
        setExpand([]);
        setCheckArr([]);
        setExpandArr([]);
        handleUpdateModalClose();
    };

    const handleDeleteModalClose = () => setDeleteCategoryModal(false);
    const handleDeleteModalShow = () => {
        updateSelectedCategories();
        setDeleteCategoryModal(true);
    };
    const handleDeleteCategory = () => {
        const ids = checkArr.map((cate, index) => ({ _id: cate.value }));

        dispatch(deleteCategory(ids));

        setCheck([]);
        setExpand([]);
        setCheckArr([]);
        setExpandArr([]);
        handleDeleteModalClose();
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtn">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                                <button onClick={handleUpdateModalShow}><IoMdCreate /><span>Edit</span></button>
                                <button onClick={handleDeleteModalShow}><IoIosTrash /><span>Delete</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={check}
                            expanded={expand}
                            onCheck={check => setCheck(check)}
                            onExpand={expand => setExpand(expand)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <div className="action-btn">
                            <button className="btn-primary" onClick={() => setCheck([])}><span>Deselect All</span></button>
                            <button className="btn-primary" onClick={() => setExpand([])}><span>Collapse All</span></button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
                handleSave={handleSave}
                buttonName={'Add Category'}
            // size="lg"
            >
                <Row>
                    <Col>
                        <Input
                            label=""
                            placeholder="Enter Category Name"
                            type="text"
                            value={categoryName}
                            className="form-control-sm"
                            onChange={(e) => { setCategoryName(e.target.value) }}
                        />
                    </Col>
                    <Col>
                        <Form.Select value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)} className="form-select-sm">
                            <option key={null} value={null}>Select Parent Category</option>
                            {
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </Form.Select>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            placeholder=""
                            type="file"
                            className="form-control-sm"
                            onChange={(e) => { setCategoryImage(e.target.files[0]) }}
                        />
                    </Col>
                    <Col>
                        <Form.Select value={categoryType} onChange={(e) => setCategoryType(e.target.value)} className="form-select-sm">
                            <option value="">Select Category Type</option>
                            <option value="store">Store</option>
                            <option value="product">Product</option>
                            <option value="page">Page</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Modal>

            <Modal
                show={updateCategoryModal}
                handleClose={handleUpdateModalClose}
                modalTitle={'Update Category'}
                handleSave={handleUpdateCategory}
                size="lg"
                buttonName='Save Changes'
            >
                <Row>
                    <Col><h5>Expanded Categories</h5></Col>
                </Row>
                {
                    expandArr.length > 0 ?
                        expandArr.map((_cat, ind) =>
                            <Row key={ind}>
                                <Col>
                                    <Input
                                        label=""
                                        placeholder="Enter Category Name"
                                        type="text"
                                        value={_cat.name}
                                        className="form-control-sm"
                                        onChange={(e) => handleCategoryInput('name', e.target.value, ind)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Select value={_cat.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, ind)} className="form-select-sm">
                                        <option key={null} value={null}>Select Parent Category</option>
                                        {
                                            createCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select value={_cat.type} onChange={(e) => handleCategoryInput('type', e.target.value, ind)} className="form-select-sm">
                                        <option value="">Select Category Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        ) :
                        <p>No expanded categories!</p>
                }

                <hr />
                <Row>
                    <Col><h5>Selected Categories</h5></Col>
                </Row>
                {
                    checkArr.length > 0 ?
                        checkArr.map((_cat, ind) =>
                            <Row key={ind}>
                                <Col>
                                    <Input
                                        label=""
                                        placeholder="Enter Category Name"
                                        type="text"
                                        value={_cat.name}
                                        className="form-control-sm"
                                        onChange={(e) => handleCategoryInput('name', e.target.value, ind, 'check')}
                                    />
                                </Col>
                                <Col>
                                    <Form.Select value={_cat.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, ind, 'check')} className="form-select-sm">
                                        <option key={null} value={null}>Select Parent Category</option>
                                        {
                                            createCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select value={_cat.type} onChange={(e) => handleCategoryInput('type', e.target.value, ind, 'check')} className="form-select-sm">
                                        <option value="">Select Category Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        ) :
                        <p>No selected categories!</p>
                }
                {/* <Input
                    placeholder=""
                    type="file"
                    onChange={(e) => { setCategoryImage(e.target.files[0]) }}
                /> */}
            </Modal>

            <Modal
                show={deleteCategoryModal}
                handleClose={handleDeleteModalClose}
                modalTitle={'Confirm Category Deletion'}
                buttons={[
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: () => { handleDeleteCategory(); }
                    },
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => { handleDeleteModalClose(); }
                    }
                ]}
            >
                Are you sure you want to delete these categories?
                {/* <hr />
                <h6 style={{ textDecoration: 'underline' }}>Expanded Categories</h6>
                {
                    expandArr.length > 0 ?
                        expandArr.map((cate, ind) => <span key={ind}>{cate.name}</span>)
                        : <p>No selected categories!</p>
                }
                <hr />
                <h6 style={{ textDecoration: 'underline' }}>Selected Categories</h6> */}
                {
                    checkArr.length > 0 ?
                        checkArr.map((cate, ind) => <span style={{}} key={ind}><br /><IoIosArrowForward />{cate.name} </span>)
                        : <p>No selected categories!</p>
                }
            </Modal>
        </Layout>
    )
}

export default Category