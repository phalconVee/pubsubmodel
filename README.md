# HTTP notification server based on Redis PubSub system

A server (or set of servers) will keep track of topics -> subscribers where a topic is a string and a subscriber is an HTTP endpoint. When a message is published on a topic, it should be forwarded to all subscriber endpoints.

The following assumptions have been made on the business logic.

- There is one publisher and could be multiple subscribers.
- The publisher, generating and sending data, and a Subscriber accepting and processing it.
- A subscriber can subscribe to as many topics.
- Topics are treated as the availabelc channels a subscriber could subscribe to.

Endpoints exposed include:

- Publish topic with message body (e.g http://localhost:8000/publish/test1)
- Subscribe to topic (e.g http://localhost:9000/subscribe/test1)

## Requirements

[NodeJS](https://nodejs.org/en/)

Node.js was considered because it feels right at home when incorporating IO and events, which this project requires.

[Redis](https://redis.io/topics/pubsub)

Redis has a PubSub implementation which is a popular inMemory database to cater for a publish/subscribe model. Redis as a service scales and it's reliable and configurable, plus it's easy to get started with.

## Clone this repository

```
git clone git@github.com:phalconVee/pubsubmodel.git
```

Then install the dependencies

```
npm install
```

## Getting Started

To implement locally, you need to have redis installed on your machine.

On MacOS, start the redis server locally via the command

```
brew services start redis
```

After that go into the project directory and find _.env file._ Replace the PUBLISHER_PORT, SUBSCIBER_PORT, and other environment variables inside the file to enable the app to run well.

## Start the server

Navigate into project root directry and run the start-server script

```
./start-server.sh
```

This file starts up subscriber & publisher server in parallel. Allows us to monitor events in the terminal.

## Consideration for Testing

The start-server.sh should be run when the redis-server has already been started. And direction is only give to how to start a redis-server on macOS, please look up the appropriate direction for starting up a redis server on other OS.

Alternatively, you can cd into the individual director ./subscriber and ./publisher and run

```
npm start
```

to boot up the server for the subscriber and publisher separately.

Also, the postman test samples is available within the [test.http](test.http) file.

## Things I didn’t do

Mostly because of time constraint and other factors, I would have loved to;

- Used a class-based approach to building out the model.
- Implement a helper module/middleware to handle generic responses.
