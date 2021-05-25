import React, { Component } from "react";
import "bootswatch/dist/materia/bootstrap.css";
import { Navbar, Nav, Container, Row, Col, Spinner, Image } from "react-bootstrap";

const PLACES = [
  { name: "Moscow", zip: "101000" },
  { name: "Rostov-on-Don", zip: "344000" },
  { name: "Hamburg", zip: "20095" },
  { name: "Berlin", zip: "10115" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  render() {
    const weatherData = this.state.weatherData;

    if (!weatherData) return <Spinner animation="border" variant="primary" />;

    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";

    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <Image src={iconUrl} alt={weather.main} />
        </h1>
        <p>Current: {weatherData.main.temp}&#176;C</p>
        <p>High: {weatherData.main.temp_max}&#176;C</p>
        <p>Low: {weatherData.main.temp_min}&#176;C</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <>
      <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand href="/">
          React Simple "very" Weather App
        </Navbar.Brand>
      </Navbar>
      <Container style={{marginTop: 50}}>
        <Row className="justify-content-center">
          <Col md={2} sm={4}>
            <h3>Select a city</h3>
            <Nav
              style={{marginTop: 18}}
              variant="pills"
              className="flex-column"
              activeKey={activePlace}
              onSelect={(index) => {
                this.setState({ activePlace: index });
              }}
            >
              {PLACES.map((place, index) => (
                <Nav.Link key={index} eventKey={index}>{place.name}</Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col md={1} sm={1}></Col>
          <Col md={5} sm={5}>
            <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default App;