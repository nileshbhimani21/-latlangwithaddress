import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import MyMap from './map/Map';
import Geocode from "react-geocode";
import { useForm } from 'react-hook-form'
import './App.scss';

Geocode.setApiKey("AIzaSyAmwA8tw1ZXG8fo16T3ymx2HY3Q1gw6dwU");

function App() {
  const [coords, setCoords] = useState([])
  const [changeAdr, setChangeAdr] = useState(false)

  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
  const onSubmit = data => console.log(data);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  function addressFormat(response, arr) {
    let streeNumber, strretAdd, city, pin, state, country;
    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        // eslint-disable-next-line default-case
        switch (response.results[0].address_components[i].types[j]) {
          case "locality":
            city = response.results[0].address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            state = response.results[0].address_components[i].long_name;
            break;
          case "country":
            country = response.results[0].address_components[i].long_name;
            break;
          case "postal_code":
            pin = response.results[0].address_components[i].long_name;
            break;
          case "sublocality":
            strretAdd = response.results[0].address_components[i].long_name
            break;
          case "street_number":
            streeNumber = response.results[0].address_components[i].long_name
            break;
        }
      }
    }
    
    setCoords(arr)
    setValue('address', strretAdd);
    setValue('city', city);
    setValue('state', state);
    setValue('pin', pin);
  }
  function showPosition(position) {
    let arr = [];
    arr.push(position.coords.latitude);
    arr.push(position.coords.longitude);
    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        addressFormat(response, arr)
      },
      (error) => {
        console.error(error);
      }
    );
  }
  useEffect(() => {
    Geocode.fromAddress(
      `${getValues("address")} ${getValues("city")} ${getValues("state")} ${getValues("pin")}`).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCoords([lat, lng])
      },
      (error) => {
        //toast.error("Unable to find address");
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeAdr]);

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              placeholder="Enter address"
              {...register('address')}
            />
            <Form.Control
              placeholder="Enter city"
              {...register('city')}
            />
            <Form.Control
              placeholder="Enter state"
              {...register('state')}
            />
            <Form.Control
              placeholder="Enter pin"
              {...register('pin')}
            />
            <button className="btn btn-primary"
            onClick={() => setChangeAdr(!changeAdr)}>Set on Map</button>
            <Button type='submit'>Submit</Button>
          </Form>
          
        </Col>
        <Col lg={6}>
          <Button variant='btn btn-primary'
            onClick={() => getLocation()}>Locate Me</Button>
          <MyMap latlong={coords} showPosition={showPosition}/>
        </Col>
      </Row>

    </Container>
  );
}
export default App;
