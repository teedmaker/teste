<script setup>
import Image from '@/components/Helpers/Image.vue'
import store from '@/store/index.js'
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import useSaldo from '@/uses/useSaldo.js';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import api from '../../helpers/api';

let user = null;
let saldo = null;
let posts = null;

const isLoading = computed(() => store.state.isLoading);

const route = useRoute();

const loadMore = async () => {
  return new Promise(async (resolve, reject) => {
    if (posts.loading) {
      return;
    }
    posts.loading = true;
    const { data } = await api.post('', {
      action: 'cliente.posts',
      last_id: posts.value.length > 0 ? posts.value[posts.value.length - 1].id : 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    for (let post of data.posts) {
      const handleLikeUnlike = async () => {
        const postIndex = posts.value.findIndex(p => p.id === post.id);
        if (postIndex < 0 || posts.value[postIndex].loadingLike.value) {
          return;
        }
        const postItem = posts.value[postIndex];
        postItem.loadingLike = true;

        await api.post('', {
          action: 'cliente.posts.like',
          post_id: postItem.id,
          liked: postItem.liked? 0: 1,
          valor: postItem.valor,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }).then(({ data }) => {
          postItem.liked = !postItem.liked;
          if (postItem.liked) {
            store.state.profile.user.saldo += postItem.valor;
          } else {
            store.state.profile.user.saldo -= store.state.profile.user.saldo >= postItem.valor ? postItem.valor : 0;
          }
          saldo.valor = store.state.profile.user.saldo;
          postItem.loadingLike = false;
          posts.value[postIndex] = postItem;
        }).catch((error) => {
        }).finally(() => {
          postItem.loadingLike = false;
        });
      };
      const liked = ref(post.liked || false);
      const loadingLike = ref(false);
      const valorFormatado = computed(() => {
        return post.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '');
      });
      post.valor = parseFloat(post.valor);
      posts.value.push({
        ...post,
        handleLikeUnlike,
        liked,
        loadingLike,
        valorFormatado,
      });
    }
    posts.loading = false;
  });
};

let onScrollExecuting = ref(false);

const onScroll = async () => {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight && !posts.loading && !onScrollExecuting.value;
  if (endOfPage) {
    onScrollExecuting.value = true;
    setTimeout(() => {
      if (posts.loading) {
        onScrollExecuting.value = false;
        return;
      }
      loadMore().then().catch();
      onScrollExecuting.value = false;
    }, 400);
  }
};

const configHome = () => {
  store.state.isLoading = true;

  window.onscroll = onScroll;

  user = computed(() => store.state.profile.user);
  saldo = useSaldo(user);
  posts = reactive({
    loading: false,
    value: [],
  });

  loadMore().then().catch();

  store.state.isLoading = false;
}

onMounted(configHome);

watch(route, () => {
  configHome();
});
</script>

<template>
  <div>
    <main
      id="home"
      :class="{ 'nao-pode-sacar': saldo.naoPodeSacar }"
      v-if="!isLoading && user"
    >
      <div id="home-sacar">
        <div id="home-sacar-content">
          <Image
            id="home-sacar-image"
            :src="user.image"
            alt="Imagem do usuário"
          />
          <p id="home-sacar-description">
            <strong v-text="user.email + ' 123 46 789 123 123 1 23'"></strong> <br>
            <span><i>R$</i> <em v-text="saldo.formatado"></em></span>
          </p>
          <p>
            <router-link
              id="home-sacar-button"
              to="/admin/saque"
            >
              <span v-if="saldo.isLoading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else>Sacar</span>
            </router-link>
          </p>
        </div>
      </div>

      <div id="home-content">
        <section id="home-content-alert">
          <p>Curta novas fotos para ganhar mais dinheiro</p>
        </section>

        <section id="home-content-posts">
          <div
            class="home-content-post"
            :class="{ 'liked': post.liked }"
            v-for="post of posts.value"
            :key="post.id"
          >
            <div class="home-content-post-image">
              <img :src="post.imagem" alt="Imagem para curtir" />
            </div>
            <div class="home-content-post-floating">
              <button>
                <i class="fa fa-plus"></i>
              </button>
              <span>
                <strong>R$ </strong>
                <em v-text="post.valorFormatado"></em>
              </span>
            </div>
            <div class="home-content-post-footer">
              <div class="home-content-post-footer-left">
                <span v-if="post.user">
                  @<span v-text="post.user"></span>
                </span>
              </div>
              <div class="home-content-post-footer-middle">
                <button
                  @click="post.handleLikeUnlike()"
                >
                  <i class="fa fa-spin fa-spinner" v-if="post.loadingLike"></i>
                  <i class="fa fa-heart" v-else></i>
                </button>
              </div>
              <div class="home-content-post-footer-right">
                <span>
                  <i class="fa fa-heart heart"></i>
                </span>
                <span>
                  <i class="fa fa-comment"></i> <em v-text="post.likes + (post.liked ? 1 : 0)"></em>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div id="home-content-loading" v-if="posts.loading">
          <h2>Aguarde um instante...</h2>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
#home-sacar {
  width: 101vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  padding: 20px;
  border-radius: 0 0 15px 15px;
  z-index: 1;
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.06);
}

