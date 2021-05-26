<template>
  <v-form v-model="valid" class="d-flex flex-column">
    <h1 class="fancy-title">Login</h1>
    <v-row>
      <v-col cols="8" md="8">
        <v-text-field
          v-model="email"
          prepend-icon="mdi-email-outline"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="8" md="8">
        <v-text-field
          v-model="password"
          prepend-icon="mdi-lock-outline"
          :rules="pwdRules"
          label="Password"
          required
          type="password"
        ></v-text-field>
      </v-col>
      <div class="d-flex flex-column">
        <v-btn color="success" class="mb-4" large @click="submit">
          Sign In
        </v-btn>
        <p class="link-register">
          Need an Account?
          <nuxt-link to="./register" class="register">
            <span style="color: #ff0000">C</span
            ><span style="color: #ff1100">l</span
            ><span style="color: #ff2200">i</span
            ><span style="color: #ff3300">c</span
            ><span style="color: #ff4400">k</span
            ><span style="color: transparent; text-shadow: none">&nbsp;</span
            ><span style="color: #ff5500">H</span
            ><span style="color: #ff6600">e</span
            ><span style="color: #ff7700">r</span
            ><span style="color: #ff8800">e</span>
          </nuxt-link>
        </p>
      </div>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      fixed
      top
      center
      color="#F44336"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  layout: 'signin',
  data: () => ({
    valid: false,
    email: '',
    password: '',
    snackbar: false,
    snackbarText: 'No error message',
    pwdRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(v) ||
        'Password must be from 8 to 20 characters which contains at least one numeric digit, one uppercase and one lowercase letter',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    submit() {
      const that = this
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          // eslint-disable-next-line no-undef
          $nuxt.$router.push('/')
        })
        .catch((err) => {
          that.snackbarText = err.message
          that.snackbar = true
        })
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 50%;
  padding: 40px 0;
  background-color: white;
  box-shadow: 9px 10px 12px 1px rgb(0 0 0 / 50%);
  border-radius: 15px;
  h1 {
    margin: 15px auto;
    text-align: center;
  }
  .row {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;
    button {
      margin-top: 20px;
    }
    .link-register {
      font-size: 14px;
      .register {
        span {
          display: inline-block;
          text-shadow: #a3a3a3 1px 1px 1px;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    width: 80%;
  }
}
</style>
