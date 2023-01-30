export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO
}

export interface iNotificacao {
    titulo: string,
    texto: string,
    tipo: TipoNotificacao
    id: number
}