import userRouter from "./userRouter.js"
import authRoute from "./authRouter.js"
import distanceRouter from "./distanceRoute.js"

const loadRoutes = (app) => {
    app.use('/',userRouter)
    app.use('/',authRoute)
    app.use('/',distanceRouter)
}

export default loadRoutes