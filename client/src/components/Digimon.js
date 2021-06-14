import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Button, Form } from 'react-bootstrap';

export class Digimon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      digimonData: [],
      API: process.env.REACT_APP_API,
      name: '',
      img: '',
      level: '',
      slug: '',
      showUpdateForm: false
    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`${this.state.API}/digimon/favourite`);
    this.setState({
      digimonData: getRequest.data
    })
  }
  deleteItem = async (slug) => {
    const deleteRequest = await axios.delete(`${this.state.API}/digimon/favourite/${slug}`);
    this.setState({
      digimonData: deleteRequest.data
    })
  }
  updateSlug = async (slug, img) => { this.setState({ slug: slug, img: img, showUpdateForm: true }) }
  updateName = async (e) => { this.setState({ name: e.target.value }) }
  updateimg = async (e) => { this.setState({ img: e.target.value }) }
  updatelevel = async (e) => { this.setState({ level: e.target.value }) }
  updateItem = async (e) => {
    e.preventDefault();
    console.log(this.state.slug);
    const bodyRequest = {
      name: this.state.name,
      img: this.state.img,
      level: this.state.level
    }
    const updateRequest = await axios.put(`${this.state.API}/digimon/favourite/${this.state.slug}`, bodyRequest);
    this.setState({ digimonData: updateRequest.data, showUpdateForm: false })
  }
  render() {
    const rendering = <Row xs={2} md={4} >
      {this.state.digimonData.map((data, index) => {
        return (<div key={index}>
          <Card style={{ width: '18rem', height: '35rem' }}>
            <Card.Img src={data.img} alt='' />
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>{data.level}</Card.Text>

            </Card.Body>
            <Card.Footer>
              <Button onClick={() => { this.deleteItem(data.slug) }} variant='danger'>Delete</Button>
              <Button onClick={() => { this.updateSlug(data.slug, data.img) }} variant='primary'>Update</Button>

            </Card.Footer>
          </Card>



        </div>)
      })

      }</Row>
    const form = <Form onSubmit={(e) => this.updateItem(e)}>
      <Form.Label>Name</Form.Label>
      <Form.Control onChange={this.updateName} type='text' />
      <Form.Label>Image_Url</Form.Label>
      <Form.Control onChange={this.updateimg} type='text' />
      <Form.Label>Level</Form.Label>
      <Form.Control onChange={this.updatelevel} type='text' />
      <Button variant='primary' type='submit' value='update'>Update Now</Button>
    </Form>
    return (
      <div>
        {rendering}
        {this.state.showUpdateForm &&
          form
        }
      </div>
    )
  }
}

export default Digimon
