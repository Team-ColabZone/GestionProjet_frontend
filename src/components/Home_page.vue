<template>
    <div class="flex flex-col w-full h-screen  bg-white monda-font animate__animated animate__fadeInDown">
        <header class="h-auto flex justify-between items-center w-full px-4 border-b border-gray-200 ">
            <img src="../assets/images/logoflysoft.png" alt="logo Entreprise" class="h-11">

            <div class="flex gap-2">
                <button class="cursor-pointer border-none bg-transparent">
                    <MessageSquare class="w-4 h-4" />
                </button>

                <button class="cursor-pointer border-none bg-transparent">
                    <BellRing class="w-4 h-4" />
                </button>

                <button @click="showIdentity" class="rounded-full h-11 bg-white border-none p-px shadow-2xl">
                    <img class=" border boreder-black w-full h-full rounded-full "
                        src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                </button>
            </div>
        </header>

        <main class="h-full flex flex-col lg:flex-row gap-1">
            <!-- Hamburger Menu Button -->
            <button @click="toggleNav" class="lg:hidden p-4">
                <!-- Icon for 3 bars -->
                <AlignJustify class="w-6 h-6" />
            </button>

            <!-- Sidebar Navigation -->
            <nav
                :class="{ 'fixed inset-0 bg-white z-50 flex flex-col items-start p-4 transform translate-x-0': isNavOpen, 'hidden': !isNavOpen && !isLgScreen, 'absolute w-full lg:w-1/6 bg-white shadow-lg h-auto lg:h-full lg:block lg:relative': isLgScreen, }">
                <ul class="w-full p-3 flex flex-col h-full gap-5">
                    <!-- Close Button for the Nav (Visible on small screens) -->
                    <button @click="toggleNav" class="self-end lg:hidden text-gray-600 text-2xl">
                        <X />
                    </button>

                    <!-- Dashboard -->
                    <li class="w-full flex flex-col gap-2">
                        <button class="flex justify-between items-center w-full rounded"
                            :class="{ 'bg-gray-100 py-1 px-2 rounded-lg': currentPage === 'dashboard', }"
                            @click="showPage('dashboard')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1">
                                <Gauge class="h-7" />
                                <h3 class="text-black">
                                    Dashboard
                                </h3>
                            </div>

                            <button @click="toggleProjectList" class="w-1/5 bg-transparent border-none cursor-pointer"
                                :class="{ 'text-black': currentPage === 'dashboard', 'text-gray-500': currentPage !== 'dashboard', }">
                                <ChevronUp :class="{
                                    'chevron-down': !isProjectListVisible,
                                    'chevron-up': isProjectListVisible,
                                }" class="w-full h-4 transition-transform" />
                            </button>
                        </button>

                        <div :class="{
                            block: isProjectListVisible,
                            hidden: !isProjectListVisible,
                        }" class="w-full flex flex-col gap-2 p-2 bg-white shadow-sm border border-gray-300 rounded-lg">
                            <!-- Projects List -->
                            <div v-for="project in projects" :key="project.id" @click="selectProject(project.id)"
                                class="flex items-center border-b border-gray-300 cursor-pointer bg-gray-100 rounded-lg">
                                <img src="" alt="#" class="w-12 h-full rounded border">
                                <p class=" text-left text-black text-xs md:text-sm p-2">
                                    <span class="font-medium">{{ project.projectname }}</span><br>
                                    {{ project.description }}
                                </p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="w-full pt-2 flex flex-col gap-2 border-t border-gray-200">
                                <button
                                    class="addProjectbtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                    @click="showModal1">
                                    Créer un Projet
                                    <SquarePlus class="w-4 h-4" />
                                </button>

                                <!-- <button
                                    class="addEntreprisebtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                    @click="addEnterprise">
                                    Créer une Entreprise
                                    <Building2 class="w-4 h-4" />
                                </button> -->

                                <button
                                    class="addProjectbtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                    @click="ShowInvitation()">
                                    Nouveau projet invité
                                    <FolderGit2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </li>

                    <!-- Backlogs -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full" :class="{
                            'bg-gray-100 py-1 px-2 rounded-lg': currentPage === 'backlogs',
                        }" @click="showPage('backlogs')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1">
                                <SquarePlus class="h-5" />
                                <h3 class="text-black">
                                    Backlogs
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4" :class="{
                                'text-black': currentPage === 'backlogs',
                                'text-gray-500': currentPage !== 'backlogs',
                            }" />
                        </button>
                    </li>

                    <!-- Tasks -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full rounded-lg" :class="{
                            'bg-gray-100 py-1 px-2 rounded-lg': currentPage === 'tasks',
                        }" @click="showPage('tasks')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1">
                                <ListTodo class="h4" />
                                <h3 class="text-black">
                                    Tâches
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4" :class="{
                                'text-black': currentPage === 'tasks',
                                'text-gray-500': currentPage !== 'tasks',
                            }" />
                        </button>
                    </li>

                    <!-- Team Members -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full rounded-lg" :class="{
                            'bg-gray-100 py-1 px-2 rounded-lg': currentPage === 'team',
                        }" @click="showPage('team')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1">
                                <Users class="vue h4" />
                                <h3 class="text-black">
                                    Membres
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4" :class="{
                                'text-black': currentPage === 'team',
                                'text-gray-500': currentPage !== 'team',
                            }" />
                        </button>
                    </li>

                    <!-- Enterprise -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full rounded-lg" :class="{
                            'bg-gray-100 py-1 px-2 rounded-lg': currentPage === 'enterprise',
                        }" @click="showPage('enterprise')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1">
                                <Building2 class="h4" />
                                <h3 class="text-black">
                                    Entreprise
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4" :class="{
                                'text-black': currentPage === 'enterprise',
                                'text-gray-500': currentPage !== 'enterprise',
                            }" />
                        </button>
                    </li>
                </ul>
            </nav>

            <!-- Main Content -->
            <div class="w-full lg:w-5/6 bg-white shadow-md">
                <div class="page" v-if="currentPage === 'dashboard'">
                    <dashboardPage />
                </div>
                <div class="page" v-if="currentPage === 'backlogs'">
                    <backlogsPage />
                </div>
                <div class="page" v-if="currentPage === 'tasks'">
                    <tasksPage />
                </div>
                <div class="page" v-if="currentPage === 'team'">
                    <teamMemberPage />
                </div>
                <div class="page" v-if="currentPage === 'enterprise'">
                    <enterprisePage />
                </div>
            </div>
        </main>

        <div>
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="modalProject">
                <div class="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-3xl">
                    <div class="flex justify-end">
                        <button @click="hideModalProject">
                            <X class="text-gray-600 text-2xl" />
                        </button>
                    </div>

                    <h1 class="text-center text-2xl text-gray-800 mb-6">Ajouter un projet</h1>

                    <form @submit.prevent="createNewProject" class="flex flex-wrap">
                        <div class="w-full md:w-1/2 pr-2">
                            <div class="mb-4">
                                <label for="projectname" class="block text-gray-700 text-sm font-bold mb-2">Nom du
                                    projet :</label>
                                <input type="text" id="projectname" v-model="projectname" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            </div>

                            <div class="mb-4">
                                <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description
                                    :</label>
                                <textarea id="description" v-model="description" cols="30" rows="3"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"></textarea>
                            </div>

                            <div class="mb-4">
                                <label for="projectType" class="block text-gray-700 text-sm font-bold mb-2">Type de
                                    projet :</label>
                                <input type="text" id="projectType" v-model="projectType" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            </div>

                            <div class="flex space-x-2">
                                <div class="mb-4 w-1/2">
                                    <label for="start_date" class="block text-gray-700 text-sm font-bold mb-2">Date
                                        de début :</label>
                                    <input type="date" id="start_date" v-model="start_date" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                                </div>
                                <div class="mb-4 w-1/2">
                                    <label for="end_date" class="block text-gray-700 text-sm font-bold mb-2">Date de
                                        fin :</label>
                                    <input type="date" id="end_date" v-model="end_date" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                                </div>
                            </div>

                            <div class="mb-4">
                                <label for="projectPrivacyPolicy"
                                    class="block text-gray-700 text-sm font-bold mb-2">politique de confidentialite
                                    :</label>
                                <textarea id="projectPrivacyPolicy" v-model="projectPrivacyPolicy" cols="30" rows="3"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"></textarea>
                            </div>
                        </div>

                        <div class="w-full md:w-1/2 pl-2">
                            <!-- <div class="mb-4">
                                    <label for="image" class="block text-gray-700 text-sm font-bold mb-2">Project Logo
                                        :</label>
                                    <input type="file" id="image" accept="image/*" @change="onFileSelected"
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        placeholder="Ajouter un logo">
                                    <img v-if="selectedImage" :src="selectedImageURL" alt="Aperçu de l'image"
                                        class="mt-2 rounded">
                                </div> -->

                            <div class="mb-4">
                                <label for="budget" class="block text-gray-700 text-sm font-bold mb-2">Budget
                                    Estimatif :</label>
                                <input type="text" id="budget" v-model="budget" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            </div>

                            <div class="mb-4">
                                <label for="downloadUrlLink" class="block text-gray-700 text-sm font-bold mb-2">Lien
                                    github du projet :</label>
                                <input type="text" id="downloadUrlLink" v-model="downloadUrlLink" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            </div>

                        </div>

                        <div class="flex justify-end w-full ">
                            <button
                                class="w-2/5 bg-black text-white p-3 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                                type="submit">
                                Enregistrer le projet
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="fixed h-full inset-0 bg-black/50 flex items-center justify-center z-50" v-if="modalmembers">
                <div class="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-3xl">
                    <div class="h-auto flex justify-between content-center w-full">
                        <h1 class=" text-black mb-6">AJOUTER UN MEMBRE AU PROJET</h1>
                        <button @click="hideModalmembers">
                            <X class="text-black text-2xl" />
                        </button>
                    </div>

                    <form @submit.prevent="addMember" class="flex flex-col gap-6">
                        <div class="flex gap-2">
                            <div class="w-1/2">
                                <label for="email" class="block text-black text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input type="text" id="email" v-model="email" @input="searchEmails"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"
                                    placeholder="Rechercher un email..." />
                                <ul v-if="filteredEmails.length" class="bg-white border rounded mt-2">
                                    <li v-for="(filteredEmail, index) in filteredEmails" :key="index"
                                        @click="selectEmail(filteredEmail)"
                                        class="p-2 cursor-pointer hover:bg-gray-100">
                                        {{ filteredEmail }}
                                    </li>
                                </ul>
                            </div>

                            <div class="w-1/2">
                                <label for="roleId" class="block text-black text-sm font-bold mb-2">
                                    Role
                                </label>
                                <input type="text" id="roleId" v-model="roleId"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"
                                    placeholder="Entrer un rôle..." />
                            </div>
                        </div>

                        <div class="flex justify-end">
                            <button
                                class="w-2/5 bg-black text-white p-3 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                                type="submit">
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="modalEnterprise">
                <div
                    class="bg-white flex flex-col p-8 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-3xl">
                    <div class="flex justify-between">
                        <h1 class="text-center text-2xl font-bold mb-6">Ajouter une Entreprise</h1>
                        <button @click="hideModalEnterprise">
                            <X class="text-gray-600 text-2xl" />
                        </button>
                    </div>

                    <form @submit.prevent="createNewEntreprise" class="flex flex-wrap">
                        <div class="w-full md:w-1/2 pr-2">
                            <div class="mb-4">
                                <label for="name" class="block text-sm font-bold mb-2">
                                    Nom de l'Entreprise
                                </label>
                                <input type="text" id="name" v-model="name" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                            </div>

                            <div class="mb-4">
                                <label for="description" class="block text-sm font-bold mb-2">Description
                                    :</label>
                                <textarea id="description" v-model="description" cols="30" rows="3"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200"></textarea>
                            </div>

                            <div class="flex space-x-2">
                                <div class="mb-4 w-1/2">
                                    <label for="email" class="block text-sm font-bold mb-2">Email
                                        :</label>
                                    <input type="email" id="start_date" v-model="email" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                                </div>
                                <div class="mb-4 w-1/2">
                                    <label for="phoneNumber" class="block text-sm font-bold mb-2">Téléphone :</label>
                                    <input type="text" id="phoneNumber" v-model="phoneNumber" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                                </div>
                            </div>
                        </div>

                        <div class="w-full h-full md:w-1/2 pl-2">
                            <div class="relative mb-4">
                                <input type="file" id="logo" accept="image/*" @change="onFileSelected"
                                    class="absolute inset-0 opacity-0 cursor-pointer w-1/2 h-full" />

                                <div
                                    class="w-1/2 h-32 border border-gray-300 flex items-center justify-center bg-gray-100 rounded-lg">
                                    <img v-if="selectedImageURL" :src="selectedImageURL" alt="Image Preview"
                                        class="w-full h-full object-cover rounded-lg">
                                    <span v-else class="text-gray-500 p-4 text-center">Ajouter un Logo ou une photo de
                                        stucture</span>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label for="pobox" class="block text-sm font-bold mb-2">
                                    Adresse :
                                </label>
                                <input type="text" id="pobox" v-model="pobox" required
                                    class="w-2/3 p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200">
                            </div>
                        </div>

                        <div class="flex justify-end w-full ">
                            <button
                                class="w-2/5 bg-black text-white p-3 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                                type="submit">
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="fixed inset-0 bg-black/50 flex items-start justify-end z-50 pt-12 pr-5" v-if="modalIdentity">
                <div
                    class="bg-white flex flex-col p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-lg">
                    <div class="flex justify-between font-medium">
                        <span></span>
                        <!-- Displaying user's email -->
                        <span>{{ userData.email }}</span>

                        <!-- Close button -->
                        <button @click="hideIdentity">
                            <X class="text-black text-2xl" />
                        </button>
                    </div>

                    <div class="w-full flex flex-col items-center gap-3">
                        <!-- Profile Image -->
                        <div class="w-20 h-20  rounded-full">
                            <div v-if="loading">Loading...</div>
                            <div v-else>
                                <img :src="'data:image/jpeg;base64,' + userData.profileImage" alt="Profile Image"
                                    class="h-20 w-20 rounded-full border object-contain">
                            </div>
                        </div>

                        <!-- Greeting with user's last name -->
                        <span class="font-medium text-xl">{{ userData.lastname ? 'Bonjour ' + userData.lastname + ' !' :
                            '' }}</span>

                        <!-- Manage Account button -->
                        <button class="border border-gray-200 text-blue-600 px-5 rounded-2xl">
                            Gérer votre compte
                        </button>
                    </div>

                    <div class="border border-gray-200 rounded-xl">
                        <div class="flex justify-between border-b border-gray-200 py-2 px-5">
                            <span class=" font-medium">Entreprise</span>
                            <button @click="toggleEnterpriseList"
                                class="w-auto bg-transparent  border border-gray-200 cursor-pointer rounded-full ">

                                <ChevronUp
                                    :class="{ 'chevron-down': !isEnterprisesListVisible, 'chevron-up': isEnterprisesListVisible }"
                                    class=" w-full h-5 transition-transform" />
                            </button>
                        </div>

                        <div class="w-full flex flex-col" v-if="isEnterprisesListVisible">

                            <div v-for="entreprise in entreprises" :key="entreprise.id"
                                @click="selectEntreprise(entreprise.id)"
                                class=" flex items-center border-b border-gray-200 py-1 px-2 gap-4">

                                <div class="w-10 h-10">
                                    <img class=" border boreder-black  rounded-full "
                                        src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                                </div>

                                <div class="flex flex-col ">
                                    <span class="font-medium">{{ entreprise.name }}</span>
                                    <span class="text-xs">{{ entreprise.email }}</span>
                                </div>
                            </div>
                        </div>


                        <button class="w-full flex gap-4 border-b border-gray-200 py-2 px-5 text-black font-medium"
                            @click="addEnterprise">
                            <Plus class="h-6 border border-gray-200 rounded-full text-blue-500" />
                            <span>Ajouter une Entreprise</span>
                        </button>

                        <button class="w-full flex gap-4 py-2 px-5 text-black font-medium" @click="logout">
                            <Power class="h-5" />
                            <span>Déconnexion</span>
                        </button>

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
import enterprisePage from "./EnterprisePage.vue";
import config from "../config";
import axios from 'axios';

