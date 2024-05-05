<template>
  <div class="bg-white py-4 border-b">
    <Container class="flex items-center">
      <div class="flex justify-start mr-4">
        <NuxtLink to="/" class="text-primary flex items-center">
          <span class="text-2xl font-medium">Techgoda</span>
        </NuxtLink>
      </div>
      <ul class="flex space-x-1">
        <li v-for="item in menuItems" :key="item.path">
          <NuxtLink
            :to="item.path"
            :class="[
              'inline-flex px-4 py-2 hover:bg-primary/20 hover:text-primary rounded-full',
              item.path === '/'
                ? item.path === route.fullPath
                  ? 'text-white bg-primary'
                  : 'text-gray-800 hover:bg-gray-50'
                : route.fullPath.startsWith(item.path)
                ? 'text-white bg-primary'
                : 'text-gray-800 hover:bg-gray-50',
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
      <div class="flex space-x-2 ml-auto">
        <template v-if="$currentUser">
          <UserNav :user="$currentUser" :my-organizations="$myOrganizations" />
        </template>
        <template v-else>
          <Dialog>
            <DialogTrigger>
              <a
                href="/login"
                @click.prevent=""
                :class="buttonVariants({ variant: 'secondary' })"
              >
                Sign in
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign in</DialogTitle>
              </DialogHeader>
              <SignInForm />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <a href="/register" @click.prevent="" :class="buttonVariants()">
                Sign up
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign up</DialogTitle>
              </DialogHeader>
              <RegisterForm />
            </DialogContent>
          </Dialog>
        </template>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { buttonVariants } from "./ui/button";
const { $currentUser, $myOrganizations } = useNuxtApp();

const route = useRoute();
const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Forums",
    path: "/forums",
  },
  {
    name: "Devfeeds",
    path: "/devfeeds",
  },
];
</script>
