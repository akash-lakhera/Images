import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Divider } from "@mui/material";



export default function Login() {
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {//submit username and password 
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formval = {
      username: data.get("username"),
      password: data.get("password"),
    };
    fetch("/api/login", {
      body: JSON.stringify(formval),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) navigate("/dash", { replace: true });
        else navigate("/login");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="name"
                label="Username"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12} sx={{justifyItems:"center"}}>
              <RouterLink style={{textAlign:"center",width:"100%",display:"block"}} to="/register" variant="body2">
                Don't have an account? Sign up
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
       <Box sx={{height:"2px",backgroundColor:"rgba(0,0,0,0.5)",width:"100%"}} marginTop={4}>

       </Box>
        <Box>
        <a href="/google/auth">
        <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login Using Google
          </Button>
          </a>
         
        </Box>
      </Box>
    </Container>
  );
}
