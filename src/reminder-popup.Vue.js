let popup_template = `
  <div id="reminder-popup" class="display-none opacity-zero">
    <section>
      <h1>REMINDER</h1>
      <p></p>
      <p></p>
      <input type="button" id="reminder-popup-close-btn" class="material-icons close-btn" value="close" />
    </section>
  </div>
  `;

Vue.component('reminder-popup', {
  //props: [],
  template: popup_template,
  data: function() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
});

let vueReminderPopup = new Vue({
  el: '#reminder-popup-vue-instance',
  data: {}
});
