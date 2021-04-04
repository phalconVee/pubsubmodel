import express from 'express';
import redis from 'redis';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();

const API_PORT = 9000;

const sub = redis.createClient();

sub.on('message', (channel, message) => {
  console.log(
    "Message '" + message + "' on channel '" + channel + "' arrived!",
  );
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.post('/subscribe/:topic', (req, res) => {
  const topic = req.params.topic;
  const { url } = req.body;

  try {
    sub.subscribe(topic);

    res.status(200).send({
      status: true,
      data: {
        url: url,
        topic: topic,
      },
    });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).send({
      status,
      message,
    });
  }
});

app.listen(API_PORT, () =>
  console.log(`Subscriber server listening on port ${API_PORT}`),
);
