import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './home.css';

const Home = () => {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(1.0);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Fetch available voices when the component mounts
  useEffect(() => {
    const synthesis = window.speechSynthesis;
    const handleVoicesChanged = () => {
      const voices = synthesis.getVoices();
      setVoices(voices);
      if (voices.length > 0 && !selectedVoice) {
        setSelectedVoice(voices[0]);
      }
    };
    handleVoicesChanged();
    synthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      synthesis.onvoiceschanged = null;
    };
  }, [selectedVoice]);

  // Function to handle text change
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Function to speak the text
  const speakText = () => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed; // Set the speech rate
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      synthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  // Function to handle speed change
  const handleSpeedChange = (event) => {
    setSpeed(parseFloat(event.target.value));
  };

  // Function to handle voice selection
  const handleVoiceChange = (event) => {
    const selectedVoiceIndex = event.target.value;
    setSelectedVoice(voices[selectedVoiceIndex]);
  };

  return (
    <>
      <p>Hello everyone, we are here with you to help you in your writing tasks.</p>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-static"
          label="Text to speak"
          multiline
          rows={4}
          value={text}
          onChange={handleTextChange}
        />
      </Box>
      <div className="action">
        <button onClick={speakText}>Speak</button>
      </div>
      <Box sx={{ minWidth: 120, mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="playback-speed-label">Playback speed</InputLabel>
          <Select
            labelId="playback-speed-label"
            id="playback-speed"
            value={speed}
            onChange={handleSpeedChange}
          >
            <MenuItem value={0.75}>0.75x</MenuItem>
            <MenuItem value={1.00}>1.00x</MenuItem>
            <MenuItem value={1.25}>1.25x</MenuItem>
            <MenuItem value={1.50}>1.50x</MenuItem>
            <MenuItem value={1.75}>1.75x</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200, mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-voice-label">Select Voice</InputLabel>
          <Select
            labelId="select-voice-label"
            id="select-voice"
            value={selectedVoice ? voices.indexOf(selectedVoice) : ''}
            onChange={handleVoiceChange}
          >
            {voices.map((voice, index) => (
              <MenuItem key={index} value={index}>{voice.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <hr />
      <div>
        <h1>Login Success Page</h1>
        <Link to='/login' className="btn btn-light my-5">Logout</Link>
      </div>
    </>
  );
};

export default Home;
