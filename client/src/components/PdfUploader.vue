<script>
import { apiService } from '../services/api';


export default {
    name: 'PdfUploader',

  methods: {
    async handleFileSelect(e) {
      const file = e.target.files[0]
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await apiService.uploadPdf(formData);
    },

    async handleFileDrop(e) {
      const file = e.dataTransfer.files[0]
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await apiService.uploadPdf(formData);
    },

    async uploadFile(file) {
      if (!file || file.type !== 'application/pdf') {
        this.error = 'Por favor, selecione um arquivo PDF válido'
        return
      }
      try {
        const response = await apiService.uploadPdf(formData);
      } catch (error) {
        console.log('Erro', error)
      }
    }
  }

}
</script>

<template>
    <div class="pdf-uploader">
      <div 
        class="upload-area"
        @drag.prevent
        @dragstart.prevent
        @dragend.prevent
        @dragover.prevent
        @drop.prevent="handleFileDrop"
      >
        <label for="fileInput">
          <p>Arraste seu arquivo PDF ou clique para selecionar</p>
          <input
            type="file"
            id="fileInput"
            ref="fileInput"
            accept=".pdf"
            @change="handleFileSelect"
            class="file-input"
          >
        </label>
      </div>
    </div>
</template>

<style lang="scss">
.pdf-uploader {
    margin: 20px 0;
  
    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      
      label {
        cursor: pointer;
      }

      p {
        margin: 0;
        color: #666;
      }
  
      .file-input {
        display: none;
      }
    }
  
    .upload-progress {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  
    .error-message {
      color: #dc3545;
      margin-top: 10px;
      text-align: center;
    }
  }
</style>