<script setup>
import Image from '../components/Helpers/Image.vue'
</script>

<template>
  <main id="welcome">
    <div id="welcome-content">
      <section id="welcome-header">
        <Image
          src="/images/logo.png"
        />
        <p>
          <strong>Olá</strong>, Bem-vindo!
        </p>
      </section>
      <section id="welcome-box">
        <hr
          id="welcome-box-line"
          />
        <router-link id="welcome-box-button" to="login">
          <i class="fa fa-sign-out-alt"></i>
          <span>Fazer login</span>
        </router-link>
        <a
          href="javascript:void(0);"
          id="welcome-box-termos">
          Termos de uso
        </a>
      </section>
    </div>
  </main>
</template>

<style>
#welcome {
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#welcome-header {
  margin-bottom: 40px;
}

#welcome-header img {
  margin: auto;
  display: block;
  margin-bottom: 15px;
}

#welcome-header p {
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
}

#welcome-header p strong {
  color: var(--color-secondary);
}

#welcome-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80vw;
  max-width: 300px;
  margin: 0 auto;
  padding: 30px 20px 20px 20px;
  background: #fff;
  border-radius: 10px;
  position: relative;
}

#welcome-box-line {
  width: 73px;
  background: #000;
  height: 5px;
  margin: 0 0 20px 0;
  border-radius: 10px;
}

#welcome-box-line::before,
#welcome-box-line::after {
  content: '';
  width: 5px;
  height: 5px;
  background: #000;
  display: block;
  border-radius: 10px;
  top: 30px;
  position: absolute;
}


#welcome-box-line::before {
  left: 108px;
}

#welcome-box-line::after {
  width: 3px;
  height: 3px;
  left: 118px;
  border: 1px solid #000;
  background: none;
}

#welcome-box-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: none;
  border: none;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
  border-radius: 10px;
  margin: 20px 0;
  cursor: pointer;
  text-align: left;
  padding: 0px 10px;
  font-weight: bolder;
  font-size: 14px;
  color: #000 !important;
}

#welcome-box-button:active {
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);
}

#welcome-box-button i {
  margin-right: 15px;
  background: #000;
  width: 30px;
  height: 30px;
  top: -20px;
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

#welcome-box-termos {
  display: block;
  width: 100%;
  text-align: center;
  color: #333;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
