import auth from "./authRoutes"
// import product from "./productRoutes"

const router = (app) => {
  // Authentication routes 
  app.use("/api/v1", auth)
}

export default router