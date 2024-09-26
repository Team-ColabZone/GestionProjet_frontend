<template>
    <div class="flex flex-col gap-4 w-full h-full p-2">
        <div class="w-full flex items-center gap-2 p-2 border corder-gray-200 rounded">
            <Building2 />
            <span>Entreprises</span>
        </div>

        <div class="flex flex-col md:flex-row w-full gap-4 md:gap-8">
            <form action="" class="flex flex-col md:flex-row w-full md:w-1/2 gap-4">
                <div class="relative flex items-center w-full sm:w-3/4 ">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="search" id="search-input" v-model="searchQuery" @input="filterEntreprises"
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-base"
                        placeholder="Rechercher..." />
                </div>
                
                <ul v-if="filteredEntreprises.length && searchQuery.trim()"
                    class="absolute bg-white border border-gray-300 rounded-lg mt-10 z-10">
                    <li v-for="entreprise in filteredEntreprises" :key="entreprise.id" @click="selectEntreprise(entreprise)"
                        class="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        {{ entreprise.name }} - {{ entreprise.email}}
                    </li>
                </ul>
                <!-- <input type="submit" value="Rechercher"
                    class="w-full md:w-1/4 h-11 bg-black text-white font-bold rounded-lg hover:bg-slate-600 focus:outline-none"> -->
            </form>

            <!-- <div class="w-full md:w-1/2 flex justify-end mt-4 md:mt-0">
                <button
                    class="flex items-center bg-black rounded-lg p-2 h-full text-white hover:bg-slate-600 focus:outline-none"
                    @click="showModal2">
                    <Plus />
                    <span>Ajoute une entreprise</span>
                </button>
            </div> -->
        </div>

        <div class=" mt-8 flex-grow flex">
            <div class="border border-gray-300 rounded-lg p-2 w-full flex flex-col">
                <div class="flex justify-between items-center border-b border-gray-300 pb-1 mb-2">
                    <div class="flex items-center">
                        <building2 class="task text-xl text-black mr-2" />
                        <p class="text-black text-sm font-bold">Listes des entreprise</p>
                    </div>
                    <button @click="toggleteamEntrepriseList()" class="flex gap-1  text-black px-3 py-2 rounded-lg">
                        <ChevronUp :class="{
                            'chevron-down': !isEntrepriseListVisible, 'chevron-up': isEntrepriseListVisible,
                        }" class="w-full h-6 transition-transform" />
                    </button>
                </div>

                <div :class="{ block: isEntrepriseListVisible, hidden: !isEntrepriseListVisible }" class="flex-grow"
                    v-if="isEntrepriseListVisible">
                    <div class="overflow-y-auto" style="max-height: 50vh;">
                        <table class="min-w-full divide-y divide-gray-200 text-left">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Nom de
                                        l'entreprise</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Email</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Adresse</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="entreprise in entreprises" :key="entreprise.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">{{ entreprise.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ entreprise.email }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ entreprise.pobox }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <button type="button" class="text-black hover:text-green-900"
                                            @click="showMemberDetails()">
                                            <Eye class="w-full h-6" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../config";
import axios from 'axios';

export default {
    components: {
    },
    data() {
        return {
            isEntrepriseListVisible: true,
            entrepriseId: '',
            entreprises: [], // Liste des entreprises

            searchQuery: '',
            filteredEntreprises: [],
            searchedEntrepriseId: null,
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        this.entrepriseId = localStorage.getItem('entrepriseId');
        this.fetchEntreprises();
    },
    methods: {
        showModal2() {
            this.modalVisible = true
        },

        toggleteamEntrepriseList() {
            this.isEntrepriseListVisible = !this.isEntrepriseListVisible
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
                console.log(response.data);
                
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des entreprises : ' + (error.response ? error.response.data.message : error.message);
            }
        },


        filterEntreprises() {
            const query = this.searchQuery.toLowerCase();
            this.filteredEntreprises = this.entreprises.filter(entreprise => {
                const name = entreprise.name.toLowerCase();
                const email = entreprise.email.toLowerCase();
                const pobox = entreprise.pobox.toLowerCase();
                return name.includes(query) || email.includes(query) || pobox.includes(query)
            });
        },
        selectEntreprise(entreprise) {
            this.selectedEntrepriseId = entreprise.entrepriseId;
            this.searchQuery = entreprise.name;
            this.filteredEntreprise = [];
            this.scrollToEntreprise(entreprise.userId);
        },
        scrollToEntreprise(userId) {
            this.$nextTick(() => {
                const element = document.querySelector(`[data-entreprise-id="${userId}"]`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        },
    }
}
</script>
