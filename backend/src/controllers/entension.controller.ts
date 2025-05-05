import expressAsyncHandler from "express-async-handler";
import { saveSpecialExtension } from "../services/extension.service";
import { updateEnrollmentSchedule } from "../services/enrollments.service";
import { z } from "zod";


export const postSpecialExtensionController = expressAsyncHandler (async (req, res)=> {
    const schema = z.object( {
        enrollmentId: z.coerce.number().min(1),
        proofType: z.string(),
        proofInfo: z.string(),
        scheduleId: z.coerce.number().min(1),
    });
    const body = schema.safeParse(req.body);
    if (body.error) {
        res.status(400).json({message: "Invalid body"});
        return;
    }
    const result =  await Promise.all([
        saveSpecialExtension(body.data.enrollmentId, body.data.proofType, body.data.proofInfo),
        updateEnrollmentSchedule(body.data.enrollmentId, body.data.scheduleId)
    ])  
    res.status(200).json(result);
});