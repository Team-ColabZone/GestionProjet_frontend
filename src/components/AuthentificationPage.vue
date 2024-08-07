<template>
    <div class="container monda-font animate__animated animate__fadeInDown">
        <div class="signup1">
            <div class="overlay"></div>
            <img class="img1" src="../assets/signin_image2.jpg" alt="image page de connexion" />
            <div class="text-overlay">

                <p class="text1">CollabZone,<br>
                    <i>Connectez-vous pour démarrer votre projet avec succès !</i>
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
                <div>
                    <h1 class="monda-font">Connexion</h1>
                </div>
                <!-- <div class="form"> -->
                <form @submit.prevent="login">

                    <div class="input-field">
                        <div class="inp"> <label for="email">Identifiant de connexion</label></div>
                        <input class="input" type="email" id="email" v-model="email" required
                            placeholder="Veuillez entrer votre identifiant">
                    </div>

                    <div class="input-field passf">
                        <div class="inp"> <label for="password">Mot de passe</label></div>
                        <input class="input" type="password" id="password" v-model="password" required
                            placeholder="Veuillez entrer un mot de passe">
                    </div>
                    <div class="forgotpassword">
                        <p><router-link to="/Forgotpassword">Mot de passe oublié?</router-link></p>
                    </div>


                    <div class="btn1">
                        <button class="btn" type="submit">
                            <span>Se connecter</span>
                        </button>
                    </div>
                    <div class="navigation">
                        <p>Avez vous déja un Compte?<router-link to="/CreateAccount">Inscription</router-link></p>
                    </div>
                    <div class="privacy">
                        <p>En continuant vous agréer la <router-link to="/Privacy">Politique de
                                Confidentialité</router-link><br> et les <router-link to="/Privacy"> Conditions
                                d'utilisations </router-link> </p>
                    </div>
                </form>
            </div>
            <!-- </div> -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                // Make a POST request to the /auth/login endpoint on the local server (http://localhost:3001)
                const response = await axios.post('http://localhost:3001/auth/login', {
                    email: this.email,
                    password: this.password
                });
                const userData = response.data;
                localStorage.setItem('userId', userData.user_id);
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

                const response = await axios.get('http://localhost:3001/users', {
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
h1 {
    font-size: 50px;
    font-weight: bold;
    color: #202020;
    padding-bottom: 70px;
    padding-top: 10px;
}

p {
    padding-bottom: 10px;
    padding-top: 0px;
}

.container {
    text-align: left;
    /* width: 100%; */
    height: 98vh;
    display: flex;
    width: 100%;
    overflow-y: auto;
    /* margin-left: 10px;
    margin-right: 10px;
    margin-top: 1px; */

}

body {
    /* width: 100%; */
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
    padding-bottom: 40px;
}

.passf {
    padding-bottom: 10px;
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
    font-weight: 700;
    font-size: 24px;
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
    padding-top: 4%;
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
    transform: translateX(-50%);
    color: white;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    z-index: 2;
}

.text-overlay i {
    font-size: 20px;

}

.text1 {
    text-align: left;
    padding-left: 10px;
}

.footerImage {
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.2);
    height: 70px;
    width: 200% !important;
    border-radius: 15px;
    padding-left: 40px;
    padding-right: 40px;
    bottom: 2%;
    margin-left: 0% !important;
    margin-right: 12%;
    margin-bottom: 1%;
}

.footerImage p {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
}

.forgotpassword {
    text-align: right;
    padding-right: 8%;
}

.forgotpassword p {
    font-size: 22px;
    /* color: blue; */
}

.navigation {
    text-align: center;
    padding-top: 2%;
}

.navigation p {
    font-size: 22px;
}

.privacy {
    text-align: center;
    padding-top: 0;
}

.privacy p {
    font-size: 18px;
}
</style>