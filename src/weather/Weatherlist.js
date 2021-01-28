import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import Section from './Section';
import WeatherIcon from './WeatherIcon';
import Moment from 'react-moment';
import { getCentigrade } from './helpers';

import 'moment-timezone';

import 'weather-icons/css/weather-icons.min.css';

const Wrapper = styled.div`
    background-image: url(${process.env.REACT_APP_BASE_URL}/assets/cloudy-2.jpg);
    height: 100vh;
    width: 100vw;
`
const TodayContainer = styled.div`
    margin-top: 30%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 1rem 1rem;
`

const OtherHalf = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    height: 100vh;
    width: 100%;
    backdrop-filter: blur(1rem);
    padding: 4rem;
`
const H1 = styled.h1`
    font-family: 'Lato', sans-serif;
    color: white;
    font-size: 6rem;
    font-weight: bold;
    margin-bottom: 0;
`
const H2 = styled.h2`
    font-weight: bold;
    color: white;
    font-family: 'Roboto', sans-serif;
`
const H4 = styled.h4`
    font-weight: ${props => props.selected ? 'bold' : 'normal'};
    color: ${props => props.selected ? 'white' : '#eaeaea'};
    margin-bottom: 2rem;
    font-family: 'Lato', sans-serif;
`
const Span = styled.span`
    font-family: 'Lato', sans-serif;
    color: #eaeaea;
`
const HR = styled.hr`
    border-top: 1px solid rgba(255, 255, 255, 0.5);
`
const CenteredDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const CenteredDivRow = styled(CenteredDiv)`
    flex-direction: row;
`
const LocationContainer = styled(CenteredDiv)`
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1.5em;
`
const IconContainer = styled(CenteredDiv)`
    flex-direction: column;
    color: white;
`

function WeatherList() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [location, setLocation] = useState({});

    const getLocationFromIP = async () => {
        const url = 'https://ipapi.co/json';

        return fetch(url)
            .then((res) => res.json())
            .then((res) => {
                let data = {
                    country_code: res.country_code,
                    region_code: res.region_code,
                    city: res.city,
                    latitude: res.latitude,
                    longitude: res.longitude,
                }
                setLocation(data)
                return data
            })
            .catch((err)=> {
                return null
            })
    }

    const loadTodayData = async (loc) => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${loc.latitude}&lon=${loc.longitude}&appid=${API_KEY}`;

        fetch(URL)
            .then((res) => res.json())
            .then((res)=> {
                setData(res.current);
                console.log(res.current);
                setForecastData(res.daily)
            })
            .catch((err) => {
                alert("Loading failed!");
            })
    }

    useEffect(()=> {
        async function loadData() {
            let location = await getLocationFromIP();

            loadTodayData(location)
                .then(()=> {
                    setLoading(false)
                })
                .catch((err)=> {
                    setLoading(false)
                })
        }
        
        setLoading(true);
        loadData();

    }, []);

    if (loading || !data || !forecastData) {
        return (
            <Wrapper>
                <CenteredDiv>
                    Loading ...
                </CenteredDiv>
            </Wrapper>
        )
    }

    if (data && forecastData) {
        const weather = data.weather[0];
        return (
            <Wrapper>
                <Container fluid>
                    <Row>
                        <Col xs={{ size: '12'}} md={{ size: '8'}}>
                            <TodayContainer>
                                <CenteredDivRow>
                                    <IconContainer>
                                        <i className={`wi wi-owm-${weather.id}`} style={{ fontSize: '4rem', color: 'white'}}></i>
                                        <Span>
                                        {weather.description}
                                        </Span>
                                    </IconContainer>
                                    <H1>{getCentigrade(data.temp)}&#176;C</H1>
                                    <LocationContainer>
                                        <H2>{location.city}, {location.country_code}</H2>
                                        <Span>
                                            <Moment
                                                format="LLLL"
                                                interval={30000}
                                            >
                                                {new Date()}
                                            </Moment>
                                        </Span>
                                    </LocationContainer>
                                </CenteredDivRow>
                                
                            </TodayContainer>

                            <CenteredDivRow>
                                <Span>
                                    By <a target="_blank" href="https://github.com/ArcRanges" style={{color: 'white'}}>Arc Ranges</a>
                                </Span>
                            </CenteredDivRow>
                        </Col>
                        <Col xs={{ size: '12'}} md={{ size: '4'}} style={{paddingRight: 0,}}>
                            <OtherHalf>
                                <H2 style={{ marginBottom: '1em'}}>Location</H2>
                                <H4 selected={true}>{location.city}</H4>
                                <H4 selected={false}>Burnaby</H4>
                                <H4 selected={false}>Surrey</H4>
                                <H4 selected={false}>Richmond</H4>
    
                                <HR/>
                                <H2 style={{ margin: '1em 0'}}>Weather Details</H2>
    
                                <Section 
                                    title="Feels like"
                                    text={getCentigrade(data.feels_like)}
                                    symbol="&#176;C"
                                />
                                <Section 
                                    title="Humidity"
                                    text={data.humidity}
                                    symbol="%"
                                />
                                <Section 
                                    title="Cloudy"
                                    text={data.all}
                                    symbol="%"
                                />
                                <Section 
                                    title="Wind"
                                    text={data.wind_speed}
                                    symbol="km/h"
                                />
                                
                                <HR/>
                                <H2 style={{ margin: '1em 0'}}>Next Days</H2>
    
                                <Row style={{ overflowX: 'scroll'}}>
                                    <Col md={{ size: 12 }}>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        {forecastData.map((w, i)=> {
                                            if (i === 0) return;
                                            return (
                                                <WeatherIcon
                                                    key={i}
                                                    data={w}
                                                />
                                            );
                                        
                                        })}
                                        </div>
                                    </Col>
                                </Row>
                            </OtherHalf>
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            No data received.
        </Wrapper>
    )
}
export default WeatherList;
