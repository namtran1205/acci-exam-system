import expressAsyncHandler from "express-async-handler";
import { z } from "zod";
import { getAllCertificates, UpdateCertificateStatus } from "../services/certificate.service.ts";

export const getCertificatesController = expressAsyncHandler(async (req, res) => {
    const certificates = await getAllCertificates();
    res.status(200).json(certificates);
});

export const postCertificatesController = expressAsyncHandler(async (req, res) => {
    const schema = z.object({
        id: z.number(),
    });

    const body = schema.safeParse(req.body);
    if (body.error) {
        res.status(400).json({ message: "Invalid body" });
        return;
    }

    res.status(201).json(await UpdateCertificateStatus(body.data.id));
});

