<template>
    <div class="flex m-10">
        <draggable class="dragArea flex list-group " group="tasks" :list="list" @change="log">
            <div class="list-group-item flex flex-col items-start bg-gray-300 m-1 p-3 rounded-md text-center"
                v-for="element in list" :key="element.id">
                <div class="">
                    {{ element.name }}
                </div>
            </div>

        </draggable>

        <draggable class="dragArea flex list-group " group="tasks" :list="list1" @change="log">
            <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element in list1"
                :key="element.id">
                <div class="flex flex-col">
                    {{ element.name }}
                </div>
            </div>
        </draggable>


        <draggable class="dragArea flex list-group" group="tasks" :list="list2" @change="log">
            <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element in list2"
                :key="element.id">
                <div class="flex flex-col">
                    {{ element.name }}
                </div>
            </div>
        </draggable>

    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
    components: {
        draggable: VueDraggableNext,
    },
    data() {
        return {
            list: [
                { name: 'John', id: 1 },
                { name: 'Joao', id: 2 },
                { name: 'Jean', id: 3 },
                { name: 'Gerard', id: 4 },
            ],

            list1: [
                { name: 'tefouet', id: 1 },
                { name: 'Alex', id: 2 },
                { name: 'sean', id: 3 },
                { name: 'techno', id: 4 },
            ],

            list2: [
                { name: 'sosthen', id: 1 },
                { name: 'randy', id: 2 },
                { name: 'Claude', id: 3 },
                { name: 'wifi', id: 4 },
            ],
        };
    },
    methods: {
        log(event) {
            console.log(event);
        },
    },
});
</script>

<style scoped>
.dragArea {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
}

.list-group-item {
    cursor: move;
}
</style>