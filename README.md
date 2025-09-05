# CoNote — Collaborative Notes Suite

## Description du projet

**CoNote** est une application multi-plateforme de gestion de notes collaboratives.  
Elle permet aux utilisateurs de créer, organiser et partager des notes en toute sécurité, avec une expérience fluide sur **web** et **mobile**.

L’application vise à offrir :

-   **Écriture moderne** : édition Markdown simple et efficace.
-   **Partage sécurisé** : avec un autre utilisateur.
-   **Accessibilité partout** : front web moderne + app mobile.
-   **Déploiement facile** : dockerisation complète.

## Installation

J'ai simplifié le lancement des applications web front et back, les pré-requis sont d'avoir docker et docker-compose d'installés. Il faut procéder de la manière suivante:

**NB:** Cloner le repo dans votre dossier désiré.

```
git clone https://github.com/Ibrahim-Aboubacar/cbx-notes-suite.git
```

### Front:

-   ⁠Naviguer dans le dossier ⁠ web-frontend

-   Créer le fichier ⁠ .env ⁠ avec le contenu:
    ⁠ env

    ```
    VITE_API_URL=http://localhost:8080
    VITE_ENVIRONMENT=prod
    ```

-   Dans un terminal, lancer la commande:
     ⁠
    ```
    docker-compose up --build -d
    ```

### Back:

-   ⁠Naviguer dans le dossier ⁠ backend-spring
-   Dans un terminal, lancer la commande:
    ```
    docker-compose --build -d
    ```

Accéder à l'application dans votre navigateur via l'url :

```
 http://localhost:3000/
```
