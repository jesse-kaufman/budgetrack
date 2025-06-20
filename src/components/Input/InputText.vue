<template>
  <template v-if="loading">
    <div class="skeleton"></div>
  </template>
  <template v-else>
    <BaseInput
      v-show="edit"
      v-bind="$attrs"
      ref="inputRef"
      type="text"
      :invalid="invalidInput"
      :model-value="modelValue"
      @input="emitIfValid"
      @blur="handleLeave"
      @keyup.enter="handleLeave"
    />
    <div
      v-show="!edit"
      class="font-semibold underline cursor-pointer"
      @click="enableEdit"
    >
      {{ modelValue || "&nbsp;" }}
    </div>
  </template>
</template>

<script setup>
import { nextTick, ref } from "vue"
import BaseInput from "@/components/Base/BaseInput.vue"

const { modelValue } = defineProps({
  modelValue: {
    type: [Number, String],
    default: "",
  },
  loading: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(["update:modelValue", "error"])

const edit = ref(false)
const inputRef = ref(null)
const invalidInput = ref(false)

function emitIfValid(e) {
  const val = e.target.value

  validateInput(e)

  if (!invalidInput.value) {
    emit("update:modelValue", val)
    emit("error", null)
  }
}

function validateInput(e) {
  const htmlValidity = e.target.checkValidity()
  e.target.reportValidity()

  invalidInput.value = !htmlValidity

  if (!htmlValidity) {
    emit("error", e.target.validationMessage)
  }
}

function enableEdit() {
  edit.value = true
  nextTick(() => inputRef.value?.focus())
}

function handleLeave(e) {
  validateInput(e)
  if (invalidInput.value) {
    enableEdit()
    return
  }
  edit.value = false
}
</script>
