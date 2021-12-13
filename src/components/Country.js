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
import Button from '@mui/material/Button';
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

    if (!countryData || !cityData) {
        return <h1> Loading . . .</h1>
      }

    return (
        <div className="countryInfo">

            <h1>Basic Data</h1>
            {
                countryData.map((elem) => {
                    return (
                        
                        <div>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt="flag"
                                    height="140"
                                    image={elem.flags.svg}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {elem.name.common}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Capital</b> {elem.capital}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Area</b> {elem.area} km²
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Population</b> {elem.population}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Continent</b> {elem.continents}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Currency</b> 
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link size="small" to={elem.maps.googleMaps}>GoogleMaps</Link>
                                    <Link size="small" to={elem.maps.openStreetMaps}>OpenStreetMaps</Link>
                                </CardActions>
                            </Card>
                        </div>

                    )
                })
            }
                        <div>
                        <div></div>
                        <hr/>
                        <h1>Weather Of Today</h1>
                        <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt="flag"
                                    height="140"
                                    image=""
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {cityData.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Temperature</b> {cityData.main.temp} °C
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Feels like</b> {cityData.main.feels_like} °C
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Humidity</b> {cityData.main.humidity}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Description</b> f
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Currency</b> 
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
        </div>

        <hr/>
        <h1>Start Learning</h1>
                            <Card sx={{ maxWidth: 345 }}>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <img src="/idea.png" alt="idea" height="40px"></img>Create
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Create new words everyday to learn. 
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <img src="/book.png" alt="idea" height="40px"></img>Learn
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Start learning and remembering the words. 
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <img src="/talking.png" alt="idea" height="40px"></img>Apply
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Practise your learnings in real-life
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>

        <div><Link to={`/${country}/${city}/${lat}/${lon}/list`}> Add words to list</Link></div>        
        
    
        </div>
    )
}

export default Country
