import React from 'react'
import {useParams} from "react-router-dom"
import {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { API_URL } from '../config';

import Box from '@mui/material/Box';
import { LocalDining } from '@material-ui/icons';


function Details() {

    const [data, setData] = useState([])
    const [words, setwords] = useState(null)
    const [wordCard, setwordCard] = useState(false)

    let {country, city, lat, lon} = useParams()
    console.log(country)
    useEffect(() => {
        const getData = async () => {
           // Fetching info for a single todo  
           let response = await axios.get(`${API_URL}/${country}/${city}/${lat}/${lon}/details`, {withCredentials: true})
           console.log(response.data)
           setData(response.data)
           setwords(response.data.words)

        }
        getData()
    }, [words])



    function handleClick(){
        setwordCard(!wordCard)
    }

    if (!words){
     return <p>loading...</p>
    }    // create ternary state --> if true show word if false show translation 

    return (
        <div>

        {
            words.map((elem)=> {
                return (
                    <Box onClick={handleClick}
                    sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: 'primary.dark',
                        fontSize: 34, 
                        fontWeight: 'medium',
                        textAlign: "center",
                        margin:"20px",
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],

                    },
                        }}
                >{wordCard ? elem.word : elem.translation}</Box>
                )
            })
        }

        </div>
    )
}

export default Details
