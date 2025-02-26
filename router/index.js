import userRouter from "./userRouter.js"


const loadRoutes = (app) => {
    app.use('/',userRouter)
}

export default loadRoutes