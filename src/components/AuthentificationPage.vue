<template>
    <div class="container monda-font animate__animated ">
        <authSlides/>
        
        <div class="login_section">
            <div class="formElement">
                <div class="top">
                    <div class="logoflysoft">
                        <img class="logo" src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                        <!-- <p class="text">Systeme de gestion de projet de <br> FLYSOFT ENGINEERING</p> -->
                    </div>
                </div>

                <!-- Login form -->
                <form @submit.prevent="login">
                    <div>
                        <h1 class="monda-font">Connexion</h1>
                    </div>

                    <div class="input-field">
                        <label for="email">Identifiant de connexion</label>
                        <input class="input" type="email" id="email" v-model="email" placeholder="Veuillez entrer votre E-mail" required>
                    </div>

                    <div class="input-field passf">
                        <label for="password">Mot de passe</label>
                        <input class="input" type="password" id="password" v-model="password" placeholder="Veuillez entrer un mot de passe" required>
                    </div>
                    <div class="forgotpassword">
                        <router-link to="/Forgotpassword">Mot de passe oublié?</router-link>
                    </div>

                    <button class="btn" type="submit">
                        <span>Se connecter</span>
                    </button>
                </form>

                <div class="bottom">
                    <div class="navigation">
                        <p>Pas de compte ?
                            <router-link to="/CreateAccount">Inscription</router-link>
                        </p>
                    </div>
                    <div class="privacy">
                        <p>En continuant vous agréer la
                            <router-link to="/Privacy">Politique de Confidentialité</router-link><br>
                            et les
                            <router-link to="/Privacy"> Conditions d'utilisations </router-link>
                        </p>
                    </div>
                </div>
            </div>
            <!-- </div> -->

        </div>
    </div>
</template>

<script>
import authSlides from "@/components/includ/authSlides.vue";
import config from '../config';
import axios from 'axios';

export default {
    components:{
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
                this.$router.push('/acceuilPage');
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
                console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
            }
        }
    }
};
</script>

<style scoped>
.monda-font {
    font-family: 'Monda', sans-serif;
}

body {
    /* width: 100%; */
    padding: 0;
    margin: 0;
    font-family: Monda;
}

.container {
    width: 100%;
    height: 99.8vh;
    text-align: left;
    display: flex;
}


/* .left-block, .login_section { */
/* flex: 1; */
/* position: relative;
} */

.login_section {
    margin-left: 30px;
    width: 35%;
    height: 100%;
    /* display: none; */
}

.formElement {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.logoflysoft {
    text-align: right;
    padding-right: 10%;
}

.logo {
    width: auto;
    height: auto;
}

.input-field {
    padding-bottom: 40px;
}

.passf {
    padding-bottom: 10px;
}

label {
    font-size: 1.2rem;
    padding-bottom: 8px;
    color: #202020;
}

.input {
    width: 90%;
    height: 50px;
    border: 1px solid #DFDFDF;
    border-radius: 12px;
    padding-left: 20px;
    font-size: 1.2rem;
}

.forgotpassword {
    text-align: right;
    padding-right: 8%;
}

.forgotpassword p {
    font-size: 22px;
    /* color: blue; */
}

.btn {
    background: #202020;
    border: none;
    width: 95%;
    border-radius: 12px;
    height: 50px;
}

span {
    color: #FFFFFF;
    font-size: 22px;
    text-align: center;
}

.navigation {
    text-align: center;
}

.navigation p {
    font-size: 1.2rem;
}

.privacy {
    text-align: center;
    padding-top: 0;
}

.privacy p {
    font-size: 1rem;
}
</style>