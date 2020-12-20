
Om een project te maken met Vue, Vuetify en Vuex heb ik de volgende commando's uitgevoerd

# Stap 1
npm run vue create vue2-spike
- Manually select features
    - Choose Vue version
        - 2.x
        - Use class style component syntax (y)
        - Use bable alonside TypeScript (y)
        - Sass/SCSS (with dart-sass)
        - ESLint + Prettier
        - Lint on save
        - In dedicated config files
    - Babel
    - TypeScript
    - Vuex
    - CSS Pre-processors
    - Linter / Formatter


# Stap 2
Change directory naar "vue2-spike" folder
- Add "@vue/cli": "4.5.9", as devdependency
- Run: npm install
- Voeg een "vue": "vue", regel toe aan de scripts in de package.json
- Run: npm run vue add vuetify