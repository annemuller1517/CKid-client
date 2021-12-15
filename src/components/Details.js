import React from 'react'
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from 'axios';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@material-ui/core/Container';


function Details() {

    const [data, setData] = useState([])
    const [words, setwords] = useState(null)
    const [wordCard, setwordCard] = useState(true)


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

    }, [])



    function handleClick(){
        setwordCard(!wordCard)
    }

    if (!words){
     return <p>loading...</p>
    }    // create ternary state --> if true show word if false show translation 

    return (
        <Container >
        <div style={{backgroundColor: "#F8F7F3", height:"100vh"}}>

        {
            !words.length == 0 ? (

            
            words.map((elem)=> {
                return (
                    <div>
                    <Box onClick={handleClick}
                    sx={{
                        padding: "15px",
                        width: "fit-content",
                        backgroundColor: 'white',
                        fontSize: 24, 
                        fontWeight: 'medium',
                        textAlign: "center",
                        margin:"20px",
                        '&:hover': {
                        backgroundColor: 'grey',
                        opacity: [0.9, 0.8, 0.7],
                        
                    },
                        }}
                >{wordCard ? elem.word : elem.translation}</Box>
                </div>

                )
            })
            ) :
            (
                <div>
                    <p> no words yet? </p>
                    <Link to={`/${country}/${city}/${lat}/${lon}/list`}>Add words to your list</Link>
                    </div>  
            )
        }
            
        <p style ={{textAlign:"center", alignItems:"end"}}>
        <Link style={{textDecoration:"none", fontSize:"30px", backgroundColor:"white", padding:"20px", border:"1px solid black", alignItems:"flex-end"}} to={`/${country}/${city}/${lat}/${lon}/edit`}
        >Edit words</Link>
        </p>
        <p style ={{textAlign:"center", alignItems:"end"}}>
        <Link style={{textDecoration:"none", fontSize:"30px", backgroundColor:"white", padding:"20px", border:"1px solid black", alignItems:"flex-end"}} to={`/${country}/${city}/${lat}/${lon}`}
        >Go back to country info</Link>
        </p>
        </div>
        </Container>
    )
}

export default Details
