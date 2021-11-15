import express from 'express';

import * as VideoCallController from './videoCallController.js'

const router = express.Router();

router.get("/:id", VideoCallController.getRoom);

export default router;


