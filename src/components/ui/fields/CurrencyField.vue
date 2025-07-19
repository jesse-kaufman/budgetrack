<template>
  <div
    :class="{
      'flex flex-row items-center justify-between space-x-1': true,
      'cursor-pointer': !viewOnly && !editOnly,
    }"
    @click.stop="enableEdit"
  >
    <span>$</span>
    <div>
      <BaseInput
        v-show="edit && !viewOnly"
        v-bind="$attrs"
        ref="inputRef"
        class="w-25 text-right"
        type="number"
        step="0.01"
        min="0"
        :is-valid="isValid"
        :model-value="modelValue"
        @update:model-value="handleModelUpdate"
        @blur="handleLeave"
        @keyup.enter="handleLeave"
        @keydown.escape="handleEscape"
        @click.stop
      />
      <div
        v-show="!edit"
        :class="{
          'text-right ': true,
          'font-bold underline cursor-pointer': !viewOnly,
        }"
      >
        {{
          validateCurrency(modelValue)
            ? formatCurrency(modelValue, true, false) || "\u00A0"
            : ""
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, computed, ref } from "vue"
import BaseInput from "@/components/base/BaseInput.vue"
import { formatCurrency, validateCurrency } from "@/utils/currencyUtils"
import { useBudgetStore } from "@/stores/budgetStore"

const modelValue = defineModel({
  type: [String, Number],
  default: "",
})

const { viewOnly, editOnly } = defineProps({
  viewOnly: {
    type: Boolean,
    default: false,
  },
  editOnly: {
    type: Boolean,
    default: false,
  },
})

/** Whether or not edit mode (input field showing) is enabled. */
const edit = ref(editOnly)
/** Ref to store exposed ref from BaseInput. */
const inputRef = ref(null)
/** Whether or not the input is valid. */
const isValid = ref(true)

// Get app store from Pinia
const budgetStore = useBudgetStore()

const inputEl = computed(() => inputRef.value?.elementRef)

// Stores original value of input before enabling edit mode
let origValue = null

/**
 * Emits "update:modelValue" event if input changes and `val` is valid.
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
 * @param {string|number} val - Input to validate.
 * @returns {void}
 */
function validateInput(val) {
  const htmlValidity = inputEl.value?.checkValidity()
  const validCurrency = validateCurrency(val, { allowEmpty: true })

  // Set component validity state
  isValid.value = htmlValidity && validCurrency

  // If valid, set app store error to null
  if (isValid.value) return budgetStore.setErrorMsg(null)

  // If browser validation failed (i.e.: invalid number), show browser validation message
  inputEl.value?.reportValidity()

  // Save validation error to app store
  budgetStore.setErrorMsg(
    inputEl.value?.validationMessage || "Invalid currency format"
  )
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
  nextTick(() => inputEl.value.focus())
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
  // If edit only is true, do nothing
  if (editOnly) return
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
  // Rerun validation to clear any errors
  validateInput(origValue)
  // If edit only is true, do nothing else
  if (editOnly) return
  // Disable edit mode
  edit.value = false
}
</script>
