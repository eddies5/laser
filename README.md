Laser
=====

1. make the damn thing work
2. make improvements

# Improvements

1. queue system

  a. queue placement depends on how much you donate

  b. this way we can even let people who don't pay use the laser

## To Think about

1. maybe use singleton object for laser control

2. have a count of how many people are watching the stream

3. remove old jobs from redis when shutting down

## Done

1. have a 'get on queue' method

2. data structure for holding connections thoughts

	a. want to be like queue: FIFO

	b. want easy removal for dropped connections

	c. this sounds like a hashmap

	d. I have used a queue and a map to hold the indexes of connections.

3. The setInterval queue.toArray() seems to work except it will continue to work on the last element in the queue even though it is not supposed to. It did not work the first time, other times it did work. Find the special case.

## Redis Stuff

1. How to start redis: '$ redis-server'

2. How to stop redis: '$ redis-cli shutdown'
