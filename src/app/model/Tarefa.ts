export class Tarefa
{
    id: string;
    title: string;
    description: string;
    statusCode: string;
    endDate: Date;


    public constructor()
    {
        this.id = '';
        this.title = '';
        this.description = '';
        this.statusCode = 'N';
        this.endDate = new Date();
    }

    get descricaoStatus() : string {
        if (this.statusCode === 'N'){
            return 'Nova';
        }else if (this.statusCode === 'IP'){
            return 'Em andamento';
        }else if (this.statusCode === 'F'){
            return 'Finalizada';
        }
        return '-';
    }

    get descricaoCurta() : string{
        if (this.description.length >= 100){
            return this.description.substring(0, 100)+"...";
        }
        return this.description;
    }
}