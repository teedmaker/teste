<script setup>
import Image from '@/components/Helpers/Image.vue'
import store from '@/store/index.js'
import { computed, onMounted, ref } from 'vue';
import useSaldo from '@/uses/useSaldo';

const user = computed(() => store.state.profile.user);
const saldo = useSaldo(user);

onMounted(() => {
  // saldo.buscarSaldo();
  document.querySelectorAll('.sacar-form-input input').forEach(input => {
    input.addEventListener('focus', () => {
      // select all text
      input.select();
    });
  });
});
</script>

<template>
  <main
    id="sacar"
    :class="{ 'nao-pode-sacar': saldo.naoPodeSacar }"
  >
    <div id="sacar-content">
      <div
        id="sacar-error"
        :class="{ 'visible': saldo.erroNoSaque }"
      >
        <i class="fa fa-exclamation-triangle"></i>
        <span v-text="saldo.erroNoSaque"></span>
      </div>
      <div
        id="saque-efetuado"
        :class="{ 'visible': saldo.saqueEfetuado }"
      >
        <i class="fa fa-check"></i>
        <span v-text="saldo.saqueEfetuado"></span>
      </div>

      <section id="sacar-header">
        <Image
          id="sacar-image"
          :src="user.image"
          alt="Imagem do usuário"
        />
        <p>
          <strong v-text="user.name"></strong> <br>
          <span v-text="user.email"></span>
        </p>
      </section>
      <section id="sacar-saldo">
        <h5 id="sacar-saldo-title">
          Seu Saldo
        </h5>
        <div id="sacar-saldo-valor">
          <strong>R$ </strong>
          <span v-text="saldo.formatado"></span>
        </div>
      </section>
      <section id="sacar-chaves">
        <h5 id="sacar-chaves-title">
          Selecione o tipo da sua chave pix:
        </h5>
        <div id="sacar-chaves-content">
          <div
            class="sacar-chaves-content"
            v-for="(mecanismo, mecanismoKey) in saldo.mecanismosDeSaque"
            :key="mecanismo.title"
            :class="{ 'active': saldo.mecanismoDeSaqueSelecionado === mecanismoKey }"
            @click="saldo.mecanismoDeSaqueSelecionado = mecanismoKey"
          >
            <i :class="mecanismo.icon"></i>
            <span v-text="mecanismo.title"></span>
          </div>
        </div>
      </section>
      <section id="sacar-form">
        <div class="sacar-form-input input-reverse">
          <i class="fa fa-user-circle"></i>
          <input
            type="text"
            id="sacar-form-input-chave"
            :disabled="saldo.isLoading"
            v-model="saldo.chaveParaSacar"
            placeholder="Chave pix"
            @keyup.enter="saldo.sacar"
          />
        </div>
        <div class="sacar-form-input" id="sacar-form-input-valor-container">
          <span>R$</span>
          <input
            type="text"
            id="sacar-form-input-valor"
            :disabled="saldo.isLoading"
            v-model="saldo.valorASacar"
            placeholder="0,00"
            @keyup.enter="saldo.sacar"
          />
        </div>
        <div>
          <button
            id="sacar-form-button-sacar"
            @click="saldo.sacar"
            :disabled="saldo.isLoading"
          >
            <span v-if="saldo.isLoading">
              <i class="fa fa-spinner fa-spin"></i> &nbsp;
              Aguarde
            </span>
            <span v-else>Sacar</span>
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<style>
#sacar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background: transparent;
  color: #333;
}

#sacar-content {
  width: 100%;
  min-height: 300px;
  border-radius: 0 0 20px 20px;
  padding: 20px;
  background: #fff;
}

#sacar-header {
  display: grid;
  grid-template-columns: 60px 1fr;
  overflow: hidden;
  margin-bottom: 20px;
}

#sacar-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid #000;
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.06);
}

#sacar-header p {
  line-height: 20px;
}

#sacar-header p strong {
  font-weight: bold;
}

#sacar-header p span {
  font-size: 12px;
  color: #999;
}

#sacar-saldo {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

#sacar-saldo-title {
  font-weight: 400;
  color: #999;
  text-transform: uppercase;
}

#sacar-saldo-valor {
  font-size: 20px;
  font-weight: 700;
  margin-top: -2px;
}

#sacar-saldo-valor strong {
  color: var(--color-secondary);
}

#sacar-chaves-title {
  font-weight: 400;
}

#sacar-chaves-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin: 10px 0 20px 0;
}

#sacar .nao-pode-sacar input,
#sacar .nao-pode-sacar button,
#sacar .nao-pode-sacar .sacar-chaves-content {
  pointer-events: none;
  opacity: 0.7;
}

#sacar .nao-pode-sacar .sacar-chaves-content {
  pointer-events: none;
  border-color: #999 !important;
  color: #999 !important;
}

.sacar-chaves-content {
  border: 1px solid #999;
  color: #999;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60px;
  height: 60px;
  font-size: 9px;
}

.sacar-chaves-content i {
  font-size: 18px;
}

.sacar-chaves-content.active {
  border-color: #000;
  color: #000;
}

.sacar-form-input {
  padding: 15px 20px;
  border: 1px solid #999;
  border-radius: 13px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}

.sacar-form-input.input-reverse {
  background: #000;
  color: #fff;
}

.sacar-form-input.input-reverse input {
  color: #fff;
}

.sacar-form-input input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  padding-left: 10px;
  background: none;
}

#sacar-form-button-sacar {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: var(--color-tertiary);
  text-transform: uppercase;
  font-weight: bolder;
  color: #000;
  border: none;
  border-radius: 15px;
  margin: 0;
  cursor: pointer;
  text-align: left;
  padding: 0px 10px;
  text-align: center;
  font-size: 14px;
}

#sacar-form-input-valor-container span {
  color: var(--color-secondary);
  font-weight: bolder;
}

@media screen and (min-width: 768px) {
  #sacar-content {
    width: 500px;
    margin: 0 auto;
  }
}

#sacar-error,
#saque-efetuado {
  position: fixed;
  top: -100px;
  left: 0;
  right: 0;
  width: 90vw;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 20px rgba(0,0,0,0.07);
  z-index: 9999;
  background: rgb(245, 65, 65);
  color: rgba(255, 255, 255, 0.9);
  transition: top 0.3s ease-in-out;
}

#sacar-error i,
#saque-efetuado i {
  margin-right: 10px;
}

#sacar-error.visible,
#saque-efetuado.visible {
  top: 40px;
}

#saque-efetuado {
  background: rgb(11, 151, 11);
}
</style>
