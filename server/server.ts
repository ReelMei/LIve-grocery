import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 7000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Ready!');
});
app.use('/api/auth', authRouter)

// Error Handle
app.use((error: any, rereq: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).json({message: error.message})
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});