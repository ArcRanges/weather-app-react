import React from 'react';
import styled from 'styled-components';
import { getCentigrade } from './helpers';
import 'weather-icons/css/weather-icons.css';
import Moment from 'react-moment';

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1em;
    align-items: center;

`
const Small = styled.small`
    font-family: 'Lato', sans-serif;
`
const Span = styled.span`
    font-family: 'Lato', sans-serif;
    color: #eaeaea;
`
const TempContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: #eaeaea;
`

function WeatherIcon({data}) {
    const {  weather, temp } = data;
    const today = new Date(data.dt * 1000);

    return (
        <IconContainer>
            <Moment format="ddd" element={Span}>
                {today}
            </Moment>
            <i className={`wi wi-owm-${weather[0].id}`} style={{ fontSize: '1rem', color: '#fff', margin: '5px 0'}}></i>
            <TempContainer>
                <Small>{getCentigrade(temp.max)}&#176;C</Small>&nbsp;
                <Small>{getCentigrade(temp.min)}&#176;C</Small>
            </TempContainer>
            <Span>{weather[0].description}</Span>
        </IconContainer>
        
    )
}

export default WeatherIcon;
