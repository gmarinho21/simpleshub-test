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
      uploadEnd: false
    }
  },

  methods: {
    async fetchAllCpfs() {
      const cpfsRef = ref(database, 'cpfs');
      const snapshot = await get(cpfsRef);
      const data= snapshot.val()
      this.allCpfs = data ? Object.values(data) : []
      // console.log(this.allCpfs)
    },

    handleUploadCompleto(cpfs) {
      this.uploadEnd = true
      this.cpfsAtualizadosRecentemente = cpfs.map(value => ({ value }));
    }
  },

  created() {
    this.fetchAllCpfs()
  }
}
</script>

<template>
  <PdfUploader
  @upload-completo="handleUploadCompleto"
  ></PdfUploader>

  <div v-if="this.uploadEnd">
    <h3 >CPFs Encontrados no Upload Atual</h3>
    <CpfCard :cpfs="cpfsAtualizadosRecentemente"></CpfCard>
  </div>
  
  <h3 >Todos os CPFs</h3>
  <CpfCard :cpfs="allCpfs"></CpfCard>
</template>


<style lang="scss">

</style>
