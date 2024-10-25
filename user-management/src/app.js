import express from 'express';
import {config} from './config/index.js'
const app = express();



app.listen(config.port, () => {
    console.log(`App is listening on port ${config.port}`)
})