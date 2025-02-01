# Ipssi-x-front-v2

Ce projet est un clone simplifié de Twitter, développé en React JS et une application Mobile. Il inclut l’authentification, la création/gestion de tweets, la recherche d’utilisateurs et la gestion des notifications en temps réel. La configuration et l’installation reposent sur Node.js, npm et Redis.

Voici les dossiers :
- app-x
- x-back
- x-ippsi-front

## Participants
- Miguel KIDIMBA
- Soumaya JEBALI
- Hoda FEDE NDINGE
- Kevin TATA
- Beji SOUHIR
- Chaimae HMAMED

## Fonctionnalités Principales
- Authentification (inscription, connexion)
- Création et affichage des tweets
- Système de like et de réponse
- Messagerie en temps réel (WebSocket)
- Gestion de l’état avec Redux

## Installation
Pour chaque dossier :

### app-x
1. git clone https://github.com/KiddMiguel/Ipssi-x-front-v2.git
2. cd app-x
3. npm install
4. npx expo start (Attention à changer les information http dans le fichier constant/config.ts)
``` typeScript
    // constants/Config.ts
    export const WS_URL = "ws://192.168.1.19:8070";
    export const API_URL = "http://192.168.1.19:8000";
    // Exemple : 
    // export const WS_URL = "ws://192.168.1.100:8070";
```

### x-back
1. git clone https://github.com/KiddMiguel/Ipssi-x-front-v2.git
2. cd x-back
3. npm install
4. npm start

### x-ippsi-front
1. git clone https://github.com/KiddMiguel/Ipssi-x-front-v2.git
2. cd x-ippsi-front
3. npm install
4. npm run dev

## Aperçu en Vidéo

Consultez ces démos pour visualiser les fonctionnalités de l’application :
<video width="100%" controls>
    <source src="./AperçuWeb.mp4" type="video/mp4">
    Votre navigateur ne supporte pas la lecture de vidéos.
</video>

- [Aperçu Mobile](#)