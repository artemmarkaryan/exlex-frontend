export interface Search {
    id: string;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    deadline: {
        year: number;
        month: number;
        day: number;
    };
    requirements: {
        educationType: string[];
        speciality: string[];
        workExperience: number;
    };
}
