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
      const files = Array.from(e.target.files);
        if (files.length > 0) {
          await this.uploadFiles(files);
        }
    },

    async handleFileDrop(e) {
      this.isDragging = false
      const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
        if (files.length > 0) {
          await this.uploadFiles(files);
        }
    },

    async uploadFiles(files) {
      try {
          this.loading = true;
          const formData = new FormData();

          files.forEach(file => {
            formData.append('pdf', file);
          });
  
          const response = await apiService.uploadPdf(formData);
          this.$emit('upload-completo', response.data.cpfs);
        } catch (error) {
          console.error('Upload error:', error);
        } finally {
          this.loading = false;
          this.$refs.fileInput.value = '';
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
            multiple
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