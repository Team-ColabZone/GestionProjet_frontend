<template>
    <div class="flex h-screen">
        <!-- Auth Slide -->
        <div class="small_screens w-full h-full p-2 lg:w-2/3 bg-white flex items-center justify-center">
            <authSlides />
        </div>

        <!-- Registration Form -->
        <div class="w-full h-full lg:w-1/3 bg-white p-6 flex flex-col justify-between">
            <div class="h-full flex flex-col justify-between">
                <div class="text-right">
                    <img class="w-24 h-24" src="../assets/images/logoflysoft.png" alt="logo Entreprise" />
                </div>

                <!-- Registration Form -->
                <form @submit.prevent="createAccount" class="w-full flex flex-col gap-4">
                    <h2 class="text-2xl font-bold">Inscription</h2>

                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <label for="firstname" class="text-black">Nom</label>
                            <input type="text" id="firstname" v-model="firstname" :class="inputClass(errors.firstname)"
                                @blur="validateFirstName" placeholder="Veuillez entrer votre nom" required
                                class="p-4 border rounded-lg">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="lastname" class="text-black">Prénom</label>
                            <input type="text" id="lastname" v-model="lastname" :class="inputClass(errors.lastname)"
                                @blur="validateLastName" placeholder="Veuillez entrer votre prénom" required
                                class="p-4 border rounded-lg">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="email" class="text-black">Email</label>
                            <input type="email" id="email" v-model="email" :class="inputClass(errors.email)"
                                @blur="validateEmail" placeholder="Veuillez entrer votre email" required
                                class="p-4 border rounded-lg">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="phonenumber" class="text-black">Téléphone</label>
                            <input type="text" id="phonenumber" v-model="phonenumber"
                                :class="inputClass(errors.phonenumber)" @blur="validatePhoneNumber"
                                placeholder="Veuillez entrer contact" required class="p-4 border rounded-lg">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="password" class="text-black">Mot de passe</label>
                            <input type="password" id="password" v-model="password" :class="inputClass(errors.password)"
                                @blur="validatePassword" placeholder="Veuillez entrer un mot de passe" required
                                class="p-4 border rounded-lg">
                        </div>
                    </div>

                    <button type="submit"
                        class="bg-black hover:bg-gray-800 text-white py-3 rounded-lg">S'inscrire</button>
                </form>

                <div class="text-center">
                    <span class="block text-black">Avez-vous déjà un Compte? <router-link to="/auth"
                        class="text-blue-600">Connexion</router-link>
                    </span>
                    <span class="block text-black">En continuant vous agréer la <router-link to="/Privacy"
                        class="text-blue-600">Politique de Confidentialité</router-link> et les <router-link
                        to="/Privacy" class="text-blue-600">Conditions d'utilisations</router-link>
                    </span>
                </div>
            </div>

            <!-- Success and Error Messages -->
            <div v-if="successMessage" class="text-green-600 text-center mt-4">{{ successMessage }}</div>
            <div v-if="errorMessage" class="text-red-600 text-center mt-4">{{ errorMessage }}</div>
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
        padding: 0 3%;
    }
}

@media (min-height: 600px) {
    input {
        height: 40px;
        font-size: 0.9rem;
    }

    .btn {
        font-size: 1.2rem;
    }
}
</style>