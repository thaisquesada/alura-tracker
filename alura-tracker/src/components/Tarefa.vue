<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto.nome }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "@/components/Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";

export default defineComponent({
  name: "Tarefa",
  emits: ['aoTarefaClicada'],
  components: {
    Box,
    Cronometro,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  computed: {
    tarefaClicada() : string {
      return new Date(this.tarefa.duracaoEmSegundos * 1000)
        .toISOString()
        .substr(11, 8)
    }
  }
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>