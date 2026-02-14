export interface Pet {
    id: string,
    name: string,
    description: string,
    imageURL: string;
}

export interface RespuestaApi{
    data: Pet[];
}