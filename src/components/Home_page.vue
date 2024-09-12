<template>
    <div class="flex flex-col w-full h-screen  bg-white monda-font ">
        <header class="h-auto flex justify-between items-center w-full px-4 border-b border-gray-200 ">
            <img src="../assets/images/logoflysoft.png" alt="logo Entreprise" class="h-11">

            <div class="flex gap-2">
                <button class="cursor-pointer border-none bg-transparent">
                    <MessageSquare class="w-4 h-4" />
                </button>

                <button class="cursor-pointer border-none bg-transparent">
                    <BellRing class="w-4 h-4" />
                </button>

                <button @click="handleButtonClick" class="rounded-full h-11 bg-white border-none p-px shadow-2xl">
                    <img :src="profileImageUrl" alt="Profile Image"
                        class="w-10 h-10 rounded-full border object-cover object-center" />
                </button>
            </div>
        </header>

        <main class="h-full flex flex-col lg:flex-row gap-1">
            <!-- Hamburger Menu Button -->
            <button @click="toggleNav" class="lg:hidden p-4">
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
                        <div class="relative w-full">
                            <button class="flex justify-between items-center w-full rounded"
                                :class="{ 'bg-gray-100 h-full w-full rounded-lg': currentPage === 'dashboard' }"
                                @click="showPage('dashboard')">
                                <div class="w-4/5 md:w-4/5">
                                    <div v-if="firstProjectName" class="flex items-center gap-2 h-14 md:gap-4 pr-2">
                                        <img :src="firstProjectLogo" alt="Logo"
                                            class="h-full w-14 rounded-lg object-fit " />
                                        <h3 class="text-black text-lg font-semibold py-1">{{ firstProjectName }}</h3>
                                    </div>
                                    <div v-else class="flex items-center gap-1 py-1 px-2">
                                        <Gauge class="h-7" />
                                        <h3 class="text-black">Dashboard</h3>
                                    </div>
                                </div>

                                <button @click="toggleProjectList"
                                    class="w-1/5 bg-transparent border-none cursor-pointer"
                                    :class="{ 'text-black': currentPage === 'dashboard', 'text-gray-500': currentPage !== 'dashboard' }">
                                    <ChevronUp
                                        :class="{ 'chevron-down': !isProjectListVisible, 'chevron-up': isProjectListVisible }"
                                        class="w-full h-4 transition-transform" />
                                </button>
                            </button>

                            <div :class="{ block: isProjectListVisible, hidden: !isProjectListVisible }"
                                class="absolute top-full left-0 w-full flex flex-col gap-2 p-2 bg-white shadow-sm border border-gray-300 rounded-lg z-10">
                                <!-- Projects List -->
                                <div class="h-40 w-full overflow-x-auto overflow-y-auto">
                                    <div v-for="project in displayedProjects" :key="project.id"
                                        @click="selectProject(project.id)" :class="[
                                            'h-14 flex items-center border-b border-gray-50 cursor-pointer rounded-lg pr-2',
                                            { 'bg-gray-300': selectedProjectId === project.id, 'bg-gray-100': selectedProjectId !== project.id }
                                        ]">
                                        <img :src="project.projectlogo" alt="Logo"
                                            class="h-full w-12 border rounded-lg object-cover" />
                                        <p class="text-left text-black text-ellipsis text-xs md:text-sm p-2">
                                            <span class="font-medium">{{ project.projectname }}</span><br />
                                            {{ project.description }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="w-full pt-2 flex flex-col gap-2 border-t border-gray-200">
                                    <button
                                        class="addProjectbtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                        @click="showModal1">
                                        Créer un Projet
                                        <SquarePlus class="w-4 h-4" />
                                    </button>

                                    <button
                                        class="addProjectbtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                        @click="ShowInvitation()">
                                        Nouveau projet invité
                                        <FolderGit2 class="w-4 h-4" />
                                    </button>
                                </div>
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
                                <Users class="h4" />
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

                    <!-- Entreprise -->
                    <li class="w-full">
                        <button class="flex justify-between items-center w-full rounded-lg" :class="{
                            'bg-gray-100 py-1 px-2 rounded-lg': currentPage === 'entreprise',
                        }" @click="showPage('entreprise')">
                            <div class="flex w-4/5 md:w-3/5 items-center gap-1">
                                <Building2 class="h4" />
                                <h3 class="text-black">
                                    Entreprise
                                </h3>
                            </div>
                            <ArrowRight class="w-1/5 h-4" :class="{
                                'text-black': currentPage === 'entreprise',
                                'text-gray-500': currentPage !== 'entreprise',
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
                <div class="page" v-if="currentPage === 'entreprise'">
                    <entreprisePage />
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
                                    class="block text-gray-700 text-sm font-bold mb-2">politique
                                    de confidentialite
                                    :</label>
                                <textarea id="projectPrivacyPolicy" v-model="projectPrivacyPolicy" cols="30" rows="3"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"></textarea>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 pl-2">
                            <div class="relative mb-4">
                                <input type="file" id="logo" accept="image/*" @change="projectImg"
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
                                <label for="budget" class="block text-gray-700 text-sm font-bold mb-2">Budget
                                    Estimatif :</label>
                                <input type="text" id="budget" v-model="budget" required
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            </div>

                            <div class="mb-4">
                                <label for="downloadUrlLink" class="block text-gray-700 text-sm font-bold mb-2">Lien
                                    github du projet :</label>
                                <input type="text" id="downloadUrlLink" v-model="downloadUrlLink"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            </div>

                        </div>

                        <div class="flex justify-end w-full ">
                            <button
                                class="w-2/5 bg-black text-white p-3 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
                                type="submit">
                                <span v-if="!projectLoading">
                                    Enregistrer le projet
                                </span>
                                <div v-else class="flex justify-center">
                                    <span
                                        class="inline-block w-6 h-6 border-4 border-gray-400 border-t-black border-b-black rounded-full animate-spin"></span>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="modalEntreprise">
                <div
                    class="bg-white flex flex-col p-8 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-3xl">
                    <div class="flex justify-between">
                        <h1 class="text-center text-2xl font-bold mb-6">Ajouter une Entreprise</h1>
                        <button @click="hideModalEntreprise">
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
                            <div class="relative mb-4 md:mt-6">
                                <input type="file" id="logo" accept="image/*" @change="entrepriseImg"
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
                                class="w-2/5 bg-black text-white p-3 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-700"
                                type="submit">
                                <span v-if="!enterpriseLoading">
                                    Ajouter
                                </span>
                                <div v-else class="flex justify-center">
                                    <span
                                        class="inline-block w-6 h-6 border-4 border-gray-400 border-t-black border-b-black rounded-full animate-spin"></span>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="fixed inset-0 bg-black/50 flex items-start justify-end z-50 pt-12 px-2 md:pr-5"
                v-if="modalIdentity">
                <div
                    class="bg-white flex flex-col p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-lg">
                    <div class="flex justify-between font-medium">
                        <span></span>
                        <!-- Displaying user's email -->
                        <span>{{ profile.email }}</span>

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
                                <!-- <img :src="'data:image/jpeg;base64,' + profile.profileImage" alt="Profile Image"
                                    class="h-20 w-20 rounded-full border object-contain"> -->
                                <img :src="profileImageUrl" alt="Profile Image"
                                    class="w-20 h-20 rounded-full border object-cover object-center" />

                            </div>
                        </div>

                        <!-- Greeting with user's last name -->
                        <span class="font-medium text-xl">{{ profile.lastname ? 'Bonjour ' + profile.lastname + ' !' :
                            '' }}</span>

                        <!-- Manage Account button -->
                        <button class="border border-gray-200 text-blue-600 px-5 rounded-2xl" @click="accountdata">
                            Gérer votre compte
                        </button>
                    </div>

                    <div class="border border-gray-200 rounded-xl">
                        <div>
                            <div class="flex justify-between border-b border-gray-200 py-2 px-5">
                                <span class=" font-medium">Entreprise</span>
                                <button @click="toggleEntrepriseList"
                                    class="w-auto bg-transparent  border border-gray-200 cursor-pointer rounded-full ">

                                    <ChevronUp
                                        :class="{ 'chevron-down': !isEntreprisesListVisible, 'chevron-up': isEntreprisesListVisible }"
                                        class=" w-full h-5 transition-transform" />
                                </button>
                            </div>
                            <div class="w-full h-40 flex flex-col overflow-y-auto" v-if="isEntreprisesListVisible">

                                <div v-for="entreprise in entreprises" :key="entreprise.id"
                                    @click="selectEntreprise(entreprise.id)"
                                    class="flex items-center border-b border-gray-200 py-1 px-2 gap-4 cursor-pointer">
                                    <div class="w-10 h-10">
                                        <img class="border w-10 h-10 border-black rounded-full" :src="entreprise.logo"
                                            alt="logo Entreprise" />
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="font-medium truncate">{{ entreprise.name }}</span>
                                        <span class="text-xs">{{ entreprise.email }}</span>
                                    </div>
                                </div>

                            </div>
                        </div>



                        <button class="w-full flex gap-4 border-b border-gray-200 py-2 px-5 text-black font-medium"
                            @click="addEntreprise">
                            <Plus class="h-6 border border-gray-200 rounded-full text-blue-500" />
                            <span>Ajouter une Entreprise</span>
                        </button>

                        <button @click="logout">
                            <div v-if="!logoutLoader" class="w-full flex gap-4 py-2 px-5 text-black font-medium">
                                <Power class="h-5" />
                                <span>Déconnexion</span>
                            </div>
                            <div v-else class="flex justify-center">
                                <span
                                    class="inline-block w-6 h-6 border-4 border-gray-400 border-t-black border-b-black rounded-full animate-spin"></span>
                            </div>
                        </button>

                    </div>

                </div>
            </div>

            <div class="fixed inset-0 backdrop-blur-sm flex justify-end z-50" v-if="modalModifyData">
                <button @click="closeModifyData" class="self-start p-6">
                    <span class="text-black text-2xl">×</span>
                </button>

                <div
                    class="flex flex-col h-full md:h-auto bg-white p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-4xl">
                    <div class="flex justify-between">
                        <h1 class="text-center text-2xl text-black">COMPTE</h1>
                        <button class="px-3 bg-black text-white rounded hover:bg-gray-600"
                            @click="modifyProfile">sauvegarder</button>
                    </div>

                    <form @submit.prevent="modifyProfile" class="flex flex-col gap-4">
                        <div
                            class="flex flex-row gap-4 border-t border-b border-gray-300 py-3 justify-between items-center">
                            <div class="flex flex-col gap-3 items-center md:flex-row">
                                <img :src="profileImageUrl" alt="Profile Image"
                                    class="w-16 h-16 rounded-full border object-cover object-center" />
                                <span>PHOTO DE PROFIL</span>
                            </div>

                            <div class="flex gap-4">
                                <input type="file" ref="fileInput" @change="changeProfileImage" class="hidden">
                                <button type="button"
                                    class="px-3 bg-white text-black border border-gray-100 rounded hover:bg-gray-600"
                                    @click="triggerFileInput">Modifier</button>
                                <button type="button" class="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-600"
                                    @click="removeProfileImage">Supprimer</button>
                            </div>
                        </div>

                        <div class="w-full flex md:flex-row gap-5 md:gap-14">
                            <div class="w-full">
                                <label for="firstName" class="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                                <input type="text" v-model="firstName"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200" />
                            </div>

                            <div class="w-full">
                                <label for="lastName" class="block text-gray-700 text-sm font-bold mb-2">Prenom</label>
                                <input type="text" v-model="lastName"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200" />
                            </div>
                        </div>

                        <div class="flex flex-col md:flex-row gap-5 md:gap-14">
                            <div class="w-full md:w-1/2">
                                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input type="text" v-model="email"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200" />
                            </div>

                            <div class="w-full md:w-1/2 relative">
                                <label for="phoneNumber" class="block text-gray-700 text-sm font-bold mb-2">Numéro
                                    de téléphone</label>
                                <input type="text" v-model="phoneNumber"
                                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-gray-200" />
                            </div>
                        </div>

                        <router-link to="/Updatepassword" class="w-full text-right text-blue-600">MODIFIER VOTRE MOT
                            DE PASSE</router-link>
                    </form>
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
import entreprisePage from "./EntreprisePage.vue";
import config from "../config";
import axios from 'axios';

