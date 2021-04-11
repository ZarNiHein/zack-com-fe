import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {Auth} from 'aws-amplify';
import UserContext from '../UserContext';

export default class Login extends Component {
    state={
        login: {
        },
        definedAuth: {},
        error: null,
        isLoading: false,
    };

    static contextType = UserContext

    componentDidMount(){
        const definedAuth = this.context;
        this.setState({definedAuth});
    }

    handleChange =(event) => {
        let login = this.state.login;
        login[event.target.id] = event.target.value;
        this.setState({login: login})
    };

    handleSubmit = async(event) => {
        event.preventDefault();
        const {username,password} = this.state.login;
        this.setState({isLoading: true});

        try {
            await Auth.signIn(username,password)
                .then(data => console.log(data));
                this.state.definedAuth.setAuthenticated();
                this.setState({isLoading: false});
                this.props.history.push('/');
        }
        catch(error) {
            console.log(error);
            this.setState({error: error.message || error, isLoading: false});
        }
    }

    render() {
        console.log(this.state.login);
        console.log("loading: ", this.state.isLoading)
        return (
            <Container>
            <Form className="pt-5 text-left" onSubmit={this.handleSubmit}>
                <Form.Text className="text-center h4 mb-4">
                    Log in
                </Form.Text>
                <Form.Text className='text-center text-danger mb-4'>
                    {this.state.error}
                </Form.Text>
                <Row className="mb-3">
                    <Form.Group className="m-auto" as={Col} lg="3" md="5" sm="6" xs="10" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control size="sm" value={this.state.login.username} type="text" placeholder="Enter your username" onChange={(event)=> this.handleChange(event)} />
                        {/* <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="m-auto" as={Col} lg="3" md="5" sm="6" xs="10" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="sm" value={this.state.login.password} type="password" placeholder="Enter your password" onChange={(event)=>this.handleChange(event)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">  
                    </Form.Group>
                </Row>
                <Row className="m-4 text-center">
                <Col className="m-auto" lg="3" md="5" >
                <Button size="sm" variant="primary" type="submit" disabled={this.state.isLoading}>
                    Submit
                </Button>
                </Col>
            </Row>
            </Form>
            </Container>
        );
    }
}
