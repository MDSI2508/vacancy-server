import { Request, Response } from "express";
import { Vacancy } from "../types/vacancy.ts";
import { VacancyService } from "../services/vacancy-service.ts";
import { VacancySchemaValidate } from "../models/schema.ts";

export class VacancyController {
    public static async createVacancy(req: Request, res: Response): Promise<void> {
        const data: Vacancy = {
            companyName: req.body.companyName,
            vacancy: req.body.vacancy,
            salaryRange:req.body.salaryRange,
            status: req.body.status,
            note: req.body.note,
        };

        const { error, value } = VacancySchemaValidate.validate(data);

        if (error) {
            res.status(400).send({ message: error.message });
        } else {
            try {
                const vacancy = await VacancyService.createVacancy(value);
                res.status(201).send(vacancy);
            } catch (err) {
                res.status(500).send({ message: "Ошибка создания вакансии", error: err });
            }
        }
    }

    public static async getAllVacancies(req: Request, res: Response): Promise<void> {
        try {
            const vacancies = await VacancyService.getAllVacancies();

            res.status(200).send(vacancies);
        } catch (err) {
            res.status(500).send({ message: "Ошибка получения списка вакансий", error: err });
        }
    }

    public static async getVacancyById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const vacancy = await VacancyService.getVacancyById(id);

            if (!vacancy) {
                res.status(404).send({ message: `Вакансия с ID ${id} не найдена` });
            } else {
                res.status(200).send(vacancy);
            }
        } catch (err) {
            res.status(500).send({ message: `Ошибка получения вакансии с ID ${id}`, error: err });
        }
    }

    public static async updateVacancy(req: Request, res: Response): Promise<void> {
        console.log('updateVacancy controller', req.body);
        const { id } = req.params;
        const updates: Partial<Vacancy> = req.body;

        try {
            const updatedVacancy = await VacancyService.updateVacancy(id, updates);

            if (!updatedVacancy) {
                res.status(404).send({ message: `Вакансия с ID ${id} не найдена` });
            } else {
                res.status(200).send(updatedVacancy);
            }
        } catch (err) {
            res.status(500).send({ message: `Ошибка обновления вакансии с ID ${id}`, error: err });
        }
    }

    public static async deleteVacancy(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const isDeleted = await VacancyService.deleteVacancy(id);

            if (!isDeleted) {
                res.status(404).send({ message: `Вакансия с ID ${id} не найдена` });
            } else {
                res.status(200).send({ message: `Вакансия с ID ${id} успешно удалена` });
            }
        } catch (err) {
            res.status(500).send({ message: `Ошибка удаления вакансии с ID ${id}`, error: err });
        }
    }
}