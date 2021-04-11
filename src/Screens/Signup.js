import React, { Component } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import UserContext from '../UserContext';

export default class Signup extends Component {
    state = {
        signup: {
        },
        definedAuth: {},
        error: null,
        user: false,
        isLoading: false
    };

    static contextType = UserContext;

    componentDidMount() {
        const definedAuth = this.context;
        this.setState({ definedAuth });
    }

    handleChange = (event) => {
        let signup = this.state.signup;
        signup[event.target.id] = event.target.value;
        this.setState({ signup: signup })
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, confirmPassword, email } = this.state.signup;
        this.setState({ isLoading: true });

        if (password !== confirmPassword) return this.setState({ error: "Password doesn't match" })

        try {
            await Auth.signUp({ username, password, attributes: { email: email } })
                .then(data => console.log(data));
            this.setState({ isLoading: false, user: true });
        }
        catch (error) {
            console.log(error);
            this.setState({ error: error.message || error, isLoading: false });
        }
    };

    handleConfirmationSubmit = async (event) => {
        event.preventDefault();
        const { username, password, email, code } = this.state.signup;
        this.setState({ isLoading: true });

        try {
            await Auth.confirmSignUp(username, code)
                .then(data => console.log(data));

            await Auth.signIn(username, password)
                .then(data => console.log(data));
            this.state.definedAuth.setAuthenticated();
            this.setState({ isLoading: false });
            this.props.history.push('/');
        }
        catch (error) {
            console.log(error);
            this.setState({ error: error.message || error, isLoading: false });
        }
    }

    render() {
        console.log(this.state.signup);
        return (
            this.state.user === false ?
                <Container>
                    <Form className="pt-5 text-left" onSubmit={this.handleSubmit}>
                        <Form.Text className='text-center h4 mb-4'>
                            Sign up your account
                </Form.Text>
                        <Form.Text className='text-center text-danger mb-4'>
                            {this.state.error}
                        </Form.Text>
                        <Row className="mb-3">
                            <Form.Group className="m-auto" as={Col} lg="3" md="5" sm="6" xs="10" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control size="sm" value={this.state.signup.username} type="text" placeholder="username" onChange={(event) => this.handleChange(event)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className="m-auto" as={Col} lg="3" md="5" sm="6" xs="10" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control size="sm" value={this.state.signup.email} type="email" placeholder="****@gmail.com" onChange={(event) => this.handleChange(event)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className="m-auto" as={Col} lg="3" md="5" sm="6" xs="10" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control size="sm" value={this.state.signup.password} type="password" placeholder="Password" onChange={(event) => this.handleChange(event)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className="m-auto" as={Col} lg="3" md="5" sm="6" xs="10" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control size="sm" value={this.state.signup.confirmPassword} type="password" placeholder="confirmPassword" onChange={(event) => this.handleChange(event)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                            </Form.Group>
                        </Row>
                        <Row className="m-4 text-center">
                            <Col className="m-auto" lg="3" md="5">
                                <Button size="sm" variant="primary" type="submit" disabled={this.state.isLoading}>
                                    SIGN UP
                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                :
                <Container>
                    <Form className="pt-5 text-left" onSubmit={this.handleConfirmationSubmit}>
                        <Form.Text className='text-center h4 mb-4'>
                            Please check your email for the code.
                </Form.Text>
                        <Form.Text className='text-center text-danger mb-4'>
                            {this.state.error}
                        </Form.Text>
                        <Row className="mb-3">
                            <Form.Group className="m-auto" as={Col} lg="3" md="5" sm="6" xs="10" controlId="code">
                                <Form.Label>ConfirmationCode</Form.Label>
                                <Form.Control size="sm" value={this.state.signup.code} type="tel" onChange={(event) => this.handleChange(event)} />
                            </Form.Group>
                        </Row>
                        <Row className="m-4 text-center">
                            <Col className="m-auto" lg="3" md="5">
                                <Button size="sm" variant="primary" type="submit" disabled={this.state.isLoading}>
                                    SUBMIT
                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
        );
    }
}
