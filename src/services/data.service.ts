// interface DataType {
    // id: number;
    // name: string;
// } 

type DataType = {
    id: number;
    name: string;
    email?: string;
};

export async function getSampleData(): Promise<DataType[]> {
    return [
        { id: 1, name: "Mohammed Arif", email: "arif@example.com" },
        { id: 2, name: "Mohammed", email: "mohammed@example.com" },
        { id: 3, name: "Sreekanth", email: "sreekanth@example.com" },
        { id: 4, name: "Roshan", email: "roshan@example.com" },
    ];
}