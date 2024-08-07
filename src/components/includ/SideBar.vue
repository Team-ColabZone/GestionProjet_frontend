<script setup>
import {  SquarePlus, ListTodo, Users, Gauge } from 'lucide-vue-next';
</script>



<template>
    <div class="side_barre">

        <nav style="width: 100%;">
            <center>
                <!-- <img style="width: 100px; margin-top: 20px;" src="@/assets/flysoft.png" alt="" /> -->
            </center>


            <ul>
                <li>
                    <router-link to="/acceuilPage" class="butt" style="display: flex;text-decoration: none;">
                        <Gauge />
                        <h3>Dashboard</h3>
                        <i class="fas fa-chevron-up fleche"></i>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage2" class="butt" style="display: flex;text-decoration: none;">
                        <SquarePlus />
                        <h3> Backlogs</h3>
                        <i class="fas fa-arrow-right fleche" style="color: #C0C0C0;"></i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage3" class="butt" style="display: flex;text-decoration: none;">
                        <ListTodo />
                        <h3>Tâches </h3>
                        <i class="fas fa-arrow-right fleche" style="color: #C0C0C0;" ></i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage4" class="butt member" style="display: flex;text-decoration: none;">
                        <Users />
                        <h3>Membres</h3>
                        <i class="fas fa-arrow-right fleche"></i>
                    </router-link>
                </li>
               
                
            </ul>
        </nav>
    </div>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);



.side_barre {
    width: 18%;
    background-color:  #FFFFFF;
    height: 95vh;
    margin: 0px;
}

.side_barre i {
    color: #000000 !important;
    margin: 0 10px;
    font-size: 24px;
    margin-top: 0px;
}

.side_barre h3 {
    color: #000000 !important;
    width: 100px;
    text-align: left;
    margin: 0 10px;
    font-family: Monda;
}
.fleche{
    text-align: right;
    /* margin-left: 15%; */
    padding-left: 120px;
}


/*nav barre*/
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li:hover {
    cursor: pointer;
}


.butt {
    border: none;
    background: none;
    cursor: pointer;
    width: 80%;
    margin: 40px auto;
    padding: 8px 1px;

}
/* .member{
    width: 100%;
} */
</style>