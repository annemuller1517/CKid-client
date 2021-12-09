import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { API_URL } from '../config'
import Search from "./Search"
import {useNavigate } from 'react-router-dom'


function Country(props) {
    const navigate = useNavigate()

    // let {lat, lon} = useParams()
    // console.log("LATT", lat, lon)
    // let {city, country} = props
    const [countryData, setCountryData] = useState([])
    const [cityData, setCityData] = useState(null)
    const [lat, setLat] = useState(null)
    const [lon, setLon] =useState(null)
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)


    const handleSearch = async (event) => {
        event.preventDefault()
        setCountry(event.target.country.value)
        setCity(event.target.city.value)
      
        let response = await axios.get(`https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`)
        console.log("response", response.data)
        let data = response.data[0]
        setLat(data.lat)
        setLon(data.lon)
      
        console.log("WORKED", lat, lon)
      
      }




  useEffect(() => {

      const getData = async () => {
        let responseCountry = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
        setCountryData(responseCountry.data)

        let responseWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cae15943359bb230669b0935772b0fd1`)
        setCityData(responseWeather.data)

        let addData = await axios.post(`${API_URL}/country/${lat}/${lon}`)
      }
      getData()

  }, [country])

    if (!countryData || !cityData) {
        return <h1> Loading . . .</h1>
      }

    return (
        <div>
            <h1>detail page</h1>
            {
                countryData.map((elem) => {
                    return (
                        <div>
                        <h2>Country: {elem.name.common}</h2>
                        <h2>Capital: {elem.capital}</h2>
                        </div>

                    )
                })
            }
        <div>
            <p>
            <br/>
            <h1>Weather data </h1>
            <h2>Temp: {cityData.main.temp}</h2>
            <h2>Feels like: {cityData.main.feels_like}</h2>
                {
                    cityData.weather.map((elem)=> {
                        return (
                            <div>Main: {elem.main}</div>
                        )
                    })
                }
            </p>
        </div>


        <form>
        <h3>add words</h3>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
            <button type="submit">sumbit</button>
        </form>
    
        </div>
    )
}

export default Country
