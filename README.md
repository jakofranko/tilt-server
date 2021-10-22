## Installation

This web application requires Node.js to run (latest stable version).

After cloning this repo to your local machine run

`npm install`

After all the dependencies are installed, run

`npm start`

## Usage

Figure out the IP address of the machine that you intend to run the tilt-server upon. Once you know this IP address, then input `<your local network IP address>:3000/tilt-data` as the URL within the Tilt app. The Tilt app should then start sending post requests to the web server, and you should see the headers and request body logging to the console.
