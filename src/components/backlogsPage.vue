<script setup>
import { SquarePlus, ListVideo, ListCheck, ClockArrowDown, Logs, ChevronUp } from 'lucide-vue-next';
</script>


<template>
    <div class="backlogs-container w-full p-4 flex flex-col min-h-screen">
        <!-- Header Section -->
        <div class="entete flex items-center border-2 border-gray-300 rounded-lg px-4 py-2 mb-6">
            <SquarePlus class="ico-dash text-xl mr-2" />
            <p class="title_entete text-lg font-bold">Backlogs</p>
        </div>

        <!-- Stat Cards Section -->
        <div class="cont">
            <div class="s_menu grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Card 1 -->
                <div class="contex bg-blue-50 rounded-lg p-4 text-center">
                    <div class="nbre_icons flex justify-between items-center">
                        <h1 class="text-4xl font-bold">02</h1>
                        <ListVideo class="icon-lucide text-4xl" />
                    </div>
                    <h3 class="text-sm mt-2">Nombre de tache à faire</h3>
                </div>

                <!-- Card 2 -->
                <div class="contex bg-pink-100 rounded-lg p-4 text-center">
                    <div class="nbre_icons flex justify-between items-center">
                        <h1 class="text-4xl font-bold">05</h1>
                        <ListCheck class="icon-lucide text-4xl" />
                    </div>
                    <h3 class="text-sm mt-2">Nombre de tache terminée</h3>
                </div>

                <!-- Card 3 -->
                <div class="contex bg-green-50 rounded-lg p-4 text-center">
                    <div class="nbre_icons flex justify-between items-center">
                        <h1 class="text-4xl font-bold">03</h1>
                        <ClockArrowDown class="icon-lucide text-4xl" />
                    </div>
                    <h3 class="text-sm mt-2">Nombre de tache en retard</h3>
                </div>

                <!-- Card 4 -->
                <div class="contex bg-blue-100 rounded-lg p-4 text-center">
                    <div class="nbre_icons flex justify-between items-center">
                        <h1 class="text-4xl font-bold">12</h1>
                        <Logs class="icon-lucide text-4xl" />
                    </div>
                    <h3 class="text-sm mt-2">Nombre de tache</h3>
                </div>
            </div>
        </div>

        <!-- Search Bar Section -->
        <div class="search-zone mt-6">
            <form action="" class="search-form flex w-full max-w-4xl">
                <div class="search-barrediv flex items-center relative w-3/4">
                    <Search class="icon-search absolute left-4 text-xl" />
                    <input type="search" id="search-input"
                        class="search-barre w-full border border-gray-300 rounded-lg pl-12 pr-4 py-2 text-lg focus:ring focus:border-blue-300"
                        placeholder="Rechercher..." />
                </div>
                <div class="search-butt ml-4">
                    <input type="submit" value="Rechercher"
                        class="searchbtn bg-black text-white font-bold rounded-lg py-2 px-6 hover:bg-blue-700" />
                </div>
            </form>
        </div>

        <!-- Task List Section -->
        <div class="body-milieu mt-8 flex-grow flex">
            <div class="tache-late border border-gray-300 rounded-lg p-4 w-full flex flex-col">
                <div class="title-div1 flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                    <div class="flex items-center">
                        <ClockArrowDown class="task text-xl text-black mr-2" />
                        <p class="text-black text-sm font-bold">Tâches en Retard</p>
                    </div>
                    <button class="task-list" @click="showLateTaskList()">
                        <ChevronUp
                            :class="{ 'chevron-up': !isTaskListLateVisible, 'chevron-down': isTaskListLateVisible }"
                            class="task text-gray-500 cursor-pointer" />
                    </button>
                </div>

                <div :class="{ 'taskLate-list': true, 'visible': isTaskListLateVisible }" class="list-late flex-grow">
                    <div class="list-late-title flex justify-between px-4">
                        <p class="text-sm font-bold">Nom de la tache</p>
                        <p class="text-sm font-bold">Responsable(s)</p>
                        <p class="text-sm font-bold">Statut</p>
                        <p class="text-sm font-bold">Date début</p>
                        <p class="text-sm font-bold">Date fin</p>
                        <p class="text-sm font-bold">Date Actuelle</p>
                    </div>
                </div>
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
            completedTasksCount: 0,
            pendingTasksCount: 0,
            tasklateCount: 0,
            projects: [], // Liste des projets
            selectedProjectId: '', // ID du projet sélectionné
            userId: '',
            projectId: '',
            userData: null,
            isTaskListLateVisible: false,
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
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/pending`);
                this.pendingTasksCount = response.data.length;
                console.log(this.pendingTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en attente :', error);
            }
        },
        async fetchInProgressTasksCount() {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/in-progress`);
                this.inProgressTasksCount = response.data.length;
                console.log(this.inProgressTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en cours :', error);
            }
        },
        async fetchCompletedTasksCount() {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/completed`);
                this.completedTasksCount = response.data.length;
                console.log(this.completedTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches terminées :', error);
            }
        },
        async fetchTotalTasksCount() {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/count`);
                this.taskCount = response.data;
                console.log(this.taskCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre total de tâches :', error);
            }
        },
    }
};

</script>

<style scoped>
.chevron-up {
    transition: transform 0.3s;
    transform: rotate(0deg);
}

.chevron-down {
    transform: rotate(180deg);
    transition: transform 0.3s;
}

.taskLate-list {
    display: none;
}

.taskLate-list.visible {
    display: block;
}
</style>