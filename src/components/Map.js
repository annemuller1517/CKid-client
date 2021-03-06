import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import {MapContainer, TileLayer, Marker, Popup} from  'react-leaflet'
import L from  'leaflet';
import { Link } from 'react-router-dom';
import {UserContext} from '../context/app.context'
import {useContext} from "react"
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

import  'leaflet/dist/leaflet.css'
const pinLogo = new L.Icon({
	iconUrl: '/pin.png',
	iconSize: [40, 40],
});


function Map() {
    let {user} = useContext(UserContext)

    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
           // Fetching info for a single todo  
           let response = await axios.get(`${API_URL}/profile`, {withCredentials: true})
           setData(response.data)

        }
        getData()
    }, [])


    const position = [51.505, -0.09]
    function calculatePosition(lat, lon){
        let position = [lat, lon]
        return position 
    }


    if (!user) {
        return <p>Loading..</p>
    }

    return (
        <div>
        <Box sx={{ 
                display: 'flex',
                marginTop:"30px",
                height: "100vh",
                justifyContent: "space-evenly",
                alignContent: 'center',
                aligntItems: "center",
                textAlign: "center",
                padding: "15px",
                
            }} >

            <div>
            <h1 style={{marginTop:"10px", padding:"20px", backgroundColor: "rgb(255,255,255, 0.7)"}}>Places vistited by {user.username}</h1>
            <MapContainer  
			style={{width: '900px', height: '450px'}} 
            zoom={1.5}  
            center={position}
			scrollWheelZoom={false}>
            
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
                    {
                    data.map((elem)=> {
                        return (
                            <Marker icon={pinLogo} position={calculatePosition(elem.lat, elem.lon)}>
				            <Popup>
                            Click on me <br/>
					<Link to={`/${elem.country}/${elem.city}/${elem.lat}/${elem.lon}/details`}>{elem.city}</Link>
				</Popup>
			</Marker>
                        )
                    })
                }

		</MapContainer>
        </div>
        </Box>
        </div>
    )
}

export default Map
