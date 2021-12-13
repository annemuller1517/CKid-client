import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import {MapContainer, TileLayer, Marker, Popup} from  'react-leaflet'
import L from  'leaflet';
import { Link } from 'react-router-dom';

import  'leaflet/dist/leaflet.css'
const ironhackLogo = new L.Icon({
	iconUrl: 'https://i1.wp.com/www.alliron.vc/wp-content/uploads/2018/05/logo-ironhack-1.png',
	iconSize: [68, 65],
});


function Profile() {

    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
           // Fetching info for a single todo  
           let response = await axios.get(`${API_URL}/profile`, {withCredentials: true})
           console.log(response.data)
           setData(response.data)
           console.log(response.data)

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
			style={{width: '800px', height: '330px'}} 
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
                            <Marker icon={ironhackLogo} position={calculatePosition(elem.lat, elem.lon)}>
				            <Popup>
                            Click on me <br/>
					<Link to="/">{elem.city}</Link>
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
