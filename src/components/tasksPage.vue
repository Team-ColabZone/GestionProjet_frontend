<script setup>
import { ListTodo, Search, Filter } from 'lucide-vue-next';
</script>


<template>
    <div class=" h-full w-full flex flex-col gap-4 p-2">
        <div class="flex items-center h-10 w-full gap-4 px-3 border rounded-lg">
            <ListTodo class="" />
            <p class="text-lg">Tâches</p>
        </div>

        <div class="flex flex-col sm:flex-row justify-between">
            <form class=" flex flex-1">
                <div class="relative flex items-center w-full sm:w-3/4">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="search" id="search-input"
                        class=" pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-base"
                        placeholder="Rechercher..." />
                </div>
                <div class=" ml-4">
                    <input type="submit" value="Rechercher"
                        class=" bg-black text-white font-bold py-2 px-6 rounded-lg cursor-pointer hover:bg-blue-700" />
                </div>
            </form>

            <div class="filter mt-4 sm:mt-0 sm:ml-4">
                <button
                    class="filterchbtn flex items-center justify-center w-full sm:w-auto bg-black text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700"
                    @click="showFilter()">
                    <Filter class="mr-2 w-6 h-6" />
                    <p>Voir les filtres</p>
                </button>
            </div>
        </div>

        <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            <div class="flex flex-col gap-2">
                <div class=" flex items-center">
                    <div class="w-6 h-6 rounded-full bg-yellow-300"></div>
                    <p class="font-bold text-sm px-2">EN ATTENTE</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0">{{ pendingTasksCount }}</p>
                    </div>
                </div>
                <div class=" border border-gray-300 rounded-lg p-4">asd</div>
            </div>

            <div class="flex flex-col gap-2">
                <div class=" flex items-center">
                    <div class="w-6 h-6 rounded-full bg-green-300"></div>
                    <p class="font-bold text-sm px-2">EN COURS</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0">{{ completedTasksCount }}</p>
                    </div>
                </div>
                <div class=" border border-gray-300 rounded-lg p-4">asd</div>
            </div>

            <div class="flex flex-col gap-2">
                <div class=" flex items-center">
                    <div class="w-6 h-6 rounded-full bg-blue-300"></div>
                    <p class="font-bold text-sm px-2">TERMINÉE</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0 border border-gray-300 rounded-lg">{{ inProgressTasksCount }}
                        </p>
                    </div>
                </div>
                <div class=" border border-gray-300 rounded-lg p-4">asd</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import config from "../config";

export default {
    components: {

    },
    data() {
        return {
            taskCount: 0,
            pendingTasksCount: 0,
            completedTasksCount: 0,
            inProgressTasksCount: 0,
            projects: [], // Liste des projets
            selectedProjectId: '', // ID du projet sélectionné
            userId: '',
            projectId: '',
            userData: null,
            isTaskListLateVisible: false,
            pendingTasks: [],
            inProgressTasks: [],
            completedTasks: [],
        };
    },
    mounted() {
        if (this.isConnected()) {
            this.userId = localStorage.getItem('userId');
            this.fetchUserData();
        } else {
            this.errorMessage = 'Utilisateur non connecté';
            this.$router.push('/auth'); // Rediriger vers la page de connexion
        }
        this.fetchProjects();
        this.projectId = localStorage.getItem('projectId');
        this.fetchPendingTasksCount();
        this.fetchInProgressTasksCount();
        this.fetchCompletedTasksCount();
        this.fetchTotalTasksCount();
        this.fetchPendingTasks();
        this.fetchInProgressTasks();
        this.fetchCompletedTasks();
    },
    methods: {
        isConnected() {
            return localStorage.getItem('token') !== null;
        },

        selectButton(button) {
            this.selectedButton = button;
        },
        showPage(page) {
            this.currentPage = page;
        },
        async fetchUserData() {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/users/${this.userId}`);
                this.userData = response.data;
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des données utilisateur : ' + error.response.data.message;
            }
        },

        async fetchProjects() {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/projects/user/:userId`);
                this.projects = response.data;
                console.log(this.userId)
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets : ' + error.response.data.message;
            }
        },
        showLateTaskList() {
            this.isTaskListLateVisible = !this.isTaskListLateVisible;
        },
        selectProject(projectId) {
            this.selectedProjectId = projectId;
            localStorage.setItem('projectId', projectId); // Stocker l'ID du projet dans le localStorage
            this.$router.push('/accueilPage'); // Rediriger vers la page des détails du projet
        },


        async fetchPendingTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.pendingTasksCount = response.data.length;
                console.log(this.pendingTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de tâches en attente :', error);
            }
        },
        async fetchInProgressTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/in-progress`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.inProgressTasksCount = response.data.length;
                console.log(this.inProgressTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de tache en cours :', error);
            }
        },
        async fetchCompletedTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/completed`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.completedTasksCount = response.data.length;
                console.log(this.completedTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de taches terminées :', error);
            }
        },
        async fetchTotalTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/count`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.taskCount = response.data;
                console.log(this.taskCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre total de tâches :', error);
            }
        },

        //Methode pour recupérer les taches en fonction des statut

        async fetchPendingTasks() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.pendingTasks = response.data;
                console.log(this.pendingTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en attente :', error);
            }
        },
        async fetchInProgressTasks() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/in-progress`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.inProgressTasks = response.data;
                console.log(this.inProgressTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en cours :', error);
            }
        },
        async fetchCompletedTasks() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/completed`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.completedTasks = response.data;
                console.log(this.completedTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches terminées :', error);
            }
        },

    }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

body {
    font-family: Monda;
}
</style>