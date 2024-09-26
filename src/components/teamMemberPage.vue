<script setup>
import { Users, List, Plus, Search, ChevronUp, Eye } from 'lucide-vue-next';
</script>


<template>
    <div class="h-full w-full flex flex-col gap-4 p-2">
        <!-- Header Section -->
        <div class="flex items-center h-10 w-full gap-4 px-3 border rounded-lg">
            <Users class="ico-dash text-xl mr-2" />
            <p class="title_entete text-xl">Equipe du Projet</p>
        </div>

        <!-- Search Bar Section -->
        <div class="flex flex-col sm:flex-row justify-between">
            <form class=" flex flex-1">
                <div class="relative flex items-center w-full sm:w-3/4 ">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="search" id="search-input" v-model="searchQuery" @input="filterMembers"
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-base"
                        placeholder="Rechercher..." />
                </div>
                <ul v-if="filteredMembers.length && searchQuery.trim()"
                    class="absolute bg-white border border-gray-300 rounded-lg mt-10 z-10">
                    <li v-for="member in filteredMembers" :key="member.userId" @click="selectMember(member)"
                        class="px-4 py-2 cursor-pointer hover:bg-gray-100">
                        {{ member.userMember.firstname }} {{ member.userMember.lastname }} - {{ member.userMember.email
                        }}
                    </li>
                </ul>
            </form>

            <div class="mt-4 sm:mt-0 sm:ml-4">
                <button
                    class="flex items-center justify-center w-full sm:w-auto bg-black text-white  py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-600 focus:outline-none"
                    @click="showModalMembers()">
                    <Plus class="mr-2 w-4 h-4" />
                    <p>Ajouter un membre</p>
                </button>
            </div>
        </div>
        <!-- Team Section -->
        <div class=" mt-8 flex-grow flex">
            <div class="border border-gray-300 rounded-lg p-2 w-full flex flex-col">
                <div class="flex justify-between items-center border-b border-gray-300 pb-1 mb-2">
                    <div class="flex items-center">
                        <List class="task text-xl text-black mr-2" />
                        <p class="text-black text-sm font-bold">Listes des collaborateurs</p>
                    </div>
                    <button @click="toggleteamMemberList()" class="flex gap-1  text-black px-3 py-2 rounded-lg">
                        <ChevronUp :class="{
                            'chevron-down': !isteamMemberListVisible,
                            'chevron-up': isteamMemberListVisible,
                        }" class="w-full h-6 transition-transform" />

                    </button>
                </div>

                <div :class="{ block: isteamMemberListVisible, hidden: !isteamMemberListVisible }" class="flex-grow"
                    v-if="isteamMemberListVisible">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-gray-200 text-left">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Nom & Profil</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Email</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Contact</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Role</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="member in projectMembers" :key="member.userId"
                                    :data-member-id="member.userId"
                                    :class="{ 'bg-gray-200': member.userId === selectedMemberId }"
                                    class="hover:bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center space-x-2">
                                            <img class="border border-gray-200 h-11 w-11 rounded-full object-cover object-center mr-5"
                                                :src="member.userMember.avatar" alt="profil" />
                                            {{ member.userMember.firstname }} {{ member.userMember.lastname }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ member.userMember.email }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ member.userMember.phonenumber }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ member.Role.nom }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <button type="button" class="text-black hover:text-green-900"
                                            @click="showMemberDetails(member)">
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

    <div class="fixed h-full inset-0 bg-black/50 flex items-center justify-center z-50" v-if="modalmembers">
        <div class="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-3xl">
            <div class="h-auto flex justify-between content-center w-full">
                <h1 class=" text-black mb-6">AJOUTER UN MEMBRE AU PROJET</h1>
                <button @click="hideModalmembers">
                    <X class="text-black text-2xl" />
                </button>
            </div>

            <form @submit.prevent="addMember" class="flex flex-col gap-6">
                <div class="flex gap-2">
                    <div class="w-1/2">
                        <label for="email" class="block text-black text-sm font-bold mb-2">
                            Email
                        </label>
                        <input type="text" id="email" v-model="email" @input="searchEmails"
                            class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"
                            placeholder="Rechercher un email..." />
                        <ul v-if="filteredEmails.length" class="bg-white border rounded mt-2">
                            <li v-for="(filteredEmail, index) in filteredEmails" :key="index"
                                @click="selectEmail(filteredEmail)" class="p-2 cursor-pointer hover:bg-gray-100">
                                {{ filteredEmail }}
                            </li>
                        </ul>
                    </div>

                    <div class="w-1/2">
                        <label for="roleId" class="block text-black text-sm font-bold mb-2">
                            Role
                        </label>

                        <select v-model="roleId"
                            class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none">
                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.nom }}</option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        class="w-2/5 bg-black text-white p-3 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-100"
                        type="submit">
                        <span v-if="!membreLoading">
                            Ajouter
                        </span>
                        <div v-else class="flex justify-center">
                            <span  class="inline-block w-6 h-6 border-4 border-gray-400 border-t-black border-b-black rounded-full animate-spin"></span>
                        </div>
                    </button>
                </div>
            </form>
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
            email: '',
            modalmembers: false,
            membreLoading: false,
            projectId: '',
            roleId: '',
            userId: '',
            usercreatedId: '',
            emails: [], // This should be fetched from the system
            filteredEmails: [],
            roles: [],
            userData: null,
            isteamMemberListVisible: true,
            projectMembers: [],//tableau des membres du projet

            searchQuery: '',
            filteredMembers: [],
            selectedMemberId: null,
        };
    },

    mounted() {
        if (this.isConnected()) {
            this.usercreatedId = localStorage.getItem('userId');
            this.projectId = localStorage.getItem('projectId');
            this.userId = localStorage.getItem('IdCollaborateur')
            this.fetchUserData();
            this.fetchUsersEmails();
            this.fetchAllRoles();
            this.fetchProjectMembers();
        } else {
            this.errorMessage = 'Utilisateur non connecté';
            this.$router.push('/auth'); // Rediriger vers la page de connexion
        }
    },

    methods: {
        hideModalmembers() {
            this.modalmembers = false;
        },
        showModalMembers() {
            this.modalmembers = true;
        },
        isConnected() {
            return localStorage.getItem('token') !== null;
        },

        selectButton(button) {
            this.selectedButton = button;
        },
        showPage(page) {
            this.currentPage = page;
        },

        searchEmails() {
            this.filteredEmails = this.emails.filter((e) =>
                e.toLowerCase().includes(this.email.toLowerCase())
            );
        },

        async selectEmail(email) {
            this.email = email;
            // console.log(this.email)
            this.filteredEmails = [];
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${config.apiBaseUrl}/users/email/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const user = response.data;
                console.log(user)
                this.userId = user.id; // Assigner l'ID de l'utilisateur récupéré
                // console.log("ceci est l'id du user selectionné")
                localStorage.setItem('IdCollaborateur', user.id);
                // console.log(this.userId)
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur specifique:', error);
            }

        },

        async fetchUserData() {
            try {
                const token = localStorage.getItem('token');                
                const response = await axios.get(`${config.apiBaseUrl}/users/${this.usercreatedId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("this the user Data", response.data);
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des données utilisateur : ' + error.response.data.message;
            } finally {
                this.loading = false;
            }
        },


        toggleteamMemberList() {
            this.isteamMemberListVisible = !this.isteamMemberListVisible;
        },

        //recuperation des emails de tout les user de la plateforme
        async fetchUsersEmails() {
            try {
                const token = localStorage.getItem('token'); // ou une autre méthode pour récupérer le token
                const response = await axios.get(`${config.apiBaseUrl}/users/emails`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.emails = response.data;
                // console.log(this.userId);
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des emails : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        async fetchAllRoles() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/roles`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.roles = response.data;
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des roles : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        async addMember() {
            this.membreLoading = true;
            try {
                const token = localStorage.getItem('token');
                // const userId = localStorage.getItem('IdCollaborateur');

                const response = await axios.post(`${config.apiBaseUrl}/team-members`, {
                    projectId: this.projectId,
                    roleId: this.roleId,
                    userId: this.userId,
                    usercreatedId: this.usercreatedId,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.success = true;
                this.successMessage = response.data.message;
                this.membreLoading = false;
                console.log("Membre ajouter au project avec succces!!!")
                // Réinitialiser les champs du formulaire
                this.email = '';
                this.roleId = '';
                this.fetchProjectMembers();
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response ? error.response.data.message : error.message;
                console.log("Erreur lors de l'ajout du membre");
                console.log(error);
                this.membreLoading = false;
            }
        },

        async fetchProjectMembers() {
            console.log("Bonjour: Voici l'id du project sélectionné");
            console.log(this.projectId);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/team-members/project/${this.projectId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.projectMembers = response.data;
                console.log("Bonsoir");
                console.log("Voici la liste des membres d'équipe");
                console.log(this.projectMembers);
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des membres du projet : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        filterMembers() {
            const query = this.searchQuery.toLowerCase();
            this.filteredMembers = this.projectMembers.filter(member => {
                const fullName = `${member.userMember.firstname} ${member.userMember.lastname}`.toLowerCase();
                const email = member.userMember.email.toLowerCase();
                const phoneNumber = member.userMember.phonenumber.toLowerCase();
                const role = member.Role.nom.toLowerCase();
                return fullName.includes(query) || email.includes(query) || phoneNumber.includes(query) || role.includes(query);
            });
        },
        selectMember(member) {
            this.selectedMemberId = member.userId;
            this.searchQuery = `${member.userMember.firstname} ${member.userMember.lastname}`;
            this.filteredMembers = [];
            this.scrollToMember(member.userId);
        },
        scrollToMember(userId) {
            this.$nextTick(() => {
                const element = document.querySelector(`[data-member-id="${userId}"]`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.selectedMemberId = null;
            }
        }
    }
};
</script>



<style>
body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
}

.chevron-up {
    transition: transform 0.3s;
    transform: rotate(0deg);
}

.chevron-down {
    transition: transform 0.3s;
    transform: rotate(180deg);
}

</style>