# Connect The Dots
### Konica Minolta Coding challenge

Hello!

The client folder and everything in it was provided by Konica Minolta for the purposes of completing this coding challenge.
The server and everything in it was developed by myself.
**The game was designed by Sid Sackson.**

## How to run the project

After downloading the project:

cd into the directory

To start the server locally run:

"yarn start" 

And visit http://localhost:8080/ in your browser

To run tests run:

"yarn test"

## Details about the project

The client simply initializes and then communicates when a node is clicked. It also draws a line from the starting point to the ending point provided by the server.

This means it does not provide any logic regarding how the game is played.

This project uses Node.js v14.15.0 and WebSockets to communicate bi-directionally between the server and the client. 

### Attributions

Yarn package manager

express.js for the server

env-cmd to development utilize development environment variables in the config/dev.env file.

nodemon in development to refresh the application upon file changes.

jest in development to write tests.

ws as my WebSocket library to communcate with the client from the server. 

## Other Notes

**For clarity purposes**, I normally wouldn't include the "config/dev.env" directory to github, as it would normally hold sensitive information like API keys, JWT signatures...etc.

If you would like to visit the project, it is hosted at https://connect-the-dots-km.herokuapp.com/

Give it about 30 seconds to spin up.