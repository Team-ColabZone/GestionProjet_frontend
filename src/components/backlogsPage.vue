<script setup>
import { SquarePlus, ListVideo, ListCheck, ClockArrowDown, Logs } from 'lucide-vue-next';
</script>
<template>
    <div class="h-full w-full flex flex-col gap-2 p-2 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center h-10 w-full gap-4 px-3 border rounded-lg">
            <SquarePlus class="ico-dash text-xl mr-2" />
            <p class="title_entete text-lg">Backlogs</p>
        </div>

        <div class="flex flex-col gap-4 w-full h-full">
            <!-- Stat Cards Section -->
            <div class="cont">
                <div class="flex flex-wrap justify-between gap-4 w-full">
                    <!-- Card 1 -->
                    <div class="contex bg-red-50 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52"
                        v-if="!isLoading">
                        <div class="nbre_icons flex justify-between items-center">
                            <h1 class="text-4xl font-bold">{{ pendingTasksCount }}</h1>
                            <ListVideo class="w-10 h-9 md:h-10 md:w-12" />
                        </div>
                        <h3 class="text-sm mt-2">Nombre de tache à faire</h3>
                    </div>
                    <div class="contex bg-gray-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52 animate-pulse"
                        v-else>
                        <div class="nbre_icons flex justify-between items-center">
                            <div class="h-10 w-10 bg-gray-300 rounded-lg"></div>
                            <div class="h-10 w-10 bg-gray-300 rounded "></div>
                        </div>
                        <div class="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                    </div>

                    <!-- Card 2 -->
                    <div class="contex bg-pink-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52"
                        v-if="!isLoading">
                        <div class="nbre_icons flex justify-between items-center">
                            <h1 class="text-4xl font-bold">{{ completedTasksCount }}</h1>
                            <ListCheck class="w-10 h-9 md:h-10 md:w-12" />
                        </div>
                        <h3 class="text-sm mt-2">Nombre de tache terminée</h3>
                    </div>
                    <div class="contex bg-gray-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52 animate-pulse"
                        v-else>
                        <div class="nbre_icons flex justify-between items-center">
                            <div class="h-10 w-10 bg-gray-300 rounded-lg"></div>
                            <div class="h-10 w-10 bg-gray-300 rounded "></div>
                        </div>
                        <div class="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                    </div>

                    <!-- Card 3 -->
                    <div class="contex bg-green-50 rounded-lg px-3 py-4 text-left w-40 md:w-44 lg:w-48 xl:w-52"
                        v-if="!isLoading">
                        <div class="nbre_icons flex justify-between items-center">
                            <h1 class="text-4xl font-bold">{{ tasklateCount }}</h1>
                            <ClockArrowDown class="w-10 h-9 md:h-10 md:w-12" />
                        </div>
                        <h3 class="text-sm mt-2">Nombre de tache en retard</h3>
                    </div>
                    <div class="contex bg-gray-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52 animate-pulse"
                        v-else>
                        <div class="nbre_icons flex justify-between items-center">
                            <div class="h-10 w-10 bg-gray-300 rounded-lg"></div>
                            <div class="h-10 w-10 bg-gray-300 rounded "></div>
                        </div>
                        <div class="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                    </div>

                    <!-- Card 4 -->
                    <div class="contex bg-blue-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52"
                        v-if="!isLoading">
                        <div class="nbre_icons flex justify-between items-center">
                            <h1 class="text-4xl font-bold">{{ taskCount }}</h1>
                            <Logs class="w-10 h-9 md:h-10 md:w-12" />
                        </div>
                        <h3 class="text-sm mt-2">Nombre de tache</h3>
                    </div>
                    <div class="contex bg-gray-100 rounded-lg p-4 text-left w-40 md:w-44 lg:w-48 xl:w-52 animate-pulse"
                        v-else>
                        <div class="nbre_icons flex justify-between items-center">
                            <div class="h-10 w-10 bg-gray-300 rounded-lg"></div>
                            <div class="h-10 w-10 bg-gray-300 rounded "></div>
                        </div>
                        <div class="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                    </div>
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
        <div class="mt-8 flex-grow flex">
            <div class="tache-late border border-gray-300 rounded-lg p-4 w-full flex flex-col">
                <div class="title-div1 flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                    <div class="flex items-center">
                        <ClockArrowDown class="task text-xl text-black mr-2" />
                        <p class="text-black text-sm font-bold">Liste des Tâches</p>
                    </div>
                    <button v-if="userRoleNom === 'admin' || userRoleNom === 'chef_projet'" class="flex gap-1 bg-black hover:hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                        @click="addtask()">
                        <Plus class="h-6 " />
                        <span>Ajouter une tache</span>
                    </button>
                </div>

                <div class="list-late flex-grow">
                    <div class="overflow-x-auto" style="max-height: 50vh;">
                        <table class="min-w-full divide-y divide-gray-200 text-left">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Nom de la tache
                                    </th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Responsable</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider">Budget</th>
                                    <th class="px-6 py-3 text-xs text-black uppercase tracking-wider text-center">Statut
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="tasklate in taskslate" :key="tasklate.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-3 whitespace-nowrap text-xl">{{ tasklate.taskname }}</td>
                                    <td class="px-6 py-3 whitespace-nowrap">
                                        <div v-if="tasklate.assignedUserDetails" class="flex items-center">
                                            <div class="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                                                <img :src="tasklate.assignedUserDetails.avatar" alt="Avatar"
                                                    class="w-full h-full object-cover">
                                            </div>
                                            <div class="ml-4">
                                                <div>{{ tasklate.assignedUserDetails.email }}</div>
                                            </div>
                                        </div>
                                        <div v-else class="text-gray-400">tache non affectée</div>
                                    </td>
                                    <td class="px-6 py-3 whitespace-nowrap">FCFA {{ tasklate.budget }} </td>
                                    <td class="px-4 py-3 whitespace-nowrap">
                                        <div :class="getStatusClass(tasklate.status)" class="ml-2 text-center">
                                            {{ tasklate.status }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <modal class="fixed inset-0 backdrop-blur-sm flex justify-end z-50" v-if="modalTasks">
            <button @click="closeNewTask()" class="self-start p-6">
                <X class="text-black text-2xl" />
            </button>

            <div
                class="flex flex-col bg-white p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-4xl h-full">

                <div class="flex justify-between">
                    <h1 class="text-center text-2xl text-gray-800 ">AJOUTER UNE TACHE</h1>
                    <button class="w-1/4 px-3 bg-black text-white rounded hover:bg-gray-600 " @click="createNewTask()">
                        <span v-if="!enterpriseLoading">
                            Ajouter
                        </span>
                        <div v-else class="flex justify-center">
                            <span
                                class="inline-block w-6 h-6 border-4 border-gray-400 border-t-black border-b-black rounded-full animate-spin"></span>
                        </div>
                    </button>
                </div>

                <form @submit.prevent="createNewTask" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-4 border-t border-b border-gray-300">
                        <input type="text" id="name" placeholder="Titre de la tache" v-model="taskname" required
                            class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200">

                        <textarea id="description" placeholder="Veuillez saisir une description de la tache"
                            v-model="description" cols="30" rows="3"
                            class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200"></textarea>
                    </div>

                    <div class="w-full flex flex-col md:flex-row gap-5">
                        <div class="w-full">
                            <label for="Attribuer" class="block text-gray-700 text-sm font-bold mb-2">Attribuer
                                a</label>
                            <select v-model="userAssignId"
                                class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <option value="">non-attribuer</option>
                                <option v-for="member in projectMembers" :key="member.userId" :value="member.userId">
                                    {{ member.userMember.email }}</option>

                            </select>
                        </div>

                        <div class="w-full relative">
                            <div class="mb-2 w-full">
                                <label for="Status" class="block text-gray-700 text-sm font-bold mb-2">Statut de la
                                    tache
                                </label>
                                <select v-model="status" required
                                    class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">

                                    <option value="EN_ATTENTE">En Attente</option>
                                    <option value="EN_COURS">En Cours</option>
                                </select>
                            </div>

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
                                <select v-model="priority"
                                    class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">
                                    <option value="FAIBLE" selected >Faible</option>
                                    <option value="MOYENNE">Moyenne</option>
                                    <option value="ELEVEE">Elevée</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="w-full flex flex-col md:flex-row gap-5">
                        <div class="w-full md:w-1/2">
                            <label for="Budjet" class="block text-gray-700 text-sm font-bold mb-2">
                                Budget de la tache
                            </label>
                            <input type="text" v-model="budget" required
                                class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                        </div>

                        <!-- <div class="flex flex-col md:flex-row gap-5">
                             -->

                        <div class="w-full md:w-1/2">
                            <label for="Type" class="block text-gray-700 text-sm font-bold mb-2">Type de tache</label>
                            <input type="text" v-model="taskType"
                                class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">
                        </div>
                        <!-- </div> -->


                    </div>
                    <div class="w-full flex flex-col md:flex-row gap-5">

                        <div class="w-full md:w-1/2">
                            <label for="piece" class="block text-gray-700 text-sm font-bold mb-2">Piece jointe</label>
                            <input type="file"
                                class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">
                        </div>

                    </div>

                    <div class="w-full flex flex-col md:flex-row gap-5">
                        <div class="w-full md:w-1/2 flex items-center gap-5">
                            <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                                <img src="../assets/images/logoflysoft.png" alt="Photo de l'utilisateur"
                                    class="w-full h-full object-cover">
                            </div>
                            <input type="text" placeholder="Ajouter un commentaire à la tâche"
                                class="w-full h-full border border-150 rounded focus:outline-none focus:ring focus:ring-gray-300 pl-5"
                                v-model="content">
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
import { EventBus } from "../eventBus";

export default {
    components: {

    },
    data() {
        return {
            modalTasks: false,
            isLoading: true,
            enterpriseLoading: false,
            taskCount: 0,
            completedTasksCount: 0,
            pendingTasksCount: 0,
            tasklateCount: 0,
            projects: [], // Liste des projets
            // selectedProjectId: '', // ID du projet sélectionné
            userId: '',
            projectId: '',
            userRoleNom: '',

            userData: null,

            taskname: '',
            description: '',
            start_date: '',
            end_date: '',
            status: 'EN_ATTENTE',
            budget: '',
            taskType: '',
            priority: 'FAIBLE',
            taskId: '',


            isDropdown1Open: false,
            selectedStatus: 'Select Status',
            statuses: ['EN_ATTENTE', 'EN_COURS'],

            selectedPriority: '',
            priorities: ['ELEVEE', 'MOYENNE', 'FAIBLE'],
            placeholder: 'Select Priority',
            isPriorityOpen: false,
            //id du collaborateur
            userAssignId: '',
            projectMembers: [],
            taskslate: [],
            assignedUserDetails: [], //details de l'utilisateurs a qui on a affecté une tache qui est deja en retard

        };
    },
    created() {
        EventBus.on('setFirstProject2', this.refreshAllData);
    },

    mounted() {
        setTimeout(() => {
            this.refreshAllData();
            this.isLoading = false;
        }, 2000);
    },

    methods: {
        refreshAllData() {
            if (this.isConnected()) {
                this.userId = localStorage.getItem('userId');
                this.projectId = localStorage.getItem('projectId');
                this.fetchUserData();
                this.fetchProjectMembers();
                this.fetchProjects();
                this.fetchPendingTasksCount();
                // this.fetchInProgressTasksCount();
                this.fetchCompletedTasksCount();
                this.fetchTotalTasksCount();
                this.fetchTasksLateCount();
                this.fetchAllTasks();
            } else {
                this.errorMessage = 'Utilisateur non connecté';
                this.$router.push('/auth'); // Rediriger vers la page de connexion
            }
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
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/users/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.userData = response.data;
                console.log("asdasdasd",this.userData);
                
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des données utilisateur : ' + error.response.data.message;
            }
        },

        async fetchProjects() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/projects/user/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.projects = response.data;
                console.log("Yesssssssss");
                console.log(this.userId)
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets : ' + error.response.data.message;
                console.log(error);
                console.log("Noooooooooo");

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
        // async fetchInProgressTasksCount() {
        //     try {
        //         const token = localStorage.getItem('token');
        //         const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/in-progress`, {
        //             headers: {
        //                 'Authorization': `Bearer ${token}`
        //             }
        //         });
        //         this.inProgressTasksCount = response.data.length +"bv";
        //         console.log(this.inProgressTasksCount);
        //     } catch (error) {
        //         console.error('Erreur lors de la récupération des tâches en cours :', error);
        //     }
        // },
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
        async fetchTasksLateCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/allTasksLate/${this.projectId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.tasklateCount = response.data.length;
                console.log("Voici le nombre de tache en retard:")
                console.log(this.tasklateCount);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de taches en retard :', error);
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
        async createNewTask() {
            this.enterpriseLoading = true;
            if (this.userAssignId === "" || this.userAssignId === null) {
                console.log("the task hasn't been assigned to any body");
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post(`${config.apiBaseUrl}/tasks`, {
                        taskname: this.taskname,
                        description: this.description,
                        start_date: new Date(this.start_date), // Conversion en objet Date
                        end_date: new Date(this.end_date), // Conversion en objet Date
                        projectId: this.projectId,
                        status: this.status,
                        budget: this.budget,
                        taskType: this.taskType,
                        priority: this.priority,
                        // taskId: this.taskId,
                        userId: this.userId // Assure-toi d'inclure l'ID de l'utilisateur
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    console.log("Tache crée avec succes ");
                    const taskId = response.data.id; // Récupérer l'ID de la tâche créée
                    console.log("Voici l'id de la tache crée");
                    console.log(taskId);
                    console.log(this.userAssignId);
                    // Réinitialiser les champs du formulaire
                    this.taskname = '';
                    this.description = '';
                    this.taskType = '';
                    this.status = '';
                    this.priority = '';
                    this.start_date = '';
                    this.end_date = '';
                    this.budget = '';
                    // Assigner la tâche au membre sélectionné


                } catch (error) {
                    this.error = true;
                    this.errorMessage = error.response ? error.response.data.message : error.message;
                    console.log(error);
                }
            } else {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post(`${config.apiBaseUrl}/tasks`, {
                        taskname: this.taskname,
                        description: this.description,
                        start_date: new Date(this.start_date), // Conversion en objet Date
                        end_date: new Date(this.end_date), // Conversion en objet Date
                        projectId: this.projectId,
                        status: this.status,
                        budget: this.budget,
                        taskType: this.taskType,
                        priority: this.priority,
                        // taskId: this.taskId,
                        userId: this.userId // Assure-toi d'inclure l'ID de l'utilisateur
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    console.log("Tache crée avec succes ");
                    const taskId = response.data.id; // Récupérer l'ID de la tâche créée
                    console.log("Voici l'id de la tache crée");
                    console.log(taskId);
                    console.log(this.userAssignId);
                    const data = {
                        taskId: taskId,
                        userId: this.userAssignId
                    };
                    console.log("Voici l'id de la tache et l'id de ce lui a qui ont assign la tache crée",data);

                    await axios.post(`${config.apiBaseUrl}/tasks-assignments`, {
                        taskId: taskId,
                        userId: this.userAssignId
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    this.success = true;
                    this.successMessage = response.data.message;
                    console.log("tache crée et affectée avec success ")
                    this.userAssignId = '';
                    // Réinitialiser les champs du formulaire
                    this.taskname = '';
                    this.description = '';
                    this.taskType = '';
                    this.status = '';
                    this.priority = '';
                    this.start_date = '';
                    this.end_date = '';
                    this.budget = '';
                    // Assigner la tâche au membre sélectionné

                } catch (error) {
                    this.error = true;
                    this.errorMessage = error.response ? error.response.data.message : error.message;
                    console.log(error);
                }

            }
            this.enterpriseLoading = false;
            // this.fetchAllTasks();

        },
        async getUserInfo() {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`${config.apiBaseUrl}/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userInfo = response.data;
                console.log(userInfo);

            } catch (error) {
                console.error('Erreur lors de la récupération des informations des l\'utilisateur :', error);
            }
        },

        async fetchProjectMembers() {
            console.log("Id projet selectionné backlogs");
            console.log(this.projectId);
            try {
                console.log(this.projectId);
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/team-members/project/${this.projectId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.projectMembers = response.data;
                console.log("Bonsoir");
                console.log("Voici la liste des membre dans taskspage ++++++++++++++++");
                console.log("12345678901234678890", this.projectMembers);

                const getRoleByUserId = (userId) => {
                    const member = this.projectMembers.find(member => member.userId === userId);
                    return member ? member.Role.nom : null;
                };


                const userId = localStorage.getItem('userId'); // Replace with the actual userId you want to check
                this.userRoleNom = getRoleByUserId(userId);
                console.log("Role Nom:", this.userRoleNom);

            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des membres du projet : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        async fetchAllTasks() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/allTasks/${this.projectId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.taskslate = response.data;
                console.log("Voici la liste des taches  en retard:")
                console.log(this.taskslate);
                // Récupérer les informations de l'utilisateur assigné pour chaque tâche
                for (let task of this.taskslate) {
                    const assignmentResponse = await axios.get(`${config.apiBaseUrl}/tasks-assignments/task/${task.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const assignedUserId = assignmentResponse.data.userId;
                    console.log(`ID de l'utilisateur assigné pour la tâche en retard ${task.id} :`, assignedUserId);

                    if (assignedUserId) {
                        const userResponse = await axios.get(`${config.apiBaseUrl}/users/${assignedUserId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        task.assignedUserDetails = userResponse.data;
                        console.log(`Détails de l'utilisateur assigné pour la tâche en retard --- ${task.id} :`, task.assignedUserDetails);
                    }
                }

                console.log("Tâches en attente avec détails des utilisateurs assignés :", this.pendingTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de taches en retard :', error);
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
        beforeDestroy() {
            EventBus.off('setFirstProject2', this.refreshAllData);
        },

    }
};

</script>

<style scoped>
.status-en-cours {
    background-color: #B3E2FC;
    color: #000000;
    padding: 2px 5px;
    border-radius: 5px;
}

.status-en-attente {
    background-color: #FFD1A6;
    color: #000000;
    padding: 2px 5px;
    border-radius: 5px;
}

.status-terminee {
    background-color: #86FD92;
    color: #000000;
    padding: 2px 5px;
    border-radius: 5px;
}
</style>