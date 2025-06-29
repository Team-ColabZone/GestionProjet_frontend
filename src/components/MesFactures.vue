<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Mes Factures</h2>

    <div
      v-if="user?.role === 'Dev' || user?.role === 'member'"
      class="bg-white p-4 rounded-lg shadow-md mb-6"
    ></div>

    <!-- Si aucune facture -->
    <p v-if="invoices.length === 0" class="text-gray-500 italic">
      Vous n'avez encore aucune facture.
    </p>

    <!-- Sinon, liste des factures -->
    <ul v-else class="space-y-2">
      <li v-for="invoice in invoices" :key="invoice.id" class="border p-3 rounded-md shadow-sm">
        <p><strong>Statut :</strong> {{ invoice.statut }}</p>
        <p><strong>Montant :</strong> {{ invoice.montantTotal }} f</p>
        <p><strong>Description :</strong> {{ invoice.description || 'Aucune' }}</p>

        <ul v-if="invoice.lignes?.length" class="mt-2 ml-4 list-disc text-sm">
          <li v-for="(ligne, idx) in invoice.lignes" :key="idx">
            {{ ligne.description }} : {{ ligne.quantite }} × {{ ligne.prixUnitaire }} f
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const invoices = ref([])
const token = localStorage.getItem('token')

const fetchMyInvoices = async () => {
  try {
    const { data } = await axios.get('http://localhost:3010/invoices/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
    invoices.value = data
  } catch (err) {
    console.error('Erreur chargement des factures :', err)
  }
}

onMounted(fetchMyInvoices)
</script>
