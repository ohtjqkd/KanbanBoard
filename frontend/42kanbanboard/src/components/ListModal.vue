<template>
  <div id="List-Modal">
      <input type="text" placeholder="List Name" v-model="listAddForm.title" />
      <button type="button" @click="$emit('add', listAddForm)">Add</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listAddForm: {}
    }
  }
}
</script>

<style scoped>
#List-Modal {
    min-width: 600px;
    min-height: 300px;
    position: absolute;
    top: 30%;
    left: 50%;
    background-color:grey;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
input {
    width: 80%;
    font-size: 5.0em;
}
button {
    display: block;
    width: 10%;
    height: 10vh;
}
</style>
