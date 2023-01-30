<template>
  <section>
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
import { ALTERA_PROJETO, ADICIONA_PROJETO } from '@/store/tipo-mutacoes'
import { TipoNotificacao } from "@/interfaces/iNotificacao";
import useNotificador from "@/hooks/notificador"

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if(this.id) {
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
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeProjeto
        })
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeProjeto)
      }
      this.nomeProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Novo Projeto', 'O projeto foi cadastrado com sucesso!')
      this.$router.push('/projetos')
    }
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar
    }
  }
});
</script>