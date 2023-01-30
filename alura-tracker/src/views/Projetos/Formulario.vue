<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeProjeto"
          id="nomeProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "@/store";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeProjeto: "",
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit('ALTERA_PROJETO', {
          id: this.id,
          nome: this.nomeProjeto
        })
      } else {
        this.store.commit('ADICIONA_PROJETO', this.nomeProjeto)
      }
      this.nomeProjeto = "";
      this.$router.push('/projetos')
    },
  },
  setup() {
    const store = useStore()
    return {
      store
    }
  }
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>