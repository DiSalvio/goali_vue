<template>
  <span id="last-update-time-date" class="text-muted" :title="readableDate()">
    {{ elapsedTime() }} 
  </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
export default {
  props: {
    timestamp: {
      required: true,
      type: String
    }
  },
  methods: {
    elapsedTime () {
      return dayjs(this.timestamp).fromNow()
    },
    readableDate () {
      return dayjs(this.timestamp).format('llll')
    }
  }
}
</script>
