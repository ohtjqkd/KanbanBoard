<template>
  <section class="lists-container">
    <List v-for="c in project.lists" v-bind:key="c.idx" :card="c" />
    <div class="list">
      <button v-on:click="modalOpen" class="add-card-btn btn">Add list</button>
    </div>
    <Modal v-if="showModal" @add="addList" />
  </section>
</template>

<script>
import List from '@/components/List'
import Modal from '@/components/ListModal'
import axios from 'axios'
console.log('project')
export default {
  components: { List, Modal },
  async created () {
    console.log('hi')
    var projectRes = await axios.get('http://localhost:3000/api/project/new project')
    var project = projectRes.data
    console.log(project)
    // var listRes = await this.axios.get('http://localhost:3000/api/list/' + project.title)
    // project['lists'] = listRes.data
    this.project = project
    // return project
  },
  data () {
    return {
      project: null,
      showModal: false
    }
  },
  methods: {
    modalOpen: function () {
      this.showModal = true
    },
    addList: function (listAddForm) {
      console.log(this.project.title)
      this.showModal = !this.showModal
      console.log(this.project)
      console.log(listAddForm)
      this.axios.post('http://localhost:3000/list/add/' + this.project.title, {
        title: listAddForm.title
      }).then((res) => {
        this.project.lists.push(res.data)
      })
      return {}
    }
  }
}
</script>

<style>
</style>
