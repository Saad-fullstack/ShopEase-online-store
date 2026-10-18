import express from "express"
const app = express()

import dotenv from "dotenv"
import Connection from "./db/conn.js"
import productRouter from "./routes/productsRoutes.js"
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

await Connection()
const port = process.env.PORT

app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    OptionsSuccessStatus: 200
} 

app.use(cors(corsOptions))
app.use(express.json())
app.use("/api/v1/product", productRouter)
app.use("/api/v1/user", userRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Product API link => http://localhost:8000/api/v1/product/create-product
// User API link => http://localhost:8000/api/v1/user/register-user