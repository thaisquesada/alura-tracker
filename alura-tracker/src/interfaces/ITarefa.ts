import IProjeto from "./iProjeto";

export default interface Tarefa {
    id: number,
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProjeto
}