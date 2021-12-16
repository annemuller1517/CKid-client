import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';

//same as above and you can write is all on one line
import {Container} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useContext} from "react";
import { UserContext } from "../context/app.context";


const theme = createTheme();

function Profile() {

    
    let {user, setUser} = useContext(UserContext)


    const {error} = useContext(UserContext)
   

    const handleEditProfile = async (event) => {
        event.preventDefault()
        let formData = new FormData()
	        formData.append('imageUrl', event.target.image.files[0])
	        //uploading the image to cloudinary first
	        let imgResponse = await axios.post(`${API_URL}/upload`, formData)
        let newUser = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            image: imgResponse.data.image 
        }
        
        let response = await axios.patch(`${API_URL}/edit`, newUser, {withCredentials: true})
        setUser(response.data)
        
        // console.log(user)
    }

    if (!user){
        return <p>loadong...</p>
    }

    console.log(user)

    return (
        <div style={{backgroundColor: "#F8F7F3", height:"100vh"}}>
            <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Profile {user.username}
          </Typography>
          <Box component="form" onSubmit={handleEditProfile} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                // defaultValue={user.username}
                helperText={error ? error : ""}
                error={error ? true: false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={error ? error : ""}
              error={error ? true: false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={error ? error : ""}
              error={error ? true: false}
            />
            <TextField
              margin="normal"
              fullWidth
              name="image"
              label="Profile Image"
              type="file"
              id="image"
              accept="image/png, image/jpg" 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </div>
    )
}

export default Profile
