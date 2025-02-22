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
      allCpfs: [],
      cpfsAtualizadosRecentemente: [],
      uploadEnd: false,
      isLoading: false
    }
  },

  methods: {
    async fetchAllCpfs() {
      this.isLoading = true
      try {
        const cpfsRef = ref(database, 'cpfs');
        const snapshot = await get(cpfsRef);
        const data= snapshot.val()
        this.allCpfs = data ? Object.values(data) : []
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }

    },

    handleUploadCompleto(cpfs) {
      this.uploadEnd = true
      this.cpfsAtualizadosRecentemente = cpfs.map(value => ({ value }));
      this.fetchAllCpfs()
    }
  },

  created() {
    this.fetchAllCpfs()
  }
}
</script>

<template>
  <div class="container">
    <PdfUploader
    @upload-completo="handleUploadCompleto"
    ></PdfUploader>
  
    <div v-if="this.uploadEnd">
      <h3>CPFs Encontrados no Upload Atual</h3>
      <CpfCard :cpfs="cpfsAtualizadosRecentemente"></CpfCard>
    </div>
    <div >
      <h3>Todos os CPFs</h3>
      <CpfCard v-if="!this.isLoading" :cpfs="allCpfs"></CpfCard>
    </div>
  </div>
</template>


<style lang="scss">
  #app {
    min-height: 100vh;
  }

  .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

</style>
