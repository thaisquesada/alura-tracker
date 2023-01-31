<template>
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista" >
          <Box v-if="semTarefas">
            Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
          </Box>
          <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
      </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Box from "@/components/Box.vue";
import Formulario from "@/components/Formulario.vue";
import Tarefa from "@/components/Tarefa.vue";
import { useStore } from "@/store";
import { OBTER_TAREFAS } from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    Box,
    Formulario,
    Tarefa,
  },
  methods: {
    // salvarTarefa(tarefa: ITarefa) : void {
    //   this.tarefas.push(tarefa);
    // }
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length == 0;
    },
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>