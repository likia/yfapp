<template>
  <div class="text">
    hello, <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Kyle Liu'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.text {
  .name {
    color: #f00;
  }
}
</style>
