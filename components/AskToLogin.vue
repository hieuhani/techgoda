<template>
  <slot v-if="$currentUser" />
  <Dialog v-else>
    <DialogTrigger as-child>
      <div class="relative">
        <div class="absolute inset-0" />
        <slot />
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sign in</DialogTitle>
      </DialogHeader>
      <SignInForm />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const { $currentUser } = useNuxtApp();
</script>
