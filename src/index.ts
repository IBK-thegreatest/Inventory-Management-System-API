import express, { Request, Response, NextFunction } from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import productRoutes from "./routes/product.routes"
import warehouseRoutes from "./routes/warehouse.routes"
import supplierRoutes from "./routes/supplier.routes"
import inventoryRoutes from "./routes/auth.routes"
import { CorsOptions } from "./interfaces/cors.interface"
import HttpException from "./exceptions/HttpException"

const app = express()
const corsOptions: CorsOptions = {
    origin: "http://localhost:5000/",
    optionsSuccessStatus: 200
}
app.use(express.json())
app.use(compression())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors(corsOptions))
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/warehouses", warehouseRoutes)
app.use("/api/v1/suppliers", supplierRoutes)
app.use("/api/v1/inventories", inventoryRoutes)
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})