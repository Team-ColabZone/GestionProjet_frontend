<script setup>
import { ListTodo, Search, Filter, Ellipsis } from 'lucide-vue-next';
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
            <!-- EN ATTENTE Column -->
            <div class="h-full flex flex-col gap-2">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full bg-orange-200"></div>
                    <p class="font-bold text-sm px-2">EN ATTENTE</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0">{{ pendingTasksCount }}</p>
                    </div>
                </div>

                <draggable v-if="!isLoading" style="height: 590px;"
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 pendingTasks"
                    group="tasks" :list="pendingTasks" @change="log" @start="onStart" @end="onEnd">
                    <div class="flex flex-col border border-gray-300 py-2 px-3" v-for="task in pendingTasks"
                        :key="task.id" :data-id="task.id" @click="handleTaskClick(task)">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-xl" :class="['priority', getPriorityClass(task.priority)]">
                                Tache
                            </div>
                            <div class="relative">
                                <button @click="toggleMenu(task.id)">
                                    <Ellipsis class="hover:bg-green-200 cursor-pointer" />
                                </button>
                                <div :class="{ block: task.showMenu, hidden: !task.showMenu }" v-if="task.showMenu"
                                    class="absolute right-0 mt-2 w-auto md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <ul class="flex md:flex-col">
                                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <button @click="fetchTaskDetailsView()" class="flex gap-1">
                                                <View />
                                                <span class="hidden md:inline">Voir détails</span>
                                            </button>
                                        </li>
                                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            v-if="assignedUserId === userId || userRoleNom === 'admin' || userRoleNom === 'chef_projet'">
                                            <button @click="fetchTaskDetails()" class="flex gap-1">
                                                <FilePenLine />
                                                <span class="hidden md:inline">Modifier</span>
                                            </button>
                                        </li>
                                        <li class="px-4 py-2 hover:bg-gray-100 hover:text-red-500 cursor-pointer"
                                            v-if="userRoleNom === 'admin'">
                                            <button @click="deleteTask()" class="flex gap-1">
                                                <Trash2 />
                                                <span class="hidden md:inline">Supprimer</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col pb-2">
                            <span class="font-medium">{{ task.taskname }}</span>
                            <span>{{ task.description }}</span>
                            <div class="flex justify-between items-center pb-2">
                                <span class="font-bold">Budget: {{ task.budget }}Frs</span>
                                <div v-if="task.assignedUserDetails"
                                    class="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                                    <img :src="task.assignedUserDetails.avatar" alt="Avatar"
                                        class="w-full h-full object-cover" />
                                </div>
                                <button v-else class="w-10 h-10 overflow-hidden" @click="acceptTask">
                                    <!-- <TicketPlus class="w-full h-full object-cover hover:text-blue-500"/> -->
                                    <img src="../assets/icon/grab.png" alt="#" class="w-full h-full object-cover">
                                </button>
                            </div>
                        </div>
                    </div>
                </draggable>

                <div v-else
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 pendingTasks">
                    <div class="flex flex-col border border-gray-300 py-2 px-3 animate-pulse">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-xl bg-gray-300 w-20 h-6"></div>
                            <div class="relative">
                                <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                        <div class="flex flex-col pb-2">
                            <div class="bg-gray-300 h-4 w-3/4 mb-2"></div>
                            <div class="bg-gray-300 h-4 w-1/2"></div>
                            <div class="flex justify-between items-center pb-2">
                                <div class="bg-gray-300 h-4 w-1/4"></div>
                                <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- EN COURS Column -->
            <div class="h-full flex flex-col gap-2">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full bg-green-300"></div>
                    <p class="font-bold text-sm px-2">EN COURS</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0">{{ inProgressTasksCount }}</p>
                    </div>
                </div>

                <draggable v-if="!isLoading" style="height: 590px;"
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 inProgressTasks"
                    group="tasks" :list="inProgressTasks" @change="log" @start="onStart" @end="onEnd">
                    <div class="flex flex-col border border-gray-300 py-2 px-3" v-for="task in inProgressTasks"
                        :key="task.id" :data-id="task.id" @click="handleTaskClick(task)">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-xl" :class="['priority', getPriorityClass(task.priority)]">
                                Tache
                            </div>
                            <div class="relative">
                                <button @click="toggleMenu(task.id)">
                                    <Ellipsis class="hover:bg-green-200 cursor-pointer" />
                                </button>
                                <div :class="{ block: task.showMenu, hidden: !task.showMenu }" v-if="task.showMenu"
                                    class="absolute right-0 mt-2 w-auto md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <ul class="flex md:flex-col">
                                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <button @click="fetchTaskDetailsView()" class="flex gap-1">
                                                <View />
                                                <span class="hidden md:inline ">
                                                    Voir détails
                                                </span>
                                            </button>
                                        </li>

                                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" v-if="task.assignedUserId === userId || userRoleNom === 'admin' ||
                                            userRoleNom === 'chef_projet'">
                                            <button @click="fetchTaskDetails()" class="flex gap-1">
                                                <FilePenLine />
                                                <span class="hidden md:inline">
                                                    Modifier
                                                </span>
                                            </button>
                                        </li>

                                        <li class="px-4 py-2 hover:bg-gray-100 hover:text-red-500 cursor-pointer"
                                            v-if="userRoleNom === 'admin'">
                                            <button @click="deleteTask()" class="flex gap-1">
                                                <Trash2 />
                                                <span class="hidden md:inline">
                                                    Supprimer
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col pb-2">
                            <span class="font-medium">{{ task.taskname }}</span>
                            <span>{{ task.description }}</span>
                            <div class="flex justify-between items-center pb-2">
                                <span class="font-bold">Budget: {{ task.budget }}Frs</span>
                                <div v-if="task.assignedUserDetails"
                                    class="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                                    <img :src="task.assignedUserDetails.avatar" alt="Avatar"
                                        class="w-full h-full object-cover" />
                                </div>
                                <button v-else class="w-10 h-10 overflow-hidden" @click="acceptTask">
                                    <!-- <TicketPlus class="w-full h-full object-cover hover:text-blue-500"/> -->
                                    <img src="../assets/icon/grab.png" alt="#" class="w-full h-full object-cover">
                                </button>
                            </div>
                        </div>
                    </div>
                </draggable>

                <div v-else
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 pendingTasks">
                    <div class="flex flex-col border border-gray-300 py-2 px-3 animate-pulse">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-xl bg-gray-300 w-20 h-6"></div>
                            <div class="relative">
                                <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                        <div class="flex flex-col pb-2">
                            <div class="bg-gray-300 h-4 w-3/4 mb-2"></div>
                            <div class="bg-gray-300 h-4 w-1/2"></div>
                            <div class="flex justify-between items-center pb-2">
                                <div class="bg-gray-300 h-4 w-1/4"></div>
                                <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TERMINÉE Column -->
            <div class="h-full flex flex-col gap-2">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full bg-blue-300"></div>
                    <p class="font-bold text-sm px-2">TERMINÉE</p>
                    <div class="w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p class="text-black text-xs m-0">{{ completedTasksCount }}</p>
                    </div>
                </div>

                <div v-if="!isLoading">
                    <draggable style="height: 590px;"
                        class="overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 completedTasks"
                        group="tasks" :list="completedTasks" @change="log" @start="onStart" @end="onEnd">
                        <div class="border border-gray-300 py-2 px-3" v-for="task in completedTasks" :key="task.id"
                            :data-id="task.id" @click="handleTaskClick(task)">
                            <div class="flex justify-between pb-2">
                                <div class="py-1 px-3 rounded-xl"
                                    :class="['priority', getPriorityClass(task.priority)]">
                                    Tache
                                </div>
                                <div class="relative">
                                    <button @click="toggleMenu(task.id)">
                                        <Ellipsis class="hover:bg-green-200 cursor-pointer" />
                                    </button>
                                    <div :class="{ block: task.showMenu, hidden: !task.showMenu }" v-if="task.showMenu"
                                        class="absolute right-0 mt-2 w-auto md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        <ul class="flex md:flex-col">
                                            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                <button @click="fetchTaskDetailsView()" class="flex gap-1">
                                                    <View />
                                                    <span class="hidden md:inline">
                                                        Voir détails
                                                    </span>
                                                </button>
                                            </li>

                                            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" v-if="task.assignedUserId === userId || userRoleNom === 'admin' ||
                                                userRoleNom === 'chef_projet'">
                                                <button @click="fetchTaskDetails()" class="flex gap-1">
                                                    <FilePenLine />
                                                    <span class="hidden md:inline">
                                                        Modifier
                                                    </span>
                                                </button>
                                            </li>

                                            <li class="px-4 py-2 hover:bg-gray-100 hover:text-red-500 cursor-pointer"
                                                v-if="userRoleNom === 'admin'">
                                                <button @click="deleteTask()" class="flex gap-1">
                                                    <Trash2 />
                                                    <span class="hidden md:inline">
                                                        Supprimer
                                                    </span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col pb-2">
                                <span class="font-medium">{{ task.taskname }}</span>
                                <span>{{ task.description }}</span>
                                <div class="flex justify-between items-center pb-2">
                                    <span class="font-bold">Budget: {{ task.budget }}Frs</span>
                                    <div v-if="task.assignedUserDetails"
                                        class="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                                        <img :src="task.assignedUserDetails.avatar" alt="Avatar"
                                            class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </draggable>
                </div>

                <div v-else
                    class="h-80 overflow-y-auto flex flex-col gap-2 border border-gray-300 rounded-lg px-4 py-10 pendingTasks">
                    <div class="flex flex-col border border-gray-300 py-2 px-3 animate-pulse">
                        <div class="flex justify-between pb-2">
                            <div class="py-1 px-3 rounded-xl bg-gray-300 w-20 h-6"></div>
                            <div class="relative">
                                <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                        <div class="flex flex-col pb-2">
                            <div class="bg-gray-300 h-4 w-3/4 mb-2"></div>
                            <div class="bg-gray-300 h-4 w-1/2"></div>
                            <div class="flex justify-between items-center pb-2">
                                <div class="bg-gray-300 h-4 w-1/4"></div>
                                <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--formulaire de modification d'une tache-->
    <modal class="fixed inset-0 backdrop-blur-sm flex justify-end z-50" v-if="modalEditTasks">
        <button @click="closeEditTask()" class="self-start p-6">
            <X class="text-black text-2xl" />
        </button>

        <div
            class="flex flex-col bg-white p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-4xl h-full">

            <div class="flex justify-between">
                <h1 class="text-center text-2xl text-gray-800 ">MODIFIER UNE TACHE</h1>
                <button class="w-1/4 px-3 bg-black text-white rounded hover:bg-gray-600 " @click="editTask()">
                    Modifier
                </button>
            </div>

            <form @submit.prevent="editTask" class="flex flex-col gap-4">
                <div class="flex flex-col gap-4 border-t border-b border-gray-300">
                    <input type="text" id="name" placeholder="Titre de la tache" v-model="taskname" required
                        class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200">

                    <textarea id="description" placeholder="Veuillez saisir une description de la tache"
                        v-model="description" cols="30" rows="3"
                        class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200"></textarea>
                </div>

                <div class="w-full flex flex-col md:flex-row gap-5">
                    <div class="w-full">
                        <label for="Attribuer" class="block text-gray-700 text-sm font-bold mb-2">Attribuer a</label>
                        <select v-model="userAssignId"
                            class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none">{{
                                userAssignEmail }}
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
                            <select required
                                class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none">{{
                                    status }}
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
                                <input type="text" v-model="start_date" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                                <input type="text" v-model="end_date" required
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
                                class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none">
                                <option value="FAIBLE">Faible</option>
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

                    <div class="w-full md:w-1/2">
                        <label for="Type" class="block text-gray-700 text-sm font-bold mb-2">Type de tache</label>
                        <input type="text" v-model="taskType"
                            class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">
                    </div>
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

    <!--Modal pour afficher le details de la tache-->
    <modal class="fixed inset-0 backdrop-blur-sm flex justify-end z-50" v-if="modalDetailTasks">
        <button @click="closeDetailsTask()" class="self-start p-6">
            <X class="text-black text-2xl" />
        </button>

        <div
            class="flex flex-col bg-white p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-4xl h-full">

            <div class="flex justify-between">
                <h1 class="text-center text-2xl text-gray-800 ">DETAILS DE LA TACHE</h1>
            </div>

            <div class="flex flex-col gap-4 border-t border-b border-gray-300">
                <p class=" text-gray-700 text-sm font-bold mb-2">Nom de la tache:</p>
                <p type="text" class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200">{{ taskname }}</p>
                <p class=" text-gray-700 text-sm font-bold mb-2">Description:</p>
                <p class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200">{{ description }}</p>
            </div>

            <div class="w-full flex flex-col md:flex-row gap-5">
                <div class="w-full">
                    <p for="Attribuer" class="block text-gray-700 text-sm font-bold mb-2">Responsable(s)
                    </p>
                    <!-- <span v-if="">Aucune attribution</span> -->

                    <span class="block">
                        <!-- add the assignedUserEmail later -->
                        {{ userAssignEmail }}
                    </span>
                </div>

                <div class="w-full relative">
                    <div class="mb-2 w-full">
                        <p for="Status" class="block text-gray-700 text-sm font-bold mb-2">Statut de la
                            tache
                        </p>
                        <p
                            class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">
                            {{ status }}</p>
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
                            <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">{{
                                start_date }}</p>
                            <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">{{
                                end_date }}</p>
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-1/2 relative">
                    <div class="mb-4 w-full">
                        <p for="Priorité" class="block text-gray-700 text-sm font-bold mb-2"> Priorité de la tache </p>
                        <p
                            class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">
                            {{ priority }}
                        </p>
                    </div>
                </div>

            </div>

            <div class="w-full flex flex-col md:flex-row gap-5">
                <div class="w-full md:w-1/2">
                    <p class="block text-gray-700 text-sm font-bold mb-2">
                        Budget de la tache
                    </p>
                    <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">{{ budget }}
                    </p>
                </div>

                <div class="w-full md:w-1/2">
                    <p class="block text-gray-700 text-sm font-bold mb-2">Type de tache</p>
                    <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">{{ taskType
                        }}</p>
                </div>
            </div>

        </div>
    </modal>

    <!--Modal pour afficher le details de la tache-->
    <modal class="fixed inset-0 backdrop-blur-sm flex justify-end z-50" v-if="modalAcceptTask">
        <div
            class="flex flex-col bg-white p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-4xl h-full">

            <div class="flex justify-between">
                <h1 class="text-center text-2xl text-gray-800 ">DETAILS DE LA TACHE</h1>
            </div>

            <div class="w-full overflow-auto">
                <div class="flex flex-col gap-4 border-t border-b border-gray-300">
                    <p class=" text-gray-700 text-sm font-bold mb-2">Nom de la tache:</p>
                    <p type="text" class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200">{{ taskname }}
                    </p>
                    <p class=" text-gray-700 text-sm font-bold mb-2">Description:</p>
                    <p class="w-full p-2 focus:outline-none focus:ring focus:ring-gray-200">{{ description }}</p>
                </div>

                <div class="w-full flex flex-col md:flex-row gap-5">
                    <div class="w-full ">
                        <p class="block text-gray-700 text-sm font-bold mb-2">Type de tache</p>
                        <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">{{
                            taskType
                            }}</p>
                    </div>

                    <div class="w-full relative">
                        <div class="mb-2 w-full">
                            <p for="Status" class="block text-gray-700 text-sm font-bold mb-2">Statut de la
                                tache
                            </p>
                            <p
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">
                                {{ status }}</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-5">
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <label for="Planing" class="block text-gray-700 text-sm font-bold mb-2">
                                Date de fin
                            </label>

                            <div class="flex w-full gap-2">
                                <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                                    {{
                                        end_date }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-1/2 relative">
                        <div class="mb-4 w-full">
                            <p for="Priorité" class="block text-gray-700 text-sm font-bold mb-2"> Priorité de la tache
                            </p>
                            <p
                                class="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">
                                {{ priority }}
                            </p>
                        </div>
                    </div>

                </div>

                <div class="w-full flex flex-col md:flex-row gap-5">
                    <div class="w-full md:w-1/2">
                        <p class="block text-gray-700 text-sm font-bold mb-2">
                            Budget de la tache
                        </p>
                        <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">{{ budget
                            }}
                        </p>
                    </div>

                    <div class="w-full md:w-1/2">
                        <p class="block text-gray-700 text-sm font-bold mb-2">Voulez vous prendre cette tache? </p>
                        <!-- <p class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-300">{{ taskType
                        }}</p> -->
                        <div class="w-full gap-2 flex flex-row">
                            <button @click="attributeTask()"
                                class="w-full bg-green-600 text-white hover:text-2xl p-2">OUI</button>
                            <button @click="refuseTask()"
                                class="w-full bg-red-600 text-white hover:text-2xl p-2">NON</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </modal>

