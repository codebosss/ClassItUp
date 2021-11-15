import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { sendvideodata } from '../../actions/pitchAnalysis'
import { Typography, TextField, Button, Grid, CircularProgress } from '@material-ui/core';

import useStyles from './styles';

import { ThemeProvider } from '@material-ui/core/styles';
import headlineTheme from '../fonts/FontThemes';


const PitchAnalysis = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const [formData, setFormData] = useState({ meetingName: "", fileName: "video.mp4", file: null, url: '' })
    const [roomID, setRoomID] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [selectedFileName, setSelectedFileName] = useState("");
    const [isJoinedRoom, setJoinedRoom] = useState(false);
    const [iswhiteboardOpen, setWhiteboardOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('meetingName', formData.meetingName)
        console.log(formData.meetingName, "iiiiiiiiiiiiiiiii")
        data.append('fileName', formData.fileName)
        data.append('file', formData.file);
        data.append('url', formData.url)
        dispatch(sendvideodata(data, history))
        setIsSubmit(true)
    }

    const handleRoomSubmit = (e) => {
        // const data = classFormData;
        // console.log(data);
        // dispatch(joincall(data))
        if (!isJoinedRoom) {
            window.open(`/videoCall/${roomID}`, '_blank').focus();
            setJoinedRoom(true);
        } else {
            setJoinedRoom(false);
        }
    }

    const handleClassChange = (e) => {
        setRoomID(e.target.value)
    }

    const handleOpenWhiteboard = (e) => {
        setWhiteboardOpen(true);
        window.open('/whiteBoard', '_blank').focus();
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleUploadClick = (event) => {
        var newFile = (event.target.files[0] === undefined) ? null : event.target.files[0];
        var newFileName = (event.target.files[0] === undefined) ? "" : event.target.files[0].name;
        setFormData({ ...formData, file: newFile, fileName: newFileName });
        setSelectedFileName(newFileName);
    };

    const spinner = <div style={{ alignContent: 'center', textAlign: 'center', justifyContent: 'center', marginTop: '8rem' }}>
        <CircularProgress />
        <Typography variant="body1" style={{ display: 'block', textAlign: 'center', marginTop: '2rem' }}>Analyzing Video!</Typography>
    </div>
    return (
        <>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={4} className={classes.leftGrid}>
                    {isSubmit ? spinner :
                        <div className={classes.paper}>
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <TextField className={classes.input} name='meetingName' value={formData.meetingName} onChange={handleChange} variant="outlined" required fullWidth label='Meeting Name' />
                                <TextField className={classes.input} name='url' value={formData.url} onChange={handleChange} variant="outlined" fullWidth label='URL' />
                                <Typography style={{ marginLeft: '13rem', fontSize: '30px' }} className={classes.submit} fullWidth>OR</Typography>

                                <>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        style={{ display: 'none' }}
                                        id="contained-button-file"
                                        onChange={handleUploadClick}

                                    />
                                    <label htmlFor="contained-button-file" className={classes.input}>
                                        <Button variant="contained" color="primary" component="span">
                                            Upload
                                        </Button>

                                    </label>
                                    <input type='hidden' name="fileName" value={formData.fileName} onChange={handleChange} ></input>
                                    {selectedFileName === "" ? <Typography component="span" className={classes.input}>No File Chosen</Typography> :
                                        <Typography component="span" className={classes.input}>{selectedFileName}</Typography>}
                                </>
                                {formData.url && formData.fileName !== "video.mp4" ? (<Button style={{ marginLeft: '0.5rem' }} variant='contained' color='primary' size='large' className={classes.submit} fullWidth disabled> Submit </Button>) : (<Button style={{ marginLeft: '0.5rem' }} variant='contained' color='primary' size='large' type='submit' className={classes.submit} fullWidth>Submit</Button>)}

                            </form>
                        </div>
                    }
                </Grid>
                <Grid item xs={8} className={classes.rightGrid}>
                    <ThemeProvider theme={headlineTheme}>
                        <Typography component="h1" variant="h5" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Interaction Analysis
                        </Typography>
                    </ThemeProvider>
                    <div className={classes.text}>
                        <Typography variant="h6">
                            This service can be used to analyze a pre recorded classroom session to provide additional insights including sentiment, emotions and many more traits. Please enter video url(YouTube) OR upload a local video to get insights.
                        </Typography>
                    </div>
                    <div>
                        <form className={classes.classForm}>
                            <ThemeProvider theme={headlineTheme}>
                                <Typography component="h1" variant="h5" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    Join Class
                                </Typography>
                            </ThemeProvider>
                            <TextField className={classes.input} name='className' value={formData.className} onChange={handleClassChange} variant="outlined" required fullWidth label='Class Name' />
                            {!isJoinedRoom ? 
                                <Button variant="contained" color="primary" component="span" onClick={handleRoomSubmit}>
                                    Join Room
                                </Button> : ''
                            }

                            {console.log(isJoinedRoom)}
                            {
                                isJoinedRoom && iswhiteboardOpen ?
                                    <>
                                
                                    </> :
                                    <>
                                        <Button variant="contained" color="primary" style={{ marginLeft: '5px' }} component="span" onClick={handleOpenWhiteboard}>
                                            Open Whiteboard
                                        </Button>
                                    </>
                            }
                        </form>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default PitchAnalysis;