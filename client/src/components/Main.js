import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Button } from 'react-bootstrap';
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: [],
      API: process.env.REACT_APP_API,

    }
  }
  componentDidMount = async () => {
    const getDigimonRequest = await axios.get(`${this.state.API}/digimon`);
    this.setState({
      mainData: getDigimonRequest.data
    })
  }
  saveItem = async (data) => {
    await axios.post(`${this.state.API}/digimon/favourite`, data);

  }
  render() {
    return (
      <div>
        <Row xs={2} md={4} >
          {this.state.mainData.map((data, index) => {
            return (<div key={index}>
              <Card style={{ width: '18rem', height: '35rem' }}>
                <Card.Img src={data.img} alt='' />
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>{data.level}</Card.Text>

                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => { this.saveItem(data) }} variant='primary'>Add To Favorite</Button>
                </Card.Footer>
              </Card>



            </div>)
          })

          }</Row>
      </div>
    )
  }
}

export default Main
