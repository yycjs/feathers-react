/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    exec: {
      landslide: {
        command: 'landslide landslide.cfg'
      }
    },
    watch: {
      slides: {
        files: ['slides.md', 'theme/**/*'],
        tasks: ['exec:landslide']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['watch:slides']);
};
