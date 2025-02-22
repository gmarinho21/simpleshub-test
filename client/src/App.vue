<script>
import { database, ref, get } from './config/firebase';

export default {
  name: 'App',

  data() {
    return {
      allCpfs: []
    }
  },

  methods: {
    async fetchAllCpfs() {
      const cpfsRef = ref(database, 'cpfs');
      const snapshot = await get(cpfsRef);
      const data= snapshot.val()
      this.allCpfs = data ? Object.values(data) : []
      console.log(this.allCpfs)
    }
  },

  created() {
    this.fetchAllCpfs()
  }
}
</script>

<template>
  <h1>HelloWorld</h1>
</template>