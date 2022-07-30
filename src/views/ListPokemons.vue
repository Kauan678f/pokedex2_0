<template>
  <div id="app" class="containerModificado">
    <h4 class="is-size-4" style="margin: 20px 0; text-align: center">Pokedex</h4>
    <input type="text" placeholder="Buscar pokemon pelo nome" v-model="busca" class="input is-rounde" style="margin-bottom: 30px">
    <input type="hidden" :value="cont" >
    <div style="text-align: center" class="menu">
      <button class="button" @click="voltar">⏪</button>
      <span>{{cont / 12}} - {{numeroPag}}</span>
      <button class="button" @click="avancar">⏩</button>
    </div>
    <div class="columns is-half is-offset-one-quarter is-multiline">
      <div v-for="(poke, index) in resultadoBusca" :key="poke.name" class="column is-3">
        <PokeMon :name="poke.name" :url="poke.url" :num="index+1" class=""/>
      </div>
    </div>
  </div>
</template>

<script>
import PokeMon from '../components/PokeMon'
import axios from "axios";

export default {
  name: 'listPokemons',
  components: {
    PokeMon
  },
  data() {
    return {
      pokemons: [],
      pokemons2: [],
      busca: '',
      cont: 12,
      contControler: 12,
      numeroPag: Number
  }
  },
  created() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0").then(response => {
      this.pokemons2 = response.data.results
      this.numeroPag = Math.ceil(this.pokemons2.length / 12)
    })
  }, 
  methods: {
    voltar: function() {
      if(this.cont == 12) {
        this.cont = 12
      }else {
        if(this.busca == "" || this.busca == " ") {
          this.cont = this.cont - 12
        }else {
          let cont2 = this.cont
          this.cont = cont2
        }
      }
    },
    avancar: function() {
      if(this.cont / 12 == 84) {
        let cont2 = this.cont
        this.cont = cont2
      }else {
        if(this.busca == "" || this.busca == " ") {
          this.cont = this.cont + 12
        }else {
          let cont2 = this.cont
          this.cont = cont2
        }
      }
    },
    puxarPokemon: function() {
      this.pokemons = []
      if(this.cont == 12) {
        for (let index = 0; index < this.cont; index++) {
          this.pokemons.push(this.pokemons2[index])
        }
      }else {
        for (let index = this.cont - 12; index < this.cont; index++) {
          if (this.pokemons2[index+1] != undefined) {
            this.pokemons.push(this.pokemons2[index])
          }else {
            return
          }
          
        }
      }
    },
    mudarValorContControler: function() {
      this.contControler = this.cont
    }
  },
  computed: {
    resultadoBusca: function() {
      if(this.busca == "" || this.busca == " " && this.cont != this.contControler) {
        this.puxarPokemon()
        this.mudarValorContControler()
        return this.pokemons
      }else{
        var newBusca = this.busca[0] + this.busca.slice(1)
        return this.pokemons2.filter(pokemon => pokemon.name.includes(newBusca))
      }
    }
  }
}
</script>

<style>
.containerModificado {
  width: 90%;
  margin: 0 auto;
}
span {
  display: inline-block;
  font-size: 25px;
  margin: 0 10px;
}
.menu {
  margin-bottom: 15px;
}
</style>