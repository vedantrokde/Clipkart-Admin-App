import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';

/**
* @author
* @function Signup
**/

const Signup = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user));
    }

    if (auth.authenticate)
        return <Redirect to={`/`} />

    if (user.loading)
        return <p>Loading...!</p>

    return (
        <Layout>
            <Container>
                { user.message }
                <Row style={{ marginTop: '60px' }}>
                    <Col md={{ offset: 3, span: 6 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        type="Text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="Text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup;