import React from 'react'
import { TextField, Button } from '@mui/material'
import MovingIcon from '@mui/icons-material/Moving';


function Search(props) {

    let {btnSearch} = props

    return (

        <div>
        <img src="/globe.gif" alt="globe"></img>
        <hr/>
        <form onSubmit={btnSearch}>
        <div>        <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="filled"
            name="country"
            label="Country"
            
            /></div>
        <div>
        <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            variant="filled"
            name="city"
            label="City"
            />
        </div>

            <div>
            <Button variant="text" type="submit">Let's Go
            <MovingIcon></MovingIcon>
            </Button>
            </div>
            
            </form>
        </div>
    )
}

export default Search