export default {
    components: {
        dashboardPage,
        backlogsPage,
        tasksPage,
        teamMemberPage,
        enterprisePage,
    },
    data() {
        return {
            modalProject: false,
            modalIdentity: false,
            modalEnterprise: true,
            modalmembers: false,
            showMessagePage: false,
            showNotificationPage: false,
            currentPage: 'dashboard',
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
            projectPrivacyPolicy: '',
            budget: '',
            downloadUrlLink: '',

            name: '',
            phoneNumber: '',
            email: '',
            pobox: '',
            selectedImage: null,
            selectedImageURL: null,
            encodeURI: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',

            // userData: {},
            userId: '',
            projects: [
            ], // Liste des projets
            entreprises: [], // Liste des entreprises
            selectedProjectId: '', // ID du projet sélectionné
            projectId: '',
            roleId: '',
            emails: ['user1@example.com', 'user2@example.com', 'user3@example.com'], // This should be fetched from the system
            filteredEmails: [],
            userData: {},
            loading: true,
            isProjectListVisible: false,
            isEnterprisesListVisible: true,

            isNavOpen: false,
            isLgScreen: false,
        };
    },
    mounted() {
        if (this.isConnected()) {
            this.userId = localStorage.getItem('userId');
            this.projectId = localStorage.getItem('projectId');
            this.fetchUserData();
            this.fetchProjects();
            this.fetchEntreprises();
            this.fetchTeamMemberCount();
            this.fetchPendingTasksCount();
            this.fetchInProgressTasksCount();
            this.fetchCompletedTasksCount();
            this.fetchTotalTasksCount();
        } else {
            this.errorMessage = 'Utilisateur non connecté';
            this.$router.push('/auth'); // Rediriger vers la page de connexion
        }

        this.handleResize();
        window.addEventListener("resize", this.handleResize);



    },
    methods: {

        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        handleResize() {
            this.isLgScreen = window.innerWidth >= 1024;
            if (this.isLgScreen) {
                this.isNavOpen = false;
            }
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.handleResize);
        },

        hideModalProject() {
            this.modalProject = false;
        },
        hideModalEnterprise() {
            this.modalEnterprise = false;
        },

        hideModalmembers() {
            this.modalmembers = false;
        },

        showModal1() {
            this.modalProject = true;
        },
        hideIdentity() {
            this.modalIdentity = false;
        },
        showIdentity() {
            this.modalIdentity = true;
        },
        addEnterprise() {
            this.modalEnterprise = true;
            this.modalIdentity = false;
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
                    start_date: new Date(this.start_date), // Conversion en objet Date
                    end_date: new Date(this.end_date), // Conversion en objet Date
                    budget: this.budget,
                    projectType: this.projectType,
                    projectPrivacyPolicy: this.projectPrivacyPolicy,
                    downloadUrlLink: this.downloadUrlLink,
                    userId: this.userId // Assure-toi d'inclure l'ID de l'utilisateur
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.success = true;
                this.modalmembers = true;
                this.successMessage = response.data.message;
                // Réinitialiser les champs du formulaire
                this.projectname = '';
                this.description = '';
                this.projectType = '';
                this.projectPrivacyPolicy = '';
                this.downloadUrlLink = '';
                this.start_date = '';
                this.end_date = '';
                this.budget = '';
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response ? error.response.data.message : error.message;
            }
        },

        searchEmails() {
            this.filteredEmails = this.emails.filter((e) =>
                e.toLowerCase().includes(this.email.toLowerCase())
            );
        },

        selectEmail(email) {
            this.email = email;
            this.filteredEmails = [];
        },

        async createNewEntreprise() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${config.apiBaseUrl}/entreprises`, {
                    name: this.name,
                    description: this.description,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    pobox: this.pobox,
                    userId: this.userId, // add's user id
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.success = true;
                this.successMessage = response.data.message;

                // Send the logo image if the enterprise creation is successful
                if (response.data.success && this.logoBase64) {
                    await this.uploadLogo(response.data.email);
                }
                // Réinitialiser les champs du formulaire
                this.clearFormFields();
                console.log("Entreprise crée avec succes");
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response ? error.response.data.message : error.message;
            }
        },

        async uploadLogo(email) {
            try {
                const token = localStorage.getItem('token');
                const logoResponse = await axios.post(`${config.apiBaseUrl}/uploadLogo`, {
                    email: email,
                    logo: this.logoBase64
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Logo uploaded successfully:", logoResponse.data.message);
            } catch (error) {
                console.error("Error uploading logo:", error.response ? error.response.data.message : error.message);
            }
        },

        onFileSelected(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.selectedImageURL = e.target.result;
                    this.encodedLogo = e.target.result.split(',')[1];
                };
                reader.readAsDataURL(file);
            }
        },

        clearFormFields() {
            this.name = '';
            this.description = '';
            this.email = '';
            this.phoneNumber = '';
            this.pobox = '';
            this.logoBase64 = ''; // Clear the logo field
            this.hideModalEnterprise(); // Close the modal if applicable
        },

        async fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/users/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(this.userData);
                this.userData = response.data;
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

        toggleEnterpriseList() {
            this.isEnterprisesListVisible = !this.isEnterprisesListVisible;
        },

        async fetchEntreprises() {

            try {
                const token = localStorage.getItem('token'); // ou une autre méthode pour récupérer le token
                const response = await axios.get(`${config.apiBaseUrl}/entreprises/user/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.entreprises = response.data;
                console.log(this.userId);
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des entreprises : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        selectProject(projectId) {
            this.selectedProjectId = projectId;
            localStorage.setItem('projectId', projectId); // Stocker l'ID du projet dans le localStorage
            console.log("Bonjour");
            console.log(this.projectId)
            this.$router.push('/Home'); // Actualisation des données du dashboard
        },

        async fetchTeamMemberCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/team-members/${this.projectId}/team/count`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.teamMemberCount = response.data;
                console.log(this.teamMemberCount);
                console.log(this.projectId)
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de personnels :', error);
            }
        },
        async fetchPendingTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/pending`, {
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
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/in-progress`, {
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
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/completed`, {
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
        async logout() {
            try {
                // const token = localStorage.getItem('token');
                // await axios.post(`${config.apiBaseUrl}/logout`, {}, {
                //     headers: {
                //         'Authorization': `Bearer ${token}`
                //     }
                // });
                localStorage.removeItem('token');
                this.$router.push('/auth'); // Redirect to login page after logout
            } catch (error) {
                this.errorMessage = 'Erreur lors de la déconnexion : ' + error.response.data.message;
            }
        }
    }
};
</script>

<style>
body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
}

.chevron-up {
    transition: transform 0.3s;
    transform: rotate(0deg);
}

.chevron-down {
    transition: transform 0.3s;
    transform: rotate(180deg);
}
</style>