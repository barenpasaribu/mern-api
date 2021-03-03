import loginRouter from './v1/auth/loginRouter'
import registerRouter from './v1/auth/registerRouter'
import postRouter from './v1/blog/blogRouter'

const routes = (app) => {
    app.use(loginRouter)
    app.use(registerRouter)
    app.use(postRouter)
}

export default routes