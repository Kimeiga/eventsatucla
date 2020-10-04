<template>
  <div class="hello">
    <!-- {{ events }} -->
    <!-- {{ calendarEvents }} -->
    <FullCalendar ref="fullCalendar" id="calendar" :options="calendarOptions" />

    <!-- <vue-json-pretty :data="events"> </vue-json-pretty> -->
  </div>
</template>

<script>
import { db } from "../db";
// import VueJsonPretty from "vue-json-pretty";

import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    calendarEvents: function() {
      return this.events.map((event) => ({
        title: event.name,
        start: event.start_time,
        end: event.end_time,
        url: `https://facebook.com/event/${event.id}`,
        id: event.id,
        calendarId: "1",
        category: "time",
        dueDateClass: "",
        allDay:
          new Date(event.end_time) - new Date(event.start_time) >
          24 * 60 * 60 * 1000,
      }));
    },
    calendarOptions: function() {
      return {
        eventLimit: true, // for all non-TimeGrid views
        dayMaxEventRows: true, // for all non-TimeGrid views

        nowIndicator: true,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        events: this.calendarEvents,
        headerToolbar:
          window.innerWidth > 500
            ? {
                left: "dayGridMonth,timeGridWeek,timeGridDay",
                center: "title",
                right: "prev,today,next",
              }
            : {
                left: "dayGridMonth,timeGridWeek,timeGridDay",
                center: "title",
                right: "prev,today,next",
              },

        titleFormat:
          window.innerWidth > 500
            ? { year: "numeric", month: "long", day: "numeric" }
            : { year: "numeric", month: "short", day: "numeric" },
        views: {
          timeGrid: {
            eventLimit: 6,
            dayMaxEventRows: 6, // adjust to 6 only for timeGridWeek/timeGridDay
          },
          dayGridMonth: {
            // name of view
            titleFormat:
              window.innerWidth > 500
                ? { year: "numeric", month: "long" }
                : { year: "numeric", month: "short" },
            // other view-specific options here
          },
        },
        // header: {
        //   left: "prev",
        //   center: "title",
        //   right: "next",
        // },
        // titleFormat: {
        //   month: "MM YYYY",
        //   week: "MM YYYY",
        //   day: "MM YYYY",
        // },
        height: "100vh",
        dateClick: (info) => {
          let calendarApi = this.$refs.fullCalendar.getApi();
          // calendarApi.next()
          calendarApi.gotoDate(info.dateStr);
          calendarApi.changeView("timeGridDay");
        },
        eventClick: function(info) {
          info.jsEvent.preventDefault(); // don't let the browser navigate

          if (info.event.url) {
            window.open(info.event.url, "_blank");
          }
        },
      };
    },
  },
  data() {
    return {
      events: [],
    };
  },
  firebase: {
    events: db.ref("events"),
  },
  components: {
    // VueJsonPretty,
    FullCalendar,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

@media only screen and (max-device-width: 480px) {
  body {
    font-size: 10px;
  }
}
/* 
#calendar {
  max-width: 900px;
  margin: 40px auto;
} */
</style>
