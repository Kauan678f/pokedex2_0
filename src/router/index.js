import { createRouter, createWebHistory } from 'vue-router'
import ListPokemons from '../views/ListPokemons.vue'
import AboutPokemon from '../views/AboutPokemon.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ListPokemons
  },
  {
    path: '/about/:url',
    name: 'about',
    component: AboutPokemon
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
