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
import { defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/iNotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeProjeto,
          })
          .then(() => this.lidarComSucesso());
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeProjeto)
          .then(() => this.lidarComSucesso());
      }
    },
    lidarComSucesso() {
      this.nomeProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Novo Projeto",
        "O projeto foi cadastrado com sucesso!"
      );
      this.$router.push("/projetos");
    },
  },
  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();

    const nomeProjeto = ref("")

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeProjeto.value = projeto?.nome || "";
    }

    return {
      store,
      notificar,
      nomeProjeto
    };
  },
});
</script>