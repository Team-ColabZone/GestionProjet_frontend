<script setup>
import { SquarePlus, ListVideo, ListCheck, ClockArrowDown, Logs, ChevronUp } from 'lucide-vue-next';
</script>


<template>
    <div class="backlogs-container">
        <div class="entete">
            <SquarePlus class="ico-dash" />
            <p class="title_entete">Backlogs</p>
        </div>

        <div class="cont">
            <div class="s_menu">
                <div class="contex" style="background-color: #F0F1FF;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>02</h1>
                        <!-- <h1>0{{ pendingTasksCount }}</h1> -->
                        <ListVideo class="icon-lucide" />
                    </div>
                    <h3>Nombre de tache a faire</h3>
                </div>

                <div class="contex" style="background-color: #FFDBE6;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>05</h1>
                        <ListCheck class="icon-lucide" />
                    </div>
                    <!-- <h1>{{ completedTasksCount }}%</h1> -->
                    <h3>Nombre de tache terminée</h3>
                </div>

                <div class="contex" style="background-color: #EAFBEA;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>03</h1>
                        <ClockArrowDown class="icon-lucide" />
                        <!-- <h1>{{ tasklateCount }}</h1> -->
                    </div>
                    <h3>Nombre de tache en retard</h3>
                </div>

                <div class="contex" style="background-color: #EDF6FF;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>12</h1>
                        <!-- <h1>0{{ taskCount }}</h1> -->
                        <Logs class="icon-lucide" />
                    </div>
                    <h3>Nombre de tache</h3>
                </div>
            </div>
        </div>

        <div class="search-zone">
            <form action="" class="search-form">
                <div class="search-barrediv">
                    <Search class="icon-search" />
                    <input type="search" id="search-input" class="search-barre" placeholder="Rechercher...">
                </div>

                <div class="search-butt">
                    <input type="submit" value="Rechercher" class="searchbtn">
                </div>
            </form>
        </div>

        <div class="body-milieu">
            <div class="tache-late"
                style="border: 1px solid #D9D9D9; width: 99%;border-radius: 8px; margin-left: 0.5%;">
                <div class="title-div1"
                    style="display: flex; padding-left: 0.5%; border-bottom: 1px solid #D9D9D9; height: 40px; padding-top: 0.5%; padding-bottom: 0.5%;">
                    <div class="icon-chart" style="padding-top: 0.5%;">
                        <ClockArrowDown class="task"
                            style="width: 24px; height: 24px; stroke-width: 1.5px; color: #000000;" />
                    </div>

                    <div class="tache-late">
                        <p
                            style="color: #000000; padding-left: 20px; padding-top: 0.1%; padding-bottom: 4%; font-size: 14px; font-weight: bold;">
                            Tâches en Retard</p>
                    </div>

                    <div class="icon-ChevronUp" style="padding-left: 88%;">
                        <button class="task-list" @click="showLateTaskList()"
                            style="border: none;background-color: transparent;">
                            <ChevronUp
                                :class="{ 'chevron-up': !isTaskListLateVisible, 'chevron-down': isTaskListLateVisible }"
                                class="task"
                                style="width: 24px;height: 24px; color: #6F6F6F; margin-top: 25%; cursor: pointer;" />
                        </button>
                    </div>
                </div>

                <div :class="{ 'taskLate-list': true, 'visible': isTaskListLateVisible }" class="list-late">
                    <div class="list-late-title"
                        style="display: flex; justify-content: space-between; padding-left: 20px; padding-right: 30px; margin-top: 10px;">
                        <p>Nom de la tache</p>
                        <p>Responsable(s)</p>
                        <p>Statut</p>
                        <p>Date début</p>
                        <p>Date fin</p>
                        <p>Date Actuelle</p>
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
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    font-family: Monda;
}

.backlogs-container {
    width: 99%;
    margin: auto;
}

.entete {
    border: 2px solid #D9D9D9;
    border-radius: 8px;
    width: 99%;
    height: 62px;
    margin: auto;
    margin-top: 4px;
    margin-bottom: 20px;
    display: flex;
}

.entete .ico-dash {
    padding-left: 1%;
    padding-top: 1%;
    padding-bottom: 3%;
}

.entete p {
    font-size: 16px;
    color: #000000;
    padding-left: 15px;
    font-weight: bold;
    padding-top: 4px;
}

.cont {
    width: 100%;
    padding-bottom: 20px;
}

.s_menu {
    width: 99%;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.s_menu .contex {
    width: 240px;
    height: 150px;
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); */
    border-radius: 8px;
    text-align: center;
    /* background-color: rgb(0, 122, 94); */
    color: #000000;
    padding-left: 1%;
    padding-right: 1%;
}

.s_menu .contex .nbre_icons {
    display: flex;
    justify-content: space-between;
    flex: 1;
}

.s_menu .contex .nbre_icons .icon-lucide {
    font-size: 50px;
    padding-top: 10%;
    padding-right: 8%;
}

.contex h1 {
    font-weight: bold;
    font-size: 38px;
    padding-left: 8%;
}

.icon-lucide {
    width: 60px;
    height: 60px;
    color: #202020;
    stroke-width: 1px;
}

.contex h3 {
    font-size: 14px;
    text-align: left;
    padding-left: 8%;
    padding-bottom: 10%;
}

.search-zone {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.5%;
    padding-bottom: 20px;
}

.search-form {
    display: flex;
    border: 1px solid red;

}

form div {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border: 1px solid red;
}

.search-barrediv {
    display: flex;
    position: relative;
}

.icon-search {
    position: absolute;
    left: 10px;
    padding-top: 1%;
}

.search-barre {
    height: 45px;
    width: 730px;
    border: 1px solid #D9D9D9;
    border-radius: 8px;
    padding-left: 50px;
    /* Espace pour l'icône */
    box-sizing: border-box;
    font-size: 18px;
}

.search-butt {
    margin-left: 10px;
}

.searchbtn {
    /* padding: 5px 10px; */
    background-color: #000000;
    color: white;
    font-weight: bold;
    /* Texte en gras */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    height: 45px;
    width: 200px;
    font-size: 12px;
}

.searchbtn:hover {
    background-color: #0056b3;
}

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

.list-late-title p {
    font-size: 14px;
    font-weight: bold;
    color: solid black;
}
</style>