#home-sacar-content {
  width: 90vh;
  margin: auto;
  display: grid;
  grid-template-columns: 60px 180px 1fr;
  overflow: hidden;
}

#home-sacar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid #000;
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.06);
}

#home-sacar-description {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
}

#home-sacar-description strong {
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #777;
}

#home-sacar-description span {
  font-size: 14px;
  color: #333;
  font-weight: bolder;
}

#home-sacar-description i {
  font-style: normal;
  color: var(--color-tertiary);
}

#home-sacar-description em {
  font-style: normal;
}

#home-sacar-button {
  min-width: 80px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  background: var(--color-tertiary);
  text-transform: uppercase;
  font-weight: bolder;
  color: #000;
  border: none;
  border-radius: 30px;
  margin: 0;
  cursor: pointer;
  text-align: left;
  padding: 0px 16px;
  text-align: center;
  font-size: 14px;
}

.nao-pode-sacar #home-sacar-button {
  opacity: 0.7;
}

#home-content {
  width: 90vw;
  margin: 90px auto;
}

#home-content-loading {
  padding: 20px;
  text-align: center;
  font-size: 10px;
  font-weight: 100;
}

#home-content-alert {
  width: 90%;
  margin: auto;
  padding: 20px 10px;
  background: #eee;
  font-size: 10px;
  text-align: center;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
  border-radius: 0 0 15px 15px;
}

#home-content-posts {
  margin: 10px 0;
}

.home-content-post {
  position: relative;
  border: 1px solid #ddd;
  padding: 4px;
  border-radius: 15px;
  margin-bottom: 10px;
}

.home-content-post-image img {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.home-content-post-floating {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,0.5);
  padding: 6px 15px 8px 10px;
  border-radius: 20px;
}

.home-content-post-floating button {
  width: 22px;
  height: 22px;
  line-height: 19px;
  margin-right: 10px;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.home-content-post-floating strong {
  color: var(--color-tertiary);
}

.home-content-post-floating em {
  font-weight: bold;
  font-style: normal;
}

.home-content-post-footer {
  height: 50px;
  margin-top: -8px;
  border-radius: 0 0 10px 10px;
  background: #fff;
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
}

.home-content-post-footer-left {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  color: #333;
  font-size: 12px;
}

.home-content-post-footer-middle {
  position: relative
}

.home-content-post-footer-middle button {
  position: absolute;
  width: 70px;
  height: 70px;
  line-height: 75px;
  margin: auto;
  left: -20px;
  right: 0;
  top: -10px;
  border-radius: 100%;
  font-size: 36px;
  background: #fff;
  color: #777;
  border: none;
  box-shadow: 0 0 10px 10px rgb(0 0 0 / 10%);
}

.liked .home-content-post-footer-middle button {
  color: red;
}

.home-content-post-footer-right {
  color: #333;
  font-size: 12px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: space-around;
}

.liked .home-content-post-footer-right .fa-heart {
  color: red;
}
</style>
