<template>
    <div class="flex flex-col gap-4 w-full h-full p-2">
        <div class="w-full flex items-center gap-2 p-2 border corder-gray-200 rounded">
            <Building2 />
            <span>Entreprises</span>
        </div>

        <div class="flex w-full gap-8">
            <form action="" class="flex w-1/2 gap-4">
                <div class="flex relative item-center w-3/4">
                    <Search class="absolute left-2 top-2.5 text-gray-600 h-1/2" />
                    <input type="search" id="search-input"
                        class=" w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500"
                        placeholder="Rechercher...">
                </div>

                <input type="submit" value="Rechercher"
                    class=" w-1/4 h-11 bg-black text-white font-bold rounded-lg hover:bg-slate-600 focus:outline-none">

            </form>

            <div class="w-1/2 flex justify-end">
                <button class="flex items-center bg-black rounded-lg p-2 h-full text-white hover:bg-slate-600 focus:outline-none" @click="showModal2">
                    <Plus />
                    <span>Ajoute une entreprise</span>
                </button>
            </div>
        </div>

        <div class=" mt-8 flex-grow flex">
            <div class="border border-gray-300 rounded-lg p-2 w-full flex flex-col">
                <div class="flex justify-between items-center border-b border-gray-300 pb-1 mb-2">
                    <div class="flex items-center">
                        <building2 class="task text-xl text-black mr-2" />
                        <p class="text-black text-sm font-bold">Listes des entreprise</p>
                    </div>
                    <button @click="toggleteamEntrepriseList()" class="flex gap-1  text-black px-3 py-2 rounded-lg">
                        <ChevronUp :class="{ 'chevron-down': !isEntrepriseListVisible, 'chevron-up': isEntrepriseListVisible,
                        }" class="w-full h-6 transition-transform" />
                    </button>
                </div>

                <div :class="{ block: isEntrepriseListVisible, hidden: !isEntrepriseListVisible,}" class="flex-grow" v-if="isEntrepriseListVisible">
                    <table class="min-w-full divide-y divide-gray-200 text-left">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Nom de l'entreprise</th>
                                <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Email </th>
                                <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Adresse </th>
                                <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Date Ajout </th>
                                <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Actions </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="entreprise in entreprises" :key="entreprise.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">{{ entreprise.name }}asd</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ entreprise.email }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ entreprise.adress }}</td>
                                <!-- <td class="px-6 py-4 whitespace-nowrap">{{ member.Role.nom }}</td> -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button type="button" class="text-black hover:text-green-900" @click="showMemberDetails()">
                                        <Eye class=" w-full h-6" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../config";
import axios from 'axios';

export default{
    components: {
    },
    mounted() {
        this.fetchEntreprises();
        this.userId = localStorage.getItem('userId');
        this.entrepriseId = localStorage.getItem('entrepriseId');
    },
    data() {
        return {
            isEntrepriseListVisible: true,
            entrepriseId: '',
            entreprises: [], // Liste des entreprises
        }
    },
    methods: {
        showModal2() {
            this.modalVisible = true
        },
        
        toggleteamEntrepriseList() {
            this.isEntrepriseListVisible =!this.isEntrepriseListVisible
        },

        async fetchEntreprises() {
            try {
                const token = localStorage.getItem('token'); // ou une autre méthode pour récupérer le token
                const response = await axios.get(`${config.apiBaseUrl}/entreprises/user/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.entreprises = response.data;
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des entreprises : ' + (error.response ? error.response.data.message : error.message);
            }
        },
    }
}
</script>
