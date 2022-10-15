import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';

import { useTheme } from '@mui/material/styles';
import { useState } from 'react';


const titleVariants = {
  [true]: 'h3',
  [false]: 'h1',
}


export default function Header({ videoPresent, setVideoPresent }) {
  const theme = useTheme();

  return (
    <Paper sx={{
      display: 'flex',
      flexDirection: videoPresent ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: videoPresent ? '10vh' : '100vh',
    }}>
      <Title variant={titleVariants[videoPresent]} />
      <Search hidden={!videoPresent} />
      <UploadButton videoPresent={videoPresent} setVideoPresent={setVideoPresent} />
    </Paper>
  )
}


function Title({ variant }) {
  const theme = useTheme();

  return (
    <Stack direction="row">
      <Box
        component="img"
        sx={{
          height: theme.typography[variant].fontSize,
        }}
        alt="logo"
        src="https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png"
      />
      <Typography
        variant={variant}
        noWrap
        component="a"
        sx={{
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: theme.palette.text.primary,
          userSelect: 'none',
        }}
      >
        VSearch
      </Typography>
    </Stack>
  )
}

function Search({ hidden }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <form
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      hidden={hidden}
    >
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter a search query"
        variant="outlined"
        placeholder="Search..."
        size="small"
        sx={{
          width: '50vw',
          marginLeft: '5vw',
        }}
      />
      <IconButton
        type="submit"
        aria-label="search"
        sx={{
          marginRight: '5vw',
        }}
      >
        <SearchIcon />
      </IconButton>
    </form>
  )
}

function UploadButton({ videoPresent, setVideoPresent }) {
  const theme = useTheme();

  return (
    <Button
      size={videoPresent ? 'small' : 'large'}
      variant={videoPresent ? 'outlined' : 'contained'}
      sx={{
        paddingLeft: videoPresent ? '1%' : '10%',
        paddingRight: videoPresent ? '1%' : '10%',
        marginTop: videoPresent ? '0%' : '4%',
      }}
      component="label"
    >
      <Typography
        variant={videoPresent ? 'h6' : 'h4'}
      >
        {videoPresent ? 'Upload' : 'Upload a video to start'}
        <input
          hidden
          accept="video/*"
          type="file"
          onChange={(e) => {
            axios.post('localhost:5000/upload')
            console.log(e.target.files[0])
            setVideoPresent(true)
          }}
        />
      </Typography>
    </Button>
  )
}
