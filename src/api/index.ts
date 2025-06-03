// api/index.ts

import app from '../app';
import { createServer } from 'http';

module.exports = (req: any, res: any) => {
  const server = createServer(app);
  return server.emit('request', req, res);
};
