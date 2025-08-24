<template>
  <div
    :class="{
      'cursor-pointer': !viewOnly,
    }"
    @click.stop="enableEdit"
  >
    <BaseInput
      v-show="edit && !viewOnly"
      v-bind="$attrs"
      ref="inputRef"
      :modelValue="modelValue"
      :isValid="isValid"
      @update:modelValue="handleModelUpdate"
      @blur="handleLeave"
      @keyup.enter="handleLeave"
      @keydown.escape="handleEscape"
      @click.stop
    />
    <div
      v-show="!edit"
      v-bind="$attrs"
      class="text-left"
      :class="{
        'font-bold underline cursor-pointer': !viewOnly,
      }"
    >
      {{ modelValue === "" ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : modelValue }}
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from "vue"
import BaseInput from "#base/BaseInput.vue"
import { useBudgetStore } from "#stores/budgetStore.js"

// Don't automatically apply attrs to root element in this component and only apply where using v-bind="$attrs"
defineOptions({ inheritAttrs: false })

const modelValue = defineModel({
  type: [String, Number],
  default: "",
})

const { viewOnly } = defineProps({
  viewOnly: {
    type: Boolean,
    default: false,
  },
})

/** Whether or not edit mode (input field showing) is enabled. */
const edit = ref(false)
/** Ref to store exposed ref from BaseInput. */
const inputRef = ref(null)
/** Whether or not the input is valid. */
const isValid = ref(true)

/** Holds the app store. */
const budgetStore = useBudgetStore()
/** Holds reference to the actual input element in BaseInput. */
const inputEl = computed(() => inputRef.value?.elementRef)

/** Stores original value of input before enabling edit mode. */
let origValue = null

/**
 * Updates and validates user input when model value changes.
 * @param {string|number} val - Input value to emit if valid.
 */
function handleModelUpdate(val) {
  // Update modelValue to equal value from input
  modelValue.value = val

  // Validate input
  validateInput(val)
}

/**
 * Validates user input and sets app store error if not valid.
 * @param {string} val - Value to validate.
 * @returns {void}
 */
function validateInput(val) {
  const htmlValidity = inputEl.value?.checkValidity()
  const validText = typeof val === "string" && val !== ""

  // Set component validity state
  isValid.value = htmlValidity && validText

  // If valid, set app store error to null
  if (isValid.value) return budgetStore.setErrorMsg(null)

  // If browser validation failed (i.e.: invalid number), show browser validation message
  inputEl.value?.reportValidity()

  // Save validation error to app store
  budgetStore.setErrorMsg(inputEl.value?.validationMessage || "Invalid text")
}

/**
 * Enables edit mode for the current inputEl.
 */
function enableEdit() {
  // Do not allow edit mode if viewOnly is true
  if (viewOnly) return
  // Do not allow edit mode if form state is invalid
  if (!budgetStore.formIsValid) return
  // Edit mode is off, store the original value before enabling edit mode (for reverting via ESC)
  if (!edit.value) origValue = modelValue.value
  // Show the text input
  edit.value = true
  // On next tick, focus the input
  nextTick(() => inputEl.value?.focus())
}

/**
 * Handle leaving the input element by disabling edit mode if input is valid, otherwise stay in edit mode.
 * @returns {void}
 */
function handleLeave() {
  // Validate the input when leaving
  validateInput(modelValue.value)
  // If input is not valid, do not let user exit edit mode
  if (!isValid.value) return enableEdit()
  // Disable edit mode if input is valid
  edit.value = false
}

/**
 * Handles user hitting the ESC key when an input is in edit mode.
 * @param {object} e - KeyboardEvent from browser.
 */
function handleEscape(e) {
  e.preventDefault()
  // Revert modelValue to origValue stored when edit mode was enabled
  modelValue.value = origValue
  // Disable edit mode
  edit.value = false
}
</script>
