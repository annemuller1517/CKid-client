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


function SignUp(props) {
    const {error} = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignUp = async (event) => {
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

        await axios.post(`${API_URL}/signup`, newUser, {withCredentials: true})
        navigate("/signin")
    
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{backgroundColor: "#F8F7F3", height:"100vh"}}>
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
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
            //   autoComplete="current-image"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin" >
                  {"Already have an account? Sign In instead"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp