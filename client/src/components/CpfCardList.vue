<script>
export default {
    name: 'CpfCardList',
    props: {
        cpfs: {
            type: Array,
            required: true,
            default: () => []
        },
        paginaAtual: {
        type: Number,
        default: 1
        },
        itemsPorPagina: {
          type: Number,
          default: 50
        },
        totalItems: {
          type: Number,
          required: true
        }
    },
    emits: ['troca-pagina'],
    computed: {
      totalPaginas() {
        return Math.ceil(this.totalItems / this.itemsPorPagina)
      }
    },
    methods: {
      trocaPagina(pagina) {
        if (pagina >= 1 && pagina <= this.totalPaginas) {
          this.$emit('troca-pagina', pagina);
        }
      }
    }
}
</script>

<template>
    <div class="cpf-grid">
      <div v-if="cpfs.length === 0">
        <p>Nenhum CPF encontrado</p>
      </div>
      <div class="cpf-card" v-else v-for="cpf in cpfs" :key="cpf">
        <div class="cpf">{{ cpf.value }}</div>
        <div class="timestamp">{{cpf.timestamp ? new Date(cpf.timestamp).toLocaleString('pt-BR') : 'Agora' }}</div>
      </div>

    </div>
    <div v-if="totalPaginas > 1" class="paginacao">
      <button 
        :disabled="paginaAtual === 1"
        @click="trocaPagina(paginaAtual - 1)"
        class="paginacao-btn"
      >
        Anterior
      </button>
      
      <span class="paginacao-info">
        Página {{ paginaAtual }} de {{ totalPaginas }}
      </span>
      
      <button 
        :disabled="paginaAtual === totalPaginas"
        @click="trocaPagina(paginaAtual + 1)"
        class="paginacao-btn"
      >
        Próxima
      </button>
    </div>
    </template>

<style lang="scss">
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
      .paginacao {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    gap: 1rem;
  
    &-btn {
      padding: 0.5rem 1rem;
      border: 1px solid black;
      background-color: white;
      color: black;
      border-radius: 4px;
      cursor: pointer;
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &:hover:not(:disabled) {
        background-color: #ebebeb;
      }
    }
  
    &-info {
      color: #666;
    }
  }
</style>