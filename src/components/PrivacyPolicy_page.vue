<template>
    <div class="container monda-font animate__animated animate__fadeInDown">
        <div class="privacy-policy">
            <h1>Politique de confidentialité</h1>
            <p>Nous sommes engagés à protéger la confidentialité des informations que vous nous fournissez. Cette
                politique de confidentialité explique comment nous collectons, utilisons, stockons et partageons les
                informations que vous nous fournissez lors de votre utilisation de notre application web.</p>

            <h2>Collecte des informations</h2>
            <ul>
                <li>Votre nom et prénom</li>
                <li>Votre adresse e-mail</li>
                <li>Votre mot de passe (chiffré)</li>
                <li>Votre adresse IP</li>
                <li>Les informations de votre navigateur et de votre appareil</li>
                <li>Les données de connexion et d'utilisation de notre application</li>
            </ul>

            <h2>Utilisation des informations</h2>
            <p>Nous utilisons les informations collectées pour :</p>
            <ul>
                <li>Fournir et améliorer nos services</li>
                <li>Vous envoyer des notifications et des mises à jour</li>
                <li>Vous proposer des fonctionnalités et des contenus personnalisés</li>
                <li>Analyser l'utilisation de notre application pour améliorer l'expérience utilisateur</li>
            </ul>

            <h2>Partage des informations</h2>
            <p>Nous pouvons partager les informations collectées avec :</p>
            <ul>
                <li>Nos partenaires et fournisseurs de services pour fournir et améliorer nos services</li>
                <li>Les autorités compétentes pour répondre aux exigences légales et réglementaires</li>
            </ul>

            <h2>Sécurité des informations</h2>
            <p>Nous prenons des mesures de sécurité appropriées pour protéger les informations collectées, notamment :
            </p>
            <ul>
                <li>Chiffrement des données sensibles</li>
                <li>Authentification et autorisation robustes</li>
                <li>Mise à jour régulière de nos systèmes et de nos processus de sécurité</li>
            </ul>

            <h2>Droits des utilisateurs</h2>
            <p>Vous avez le droit de :</p>
            <ul>
                <li>Demander l'accès à vos informations personnelles</li>
                <li>Demander la rectification ou la suppression de vos informations personnelles</li>
                <li>S'opposer à l'utilisation de vos informations personnelles pour des fins commerciales</li>
                <li>Porter plainte auprès d'une autorité de contrôle compétente</li>
            </ul>

            <h2>Cookies et technologies de suivi</h2>
            <p>Nous utilisons des cookies et des technologies de suivi pour améliorer l'expérience utilisateur et
                collecter des informations sur l'utilisation de notre application. Vous pouvez refuser l'utilisation de
                ces technologies en modifiant les paramètres de votre navigateur.</p>

            <h2>Mise à jour de cette politique</h2>
            <p>Nous nous réservons le droit de mettre à jour cette politique de confidentialité à tout moment. Nous vous
                encourageons à consulter régulièrement cette page pour prendre connaissance des éventuelles
                modifications.</p>

            <h2>Contact</h2>
            <p>Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, n'hésitez
                pas à nous contacter à <a href="mailto:tefouetange06@gmail.com">tefouetange06@gmail.com</a> ou via notre formulaire de
                contact.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrivacyPolicy'
}
</script>

<style scoped>
.privacy-policy {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.monda-font {
    font-family: 'Monda', sans-serif;
}


h1,
h2 {
    margin-top: 20px;
}
p{
    font-size: 24px;
}
h1{
    font-size: 40px;
}
h2{
    font-size: 30px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 10px;
    font-size: 24px;
}

a {
    text-decoration: none;
    color: #337ab7;
}

a:hover {
    color: #23527c;
}
</style>