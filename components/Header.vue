<template>
  <div class="bg-white py-4 border-b">
    <div
      class="flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <NuxtLink to="/" class="text-primary flex items-center">
          <span class="text-2xl font-medium">Techgoda</span>
        </NuxtLink>
      </div>
      <div class="flex space-x-2">
        <template v-if="false">
          <div>Authenticated</div>
        </template>
        <template v-else>
          <Dialog>
            <DialogTrigger>
              <a
                href="/login"
                @click.prevent=""
                :class="buttonVariants({ variant: 'secondary' })"
              >
                Đăng nhập
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Đăng nhập</DialogTitle>
              </DialogHeader>
              <SignInForm />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <a href="/register" @click.prevent="" :class="buttonVariants()">
                Đăng ký
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Đăng ký</DialogTitle>
              </DialogHeader>
              <RegisterForm />
            </DialogContent>
          </Dialog>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Newspaper } from "lucide-vue-next";
import { buttonVariants } from "./ui/button";
</script>
