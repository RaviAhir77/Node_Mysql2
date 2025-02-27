import {getDistanceBetweenCities,DistanceCustom} from '../controllers/distance.js'
import express from 'express';
const distanceRouter = express.Router()


distanceRouter.post('/distance-custom',DistanceCustom)
distanceRouter.post('/api-distance',getDistanceBetweenCities);

export default distanceRouter;