/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    exec: {
      cleaver: {
        command: 'node_modules/.bin/cleaver --debug slides.md'
      }
    },
    watch: {
      slides: {
        files: ['slides.md', 'theme/**/*', 'img/**/*'],
        tasks: ['exec:cleaver']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['watch:slides']);
};
