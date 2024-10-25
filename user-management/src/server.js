import app from './app.js';
import {port} from './config/index.js'
app.listen(port, () => {
  console.log(`User Management Service running on port ${port}`);
});