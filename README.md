# connect-the-dots_km-coding-challenge

Hello!

The client folder and everything in it was provided by Konica Minolta for the purposes of completing this coding challenge.
The server and everything in it was developed by me, TJVaughn.

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

This project uses Node.js and WebSockets to communicate bi-directionally between the server and the client. 

I used yarn as my package manager
I used express to serve the client/public directory.
I used env-cmd to development utilize development environment variables in the config/dev.env file.
I used nodemon in development to refresh the application upon file changes.
I used jest in development to write tests.
Finally I used ws as my WebSocket library to communcate with the client from the server. 

