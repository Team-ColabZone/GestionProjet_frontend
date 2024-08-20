<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-gray-900">Modifier votre mot de passe</h2>
            <form class="mt-8 space-y-6" @submit.prevent="updatePasswordForm">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="actual-password">Mot de passe Actuel</label>
                        <input id="actual-password" name="actual-password" type="text"
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Mot de passe actuel" v-model="actualPassword">
                    </div>
                </div>

                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="newPassword">Nouveau mot de passe</label>
                        <input id="newPassword" name="newPassword" type="password" required
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Entrer le nouveau mot de passe" v-model="newpassword">
                    </div>
                </div>

                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="newPassword">Confirmation de mot de passe</label>
                        <input id="newPassword" name="newPassword" type="password" required
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Veuillez confirmer votre mot de passe" v-model="confirmpassword">
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>



<script>
import config from "../config";

export default {
    data() {
        return {
            actualPassword: '',
            newPassword: '',
            confirmPassword: '',
            email: ''
        };
    },
    methods: {
        async updatePasswordForm() {
            if (this.newPassword !== this.confirmPassword) {
                alert('Les mots de passe ne correspondent pas.');
                return;
            }

            try {
                const response = await fetch(`${config.apiBaseUrl}/auth/update-password`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        current_password: this.actualPassword,
                        new_password: this.newPassword
                    })
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    console.log("mot de passe modifier avec success");                   
                } else {
                    alert('Erreur: ' + result.message);
                }

                

            } catch (error) {
                console.error('Erreur:', error);
                console.log("Une erreur est survenue. Veuillez réessayer");

                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        },
        getParamsFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return {
                currentPassword: urlParams.get('current_password'),
                email: urlParams.get('email')
            };
        }
    },
    mounted() {
        const { currentPassword, email } = this.getParamsFromUrl();
        if (currentPassword) {
            this.actualPassword = currentPassword;
        }
        if (email) {
            console.log(this.email)
            this.email = email;
        } else {
            this.email = localStorage.getItem('userEmail'); // Récupérer l'email depuis le localStorage
        }
    }
};
</script>

<style></style>