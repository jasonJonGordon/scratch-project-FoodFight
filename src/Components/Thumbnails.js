import React, { Component } from 'react';
import { Thumbnail, Col } from 'react-bootstrap';


class Thumbnails extends Component {
  render() {
    return (
      <Col xs={8} md={3}>
        <Thumbnail href={this.props.url} alt="Loading..." src={this.props.src} />
        <h3>{this.props.name}</h3>
        <p>{this.props.phone}</p>
        <p>{this.props.location}</p>
      </Col>
    )
  }
}

export default Thumbnails;
