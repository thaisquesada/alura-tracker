import IProjeto from "./iProjeto";

export default interface Tarefa {
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProjeto
}