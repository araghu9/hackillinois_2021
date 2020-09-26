import React, {useState, useEffect} from 'react';
import { Card, Typography, CardActionArea, CardContent, CardHeader, CardMedia, Grid, AppBar, Toolbar, Tab, Tabs, Icon } from '@material-ui/core'
import moment from 'moment';
import 'moment-timezone';
import logo from './logo.svg';
import './App.css';

var days=["Friday 8/7", "Saturday 8/8", "Sunday 8/9", "Monday 8/10", "Tuesday 8/11", "Wednesday 8/12", "Thursday 8/13", "Friday 8/14", "Saturday 8/15"];

function App() {
  let [events, setEvents]=useState([]);

  useEffect(()=>{
    fetch('https://api.hackillinois.org/event/')
    .then(res => res.json())
    .then(json => {
      setEvents(json.events)
    })
  }, [])
  events.sort(function (a,b){return a.startTime-b.startTime});
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{color: "orange"}}>HackIllinois</Typography>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Tabs>
              <Tab label="Schedule"/>
              <Tab label="Maps"/>
              <Tab label="Mentors"/>
              <Tab label="Prizes"/>
              <Tab label="Travel"/>
            </Tabs>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography variant="h2" style={{color: "orange"}}>Schedule</Typography>
        {events.map(event => (
          <div>
              <Grid item>
                <Card className="card" style={{background: "transparent"}}>
                    <CardActionArea>
                      <CardHeader title={event.name} style={{color: "white"}}/>
                      <CardContent>
                        <Typography variant="subtitle1" style={{color: "white"}}>{event.description}</Typography>
                        <Typography variant="h6" style={{color: "white"}}>{getDay(event.startTime)} {getTime(event.startTime)}</Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
              </Grid>
          </div>
        ))}
      <AppBar position="static"></AppBar>
    </div>
  );
}
function getTime(time){
  return moment.unix(time).tz('America/Chicago').format('h:mm a');
}
function getDay(time){
  const d = moment.unix(time).tz('America/Chicago').day();
  return days[(d + 2) % 9];
}
export default App;
