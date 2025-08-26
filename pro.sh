#!/bin/bash

# Créer la racine
mkdir -p Dev-J

# Créer les pages HTML principales
touch Dev-J/index.html
touch Dev-J/about.html
touch Dev-J/contact.html
touch Dev-J/services.html
touch Dev-J/services-web.html
touch Dev-J/services-mobile.html
touch Dev-J/services-design.html
touch Dev-J/services-ia.html
touch Dev-J/services-messagerie.html
touch Dev-J/portfolio.html
touch Dev-J/portfolio-web.html
touch Dev-J/portfolio-mobile.html
touch Dev-J/portfolio-design.html
touch Dev-J/portfolio-ia.html
touch Dev-J/skills.html
touch Dev-J/resources.html
touch Dev-J/partners.html
touch Dev-J/proofs.html
touch Dev-J/blog.html
touch Dev-J/blog-post1.html
touch Dev-J/blog-post2.html
touch Dev-J/pricing.html
touch Dev-J/faq.html
touch Dev-J/privacy.html
touch Dev-J/terms.html
touch Dev-J/404.html

# Créer dossier data et JSON
mkdir -p Dev-J/data
touch Dev-J/data/data.json  # Copiez le schéma JSON ici manuellement

# Créer dossier js et modules
mkdir -p Dev-J/js
touch Dev-J/js/main.js
touch Dev-J/js/animations.js
touch Dev-J/js/skills.js
touch Dev-J/js/services-ia.js
touch Dev-J/js/messagerie.js
touch Dev-J/js/contact.js
touch Dev-J/js/portfolio.js
touch Dev-J/js/utils.js

# Créer dossier css
mkdir -p Dev-J/css
touch Dev-J/css/tailwind.css  # Si local, sinon use CDN

# Créer dossiers assets
mkdir -p Dev-J/assets/images
touch Dev-J/assets/images/logo.png  # Placeholder, ajoutez vos fichiers
mkdir -p Dev-J/assets/videos
touch Dev-J/assets/videos/demo-web.mp4  # Placeholder
mkdir -p Dev-J/assets/fonts
touch Dev-J/assets/fonts/custom-font.ttf  # Placeholder

# Créer README
touch Dev-J/README.md

echo "Structure du projet Dev-J créée avec succès !"