module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue3-jest'
  },
  moduleNameMapper: {
    "/^@\/(.*)$/": "/Users/stephendisalvio/coding_projects/vue_projects/goali_vue/src/$1"
  },
  "resolver": null
}
