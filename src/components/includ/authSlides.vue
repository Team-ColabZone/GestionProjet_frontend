<template>
    <div class="w-full h-full relative">
        <div class="h-full w-full overflow-hidden rounded-lg">
            <img v-for="(image, index) in images" :key="index" :src="require(`@/assets/images/${image}`)"
                :alt="`Slide ${index + 1}`" v-show="index === currentSlide"
                class="w-full h-full object-cover rounded-lg" />
        </div>

        <div class="absolute w-full inset-0 bg-gradient-to-t rounded-lg from-black to-transparent flex flex-col justify-end">
            <div class="w-full px-6 pb-4 text-white">
                <p class="text-3xl font-bold">CollabZone,<br>
                    <i class="text-lg">Connectez-vous pour démarrer votre projet avec succès !</i>
                </p>

                <div class="mt-4 bg-white/20 p-4 rounded-lg flex justify-between text-sm">
                    <p>Cameroun, Yaoundé</p>
                    <p>+237 693 32 53 31</p>
                    <p>www.flysoft-eng.com</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                'signin_image2.jpg',
                'signin_image3.jpg',
                'signin_image4.jpg',
                'signup_image.jpg'
            ],
            currentSlide: 0
        };
    },

    mounted() {
        this.startSlideShow();
    },

    methods: {
        async startSlideShow() {
            setInterval(() => {
                this.nextSlide();
            }, 3000);
        },
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.images.length;
        },
    }
}
</script>

<style>
/* @media (max-width: 800px) {
    .md {
        display: none;
    }
} */
</style>