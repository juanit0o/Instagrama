export interface Photo {
    id: string,
    dono: string;
    nome: string;
    descricao: string;
    photo: string;
    likes: [string];
    favoritos: [string];
}
