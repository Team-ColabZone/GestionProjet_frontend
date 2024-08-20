<template>
    <div class="container monda-font animate__animated ">
        <authSlides />

        <div class="formElement">
            <div class="top">
                <div class="logoflysoft">
                    <img class="logo" src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                </div>
            </div>

            <!-- Login form -->
            <form @submit.prevent="login">
                <span style="color: black; font-size: 36px; font-weight: bold;text-align: left;">Connexion</span>

                <div class="input_block">
                    <div class="input-field">
                        <label for="email">Identifiant de connexion</label>
                        <input type="email" id="email" v-model="email" placeholder="Veuillez entrer votre E-mail"
                            required>
                    </div>

                    <div class="input-field passf">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" v-model="password"
                            placeholder="Veuillez entrer un mot de passe" required>
                        <router-link to="/Forgotpassword" style="color: blue; font: .8px; text-align: right;">Mot de
                            passe oublié?</router-link>
                    </div>
                </div>

                <button class="btn" type="submit">
                    Se connecter
                </button>
            </form>

            <div class="bottom">
                <span class="navigation">Pas de compte ?
                    <router-link to="/CreateAccount"
                        style="text-decoration: none; color: blue;">Inscription</router-link>
                </span><br>
                <span class="privacy">En continuant vous agréer la
                    <router-link to="/Privacy" style="text-decoration: none; color: blue;">Politique de
                        Confidentialité</router-link><br>
                    et les
                    <router-link to="/Privacy" style="text-decoration: none; color: blue;"> Conditions d'utilisations
                    </router-link>
                </span>
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
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: Monda;
}

.container {
    width: 97%;
    height: 100%;
    padding: 1vh 2% 1vh 1%;
    text-align: left;
    display: flex;
    justify-content: space-between;
}

.formElement {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 40px;
}

.logoflysoft {
    text-align: right;
}

.logo {
    width: 100px;
    height: 100px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.input_block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* border: 1px solid teal; */
}

.input-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

label {
    font-size: 1rem;
    /* border: 1px solid red; */
    color: #202020;
}

input {
    height: 50px;
    border: 1px solid #DFDFDF;
    border-radius: 12px;
    font-size: 1rem;
    padding: 1%;
}

.btn {
    background: #202020;
    border: none;
    color: #FFFFFF;
    font-size: 22px;
    text-align: center;
    border-radius: 12px;
    height: 50px;
}

.bottom {
    text-align: center;
}

span {
    /* color: #FFFFFF; */
    font-size: 1.1rem;
    text-align: center;
    /* border: 1px solid rgb(0, 4, 255); */
}

.navigation {
    text-align: center;
}

.privacy {
    text-align: center;
}


@media only screen and (max-width:800px) {
    .container {
        width: 99%;
        height: auto;
        padding: 0;
    }

    .formElement {
        width: 100%;
        padding: 0px 3%;
    }

    span {
        font-size: .9rem;
    }
}
</style>