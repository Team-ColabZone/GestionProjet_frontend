<template>
    <div class="flex flex-col w-full h-full  bg-white monda-font animate__animated animate__fadeInDown">
        <header class="flex justify-between items-center w-full px-4 border-b border-gray-200 ">
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

        <main class="flex flex-col lg:flex-row gap-1">
            <!-- Sidebar -->
            <nav class="w-full lg:w-1/6 bg-white shadow-lg h-auto lg:h-full">
                <ul class="w-full p-3 flex flex-col h-full gap-5">
                    <!-- Dashboard -->
                    <li class="w-full flex flex-col gap-2">
                        <button class="flex justify-between items-center w-full rounded" @click="showPage('dashboard')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1"
                                :class="{ 'bg-gray-300 py-1 px-2 rounded-lg': currentPage === 'dashboard' }">
                                <Gauge class="h-4" />
                                <h3
                                    :class="{ 'text-black': currentPage === 'dashboard', 'text-gray-500': currentPage !== 'dashboard' }">
                                    Dashboard
                                </h3>
                            </div>
                            <button @click="toggleProjectList" class="w-1/5 bg-transparent border-none cursor-pointer"
                                :class="{ 'text-black': currentPage === 'dashboard', 'text-gray-500': currentPage !== 'dashboard' }">
                                <ChevronUp
                                    :class="{ 'chevron-down': !isProjectListVisible, 'chevron-up': isProjectListVisible }"
                                    class="w-full h-4 transition-transform" />
                            </button>
                        </button>

                        <div :class="{ 'block': isProjectListVisible, 'hidden': !isProjectListVisible }"
                            class="w-full flex flex-col gap-2 p-2 bg-white shadow-sm border border-gray-300 rounded-lg">
                            <!-- Projects List -->
                            <div v-for="project in projects" :key="project.id" @click="selectProject(project.id)"
                                class="project-item py-1 border-b border-gray-300 cursor-pointer">
                                <p
                                    class="project-item text-left text-black text-xs md:text-sm bg-gray-100 rounded-lg p-2">
                                    {{ project.projectname }}<br>
                                    {{ project.description }}
                                </p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex flex-col gap-1">
                                <button
                                    class="addProjectbtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                    @click="showModal1">
                                    Créer un Projet
                                    <SquarePlus class="w-4 h-4" />
                                </button>

                                <button
                                    class="addEntreprisebtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                    @click="addEnterprise">
                                    Créer une Entreprise
                                    <Building2 class="w-4 h-4" />
                                </button>

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
                        <button class="flex justify-between items-center w-full" @click="showPage('backlogs')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1"
                                :class="{ 'bg-gray-300 py-1 px-2 rounded-lg': currentPage === 'backlogs' }">
                                <SquarePlus class="h-5" />
                                <h3
                                    :class="{ 'text-black': currentPage === 'backlogs', 'text-gray-500': currentPage !== 'backlogs' }">
                                    Backlogs
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4"
                                :class="{ 'text-black': currentPage === 'backlogs', 'text-gray-500': currentPage !== 'backlogs' }" />
                        </button>
                    </li>

                    <!-- Tasks -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full rounded-lg" @click="showPage('tasks')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1"
                                :class="{ 'bg-gray-300 py-1 px-2 rounded-lg': currentPage === 'tasks' }">
                                <ListTodo class="h4" />
                                <h3
                                    :class="{ 'text-black': currentPage === 'tasks', 'text-gray-500': currentPage !== 'tasks' }">
                                    Tâches
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4"
                                :class="{ 'text-black': currentPage === 'tasks', 'text-gray-500': currentPage !== 'tasks' }" />
                        </button>
                    </li>

                    <!-- Team Members -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full rounded-lg" @click="showPage('team')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1"
                                :class="{ 'bg-gray-300 py-1 px-2 rounded-lg': currentPage === 'team' }">
                                <Users class="h4" />
                                <h3
                                    :class="{ 'text-black': currentPage === 'team', 'text-gray-500': currentPage !== 'team' }">
                                    Membres
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4"
                                :class="{ 'text-black': currentPage === 'team', 'text-gray-500': currentPage !== 'team' }" />
                        </button>
                    </li>

                    <!-- Enterprise -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full rounded-lg"
                            @click="showPage('enterprise')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1"
                                :class="{ 'bg-gray-300 py-1 px-2 rounded-lg': currentPage === 'enterprise' }">
                                <Building2 class="h4" />
                                <h3
                                    :class="{ 'text-black': currentPage === 'enterprise', 'text-gray-500': currentPage !== 'enterprise' }">
                                    Entreprise
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4"
                                :class="{ 'text-black': currentPage === 'enterprise', 'text-gray-500': currentPage !== 'enterprise' }" />
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
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="modalVisible">
                <div class="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-3xl">
                    <div class="flex justify-end">
                        <button @click="hideModal">
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

            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="modalVisible1">
                <div class="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-3xl">
                    <div class="flex justify-end">
                        <button @click="hideModal1">
                            <X class="text-gray-600 text-2xl" />
                        </button>
                    </div>

                    <h1 class="text-center text-2xl text-gray-800 mb-6">Ajouter une Entreprise</h1>
                    <form @submit.prevent="createNewEntreprise" class="flex flex-wrap">
                        <div class="w-full md:w-1/2 pr-2">
                            <div class="mb-4">
                                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nom de
                                    l'Entreprise :</label>
                                <input type="text" id="name" v-model="name" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            </div>

                            <div class="mb-4">
                                <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description
                                    :</label>
                                <textarea id="description" v-model="description" cols="30" rows="3"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"></textarea>
                            </div>



                            <div class="flex space-x-2">
                                <div class="mb-4 w-1/2">
                                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email
                                        :</label>
                                    <input type="email" id="start_date" v-model="email" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                                </div>
                                <div class="mb-4 w-1/2">
                                    <label for="phoneNumber"
                                        class="block text-gray-700 text-sm font-bold mb-2">Téléphone :</label>
                                    <input type="text" id="phoneNumber" v-model="phoneNumber" required
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                                </div>
                            </div>
                        </div>

                        <div class="w-full md:w-1/2 pl-2">
                            <!-- <div class="mb-4">
                                    <label for="image" class="block text-gray-700 text-sm font-bold mb-2">Logo de l'entreprise
                                        :</label>
                                    <input type="file" id="image" accept="image/*" @change="onFileSelected"
                                        class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        placeholder="Ajouter un logo">
                                    <img v-if="selectedImage" :src="selectedImageURL" alt="Aperçu de l'image"
                                        class="mt-2 rounded">
                                </div> -->

                            <div class="mb-4">
                                <label for="pobox" class="block text-gray-700 text-sm font-bold mb-2">Adresse
                                    :</label>
                                <input type="text" id="pobox" v-model="pobox" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
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

            <div class="fixed inset-0 bg-black/50 flex items-start justify-end z-50 pt-12 pr-5" v-if="identity">
                <div
                    class="bg-white p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-lg">
                    <div class="flex justify-between">
                        <span class="w-full ">asd</span>
                        <button @click="hideIdentity">
                            <X class="text-gray-600 text-2xl" />
                        </button>
                    </div>

                    <div class="w-full flex flex-col items-center">
                        <img src="" alt="">

                        <span>Bonjour</span>

                        <button class="border border-gray-200 text-blue-600 py-1 px-5 rounded-2xl">Gérer votre
                            compte</button>
                    </div>

                    <div class="border border-gray-200 rounded-xl">
                        <div class="flex justify-between border-b border-gray-200 py-2 px-5">
                            <span>Entreprise</span>
                            <button @click="toggleEnterpriseList"
                                class="w-auto bg-transparent  border border-gray-200 cursor-pointer rounded-full ">

                                <ChevronUp
                                    :class="{ 'chevron-down': !isEnterprisesListVisible, 'chevron-up': isEnterprisesListVisible }"
                                    class=" w-full h-5 transition-transform" />
                            </button>
                        </div>

                        <div class="w-full flex flex-col" v-if="isEnterprisesListVisible">

                            <div v-for="entreprise in entreprises" :key="entreprise.id"
                                @click="selectEntreprise(entreprise.id)" class="  border-b border-gray-200 py-1 px-5">

                                <!-- <div class="w-4 h-4">
                                        <img class=" border boreder-black  rounded-full "
                                            src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                                    </div> -->

                                <div class="flex flex-col ">
                                    <span>{{ entreprise.name }}</span>
                                    <span class="text-xs">{{ entreprise.email }}</span>
                                </div>
                            </div>
                        </div>


                        <button class="w-full flex gap-4 border-b border-gray-200 py-2 px-5" @click="addEnterprise">
                            <Plus class="h-6 border border-gray-200 rounded-full text-blue-500" />
                            <span>Ajouter une Entreprise</span>
                        </button>

                        <button class="w-full flex gap-4 py-2 px-5">
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
            modalVisible: false,
            identity: false,
            modalVisible1: false,
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
            selectedImageURL: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',

            userId: '',
            projects: [
            ], // Liste des projets
            entreprises: [], // Liste des entreprises
            selectedProjectId: '', // ID du projet sélectionné
            projectId: '',
            userData: null,
            isProjectListVisible: false,
            isEnterprisesListVisible: true,
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

    },
    methods: {
        hideModal() {
            this.modalVisible = false;
        },
        hideModal1() {
            this.modalVisible1 = false;
        },

        showModal1() {
            this.modalVisible = true;
        },
        hideIdentity() {
            this.identity = false;
        },
        showIdentity() {
            this.identity = true;
        },
        addEnterprise() {
            this.modalVisible1 = true;
            this.identity = false;
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

        // async createNewProject() {
        //     try {
        //         const token = localStorage.getItem('token');

        //         const formData = new FormData();

        //         formData.append('projectname', this.projectname);
        //         formData.append('description', this.description);
        //         formData.append('start_date', new Date(this.start_date).toISOString());
        //         formData.append('end_date', new Date(this.end_date).toISOString());
        //         formData.append('budget', this.budget);
        //         formData.append('projectType', this.projectType);
        //         formData.append('projectPrivacyPolicy', this.projectPrivacyPolicy);
        //         formData.append('downloadUrlLink', this.downloadUrlLink);
        //         formData.append('userId', this.userId);

        //         if (this.selectedImage) {
        //             formData.append('projectlogo', this.selectedImage);
        //         }


        //         console.log('projectname', this.projectname);
        //         console.log('description', this.description);
        //         console.log('projectType', this.projectType);

        //         console.log('start_date', new Date(this.start_date).toISOString());
        //         console.log('end_date', new Date(this.end_date).toISOString());
        //         console.log('projectPrivacyPolicy', this.projectPrivacyPolicy);
        //         console.log('budget', this.budget);
        //         console.log('downloadUrlLink', this.downloadUrlLink);
        //         console.log('userId', this.userId);
        //         console.log('projectlogo', this.selectedImage);


        //         Send the request
        //         const response = await axios.post(`${config.apiBaseUrl}/projects`, formData, {
        //             headers: {
        //                 'Authorization': `Bearer ${token}`
        //             }
        //         },);

        //         Handle success
        //         this.success = true;
        //         this.successMessage = response.data.message;

        //         Clear the form after submission
        //         this.projectname = '';
        //         this.description = '';
        //         this.projectType = '';
        //         this.start_date = '';
        //         this.end_date = '';
        //         this.projectPrivacyPolicy = '';
        //         this.budget = '';
        //         this.downloadUrlLink = '';
        //         this.selectedImage = null;
        //         this.selectedImageURL = '';

        //         Hide the modal
        //         this.hideModal();

        //     } catch (error) {
        //         this.error = true;
        //         this.errorMessage = error.response ? error.response.data.message : error.message;
        //     }
        // },

        // onFileSelected(event) {
        //     const file = event.target.files[0];
        //     if (file) {
        //         this.selectedImage = file;
        //         this.selectedImageURL = URL.createObjectURL(file);
        //     }
        // },

        // beforeDestroy() {
        //     if (this.selectedImageURL) {
        //         URL.revokeObjectURL(this.selectedImageURL);
        //     }
        // },
        async createNewEntreprise() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${config.apiBaseUrl}/entreprises`, {
                    name: this.name,
                    description: this.description,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    pobox: this.pobox,
                    userId: this.userId // Assure-toi d'inclure l'ID de l'utilisateur
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.success = true;
                this.successMessage = response.data.message;
                // Réinitialiser les champs du formulaire
                this.name = '';
                this.description = '';
                this.email = '';
                this.phoneNumber = '';
                this.pobox = '';
                console.log("Entreprise crée avec succes");
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