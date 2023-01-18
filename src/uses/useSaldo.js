import { computed, reactive } from "vue";
import { validateChave } from '@/helpers/mecanismos-de-saque.js'
import { mecanismosDeSaque } from '@/helpers/mecanismos-de-saque.js'
import api from '@/helpers/api';

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
      if (saldo.valor <= 0) {
        return true;
      }
      if (saldo.isLoading) {
        return true;
      }
      if (saldo.erroNoSaque) {
        return true;
      }
      return saldo.saqueEfetuado;
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
      try {
        saldo.isLoading = true;
        validateChave(saldo.mecanismoDeSaqueSelecionado, saldo.chaveParaSacar);
        if (saldo.valorASacar > saldo.valor) {
          throw new Error('Saldo insuficiente.');
        }
        if (saldo.valorASacar <= 0) {
          throw new Error('Valor inválido.');
        }
        await api.post('', {
          action: 'cliente.saque',
          valor: saldo.valorASacar,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(async ({ data }) => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          saldo.valor = data.saldo;
          saldo.isLoading = false;
          user.value.saldo = saldo.valor;
          saldo.setSaqueEfetuado();
        }).catch((e) => {
          throw new Error(e.response.data.message);
        });
      } catch (e) {
        console.log(e)
        saldo.isLoading = false;
        saldo.setErroNoSaque(e.message);
      }
    }
  });
  return saldo;
};

export default useSaldo;
