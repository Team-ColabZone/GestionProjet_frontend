<template>
    <div class="left-block">
        <div class="slider-container">
            <img v-for="(image, index) in images" :key="index" :src="require(`@/assets/images/${image}`)"
                :alt="`Slide ${index + 1}`" v-show="index === currentSlide"
                style="width: 100%; border-radius: 12px;">
        </div>

        <div class="overlay">
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

.left-block {
    width: 65%;
    height: 100%;
    position: relative;
    border-radius: 12px;
    /* border: 1px solid red; */
}

.slider-container {
    display: flex;
    height: 100%;
    width: 100%;
}

.overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    color: #FFFFFF;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    border-radius: 12px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.849), rgba(0, 0, 0, 0));
}

.text-overlay {
    padding: 0 25px 15px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
}

.text1 {
    text-align: left;
}

.text-overlay i {
    font-size: 20px;
}

.footerImage {
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.205);
    padding: 0px 25px;
    border-radius: 15px;
}

.footerImage p {
    font-size: 1.2rem;
    font-weight: bold;
}

@media only screen and (max-width:800px){
.left-block{
    display:none;
}
}
</style>