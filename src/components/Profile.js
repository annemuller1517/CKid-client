import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import {MapContainer, TileLayer, Marker, Popup} from  'react-leaflet'
import L from  'leaflet';
import { Link } from 'react-router-dom';

import  'leaflet/dist/leaflet.css'
const pinLogo = new L.Icon({
	iconUrl: '/pin.png',
	iconSize: [40, 40],
});


function Profile() {

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


    return (
        <div>

            <h1>Places vistited</h1>
<MapContainer  
			style={{width: '500px', height: '330px'}} 
            zoom={1}  
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
    )
}

export default Profile
