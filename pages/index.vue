<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="355" persistent>
      <v-container class="d-flex flex-column">
        <div class="d-flex flex-row align-center justify-space-between">
          <h3>Add Board</h3>
          <v-icon @click="closeBox">mdi-close</v-icon>
        </div>
        <v-form ref="form" v-model="valid">
          <div class="d-flex flex-column">
            <v-text-field
              v-model="board.title"
              label="Board title"
              name="title"
              type="text"
              :rules="rules.title"
              required
            ></v-text-field>
            <v-btn
              v-if="enableColor === false"
              depressed
              @click="enableColor = true"
              >Choose Board Color</v-btn
            >
            <br />
            <v-color-picker
              v-if="enableColor === true"
              v-model="board.color"
              dot-size="25"
              hide-inputs
              swatches-max-height="100"
            >
            </v-color-picker>
            <div
              class="
                d-flex
                flex-column
                align-center
                justify-center
                flex-grow-1
                upload-block
              "
              :style="`background-image: url('${
                board.image.downloadURL ? board.image.downloadURL : ''
              }');height:150px;background-size: cover;background-position: center;`"
              @click="chooseImage"
            >
              <template
                v-if="!fileToUpload.progress || fileToUpload.progress == 0"
              >
                <v-icon>mdi-camera</v-icon>
                <p>Add a board background</p>
                <input
                  ref="boardBackground"
                  type="file"
                  accept="jpg, jpeg, png"
                  multiple
                  color="#f66f26"
                  buffer-value="0"
                  style="display: none"
                  @click="onFileClicked($event)"
                  @change="onFileSelected($event)"
                />
              </template>
              <template
                v-else-if="
                  fileToUpload.progress > 0 && fileToUpload.progress < 100
                "
              >
                <div class="text-center">
                  <v-progress-circular :size="50" color="green" indeterminate>
                  </v-progress-circular>
                </div>
              </template>
            </div>
            <v-btn :disabled="!valid" color="primary" @click="createBoard"
              >Submit</v-btn
            >
          </div>
        </v-form>
      </v-container>
    </v-dialog>
    <div class="d-flex flex-row align-center justify-space-between">
      <h1>My Boards</h1>
      <v-btn depressed small @click="addBoard">ADD BOARD</v-btn>
    </div>
    <div class="d-flex flex-wrap align-center justify-start">
      <p v-if="boards.length === 0">You have no boards yet.</p>
      <v-card
        v-for="item in boards"
        :key="item.id"
        :style="
          item.image.downloadURL != ''
            ? `background: url(${item.image.downloadURL});`
            : item.color
            ? ` background-color:${item.color}`
            : ''
        "
        class="trello-board-title mr-4 mb-4"
        @click="$router.push('/boards/' + item.id)"
      >
        <v-card-title
          :style="item.image.downloadURL != '' ? 'color: #fff' : ''"
        >
          {{ item.title }}
        </v-card-title>
        <v-card-subtitle
          :style="item.image.downloadURL != '' ? 'color: #fff' : ''"
        >
          created {{ item.dateCreated | formatDate }}
        </v-card-subtitle>
      </v-card>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable no-undef */
import { v4 as uuidv4 } from 'uuid'

function initialState() {
  return {
    enableColor: false,
    dialog: false,
    valid: false,
    rules: {
      title: [(val) => (val || '').length > 0 || 'This field is required'],
    },
    board: {
      title: '',
      color: '',
      image: {
        name: '',
        originalName: '',
        downloadURL: '',
        uuid: '',
      },
    },
    currentImageId: '',
    fileToUpload: {},
  }
}
export default {
  layout: 'board',
  async asyncData() {
    // lets get our board data before page load, and then after that await changes
    const boardsRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
    const boardData = []
    await boardsRef
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          try {
            for (const doc of querySnapshot.docs) {
              const data = doc.data()
              data.id = doc.id
              boardData.push(data)
            }
          } catch (err) {}
        }
      })
      .catch(function () {})
    return { boards: boardData }
  },

  data() {
    return initialState()
  },
  created() {
    const that = this
    $nuxt.$fire.firestore
      .collection(`users/${$nuxt.$fire.auth.currentUser.uid}/boards/`)
      .onSnapshot(function (querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          that.boards = []
          try {
            for (const doc of querySnapshot.docs) {
              const data = doc.data()
              data.id = doc.id
              that.boards.push(data)
            }
          } catch (err) {}
        }
      })
  },
  methods: {
    addBoard() {
      this.currentImageId = uuidv4()
      this.dialog = true
    },
    closeBox() {
      Object.assign(this.$data, initialState())
      this.dialog = false
    },
    createBoard() {
      const that = this
      if (this.$refs.form.validate()) {
        this.board.dateCreated = Date.now()
        this.$fire.firestore
          .collection('users')
          .doc(this.$fire.auth.currentUser.uid)
          .collection('boards')
          .doc(this.currentImageId)
          .set(this.board)
          .then(function (docRef) {
            that.dialog = false
            that.$refs.form.reset()
          })
          .catch(() => {})
      }
      that.fileToUpload = {}
      that.enableColor = false
      that.board.color = ''
      that.board.image = {
        name: '',
        originalName: '',
        downloadURL: '',
        uuid: '',
      }
    },
    chooseImage() {
      this.$refs.boardBackground.click()
    },
    onFileClicked($event) {
      $event.target.value = ''
    },
    onFileSelected(event) {
      try {
        const file = event.target.files[0]
        this.fileToUpload = {
          file,
          originalName: file.name,
          loading: false,
          progress: 0,
          success: false,
          error: false,
          previewPath: '',
          uuid: uuidv4(),
        }
        this.uploadFiles()
      } catch (err) {}
    },
    uploadFiles() {
      const itemFilename =
        this.fileToUpload.uuid + '-' + this.fileToUpload.file.name
      const itemName =
        'images' +
        '/' +
        this.$fire.auth.currentUser.uid +
        '/' +
        'boards' +
        '/' +
        this.currentImageId +
        '/' +
        itemFilename
      const itemRef = this.$fire.storage.ref().child(itemName)
      const itemMeta = {
        customMetadata: {
          owner: this.$fire.auth.currentUser.uid,
        },
      }
      const task = itemRef.put(this.fileToUpload.file, itemMeta)

      return task.on(
        'state_changed',
        (progress) => {
          this.fileToUpload.progress =
            (progress.bytesTransferred / progress.totalBytes) * 100
        },
        (error) => {
          this.fileToUpload.failed = true
          this.fileToUpload.error = error
          return false
        },
        async () => {
          const url = await task.snapshot.ref
            .getDownloadURL()
            .catch((e) => false)
          this.board.image = {
            name: itemFilename,
            originalName: this.fileToUpload.file.name,
            downloadURL: url,
            uuid: this.fileToUpload.uuid,
          }
        }
      )
    },
  },
}
</script>
<style lang="scss">
.v-dialog {
  border-radius: 15px;
  background-color: #fff;
  padding: 15px;
}
.upload-block {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
}
</style>
