(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{497:function(t,e,n){var content=n(498);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("63c9496b",content,!0,{sourceMap:!1})},498:function(t,e,n){var r=n(21)(!1);r.push([t.i,'.theme--light.v-snack__wrapper{color:rgba(0,0,0,.87)}.theme--dark.v-snack__wrapper{color:#fff}.v-sheet.v-snack__wrapper{border-radius:4px}.v-sheet.v-snack__wrapper:not(.v-sheet--outlined){box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.v-sheet.v-snack__wrapper.v-sheet--shaped{border-radius:24px 4px}.v-snack{bottom:0;display:flex;font-size:.875rem;justify-content:center;left:0;pointer-events:none;right:0;top:0;width:100%}.v-snack:not(.v-snack--absolute){height:100vh;position:fixed;z-index:1000}.v-snack:not(.v-snack--centered):not(.v-snack--top){align-items:flex-end}.v-snack__wrapper{align-items:center;border-color:currentColor!important;display:flex;margin:8px;max-width:672px;min-height:48px;min-width:344px;padding:0;pointer-events:auto;position:relative;transition-duration:.15s;transition-property:opacity,transform;transition-timing-function:cubic-bezier(0,0,.2,1)}.v-snack__wrapper.theme--dark{background-color:#333;color:hsla(0,0%,100%,.87)}.v-snack__content{flex-grow:1;font-size:.875rem;font-weight:400;letter-spacing:.0178571429em;line-height:1.25rem;margin-right:auto;padding:14px 16px;text-align:left;text-align:initial}.v-snack__action{align-items:center;align-self:center;display:flex}.v-snack__action .v-ripple__container{display:none}.v-application--is-ltr .v-snack__action{margin-right:8px}.v-application--is-rtl .v-snack__action{margin-left:8px}.v-snack__action>.v-snack__btn.v-btn{padding:0 8px}.v-snack__btn{margin:0;min-width:auto}.v-snack--absolute{height:100%;position:absolute;z-index:1}.v-snack--centered{align-items:center}.v-snack--left{justify-content:flex-start;right:auto}.v-snack--multi-line .v-snack__wrapper{min-height:68px}.v-snack--right{justify-content:flex-end;left:auto}.v-snack:not(.v-snack--has-background) .v-snack__wrapper{box-shadow:none!important}.v-snack--bottom{top:auto}.v-snack--text .v-snack__wrapper:before{background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:.12;pointer-events:none;position:absolute;right:0;top:0}.v-snack--top{align-items:flex-start;bottom:auto}.v-snack--vertical .v-snack__wrapper{flex-direction:column}.v-snack--vertical .v-snack__wrapper .v-snack__action{align-self:flex-end;margin-bottom:8px}.v-snack-transition-enter.v-snack__wrapper{transform:scale(.8)}.v-snack-transition-enter.v-snack__wrapper,.v-snack-transition-leave-to.v-snack__wrapper{opacity:0}',""]),t.exports=r},503:function(t,e,n){var content=n(521);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("50966216",content,!0,{sourceMap:!1})},508:function(t,e,n){"use strict";var r=n(2),o=(n(44),n(51),n(172),n(9),n(11),n(57),n(108),n(10),n(8),n(18),n(19),n(14)),c=n(83),l=n(109);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:h({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},520:function(t,e,n){"use strict";n(503)},521:function(t,e,n){var r=n(21)(!1);r.push([t.i,"form[data-v-6ccc88b5]{width:50%;padding:40px 0;background-color:#fff;box-shadow:9px 10px 12px 1px rgba(0,0,0,.5);border-radius:15px}form h1[data-v-6ccc88b5]{margin:15px auto;text-align:center}form .row[data-v-6ccc88b5]{flex-direction:column;align-items:center;justify-content:center;padding:12px}form .row button[data-v-6ccc88b5]{margin-top:20px}form .row .link-register[data-v-6ccc88b5]{font-size:14px}form .row .link-register .register span[data-v-6ccc88b5]{display:inline-block;text-shadow:#a3a3a3 1px 1px 1px}@media screen and (max-width:767px){form[data-v-6ccc88b5]{width:80%}}",""]),t.exports=r},526:function(t,e,n){"use strict";var r=n(2),o=(n(37),n(44),n(57),n(497),n(136)),c=n(35),l=n(33),d=n(82),h=n(173),f=n(14),v=n(3),m=n(13);e.a=Object(f.a)(o.a,c.a,d.a,Object(h.b)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"==typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:l.a.options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,n=t.bottom,footer=t.footer,r=t.insetFooter,o=t.left,c=t.right,l=t.top;return{paddingBottom:Object(v.f)(n+footer+r),paddingLeft:this.app?Object(v.f)(o):void 0,paddingRight:this.app?Object(v.f)(c):void 0,paddingTop:Object(v.f)(e+l)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(m.e)("auto-height",this),0==this.timeout&&Object(m.d)('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(v.m)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(r.a)({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(v.m)(this)])},genWrapper:function(){var t=this,data=(this.hasBackground?this.setBackgroundColor:this.setTextColor)(this.color,{staticClass:"v-snack__wrapper",class:o.a.options.computed.classes.call(this),style:o.a.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{mouseenter:function(){return window.clearTimeout(t.activeTimeout)},mouseleave:this.setTimeout}});return this.$createElement("div",data,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},575:function(t,e,n){"use strict";n.r(e);var r={layout:"signin",data:function(){return{valid:!1,email:"",password:"",snackbar:!1,snackbarText:"No error message",pwdRules:[function(t){return!!t||"Password is required"},function(t){return/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(t)||"Password must be from 8 to 20 characters which contains at least one numeric digit, one uppercase and one lowercase letter"}],emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+/.test(t)||"E-mail must be valid"}]}},methods:{submit:function(){var t=this;this.$fire.auth.signInWithEmailAndPassword(this.email,this.password).then((function(t){$nuxt.$router.push("/")})).catch((function(e){t.snackbarText=e.message,t.snackbar=!0}))}}},o=(n(520),n(48)),c=n(61),l=n.n(c),d=n(504),h=n(485),f=n(508),v=n(488),m=n(526),k=n(580),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-form",{staticClass:"d-flex flex-column",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("h1",{staticClass:"fancy-title"},[t._v("Login")]),t._v(" "),n("v-row",[n("v-col",{attrs:{cols:"8",md:"8"}},[n("v-text-field",{attrs:{"prepend-icon":"mdi-email-outline",rules:t.emailRules,label:"E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),t._v(" "),n("v-col",{attrs:{cols:"8",md:"8"}},[n("v-text-field",{attrs:{"prepend-icon":"mdi-lock-outline",rules:t.pwdRules,label:"Password",required:"",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),n("div",{staticClass:"d-flex flex-column"},[n("v-btn",{staticClass:"mb-4",attrs:{color:"success",large:""},on:{click:t.submit}},[t._v("\n        Sign In\n      ")]),t._v(" "),n("p",{staticClass:"link-register"},[t._v("\n        Need an Account?\n        "),n("nuxt-link",{staticClass:"register",attrs:{to:"./register"}},[n("span",{staticStyle:{color:"#ff0000"}},[t._v("C")]),n("span",{staticStyle:{color:"#ff1100"}},[t._v("l")]),n("span",{staticStyle:{color:"#ff2200"}},[t._v("i")]),n("span",{staticStyle:{color:"#ff3300"}},[t._v("c")]),n("span",{staticStyle:{color:"#ff4400"}},[t._v("k")]),n("span",{staticStyle:{color:"transparent","text-shadow":"none"}},[t._v(" ")]),n("span",{staticStyle:{color:"#ff5500"}},[t._v("H")]),n("span",{staticStyle:{color:"#ff6600"}},[t._v("e")]),n("span",{staticStyle:{color:"#ff7700"}},[t._v("r")]),n("span",{staticStyle:{color:"#ff8800"}},[t._v("e")])])],1)],1)],1),t._v(" "),n("v-snackbar",{attrs:{timeout:3e3,fixed:"",top:"",center:"",color:"#F44336"},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n    "+t._s(t.snackbarText)+"\n  ")])],1)}),[],!1,null,"6ccc88b5",null);e.default=component.exports;l()(component,{VBtn:d.a,VCol:h.a,VForm:f.a,VRow:v.a,VSnackbar:m.a,VTextField:k.a})}}]);