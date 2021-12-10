import React, {useEffect, useContext, useState} from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import MyNav from "./components/MyNav";
import { API_URL } from "./config";
import { UserContext } from "./context/app.context";
import {useNavigate } from 'react-router-dom'
import axios from "axios";
import Search from "./components/Search";
import Country from "./components/Country";
import AddWord from "./components/AddWord";

function App() {

  useContext(UserContext)
  const {user, setUser, error, setError} = useContext(UserContext)

  const [country, setCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
 
  // setting it to true so that we can show a loading screen and make the user wait until this api finsihes
  const [fetchingUser, setFetchingUser] = useState(true)

  // This hook is for us to redirect users to different urls
  const navigate = useNavigate()

  useEffect(() => {

    const getData = async () => {

        try {
          let userReponse = await axios.get(`${API_URL}/user`, {withCredentials: true})
          setFetchingUser(false)
          setUser(userReponse.data)
        
        }
        catch(err){
          setFetchingUser(false)
        }
    }

    getData()

  }, [])

  // useEffect(() => {
  //   navigate('/')
  // }, [user])



const handleSigIn = async (event) =>{ 
  event.preventDefault()
  try {
    let user = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    // axios by default ignores all the credential request and we have to add a 3rd parameter to let axios know not to ignore 
    // sends the cookies 
    // for the get request it is the second paramter 
    // just set it to true for all the axios requests
    let repsonse = await axios.post(`${API_URL}/signin`, user, {withCredentials: true})
    setUser(repsonse.data)
    navigate("/")
  }
  catch(err){
    setError(err.response.data.error)
  }

}


const handleLogout = async () => {
  // dont need to send any data but need the post request send an empty object 
  await axios.post(`${API_URL}/logout`, {}, {withCredentials:true})
  setUser(null)
}

const handleSearch = async (event) => {
  event.preventDefault()
 
  let country = event.target.country.value
  let city = event.target.city.value

  let response = await axios.get(`https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`)
  console.log("response", response.data)
  let data = response.data[0]

  let destination = {
    country: event.target.country.value,
    city: event.target.city.value,
    lat: data.lat,
    lon: data.lon,
  }
  console.log(data.lat)
  console.log(data.lon)

  try {
    let try1 = await axios.post(`${API_URL}/country`, destination, {withCredentials: true})
    console.log(try1)
  }
  catch (err){
    console.log("failed")
    }
  


  navigate(`${country}/${city}/${data.lat}/${data.lon}`)
  // console.log("WORKED", lat, lon)

}

const handleSubmit = async (event) => {
  event.preventDefault()
  //https://www.youtube.com/watch?v=zgKH12s_95A
  console.log(event.currentTarget)
}

  if (fetchingUser) {
    return <p>loading. . . . </p>
  }

  return (
    <div>
    
      <MyNav onLogout={handleLogout} user={user}/>
      <p>welkom </p>
      <Routes>
          <Route path="/" element={<Search btnSearch={handleSearch} user={user}/> } />
          <Route  path="/signin" element={<SignIn btnSignIn={handleSigIn} myError={error}/>}/>
          <Route  path="/signup" element={<SignUp />}/>
          <Route path="/:country/:city/:lat/:lon" element={<Country city={city} country={country}/>} />
          <Route path="/:country/:city/:lat/:lon/list" element={<AddWord btnSubmit={handleSubmit} />}/>

      </Routes>
    </div>
  );
}

export default App;
