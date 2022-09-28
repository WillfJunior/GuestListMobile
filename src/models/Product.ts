export class Produto {
    public id: number;
    public produto: string;

    constructor(produto:string, id:number){
        this.id = id;
        this.produto = produto;
    }
}