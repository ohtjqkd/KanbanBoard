<template>
    <div class="list">
        <h3 class="list-title">{{ card.title }}</h3>
        <ul class="list-items">
          <Ticket v-for="item in card.tickets" :key="item.content" :content="item.content"/>
        </ul>
        <button class="add-card-btn btn" v-on:click="addCard(card.title)">Add a card</button>
    </div>
</template>

<script>
import Ticket from '@/components/Ticket'
import Modal from '@/components/ListModal'

export default {
  components: { Ticket, Modal },
  props: ['card'],
  methods: {
    addCard: function (title) {
      alert(title)
      console.log('hello console')
    }
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style>

</style>
