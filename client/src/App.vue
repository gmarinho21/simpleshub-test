<script>
import { database, ref, get } from './config/firebase';
import CpfCard from './components/CpfCard.vue';
import { apiService } from './services/api';

export default {
  name: 'App',
  components: {
    CpfCard
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

    async handleFileSelect(e) {
      const file = e.target.files[0]
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await apiService.uploadPdf(formData);
    }
  },

  created() {
    this.fetchAllCpfs()
  }
}
</script>

<template>
  <input
    type="file"
    ref="fileInput"
    accept=".pdf"
    @change="handleFileSelect"
    class="file-input"
  >
  <CpfCard :cpfs="allCpfs"></CpfCard>
</template>



