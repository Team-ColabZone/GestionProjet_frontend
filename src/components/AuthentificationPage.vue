<template>
    <div class="flex lg:flex-row h-screen">
        <!-- Auth Slide -->
        <div class="small_screens lg:w-2/3 w-full p-2 h-full lg:h-full bg-white">
            <authSlides />
        </div>

        <!-- Form Element -->
        <div class="lg:w-1/3 w-full h-full lg:h-full bg-white flex flex-col justify-between p-6">
            <div class="w-full flex justify-end text-right">
                <img class="w-24 h-24 mx-auto lg:mx-0 lg:mr-4" src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
            </div>

            <!-- Login Form -->
            <form @submit.prevent="login" class="flex flex-col gap-6">
                <h2 class="text-3xl font-bold">Connexion</h2>

                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <label for="email" class="text-gray-700">Identifiant de connexion</label>
                        <input type="email" id="email" v-model="email" placeholder="Veuillez entrer votre E-mail"
                            required class="p-4 border rounded-lg">
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="password" class="text-gray-700">Mot de passe</label>
                        <input type="password" id="password" v-model="password"
                            placeholder="Veuillez entrer un mot de passe" required class="p-4 border rounded-lg">
                        <router-link to="/Forgotpassword" class="text-blue-600 text-right text-sm">Mot de passe
                            oublié?</router-link>
                    </div>
                </div>

                <button type="submit" class="bg-black text-white py-3 rounded-lg hover:bg-gray-800">Se connecter</button>
            </form>

            <div class="text-center mt-6">
                <span class="text-gray-700">Pas de compte ? <router-link to="/CreateAccount"
                        class="text-blue-600">Inscription</router-link></span><br>
                <span class="text-gray-700">En continuant vous agréer la <router-link to="/Privacy"
                        class="text-blue-600">Politique de Confidentialité</router-link> et les <router-link
                        to="/Privacy" class="text-blue-600">Conditions d'utilisations</router-link></span>
            </div>
        </div>
    </div>
</template>

<script>
import authSlides from "@/components/includ/authSlides.vue";
import config from '../config';
import axios from 'axios';

export default {
    components: {
        authSlides
    },
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        };
    },

    methods: {
        async login() {
            try {
                // Make a POST request to the /auth/login endpoint on the local server (http://localhost:3001)
                const response = await axios.post(`${config.apiBaseUrl}/auth/login`, {
                    email: this.email,
                    password: this.password
                });
                const userData = response.data;
                localStorage.setItem('userId', userData.user_id);  // Assurez-vous que 'user_id' est correct
                localStorage.setItem('token', userData.access_token);
                localStorage.setItem('userEmail', this.email); // Stocker l'email dans le localStorage
                this.$router.push('/Home');
                console.log(userData);
                this.getUserInfo();

            } catch (error) {
                this.errorMessage = 'Échec de la connexion : ' + error.response.data.message;
                alert('Echec de la connexion');
            }
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
        }
    }
};
</script>

<style scoped>
@media (max-width: 800px) {
    .small_screens {
        display: none;
    }
}

@media (max-width: 1024px) {
    .container {
        flex-direction: column;
    }

    .formElement {
        padding: 0 5%;
    }

    .logo {
        margin-bottom: 20px;
    }

    .authSlide {
        height: 40%;
    }

    form {
        height: 60%;
    }
}
</style>