export default {
    components: {
        dashboardPage,
        backlogsPage,
        tasksPage,
        teamMemberPage,
        entreprisePage,
    },
    data() {
        return {
            modalProject: false,
            modalIdentity: false,
            modalEntreprise: false,
            modalmembers: false,
            modalModifyData: false,
            showMessagePage: false,
            showNotificationPage: false,
            enterpriseLoading: false,
            projectLoading: false,
            logoutLoader: false,
            currentPage: 'dashboard',
            selectedButton: 'button4',
            // teamMemberCount: 0,
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

            userId: '',
            projects: [], // Liste des projets
            firstProjectName: '',
            firstProjectLogo: '',
            entreprises: [], // Liste des entreprises
            selectedProjectId: '', // ID du projet sélectionné
            projectId: '',
            entrepriseId: '',
            // filteredProjects: [],
            displayedProjects: [],
            selectedEntrepriseId: null,
            roleId: '', // This should be fetched from the system
            filteredEmails: [],
            userData: {},
            loading: true,
            isProjectListVisible: false,
            isEntreprisesListVisible: false,
            isNavOpen: false,
            isLgScreen: false,

            //profile modifier
            firstName: '',
            lastName: '',
            password: '',
            profileImageUrl: '',
            projectsEntreprise: [],//liste des projets par Entreprises
            projectlogo: '',
        };
    },

    // computed: {
    //     filteredProjects() {
    //         if (this.selectedEntrepriseId) {
    //             return this.projects.filter(project => project.entrepriseId === this.selectedEntrepriseId);
    //         }
    //         return this.projects.filter(project => !project.entrepriseId);
    //     },
    // },

    mounted() {
        if (this.isConnected()) {
            this.userId = localStorage.getItem('userId');
            this.projectId = localStorage.getItem('projectId');
            this.entrepriseId = localStorage.getItem('selectedEntrepriseId');
            this.selectedEntrepriseId = localStorage.getItem('selectedEntrepriseId');
            this.fetchUserData();
            this.fetchProjects();
            this.fetchEntreprises();
            // this.fetchTeamMemberCount();
            this.fetchPendingTasksCount();
            this.fetchInProgressTasksCount();
            this.fetchCompletedTasksCount();
            this.fetchTotalTasksCount();
            this.fetchProjectsByEntreprise();
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
        hideModalEntreprise() {
            this.modalEntreprise = false;
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
        handleButtonClick() {
            if (localStorage.getItem('selectedEntrepriseId')) {
                localStorage.removeItem('selectedEntrepriseId');
                window.location.reload();
            }
            this.showIdentity();
        },
        showIdentity() {
            this.modalIdentity = true;
        },
        addEntreprise() {
            this.modalEntreprise = true;
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
            this.projectLoading = true;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${config.apiBaseUrl}/projects`, {
                    projectname: this.projectname,
                    description: this.description,
                    start_date: new Date(this.start_date), // Conversion en objet Date
                    end_date: new Date(this.end_date), // Conversion en objet Date
                    budget: this.budget,
                    entrepriseId: this.entrepriseId,
                    projectType: this.projectType,
                    projectPrivacyPolicy: this.projectPrivacyPolicy,
                    downloadUrlLink: this.downloadUrlLink,
                    userId: this.userId, // Assure-toi d'inclure l'ID de l'utilisateur
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.success = true;
                this.modalmembers = true;
                this.successMessage = response.data.message;
                // this.projectId = response.data.id;
                console.log('Project creation response:', response.data);

                //saves image if there were added
                if (this.selectedImage) {
                    await this.uploadImage(response.data.id);
                }

                // Réinitialiser les champs du formulaire
                this.clearProjectFormField();
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response ? error.response.data.message : error.message;
                this.projectLoading = false;
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

        clearProjectFormField() {
            this.projectname = '';
            this.description = '';
            this.projectType = '';
            this.projectPrivacyPolicy = '';
            this.downloadUrlLink = '';
            this.start_date = '';
            this.end_date = '';
            this.budget = '';
            this.projectlogo = '';
            this.selectedImage = "";
            this.selectedImageURL = "";
            this.hideModalProject();
        },

        async uploadImage(projectId) {
            try {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const base64Image = e.target.result;
                    const token = localStorage.getItem('token');
                    // console.log('here is the project image logoId',projectId);
                    //     console.log('Base64 Image:', base64Image); // Log the base64 image data
                    const response = await axios.post(`${config.apiBaseUrl}/projects/setProjectLogo`, {
                        file: base64Image,
                        fileName: this.selectedImage.name,
                        id: projectId
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    this.successMessage = response.data.message;
                    console.log('the response is:', response.data);
                };
                reader.readAsDataURL(this.selectedImage);

            } catch (error) {
                console.error('Image upload failed:', error);
            }
        },

        projectImg(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedImage = file;
                this.selectedImageURL = URL.createObjectURL(file);
            }
        },
        updateDisplayedProjects() {
            console.log("bonjour>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("Début de updateDisplayedProjects");
            console.log("selectedEntrepriseId:", this.selectedEntrepriseId);
            console.log("projectsEntreprise:", this.projectsEntreprise);

            if (this.selectedEntrepriseId) {
                console.log("voici l'id de l'entreprise selectionnée>>>>>>>>>>>>: ");
                console.log(this.selectedEntrepriseId);
                // Filtrer les projets de l'entreprise sélectionnée
                this.displayedProjects = this.projectsEntreprise.filter(project => project.entrepriseId === this.selectedEntrepriseId);
                console.log("Projets de l'entreprise sélectionnée: £££££££££££££££££££££££ ");
                console.log(this.displayedProjects);
            } else {
                // Filtrer les projets sans entreprise
                this.displayedProjects = this.projects.filter(project => !project.entrepriseId);
                console.log("Voici les projets personnels de l'utilisateur connecté:");
                console.log(this.displayedProjects);
            }
        },
        async createNewEntreprise() {
            this.enterpriseLoading = true;
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

                // Send the logo image if the entreprise creation is successful
                if (this.selectedImage) {
                    await this.uploadLogo(response.data.id);
                }
                // Réinitialiser les champs du formulaire
                this.clearEntrepriseFormFields();
                console.log("Entreprise crée avec succes");
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response ? error.response.data.message : error.message;
                this.enterpriseLoading = false;
            }
        },

        async uploadLogo(entrepriseId) {
            try {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const base64Image = e.target.result;
                    const token = localStorage.getItem('token');
                    console.log('Base64 Image:', base64Image); // Log the base64 image data
                    await axios.post(`${config.apiBaseUrl}/entreprises/setEntrepriseLogo`, {
                        file: base64Image,
                        fileName: this.selectedImage.name,
                        id: entrepriseId
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                };
                reader.readAsDataURL(this.selectedImage);
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        },

        entrepriseImg(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedImage = file;
                this.selectedImageURL = URL.createObjectURL(file);
            }
        },

        clearEntrepriseFormFields() {
            this.name = '';
            this.description = '';
            this.email = '';
            this.phoneNumber = '';
            this.pobox = '';
            this.logoBase64 = ''; // Clear the logo field
            this.selectedImage = "";
            this.selectedImageURL = "";
            this.hideModalEntreprise(); // Close the modal if applicable
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
                const token = localStorage.getItem('token'); // or another method to retrieve the token
                // Récupérer les projets créés par l'utilisateur
                const responseCreated = await axios.get(`${config.apiBaseUrl}/projects/user/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Projets personnels de l'utilisateur:", responseCreated.data)
                // Récupérer les projets où l'utilisateur est membre
                const responseMember = await axios.get(`${config.apiBaseUrl}/team-members/user/${this.userId}/projects`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Projets dans lesquels l'utilisateur a été invité:", responseMember.data)

                // Extraire les projets invités
                const invitedProjects = responseMember.data.map(member => member.Project).filter(project => project !== null);
                console.log("Voici l'extraction des projects invités: ", invitedProjects)
                // Combiner les deux listes de projets
                this.projects = [...responseCreated.data, ...invitedProjects];
                console.log("Projets récupérés ++++++++++++++++:", this.projects);


                const savedProject = JSON.parse(localStorage.getItem('currentProject'));
                if (savedProject) {
                    this.setFirstProject(savedProject);
                    console.log("currentProject is set <><>><><><>><>><>><<>><>><><><<>><<><><>");

                } else if (this.projects.length > 0) {
                    this.setFirstProject(this.projects[0]);
                }
                // this.filterProjects();
                this.updateDisplayedProjects();
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        toggleProjectList() {
            this.isProjectListVisible = !this.isProjectListVisible;
        },

        setInitialProject() {
            const noEntrepriseProjects = this.projects.filter(project => !project.entrepriseId);
            if (noEntrepriseProjects.length > 0) {
                this.setFirstProject(noEntrepriseProjects[0]);
            } else {
                this.firstProjectName = '';
                this.firstProjectLogo = '';
            }
            this.filterProjects();

        },

        setFirstProject(project) {
            this.firstProjectName = project.projectname;
            this.firstProjectLogo = project.projectlogo; // Assuming the project object has a 'logo' property
            this.projects = this.projects.filter(p => p.id !== project.id);
            localStorage.setItem('currentProject', JSON.stringify(project));
            localStorage.setItem('projectId', project.id); // Ajouter cette ligne pour stocker l'ID du projet
        },

        filterProjects() {
            if (this.selectedEntrepriseId) {
                this.filteredProjects = this.projects.filter(project => project.entrepriseId === this.selectedEntrepriseId);
            } else {
                this.filteredProjects = this.projects.filter(project => !project.entrepriseId);
            }
        },

        selectProject(projectId) {
            const selectedProject = this.projects.find(p => p.id === projectId);
            if (selectedProject) {
                this.projects.push({
                    id: this.selectedProjectId,
                    projectname: this.firstProjectName,
                    projectlogo: this.firstProjectLogo
                });
                this.setFirstProject(selectedProject);
                this.selectedProjectId = projectId;
                console.log("Voici l'id du projet selectionné: ")
                console.log(this.selectedProjectId);
                localStorage.setItem('projectId', projectId);
                this.isProjectListVisible = false;
                window.location.reload();

            }
        },

        toggleEntrepriseList() {
            this.isEntreprisesListVisible = !this.isEntreprisesListVisible;
        },

        async fetchEntreprises() {
            try {
                const token = localStorage.getItem('token'); // or another method to retrieve the token
                const response = await axios.get(`${config.apiBaseUrl}/entreprises/user/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.entreprises = response.data;
                this.isEntreprisesListVisible = this.entreprises.length > 0;
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des entreprises : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        selectEntreprise(entrepriseId) {
            this.selectedEntrepriseId = entrepriseId;
            console.log("Entreprise sélectionnée ID:", this.selectedEntrepriseId);
            localStorage.setItem('selectedEntrepriseId', entrepriseId);
            this.updateDisplayedProjects(); // Mettre à jour les projets affichés
            const entrepriseProjects = this.displayedProjects;
            if (entrepriseProjects.length > 0) {
                this.setFirstProject(entrepriseProjects[0]);
            } else {
                this.firstProjectName = '';
                this.firstProjectLogo = '';
            }
            this.modalIdentity = false;
            window.location.reload();
        },

        accountdata() {
            this.modalModifyData = true;
            this.modalIdentity = false;
        },

        closeModifyData() {
            this.modalModifyData = false;
        },

        async fetchProjectsByEntreprise() {
            try {
                const token = localStorage.getItem('token'); // or another method to retrieve the token
                const response = await axios.get(`${config.apiBaseUrl}/projects/byEntreprise/${this.entrepriseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.projectsEntreprise = response.data;
                console.log("Projects d'entreprise méthode fetchProjectsByEntreprise :<<<<<<<<");
                console.log(this.projectsEntreprise);
                const savedProject = JSON.parse(localStorage.getItem('currentProject'));

                if (savedProject) {
                    this.setFirstProject(savedProject);
                } else if (this.projectsEntreprise.length > 0) {
                    this.setFirstProject(this.projectsEntreprise[0]);
                }
                this.updateDisplayedProjects();
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets d entreprise : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        async modifyProfile() {
            try {
                const token = localStorage.getItem('token');
                let profileImageBase64 = null;

                if (this.selectedImage) {
                    profileImageBase64 = await this.convertToBase64(this.selectedImage);
                }
                console.log(profileImageBase64);


                const imageResponse = await axios.post(`${config.apiBaseUrl}/users/setAvatar`, {
                    email: this.email,
                    file: profileImageBase64
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("the avatar is : ", imageResponse.data);


                const response = await axios.post(`${config.apiBaseUrl}/users/${this.userId}`, {
                    firstname: this.firstName,
                    lastname: this.lastName,
                    email: this.email,
                    phonenumber: this.phoneNumber,
                    password: this.password,
                    avatar: imageResponse.data
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.successMessage = response.data.message;
                console.log('Profile modified:', response.data);
            } catch (error) {
                console.error('Profile modification failed:', error);
            }
        },

        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        changeProfileImage(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedImage = file;
                this.profileImageUrl = URL.createObjectURL(file);
            }
        },

        removeProfileImage() {
            this.selectedImage = null;
            this.profileImageUrl = '';
        },

        convertToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },

        async fetchPendingTasksCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`$${config.apiBaseUrl}/tasks/${this.projectId}/tasks/pending`, {
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
                const response = await axios.get(`${config.apiBaseUrl}/tasks/${this.projectId}/tasks/in-progress`, {
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
            this.logoutLoader = true;
            try {
                // const token = localStorage.getItem('token');
                // if (token) {
                //     await axios.post(`${config.apiBaseUrl}/logout`, {}, {
                //         headers: {
                //             'Authorization': `Bearer ${token}`
                //         }
                //     });
                // }
                localStorage.clear();
                this.$router.push('/auth'); // Redirect to login page
            } catch (error) {
                console.error('Error logging out:', error);
                this.logoutLoader = true;
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