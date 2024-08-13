<template>
    <div class="container monda-font animate__animated ">
        <authSlides />

        <div class="signup_section">
            <div class="formElement">
                <div class="top">
                    <div class="logoflysoft">
                        <img class="logo" src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                        <!-- <p class="text">Systeme de gestion de projet de <br> FLYSOFT ENGINEERING</p> -->
                    </div>
                </div>
                
                <!-- registration form -->
                <form @submit.prevent="createAccount">
                    <div>
                        <h1 class="monda-font">Inscription</h1>
                    </div>

                    <div class="input-field">
                        <label for="firstname">Nom</label>
                        <input type="text" id="firstname" v-model="firstname" :class="inputClass(errors.firstname)"
                            @blur="validateFirstName" placeholder="Veuillez entrer votre nom" required>
                        <span v-if="errors.firstname" class="error-message">{{ errors.firstname }}</span>
                    </div>

                    <div class="input-field">
                        <label for="lastname">Prénom</label>
                        <input type="text" id="lastname" v-model="lastname" :class="inputClass(errors.lastname)"
                            @blur="validateLastName" placeholder="Veuillez entrer votre prénom" required>
                        <span v-if="errors.lastname" class="error-message">{{ errors.lastname }}</span>
                    </div>

                    <div class="input-field">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="email" :class="inputClass(errors.email)"
                            @blur="validateEmail" placeholder="Veuillez entrer votre email" required>
                        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                    </div>

                    <div class="input-field">
                        <label for="phonenumber">Téléphone</label>
                        <input type="text" id="phonenumber" v-model="phonenumber"
                            :class="inputClass(errors.phonenumber)" @blur="validatePhoneNumber"
                            placeholder="Veuillez entrer contact" required>
                        <span v-if="errors.phonenumber" class="error-message">{{ errors.phonenumber }}</span>
                    </div>
                    <div class="input-field">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" v-model="password" :class="inputClass(errors.password)"
                            @blur="validatePassword" placeholder="Veuillez entrer un mot de passe" required>
                        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
                    </div>

                    <button class="btn" type="submit">
                        <span>S'incrire</span>
                    </button>

                </form>

                <div class="bottom">
                    <div class="navigation">
                        <p>Avez vous déja un Compte?
                            <router-link to="/auth">Connexion</router-link>
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

        </div>
        <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div> -->
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
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            password: '',
            errors: {
                firstname: null,
                lastname: null,
                email: null,
                phonenumber: null,
                password: null,
            },
            // successMessage: '',
            // errorMessage: ''
        };
    },

    methods: {
        inputClass(error) {
            if (error === null) {
                return ''; // No class applied initially
            } else if (error === '') {
                return 'input-success'; // Green border for valid input
            } else {
                return 'input-error'; // Red border for invalid input
            }
        },
        validateFirstName() {
            const nameRegex = /^[a-zA-Z\s]{3,}$/;
            if (!this.firstname.match(nameRegex)) {
                this.errors.firstname = "Le nom ne doit contenir que des lettres.";
            } else {
                this.errors.firstname = '';
            }
        },
        validateLastName() {
            const nameRegex = /^[a-zA-Z\s]{3,}$/;
            if (!this.lastname.match(nameRegex)) {
                this.errors.lastname = "Le prénom ne doit contenir que des lettres.";
            } else {
                this.errors.lastname = '';
            }
        },
        validateEmail() {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|co|io|ai|in|uk|ca|us)$/;
            if (!this.email.match(emailRegex)) {
                this.errors.email = "Veuillez entrer une adresse e-mail valide.";
            } else {
                this.errors.email = '';
            }
        },
        validatePhoneNumber() {
            const phoneRegex = /^\d{8,15}$/;
            if (!this.phonenumber.match(phoneRegex)) {
                this.errors.phonenumber = "Le numéro de téléphone doit contenir 10 chiffres.";
            } else {
                this.errors.phonenumber = '';
            }
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!this.password.match(passwordRegex)) {
                this.errors.password = "Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre.";
            } else {
                this.errors.password = '';
            }
        },
        async createAccount() {
            this.validateFirstName();
            this.validateLastName();
            this.validateEmail();
            this.validatePhoneNumber();
            this.validatePassword();

            if (Object.values(this.errors).every((error) => error === '')) {
                try {
                    const response = await axios.post(`${config.apiBaseUrl}/users`, {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        email: this.email,
                        phonenumber: this.phonenumber,
                        password: this.password,
                    });
                    console.log('Account created:', response.data);
                    this.$router.push('/auth');
                } catch (error) {
                    console.error('Error creating account:', error);
                }
            }
        },
        resetForm() {
            this.firstname = '';
            this.lastname = '';
            this.email = '';
            this.phonenumber = '';
            this.password = '';
            this.successMessage = '';
            this.errorMessage = '';
        }
    }
};
</script>

<style scoped>
body {
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: Monda;
}

p {
    padding-bottom: 10px;
    padding-top: 0px;
}

.input-error {
    border: 1px solid red;
}

.input-success {
    border: 1px solid green;
}

.error-message {
    color: red;
    font-size: 12px;
}

.monda-font {
    font-family: 'Monda', sans-serif;
}

.container {
    /* margin: 0;
    padding: 0; */
    text-align: left;
    width: 100%;
    height: 98vh;
    display: flex;
    overflow-y: auto;
    font-family: Monda;
    /* margin-left: 10px;
    margin-right: 10px; */
}

.signup_section {
    margin-left: 30px;
    width: 35%;
    height: 100%;
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
    width: 84px;
    height: 80px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #202020;
}

.input-field {
    display: flex;
    flex-direction: column;
}

label {
    font-size: 1.2rem;
    color: #202020;
}

input {
    width: 90%;
    height: 50px;
    font-size: 1.2rem;
    border: 1px solid #DFDFDF;
    border-radius: 12px;
    padding-left: 20px;
}

.btn {
    /* margin-top: 20px; */
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
}

.privacy p {
    font-size: 1rem;
}
</style>