import { Router } from 'express';
import {VacancyController} from "./vacancy.js";


const vacancyRoutes = Router();

vacancyRoutes.post('/create', VacancyController.createVacancy);
vacancyRoutes.get('/', VacancyController.getAllVacancies);
vacancyRoutes.get('/:id', VacancyController.getVacancyById);
vacancyRoutes.patch('/update/:id', VacancyController.updateVacancy);
vacancyRoutes.delete('/delete-vacancy/:id', VacancyController.deleteVacancy);

export default vacancyRoutes;