<template>
  <div class="card" style="height: 270px">
  <div class="card-image">
  <div v-if="isfront">
    <figure>
      <img :src="pokemon.front" alt="Placeholder image" style="width: 90px" @mousemove="mudarFoto">
    </figure>
  </div>
  <div v-else>
    <figure>
      <img :src="pokemon.back" alt="Placeholder image" style="width: 90px" @mousemove="mudarFoto">
    </figure>
  </div>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-6">{{name}}</p>
        <p class="subtitle is-6">{{pokemon.type}}</p>
      </div>
      
    </div>

    <div class="content">
      <!-- <button  v-on:click="mudarFoto()">Mudar sprites</button> -->
      <router-link :to="{name: 'about', params: {url}}" class="button is-fullwidth">Mais informações</router-link>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: 'PokeMon',
  props: {
    name: String,
    url: String,
    num: Number
  },
  data() {
    return {
      pokemon: {
        front: String,
        back: String,
        type: String
      },
      isfront: true
    }
  },
  created() {
    axios.get(this.url).then(response => {
      this.pokemon.front = response.data.sprites.front_default;
      this.pokemon.back = response.data.sprites.back_default;
      this.pokemon.type = response.data.types[0].type.name
    })
  },
  methods: {
    mudarFoto: function() {
      if (this.isfront == true) {
        this.isfront = false
      }else {
        this.isfront = true
      }
    }
  },
  filters: {
    upper: function(value) {
      var newName = value[0].toUpperCase() + value.slice(1);
      return newName
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  figure {
    text-align: center;
  }
  p {
    text-align: center;
  }
</style>
