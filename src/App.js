import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Box, TextField, Grid, Paper} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Alert } from '@material-ui/lab';

function App() {
  const [grpCnt, setGrpcnt] = useState(1)
  const [memCnt, setMemCnt] = useState(1);
  const [message, setMessage] = useState();
  const [members, setMembers] = useState([""]);
  const [suffledMembers, setSuffledMembers] = useState();

  const groupCountChange = (e) => {
    if(e.target.value !== 1) {
      setMessage("그룹 만들기 귀찮.....");
      return;
    }
    setMessage();
    setGrpcnt(Number(e.target.value));
  }

  const memberCountChange = (e) => {
    if(e.target.value < 1 || e.target.value > 10) {
      setMessage("1~10 입력하세요");
      return;
    }
    setMessage();
    setMemCnt(Number(e.target.value));
    setMembers(Array.apply(null, { length: e.target.value }))
  }

  const memberChange = (e) => {
    const index = Number(e.target.name);
    const copy = members.slice();
    copy[index] = e.target.value
    setMembers(copy)
  }

  const onButtonClick = (e) => {
    const copy = members.slice();
    const suffled = copy
      .map(a => ([Math.random(),a]))
      .sort((a,b) => a[0]-b[0])
      .map(a => a[1])
    setSuffledMembers(suffled);
  }
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Awesome Team Maker
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Grid container direction="row"   alignItems="center" spacing={4}>
            <Grid item>
              <TextField
                id="outlined-number"
                label="그룹수"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={grpCnt}
                variant="outlined"
                onChange={groupCountChange}
                disabled
              />
            </Grid>
          </Grid>
          { message &&
            <Alert>{message}</Alert>
          }
        </Box>
        <Box mt={4}>
          <Paper elevation={3}>
            <Box p={1}>
              <Box textAlign="left">
                <h3>Group1</h3>
              </Box>
              <Box>
                <TextField
                  id="outlined-number"
                  label="사람수"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={memCnt}
                  variant="outlined"
                  onChange={memberCountChange}
                />
              </Box>
              <Box mt={2}>
                <Grid container spacing={1}>
                { members.map( (e, i) => {
                  return (
                    <Grid item xs={6} sm={2}>
                      <TextField
                        id="outlined-number"
                        label="이름"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={members[i]}
                        variant="outlined"
                        onChange={memberChange}
                        name={i}
                      />
                    </Grid>
                  )
                })}
                </Grid>
              </Box>
              <Box mt={4} textAlign="center">
                <Button variant="contained" color="primary" onClick={onButtonClick}>
                  팀나누기
                </Button>
              </Box>
              { suffledMembers &&
                <Box mt={4}>
                  <Grid container direction="row">
                    <Grid xs={6}>
                      <Box textAlign="center">
                        <h3>블루팀</h3>
                        { Array.apply(null, { length: Math.floor(suffledMembers.length/2) }).map( (e, i) => {
                          return(
                            <Box>
                              {suffledMembers[i]}
                            </Box>
                          )
                          
                        })}
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box textAlign="center">
                        <h3>레드팀</h3>
                        { Array.apply(null, { length: suffledMembers.length - Math.floor(suffledMembers.length/2) }).map( (e, i) => {
                          return(
                            <Box>
                              {suffledMembers[Math.floor(suffledMembers.length/2)+i]}
                            </Box>
                          )
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              }
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
    
  );
}

export default App;
