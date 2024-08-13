<script setup>
import { Users, Gauge, CircleGauge, ClockArrowDown, UserRoundCheck, Logs, TrendingUp, ChartPie, ChevronUp, ArrowDownUp } from 'lucide-vue-next';
</script>

<template>
    <div>
        <div class="entete">
            <Gauge class="ico-dash"/>
            <p class="title_entete">Dashboard</p>
        </div>

        <div class="cont">
            <div class="s_menu">
                <div class="contex" style="background-color: #F0F1FF;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>0{{ teamMemberCount }}</h1>
                        <Users class="icon-lucide" />
                    </div>

                    <h3>Nombre de membre</h3>
                </div>

                <div class="contex" style="background-color: #FFE8EF;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>20%</h1>
                        <CircleGauge class="icon-lucide" />
                    </div>
                    <!-- <h1>{{ affectationCount }}%</h1> -->
                    <h3>Pourcentage de réalisation</h3>
                </div>

                <div class="contex" style="background-color: #EAFBEA;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>30%</h1>
                        <ClockArrowDown class="icon-lucide" />
                        <!-- <h1>{{ stageCount }}</h1> -->
                    </div>

                    <h3>Taux de tache journaliere</h3>
                </div>

                <div class="contex" style="background-color: #FDF2E1;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>01</h1>
                        <!-- <h1>{{ taskCount }}</h1> -->
                        <UserRoundCheck class="icon-lucide" />
                    </div>

                    <h3>Nombre de membres performant</h3>
                </div>

                <div class="contex" style="background-color: #EDF6FF;border-radius: 8px;">
                    <div class="nbre_icons">
                        <!-- <h1>04</h1> -->
                        <h1>0{{ taskCount }}</h1>
                        <Logs class="icon-lucide" />
                    </div>

                    <h3>Nombre de tache</h3>
                </div>

                <div class="contex" style="background-color: #FAFFE6;border-radius: 8px;">
                    <div class="nbre_icons">
                        <h1>30%</h1>
                        <!-- <h1>{{ taskCount }}</h1> -->
                        <TrendingUp class="icon-lucide" />
                    </div>

                    <h3>Taux de reactivité</h3>
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

        <div class="body-milieu" style="display: flex; ">
            <div class="tache-courante" style="border: 1px solid #D9D9D9; width: 950px;border-radius: 8px; margin-left: 0.5%;">
                <div class="title-div1" style="display: flex; padding-left: 1%; border-bottom: 1px solid #D9D9D9; padding-top: 1%; padding-bottom: 1%; height: 40px;">
                    <div class="icon-chart" style="padding-left: 1%; padding-top: 1.5%;">
                        <ChartPie class="task" style="width: 24px; height: 24px; stroke-width: 1.5px; color: #000000;" />
                    </div>

                    <div class="tache-courante">
                        <p style="color: #000000; padding-left: 20px; font-size: 15px; font-weight: bold;">Tâches Courantes</p>
                    </div>

                    <div class="icon-ChevronUp" style="padding-left: 75%; padding-top: 1.5%;">
                        <button class="task-list" @click="showTaskList()" style="border: none;background-color: transparent">
                            <ChevronUp class="task" style="width: 24px;height: 24px; color: #6F6F6F; " />
                        </button>
                    </div>
                </div>
            </div>

            <div class="meilleur-contributeurs" style="border: 1px solid #D9D9D9; width: 450px; border-radius: 8px; margin-left: 0.5%; margin-left: 2%;">
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

            <div class="bilan" style="border: 1px solid #D9D9D9; width: 455px; border-radius: 8px; margin-left: 0.5%; margin-left: 2%;">
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

.logoflysoft {
    margin-left: 20px;
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

.icon-lucide {
    width: 60px;
    height: 60px;
    color: #202020;
    stroke-width: 1px;
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
</style>