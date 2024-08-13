<template>
    <div class="container monda-font animate__animated ">
        <authSlides />

        <div class="formElement">
            <div class="top">
                <div class="logoflysoft">
                    <img class="logo" src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                    <!-- <p class="text">Systeme de gestion de projet de <br> FLYSOFT ENGINEERING</p> -->
                </div>
            </div>

            <!-- registration form -->
            <form @submit.prevent="createAccount">
                <span style="color: black; font-size: 1.5rem; font-weight: bold;text-align: left;">Inscription</span>

                <div class="input_block">
                    <div class="input-field">
                        <label for="firstname">Nom</label>
                        <input type="text" id="firstname" v-model="firstname" :class="inputClass(errors.firstname)"
                            @blur="validateFirstName" placeholder="Veuillez entrer votre nom" required>
                        <!-- <span v-if="errors.firstname" class="error-message">{{ errors.firstname }}</span> -->
                    </div>

                    <div class="input-field">
                        <label for="lastname">Prénom</label>
                        <input type="text" id="lastname" v-model="lastname" :class="inputClass(errors.lastname)"
                            @blur="validateLastName" placeholder="Veuillez entrer votre prénom" required>
                        <!-- <span v-if="errors.lastname" class="error-message">{{ errors.lastname }}</span> -->
                    </div>

                    <div class="input-field">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="email" :class="inputClass(errors.email)"
                            @blur="validateEmail" placeholder="Veuillez entrer votre email" required>
                        <!-- <span v-if="errors.email" class="error-message">{{ errors.email }}</span> -->
                    </div>

                    <div class="input-field">
                        <label for="phonenumber">Téléphone</label>
                        <input type="text" id="phonenumber" v-model="phonenumber"
                            :class="inputClass(errors.phonenumber)" @blur="validatePhoneNumber"
                            placeholder="Veuillez entrer contact" required>
                        <!-- <span v-if="errors.phonenumber" class="error-message">{{ errors.phonenumber }}</span> -->
                    </div>
                    <div class="input-field">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" v-model="password" :class="inputClass(errors.password)"
                            @blur="validatePassword" placeholder="Veuillez entrer un mot de passe" required>
                        <!-- <span v-if="errors.password" class="error-message">{{ errors.password }}</span> -->
                    </div>
                </div>

                <button class="btn" type="submit">
                    S'incrire
                </button>

            </form>

            <div class="bottom">
                <span class="navigation">Avez vous déja un Compte?
                    <router-link to="/auth" style="text-decoration: none; color: blue;">Connexion</router-link>
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
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
    width: 97%;
    height: 96vh;
    padding: 1vh 2% 1vh 1%;
    text-align: left;
    display: flex;
    justify-content: space-between;
}

.formElement {
    height: 100%;
    width: 35%;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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

.input_block {
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* border: 1px solid teal; */
}

.input-field {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

label {
    font-size: 1rem;
    color: #202020;
}

input {
    height: 50px;
    border: 1px solid #DFDFDF;
    border-radius: 12px;
    font-size: 1rem;
}

.input-field span {
    border: 1px solid teal;
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
}
@media only screen and (min-height:600px){
    input {
        height: 30px;
        border-radius: 12px;
        font-size: .9rem;
    }

    span {
        font-size: .9rem;
    }
}
</style>