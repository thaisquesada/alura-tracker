import { iNotificacao } from "@/interfaces/iNotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoProjeto, projetoModule } from "./modulos/projeto";
import { EstadoTarefa, tarefaModule } from "./modulos/tarefa";

export interface Estado {
    notificacoes: iNotificacao[],
    projeto: EstadoProjeto
    tarefa: EstadoTarefa,
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado> ({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: iNotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
    },
    modules: {
        projetoModule,
        tarefaModule
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}