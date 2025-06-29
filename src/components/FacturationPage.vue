<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Facturation</h2>

    <!-- ✅ Formulaire réservé aux ADMIN et CHEF_PROJET -->
    <div
      v-if="user?.role === 'admin' || user?.role === 'chef_projet'"
      class="bg-white p-4 rounded-lg shadow-md mb-6"
    >
      <h3 class="text-lg font-semibold mb-2">Créer une facture</h3>

      <form @submit.prevent="submitInvoice">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            v-model="form.userEmail"
            list="emailOptions"
            type="email"
            placeholder="Email de l'utilisateur"
            class="input"
            required
          />
          <datalist id="emailOptions">
            <option v-for="email in availableEmails" :key="email" :value="email" />
          </datalist>

          <select v-model="form.statut" class="input" required>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <input v-model.number="form.montantTotal" type="number" placeholder="MONTANT" class="input" required />
          <input v-model="form.description" type="text" placeholder="Description (optionnelle)" class="input" />
        </div>

        <!-- Lignes de factures -->
        <div class="mt-4">
          <h4 class="font-medium mb-2">Lignes de facture</h4>
          <div
            v-for="(ligne, index) in form.lignes"
            :key="index"
            class="border p-3 rounded-md mb-3 bg-gray-50"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input v-model="ligne.description" type="text" class="input" placeholder="Ex: Développement" required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                <input v-model.number="ligne.quantite" type="number" class="input" placeholder="Ex: 5" required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Prix unitaire (f)</label>
                <input v-model.number="ligne.prixUnitaire" type="number" class="input" placeholder="Ex: 100" required />
              </div>
            </div>

            <div class="flex justify-end mt-2">
              <button @click.prevent="removeLine(index)" class="text-red-600 hover:underline text-sm">✖ Supprimer</button>
            </div>
          </div>

          <button @click.prevent="addLine" class="text-black-600 hover:underline text-sm">+ Ajouter une ligne</button>
        </div>

        <button type="submit" class="mt-4 bg-black text-white px-4 py-2 rounded active:bg-gray-300">Créer</button>
      </form>
    </div>

    <!-- Liste des factures -->
    <div>
      <h3 class="text-lg font-semibold mb-2">Liste des factures</h3>
      <ul class="space-y-2">
        <li v-for="invoice in invoices" :key="invoice.id" class="border p-3 rounded-md shadow-sm">
          <div class="flex justify-between items-center">
            <div>
              <p><strong>ID :</strong> {{ invoice.id }}</p>
              <p><strong>Statut :</strong> {{ invoice.statut }}</p>
              <p><strong>Montant :</strong> {{ invoice.montantTotal }} f</p>
              <p><strong>Lignes :</strong> {{ invoice.lignes.length }}</p>
            </div>
            <button @click="toggleDetails(invoice.id)" class="text-black-500 hover:underline">
              {{ selectedInvoiceId === invoice.id ? 'Masquer' : 'Détails' }}
            </button>
          </div>

          <!-- Détails -->
          <div v-if="selectedInvoiceId === invoice.id" class="mt-2 border-t pt-2">
            <p><strong>Description :</strong> {{ invoice.description || 'Aucune' }}</p>
            <ul class="mt-2">
              <li v-for="(ligne, idx) in invoice.lignes" :key="idx">
                - {{ ligne.description }} : {{ ligne.quantite }} × {{ ligne.prixUnitaire }} f
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const token = ref(null)
const user = ref(null)
const availableEmails = ref([])
const invoices = ref([])
const selectedInvoiceId = ref(null)

const form = ref({
  userEmail: '',
  statut: 'PENDING',
  montantTotal: 0,
  description: '',
  lignes: [
    { description: '', quantite: 1, prixUnitaire: 0 }
  ]
})

const addLine = () => {
  form.value.lignes.push({ description: '', quantite: 1, prixUnitaire: 0 })
}

const removeLine = (index) => {
  form.value.lignes.splice(index, 1)
}

onMounted(async () => {
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    token.value = storedToken
    const payload = JSON.parse(atob(storedToken.split('.')[1]))
    user.value = payload
  }
    await fetchAvailableEmails()
    await fetchInvoices()
})

const fetchAvailableEmails = async () => {
  try {
    const { data } = await axios.get('http://localhost:3010/users/emails', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    availableEmails.value = data
    console.log('📧 Emails récupérés :', availableEmails.value)

  } catch (err) {
    console.error('❌ Erreur lors du chargement des emails :', err)
  }
}

const submitInvoice = async () => {
  alert("Création de la facture en cours...");

  if (!token.value) {
    alert("Vous devez être connecté pour créer une facture.");
    return;
  }

  try {
    if (!form.value.userEmail) {
      alert("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // 🔁 Récupérer l'ID de l'utilisateur (celui pour qui on crée la facture)
    const res = await axios.get(`http://localhost:3010/users/by-email/${form.value.userEmail}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });

    const userId = res.data?.id;

    // 🔓 Décoder le token pour récupérer l'ID du créateur
    const payloadToken = JSON.parse(atob(token.value.split('.')[1]));
    const createdById = payloadToken.userId; // 👈 ID du créateur (ADMIN ou CHEF_PROJET)

    const payload = {
      statut: form.value.statut,
      montantTotal: form.value.montantTotal,
      description: form.value.description,
      lignes: form.value.lignes,
      userId: userId,         // 👈 L'employé concerné
      createdById: createdById // ✅ Le créateur de la facture
    };

    console.log("✅ Payload envoyé :", payload);

    const response = await axios.post('http://localhost:3010/invoices', payload, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });

    console.log('➡️ Token utilisé :', token.value);
    console.log('➡️ Payload JWT :', payloadToken);
    console.log('➡️ createdById :', createdById);
    console.log('➡️ Données envoyées au backend :', payload);


    invoices.value.push(response.data);
    resetForm();
  } catch (err) {
    console.error('❌ Erreur complète :', err);
    console.error('❌ Réponse API :', err.response?.data);
    alert("Erreur lors de la création de la facture.");
  }
};


const fetchInvoices = async () => {
  try {
    const { data } = await axios.get('http://localhost:3010/invoices', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    console.log("✅ Factures récupérées depuis le backend :", data)
    invoices.value = data
  } catch (err) {
    console.error('Erreur lors de la récupération des factures', err)
  }
}

const toggleDetails = (id) => {
  selectedInvoiceId.value = selectedInvoiceId.value === id ? null : id
}

const resetForm = () => {
  form.value = {
    userEmail: '',
    statut: 'PENDING',
    montantTotal: 0,
    description: '',
    lignes: [{ description: '', quantite: 1, prixUnitaire: 0 }]
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-2 py-1 w-full;
}
</style>
