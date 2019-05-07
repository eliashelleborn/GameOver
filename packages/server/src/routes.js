import express from 'express';

const router = express.Router();

router.route('/status').get((req, res) => {
  res.send('Server is up and running!');
});

export default router;
