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
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {

    const router = useRouter()

    const store = useStore();
    const { notificar } = useNotificador();

    const nomeProjeto = ref("")

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeProjeto.value = projeto?.nome || "";
    }

    const lidarComSucesso = () => {
      nomeProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Novo Projeto",
        "O projeto foi cadastrado com sucesso!"
      );
      router.push("/projetos");
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeProjeto.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETO, nomeProjeto.value)
          .then(() => lidarComSucesso());
      }
    }

    return {
      nomeProjeto,
      salvar
    };
  },
});
</script>

<style scoped>
.label {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>