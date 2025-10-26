"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.default.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientService_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    console.log(`Finding patient with id ${req.params.id}`);
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', newPatientParser, (req, res) => {
    console.log(`Saving patient!`);
    const addedPatient = patientService_1.default.addPatient(req.body);
    res.json(addedPatient);
});
router.use(errorMiddleware);
exports.default = router;
