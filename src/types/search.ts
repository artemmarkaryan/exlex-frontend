export interface Search {
    id: string;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    status: string;
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

export const SearchStatusMapNew = 'new';
export const SearchStatusMapAssigned = 'assigned';

export const ApplicationStatusNew = 'new';
export const ApplicationStatusApproved = 'approved';
export const ApplicationStatusDeclined = 'declined';
