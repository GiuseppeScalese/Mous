module.exports = function(grunt) {

    grunt.initConfig({

        // Import package manifest
        pkg: grunt.file.readJSON("package.json"),

        //== "grunt" and "grunt build:html"
        //-----------------------------------------------------

        // Load demo on local server
        connect: {
            server: {
                options: {
                    port: "9001",
                    base: "",
                    // This allows anyone on the network to view. Change to "localhost" to confine to local pc.
                    hostname: "*",
                    open: {
                        target: "http://localhost:9001/demo/", // target url to open
                    },
                    livereload: true
                }
            }
        },

        // Watch for changes to source. Respond depending on what has changed.
        watch: {
            script: {
                files: ["scripts/**"],
                //tasks: ["concat"],
                options: {
                    livereload: true
                }
            },
            jade: {
                files: ["*.jade", "**/*.jade"],
                tasks: ["jade:compile"],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ["sass/**"],
                tasks: ["sass:compile","postcss"],
                options: {
                    livereload: true
                }
            },
            images: {
                files: ["images/**"],
                options: {
                    livereload: true
                }
            },
            icons: {
                files: ["icons/**"],
                tasks: ["sprite","imagemin"],
                options: {
                    livereload: true
                }
            }
        },


        // Compile the Jade into HTML
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: [{
                    expand: true,
                    cwd: "",
                    src: ["*.jade"],
                    dest: "demo",
                    ext: ".html"
                }]
            }
        },

        // Compile the SASS into CSS
        sass: {
            compile: {
                options: {
                    sourceMap: false,
                    require: 'susy'
                },
                files: {
                    "demo/css/style.css": "sass/style.scss"
                }
            }
        },

        imagemin:{
          dist: {
             options: {
               optimizationLevel: 5
             },
             files: [{
               expand: true,
               cwd:'images/',
               src: ['**/*.{png,jpg,gif,svg}'],
               dest: 'demo/images/'
             }]
          }
    		},

        uglify: {
          options: {
            manage: false
          },
          my_target: {
            files: [{
              'demo/scripts/main.min.js' : ['scripts/components/*.js']
            }]
          }
        },

        cssmin:{
          my_target: {
            files: [{
              expand: true,
              cwd: 'demo/css/',
              src: ['*.css', '!*.min.css'],
              dest: 'demo/css/',
              ext: '.min.css'
            }]
          }
        },

        // Autoprefix compiled css (upgraded from autoprefix)
        postcss: {
            build: {
                options: {
                    processors: [
                        require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
                        // Add nano here
                    ]
                },

                files: {
                    "demo/css/style.css": "demo/css/style.css"
                }
            }
        }
 });

    // Replace all these load with the loader plugin
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask("serve", ["jade:compile", "sass:compile", "cssmin", "imagemin",  "postcss", "uglify", "connect", "watch"]);
    grunt.registerTask("default", ["serve"]);
};
