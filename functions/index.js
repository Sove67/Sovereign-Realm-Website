const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/fetchVideo', (request, response) => {
    let videoList;
    // Run the URL fetcher for each video

    // Update the firestore library with videoList here.

    response.send("Updated Video Library URLs");
});

exports.app = functions.https.onRequest(app);
