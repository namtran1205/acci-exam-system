import express from "express";
import { getCertificatesController, postCertificatesController } from "../controllers/certificate.controller";

const router = express.Router();

router.get("/", getCertificatesController);
router.post("/details", postCertificatesController);

export { router as certificatesRouter };