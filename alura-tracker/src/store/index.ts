import IProjeto from "@/interfaces/iProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado> ({
    state: {
        projetos: [
            {
                id: new Date().toISOString(),
                nome: 'Typescript'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vue'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vuex'
            }
        ]
    },
    mutations: {
        'ADICIONA_PROJETO'(state, nomeProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}