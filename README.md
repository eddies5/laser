Laser
=====

Cat-Laser is a web-controlled laser point. This laser is located in a room filled with cats. Users donate money to control the laser and all of the donations goes back to the shelters the cats are at.

## To Think about

1. have a count of how many people are watching the stream

2. remove old jobs from redis when shutting down

3. thermometer type thing that reaches a limit throws catnip

## How to Start

1. start redis (see below)

2. node web/app.js

3. node arduino/arduinoApp.js

## Redis Stuff

1. How to start redis: '$ redis-server'

2. How to stop redis: '$ redis-cli shutdown'
