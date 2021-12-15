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

        <div style={{backgroundColor: "#F8F7F3", height: "100vh"}}>
        <h1 style={{textAlign:"center", marginTop: "30px", fontFamily:"bradley hand"}}>WHERE ARE WE GOING?</h1>
        <Box sx={{ 
                display: 'flex',
                margin: "20px",
                height: "100vh",
                justifyContent: "space-evenly",
                alignContent: 'center',
                aligntItems: "center",
                textAlign: "center",
                padding: "15px",
                
            }}>
    
        <form onSubmit={btnSearch} style={{marginTop: "250px"}}>
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
            <Button variant="text" type="submit" style={{fontSize: "50px", fontFamily:"bradley hand", borderRadius: "20%"}}> Let's Go<img src="/pin2.png" alt="pin" height="50px"></img>
            </Button>
            </div>
            
            </form>
            <div>
            <img src="/globe.gif" alt="globe" style={{maxHeight: "800px"}}></img>
            </div>

            </Box>

        </div>
    )
}

export default Search
