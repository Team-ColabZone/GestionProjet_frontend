<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-gray-900">Mot de passe oublié</h2>
            <form @submit.prevent="submitForm" class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Adresse email</label>
                        <input id="email-address" v-model="email" name="email" type="email" autocomplete="email"
                            required
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Adresse email">
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                        Envoyer
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
            email: '',
            errorMessage: ''
        };
    },
    methods: {
        async submitForm() {
            if (!this.isValidEmail(this.email)) {
                this.errorMessage = 'Veuillez entrer une adresse email valide.';
                alert(this.errorMessage);
                return;
            }

            const returnUrl = `${window.location.origin}/Updatepassword`; // Construit dynamiquement l'URL de la page de modification du mot de passe

            try {
                const response = await fetch(`${config.apiBaseUrl}/auth/resset-password`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: this.email, return_url: returnUrl })
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                } else {
                    alert('Erreur: ' + result.message);
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
};
</script>


<style></style>