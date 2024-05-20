<template>
  <div class="rounded-xl overflow-hidden space-y-2 pb-2">
    <div v-for="(value, key) in organizationMetadata">
      <label class="text-primary text-sm font-medium uppercase leading-none">
        {{ fieldDictionary[key] }}
      </label>
      <p class="leading-tight">{{ value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  metadata: any;
}>();
const fieldDictionary: Record<string, string> = {
  address: "Address",
  phone: "Phone",
  email: "Email",
  website: "Website",
};
const organizationMetadata = computed(() => {
  const meta = props.metadata || {};
  return Object.keys(fieldDictionary).reduce<Record<string, string>>(
    (prev, current) => {
      if (meta[current]) {
        return {
          ...prev,
          [current]: meta[current],
        };
      }
      return prev;
    },
    {}
  );
});
</script>
