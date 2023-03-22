import React from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import MyMapInner from './MyMapInner';

const MyMap = ({latlong, showPosition}) => {
  return (
    <Wrapper apiKey={"AIzaSyB61K3yQZ-gWlEhfdr29A3UHJc-aH7wbzw"}>
       <MyMapInner latlong={latlong} showPosition={showPosition}/>
    </Wrapper>
  )
}

export default MyMap