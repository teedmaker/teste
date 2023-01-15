import { computed, reactive } from "vue";
import { validateChave } from '@/helpers/mecanismos-de-saque.js'
import { mecanismosDeSaque } from '@/helpers/mecanismos-de-saque.js'

const useSaldo = (user) => {
  const saldo = reactive({
    valor: user.value.saldo,
    isLoading: false,
    chaveParaSacar: null,
    valorASacar: 0.00,
    erroNoSaque: null,
    saqueEfetuado: null,
    mecanismosDeSaque: mecanismosDeSaque,
    mecanismoDeSaqueSelecionado: mecanismosDeSaque.value.cpfCnpj.key,
    naoPodeSacar: computed(() => {
      return saldo.valor <= 0 || saldo.isLoading || saldo.erroNoSaque || saldo.saqueEfetuado;
    }),
    formatado: computed(() => {
      return saldo.valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }),
    setErroNoSaque(error) {
      saldo.erroNoSaque = error;
      setTimeout(() => {
        saldo.erroNoSaque = null;
      }, 2000);
    },
    setSaqueEfetuado() {
      saldo.saqueEfetuado = "Saque efetuado com sucesso!";
      setTimeout(() => {
        saldo.saqueEfetuado = null;
        saldo.valorASacar = 0.00;
        saldo.chaveParaSacar = null;
      }, 2000);
    },
    sacar: async () => {
      if (saldo.naoPodeSacar) {
        return saldo.setErroNoSaque('Não é possível sacar no momento.');
      }
      try {
        validateChave(saldo.mecanismoDeSaqueSelecionado, saldo.chaveParaSacar);
      } catch (e) {
        return saldo.setErroNoSaque(e.message);
      }
      if (saldo.valorASacar > saldo.valor) {
        return saldo.setErroNoSaque('Saldo insuficiente.');
      }
      if (saldo.valorASacar <= 0) {
        return saldo.setErroNoSaque('Valor inválido.');
      }
      saldo.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      saldo.valor -= saldo.valorASacar;
      saldo.isLoading = false;
      user.value.saldo = saldo.valor;
      localStorage.setItem('profile', JSON.stringify(user.value));
      saldo.setSaqueEfetuado();
    }
  });
  return saldo;
};

export default useSaldo;