</template>

<script>
import axios from 'axios';
import config from "../config";
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { EventBus } from "../eventBus";

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
            taskId: '',
            projectId: '',
            userData: null,
            isTaskListLateVisible: false,
            pendingTasks: [],
            inProgressTasks: [],
            completedTasks: [],

            taskname: '',
            description: '',
            start_date: '',
            end_date: '',
            status: '',
            budget: '',
            taskType: '',
            priority: '',
            projectMembers: [],
            userRoleNom: '',
            modalEditTasks: false,
            showMenu: false,
            modalDetailTasks: false,
            modalAcceptTask: false,
            taskDetails: [], // details de la tache
            assignedUserDetails: [], //details de l'utilisateurs a qui on a affecté une tache
            assignedUserId: '',
            assignedUserEmail: '',
            theAssignedUserId: null,

            isLoading: true,

        };
    },
    created() {
        EventBus.on('setFirstProject3', this.refreshAllData);
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
                this.movedItemId = localStorage.getItem('selectedTaskId');
                this.fetchUserData();
            } else {
                this.errorMessage = 'Utilisateur non connecté';
                this.$router.push('/auth'); // Rediriger vers la page de connexion
            }
            // this.fetchProjects();
            this.fetchPendingTasksCount();
            this.fetchInProgressTasksCount();
            this.fetchCompletedTasksCount();
            this.fetchTotalTasksCount();
            this.fetchPendingTasks();
            this.fetchInProgressTasks();
            this.fetchCompletedTasks();
            this.fetchProjectMembers();
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
        refuseTask() {
            this.modalAcceptTask = false;
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
                console.log("asdas", this.userId);
                console.log("qqqqqqqqqqqqqqqqq", response.data);

            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets : ' + error.response.data.message;
                console.log("unable to fetchProjects");
            }
        },
        showLateTaskList() {
            this.isTaskListLateVisible = !this.isTaskListLateVisible;
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
                console.log("Voici la liste des membre dans taskspage ++++++++++++++++", this.projectMembers);

                const getRoleByUserId = (userId) => {
                    const member = this.projectMembers.find(member => member.userId === userId);
                    return member ? member.Role.nom : null;
                };

                const getMemberEmail = (userId) => {
                    const member = this.projectMembers.find(member => member.userId === userId);
                    return member ? member.userMember.email : null;
                };

                const userId = localStorage.getItem('userId'); // Replace with the actual userId you want to check
                this.userRoleNom = getRoleByUserId(userId);
                this.userEmail = getMemberEmail(userId);
                console.log("Role Nom:", this.userRoleNom);
                console.log("User Email:", this.userEmail);

            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des membres du projet : ' + (error.response ? error.response.data.message : error.message);
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
                console.log("Tâches en attente récupérées :", this.pendingTasks);

                // Récupérer les informations de l'utilisateur assigné pour chaque tâche
                for (let task of this.pendingTasks) {
                    const assignmentResponse = await axios.get(`${config.apiBaseUrl}/tasks-assignments/task/${task.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    task.assignedUserId = assignmentResponse.data.userId;
                    console.log(`ID de l'utilisateur assigné pour la tâcheasd ${task.id} :`, task.assignedUserId);

                    if (task.assignedUserId) {
                        const userResponse = await axios.get(`${config.apiBaseUrl}/users/${task.assignedUserId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        task.assignedUserDetails = userResponse.data;
                        console.log(`Détails de l'utilisateur assigné pour la tâche ${task.id} :`, task.assignedUserDetails);
                        this.assignedUserEmail = task.assignedUserDetails.email;
                    }
                }

                console.log("Tâches en attente avec détails des utilisateurs assignés :", this.pendingTasks);
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

                // Récupérer les informations de l'utilisateur assigné pour chaque tâche
                for (let task of this.inProgressTasks) {
                    const assignmentResponse = await axios.get(`${config.apiBaseUrl}/tasks-assignments/task/${task.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    task.assignedUserId = assignmentResponse.data.userId;
                    console.log(`ID de l'utilisateur assigné pour la tâcheqw ${task.id} :`, task.assignedUserId);

                    if (task.assignedUserId) {
                        const userResponse = await axios.get(`${config.apiBaseUrl}/users/${task.assignedUserId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        task.assignedUserDetails = userResponse.data;
                        console.log(`Détails de l'utilisateur assigné pour la tâchecc ${task.id} :`, task.assignedUserDetails);
                        this.assignedUserEmail = task.assignedUserDetails.email;
                    }
                }

                console.log("Tâches en cours avec détails des utilisateurs assignés :", this.inProgressTasks);

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
                // Récupérer les informations de l'utilisateur assigné pour chaque tâche
                for (let task of this.completedTasks) {
                    const assignmentResponse = await axios.get(`${config.apiBaseUrl}/tasks-assignments/task/${task.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    task.assignedUserId = assignmentResponse.data.userId;
                    console.log(`ID de l'utilisateur assigné pour la tâche ${task.id} :`, task.assignedUserId);

                    if (task.assignedUserId) {
                        const userResponse = await axios.get(`${config.apiBaseUrl}/users/${task.assignedUserId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        task.assignedUserDetails = userResponse.data;
                        console.log(`Détails de l'utilisateur assigné pour la tâche ${task.id} :`, task.assignedUserDetails);
                        this.assignedUserEmail = task.assignedUserDetails.email;
                    }
                }

                console.log("Tâches terminée avec détails des utilisateurs assignés :", this.completedTasks);

            } catch (error) {
                console.error('Erreur lors de la récupération des tâches terminées :', error);
            }
        },

        async fetchTask() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/user/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userTasks = response.data;

                console.log("Tâches filtrées :", userTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en attente :', error);
            }
        },

        //filters out the user task
        async showFilter() {
            try {
                const userId = localStorage.getItem('userId');
                this.pendingTasks = this.pendingTasks.filter(task => task.assignedUserId === userId);
                this.inProgressTasks = this.inProgressTasks.filter(task => task.assignedUserId === userId);
                this.completedTasks = this.completedTasks.filter(task => task.assignedUserId === userId);

                console.log("Tâches filtrées :", this.pendingTasks);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches en attente :', error);
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

        handleTaskClick(task) {
            // Store task ID
            this.storeTaskId(task.id);

            // Store assigned user ID
            this.theAssignedUserId = task.assignedUserId;
            console.log(`Assigned User ID for task ${task.id}:`, this.theAssignedUserId);
        },
        storeTaskId(taskId) {
            localStorage.setItem('selectedTaskId', taskId);
            console.log(`Task ID ${taskId} stored in local storage`);
        },
        onStart(event) {
            const taskId = event.item.getAttribute('data-id');
            this.storeTaskId(taskId);

            // Find the task by ID and store the assigned user ID
            const task = this.pendingTasks.find(t => t.id === taskId);
            if (task) {
                this.theAssignedUserId = task.assignedUserId;
                console.log(`Assigned User ID for task ${task.id}:`, this.theAssignedUserId);
            }
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
            console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", newStatus);

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
                this.fetchPendingTasksCount();
                this.fetchInProgressTasksCount();
                this.fetchCompletedTasksCount();
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        },
        toggleMenu(taskId) {
            const allTasks = [...this.pendingTasks, ...this.inProgressTasks, ...this.completedTasks];
            allTasks.forEach(task => {
                if (task.id === taskId) {
                    task.showMenu = !task.showMenu;
                } else {
                    task.showMenu = false; // Fermer les autres menus
                }
            });
        },
        async deleteTask() {
            try {
                const token = localStorage.getItem('token');
                console.log("Voici l'id de la tache:");
                const taskId = localStorage.getItem('selectedTaskId');
                const response = await axios.delete(`${config.apiBaseUrl}/tasks/${taskId}`, {
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
                this.fetchPendingTasksCount();
                this.fetchInProgressTasksCount();
                this.fetchCompletedTasksCount();
                this.showMenu = false;

            } catch (error) {
                console.error('Erreur lors de la suppression de la tache :', error);
            }
        },
        closeEditTask() {
            this.modalEditTasks = false;
        },
        closeDetailsTask() {
            this.modalDetailTasks = false;
        },

        openViewTaskModal() {
            this.showMenu = false;
            this.taskname = this.taskDetails.task.taskname;
            this.description = this.taskDetails.task.description;

            const isUserAssigned = this.taskDetails.task.TaskAssignment;
            if (!isUserAssigned || isUserAssigned.length === 0) {
                // console.log("No assigned user No00123");
                this.userAssignEmail = "Aucun utilisateur assigne"
                console.log('asdasfasdasd', this.userAssignEmail);
            } else {
                this.userAssignId = this.taskDetails.task.TaskAssignment[0].userId;
                this.userAssignEmail = this.taskDetails.assignUserDetails.email;
                console.log('asdasfasdasd', this.userAssignEmail);
            }

            this.status = this.taskDetails.task.status;
            this.start_date = this.formatDate(this.taskDetails.task.start_date);
            this.end_date = this.formatDate(this.taskDetails.task.end_date);
            this.priority = this.taskDetails.task.priority;
            this.budget = this.taskDetails.task.budget;
            this.taskType = this.taskDetails.task.taskType;
            this.modalDetailTasks = true;
        },
        //Voir les details de la tache
        async fetchTaskDetailsView() {
            try {
                const token = localStorage.getItem('token');
                const taskId = localStorage.getItem('selectedTaskId');
                console.log('in the new world', this.movedItemId)
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${taskId}/detail`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.taskDetails = response.data;
                console.log("Voici les details de la tache selectionné:------", this.taskDetails)
                console.log(this.taskDetails);
                this.openViewTaskModal();
                this.showMenu = false;
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la tâche :', error);
            }
        },
        formatDate(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        },
        openEditTaskModal() {
            this.showMenu = false;
            this.taskname = this.taskDetails.task.taskname;
            this.description = this.taskDetails.task.description;

            const isUserAssigned = this.taskDetails.task.TaskAssignment;
            console.log("assigned user Data", isUserAssigned);
            if (!isUserAssigned || isUserAssigned.length === 0) {
                console.log("No assigned user No00123");
                this.email = "Aucun utilisateur assigne"
                console.log('asdasfasdasdmm', this.email);
            } else {
                this.userAssignId = this.taskDetails.task.TaskAssignment[0].userId;
                this.email = this.taskDetails.assignUserDetails.email;
                console.log('asdasfasdasdrr', this.email);
            }

            this.userAssignEmail = this.email
            this.status = this.taskDetails.task.status;
            this.start_date = this.formatDate(this.taskDetails.task.start_date);
            this.end_date = this.formatDate(this.taskDetails.task.end_date);
            this.priority = this.taskDetails.task.priority;
            this.budget = this.taskDetails.task.budget;
            this.taskType = this.taskDetails.task.taskType;
            this.modalEditTasks = true;
            console.log("Voici les details de la tache selectionné:---", this.userAssignId);
        },
        toISODate(dateString) {
            const [day, month, year] = dateString.split('/');
            return new Date(year, month - 1, day).toISOString();
        },

        //details d'une tache
        async fetchTaskDetails() {
            try {
                const token = localStorage.getItem('token');
                console.log("trying to get task details");
                // console.log(this.movedItemId);
                const taskId = localStorage.getItem('selectedTaskId');

                const response = await axios.get(`${config.apiBaseUrl}/tasks/${taskId}/detail`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.taskDetails = response.data;
                console.log("Voici les details de la tache selectionné:+++", this.taskDetails);
                console.log(this.taskDetails);
                this.showMenu = false;
                this.openEditTaskModal();
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la tâche :', error);
            }
        },

        async editTask() {
            try {
                const token = localStorage.getItem('token');
                const taskId = localStorage.getItem('selectedTaskId');
                const response = await axios.patch(`${config.apiBaseUrl}/tasks/${taskId}`, {
                    // Les données de la tâche à mettre à jour
                    taskname: this.taskname,
                    description: this.description,
                    status: this.status,
                    start_date: this.toISODate(this.start_date), // Conversion en format ISO-8601
                    end_date: this.toISODate(this.end_date), // Conversion en format ISO-8601
                    priority: this.priority,
                    budget: this.budget,
                    taskType: this.taskType
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("iddddddddd", this.userAssignId);
                if (this.userAssignId === null || this.userAssignId === undefined) {
                    console.log("iddddddddd", this.userAssignId);
                    this.taskEdit = response.data;
                    console.log(this.taskEdit)
                    console.log("Tache modifiée avec succès");
                    this.fetchPendingTasks();
                    this.fetchInProgressTasks();
                    this.fetchCompletedTasks();
                    this.modalEditTasks = false;
                } else {
                    try {
                        console.log("asdasddas", this.userId);
                        const taskId = localStorage.getItem('selectedTaskId');
                        console.log("23156341564", taskId);
                        const token = localStorage.getItem('token');
                        const response = await axios.post(`${config.apiBaseUrl}/tasks-assignments`, {
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
                        this.enterpriseLoading = false;
                        this.taskEdit = response.data;
                        console.log(this.taskEdit)
                        console.log("Tache modifiée avec succès");
                        this.fetchPendingTasks();
                        this.fetchInProgressTasks();
                        this.fetchCompletedTasks();
                        this.modalEditTasks = false;
                    } catch (error) {
                        console.error('Erreur lors de lassignatuion de la tâche :', error);
                    }
                }




                this.taskEdit = response.data;
                console.log(this.taskEdit)
                console.log("Tache modifiée avec succès");
                this.fetchPendingTasks();
                this.fetchInProgressTasks();
                this.fetchCompletedTasks();
                this.modalEditTasks = false;
                //methode pour recharger la page
                // window.location.reload();

            } catch (error) {
                console.error('Erreur lors de la modification de la tâche :', error);
            }
        },

        openTaskDataModal() {
            this.showMenu = false;
            this.taskname = this.taskDetails.task.taskname;
            this.description = this.taskDetails.task.description;

            const isUserAssigned = this.taskDetails.task.TaskAssignment;
            if (!isUserAssigned || isUserAssigned.length === 0) {
                console.log("No assigned user No00123");
                this.userAssignEmail = "Aucun utilisateur assigne"
                console.log('asdasfasdasd', this.userAssignEmail);
            } else {
                this.userAssignId = this.taskDetails.task.TaskAssignment[0].userId;
                this.userAssignEmail = this.taskDetails.assignUserDetails.email;
                console.log('asdasfasdasd', this.userAssignEmail);
            }

            this.status = this.taskDetails.task.status;
            this.start_date = this.formatDate(this.taskDetails.task.start_date);
            this.end_date = this.formatDate(this.taskDetails.task.end_date);
            this.priority = this.taskDetails.task.priority;
            this.budget = this.taskDetails.task.budget;
            this.taskType = this.taskDetails.task.taskType;
            this.modalAcceptTask = true;
        },

        //Voir les details de la tache
        async acceptTask() {
            try {
                const token = localStorage.getItem('token');
                const taskId = localStorage.getItem('selectedTaskId');
                console.log('in the new world', this.movedItemId)
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${taskId}/detail`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.taskDetails = response.data;
                console.log("Voici les details de la tache selectionné:-------", this.taskDetails)
                console.log(this.taskDetails);
                this.openTaskDataModal();
                this.showMenu = false;
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la tâche :', error);
            }
        },

        // recupere la tâche au membre
        async attributeTask() {
            try {
                console.log("asdasddas", this.userId);
                const taskId = localStorage.getItem('selectedTaskId');
                const token = localStorage.getItem('token');
                const res = {
                    taskId: taskId,
                    userId: this.userId,
                    // creatBy:  this.userId,
                };
                console.log("kljkljkl", res);
                
                const response = await axios.post(`${config.apiBaseUrl}/tasks-assignments`, res , {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.success = true;
                this.successMessage = response.data.message;
                console.log("tache crée et affectée avec success ")
                this.userAssignId = '';
                this.enterpriseLoading = false;
            } catch (error) {
                console.error('Erreur lors de lassignatuion de la tâche :', error);
            }
        },
        beforeDestroy() {
            EventBus.off('setFirstProject3', this.refreshAllData);
        },

    },

    log(event) {
        console.log(event);
    },

    beforeUnmount() {
        EventBus.off('setFirstProject3', this.refreshAllData);
    }

});
</script>




<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

body {
    font-family: Monda;
}


/* Masquer la barre de défilement */
.pendingTasks::-webkit-scrollbar,
.inProgressTasks::-webkit-scrollbar,
.completedTasks::-webkit-scrollbar {
    display: none;
}

/* Masquer la barre de défilement pour Firefox */
.pendingTasks,
.inProgressTasks,
.completedTasks {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>