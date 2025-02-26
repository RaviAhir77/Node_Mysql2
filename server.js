import express from 'express';
import './config/db.js'
import loadRoutes from './router/index.js';

const app = express()
app.use(express.json())

loadRoutes(app)

app.listen(3000,() => {
    console.log('server is a running on 3000')
})