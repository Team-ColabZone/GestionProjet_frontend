<script setup>
import { Users, Gauge, CircleGauge, ClockArrowDown, UserRoundCheck, Logs, TrendingUp, ChartPie, ChevronUp, ArrowDownUp } from 'lucide-vue-next';
</script>

<template>
    <div class=" flex flex-col w-full p-2 gap-4" >
        <div class="flex items-center w-full h-14 gap-4 px-3 border shadow-md rounded-lg">
            <Gauge />
            <p class="text-xl ">Dashboard</p>
        </div>

        <div class=" w-full pb-5">
            <div class="flex justify-between">
                <div class="bg-indigo-100 rounded-lg p-4 text-center w-auto" >
                    <div class="flex justify-between items-center">
                        <h1 class="text-4xl ">0{{ teamMemberCount }}</h1>
                        <Users class="w-10 h-10"/>
                    </div>

                    <h3 class="mt-2 text-black">Nombre de membre</h3>
                </div>

                <div class=" bg-pink-100 rounded-lg p-4 text-center w-auto" >
                    <div class="flex justify-between items-center">
                        <h1 class="text-4xl ">20%</h1>
                        <CircleGauge class="w-10 h-10 " />
                    </div>
                    <!-- <h1>{{ affectationCount }}%</h1> -->
                    <h3 class="mt-2 text-black">Pourcentage de réalisation</h3>
                </div>

                <div class="bg-green-100 rounded-lg p-4 text-center w-auto" >
                    <div class="flex justify-between items-center">
                        <h1 class="text-4xl ">30j/t</h1>
                        <ClockArrowDown class="w-10 h-10 " />
                        <!-- <h1>{{ stageCount }}</h1> -->
                    </div>

                    <h3 class="mt-2 text-black">Taux de tache journaliere</h3>
                </div>

                <div class="bg-pink-50 rounded-lg p-4 text-center w-auto" >
                    <div class="flex justify-between items-center">
                        <h1 class="text-4xl ">01</h1>
                        <!-- <h1>{{ taskCount }}</h1> -->
                        <UserRoundCheck class="w-10 h-10 " />
                    </div>

                    <h3 class="mt-2 text-black">Nombre de membres <br> performant</h3>
                </div>

                <div class="bg-blue-50 rounded-lg p-4 text-center w-auto" >
                    <div class="flex justify-between items-center">
                        <!-- <h1>04</h1> -->
                        <h1 class="text-4xl ">0{{ taskCount }}</h1>
                        <Logs class="w-10 h-10 " />
                    </div>

                    <h3 class="mt-2 text-black">Nombre de tache</h3>
                </div>

                <div class="bg-lime-100 rounded-lg p-4 text-center w-auto">
                    <div class="flex justify-between items-center">
                        <h1 class="text-4xl ">30%</h1>
                        <!-- <h1>{{ taskCount }}</h1> -->
                        <TrendingUp class="w-10 h-10 " />
                    </div>

                    <h3 class="mt-2 text-black">Taux de reactivité</h3>
                </div>
            </div>
        </div>

        <div class="flex w-full gap-8">
            <form action="" class="flex w-1/2 gap-4">
                <div class="flex relative item-center w-3/4">
                    <Search class="absolute left-2 top-2.5 text-gray-600 h-1/2" />
                    <input type="search" id="search-input" class=" w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500" placeholder="Rechercher...">
                </div>

                <input type="submit" value="Rechercher" class=" w-1/4 h-11 bg-black text-white font-bold rounded-lg hover:bg-slate-600 focus:outline-none">
                
            </form>

            <div class="w-1/2 ">error message</div>
        </div>

        <div class="flex gap-4">
            <div class="w-1/2 border border-gray-300 rounded-lg">
                <div class="flex items-center justify-between border-b border-gray-300 pt-1 pb-1">
                    <div class="flex gap-2 items-center pl-2">
                        <ChartPie class="h-2/3 text-black" />
                        
                        <p class="text-black text-base font-semibold">Tâches Courantes</p>
                    </div>

                    <div class="icon-ChevronUp pr-2 " >
                        <button class="" @click="showTaskList()" style="border: none;background-color: transparent">
                            <ChevronUp />
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-1/4 border border-gray-300 rounded-lg">
                <div class="title-div1" style="display: flex; padding-left: 1%; border-bottom: 1px solid #D9D9D9; padding-top: 1.5%; padding-bottom: 1.5%; height: 45px;">
                    <div class="icon-chart" style="padding-left: 2%; padding-top: 3%;">
                        <UserRoundCheck class="task" style="width: 24px; height: 24px; stroke-width: 1.5px; color: #000000;" />
                    </div>

                    <div class="contributeurs">
                        <p style="color: #000000; padding-left: 15px; font-size: 15px; font-weight: bold;">
                            Meilleurs contributeurs
                        </p>
                    </div>

                    <div class="icon-ChevronUp" style="padding-left: 40%; padding-top: 3%;">
                        <button class="task-list" @click="showTaskList()" style="border: none;background-color: transparent">
                            <ChevronUp class="task" style="width: 24px;height: 24px; color: #6F6F6F; cursor: pointer;" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="w-1/4 border border-gray-300 rounded-lg">
                <div class="title-div1" style="display: flex; padding-left: 4%; border-bottom: 1px solid #D9D9D9; padding-top: 1.5%; padding-bottom: 1.5%; height: 45px;">
                    <div class="icon-chart" style="padding-left: 2%; padding-top: 3%;">
                        <ArrowDownUp class="task" style="width: 24px; height: 24px; stroke-width: 1.5px; color: #000000;" />
                    </div>

                    <div class="contributeurs">
                        <p style="color: #000000; padding-left: 15px; font-size: 15px; font-weight: bold;">
                            Bilan des tâches
                        </p>
                    </div>

                    <div class="icon-ChevronUp" style="padding-left: 50%; padding-top: 3%;">
                        <button class="task-list" @click="showTaskList()" style="border: none;background-color: transparent; cursor: pointer;">
                            <ChevronUp class="task" style="width: 24px;height: 24px; color: #6F6F6F" />
                        </button>
                    </div>
                </div>

                <div class="task-status" style="display: block; padding-left: 4%; border-bottom: 1px solid #D9D9D9">
                    <div class="status">
                        <div class="statut-attente" style="display: flex; padding-bottom: 30px; margin-top: 50px">
                            <div class="attente" style="width: 50px; height: 50px; border-radius: 50%; background-color: #FFD1A6; ">
                                <p style="color: #000000; text-align: center;">
                                    {{ pendingTasksCount }}
                                </p>
                            </div>

                            <div class="text1" style="padding-left: 20px;">
                                <p style="color: #858383; font-size: 14px; font-weight: bold">
                                    Nombre de tâche en attente
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="status">
                        <div class="statut-encours" style="display: flex; padding-bottom: 30px">
                            <div class="encours" style="width: 50px; height: 50px; border-radius: 50%; background-color: #86FD92">
                                <p style="color: #000000; text-align: center;">
                                    {{ inProgressTasksCount }}
                                </p>
                            </div>

                            <div class="text1" style="padding-left: 20px;">
                                <p style="color: #858383; font-size: 14px; font-weight: bold">
                                    Nombre de tâche en cours
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="status">
                        <div class="statut-end" style="display: flex; padding-bottom: 20px; margin-bottom: 30px">
                            <div class="end" style="width: 50px; height: 50px; border-radius: 50%; background-color: #B3E2FC">
                                <p style="color: #000000; text-align: center;">
                                    {{ completedTasksCount }}
                                </p>
                            </div>

                            <div class="text1" style="padding-left: 20px;">
                                <p style="color: #858383; font-size: 14px; font-weight: bold">
                                    Nombre de tâche terminée
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="task-total">
                    <p style="color: #000000; font-size: 14px;font-weight: bold;text-align: right; padding-right: 20px">
                        {{ taskCount }} tâche(s) au total
                    </p>
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
            teamMemberCount: 1,
            taskCount: 0,
            pendingTasksCount: 0,
            inProgressTasksCount: 0,
            completedTasksCount: 0,
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

        async fetchTeamMemberCount() {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/team-members/${this.projectId}/team/count`);
                this.teamMemberCount = response.data;
                console.log(this.teamMemberCount);
                console.log(this.projectId)
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de personnels :', error);
            }
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
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    font-family: Monda;
}

</style>