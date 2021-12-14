import React from 'react'
import {useParams} from "react-router-dom"
import {useEffect, useContext, useState} from "react";
import axios from 'axios';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';
import {Box} from '@mui/material/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate } from 'react-router-dom'






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

function EditWord() {
    const navigate = useNavigate()

    const classes = useStyles()
    let {city} = useParams()
    let [data, setData] = useState(null)

 useEffect(() => {
        const getData = async () => {
           // Fetching info for a single todo  
           let response = await axios.get(`${API_URL}/${city}/wordlist`, {withCredentials: true})
           let words  = response.data[0].words.map((w) => {
                w.id = uuidv4()
                return w
           })
           setData(words)


        }
        getData()
    }, [])
    
      
    const handleAddFields = (event) => {
        setData([...data, {id: uuidv4(), word: '', translation: ""}])
    }
    
    
        const handleChangeInput = (id,event, isTranslation) => {

              
              let updatedData = data.map((i) => {
                console.log(id, i.id, id == i.id)
                if(id === i.id) {
                    i[event.target.name] = event.target.value
                    if (isTranslation) {
                        i.translation = event.target.value
                      }
                      else {
                          i.word = event.target.value
                      }
                  }
                  
                  return i;
              })
              setData(updatedData);
        }
    
        const handleSubmit = async (event) => {
            event.preventDefault()
            console.log("input", data)
            // console.log(inputField)
    
            try {
                await axios.patch(`${API_URL}/${city}/wordlist`, data, {withCredentials: true})
                
            
            }
            catch (err){
                console.log("failed")
                }

            navigate("/profile")
    
        }



        const handleRemoveFields = id => {
            const values  = [...data];
            values.splice(values.findIndex(value => value.id === id), 1);
            setData(values);
        }
     

    if (!data){
        return <p>Loading ...</p>
    }

    return (
        <Container>
        <form className={classes.root}  onSubmit={handleSubmit}>
            {
                data.map((elem)=> {
                    
                    return ( 
                        <div>
                        <TextField 
                    name="word"
                    label="Input word"
                    variant="filled"
                    defaultValue={elem.word}
                    onChange={event => handleChangeInput(elem.id, event)}
                    />
                       <TextField 
                    name="translation"
                    label="Input Translation"
                    variant="filled"
                    defaultValue={elem.translation}
                    onChange={event => handleChangeInput(elem.id, event, true)}
                    
                    />
                    <IconButton disabled={data.length === 1} onClick={() => handleRemoveFields(elem.id)}>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton
                    onClick={handleAddFields}
                    >
                    
                        <AddIcon />
                    </IconButton>
                        </div>     

                    )
                })
            }
            <Button
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    >Edit</Button>
        </form>
        </Container>
    )
}

export default EditWord