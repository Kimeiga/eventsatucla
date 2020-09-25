<template>
  <div class="hello">
    <!-- {{ events }} -->
    <!-- {{ calendarEvents }} -->
    <!-- <FullCalendar id="calendar" :options="calendarOptions" /> -->
    <div id="menu">
      <span id="menu-navi">
        <button
          type="button"
          class="btn btn-default btn-sm move-today"
          data-action="move-today"
        >
          Today
        </button>
        <button
          type="button"
          class="btn btn-default btn-sm move-day"
          data-action="move-prev"
        >
          <i
            class="calendar-icon ic-arrow-line-left"
            data-action="move-prev"
          ></i>
        </button>
        <button
          type="button"
          class="btn btn-default btn-sm move-day"
          data-action="move-next"
        >
          <i
            class="calendar-icon ic-arrow-line-right"
            data-action="move-next"
          ></i>
        </button>
      </span>
      <span id="renderRange" class="render-range"></span>
    </div>
    <calendar
      style="height: 200vh"
      :calendars="calendarList"
      :schedules="calendarEvents"
      :view="view"
      :taskView="taskView"
      :scheduleView="scheduleList"
      :theme="theme"
      :week="week"
      :month="month"
      :timezones="timezones"
      :disableDblClick="disableDblClick"
      :isReadOnly="isReadOnly"
      :template="template"
      :useCreationPopup="useCreationPopup"
      :useDetailPopup="useDetailPopup"
    />
    <!-- <vue-json-pretty :data="events"> </vue-json-pretty> -->
  </div>
</template>

<script>
import { db } from "../db";
// import VueJsonPretty from "vue-json-pretty";

import "tui-calendar/dist/tui-calendar.css";
import { Calendar } from "@toast-ui/vue-calendar";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

// import FullCalendar from "@fullcalendar/vue";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

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
      }));
    },
    calendarOptions: function() {
      return {
        // plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        events: this.calendarEvents,
        headerToolbar: {
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "prevYear,prev,next,nextYear",
        },
        height: "100vh",
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
      view: "week",

      calendarList: [
        {
          id: "0",
          name: "home",
        },
        {
          id: "1",
          name: "office",
        },
      ],
      scheduleList: [
        {
          id: "1",
          calendarId: "1",
          title: "my schedule",
          category: "time",
          dueDateClass: "",
          start: "2018-10-18T22:30:00+09:00",
          end: "2020-10-19T02:30:00+09:00",
        },
        {
          id: "2",
          calendarId: "1",
          title: "second schedule",
          category: "time",
          dueDateClass: "",
          start: "2018-10-18T17:30:00+09:00",
          end: "2018-10-19T17:31:00+09:00",
        },
      ],
      taskView: false,
      scheduleView: ["time"],
      theme: {
        "month.dayname.height": "30px",
        "month.dayname.borderLeft": "1px solid #ff0000",
        "month.dayname.textAlign": "center",
        "week.today.color": "#333",
        "week.daygridLeft.width": "100px",
        "week.timegridLeft.width": "100px",
      },
      week: {
        // narrowWeekend: true,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: false,
      },
      month: {
        visibleWeeksCount: 4,
      },
      timezones: [
        {
          timezoneOffset: 540,
          displayLabel: "GMT+09:00",
          tooltip: "Seoul",
        },
        {
          timezoneOffset: -420,
          displayLabel: "GMT-08:00",
          tooltip: "Los Angeles",
        },
      ],
      disableDblClick: true,
      isReadOnly: false,
      template: {
        milestone: function(schedule) {
          return `<span style="color:red;">${schedule.title}</span>`;
        },
        milestoneTitle: function() {
          return "MILESTONE";
        },
      },
      useCreationPopup: true,
      useDetailPopup: false,
    };
  },
  firebase: {
    events: db.ref("events"),
  },
  components: {
    // VueJsonPretty,
    Calendar,
    // FullCalendar,
  },
};
</script>

<style>
/* .hello {
  height: 100vh;
} */
html,
body {
  margin: 0;
  padding: 0;
  /* font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px; */
}

/* #calendar {
  max-width: 1100px;
  margin: 0px auto;
} */
</style>
