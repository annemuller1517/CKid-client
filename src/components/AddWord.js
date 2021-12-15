
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_URL } from '../config';
import { Navigate, useParams } from 'react-router';
import { useNavigate, Redirect } from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send'
import { useContext} from "react";
import { UserContext } from "../context/app.context";
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    button: {
      margin: theme.spacing(1),
    }
  }))

  
function AddWord(props) {
    const navigate = useNavigate()


    const [error, setError] = useState(null)

    const classes = useStyles()
    let {city, country, lat, lon} = useParams()
    const [inputField, setInputField] = useState([
        {id: uuidv4(), word: " ", translation: " "},
    ])


    const handleChangeInput = (id,event) => {
        const newInputFields = inputField.map(i => {
            if(id === i.id) {
              i[event.target.name] = event.target.value
            }
            return i;
          })
          
          setInputField(newInputFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()    

        // console.log(inputField)

        try {
            await axios.post(`${API_URL}/${city}/wordlist`, inputField, {withCredentials: true})
            
            
        }
        catch (err){
            console.log("error")
            setError(err.response.data.error)
            }
            navigate(`/${country}/${city}/${lat}/${lon}/details`)
    }

    const handleAddFields = (event) => {
        setInputField([...inputField, {id: uuidv4(), word: '', translation: ""}])
    }

    const handleRemoveFields = id => {
        const values  = [...inputField];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputField(values);
    }
 
    

    return (
        <Container style={{backgroundColor: "#F8F7F3", height:"100vh"}}>
            <h1>Add new word</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
            {   
                inputField.map((inputField) => (
                    <div key={inputField.id}>
                    <TextField 
                    name="word"
                    label="Input Word"
                    variant="filled"
                    value={inputField.word}
                    onChange={event => handleChangeInput(inputField.id, event)}
                    helperText={error ? error : ""}
                    error={error ? true: false}
                    />
                    <TextField 
                    name="translation"
                    label="Input Translation"
                    variant="filled"
                    value={inputField.translation}
                    onChange={event => handleChangeInput(inputField.id, event)}
                    helperText={error ? error : ""}
                    error={error ? true: false}
                    />
                    <IconButton disabled={inputField.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton
                    onClick={handleAddFields}
                    >
                    
                        <AddIcon />
                    </IconButton>
                    
                    </div>
                ))}
                <Button
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}
                    >Send</Button>
                    <Link to={`/https://translate.google.com/`} >Forgot the translation? click here</Link>
            </form>
        </Container>
    )
}

export default AddWord
