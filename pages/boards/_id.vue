<template>
  <v-container
    fluid
    :style="
      board.image.downloadURL != ''
        ? `background: url(${board.image.downloadURL}); background-size:cover; opacity: 0.9; background-attachment: fixed;`
        : board.color
        ? `background-color: ${board.color}`
        : ''
    "
    class="board-site"
  >
    <v-container>
      <div class="d-flex flex-row justify-space-between heading">
        <div class="title-left">
          <h1>{{ board.title }}</h1>
          <small>Created {{ board.dateCreated | formatDate }}</small>
        </div>
        <div class="title-right">
          <v-card-actions>
            <nuxt-link to="/" class="back-page">Back to Boards</nuxt-link>
          </v-card-actions>
        </div>
      </div>
      <div width="100%" class="d-flex flex-row pt-3 pb-3 justify-space-between">
        <div class="d-flex flex-row justify-space-between">
          <v-chip color="blue" text-color="white" label @click="dialog = true">
            Create new list
          </v-chip>
        </div>
        <div class="d-flex">
          <v-chip color="red" text-color="white" label @click="deleteBoard">
            Delete board
          </v-chip>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap align-start card-list">
        <div
          v-for="item in board.lists"
          :key="item.id"
          class="d-flex flex-column justify-space-between list"
          @drop="drop($event, item.id)"
          @dragover="allowDrop($event)"
        >
          <div class="d-flex justify-space-between align-start">
            <h4>{{ item.title }}</h4>
            <v-icon small @click="deleteList(item.id)">
              mdi-delete-outline
            </v-icon>
          </div>
          <v-card
            v-for="cardItem in item.cards"
            :key="cardItem.id"
            :draggable="true"
            class="mt-5"
            @dragover.prevent
            @dragstart="drag($event, cardItem)"
            @click="editCard(cardItem)"
          >
            <v-card-text>{{ cardItem.title }}</v-card-text>
          </v-card>
          <v-btn
            depressed
            class="mt-4"
            @click="
              dialogCard = true
              listId = item.id
            "
          >
            Add Card
          </v-btn>
        </div>
      </div>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card elevation="0">
          <v-card-title>
            <span class="headline">List name</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="list.title"
                    label="Stuff to do"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="createList">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogEditCard" persistent max-width="600px">
        <v-card elevation="0">
          <v-card-title>
            <span class="headline">Edit Card</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentCard.title"
                    label="Edit"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteCard">
              Delete
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialogEditCard = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="updateCard">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogCard" persistent max-width="600px">
        <v-card elevation="0">
          <v-card-title>
            <span class="headline">Card name</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="card.title"
                    label="Fill it..."
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogCard = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="createCard">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import { v4 as uuidv4 } from 'uuid'
export default {
  layout: 'board',
  async asyncData({ params }) {
    const boardRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(params.id)
    let boardData = {}
    await boardRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          boardData = doc.data()
          boardData.id = params.id
        }
      })
      .catch((error) => {
        return error
      })
    return { board: boardData }
  },
  data() {
    return {
      isShow: false,
      listId: '',
      list: {
        title: '',
      },
      card: {
        title: '',
      },
      prevCard: {},
      currentCard: {},
      cardDraggedId: '',
      cardDraggedListId: '',
      dialog: false,
      dialogCard: false,
      dialogEditCard: false,
      drawer: false,
    }
  },
  created() {
    let that = this
    let tempId = this.board.id
    $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(tempId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          that.board = doc.data()
          that.board.id = tempId
        }
      })
  },
  methods: {
    async updateBoard() {
      let that = this
      await that.$fire.firestore
        .collection('users')
        .doc(that.$fire.auth.currentUser.uid)
        .collection('boards')
        .doc(that.board.id)
        .update(that.board, { merge: true })
    },
    async deleteBoard() {
      let that = this
      try {
        await that.$fire.firestore
          .collection('users')
          .doc(that.$fire.auth.currentUser.uid)
          .collection('boards')
          .doc(that.board.id)
          .delete()
          .then(() => {
            $nuxt.$router.push('/')
          })
          .catch(() => {})
      } catch (error) {
        $nuxt.router.push('/')
        alert(error)
      }
    },
    async createList() {
      let that = this
      that.dialog = false
      if (that.list.title !== '') {
        that.list.id = uuidv4()
        that.list.cards = []
        that.list.dateCreated = Date.now()
        if (that.board.lists) {
          that.board.lists.push(that.list)
        } else {
          that.board.lists = []
          that.board.lists.push(that.list)
        }
        await that.updateBoard()
      }
      that.list = {
        title: '',
      }
    },
    async deleteList(id) {
      let that = this
      let index = -1
      that.board.lists.forEach((item, i) => {
        if (item.id === id) {
          index = i
        }
      })
      if (index > -1) {
        that.board.lists.splice(index, 1)
        await that.updateBoard()
      }
    },
    async createCard() {
      let that = this
      that.dialogCard = false
      if (that.card.title !== '') {
        that.card.id = uuidv4()
        that.card.dateCreated = Date.now()
        that.card.listId = that.listId
        let index = -1
        that.board.lists.forEach((list, i) => {
          if (list.id === that.listId) {
            index = i
          }
        })
        if (index !== -1) {
          if (that.board.lists[index].cards) {
            that.board.lists[index].cards.push(that.card)
          } else {
            that.board.lists[index].cards = []
            that.board.lists[index].cards.push(that.card)
          }
          await that.updateBoard()
        }
      }
      that.card = {
        title: '',
      }
      that.listId = ''
    },
    async deleteCard() {
      let that = this
      that.dialogEditCard = false
      that.board.lists.forEach((ele, i) => {
        ele.cards.forEach((ele2, j) => {
          if (ele2.id === that.currentCard.id) {
            that.board.lists[i].cards.splice(j, 1)
          }
        })
      })
      await that.updateBoard()
    },
    async updateCard() {
      let that = this
      that.dialogEditCard = false
      that.board.lists.forEach((ele, i) => {
        ele.cards.forEach((ele2, j) => {
          if (ele2.id === that.currentCard.id) {
            ele2 = that.currentCard
          }
        })
      })
      await that.updateBoard()
    },
    editCard(card) {
      this.dialogEditCard = true
      this.currentCard = card
    },
    drag(ev, card) {
      this.currentCard = card
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev, id) {
      ev.preventDefault()
      this.updateCardList(id)
    },
    async updateCardList(newListId) {
      let that = this
      let tempListIndex = -1
      let newListIndex = -1
      let tempCardIndex = -1
      that.board.lists.forEach((list, index) => {
        if (list.id === newListId) {
          newListIndex = index
        }
        if (that.currentCard.listId === list.id) {
          tempListIndex = index
          list.cards.forEach((item, secondIndex) => {
            if (item.id === that.currentCard.id) {
              tempCardIndex = secondIndex
            }
          })
        }
      })
      // Remove CurrentCard from current List
      that.board.lists[tempListIndex].cards.splice(tempCardIndex, 1)

      // Add currentCard to its new list
      that.currentCard.listId = newListId
      that.board.lists[newListIndex].cards.push(that.currentCard)

      await that.updateBoard()
    },
  },
}
</script>

<style lang="scss" scoped>
.board-site {
  .container {
    .card-list {
      margin: auto -16px;
    }
    .heading {
      .title-left {
        padding: 10px;
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.9),
          rgba(0, 0, 0, 0.6)
        );
        border-radius: 10px;
        small {
          color: whitesmoke;
        }
      }
    }
    .list {
      min-width: 250px;
      background-color: rgba(212, 212, 212, 0.8);
      padding: 25px 25px 10px;
      border-radius: 12px;
      margin: 0 15px 10px;
      min-height: 30vh;
    }

    .back-page {
      text-decoration: underline;
      color: #4a4afa !important;
    }
  }
}
</style>
