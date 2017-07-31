/**
 * Created by pomy on 06/07/2017.
 */

module.exports = {
    "prompts": {
        "name": {
            "type"    : "string",
            "required": false,
            "message" : "Project name",
            "default" : "vue-startup"
        },
        "description": {
            "type"    : "string",
            "required": false,
            "message" : "Project description",
            "default" : "A new Vue.js project"
        },
        "port": {
            "type"    : "string",
            "required": false,
            "message" : "client port",
            "default" : 3000
        },
        "state": {
            "type": "list",
            "message": "state manage for your app",
            "choices": [
                {
                    "name": "Mobx (https://github.com/mobxjs/mobx)",
                    "value": "mobx",
                    "short": "mobx"
                },
                {
                    "name": "Vuex (https://github.com/vuejs/vuex)",
                    "value": "vuex",
                    "short": "vuex"
                }
            ]
        },
        "fmcomponents": {
          "type": "confirm",
          "message": "Need fmcomponents?"
        },
        "imageminifying": {
          "type": "confirm",
          "message": "Need image minifying in production?"
        }
    },
    "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dll\n  npm run dev\n\nDocumentation can be found at https://github.com/fmfe/vue-startup"
}
