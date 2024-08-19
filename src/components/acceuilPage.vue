<script setup>
import { MessageSquare, BellRing, SquarePlus, ListTodo, Users, Gauge, ArrowRight, ChevronUp, FolderGit2, X } from 'lucide-vue-next';
</script>


<template>
    <div class="page">

    </div>
    <nav class="pre_container1">
        <div class="logoflysoft">
            <img class="logo" src="../assets/images/logoflysoft.png" alt="logo Entreprise"
                style="margin-left: 2%;width: 60px; height: 60px; " />
        </div>
        <div class="user">
            <div class="message">
                <button class="icon" @click="showMessagePage">
                    <MessageSquare style="cursor: pointer" />
                </button>
            </div>
            <div class="notification">
                <button class="icon" @click="showNotificationPage">
                    <BellRing style="cursor: pointer" />
                </button>
            </div>
            <div class="profil" style="border-radius: 50%; background-color: white;">
                <button @click="showProfilPage">
                    <img class="logo" src="../assets/images/logoflysoft.png" alt="logo Entreprise"
                        style="margin-right: 2%; width: 30px; height: 30px;" />
                </button>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="side_barre">
            <nav style="width: 100%;">
                <ul style="margin-top: 40px;">
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'home' }"
                            style="display: flex;text-decoration: none;" @click="showPage('home')">
                            <Gauge />

                            <h3 :style="{ color: currentPage === 'home' ? '#202020c9' : 'white' }">Dashboard</h3>
                            <button @click="toggleProjectList"
                                style="background-color: transparent; border: none; cursor: pointer">
                                <ChevronUp
                                    :class="{ 'chevron-up': !isProjectListVisible, 'chevron-down': isProjectListVisible }"
                                    style="color: #000000; width: 24px; height: 24; margin-left: 95px" />
                            </button>
                        </button>
                    </li>

                    <div :class="{ 'project-list': true, 'visible': isProjectListVisible }" style="width: 292px;background-color: white;  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3); 
                    padding: 7px; border:1px solid #D9D9D9; border-radius: 8px; margin-left: 6%; ">
                        <div v-for="project in projects" :key="project.id" @click="selectProject(project.id)"
                            class="project-item" style="border-bottom: 1px solid #D9D9D9; cursor: pointer;">
                            <p class="project-item"
                                style="text-align: left;color: black; font-size: 13px; background-color: #F1F2F3;border-radius: 7px;padding-left: 8px;">
                                {{ project.projectname }}<br>
                                {{ project.description }}</p>
                        </div>
                        <div class="creer">
                            <div class="addProject" style="text-align: left; ">
                                <button class="addProjectbtn" @click="showModal1"
                                    style="background-color: transparent; border: none; cursor: pointer;display: flex;">
                                    <h3 style="width: 100%;font-size: 14px;">Créer un nouveau Projet</h3>
                                    <SquarePlus style="padding-left: 60px;width: 30px; height: 30px;" />
                                </button>
                            </div>
                            <div class="newprojectinvited" style="text-align: left; ">
                                <button class="addProjectbtn" @click="ShowInvitation()"
                                    style="background-color: transparent; border: none; cursor: pointer;display: flex;">
                                    <h3 style="width: 100%;font-size: 14px;">Nouveau projet invité</h3>
                                    <FolderGit2 style="padding-left: 75px;width: 35px; height: 35px;" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'backlogs' }"
                            style="display: flex;text-decoration: none;" @click="showPage('backlogs')">
                            <SquarePlus />

                            <h3 :style="{ color: currentPage === 'backlogs' ? '#202020c9' : 'white' }">
                                Backlogs</h3>
                            <ArrowRight class="fleche" />
                        </button>
                    </li>
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'tasks' }"
                            style="display: flex;text-decoration: none;" @click="showPage('tasks')">
                            <ListTodo />
                            <h3 :style="{ color: currentPage === 'tasks' ? '#202020c9' : 'white' }">Tâches</h3>
                            <ArrowRight class="fleche" />
                        </button>
                    </li>
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'team' }"
                            style="display: flex;text-decoration: none;" @click="showPage('team')">
                            <Users />
                            <h3 :style="{ color: currentPage === 'team' ? '#202020c9' : 'white' }">Membres</h3>
                            <ArrowRight class="fleche" />
                        </button>
                    </li>

                </ul>
            </nav>
        </div>

        <div style="margin-top: -14px;" class="" v-if="currentPage === 'home'">
            <dashboardPage />
        </div>

        <div style="display: flex; justify-content: space-between; width: 100%; display: block;" class="page notif"
            v-if="currentPage === 'backlogs'">
            <backlogsPage />
        </div>

        <div class="page" v-if="currentPage === 'tasks'">
            <tasksPage />
        </div>
        <div class="page" v-if="currentPage === 'team'">
            <teamMemberPage />
        </div>
        
        <div class="modals" v-if="modalVisible">
            <div class="details animate__animated animate__fadeInDown">
                <div class="close" @click="hideModal">
                    <X style="color: #000000; font-size: 24px;" />
                </div>
                <h1 style="color: #000000; text-align: center">Ajouter un projet</h1>
                <form @submit.prevent="createNewProject">
                    <div class="inp-field">
                        <h2 for="projectname">Nom du projet :</h2>
                        <input type="text" id="projectname" v-model="projectname" required>
                    </div>
                    <div class="inp-field">
                        <h2 for="description">Description :</h2>
                        <textarea name="description" id="description" v-model="description" cols="30"
                            rows="3"></textarea>
                    </div>
                    <div class="inp-field">
                        <h2 for="projectType" style="text-align: left;">Type de projet :</h2>
                        <input type="text" id="projectType" v-model="projectType" required>
                    </div>
                    <div class="inp-field">
                        <h2 for="start_date" style="text-align: left;">Date de début :</h2>
                        <input type="date" id="start_date" v-model="start_date" required>
                    </div>
                    <div class="inp-field">
                        <h2 for="end_date" style="text-align: left;">Date de fin :</h2>
                        <input type="date" id="end_date" v-model="end_date" required>
                    </div>
                    <button class="sub_butt" type="submit">Enregistrer le projet</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import dashboardPage from './dashboardPage.vue';
