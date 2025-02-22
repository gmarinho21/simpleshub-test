<script>
import { database, ref, get } from './config/firebase';
import CpfCard from './components/CpfCard.vue';
import PdfUploader from './components/PdfUploader.vue';


export default {
  name: 'App',
  components: {
    CpfCard,
    PdfUploader,
  },

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
    },
  },

  created() {
    this.fetchAllCpfs()
  }
}
</script>

<template>
  <PdfUploader></PdfUploader>
  <CpfCard :cpfs="allCpfs"></CpfCard>
</template>


<style lang="scss">

</style>
