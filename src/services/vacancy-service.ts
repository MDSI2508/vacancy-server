import {vacancyModel} from "../models/schema.ts";
import {Vacancy} from "../types/vacancy.ts";

export class VacancyService {

    public static async createVacancy(vacancyData: Vacancy): Promise<Vacancy> {
        const vacancy = new vacancyModel(vacancyData);
        return await vacancy.save();
    }

    public static async getAllVacancies(): Promise<Vacancy[]> {
        try {
            const vacancies = await vacancyModel.find();

            return vacancies;
        } catch (error) {
            console.error("Error in getAllVacancies:", error);
            throw error;
        }
    }

    public static async getVacancyById(id: string): Promise<Vacancy | null> {
        const vacancy = await vacancyModel.findById(id);

        return vacancy
    }

    public static async updateVacancy(id: string, updates: Partial<Vacancy>): Promise<Vacancy | null> {

        const vacancy = await vacancyModel.findByIdAndUpdate(id, updates, {new: true});

        return vacancy
    }

    public static async deleteVacancy(id: string): Promise<boolean> {
        const vacancy = await vacancyModel.findByIdAndDelete(id);

        return !!vacancy;
    }
}