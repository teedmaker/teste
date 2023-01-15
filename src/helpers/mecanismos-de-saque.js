import { ref } from "vue";

const mecanismosDeSaque = ref({
  cpfCnpj: {
    key: 'cpfCnpj',
    icon: 'fa fa-id-card',
    title: 'CPF/CNPJ',
    validate: (value) => {
      if (!value || value.length === 0) {
        throw new Error('CPF/CNPJ inválido.');
      }
      if (value.length !== 11 && value.length !== 14) {
        throw new Error('CPF/CNPJ inválido.');
      }
      if (/^\d{11,14}$/.test(value) === false) {
        throw new Error('CPF/CNPJ inválido.');
      }
    },
  },
  celular: {
    key: 'celular',
    icon: 'fa fa-mobile',
    title: 'Celular',
    validate: (value) => {
      if (!value || value.length === 0) {
        throw new Error('Celular inválido.');
      }
      if (value.length !== 11 && value.length !== 12) {
        throw new Error('Celular inválido.');
      }
      if (/^\d{11,12}$/.test(value) === false) {
        throw new Error('Celular inválido.');
      }
    }
  },
  email: {
    key: 'email',
    icon: 'fa fa-envelope',
    title: 'E-mail',
    validate: (value) => {
      if (!value || value.length === 0) {
        throw new Error('E-mail inválido.');
      }
      if (value.length < 5 || value.length > 100) {
        throw new Error('E-mail inválido.');
      }
      if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) === false) {
        throw new Error('E-mail inválido.');
      }
    }
  },
  aleatoria: {
    key: 'aleatoria',
    icon: 'fa fa-random',
    title: 'Aleatória',
    validate: (value) => {
      if (!value || value.length === 0) {
        throw new Error('Chave aleatória inválida.');
      }
      if (value.length !== 6) {
        throw new Error('Chave aleatória inválida.');
      }
      if (/^\d{6}$/.test(value) === false) {
        throw new Error('Chave aleatória inválida.');
      }
    }
  },
});

const validateChave = (tipo, chave) => {
  const mecanismo = mecanismosDeSaque.value[tipo];
  if (!mecanismo) {
    throw new Error('Tipo de chave inválido.');
  }
  if (!chave || chave.length === 0) {
    throw new Error('Chave inválida.');
  }
  mecanismo.validate(chave);
};

export {
  mecanismosDeSaque,
  validateChave,
};
