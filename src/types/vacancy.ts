export type Vacancy = {
    companyName: string;
    vacancy: string;
    salaryRange: SalaryRange;
    status: string
    note: string;
}

type SalaryRange = {
    min: number;
    optimal: number;
};