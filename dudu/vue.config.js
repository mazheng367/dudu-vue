module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/variables.scss";`
            }
        }
    },
    pages: {
        index: {
            entry: "src/main.ts",
            template: "public/index.html"
        },
        login: {
            entry: "src/login/index.js",
            template: "public/login.html"
        }
    }
};