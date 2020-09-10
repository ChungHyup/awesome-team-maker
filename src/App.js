import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Box, TextField, Grid, Paper, Dialog, DialogContent, FormHelperText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Alert } from '@material-ui/lab';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import html2canvas from 'html2canvas';

function App() {
  const [grpCnt, setGrpcnt] = useState(1)
  const [memCnt, setMemCnt] = useState(1);
  const [message, setMessage] = useState();
  const [members, setMembers] = useState([""]);
  const [suffledMembers, setSuffledMembers] = useState();
  const [canvas, setCanvas] = useState(false);

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

  const captureBtnClick = (e) => {
    const template = document.querySelector("#dialogContent");
    console.log(template);
    html2canvas(document.querySelector("#result-panel-paper")).then(canvas => {
      const data = canvas.toDataURL();
      setCanvas(data);
    });
  }

  const canvasClose = (e) => {
    setCanvas();
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
        <Dialog open={canvas?true:false} onClose={canvasClose} maxWidth="lg" fullWidth={true}>
          <DialogContent id="dialogContent">
            <img style={{ width: "100%" }} src={canvas}/>
          </DialogContent>
        </Dialog>
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
                <Box id="result-panel" mt={4}>
                  <Paper id="result-panel-paper">
                    <Box p={2}>
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
                  </Paper>
                  
                  <Box textAlign="center">
                    <Button onClick={captureBtnClick}>
                          <CameraAltIcon fontSize="large"/>
                    </Button>
                    <FormHelperText style={{ textAlign: "center" }}>버튼을 누르면 img 파일로 생성됩니다. '다른 이름으로 저장'을 통해 다운로드 가능</FormHelperText>
                  </Box>  
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
