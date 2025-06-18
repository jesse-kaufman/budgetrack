<template>
  <div
    class="flex flex-row items-center justify-between space-x-1 cursor-pointer h-7"
    @click="enableEdit"
  >
    <span>$</span>
    <div>
      <BaseInput
        v-show="edit"
        v-bind="$attrs"
        ref="inputRef"
        class="w-25"
        type="number"
        :invalid="invalidInput"
        :model-value="modelValue"
        @input="emitIfValid"
        @blur="handleLeave"
        @keyup.enter="handleLeave"
      />
      <div
        v-show="!edit"
        class="font-semibold text-right underline cursor-pointer"
      >
        {{ formatCurrency(modelValue, true, false) || "&nbsp;" }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue"
import BaseInput from "./BaseInput.vue"
import { formatCurrency, validateCurrency } from "@/utils/currencyUtils.js"

const { modelValue } = defineProps({
  modelValue: {
    type: [Number, String],
    default: "",
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
    emit("update:modelValue", val === "" ? "" : Number(val))
    emit("error", null)
  }
}

function validateInput(e) {
  const htmlValidity = e.target.checkValidity()
  e.target.reportValidity()
  const validCurrency = validateCurrency(e.target.value, { allowEmpty: true })

  invalidInput.value = !htmlValidity || !validCurrency

  if (!htmlValidity) {
    emit("error", e.target.validationMessage)
  } else if (!validCurrency) {
    emit("error", "Invalid currency format")
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
