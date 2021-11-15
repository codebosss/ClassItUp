import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { joincall } from "../../actions/videoCall";
import { Button, Typography } from '@material-ui/core';

const VideoCall = ({ match }) => {
  console.log(window.location.href.split("/")[4])
  const id = window.location.href.split("/")[4];
  const [isStartRecording, setStartRecording] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const domain = "https://classly.daily.co/";
    dispatch(joincall(id))

    let res = {};
    res['status'] = 200;
    if (res.status === 200) {
      const script = document.createElement("script");
      script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100vh",
              border: "0",
              zIndex: 9999,
              "overflow-y": 'scroll'
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;

      document.body.appendChild(script);
      let start = document.getElementById('start'),
        stop = document.getElementById('stop'),
        mediaRecorder;
      let stream;
      start.addEventListener('click', async function () {
        stream = await recordScreen();
        let mimeType = 'video/mp4';
        mediaRecorder = createRecorder(stream, mimeType);
        let node = document.createElement("p");
        document.body.appendChild(node);
      })

      stop.addEventListener('click', function () {
        mediaRecorder.stop();
        let node = document.createElement("p");
        stream.getTracks().forEach(track => track.stop())
        document.body.appendChild(node);
      })

      async function recordScreen() {
        return await navigator.mediaDevices.getDisplayMedia({
          audio: true,
          video: { mediaSource: "screen" }
        });
      }

      function createRecorder(stream, mimeType) {
        // the stream data is stored in this array
        let recordedChunks = [];

        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };
        mediaRecorder.onstop = function () {
          saveFile(recordedChunks);
          recordedChunks = [];
        };
        mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
        return mediaRecorder;
      }

      function saveFile(recordedChunks) {

        const blob = new Blob(recordedChunks, {
          type: 'video/mp4'
        });
        let filename = window.prompt('Enter file name'),
          downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${filename}.mp4`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        URL.revokeObjectURL(blob); // clear from memory
        document.body.removeChild(downloadLink);
      }
    }
    // })
    // .catch((err) => console.log(err));
  }, [id]);

  const handleStartRecording = (e) => {
    setStartRecording(!isStartRecording)
  }

  return (
    <div style={{margin: '2rem auto', display: 'flex', justifyContent: 'center'}}>
      <Button variant="contained" color="primary" style={{marginRight: '1rem'}} onClick={handleStartRecording} disabled={isStartRecording} align="center" id="start">Start Screen Recording</Button>
      <Button variant="contained" color="error" style={{marginLeft: '1rem'}} onClick={handleStartRecording} disabled={!isStartRecording} align="center" id="stop">Stop Screen Recording</Button>
    </div>
  )
}

export default VideoCall