import backlogsPage from './backlogsPage.vue';
import tasksPage from './tasksPage.vue';
import teamMemberPage from './teamMemberPage.vue';
import config from "../config";
import axios from 'axios';

export default {
    components: {
        dashboardPage,
        backlogsPage,
        tasksPage,
        teamMemberPage,
    },
    data() {
        return {
            modalVisible: false,
            showMessagePage: false,
            showNotificationPage: false,
            currentPage: 'home',
            selectedButton: 'button4',
            teamMemberCount: 1,
            taskCount: 0,
            pendingTasksCount: 0,
            inProgressTasksCount: 0,
            completedTasksCount: 0,
            projectname: '',
            description: '',
            projectType: '',
            start_date: '',
            end_date: '',
            // budget: '',
            projects: [
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
        this.userId = localStorage.getItem('userId');
        this.projectId = localStorage.getItem('projectId');
        this.fetchTeamMemberCount();
        this.fetchPendingTasksCount();
        this.fetchInProgressTasksCount();
        this.fetchCompletedTasksCount();
        this.fetchTotalTasksCount();
    },
    methods: {
        hideModal() {
            this.modalVisible = false;
        },
        showModal1() {
            this.modalVisible = true;
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
        async createNewProject() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${config.apiBaseUrl}/projects`, {
                    projectname: this.projectname,
                    description: this.description,
                    projectType: this.projectType,
                    start_date: new Date(this.start_date), // Conversion en objet Date
                    end_date: new Date(this.end_date), // Conversion en objet Date
                    // budget: this.budget,
                    userId: this.userId // Assure-toi d'inclure l'ID de l'utilisateur
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.success = true;
                this.successMessage = response.data.message;
                // Réinitialiser les champs du formulaire
                this.projectname = '';
                this.description = '';
                this.projectType = '';
                this.start_date = '';
                this.end_date = '';
                // this.budget = '';
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response ? error.response.data.message : error.message;
            }
        },
        async fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/users/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.userData = response.data;
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des données utilisateur : ' + error.response.data.message;
            }
        },

        async fetchProjects() {
            try {
                const token = localStorage.getItem('token'); // ou une autre méthode pour récupérer le token
                const response = await axios.get(`${config.apiBaseUrl}/projects/user/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.projects = response.data;
                console.log(this.userId);
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets : ' + (error.response ? error.response.data.message : error.message);
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

.logoflysoft {
    margin-left: 20px;
}

body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    font-family: Monda;
}




.s_menu {
    width: 99%;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.icon {
    background-color: transparent;
    border: none;
    margin-top: 15px;
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


.contex h3 {
    font-size: 14px;
    text-align: left;
    padding-left: 8%;
    padding-bottom: 10%;

}

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: auto;
    font-family: Monda;
    /* background-color: rgba(0, 0, 0, 0.05); */
    background-color: white;
}

.pre_container1 {
    display: flex;
    flex: 1;
    justify-content: space-between;
    border-bottom: 1px solid #D9D9D9;
}

.profil {
    border-radius: 50% !important;
    border: 1px solid rgb(255, 123, 0);
    width: 60px;
    height: 60px;
}

.profil button {
    background-color: transparent;
    border: none;
    width: 100%;
}

.icon-lucide {
    width: 60px;
    height: 60px;
    color: #202020;
    stroke-width: 1px;

}

.fleche {
    margin-left: 100px;
    color: #000000;
    stroke-width: 2px;
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

.search-zone {
    display: flex;
    justify-content: flex-start;
    padding-left: 0.5%;
    padding-bottom: 20px;

}

.search-form {
    display: flex;

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

.addProjectbtn:hover {
    background-color: #F0F1FF !important;
}

.project-item:hover {
    background-color: #FFE8EF !important;
}

.chevron-up {
    transition: transform 0.3s;
    transform: rotate(0deg);
}

.chevron-down {
    transform: rotate(180deg);
    transition: transform 0.3s;
}

.project-list {
    display: none;
}

.project-list.visible {
    display: block;
}

/* .ext {
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-left: 2%;
    padding: 10px 20px !important;
    display: flex;
} */

.side_barre {
    width: 18%;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    height: 100vh;


}

.side_barre i {
    color: black !important;
    margin: 0 10px;
    font-size: 20px;
}

.side_barre h3 {
    color: black !important;
    width: 100px;
    text-align: left;
    margin: 0 10px;
    font-family: Monda;
}

.extra {
    width: 100%;
    height: 100vh;
    /* Hauteur fixe du conteneur */
    overflow-y: auto;
    margin: auto !important;
}

.page {
    background-color: transparent;
    width: 100%;
    /* margin-right: 5%; */
}

.entete {
    border: 2px solid #D9D9D9;
    border-radius: 8px;
    width: 99%;
    height: 62px;
    margin: auto;
    margin-top: 1%;
    margin-bottom: 20px;
    display: flex;


}

.modals {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 100%;
    top: 0%;
    left: 0%;
    height: 100vh;
    /* 
    margin: 0 13%; */
}

.close {
    text-align: end;
}

.close i {
    color: rgba(255, 0, 0, 0.945);
    font-size: 25px;
}

.details {
    background-color: white;
    width: 40%;
    margin: auto;
    margin-top: 20px;
    padding: 25px 25px;
    border-radius: 8px;
}

form {
    width: 100%;
    padding: 10px;
}

form .inp-field {
    display: block;
    width: 100%;
    /* margin-bottom: 10px; */
}

form .inp-field h2 {
    width: 100%;
    font-size: large;
    font-weight: 600;
    padding-left: 10px;
    margin-bottom: 3px !important;
    text-align: left !important;
}

form .inp-field input,
form .inp-field textarea {
    width: 94%;
    font-size: large;
    border: 1px solid #D9D9D9;
    border-radius: 8px;
    padding-left: 20px;
    padding-right: 20px;
    /* width: 90%; */
}

form .inp-field input {
    height: 45px;
}

.sub_butt {
    font-size: large;
    font-weight: bold;
    color: white;
    width: 50%;
    background-color: #000000;
    border: none;
    border-radius: 8px;
    padding: 10px 0;
    margin-top: 30px;
    margin-left: 48%;
}

.user {
    display: flex;
    justify-content: space-between;
    width: 8%;
}

.entete p {
    font-size: 16px;
    color: #000000;
    padding-left: 15px;
    font-weight: bold;
    padding-top: 4px;
}

.entete .ico-dash {
    padding-left: 1%;
    padding-top: 1%;
    padding-bottom: 3%;
}

/* h3 {
    color: #202020;
} */

/* p {
    color: rgba(0, 0, 0, 0.2);
    font-size: 12px;
} */

/*Scroll bar css*/
.container::-webkit-scrollbar {
    width: 0.1em;
    /* Largeur de la barre de défilement */
}

.extra::-webkit-scrollbar {
    width: 0.1em;
    /* Largeur de la barre de défilement */
}

.extra::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Couleur de la poignée de défilement */
}

.notif label {
    width: 30% !important;
}

.notif span {
    width: 70% !important;
}

.dev_butt {
    justify-content: space-between;
    display: flex;
    width: 30%;
    margin-right: 2%;
}

.dev_butt button {
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #202020ab;
    width: 48%;
    height: 30px;
}

button.active {
    background-color: rgba(0, 0, 0, 0.1);
    color: #202020ab;
}

.container::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Couleur de la poignée de défilement */
}

/*nav barre*/
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.men {
    display: inline;
    margin-right: 10px;
}

/* .dMois li:hover {
    background: transparent !important;

}

.dMois li {
    transition: all 0.3s;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

} */

li:hover {
    cursor: pointer;
}

.head {
    width: 37.5%;
    position: fixed;
    top: 7px;
    background-color: #ffffff;
    z-index: 9999;
}

.headt button {
    color: rgba(255, 0, 0, 0.678);
    font-size: 20px;
    border: none;
}

.headt {
    background-color: transparent;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.butt {
    border: none;
    background: none;
    cursor: pointer;
    width: 80%;
    margin: 40px auto;
    padding: 8px 1px;

}

.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-top: 150px;
}

.loading-indicator::after {
    content: "";
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #202020;
    border-top-color: #007A5E;
    border-bottom-color: #007A5E;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-indicator2::after {
    content: "";
    display: inline-block;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    border: 3px solid #06283D;
    border-top-color: #007A5E;
    border-bottom-color: #007A5E;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-indicator2 {
    display: flex;
    justify-content: center;
    height: 100px;
}

.selected {
    border: 1px solid white;
    background-color: #D9D9D9;
    border-radius: 8px;
    font-weight: bold !important;
    transition: all 0.3s;
    /* Ajoutez ici vos styles personnalisés pour le bouton sélectionné */
}

.cont {
    width: 100%;
    padding-bottom: 20px;
}

/* .cont1 {
    width: 100%;
    display: block;
    flex-wrap: nowrap;
    background-color: #202020;
    overflow: hidden;
} */
/* 
.cont2 {
    width: 100%;
    background-color: white;
    padding: 15px 0;
}

.cont2 label {
    font-size: 25px;
    font-weight: bold;
    width: 30%;
    text-align: right;
    color: #202020;
}

.cont2 textarea {
    width: 60%;
    height: 25px;
    border: 1px solid #202020a9;
}

.cont2 .btn {
    width: 30%;
    height: 30px;
    border: none;
    background-color: #007A5E;
    color: white;
    font-size: 18px;
} */

form div {
    width: 80%;
    /* display: flex;
    justify-content: space-between; */
    margin-top: 20px;
}

.profil {
    display: flex;
}

.profil h1 {
    font-size: 22px;

}

.name {
    margin: auto 15px;
}

.pList {
    margin-top: 50px;
}

.list {
    display: block;
}

.list li {
    display: flex;
    margin-top: 25px;
    width: 100%;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.list li span {
    font-size: 18px;
    margin: auto 10px;
    color: #202020b7 !important;
}

.list li img {
    height: 30px !important;
}

/*drop*/
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    box-shadow: none;
    border: 0 !important;
    background: #007A5E;
    width: 50% !;
    background-image: none;
    flex: 1;
    padding: 0 .5em;
    color: #fff;
    cursor: pointer;
    font-size: 1em;
    font-family: 'Open Sans', sans-serif;
}

select::-ms-expand {
    display: none;
}

.select {
    position: relative;
    display: flex;
    width: 55%;
    margin: auto;
    height: 3em;
    line-height: 3;
    background: #5c6664;
    overflow: hidden;
    border-radius: .25em;
}

.in_select {
    width: 55%;
    margin: auto;
    margin-top: 50px;
}

.in_select ul {
    width: 100%;
}

.in_select ul li {
    width: 98%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 25px;
    padding-left: 2%;
    display: flex;
    justify-content: space-between;
}

.in_select ul button {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: white;
}

.select::after {
    content: '\25BC';
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 1em;
    background: #2b2e2e;
    cursor: pointer;
    pointer-events: none;
    transition: .25s all ease;
}

.select:hover::after {
    color: #23b499;
}
</style>