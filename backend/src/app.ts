
// in {} , These are TypeScript types, not runtime objects.
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import healthRouter from './routes/health.route.js';
import timeFormat from './utils/DT_formater.js';

const app = express();

// Standard middlewares
app.use(cors());
app.use(express.json());

// Simple dev request logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${timeFormat()}] ${req.method} ${req.url}`);
  next(); //! continue to the next middleware
});

// Mount routes
app.use('/api', healthRouter);

// Handle undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Resource ${req.method} ${req.url} not found`,
  });
});

// Global Exception Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('💥 Global Error Handler caught exception:', err);
  
  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred on the server.',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message, 
      stack: err.stack 
    }),
  });
});

export default app;
