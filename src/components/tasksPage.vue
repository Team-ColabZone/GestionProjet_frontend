<script setup>
import { ListTodo, Search, Filter,Ellipsis } from 'lucide-vue-next';
</script>


<template>
    <div class="h-full w-full flex flex-col gap-4 p-2">
        <div class="flex items-center h-10 w-full gap-4 px-3 border rounded-lg">
            <ListTodo />
            <p class="text-lg">Tâches</p>
        </div>

        <div class="flex flex-col sm:flex-row justify-between">
            <form class="flex flex-1">
                <div class="relative flex items-center w-full sm:w-3/4">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="search" id="search-input"
                        class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-base"
                        placeholder="Rechercher..." />
                </div>
                <div class="ml-4">
                    <input type="submit" value="Rechercher"
                        class="bg-black text-white font-bold py-2 px-6 rounded-lg cursor-pointer hover:bg-gray-700" />
                </div>
            </form>

            <div class="filter mt-4 sm:mt-0 sm:ml-4">
                <button
                    class="filterchbtn flex items-center justify-center w-full sm:w-auto bg-black text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-700"
                    @click="showFilter()">
                    <Filter class="mr-2 w-6 h-6" />
                    <p>Voir les filtres</p>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-2">
            <div class="h-full flex flex-col gap-2">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full bg-orange-200"></div>
                    <p class="font-bold text-sm px-2">EN ATTENTE</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0">{{ pendingTasksCount }}</p>
                    </div>
                </div>

                <draggable
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 pendingTasks"
                    group="tasks" :list="pendingTasks" @change="log" @end="onEnd">
                    <div class="flex flex-col border border-gray-300 py-2 px-3" v-for="task in pendingTasks"
                        :key="task.id" @click="storeTaskId(task.id)">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-xl" :class="['priority', getPriorityClass(task.priority)]">
                                Tache
                            </div>
                            <Ellipsis />
                        </div>
                        <div class="flex flex-col pb-2">
                            <span class="font-medium">{{ task.taskname }}</span>
                            <span>{{ task.description }}</span>
                            <span class="font-bold">Budget: {{ task.budget }}Frs</span>
                        </div>
                    </div>
                </draggable>
            </div>

            <div class="flex flex-col gap-2">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full bg-green-300"></div>
                    <p class="font-bold text-sm px-2">EN COURS</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0">{{ inProgressTasksCount }}</p>
                    </div>
                </div>

                <draggable
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 inProgressTasks"
                    group="tasks" :list="inProgressTasks" @change="log" @end="onEnd">
                    <div class="flex flex-col border border-gray-300 py-2 px-3" v-for="task in inProgressTasks"
                        :key="task.id" @click="storeTaskId(task.id)">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-lg" :class="['priority', getPriorityClass(task.priority)]">
                                Tache
                            </div>
                            <Ellipsis />
                        </div>
                        <div class="flex flex-col pb-2">
                            <span class="font-medium">{{ task.taskname }}</span>
                            <span>{{ task.description }}</span>
                            <span class="font-bold">Budget: {{ task.budget }}Frs</span>
                        </div>
                    </div>
                </draggable>
            </div>

            <div class="flex flex-col gap-2">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full bg-blue-300"></div>
                    <p class="font-bold text-sm px-2">TERMINÉE</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0 border border-gray-300 rounded-lg">{{ completedTasksCount }}
                        </p>
                    </div>
                </div>

                <draggable
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 completedTasks"
                    group="tasks" :list="completedTasks" @change="log" @end="onEnd">
                    <div class="border border-gray-300 py-2 px-3" v-for="task in completedTasks" :key="task.id"
                        @click="storeTaskId(task.id)">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-lg" :class="['priority', getPriorityClass(task.priority)]">
                                Tache
                            </div>
                            <Ellipsis />
                        </div>
                        <div class="flex flex-col pb-2">
                            <span class="font-medium">{{ task.taskname }}</span>
                            <span>{{ task.description }}</span>
                            <span class="font-bold">Budget: {{ task.budget }}Frs</span>
                        </div>
                    </div>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import config from "../config";
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
    components: {
        draggable: VueDraggableNext,
    },
    data() {
        return {
            taskCount: 0,
            pendingTasksCount: 0,
            completedTasksCount: 0,
            inProgressTasksCount: 0,
            projects: [], // Liste des projets
            selectedProjectId: '',
            userId: '',
            taskId:'',
            projectId: '',
            userData: null,
            isTaskListLateVisible: false,
            pendingTasks: [],
            inProgressTasks: [],
            completedTasks: [],
        };
    },
    mounted() {
        if (this.isConnected()) {
            this.userId = localStorage.getItem('userId');
            this.projectId = localStorage.getItem('projectId');
            this.taskId = localStorage.getItem('selectedTaskId');
            this.fetchUserData();
        } else {
            this.errorMessage = 'Utilisateur non connecté';
            this.$router.push('/auth'); // Rediriger vers la page de connexion
        }
        this.fetchProjects();
        this.fetchPendingTasksCount();
        this.fetchInProgressTasksCount();
        this.fetchCompletedTasksCount();
        this.fetchTotalTasksCount();
        this.fetchPendingTasks();
        this.fetchInProgressTasks();
        this.fetchCompletedTasks();
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
                this.userData = response.data;
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des données utilisateur : ' + error.response.data.message;
                console.log("unable to fetchUserData");
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
                console.log(this.userId)
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets : ' + error.response.data.message;
                console.log("unable to fetchProjects");
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
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.pendingTasksCount = response.data.length;
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de tâches en attente :', error);
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
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de tache en cours :', error);
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
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de taches terminées :', error);
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
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre total de tâches :', error);
            }
        },

        async fetchPendingTasks() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.pendingTasks = response.data;
                console.log(this.pendingTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en attente :', error);
            }
        },
        async fetchInProgressTasks() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/in-progress`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.inProgressTasks = response.data;
                console.log(this.inProgressTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en cours :', error);
            }
        },
        async fetchCompletedTasks() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/completed`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.completedTasks = response.data;
                console.log(this.completedTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches terminées :', error);
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

        storeTaskId(taskid) {
            localStorage.setItem('selectedTaskId', taskid);
            console.log(`Task ID ${taskid} stored in local storage`);
        },

        async onEnd(event) {
            const movedItemId = localStorage.getItem('selectedTaskId');
            if (!movedItemId) {
                console.error('No task ID found in local storage');
                return;
            }

            let newStatus = '';
            if (event.to.classList.contains('pendingTasks')) {
                newStatus = 'EN_ATTENTE';
            } else if (event.to.classList.contains('inProgressTasks')) {
                newStatus = 'EN_COURS';
            } else if (event.to.classList.contains('completedTasks')) {
                newStatus = 'TERMINEE';
            }

            try {
                const token = localStorage.getItem('token');
                await axios.patch(`${config.apiBaseUrl}/tasks/${movedItemId}/status`, {
                    status: newStatus,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.fetchPendingTasks();
                this.fetchInProgressTasks();
                this.fetchCompletedTasks();
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        }
    },

    log(event) {
        console.log(event);
    },
    
    async deleteTask() {
            try {
                const token = localStorage.getItem('token');
                console.log("Voici l'id de la tache:");
                console.log(this.movedItemId);
                const response = await axios.delete(`${config.apiBaseUrl}/tasks/${this.taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.taskDelete = response.data;
                console.log("Tache supprimer avec succes");
                //Mise a jour de la liste de tache
                this.fetchPendingTasks();
                this.fetchInProgressTasks();
                this.fetchCompletedTasks();
            } catch (error) {
                console.error('Erreur lors de la suppression de la tache :', error);
            }
        },

        async editTask() {
            try {
                const token = localStorage.getItem('token');
                console.log("Voici l'id de la tache:");
                console.log(this.movedItemId);
                const response = await axios.delete(`${config.apiBaseUrl}/tasks/${this.taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.taskDelete = response.data;
                console.log("Tache supprimer avec succes");
                //Mise a jour de la liste de tache
                this.fetchPendingTasks();
                this.fetchInProgressTasks();
                this.fetchCompletedTasks();
            } catch (error) {
                console.error('Erreur lors de la suppression de la tache :', error);
            }
        },


});
</script>




<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

body {
    font-family: Monda;
}
</style>