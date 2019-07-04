# VEERUM code challenge
### Francisco Berridi

## Pre-requisites
* This app runs in anglular 7
* [npm](https://www.npmjs.com/get-npm)
* angular-cli: npm install -g @angular/cli@7.3.9

## How to run it
* `cd veerum_code_challenge`
* modify the `.env` to simulate the required environment variables _*note: be mindful of the provided GooleAPI key, it will be disabled after it reaches the maximum calls for the trial)*_
* Please use the `geo-location-buffer.json` file as it will save API calls
* run `npm install` to install the dependecies.
* run `npm run start` to compile and start the server
* Navigate to `http://localhost:<PORT>/` to access the app

## NOTES
The `TLS` setup is been left to the container, no SSL configuration was added.
