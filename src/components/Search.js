import React from 'react'
import { TextField, Button } from '@mui/material'
import MovingIcon from '@mui/icons-material/Moving';
import { Box } from '@mui/system';
import { useContext} from "react";
import { UserContext } from "../context/app.context";
import {useEffect, useState} from 'react'
import axios from 'axios'




function Search(props) {

    let {btnSearch, countryError} = props

    return (

        <div style={{ height: "100vh", marginTop:"100px"}}>
        <h1 style={{marginLeft:"30px", padding:"10px", marginTop: "30px", fontFamily:"bradley hand", backgroundColor:"rgb(255,255,255, 0.7)", height:"fit-content", width:"fit-content"}}>Pick your next destination</h1>
        <Box sx={{ 
                margin: "20px",
                height: "100vh",
                padding: "15px",
            }}>
         <div style={{display:"flex"}}>
        <img src="arrow.png" alt="arrow" height="200px" style={{marginLeft:"250px", marginTop:"20px"}}></img>
        <form onSubmit={btnSearch} style={{marginLeft:"50px", marginTop: "100px", backgroundColor:"rgb(255,255,255, 0.7)", height:"fit-content"}}>
        <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="standard"
            name="country"
            label="Country"
            style={{margin: "15px", textAlign:"center"}}
            helperText={countryError ? countryError : ""}
            error={countryError ? true: false}
            />
        <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="standard"
            name="city"
            label="City"
            style={{margin: "15px"}}
            helperText={countryError ? countryError : ""}
            error={countryError ? true: false}
            />
            <div>
            <Button variant="text" type="submit" style={{marginLeft:"40px",fontSize: "50px", fontFamily:"bradley hand", borderRadius: "20%", color:"black"}}> Let's Go<img src="/pin2.png" alt="pin" height="50px"></img>
            </Button>
            </div>
            
            </form>
            <div>
            {/* <img src="/globe.gif" alt="globe" style={{maxHeight: "800px"}}></img> */}
            </div>
            </div>  
            </Box>
             
        </div>
    )
}

export default Search
