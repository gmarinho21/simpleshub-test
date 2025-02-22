<script>
import { apiService } from '../services/api';


export default {
    name: 'PdfUploader',
    data() {
      return {
        isDragging: false,
      }
    },

  methods: {
    async handleFileSelect(e) {
      const file = e.target.files[0]
      this.uploadFile(file)
    },

    async handleFileDrop(e) {
      const file = e.dataTransfer.files[0]
      this.uploadFile(file)

    },

    async uploadFile(file) {
      if (!file || file.type !== 'application/pdf') {
        this.error = 'Por favor, selecione um arquivo PDF válido'
        return
      }
      try {
        const formData = new FormData();
        formData.append('pdf', file);
        const response = await apiService.uploadPdf(formData);
        console.log(response.data)
        this.$emit('upload-completo', response.data)
      } catch (error) {
        console.log('Erro', error)
      }
    }
  }

}
</script>

<template>
    <div class="pdf-uploader">
      <label for="fileInput">
      <div 
        class="upload-area"
        :class="{ 'is-dragging': isDragging }"
        @drag.prevent
        @dragstart.prevent
        @dragend.prevent
        @dragover.prevent
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleFileDrop"
      >
          <p >Arraste seu arquivo PDF ou clique para selecionar</p>
          <input
            type="file"
            id="fileInput"
            ref="fileInput"
            accept=".pdf"
            @change="handleFileSelect"
            class="file-input"
          >
        </div>
      </label>
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

      &:hover, &.is-dragging {
      background-color: #c5c5c5;
    }
  
      
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

  }
</style>