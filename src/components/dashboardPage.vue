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
        <div class="flex flex-wrap justify-between gap-3 md:gap-4 w-full">
            <div class="stat-box bg-indigo-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52">
                <div class="flex justify-between items-center">
                    <h1 class="text-4xl font-bold">{{ teamMemberCount }}</h1>
                    <Users class="w-10 h-9 md:h-10 md:w-12" />
                </div>
                <h3 class="text-sm mt-2">Nombre de membre</h3>
            </div>

            <div class="stat-box bg-pink-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52">
                <div class="flex justify-between items-center gap-3 md:gap-5">
                    <h1 class="text-4xl font-bold">{{ (realisationRate).toFixed(0) }}%</h1>
                    <CircleGauge class="w-10 h-9 md:h-10 md:w-12" />
                </div>
                <h3 class="text-sm mt-2">Pourcentage de réalisation</h3>
            </div>

            <div class="stat-box bg-green-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52">
                <div class="flex justify-between items-center">
                    <h1 class="text-4xl font-bold">{{ (taskRate).toFixed(2) }}t/j
                    </h1>
                    <ClockArrowDown class="w-10 h-9 md:h-10 md:w-12" />
                </div>
                <h3 class="text-sm mt-2">Taux de tache journaliere</h3>
            </div>

            <div class="stat-box bg-pink-50 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52">
                <div class="flex justify-between items-center gap-3 md:gap-5 px-2 lg:px-4">
                    <h1 class="text-4xl font-bold">{{ powerMembersCount }}</h1>
                    <UserRoundCheck class="w-10 h-9 md:h-10 md:w-12" />
                </div>
                <h3 class="text-sm mt-2">Nombre de membres performant</h3>
            </div>

            <div class="stat-box bg-blue-50 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52">
                <div class="flex justify-between items-center gap-3 md:gap-5">
                    <h1 class="text-4xl font-bold">0{{ taskCount }}</h1>
                    <Logs class="w-10 h-9 md:h-10 md:w-12" />
                </div>
                <h3 class="text-sm mt-2">Nombre de tache</h3>
            </div>

            <div class="stat-box bg-lime-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52">
                <div class="flex justify-between items-center gap-3 md:gap-5">
                    <h1 class="text-4xl font-bold">{{ (reactivityRate).toFixed(0) }}%</h1>
                    <TrendingUp class="w-10 h-9 md:h-10 md:w-12" />
                </div>
                <h3 class="text-sm mt-2">Taux de reactivité</h3>
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
            <!-- <div class="w-full hidden md:w-1/2 md:flex items-center justify-center text-red-500 mt-4 md:mt-0">error message</div> -->
        </div>

        <!-- Task Sections -->
        <div class="flex flex-wrap md:flex-nowrap gap-4 w-full h-full md:max-h-80">
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
                <div class="h-full p-4 overflow-y-auto currentTaskTable" >
                    <div v-for="task in commonTasks" :key="task.id" class="flex justify-between items-center mb-2">
                        <div :class="[getPriorityClass(task.priority), 'priority-bar']"></div>
                        <div class="flex-1 ml-2">
                            <p class="font-semibold">{{ task.taskname }}</p>
                            <p class="text-sm text-gray-600">{{ task.description }}</p>
                        </div>
                        <div :class="getStatusClass(task.status)" class="w-24 text-center">
                            {{ task.status }}
                        </div>
                    </div>
                </div>
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
                <div class="p-4">
                    <div v-for="(member, userId) in powerMembers" :key="userId" class="flex items-center mb-4">
                        <img v-if="member.details" :src="member.details.avatar" alt="Avatar"
                            class="w-12 h-12 rounded-full border object-cover object-center border-gray-300 mr-4">
                        <div class="flex-1">
                            <p v-if="member.details" class="font-semibold">{{ member.details.firstname }} {{
                                member.details.lastname }}</p>
                            <p v-if="member.role" class="text-sm text-gray-600">{{ member.role }}</p>
                        </div>
                        <p class="font-semibold">{{ Number(member.count).toFixed(2) }}%</p>
                    </div>
                </div>
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
            projects: [], // Liste des projets
            selectedProjectId: '', // ID du projet sélectionné
            userId: '',
            projectId: '',
            userData: {},
            isProjectListVisible: false,
            // taskRate1: 0,
            reactivityRate: 0,
            realisationRate: 0,
            commonTasks: [], //Listes des taches courantes
            powerMembers: {}, //Listes des membres performant
            powerMembersCount: 0, //Nombres de membres performant du projet
            avatar: '',
            firstname: '',
            lastname: '',
            nom: '',
            profile: {},
        };
    },
    mounted() {
        if (this.isConnected()) {
            this.userId = localStorage.getItem('userId');
            this.projectId = localStorage.getItem('projectId');
            this.fetchUserData();
        } else {
            this.errorMessage = 'Utilisateur non connecté';
            this.$router.push('/auth'); // Rediriger vers la page de connexion
        }
        this.fetchProjects();

        this.fetchTeamMemberCount();
        this.fetchPendingTasksCount();
        this.fetchInProgressTasksCount();
        this.fetchCompletedTasksCount();
        this.fetchTotalTasksCount();
        this.fetchTaskRate();
        this.fetchCommonTasks();
        // this.fetchTaskRate();
        // this.fetchTaskRate1();
        this.fetchReactivityRate();
        this.fetchRealisationRate();
        this.fetchPowerMembers();

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
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/users/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("this the user Data", response.data);
                this.profile = response.data;
                this.firstName = this.profile.firstname;
                this.lastName = this.profile.lastname;
                this.email = this.profile.email;
                this.phoneNumber = this.profile.phonenumber;
                this.profileImageUrl = this.profile.avatar;
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des données utilisateur : ' + error.response.data.message;
            } finally {
                this.loading = false;
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
                // console.log(this.userId);
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
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/team-members/${this.projectId}/team/count`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.teamMemberCount = response.data.length;
                    console.log(this.teamMemberCount);
                    console.log(this.projectId)
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de personnels :', error);
            }
        },
        async fetchPendingTasksCount() {
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                    
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/pending`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.pendingTasksCount = response.data.length;
                    console.log(this.pendingTasksCount);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en attente :', error);
            }
        },
        async fetchInProgressTasksCount() {
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/in-progress`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.inProgressTasksCount = response.data.length;
                    console.log(this.inProgressTasksCount);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en cours :', error);
            }
        },
        async fetchCompletedTasksCount() {
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/completed`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.completedTasksCount = response.data.length;
                    console.log(this.completedTasksCount);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches terminées :', error);
            }
        },
        async fetchTotalTasksCount() {
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/count`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.taskCount = response.data;
                    console.log(this.taskCount);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre total de tâches :', error);
            }
        },
        async fetchTaskRate() {
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/tauxTasksDay/${this.projectId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.taskRate = response.data;
                    console.log("Voici le taux de tache journaliere: ")
                    console.log(this.taskRate);
                }
            } catch (error) {
                console.error('Erreur lors de la recupération du taux de tache journaliere:', error);
            }
        },
        async fetchReactivityRate() {
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/tauxReactTasks/${this.projectId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.reactivityRate = response.data;
                    console.log("Voici le taux de tache reactivité des membres: ")
                    console.log(this.reactivityRate);
                }
            } catch (error) {
                console.error('Erreur lors de la recupération du taux de reactivté:', error);
            }
        },
        async fetchRealisationRate() {
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/tauxRealisation/${this.projectId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.realisationRate = response.data;
                    console.log("Voici le pourcentage de realisation de la tache: ")
                    console.log(this.realisationRate);
                }
            } catch (error) {
                console.error('Erreur lors de la recupération du taux de reactivté:', error);
            }
        },
        //recupération des taches courantes
        async fetchCommonTasks() {
            console.log("Bonsoir*******************************")
            try {
                const token = localStorage.getItem('token');
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/allTasksLive/${this.projectId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.commonTasks = response.data;
                    console.log("Voici les taches courantes de ce projet : ")
                    console.log(this.commonTasks);
                }
            } catch (error) {
                console.error('Erreur lors de la recupération des taches courantes:', error);
            }
        },
        getPriorityClass(priority) {
            switch (priority) {
                case 'ELEVEE':
                    return 'bg-red-500';
                case 'MOYENNE':
                    return 'bg-yellow-500';
                case 'FAIBLE':
                    return 'bg-green-500';
                default:
                    return '';
            }
        },
        getStatusClass(status) {
            switch (status) {
                case 'EN_COURS':
                    return 'status-en-cours';
                case 'EN_ATTENTE':
                    return 'status-en-attente';
                case 'TERMINEE':
                    return 'status-terminee';
                default:
                    return '';
            }
        },
        //Membres performant d'un project
        async fetchPowerMembers() {
            try {
                const token = localStorage.getItem('token');
                // Récupérer les membres performants pour le projet spécifié
                if (this.projectId === null) {
                    console.log("No project choosen");
                } else {
                    const response = await axios.get(`${config.apiBaseUrl}/tasks/allMemberPower/${this.projectId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Réponse des membres performants :", response.data);
    
                    // Compter le nombre de membres performants
                    if (response.data.length === undefined || response.data.length === null) {
                        this.powerMembersCount = 0;
                        console.log("Nombre de membres performants :", this.powerMembersCount);
                    } else {
                        this.powerMembersCount = response.data.length;
                        console.log("Nombre de membres performants :", this.powerMembersCount);
                    }
    
                    // Initialiser powerMembers avec les données reçues
                    this.powerMembers = response.data;
    
                    // Convertir les valeurs de count en nombres et vérifier les userId
                    const powerMembersData = {};
                    for (const member of this.powerMembers) {
                        console.log("Membre :", member);
                        if (member.userId && member.count !== undefined) {
                            powerMembersData[member.userId] = { count: Number(member.count) }; // Convertir en nombre
                        } else {
                            console.error("Données de membre invalides :", member);
                        }
                    }
                    this.powerMembers = powerMembersData;
                    console.log("Membres performants après conversion :", this.powerMembers);
    
                    // Récupérer les informations détaillées des membres performants
                    for (const userId of Object.keys(this.powerMembers)) {
                        const userResponse = await axios.get(`${config.apiBaseUrl}/users/${userId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        console.log("Détails de l'utilisateur :", userResponse.data);
    
                        const memberResponse = await axios.get(`${config.apiBaseUrl}/team-members/${this.projectId}/user/${userId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        console.log("Détails du membre de l'équipe :", memberResponse.data);
    
                        // Assigner les détails de l'utilisateur et le rôle au membre performant
                        this.powerMembers[userId].details = userResponse.data;
                        if (memberResponse.data && memberResponse.data.Role) {
                            this.powerMembers[userId].role = memberResponse.data.Role.nom;
                        } else {
                            this.powerMembers[userId].role = 'Role non défini';
                        }
                    }
                    console.log("Membres performants avec détails :", this.powerMembers);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des membres performants :', error);
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

.priority-bar {
    width: 9px;
    height: 50px;
    border-radius: 0px 2px 2px 0px;
}

.status-en-cours {
    background-color: #86FD92;
    color: #065E0F;
    padding: 2px 5px;
    border-radius: 5px;
}

.status-en-attente {
    background-color: #FFD1A6;
    color: #7C480C;
    padding: 2px 5px;
    border-radius: 5px;
}

.status-terminee {
    background-color: #B3E2FC;
    color: #000000;
    padding: 2px 5px;
    border-radius: 5px;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    /* Couleur grise légère */
}

.currentTaskTable{
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>