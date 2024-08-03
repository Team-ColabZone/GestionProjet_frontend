<template>
    <div class="container">
        <div class="side_barre">
            <nav class="headt">
                <div class="logoflysoft">
                    <img class="logo" src="../assets/logoflysoft.png" alt="logo Entreprise" style="margin-left: 2%;" />
                    <!-- <p class="text">Systeme de gestion de projet de <br> FLYSOFT ENGINEERING</p> -->
                </div>
                <div class="message">
                    <button @click="showMessagePage">
                        <i class="fa fa-power-off"></i>
                    </button>
                </div>
                <div class="notification">
                    <button @click="showNotificationPage">
                        <i class="fa fa-bell"></i>
                    </button>
                </div>
                <div class="profil">
                    <button @click="showProfilPage">
                        <img class="logo" src="../assets/logoflysoft.png" alt="logo Entreprise" style="margin-right: 2%;" />
                    </button>
                </div>
                <!-- <h2 style="margin-right: 2%; color: #007A5E;">{{ username }} <button @click="logout"><i
                            class="fa fa-power-off" aria-hidden="true"></i></button></h2> -->
            </nav>
            <hr style="width: 100%;color: #D9D9D9; size: 1px;">
            <nav style="width: 100%;">
                <center>
                    <!-- <img style="width: 100px; margin-top: 20px;" src="@/assets/flysoft.png" alt="" /> -->
                </center>


                <ul style="margin-top: 90px;">
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'home' }"
                            style="display: flex;text-decoration: none;" @click="showPage('home')">
                            <i :style="{ color: currentPage === 'home' ? '#202020c9' : 'white' }"
                                class="fas fa-pie-chart"></i>
                            <h3 :style="{ color: currentPage === 'home' ? '#202020c9' : 'white' }">Dashboard</h3>

                        </button>
                    </li>
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'backlogs' }"
                            style="display: flex;text-decoration: none;" @click="showPage('backlogs')">
                            <i :style="{ color: currentPage === 'backlogs' ? '#202020c9' : 'white' }"
                            class="fas fa-clock"></i>
                            <h3 :style="{ color: currentPage === 'backlogs' ? '#202020c9' : 'white' }">
                                Backlogs</h3>

                        </button>
                    </li>
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'tasks' }"
                            style="display: flex;text-decoration: none;" @click="showPage('tasks')">
                            <i :style="{ color: currentPage === 'tasks' ? '#202020c9' : 'white' }"
                                class="fas fa-tasks"></i>
                            <h3 :style="{ color: currentPage === 'tasks' ? '#202020c9' : 'white' }">Tâches</h3>

                        </button>
                    </li>
                    <li>
                        <button class="butt" :class="{ selected: currentPage === 'team' }"
                            style="display: flex;text-decoration: none;" @click="showPage('team')">
                            <i :style="{ color: currentPage === 'team' ? '#202020c9' : 'white' }"
                                class="fas fa-users"></i>
                            <h3 :style="{ color: currentPage === 'team' ? '#202020c9' : 'white' }">Membres
                            </h3>

                        </button>
                    </li>

                </ul>
            </nav>
        </div>
        <div class="extra">
           
            <div style="margin-top: -14px;" class="page" v-if="currentPage === 'home'">
                <div class="entete" style="border-radius: 8px; border-color: #D9D9D9;border:1px;">
                    <i class="fas fa-pie-chart"></i>
                    <p class="title_entete" style="font-size: 14px;padding-bottom: 25px;">Dashboard</p>
                </div>
                <div class="cont" >
                    <div class="s_menu">
                        <div class="contex" style="background-color: #F0F1FF;border-radius: 8px;">
                            <div class="nbre_icons">
                                <h1>01</h1>
                                <!-- <h1>{{ teamMemberCount }}</h1> -->
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Nombre de membre</h3>
                        </div>
                        <div class="contex" style="background-color: #FFE8EF;border-radius: 8px;">
                            <div class="nbre_icons">

                                <h1>20%</h1>
                                <i class="fas fa-users"></i>
                            </div>
                            <!-- <h1>{{ affectationCount }}%</h1> -->
                            <h3>Pourcentage de réalisation</h3>
                        </div>
                        <div class="contex" style="background-color: #EAFBEA;border-radius: 8px;">
                            <div class="nbre_icons">

                                <h1>30%</h1>
                                <i class="fas fa-users"></i>
                                <!-- <h1>{{ stageCount }}</h1> -->
                                <h3>Taux de tache journaliere</h3>
                            </div>
                        </div>
                        <div class="contex" style="background-color: #FDF2E1;border-radius: 8px;">
                            <div class="nbre_icons">

                                <h1>01</h1>
                                <!-- <h1>{{ taskCount }}</h1> -->
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Nombre de membres performant</h3>
                        </div>
                        <div class="contex" style="background-color: #EDF6FF;border-radius: 8px;">
                            <div class="nbre_icons">

                                <h1>04</h1>
                                <!-- <h1>{{ taskCount }}</h1> -->
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Nombre de tache</h3>
                        </div>
                        <div class="contex" style="background-color: #FAFFE6;border-radius: 8px;">
                            <div class="nbre_icons">

                            <h1>30%</h1>
                            <!-- <h1>{{ taskCount }}</h1> -->
                            <i class="fas fa-users"></i>
                             </div>
                            <h3>Taux de reactivité</h3>

                        </div>
                    </div>
                </div>
                <dashboardPage />
            </div>

            <div style="display: flex; justify-content: space-between; width: 100%; display: block;" class="page notif"
                v-if="currentPage === 'backlogs'">
                <!-- <div v-if="loading" class="loading-indicator">

                </div> -->
                <backlogsPage />
            </div>

            <div class="page" v-if="currentPage === 'tasks'">
                <tasksPage />
            </div>
            <div class="page" v-if="currentPage === 'team'">
                <teamMemberPage />
            </div>
            

           
                    
            <div v-if="modalVisible" class="modals">
                <div class="details animate__animated animate__fadeInDown">
                    <div class="close" @click="hideModal">
                        <i class="fa fa-window-close"></i>
                    </div>
            
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import dashboardPage from './dashboardPage.vue';
 import backlogsPage from './backlogsPage.vue';
 import tasksPage from './tasksPage.vue';
