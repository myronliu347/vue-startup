module.exports = {
    prompts: {
        author: {
            type: 'string',
            message: 'Author',
            default: 'followme'
        },
        name: {
            type: 'string',
            required: false,
            message: 'Project name',
            default: 'vue-startup'
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'A new Vue.js project'
        },
        port: {
            type: 'string',
            required: false,
            message: 'client port',
            default: 8080
        },
        state: {
            type: 'list',
            message: 'state manage for your app',
            default: 'vuex',
            choices: [
                {
                    name: 'Vuex (https://github.com/vuejs/vuex)',
                    value: 'vuex',
                    short: 'vuex'
                }
            ]
        },
        fmcomponents: {
            type: 'confirm',
            message: 'Need fmcomponents?'
        },
        skeleton: {
            type: 'confirm',
            message: 'Need app shell?'
        },
        serverwork: {
            type: 'confirm',
            message: 'Need serverwork?'
        }
    },
    filters: {
        'src/store/**/*': 'state === \'vuex\'',
        'src/skeleton/**/*': 'skeleton',
        'build/webpack.skeleton.config.js': 'skeleton',
        'src/sw-register.js': 'serverwork'
    },
    completeMessage: 'To get started:\n\n  cd {{destDirName}}\n  npm install \n\n  npm run dev\n\nDocumentation can be found at https://github.com/myronliu347/vue-startup'
}
