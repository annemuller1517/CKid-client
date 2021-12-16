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
        setTimeout(() => {
            setwordCard(true)
        }, 3000)
        setwordCard(false)
        
        
    
    }

   

    if (!words){
     return <p>loading...</p>
    }    // create ternary state --> if true show word if false show translation 

    return (
        <Container >
        <h1>click on the words to see the translation</h1>
        <div style={{backgroundColor: "#F8F7F3", height:"100vh"}}>
        <div style={{display: "grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gridTemplateRows:"repeat(3, 100px)", gridGap:"30px", marginTop:"40px"}}>

        {
            !words.length == 0 ? (

            
            words.map((elem)=> {
                return (
                    <div>
                    <Box onClick={handleClick}
                    sx={{
                        padding: "15px",
                        margin:"20px",
                        width: "200px",
                        backgroundColor: "white",
                        fontSize: 20, 
                        fontWeight: 'medium',
                        textAlign: "center",
                        '&:hover': {
                        backgroundColor:"white",
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
        </div>
        <div style={{display:"flex", justifyContent: "center"}}>
        <Link style={{alpha: "0.9", textDecoration:"none", fontSize:"24px", backgroundColor:"white", padding:"20px", alignItems:"flex-end", margin:"15px", color:"black"}} to={`/${country}/${city}/${lat}/${lon}/edit`}
        >Edit words</Link>
        <Link style={{textDecoration:"none", fontSize:"24px", backgroundColor:"white", padding:"20px", alignItems:"flex-end", margin:"15px", color:"black"}} to={`/${country}/${city}/${lat}/${lon}`}
        >Go back to country info</Link>
        </div>
        </div>
        </Container>
    )
}

export default Details
