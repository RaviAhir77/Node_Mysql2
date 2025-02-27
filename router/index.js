import userRouter from "./userRouter.js"
import distanceRouter from "./distanceRoute.js"

const loadRoutes = (app) => {
    app.use('/',userRouter)
    app.use('/',distanceRouter)
}

export default loadRoutes