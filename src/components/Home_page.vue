<template>
    <h1 v-if="loading2">Chargement</h1>
    <div v-else class="flex flex-col w-full h-screen  bg-white monda-font ">
        <header class="h-auto flex justify-between items-center w-full px-4 border-b border-gray-200 ">
            <img src="../assets/images/logoflysoft.png" alt="logo Entreprise" class="h-11">

            <div class="flex gap-2">
                <button class="cursor-pointer border-none bg-transparent">
                    <MessageSquare class="w-4 h-4 md:h-5 md:w-5" />
                </button>

                <button class="cursor-pointer border-none bg-transparent relative" @click="showNotifications">
                    <div class="flex">
                        <BellRing class="w-4 h-4 md:h-5 md:w-5" />
                        <span v-if="notificationCountBell > 0"
                            class="absolute top-0 left-1 md:left-2 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white p-1 text-xs">
                            {{ notificationCountBell }}
                        </span>
                    </div>
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
                        <div class="relative w-full ">
                            <button class="flex justify-between items-center w-full rounded md:gap-3"
                                :class="{ 'bg-gray-100 h-full w-full rounded-lg': currentPage === 'dashboard' }"
                                @click="showPage('dashboard')">
                                <div class="w-4/5 md:w-4/5">
                                    <div v-if="firstProjectName" class="flex items-center gap-2 md:gap-4 pr-2">
                                        <div v-if="firstProjectLogo" class="h-14">
                                            <img :src="firstProjectLogo" alt="Logo"
                                                class="h-full w-14 rounded-lg object-fit border" />
                                        </div>

                                        <div v-else class="w-auto h-auto border"
                                            :class="{ 'pl-3': currentPage === 'dashboard' }">
                                            <BriefcaseBusiness :stroke-width="1.5" class=" object-center" />
                                        </div>

                                        <div class=" flex flex-col text-left text-black text-ellipsis text-xs md:text-sm p-2"
                                            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            <h3 class="text-lg font-semibold"
                                                style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                                {{ firstProjectName }}</h3>
                                            <span
                                                style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{
                                                firstProjectDescription }}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-else class="flex items-center gap-1 py-1 px-2">
                                        <Gauge class="h-7" />
                                        <h3 class="text-black">Dashboard</h3>
                                    </div>
                                </div>

                                <button @click="toggleProjectList"
                                    class="w-1/5 bg-transparent border-none cursor-pointer border border-red-500"
                                    :class="{ 'text-black': currentPage === 'dashboard', 'text-gray-500': currentPage !== 'dashboard' }">
                                    <ChevronUp
                                        :class="{ 'chevron-down': !isProjectListVisible, 'chevron-up': isProjectListVisible }"
                                        class="w-full h-4 transition-transform" />
                                </button>
                            </button>

                            <div :class="{ block: isProjectListVisible, hidden: !isProjectListVisible }"
                                class="absolute top-full left-0 w-full flex flex-col gap-2 p-2 mt-4 bg-white shadow-sm border border-gray-300 rounded-lg z-10">
                                <!-- Projects List -->
                                <div class="h-40 w-full flex flex-col gap-1 overflow-x-auto overflow-y-auto">
                                    <div v-for="project in displayedProjects" :key="project.id"
                                        @click="selectProject(project.id)" :class="[
                                            'h-14 flex items-center border-b border-gray-50 cursor-pointer rounded-lg pr-2',
                                            { 'bg-gray-300': selectedProjectId === project.id, 'bg-gray-100': selectedProjectId !== project.id }
                                        ]">
                                        <div v-if="project.projectlogo" class="h-full w-12">
                                            <img :src="project.projectlogo" alt="Logo"
                                                class="h-full w-full border rounded-lg object-cover" />
                                        </div>
                                        <div v-else class="w-auto h-auto pl-3">
                                            <BriefcaseBusiness :stroke-width="1.5" class=" object-center" />
                                        </div>

                                        <p class="text-left text-black text-ellipsis text-xs md:text-sm p-2"
                                            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
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

                                    <!-- <button
                                        class="addProjectbtn flex justify-between items-center w-full bg-transparent border-none cursor-pointer text-xs"
                                        @click="ShowInvitation()">
                                        Nouveau projet invité
                                        <FolderGit2 class="w-4 h-4" />
                                    </button> -->
                                </div>
                            </div>
                        </div>
                    </li>


               
    <!-- Formulaire d'invitation affiché quand showInvitationForm est vrai -->
    <div v-if="showInvitationForm" class="mt-4 p-4 border rounded bg-gray-100">
      <p class="mb-2 font-bold">Inviter un membre au projet :</p>
      <input v-model="invitedEmail" type="email" placeholder="Email de l'invité"
        class="border p-2 w-full mb-2 rounded" />
      <button @click="sendInvitation" class="bg-blue-500 text-white px-4 py-2 rounded">
        Envoyer l'invitation
      </button>
    </div>



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
                                <ListTodo class="h-5" />
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
                                <Users class="h-5" />
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
                                <Building2 class="h-5" />
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
            <div class="w-full h-full lg:w-5/6 bg-white shadow-md">
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

        <div class="w-full h=full">
            <div class="fixed h-full w-full inset-0 bg-black/50 flex items-center justify-center z-50  md:pt-5 "
                v-if="modalProject">
                <div
                    class="h-full w-full bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInDown max-w-3xl overflow-y-scroll no-scrollbar">
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

            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-scroll no-scrollbar"
                v-if="modalEntreprise">
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
                                    <input type="email" id="email" v-model="email" required
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

            <div class="fixed inset-0 bg-black/50 flex items-start justify-end z-50 pt-12 px-2 md:pr-5 overflow-y-scroll no-scrollbar"
                v-if="modalIdentity">
                <div
                    class="bg-white flex flex-col p-6 gap-5 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-lg">
                    <div class="flex justify-between font-medium">
                        <span></span>
                        <!-- Displaying user's email -->
                        <span>{{ email }}</span>

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
                        <span class="font-medium text-xl">{{ lastName ? 'Bonjour ' + lastName + ' !' :
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
                                    class=" flex justify-between items-center border-b border-gray-200 py-1 pl-2 pr-5 gap-4 cursor-pointer">
                                    <div class="flex items-center  gap-4" @click="selectEntreprise(entreprise.id)">
                                        <div class="w-10 h-10 ">
                                            <img class="border w-10 h-10 border-gray-200 rounded-full"
                                                :src="entreprise.logo" alt="logo Entreprise" />
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="font-medium truncate">{{ entreprise.name }}</span>
                                            <span class="text-xs">{{ entreprise.email }}</span>
                                        </div>
                                    </div>

                                    <div v-if="entreprise.id === selectedEntrepriseId"
                                        class=" w-auto h-full hover:bg-blue-100 px-1 flex justify-between items-center rounded-xl"
                                        @click="exitEnterprise">
                                        <LogOut class="w-full" />
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

            <div class="fixed inset-0 backdrop-blur-sm flex justify-end z-50 overflow-y-scroll no-scrollbar"
                v-if="modalModifyData">
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

            <div class="fixed inset-0 bg-black/50 flex items-start justify-end z-50 pt-12 px-2 md:pr-5 overflow-y-scroll no-scrollbar"
                v-if="notificationModal">
                <div
                    class="bg-white flex flex-col py-6 gap-2 rounded-lg shadow-lg animate__animated animate__fadeInDown w-full max-w-sm ">
                    <div class="flex justify-between border-b-2 border-b-gray-100">
                        <div class="px-6">
                            <h5 class="font-semibold text-xl pb-2">Notification(s)</h5>
                            <div class="flex gap-2">
                                <!-- :class="{ 'bg-gray-100 h-full w-full rounded-lg': currentPage === 'dashboard' }"
                                @click="showPage('dashboard') -->
                                <button @click="showNotifications('unread')"
                                    :class="{ 'border-blue-300': selectedTab === 'unread', 'border': selectedTab === 'unread', 'hover:text-blue-500': true, 'rounded-t-md': true, 'px-2': true }">
                                    Non lus ( {{ notificationCount }} )
                                </button>

                                <button @click="showNotifications('all')"
                                    :class="{ 'border-blue-300': selectedTab === 'all', 'border': selectedTab === 'all', 'hover:text-blue-500': true, 'rounded-t-md': true, 'px-2': true }">
                                    Tout
                                </button>
                            </div>
                        </div>

                        <button @click="closeNotificationModal" class="self-start pr-2">
                            <span class="text-black text-3xl">×</span>
                        </button>
                    </div>

                    <div class="max-h-96 overflow-y-auto">
                        <div v-if="selectedTab === 'unread'">
                            <div v-if="notifications.length > 0">
                                <div v-for="notification in notifications" :key="notification.id"
                                    @click="readNotification(notification)">
                                    <div v-if="notification.type === 'Projet'"
                                        class="flex gap-2 pl-5 pr-1 pb-1 items-center border-b-2 border-b-gray-200">
                                        <div>
                                            <div v-if="notification.projectImg" class="w-14 h-14">
                                                <img :src="notification.projectImg" alt="logo"
                                                    class="w-full h-full rounded-full border object-cover object-center">
                                            </div>
                                            <div v-else class="w-8 h-8 ">
                                                <BriefcaseBusiness :stroke-width="1.5"
                                                    class=" w-full h-full object-center" />
                                            </div>
                                        </div>
                                        <div>
                                            <p>Vous avez cree le projet {{ notification.projectName }}</p>
                                            <span class="px-2 pb-1 bg-gray-200 rounded-xl">
                                                Plus ...
                                            </span>
                                        </div>
                                    </div>
                                    <div v-else-if="notification.type === 'Tasks'"
                                        class="flex gap-2 pl-5 items-center pb-1 border-b-2 border-b-gray-200">
                                        <ListTodo class="w-8 h-8 md:w-11 md:h-11" />
                                        <div class="flex flex-col">
                                            <p>Une tache vous as été affecté sur le projet {{ notification.tasksName }}
                                            </p>
                                        </div>
                                    </div>
                                    <div v-else-if="notification.type === 'Team-Members'"
                                        class="flex gap-2 pl-5 items-center pb-1 border-b-2 border-b-gray-200">
                                        <div>
                                            <div v-if="notification.projectImg" class="w-14 h-14">
                                                <img :src="notification.projectImg" alt="logo"
                                                    class="w-full h-full rounded-full border object-cover object-center">
                                            </div>
                                            <div v-else class="w-8 h-8 ">
                                                <BriefcaseBusiness :stroke-width="1.5"
                                                    class=" w-full h-full object-center" />
                                            </div>
                                        </div>
                                        <div>
                                            <p>Bienvenue sur le projet {{ notification.projectName }}</p>
                                            <!-- <p>Vous avez été ajouté au projet {{ notification.projectName }} par {{ notification.nameSender }} en temp que {{ notification.roleName }}</p> -->
                                            <span class="px-2 pb-1 bg-gray-200 rounded-xl">Plus ...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <span class="pl-4">Vous avez aucune nouvelle notification</span>
                            </div>
                        </div>

                        <div v-if="selectedTab === 'all'">
                            <div v-if="notifications.length === 0">
                                <span class="pl-4">Vous n'avez pas encore de notification</span>
                            </div>

                            <div v-else>
                                <div v-for="notification in notifications" :key="notification.id">
                                    <div v-if="notification.type === 'Projet'"
                                        class="flex gap-2 pl-5 pr-1 pb-1 items-center border-b-2 border-b-gray-200">
                                        <div>
                                            <div v-if="notification.projectImg" class="w-14 h-14">
                                                <img :src="notification.projectImg" alt="logo"
                                                    class="w-full h-full rounded-full border object-cover object-center">
                                            </div>
                                            <div v-else class="w-8 h-8 ">
                                                <BriefcaseBusiness :stroke-width="1.5"
                                                    class=" w-full h-full object-center" />
                                            </div>
                                        </div>
                                        <div>
                                            <p>Vous avez été ajouté au projet {{ notification.projectName }} par {{
                                                notification.nameSender }}</p>
                                            <span class="px-2 pb-1 bg-gray-200 rounded-xl">Plus ...</span>
                                        </div>
                                    </div>
                                    <div v-else-if="notification.type === 'Tasks'"
                                        class="flex gap-2 pl-5 items-center pb-1 border-b-2 border-b-gray-200">
                                        <ListTodo class="w-8 h-8 md:w-11 md:h-11" />
                                        <div class="flex flex-col">
                                            <p>Une tache vous as été affecté sur le projet {{ notification.tasksName }}
                                            </p>
                                        </div>
                                    </div>
                                    <div v-else-if="notification.type === 'Team-Members'"
                                        class="flex gap-2 pl-5 items-center pb-1 border-b-2 border-b-gray-200">
                                        <div>
                                            <div v-if="notification.projectImg" class="w-14 h-14">
                                                <img :src="notification.projectImg" alt="logo"
                                                    class="w-full h-full rounded-full border object-cover object-center">
                                            </div>
                                            <div v-else class="w-8 h-8 ">
                                                <BriefcaseBusiness :stroke-width="1.5"
                                                    class=" w-full h-full object-center" />
                                            </div>
                                        </div>
                                        <div>
                                            <p>Bienvenue sur le projet {{ notification.projectName }}</p>
                                            <!-- <p>Vous avez été ajouté au projet {{ notification.projectName }} par {{ notification.nameSender }} en temp que {{ notification.roleName }}</p> -->
                                            <span class="px-2 pb-1 bg-gray-200 rounded-xl">Plus ...</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <p>Unknown notification type: {{ notification.type }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="fixed inset-0 backdrop-blur-sm flex justify-end z-50 overflow-y-scroll no-scrollbar"
                v-if="modalModifyData">
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
            </div> -->

            <div
                class="fixed w-full h-full bg-black/50 flex items-start justify-end z-50 pt-12 px-2 md:pr-5 overflow-y-scroll no-scrollbar">
                asd</div>
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
import { EventBus } from "../eventBus";
// import { format } from 'date-fns';


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
            notificationModal: false,
            enterpriseLoading: false,
            projectLoading: false,
            logoutLoader: false,
            currentPage: 'backlogs',
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
            loading2: false,

            userId: '',
            projects: [], // Liste des projets
            firstProjectName: '',
            firstProjectLogo: '',
            firstProjectDescription: '',
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
            // projectsEntreprise: [],
            projectlogo: '',

            notificationCount: 0,
            notificationCountBell: 0,
            notifications: [],
            selectedTab: 'unread',
            displayNotifications: false,
            displayUnreadNotifications: false,
        };
    },

    mounted() {
        this.mountedData();
    },

    methods: {
        mountedData() {
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
                // this.fetchProjectsByEntreprise();
                this.fetchNotificationCount();
                this.fetchAllNotifications();
            } else {
                this.errorMessage = 'Utilisateur non connecté';
                this.$router.push('/auth'); // Rediriger vers la page de connexion
            }
            this.handleResize();
            window.addEventListener("resize", this.handleResize);
        },
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
            this.showIdentity();
        },
        showIdentity() {
            this.modalIdentity = true;
        },
        exitEnterprise() {
            if (localStorage.getItem('selectedEntrepriseId')) {
                localStorage.removeItem('selectedEntrepriseId');
                localStorage.removeItem('currentProject');
                localStorage.removeItem('projectId');
                this.mountedData();
                this.modalIdentity = false;
            }
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

        showNotifications(notif) {
            this.notificationModal = true;
            this.selectedTab = notif;
            this.viewTypeOfNotifications();
            this.notificationCountBell = 0;
        },
        closeNotificationModal() {
            this.notificationModal = false;
        },

        accountdata() {
            this.modalModifyData = true;
        },
        closeModifyData() {
            this.modalModifyData = false;
        },

        toggleProjectList() {
            this.isProjectListVisible = !this.isProjectListVisible;
        },

        toggleEntrepriseList() {
            this.isEntreprisesListVisible = !this.isEntreprisesListVisible;
        },

        viewTypeOfNotifications() {
            if (this.selectedTab === 'all') {
                this.displayAllNotifications = true;
                this.displayUnreadNotifications = false;
                this.fetchAllNotifications();
            } else {
                this.displayUnreadNotifications = true;
                this.displayAllNotifications = false;
                this.fetchUnreadNotifications();
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

        formatDateToSlash(dateStr) {
                if (!dateStr) return '';
                const [year, month, day] = dateStr.split('-');
                return `${day}/${month}/${year}`;
            },

        async createNewProject() {
              console.log("here is the start date", this.start_date),
              console.log("here is the end date", this.end_date),

            this.projectLoading = true;
            if (localStorage.getItem('selectedEntrepriseId')) {
            try {
                    const token = localStorage.getItem('token');
                    const entrepriseId = localStorage.getItem('selectedEntrepriseId')
                    console.log("Payload envoyé :", {
                            start_date: this.start_date,
                            end_date: this.end_date
                        });
              

                    const response = await axios.post(`${config.apiBaseUrl}/projects`, {
                        projectname: this.projectname,
                        description: this.description,
                        start_date: this.formatDateToSlash(this.start_date),
                        end_date: this.formatDateToSlash(this.end_date),
                        budget: this.budget,
                        entrepriseId: `${entrepriseId}`,
                        projectType: this.projectType,
                        projectPrivacyPolicy: this.projectPrivacyPolicy,
                        downloadUrlLink: this.downloadUrlLink,
                        // userId: this.userId,
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
                    const userId = response.data?.project?.userId;
                    console.log("UserId recu du backend", userId);
                    //saves image if there were added
                    console.log("??????????????????????", entrepriseId);

                    console.log("here is the project id logo before the If", response.data.id);
                    if (this.selectedImage) {
                        console.log("here is the project id logo before uploding", response.data.id);
                        await this.uploadImage(response.data.id);
                    }
                    this.fetchProjects();
                    console.log(this.projects)
                    this.clearProjectFormField();
                } catch (error) {
                    this.error = true;
                    this.errorMessage = error.response ? error.response.data.message : error.message;
                    console.log("here is the project error", error);

                    this.projectLoading = false;
                }
            } else {
                try {
                    const token = localStorage.getItem('token');
                    // const entrepriseId = localStorage.getItem('entrepriseId')
                    const response = await axios.post(`${config.apiBaseUrl}/projects`, {
                        projectname: this.projectname,
                        description: this.description,
                        start_date: this.formatDateToSlash(this.start_date),
                        end_date: this.formatDateToSlash(this.end_date),
                        budget: this.budget,
                        // entrepriseId: `${entrepriseId}`,
                        projectType: this.projectType,
                        projectPrivacyPolicy: this.projectPrivacyPolicy,
                        downloadUrlLink: this.downloadUrlLink,
                        // userId: this.userId,
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
                    // console.log("??????????????????????", entrepriseId);

                    console.log("here is the project id logo before the If", response.data.id);
                    if (this.selectedImage) {
                        console.log("here is the project id logo before uploding", response.data.id);
                        await this.uploadImage(response.data.id);
                    }
                    this.fetchProjects();
                    // window.location.reload();
                    this.clearProjectFormField();
                } catch (error) {
                    this.error = true;
                    this.errorMessage = error.response ? error.response.data.message : error.message;
                    console.log("here is the project error", error);

                    this.projectLoading = false;
                }
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
            console.log("here is the project id logo on entering the upload", projectId);
            try {
                const reader = new FileReader();
                console.log("here is the project id logo in the try", projectId);
                reader.onload = async (e) => {
                    const base64Image = e.target.result;
                    const token = localStorage.getItem('token');
                    console.log('here is the project image logoId', projectId);
                    console.log('Base64 Image:', base64Image); // Log the base64 image data
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
                this.fetchEntreprises();
                this.success = true;
                this.successMessage = response.data.message;

                // Send the logo image if the entreprise creation is successful
                if (this.selectedImage) {
                    await this.uploadLogo(response.data.id);
                }
                this.fetchEntreprises();
                if (this.currentPage === 'entreprise') {
                    EventBus.emit('setFirstProject5');
                }
                // Réinitialiser les champs du formulaire
                this.clearEntrepriseFormFields();
                this.enterpriseLoading = false;
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


        async fetchProjects() {
            try {
                const token = localStorage.getItem('token'); // or another method to retrieve the token
                const entrepriseId = localStorage.getItem('selectedEntrepriseId');

                if (entrepriseId) {
                    // Fetch projects by enterprise
                    const response = await axios.get(`${config.apiBaseUrl}/projects/entreprise/${entrepriseId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    this.projects = response.data;
                    console.log("Projects d'entreprise méthode fetchProjectsByEntreprise :>>>><<<<<<<<");
                    console.log(this.projects);

                    const savedProject = JSON.parse(localStorage.getItem('currentProject'));
                    console.log("savedProject isssssssss", savedProject);

                    if (savedProject) {
                        this.setFirstProject(savedProject);
                    } else if (this.projects.length > 0) {
                        this.setFirstProject(this.projects[0]);
                    }
                    // this.filterProjects();
                    this.updateDisplayedProjects();
                } else {
                    // Fetch user projects
                    const responseCreated = await axios.get(`${config.apiBaseUrl}/projects/allProjByNoEnt/${this.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Projets personnels de l'utilisateur:", responseCreated.data);

                    this.projects = responseCreated.data;
                    console.log("Projets récupérés ++++++++++++++++: ", this.projects);

                    const savedProject = JSON.parse(localStorage.getItem('currentProject'));
                    console.log("savedProject isssssssss", savedProject);

                    if (savedProject) {
                        this.setFirstProject(savedProject);
                        console.log("currentProject is set <><><>>>><><><<>><><>>><><><>>><><><><><>>");
                    } else if (this.projects.length > 0) {
                        this.setFirstProject(this.projects[0]);
                    }
                    // this.filterProjects();
                    this.updateDisplayedProjects();
                }
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des projets : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        setFirstProject(project) {
            this.firstProjectName = project.projectname;
            this.firstProjectLogo = project.projectlogo; // Assuming the project object has a 'logo' property
            this.firstProjectDescription = project.description;

            const entrepriseId = localStorage.getItem('selectedEntrepriseId');
            if (entrepriseId) {
                this.projects = this.projects.filter(p => p.id !== project.id);
                localStorage.setItem('currentProject', JSON.stringify(project));
                localStorage.setItem('projectId', project.id);
            } else {
                this.projects = this.projects.filter(p => p.id !== project.id);
                localStorage.setItem('currentProject', JSON.stringify(project));
                localStorage.setItem('projectId', project.id); // Ajouter cette ligne pour stocker l'ID du projet
            }
            if (this.currentPage === 'dashboard') {
                EventBus.emit('setFirstProject1');
            } else if (this.currentPage === 'backlogs') {
                EventBus.emit('setFirstProject2');
            } else if (this.currentPage === 'tasks') {
                EventBus.emit('setFirstProject3');
            } else if (this.currentPage === 'team') {
                EventBus.emit('setFirstProject4');
            } else if (this.currentPage === 'entreprise') {
                EventBus.emit('setFirstProject5');
            }
        },

        selectProject(projectId) {
            const selectedProject = this.projects.find(p => p.id === projectId);
            if (selectedProject) {
                this.projects.push({
                    id: this.selectedProjectId,
                    projectname: this.firstProjectName,
                    projectlogo: this.firstProjectLogo,
                    projectDescription: this.projectDescription,
                });
                this.setFirstProject(selectedProject);
                this.selectedProjectId = projectId;
                console.log("Voici l'id du projet selectionné: ")
                console.log(this.selectedProjectId);
                localStorage.setItem('projectId', projectId);
                this.isProjectListVisible = false;
                this.mountedData();
                console.log("99999999999999999999999999999999999999999");

                console.log("5555555555555555555555555555555555555555");

            }
        },

        updateDisplayedProjects() {
            console.log("bonjour>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("Début de updateDisplayedProjects");
            // console.log("selectedEntrepriseId:", this.selectedEntrepriseId);
            // console.log("projectsEntrepriseses:", this.projectsEntreprise);
            const entrepriseId = localStorage.getItem('selectedEntrepriseId');

            if (entrepriseId) {
                console.log("voici l'id de l'entreprise selectionnée>>>>>>>>>>>>: ", entrepriseId);
                console.log(this.selectedEntrepriseId);
                // Filtrer les projets de l'entreprise sélectionnée
                this.displayedProjects = this.projects.filter(project => project.entrepriseId === this.selectedEntrepriseId);
                console.log("Projets de l'entreprise sélectionnée: **************** ");
                console.log(this.displayedProjects);
            } else {
                // Filtrer les projets sans entreprise
                this.displayedProjects = this.projects.filter(project => !project.entrepriseId);
                console.log("Voici les projets personnels de l'utilisateur connecté: £££££££££££££££££££££££ ");
                console.log(this.displayedProjects);
            }
        },

        async fetchEntreprises() {
            try {
                const token = localStorage.getItem('token'); // or another method to retrieve the token
                const response = await axios.get(`${config.apiBaseUrl}/entreprises/user/${this.userId}`, {


                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log({ 'yooooooolooooolllllll': this.userId });
                this.entreprises = response.data;
                this.isEntreprisesListVisible = this.entreprises.length > 0;
                console.log("yooooooooooooooooooooooooooyyyyyyyyyyyyy", this.entreprises);

            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération des entreprises : ' + (error.response ? error.response.data.message : error.message);
            }
        },

        selectEntreprise(entrepriseId) {
            this.loading2 = true;
            this.selectedEntrepriseId = entrepriseId;
            localStorage.removeItem('currentProject');
            localStorage.removeItem('projectId');
            console.log("Entreprise sélectionnée ID:", this.selectedEntrepriseId);
            localStorage.setItem('selectedEntrepriseId', entrepriseId);
            this.updateDisplayedProjects(); // Mettre à jour les projets affichés
            const entrepriseProjects = this.displayedProjects;
            if (entrepriseProjects.length > 0) {
                this.mountedData();
                this.setFirstProject(entrepriseProjects[0]);
                this.modalIdentity = false;
                this.loading2 = false;
            } else {
                this.mountedData();
                this.firstProjectName = '';
                this.firstProjectLogo = '';
                this.firstProjectDescription = '';
                this.modalIdentity = false;
                this.loading2 = false;
            }



            // window.location.reload();
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


                const response = await axios.patch(`${config.apiBaseUrl}/users/${this.userId}`, {
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
                this.closeModifyData();
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


        async fetchNotificationCount() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/notifications/allNotByUserIdStatuscount/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.notificationCount = response.data;
                this.notificationCountBell = this.notificationCount;
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response.data);
            } catch (error) {
                console.error('Error fetching notification count:', error);
            }
        },
        async fetchAllNotifications() {
            try {
                this.selectedTab = 'all';
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/notifications/allNotByUserId/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response.data);

                this.notifications = response.data
                console.log("11111111111111111111111111", this.notifications);
            } catch (error) {
                console.error('Error fetching all notifications:', error);
            }
        },
        async fetchUnreadNotifications() {
            try {
                this.selectedTab = 'unread';
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiBaseUrl}/notifications/allNotByUserIdStatus/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response.data);
                this.notifications = response.data
            } catch (error) {
                console.error('Error fetching unread notifications:', error);
            }
        },

        async readNotification(notification) {
            this.selectedNotificationId = notification.id;
            console.log("here is the notifId", this.selectedNotificationId);
            try {
                // this.selectedTab = 'unread';
                const token = localStorage.getItem('token');
                // notification.
                const response = await axios.patch(`${config.apiBaseUrl}/notifications/updateNotStatus/${this.selectedNotificationId}`, {
                    status: "true",
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("sends the notif enpoint stop modify this", response.data);
                this.fetchUnreadNotifications();
                this.fetchNotificationCount();
                this.notifications = response.data;
            } catch (error) {
                console.error('Error fetching unread notifications:', error);
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