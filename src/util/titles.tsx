import { EducationType } from '@/types/education';

interface IdTitle {
    id: string;
    title: string;
}

export function titles(ids: string[], all: IdTitle[]): string[] {
    return ids
        .map((e: string) => {
            const found = all.find((element) => {
                return element.id === e;
            });
            return found ? found.title : '';
        })
        .filter((title: string | undefined) => title !== '');
}
