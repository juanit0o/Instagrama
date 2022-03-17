export interface PhotoToUpload {
    id: string,
    dono: string;
    nome: string;
    descricao: string;
    photo: any;
    likes: [string];
    favoritos: [string];
}
