const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Serve the static files
app.use(express.static('public'));

// Load Fabric.js
const fabric = require('fabric').fabric;

// Load the shapes data from the JSON file
const shapes = require('./shapes.json');

// Create a Fabric.js canvas object and set its dimensions
const canvas = new fabric.Canvas('canvas', { width: 400, height: 400 });

// Loop through each file in the shapes data
Object.keys(shapes).forEach(filename => {
  // Loop through each shape in the file and create a Fabric.js path object for it
  shapes[filename].forEach(shape => {
    const path = new fabric.Path(shape.path, {
      fill: shape.fill,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth
    });

    // Add a custom property to the path object to track the filename it came from
    path.filename = filename;

    // Add a click handler to the path object
    path.on('mousedown', event => {
      console.log(`Clicked shape from ${path.filename}`);
    });

    // Add the path object to the canvas
    canvas.add(path);
  });
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
