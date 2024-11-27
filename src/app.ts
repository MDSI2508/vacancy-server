import express from 'express';
import { connectToDatabase } from './dbConnection.ts';
import vacancyRoutes from './controllers/router.ts';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const clientApi = process.env.CLIENT_API || "http://localhost:5173";

const startServer = async () => {
    try {
        await connectToDatabase();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({
            origin: clientApi,
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        }));

        app.use('/vacancy', vacancyRoutes);

        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Server error:", error);
        process.exit(1);
    }
};

startServer();
