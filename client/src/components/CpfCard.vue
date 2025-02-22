<script>
export default {
    name: 'CpfCard',
    props: {
        cpfs: {
            type: Array,
            required: true,
            default: () => []
        }
    }
}
</script>

<template>
    <div class="cpf-grid">
      <div v-if="cpfs.length === 0" class="empty-state">
        <p>Nenhum CPF encontrado</p>
      </div>
      <div class="cpf-card" v-else v-for="cpf in cpfs" :key="cpf">
        <div class="cpf">{{ cpf.value }}</div>
        <div class="timestamp">{{ new Date(cpf.timestamp).toLocaleString('pt-BR') }}</div>
      </div>
    </div>
    </template>

<style>
   .cpf-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    
   .cpf-card {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 15px;
      transition: transform 0.2s, box-shadow 0.2s;
   }

   .cpf {
        font-size: 18px;
        font-weight: 500;
      }
  
      .timestamp {
        margin-top: 8px;
        font-size: 12px;
      }
</style>