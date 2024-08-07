<template>
    <div class="container monda-font animate__animated animate__fadeInDown">
        <div class="signup1">
            <div class="overlay"></div>
            <img class="img1" src="../assets/signin_image4.jpg" alt="image page d'inscription" />
            <div class="text-overlay">
                <p class="text1">CollabZone,<br>
                     <i>Créez votre compte maintenant et commencez à gérer vos projets de manière professionnelle !</i>
                </p>
               
                <div class="footerImage">
                    <p class="p1">Cameroun,Yaoundé</p>
                    <p class="p2">+237 693 32 53 31</p>
                    <p class="p3">www.flysoft-eng.com</p>
                </div>
            </div>
        </div>
        <div class="signup2">
            <div class="formElement">
                <div class="logoflysoft">
                    <img class="logo" src="../assets/logoflysoft.png" alt="logo Entreprise" />
                    <!-- <p class="text">Systeme de gestion de projet de <br> FLYSOFT ENGINEERING</p> -->
                </div>
                <div class="title">
                    <h1 class="monda-font">Inscription</h1>
                </div>
                <!-- <div class="form"> -->
                <form @submit.prevent="createAccount">

                    <div class="input-field">
                        <div class="inp"> <label for="lastname">Nom</label></div>
                        <input class="input" type="text" id="lastname" v-model="lastname" required
                            placeholder="Veuillez entrer votre nom">
                    </div>

                    <div class="input-field">
                        <div class="inp"> <label for="firstname">Prénom</label></div>
                        <input class="input" type="text" id="firstname" v-model="firstname" required
                            placeholder="Veuillez entrer votre prénom">
                    </div>

                    <div class="input-field">
                        <div class="inp"> <label for="email">Email</label></div>
                        <input class="input" type="email" id="email" v-model="email" required
                            placeholder="Veuillez entrer votre email">
                    </div>

                    <div class="input-field">
                        <div class="inp"> <label for="phonenumber">Téléphone</label></div>
                        <input class="input" type="text" id="phonenumber" v-model="phonenumber" required
                            placeholder="Veuillez entrer contact">
                    </div>
                    <div class="input-field">
                        <div class="inp"> <label for="password">Mot de passe</label></div>
                        <input class="input" type="password" id="password" v-model="password" required
                            placeholder="Veuillez entrer un mot de passe">
                    </div>


                    <div class="btn1">
                        <button class="btn" type="submit">
                            <span>S'incrire</span>
                        </button>
                    </div>
                    <div class="navigation">
                        <p>Avez vous déja un Compte?<router-link to="/auth">Connexion</router-link></p>
                    </div>
                    <div class="privacy">
                        <p>En continuant vous agréer la <router-link to="/Privacy">Politique de Confidentialité</router-link><br> et les <router-link to="/Privacy"> Conditions d'utilisations </router-link> </p>
                    </div>
                </form>
            </div>
            <!-- </div> -->

        </div>
        <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div> -->
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            lastname: '',
            firstname: '',
            email: '',
            phonenumber: '',
            password: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    methods: {
        async createAccount() {
            try {
                await axios.post('http://localhost:3001/users', {
                    lastname: this.lastname,
                    firstname: this.firstname,
                    email: this.email,
                    phonenumber: this.phonenumber,
                    password: this.password
                });
                this.successMessage = 'Inscription réussie !';
                alert('Compte crée avec Success');
                this.resetForm();
            } catch (error) {
                this.errorMessage = 'Échec de l\'inscription : ' + error.response.data.message;
                alert('Echec lors de la création du compte')
            }
        },
        resetForm() {
            this.lastname = '';
            this.firstname = '';
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
/* * {
margin: 0;
padding: 0;
box-sizing: border-box;
} */
h1 {
    font-size: 50px;
    font-weight: bold;
    color: #202020;
}

.title {
    padding-bottom: 20px;
}

p {
    padding-bottom: 10px;
    padding-top: 0px;
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


body {
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: Monda;
}

.img1 {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.logo {
    width: 84px;
    height: 80px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 1;
}

.input-field {
    padding-bottom: 20px;
}

.signup1,
.signup2 {
    /* flex: 1; */
    position: relative;
}

.signup1 {
    margin-right: 40px;
    width: 65%;
   

}

.signup2 {
    margin-left: 30px;
    width: 30%;
    

}

input {
    width: 90%;
    height: 50px;
}

.logoflysoft {
    padding-bottom: 0px;
    text-align: right;
    padding-right: 10%;
}

.monda-font {
    font-family: 'Monda', sans-serif;
}

.input {
    height: 50px;
    border: 1px solid #DFDFDF;
    border-radius: 12px;
    padding-left: 20px;
    width: 90%;
    font-size: 25px; 
}

label {
    font-weight: 500;
    font-size: 20px;
    color: #202020;
}


.btn {
    margin-top: 20px;
    background: #202020;
    border: none;
    width: 95%;
    border-radius: 12px;
    height: 50px;
}

.btn1 {
    padding-top: 1%;
}

span {
    color: #FFFFFF;
    font-size: 22px;
    text-align: center;
}

.inp {
    padding-bottom: 8px;
}

.text-overlay {
    position: absolute;
    bottom: 40px;
    left: 28%;
    right: 2%;
    transform: translateX(-50%);
    color: white;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    z-index: 2;
}

.text-overlay i {
    font-size: 19px;
   
    text-align: left;
}

.text1 {
    padding-left: 18%;
    text-align: left;
}

.footerImage {
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.2);
    height: 70px;
    width: 120% !important;
    border-radius: 15px;
    padding-left: 40px;
    padding-right: 40px;
    bottom: 2%;
    margin-left: 18% !important;
    margin-bottom: 1%;
}

.footerImage p {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
}

.navigation {
    text-align: center;
   
}

.navigation p {
    font-size: 22px;
}
.privacy{
    text-align: center;
    
}
.privacy p{
    font-size: 18px;
}
</style>