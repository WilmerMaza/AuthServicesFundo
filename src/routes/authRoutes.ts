// src/routes/authRoutes.ts
import { Router } from 'express';
import authRoutes from '../api/auth/authRoutes';


const router = Router();

router.use('/api/auth', authRoutes);


export default router;
