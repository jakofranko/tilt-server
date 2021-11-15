## Installation

This web application requires Node.js to run (latest stable version).

After cloning this repo to your local machine run

`npm install`

After all the dependencies are installed, run

`npm start`

## Usage

Figure out the IP address of the machine that you intend to run the tilt-server upon. Once you know this IP address, then input `<your local network IP address>:3000/tilt-data` as the URL within the Tilt app. The Tilt app should then start sending post requests to the web server, and you should see the headers and request body logging to the console.

Making a GET request to `<your local network IP address>:3000/tilt-data` should return an array of all beer data.

Making POST requests to the tilt-data endpoint will save the data to the tilt_data table. It must have this format:

```typescript
type TiltEvent = {
    "parameter": {
        "Beer": string,
        "Temp": number,
        "SG": number,
        "Color": string,
        "Comment": string,
        "Timepoint": number
    }
}
```

Navigating to `<your local network IP address>:3000/beers` will present a list of your beers by name. Clicking on a beer will take you to a graph of their tilt data.

Right now, the graph just shows temperature across time, but we could visualize other data points, like the SG.

## TODOs

- solidify actual incoming data structure from the tilt mobile application, make appropriate changes
- decide what data to show on the graph, and how best to do it
- probably need to coerce the timepoint datum into the right format (i.e., it's probably not a timestamp)
- make it pretty + add some basic nav
- clean up DB queries to all be in the db file, or maybe even refactor into a models architecture (a la https://stackabuse.com/a-sqlite-tutorial-with-node-js/ perhaps)
- elementary CRUD functionality to allow for deleting anomalous data entries
