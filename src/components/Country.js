import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { API_URL } from '../config'
import Search from "./Search"
import {useNavigate } from 'react-router-dom'
import {Link} from  'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import { Box, textAlign } from '@mui/system'
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'

function Country(props) {
    const navigate = useNavigate()
    const {country, city, lat, lon} = useParams()

    // let {lat, lon} = useParams()
    // console.log("LATT", lat, lon)
    // let {city, country} = props
    const [countryData, setCountryData] = useState([])
    const [cityData, setCityData] = useState(null)

  useEffect(() => {

      const getData = async () => {
        let responseCountry = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
        setCountryData(responseCountry.data)

        let responseWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cae15943359bb230669b0935772b0fd1`)
        setCityData(responseWeather.data)

      }
      getData()

  }, [country])



    function calculateCelsius(kelvin){
        let celsius =  kelvin - 273.15
        return Math.round(celsius)
    }

    if (!countryData || !cityData) {
        return <h1> Loading . . .</h1>
      }

    return (
        <div className="countryInfo" style={{backgroundColor: "#F8F7F3", height:"100vh"}}>
        <h1 style={{textAlign: "center", marginTop:"30px"}}>{cityData.name}</h1>
            <Box sx={{ 
                display: 'flex',
                margin: "20px",
                justifyContent: "space-evenly",
                marginTop: "30px",
            }}>
            
            {
                countryData.map((elem) => {
                    console.log(elem.maps.googleMaps)
                    return (
                        
                        
                        <div>
                            <Card sx={{ maxWidth: 345, margin: "20px"}}>
                            <h3 style={{textAlign: "center"}}>{elem.name.official}</h3>
                                <CardMedia
                                    component="img"
                                    alt="flag"
                                    maxHeight="140"
                                    maxWidth="300"
                                    image={elem.flags.svg}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {elem.name.common}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Capital</b> {elem.capital}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Area</b> {elem.area} km²
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Population</b> {elem.population}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Continent</b> {elem.continents}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Currency</b> 
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link size="small" to={`/${elem.maps.googleMaps}`} target="_blank" rel="noreferrer" >GoogleMaps</Link>
                                    <Link size="small" to={`/${elem.maps.openStreetMaps}`} target="_blank" rel="noreferrer" >OpenStreetMaps</Link>
                                </CardActions>
                            </Card>
                        </div>

                    )
                })
            }
                        <div>
                       
                        
                       
                        <Card sx={{ maxWidth: 345, margin: "20px", height:"550px" }}>
                        <h3 style={{textAlign: "center"}}>Weather Of Today</h3>
                        
                                <CardMedia
                                    component="img"
                                    alt="flag"
                                    maxHeight="140"
                                    maxWidth="300"
                                    image="https://media.wired.co.uk/photos/606dba1c9a15f73a597a2aa1/master/w_1600%2Cc_limit/weather.jpg"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {cityData.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Temperature</b> {calculateCelsius(cityData.main.temp)} °C
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Feels like</b> {calculateCelsius(cityData.main.feels_like)} °C
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Humidity</b> {cityData.main.humidity} %
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "5px" }}>
                                    <b>Wind</b> {cityData.wind.speed} meter/sec
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "25px" }}>
                                    <b>Cloudiness</b> {cityData.clouds.all} %
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
        </div>

       
        
                            <Card sx={{ width: 345, margin: "20px", maxWidth:345}}>
                            <h3 style={{textAlign: "center"}}>Start Learning</h3>
                                <CardContent sx={{ paddingBottom: "20px"}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <img src="/idea.png" alt="idea" height="40px"></img>  Create
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "40px" }}>
                                    Create new words everyday to learn. 
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <img src="/book.png" alt="idea" height="40px"></img>  Learn
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "40px" }}>
                                    Start learning and remembering the words. 
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <img src="/talking.png" alt="idea" height="40px"></img>  Apply
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ paddingBottom: "80px" }}>
                                    Practise your learnings in real-life.
                                    </Typography>
                                    <Link to={`/${country}/${city}/${lat}/${lon}/list`} style={{textAlign: "center", color:"black", textDecoration:"none"}} > Add words to list</Link>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>

        <div></div>        
        
        </Box>
        </div>
        
    )
}

export default Country
