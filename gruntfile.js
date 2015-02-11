module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // delete src directory
    clean: {
      build: {
        src: [ '<%= pkg.grunt.build %>' ]
      },
    },
    // copy files
    copy: {
      build: {
        cwd: '<%= pkg.grunt.src %>',
        src: [ '**', '!vendors/**', '**/html5shiv.js', '**/css3pie/PIE.htc', '!**/*.less', '!**/*.png', '!**/*.jpg', '!scripts/*' ],
        dest: '<%= pkg.grunt.build %>',
        expand: true
      },
    },
    // detects all the js files and compile into one
    requirejs : {
      compile : {
        options : {
          baseUrl : '<%= pkg.grunt.src %>/scripts',
          name : 'config',
          mainConfigFile : '<%= pkg.grunt.src %>/scripts/config.js',
          out: "<%= pkg.grunt.build %>/scripts/require.js",
          optimize : 'none'
        }
      }
    },
    // re-add requirejs back in
    concat : {
      dist : {
        src : ['<%= pkg.grunt.src %>/vendors/requirejs/require.js', '<%= pkg.grunt.build %>/scripts/require.js'],
        dest : '<%= pkg.grunt.build %>/scripts/require.js'
      },
    },
    // compile js files into one, and minify it
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Author: <%= pkg.author.name %> */\n'
      },
      build: {
        options: {
          mangle: false // not minify variable names
        },
        files: {
          '<%= pkg.grunt.build %>/scripts/require.min.js': ['<%= pkg.grunt.build %>/scripts/require.js']
        }
      }
    },
    replace: {
      link_requirejs_in_html: {
        src: ['<%= pkg.grunt.build %>/*.html', '<%= pkg.grunt.build %>/*.php'],
        overwrite: true,
        replacements: [{ 
          from: /<script data-main="scripts\/config" src="vendors\/requirejs\/require.js"><\/script>/g,
          to: '<script type="text/javascript" src="scripts/require.min.js"></script>'
        }]
      }
    },
    // compile less files
    less : {
      compile : {
        options : {
          paths : ["<%= pkg.grunt.src %>/styles/"],
          compress : true
        },
        files : [{
          expand : true,
          cwd : '<%= pkg.grunt.src %>/styles',
          src : ['**/main.less'],
          dest : '<%= pkg.grunt.build %>/styles',
          ext : '.css'
        }]
      }
    },
    // image minify
    imagemin : {
      dist : {
        options : {
          optimizationLevel : 7
        },
        files : [{
          expand : true,
          cwd : '<%= pkg.grunt.src %>/',
          src : ['**/*.png', '**/*.jpg', '!vendors/**'],
          dest : '<%= pkg.grunt.build %>/'
        }]
      }
    },
    watch: {
      options: {
        livereload : true
      },
      style: {
        files: ['dev/styles/**/*.less'],
        tasks: ['less']
      },
      html: {
        files: ['dev/**/*.html', 'dev/**/*.php']
      }
    },
    php: {
      options: {
        port: 9000,
        keepalive: true,
        open: true,
        base: './dev',
        hostname: 'localhost'
      },
      watch: {
        options: {
          livereload: 9000
        }
      }
    },
    connect: {
      devserver: {
        options: {
          keepalive: true,
          hostname: '0.0.0.0',
          base: './dev',
          port: 9000,
          liveload: true
        }
      }
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-php');

  // task(s).
  grunt.registerTask('default', ['clean', 'copy', 'requirejs', 'concat', 'uglify', 'replace', 'less']);
  grunt.registerTask('css', ['less']);
  grunt.registerTask('img', ['imagemin']);
  grunt.registerTask('js', ['requirejs', 'concat', 'uglify']);
  grunt.registerTask('build', ['clean', 'copy', 'requirejs', 'concat', 'uglify', 'replace', 'less', 'imagemin']);
};