<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa."
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="salvarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "@/components/Temporizador.vue";
import { useStore } from 'vuex';
import { key } from '@/store';
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/iNotificacao";

export default defineComponent({
  name: "Formulario",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  setup(props, { emit }) {

    const store = useStore(key)

    const descricao = ref("")
    const idProjeto = ref("")

    const projetos = computed(() => store.state.projeto.projetos)

    const salvarTarefa = (tempoDecorrido: number) : void => {
      const projeto = projetos.value.find((p) => p.id == idProjeto.value);
      if (!projeto) {
        store.commit(NOTIFICAR, {
          titulo: 'Ops',
          texto: 'Selecione um projeto antes de finalizar a tarefa!',
          tipo: TipoNotificacao.FALHA
        })
      }
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(proj => proj.id == idProjeto.value)
      })
      descricao.value = ''
    }

    return {
      descricao,
      idProjeto,
      projetos,
      salvarTarefa
    }
  }
});
</script>

<style>
.button {
  margin-left: 8px;
}
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>