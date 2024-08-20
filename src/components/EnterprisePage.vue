<template>
    <div class="flex flex-col gap-4 w-full h-full p-2">
        <div class="w-full flex items-center gap-2 p-2 border corder-gray-200 rounded">
            <Building2 />
            <span>Enterprises</span>
        </div>

        <div class="flex w-full gap-8">
            <form action="" class="flex w-1/2 gap-4">
                <div class="flex relative item-center w-3/4">
                    <Search class="absolute left-2 top-2.5 text-gray-600 h-1/2" />
                    <input type="search" id="search-input"
                        class=" w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500"
                        placeholder="Rechercher...">
                </div>

                <input type="submit" value="Rechercher"
                    class=" w-1/4 h-11 bg-black text-white font-bold rounded-lg hover:bg-slate-600 focus:outline-none">

            </form>

            <div class="w-1/2 flex justify-end">
                <button class="flex items-center bg-black rounded-lg p-2 h-full text-white hover:bg-slate-600 focus:outline-none" @click="showModal2">
                    <Plus />
                    <span>Ajoute une entreprise</span>
                </button>
            </div>
        </div>

        <div>asd</div>
    </div>
</template>

<script>
export default{
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        showModal2() {
            this.modalVisible = true
        }
    }
}
</script>
