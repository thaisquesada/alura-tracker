import http from "@/http"
import IProjeto from "@/interfaces/iProjeto"
import { Estado } from "@/store"
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes"
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes"
import { Module } from "vuex"

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projetoModule: Module<EstadoProjeto, Estado> = {
    mutations: {
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [ADICIONA_PROJETO](state, nomeProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeProjeto: string) {
            return http.post('/projetos', {
                nome: nomeProjeto
            })
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({ commit }, id: IProjeto) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        }
    },
    getters: {
        projetos(state) {
            return state.projetos
        }
    }
}