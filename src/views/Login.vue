<script setup>
import checkEmailIsInvalid from '@/helpers/check-email-is-invalid.js';
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSubmitLogin = () => {
  profile.loading = true;
  profile.emailInvalid = checkEmailIsInvalid(profile.email);
  if (profile.emailInvalid) {
    return;
  }
  localStorage.setItem('token', 'token');
  localStorage.setItem('profile', JSON.stringify({
    name: profile.name,
    email: profile.email,
    image: profile.image,
    saldo: 0.00,
    token: '',
  }));
  setTimeout(() => {
    profile.loading = false;
    router.push({ name: 'adminHome' });
  }, 700);
}

const handleOnFormSubmit = (event) => {
  event.preventDefault();
  handleSubmitLogin();
}

const profile = reactive({
  name: 'Jhon Doe',
  email: 'jhondoe@meusite.com',
  image: '/images/profile.png',
  emailInvalid: false,
  loading: true,
});

setTimeout(() => {
  profile.loading = false;
}, 500);
</script>

<template>
  <main id="login">
    <div id="login-content">
      <div id="login-content-top">
        <router-link id="login-content-back" to="/">
          <i class="fa fa-chevron-left"></i>
        </router-link>
        <span id="login-content-title disabled">
          Log in
        </span>
      </div>
      <div id="login-content-body">
        <h3 id="login-content-body-title">
          Faça seu login e comece a faturar!
        </h3>
        <form
          id="login-content-body-form"
          @submit.prevent="handleOnFormSubmit"
          :class="[ profile.emailInvalid? 'error': '' ]"
        >
          <div class="login-content-body-input email">
            <i class="fa fa-user-circle"></i>
            <input
              type="email"
              placeholder="Email de compra"
              :disabled="profile.loading"
              v-model="profile.email"
              />
          </div>
        </form>
      </div>
    </div>
    <div id="login-footer">
      <button
        id="login-button"
        @click="handleSubmitLogin"
        :class="[ profile.loading? 'loading': '' ]"
       >
        <span v-if="profile.loading">
          <i class="fa fa-spinner fa-spin"></i>
        </span>
        <span v-else>Log in</span>
      </button>
    </div>
  </main>
</template>

<style>
#login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background: #eee;
  color: #333;
}

#login-content {
  width: 100%;
  padding: 20px;
  background: #fff;
}

#login-content-top {
  position: relative;
}

#login-content-title {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: inline-block;
  width: 100px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}

#login-content-back {
  padding: 10px 20px;
  color: #000;
}

#login-content-body {
  padding: 60px 20px 20px 20px;
}

#login-content-body-title {
  width: 80%;
  margin: 20px auto 20px auto;
  margin-bottom: 20px;
  font-size: 23px;
  font-weight: bolder;
  line-height: 30px;
  text-align: center;
}

.login-content-body-input.email {
  border-bottom: 1px solid #ccc;
  width: 80%;
  margin: auto;
  height: 60px;
  line-height: 60px;
  padding: 5px 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-content-body-input.email input {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  border: none;
  outline: none;
  font-size: 15px;
}

#login-content-body-form.error .login-content-body-input {
  border-color: #f00;
}

#login-content-body-form.error .login-content-body-input i {
  color: #f00;
}

#login-button:active {
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
}

#login-button.loading {
  background: #333;
  color: #fff;
  cursor: default;
  pointer-events: none;
}

#login-footer {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

#login-footer {
  width: 100%;
  padding: 20px;
}

@media screen and (min-width: 768px) {
  #login-content-body {
    width: 400px;
    margin: 0 auto;
  }
  #login-footer {
    width: 300px;
    margin: 0 auto;
  }
}

#login-footer button {
  width: 80%;
  height: 55px;
  line-height: 55px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 15px;
  margin: 20px 0;
  cursor: pointer;
  text-align: left;
  padding: 0px 10px;
  text-align: center;
  font-weight: 100;
  font-size: 15px;
}
</style>
