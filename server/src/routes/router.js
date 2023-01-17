import auth from "./authRoutes"

const router = (app) => {
  // Authentication routes 
  app.use("/api/v1", auth)
}

export default router