<template>
    <div class="side_barre">

        <nav style="width: 100%;">
            <center>
                <!-- <img style="width: 100px; margin-top: 20px;" src="@/assets/flysoft.png" alt="" /> -->
            </center>


            <ul>
                <li>
                    <router-link to="/acceuilPage" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-home"></i>
                        <h3>Dashboard</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage2" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-bullhorn"></i>
                        <h3> Backlogs</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage3" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-file-alt"></i>
                        <h3>Tache</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage4" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-star"></i>
                        <h3>Membre d'equipe</h3>

                    </router-link>
                </li>
                <li>
                    <router-link to="/acceuilPage5" class="butt" style="display: flex;text-decoration: none;">
                        <i class="fas fa-envelope"></i>
                        <h3>Projets</h3>

                    </router-link>
                </li>
                
            </ul>
        </nav>
    </div>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);



.side_barre {
    width: 15%;
    background-color: #C0C0C0;
    height: 100vh;
    margin: 0px;
}

.side_barre i {
    color: #000000 !important;
    margin: 0 10px;
    font-size: 24px;
}

.side_barre h3 {
    color: #000000 !important;
    width: 100px;
    text-align: left;
    margin: 0 10px;
    font-family: Monda;
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
</style>