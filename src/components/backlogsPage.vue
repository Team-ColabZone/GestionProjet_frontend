<script setup>
import { SquarePlus, ListVideo, ListCheck, ClockArrowDown, Logs, ChevronDown } from 'lucide-vue-next';
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
                        class="searchbtn bg-black text-white font-bold rounded-lg py-2 px-6 hover:bg-gray-800" />
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
                    <button class="flex gap-1 bg-black hover:hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                        @click="addtask()">
                        <Plus class="h-6 " />
                        <span>Ajouter une tache</span>
                    </button>
                </div>

                <div :class="{ 'taskLate-list': true, 'visible': isTaskListLateVisible }" class="list-late flex-grow">
                    <div class="list-late-title flex justify-between px-4">
                        <p class="text-sm font-bold">Nom de la tache</p>
                        <p class="text-sm font-bold">Responsable(s)</p>
                        <p class="text-sm font-bold">Statut</p>
                    </div>
                </div>
            </div>
        </div>

        <modal class="fixed inset-0 backdrop-blur-sm flex justify-end z-50" v-if="modalTasks">
            <button @click="closeNewTask()" class="self-start p-6">
                <X class="text-black text-2xl" />
            </button>

            <div
                class="flex flex-col bg-white p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-4xl">

                <div class="flex justify-between">
                    <h1 class="text-center text-2xl text-gray-800 ">AJOUTER UNE TACHE</h1>
                    <button class="w-1/4 px-3 bg-black text-white rounded hover:bg-gray-600 " type="submit">
                        Ajouter
                    </button>
                </div>

                <form @submit.prevent="createNewTask" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-4 border-t border-b border-gray-300">
                        <input type="text" id="name" placeholder="Titre de la tache" v-model="taskname" required class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200">

                        <textarea id="description" placeholder="Veuillez saisir une description de la tache" v-model="description" cols="30" rows="3"
                            class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200"></textarea>
                    </div>

                    <div class="w-full flex flex-col md:flex-row gap-5">
                        <div class="w-full">
                            <label for="Attribuer" class="block text-gray-700 text-sm font-bold mb-2">Attribuer
                                a</label>
                            <input type="text" v-model="Attribuer" required
                                class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                        </div>

                        <div class="w-full relative">
                            <div class="mb-2 w-full">
                                <label for="Status" class="block text-gray-700 text-sm font-bold mb-2">Statut de la
                                    tache
                                </label>
                                <select v-model="statut" @click="toggleDropdown1"
                                    class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none">
                                    <option v-for="status in statuses" :key="status" :value="priority">{{ status }}
                                    </option>
                                </select>
                            </div>

                            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown
                                    :class="{ 'chevron-down': isDropdown1Open, 'chevron-up': !isDropdown1Open }"
                                    class="w-5 h-5 text-gray-500" />
                            </span>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-5">
                        <div class="w-full md:w-1/2">
                            <div class="mb-4">
                                <label for="Planing" class="block text-gray-700 text-sm font-bold mb-2">
                                    Planning début et fin
                                </label>
                                <div class="flex w-full gap-2">
                                    <input type="date" v-model="start_date" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                                    <input type="date" v-model="end_date" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                                </div>
                            </div>
                        </div>

                        <div class="w-full md:w-1/2 relative">
                            <div class="mb-4 w-full">
                                <label for="Priorité" class="block text-gray-700 text-sm font-bold mb-2">
                                    Priorité de la tache
                                </label>
                                <select v-model="priority" @click="toggleDropdown2"
                                    class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none">
                                    <option v-for="priority in priorities" :key="priority" :value="priority"
                                        class="mt-2 rounded-lg">
                                        {{ priority }}
                                    </option>
                                </select>
                            </div>
                            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown :class="{ 'chevron-down': isPriorityOpen, 'chevron-up': !isPriorityOpen }"
                                    class="w-5 h-5 text-gray-500" />
                            </span>
                        </div>
                    </div>

                    <div class="w-full flex flex-col md:flex-row gap-5">
                        <div class="w-full">
                            <label for="Budjet" class="block text-gray-700 text-sm font-bold mb-2">
                                Budget de la tache
                            </label>
                            <input type="text" v-model="budget" required
                                class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                        </div>

                        <div class="w-full">
                            <label for="piece" class="block text-gray-700 text-sm font-bold mb-2">Piece jointe</label>
                            <input type="text" v-model="piece" required
                                class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-5">
                        <div class="w-full md:w-1/2">
                            <input type="text" placeholder="Ajouter un commentaire a la tache"
                                class="w-full h-full border border-200 focus:outline-none focus:ring focus:ring-gray-300">
                        </div>

                        <div class="w-full md:w-1/2">
                            <label for="Type" class="block text-gray-700 text-sm font-bold mb-2">Type de tache</label>
                            <input type="text" v-model="Priorité" required
                                class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">
                        </div>
                    </div>
                </form>
            </div>
        </modal>
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
            modalTasks: false,
            taskCount: 0,
            completedTasksCount: 0,
            pendingTasksCount: 0,
            tasklateCount: 0,
            projects: [], // Liste des projets
            selectedProjectId: '', // ID du projet sélectionné
            userId: '',
            projectId: '',
            userData: null,

            taskname: '',
            description: '',
            start_date: '',
            end_date: '',
            statut: '',
            budget: '',
            taskType: '',
            priority: '',
            taskId: '',
            

            isDropdown1Open: false,
            selectedStatus: 'Select Status',
            statuses: ['EN_ATTENTE', 'EN_COURS', 'TERMINEE'],

            selectedPriority: '',
            priorities: ['ELEVEE', 'MOYENNE', 'FAIBLE'],
            placeholder: 'Select Priority',
            isPriorityOpen: false,
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

        addtask() {
            this.modalTasks = true
        },

        closeNewTask() {
            this.modalTasks = false;
        },

        toggleDropdown1() {
            this.isDropdown1Open = !this.isDropdown1Open;
        },

        toggleDropdown2() {
            this.isPriorityOpen = !this.isPriorityOpen;
        },

        selectStatus(status) {
            this.selectedStatus = status;
            this.isDropdown1Open = false;
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

<style scoped></style>