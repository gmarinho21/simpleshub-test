<script>
import { database, ref, get, onValue } from './config/firebase';
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
      isLoading: false,
      paginacao: {
        paginaAtual: 1,
        itemsPorPagina: 10,
        totalItems: 0
      }
    };
  },
  computed: {
    cpfsPaginados() {
      const start = (this.paginacao.paginaAtual - 1) * this.paginacao.itemsPorPagina;
      const end = start + this.paginacao.itemsPorPagina;
      return this.allCpfs.slice(start, end);
    }
  },

  methods: {
    async fetchAllCpfs() {
      this.isLoading = true
      try {
        const cpfsRef = ref(database, 'cpfs')
        const query = await get(cpfsRef);
        const data = query.val()
        this.allCpfs = data ? Object.values(data) : []
        this.paginacao.totalItems = this.allCpfs.length;
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },

    handleTrocaPagina(pagina) {
      this.paginacao.paginaAtual = pagina;
    },

    handleUploadCompleto(cpfs) {
      this.uploadEnd = true
      this.cpfsAtualizadosRecentemente = cpfs.map(value => ({ value }));
      this.fetchAllCpfs()
    }
  },

  created() {
    this.fetchAllCpfs()

    const cpfsRef = ref(database, 'cpfs');
    onValue(cpfsRef, (snapshot) => {
    const data = snapshot.val();
    this.allCpfs = data ? Object.values(data) : [];
    })
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
      <CpfCard 
      v-if="!this.isLoading" 
      :cpfs="cpfsPaginados"
      :total-items="allCpfs.length"
      :pagina-atual="paginacao.paginaAtual"
      :items-por-pagina="paginacao.cpfPorPagina"
      @troca-pagina="handleTrocaPagina"
      ></CpfCard>
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
