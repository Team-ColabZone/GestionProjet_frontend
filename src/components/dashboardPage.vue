<script setup>
import { Users, Gauge, CircleGauge, ClockArrowDown, UserRoundCheck, Logs, TrendingUp, ChartPie, ChevronUp, ArrowDownUp } from 'lucide-vue-next';
</script>

<template>
    <div class="h-full w-full flex flex-col gap-4 p-2">
        <!-- Header Section -->
        <div class="flex items-center h-10 w-full gap-4 px-3 border rounded-lg">
            <Gauge />
            <p class="text-xl">Dashboard</p>
        </div>

        <!-- Statistics Section -->
        <div class="flex flex-wrap justify-between gap-4 w-full">
            <div class="stat-box flex flex-col justify-between bg-indigo-100 rounded-xl p-3">
                <div class="flex justify-between items-center gap-3 md:gap-5">
                    <h1 class="text-3xl font-medium lg:text-5xl lg:pl-3">{{ teamMemberCount }}</h1>
                    <Users class="w-10 h-10 font-thin md:h-10 md:w-12" />
                </div>
                <h3 class="text-xs mt-2">Nombre de membre</h3>
            </div>

            <div class="stat-box flex flex-col justify-between bg-pink-100 rounded-xl p-3">
                <div class="flex justify-between items-center gap-3 md:gap-5 ">
                    <h1 class="text-3xl font-medium lg:text-5xl lg:pl-3">20%</h1>
                    <CircleGauge class="w-10 h-10" />
                </div>
                <h3 class="text-xs mt-2">Pourcentage de réalisation</h3>
            </div>

            <div class="stat-box flex flex-col justify-between bg-green-100 rounded-xl pl-2 py-3 lg:p-3">
                <div class="flex justify-between items-center gap-3 md:gap-5 px-4">
                    <h1 id="taskRate" class="text-3xl font-medium lg:text-5xl lg:pl-3">{{ taskRate }}t/j</h1>
                    <ClockArrowDown class="w-11 h-11" />
                </div>
                <h3 class="text-xs mt-2">Taux de tache journaliere</h3>
            </div>

            <div class="stat-box flex flex-col justify-between bg-pink-50 rounded-xl  py-3 lg:p-3">
                <div class="flex justify-between items-center gap-3 md:gap-5 px-2 lg:px-4">
                    <h1 class="text-3xl font-medium lg:text-5xl lg:pl-3">01</h1>
                    <UserRoundCheck class="w-10 h-10" />
                </div>
                <h3 class="text-xs mt-2">Nombre de membres performant</h3>
            </div>

            <div class="stat-box flex flex-col justify-between bg-blue-50 rounded-xl p-3">
                <div class="flex justify-between items-center gap-3 md:gap-5">
                    <h1 class="text-3xl font-medium lg:text-5xl lg:pl-3">0{{ taskCount }}</h1>
                    <Logs class="w-10 h-10" />
                </div>
                <h3 class="text-xs mt-2">Nombre de tache</h3>
            </div>

            <div class="stat-box flex flex-col justify-between bg-lime-100 rounded-xl p-3">
                <div class="flex justify-between items-center gap-3 md:gap-5">
                    <h1 class="text-3xl font-medium lg:text-5xl lg:pl-3">30%</h1>
                    <TrendingUp class="w-10 h-10" />
                </div>
                <h3 class="text-xs mt-2">Taux de reactivité</h3>
            </div>
        </div>

        <!-- Search and Error Section -->
        <div class="flex flex-wrap w-full">
            <form action="" class="flex w-full md:w-1/2 gap-4 pr-0 md:pr-5">
                <div class="relative w-3/4">
                    <Search class="absolute left-2 top-2.5 text-gray-600 h-1/2" />
                    <input type="search" id="search-input"
                        class="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500"
                        placeholder="Rechercher..." />
                </div>
                <input type="submit" value="Rechercher"
                    class="w-1/4 h-11 bg-black text-white  rounded-lg hover:bg-slate-600 focus:outline-none" />
            </form>
            <div class="w-full md:w-1/2 flex items-center justify-center text-red-500 mt-4 md:mt-0">error message</div>
        </div>

        <!-- Task Sections -->
        <div class="flex gap-4 w-full h-full">
            <!-- Current Tasks -->
            <div class="task-box w-full lg:w-1/2">
                <div class="flex justify-between items-center border-b border-gray-300 p-2">
                    <div class="flex gap-2 items-center">
                        <ChartPie class="h-2/3 text-black" />
                        <p class="text-black text-base font-semibold">Tâches Courantes</p>
                    </div>
                    <button class="icon-ChevronUp" @click="showTaskList()"
                        style="border: none;background-color: transparent">
                        <ChevronUp />
                    </button>
                </div>
                <div class="h-full p-4"></div>
            </div>

            <!-- Best Contributors -->
            <div class="task-box w-full lg:w-1/4">
                <div class="flex justify-between items-center border-b border-gray-300 p-2">
                    <div class="flex gap-2 items-center">
                        <UserRoundCheck class="h-2/3 text-black" />
                        <p class="text-black text-base font-semibold">Meilleurs contributeurs</p>
                    </div>
                    <button class="icon-ChevronUp" @click="showTaskList()"
                        style="border: none;background-color: transparent">
                        <ChevronUp />
                    </button>
                </div>
                <div></div>
            </div>

            <!-- Task Overview -->
            <div class="task-box w-full flex flex-col justify-between lg:w-1/4">
                <div class="flex justify-between items-center border-b border-gray-300 p-2">
                    <div class="flex gap-2 items-center">
                        <ArrowDownUp class="task"
                            style="width: 24px; height: 24px; stroke-width: 1.5px; color: #000000;" />
                        <p style="color: #000000; padding-left: 15px; font-size: 15px; font-weight: bold;">Bilan des
                            tâches</p>
                    </div>
                    <button class="icon-ChevronUp" @click="showTaskList()"
                        style="border: none;background-color: transparent; cursor: pointer;">
                        <ChevronUp class="task" style="width: 24px;height: 24px; color: #6F6F6F" />
                    </button>
                </div>
                <div class="flex flex-col gap-2 p-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center">
                            <p class="text-black">{{ pendingTasksCount }}</p>
                        </div>
                        <p class="text-sm font-bold text-gray-600">Nombre de tâche en attente</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                            <p class="text-black">{{ inProgressTasksCount }}</p>
                        </div>
                        <p class="text-sm font-bold text-gray-600">Nombre de tâche en cours</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                            <p class="text-black">{{ completedTasksCount }}</p>
                        </div>
                        <p class="text-sm font-bold text-gray-600">Nombre de tâche terminée</p>
                    </div>
                </div>
                <div class="p-2 border border-gray-200">
                    <p class="text-sm font-bold text-right text-black boder">{{ taskCount }} tâche(s) au total</p>
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
            showMessagePage: false,
            showNotificationPage: false,
            currentPage: 'home',
            selectedButton: 'button4',
            teamMemberCount: 0,
            taskCount: 0,
            pendingTasksCount: 0,
            inProgressTasksCount: 0,
            completedTasksCount: 0,
            taskRate: 0,
            projects: [
                { id: 1, projectname: 'Projet A', description: 'Description du Projet A' },
                { id: 2, projectname: 'Projet B', description: 'Description du Projet B' },
            ], // Liste des projets
            selectedProjectId: '', // ID du projet sélectionné
            userId: '',
            projectId: '',
            userData: null,
            isProjectListVisible: false,
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
        this.fetchTeamMemberCount();
        this.fetchPendingTasksCount();
        this.fetchInProgressTasksCount();
        this.fetchCompletedTasksCount();
        this.fetchTotalTasksCount();
        this.fetchTaskRate();
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
        toggleProjectList() {
            this.isProjectListVisible = !this.isProjectListVisible;
        },
        selectProject(projectId) {
            this.selectedProjectId = projectId;
            localStorage.setItem('projectId', projectId); // Stocker l'ID du projet dans le localStorage
            this.$router.push('/accueilPage'); // Rediriger vers la page des détails du projet
        },
        async fetchTaskRate() {
            try {
                const response = await fetch(`http://localhost:3001/tasks/tauxTasksDay/${this.projectId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.taskRate = data.taskRate; // Adjust based on the actual structure of your response
            } catch (error) {
                console.error('Error fetching task rate:', error);
            }
        },

        async fetchTeamMemberCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/team-members/${this.projectId}/team/count`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.teamMemberCount = response.data.length;
                console.log(this.teamMemberCount);
                console.log(this.projectId)
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de personnels :', error);
            }
        },
        async fetchPendingTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.pendingTasksCount = response.data.length;
                console.log(this.pendingTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en attente :', error);
            }
        },
        async fetchInProgressTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/in-progress`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.inProgressTasksCount = response.data.length;
                console.log(this.inProgressTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en cours :', error);
            }
        },
        async fetchCompletedTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/completed`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.completedTasksCount = response.data.length;
                console.log(this.completedTasksCount);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches terminées :', error);
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
    }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

.stat-box {
    flex: 1 1 calc(10% - 1rem);
    max-width: 200px;
    margin-bottom: 1rem;
}

.task-box {
    min-height: 300px;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: white;
}
</style>