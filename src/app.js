import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar';

function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}

const App = () => {
    const [selectedFile, setSelectedFile] = React.useState({
        file: null,
        duration: 0,
        size: 0,
    });

    const onChangeHandler = (event) => {
        const file = event.target.files[0];
        new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function () {
                var aud = new Audio(reader.result);
                aud.onloadedmetadata = function () {
                    resolve(convertHMS(aud.duration));
                };
            };
            reader.readAsDataURL(file);
        })
            .then((duration) => {
                setSelectedFile({ file, duration, size: file?.size });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log('selectedFile', selectedFile);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const url = "https://upcast.work/api/v1/videos/upload";
        const form = document.querySelector("form");

        formData.append('channelId', 1);
        formData.append('name', "123");
        formData.append('videofile', selectedFile.file);

        fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer 60f95c29153dd51809d1bd3249acbd58b988d9da',
                'Access-Control-Allow-Origin': '*',
                // 'X-Upload-Content-Length': '200000000',
                'Access-Control-Allow-Headers': '*',
            },
        })
            .then((response) => {
                console.log("res => ", response);
            })
            .then((data) => {
                console.log("data => ", data);
            });
    };

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1 }} m='20px'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Upload a file: <br />
                        <br />
                        <input type="file" name="file" onChange={onChangeHandler} />
                    </label>
                    <br />
                    <br />
                    <button type="submit">Upload</button>
                </form>
            </Box>
        </>
    )
}

export default App;

