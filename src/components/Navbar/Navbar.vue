<script setup>
import { computed } from "@vue/runtime-core"
import { useRouter } from "vue-router"

const router = useRouter()
const actualRouter = computed(() => router.currentRoute.value.name)

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('profile')
  setTimeout(() => {
    router.push({ name: 'login' })
  }, 1500)
}

const menus = [
  {
    id: 1,
    name: 'adminHome',
    icon: 'fa fa-home'
  },
  {
    id: 2,
    name: 'saque',
    icon: 'fa fa-wallet'
  }
];
</script>

<template>
  <nav id="navbar">
    <ul>
      <li
        v-for="menu in menus"
        :key="menu.id"
        :class="{ active: actualRouter === menu.name }"
      >
        <router-link :to="{ name: menu.name }">
          <i class="fa" :class="menu.icon"></i>
        </router-link>
      </li>
      <li>
        <span id="btn-logout" @click="handleLogout">
          Sair
        </span>
      </li>
    </ul>
  </nav>
</template>

<style>
#navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-image: linear-gradient(45deg, #28352a, #252525);
}

#navbar ul {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

@media screen and (min-width: 768px) {
  #navbar ul {
    width: 500px;
    margin: auto;
  }
}

#navbar ul a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 30px 0;
  text-decoration: none;
  color: #666;
}

#navbar .active a {
  color: #fff;
}

#navbar #btn-logout {
  display: block;
  padding: 8px 35px;
  border-radius: 20px;
  background: #fff;
  color: #28352a;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
}
</style>
