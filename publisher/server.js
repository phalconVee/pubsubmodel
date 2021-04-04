import express from 'express';
import redis from 'redis';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import helmet from 'helmet';

const app = express();

const API_PORT = 8000;

let pub = redis.createClient();

pub.on('connect', function () {
  console.log('Connected to Redis...');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.post('/publish/:topic', (req, res) => {
  const topic = req.params.topic;
  const topicId = uuidv4();
  const { message } = req.body;

  try {
    pub.publish(
      topic,
      JSON.stringify({
        topicId,
        message,
      }),
    );

    res.status(200).send({
      status: true,
      data: {
        status: 'published',
        msg: `${topic} event published`,
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
  console.log(`Publisher server listening on port ${API_PORT}`),
);
