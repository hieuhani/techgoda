<template>
  <div class="bg-gray-100 mt-6 border-t">
    <Container class="py-3">
      <div class="flex justify-between items-center lg:flex-row flex-col">
        <div class="max-w-96">
          <h3 class="text-gray-600 text-lg font-medium">Techgoda</h3>
          <p class="text-gray-600">
            We are a community of developers who are passionate about technology
            and programming.
          </p>
        </div>
        <div>
          <a
            href="https://github.com/hieuhani/techgoda"
            aria-label="Github repository for Techgoda"
            class="flex items-center space-x-2 text-gray-600 hover:underline"
          >
            <span>Check out Techgoda code</span>
            <Github class="w-6 h-6" />
          </a>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { Github } from "lucide-vue-next";
</script>