import teamMemberPage from './teamMemberPage.vue';
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
           
            showMessagePage: false,
            showNotificationPage:false,
            currentPage: 'home',
            selectedButton: 'button4',
            teamMemberCount: '',
            taskCount: '',
            // personnels: [],
            // username: '',
            // nom_prenom: '',
            // loading: false,
            // message: '',
            // selectedAffectations: [],

        };
    },
    mounted() {
        this.username = localStorage.getItem('username');
        this.fetchteamMemberCount()
        this.fetchtaskCount()
        
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.$router.push("/")
        },
       
        selectButton(button) {
            this.selectedButton = button;
        },
        showPage(page) {
            this.currentPage = page;
        },
       
        async fetchteamMemberCount() {
            try {
                const response = await axios.get('http://localhost:3001/team-count')
                this.teamMemberCount = response.data.count;
                console.log(this.teamMemberCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de personnels :', error)
            }
        },
        async fetchtaskCount() {
            try {
                const response = await axios.get('http://localhost:3001/task-count')
                this.taskCount = response.data.count;
                console.log(this.taskCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de affectation :', error)
            }
        },
       
    }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

.list_detail label {
    width: 30% !important;
    text-align: right;
}

.list_detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5%;
}

.detail_perso h3 {
    width: 67% !important;
    margin: 0 !important;
    padding: 0 !important;
}

.detail_perso {
    width: 100%;
}

.modals {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 100%;
    top: 0%;
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
    margin: 10% 23%;
    padding: 25px 25px;
    border-radius: 5px;
}

.actions {
    width: 50%;
    margin: auto;
    margin-top: 10%;
    justify-content: space-between;
    display: flex;
}

.actions .action {
    width: 47%;
    font-size: large;
    font-weight: 700;
    padding: 10px 0;
    border: none;
    color: white;
    border-radius: 5px;
}

.action:nth-child(1) {
    background-color: #007A5E;
}

.action:nth-child(2) {
    background-color: rgba(255, 0, 0, 0.815);
}

body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    font-family: Monda;
}

.personnel_list {
    width: 95%;
    margin: auto;
    margin-top: 30px;
}

.personnel_list .tete {
    border: 1px solid #007A5E;
    width: 96%;
    display: flex;
    justify-content: space-between;
    padding: 10px 2%;
    border-radius: 5px;
}

.danger {
    color: rgb(247, 13, 13) !important;
}

.personnel_list .titre1 {
    font-size: 25px;
    font-weight: bold;
    color: #007A5E;
    text-decoration: none;
}

.personnel_list .outil {
    width: 30%;
    margin: auto;
    margin-left: 50%;
    display: flex;
    justify-content: space-between;
}

.personnel_list .option {
    font-size: 19px;
    color: #007A5E;
    text-decoration: none;
}

.intitule {
    width: 100%;
    display: flex;
    margin-top: 20px;
}

.objets {
    margin-top: 10px;
    width: 100%;
    display: flex;
}

.objets .attr {
    font-size: 16px;
    width: 20%;
    font-weight: 200;
}

.attr {
    font-size: 20px;
    font-weight: bold;
    width: 25%;
}

.stat {
    font-style: italic;
    color: #007A5E;
}

.stat2 {
    font-style: italic;
    color: rgb(243, 21, 21);
}

.intitule .attr {
    font-size: 20px;
    font-weight: bold;
    width: 20%;
}

.s_menu {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

.s_menu .contex {
    width: 23%;
    height: 150px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    text-align: center;
    background-color: rgb(0, 122, 94);
    color: white;
}
.contex h1{
    font-weight: bold;
    font-size: 35px
}
h4 {
    color: #202020;
    font-size: 13px;
}

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: auto;
    font-family: Monda;
    background-color: rgba(0, 0, 0, 0.05);
}

label {
    width: 30%;
}

.span {
    font-weight: bold;
}

.ext {
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-left: 2%;
    padding: 10px 20px !important;
    display: flex;
}

.side_barre {
    width: 15%;
    background-color: #007A5E;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    height: 100vh;

}

.side_barre i {
    color: white !important;
    margin: 0 10px;
    font-size: 20px;
}

.side_barre h3 {
    color: white !important;
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
}

h3 {
    color: #202020;
}

p {
    color: rgba(0, 0, 0, 0.2);
    font-size: 12px;
}

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

.dMois li:hover {
    background: transparent !important;

}

.dMois li {
    transition: all 0.3s;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

}

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
    background-color: #0B9777;
    border-radius: 10px;
    font-weight: bold !important;
    transition: all 0.3s;
    /* Ajoutez ici vos styles personnalisés pour le bouton sélectionné */
}

.cont {
    width: 100%;
    padding-bottom: 20px;
}

.cont1 {
    width: 100%;
    display: block;
    flex-wrap: nowrap;
    background-color: #202020;
    overflow: hidden;
}

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
}

form div {
    width: 80%;
    display: flex;
    justify-content: space-between;
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