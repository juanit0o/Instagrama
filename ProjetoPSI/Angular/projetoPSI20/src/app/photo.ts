export interface Photo {
    id: string,
    dono: string;
    nome: string;
    descricao: string;
    photoPath: string;
    likes: [string];
    favoritos: [string];
    data: Date;
}
