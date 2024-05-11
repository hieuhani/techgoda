<template>
  <Container class="grid pt-3 grid-cols-12 gap-3">
    <div class="col-span-12 lg:col-span-2">
      <ul class="flex flex-row lg:flex-col flex-nowrap overflow-x-auto">
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <Sparkle />
            <span>For you</span>
          </a>
        </li>
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <UserSearch />
            <span>Following</span>
          </a>
        </li>
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <Users />
            <span>Friends</span>
          </a>
        </li>
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <Telescope />
            <span>Explore</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="col-span-12 lg:col-span-6 space-y-4">
      <Carousel class="relative">
        <CarouselContent>
          <CarouselItem v-if="$currentUser" class="basis-auto">
            <NewStoryButton />
          </CarouselItem>
          <CarouselItem v-for="i in 5" :key="i" class="basis-auto">
            <button
              class="w-36 bg-gray-100 rounded-lg overflow-hidden h-full relative"
            >
              <img
                src="https://images.unsplash.com/photo-1714675520565-5cab94e5046b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="hover:scale-110 transition-transform duration-300 object-cover h-full w-full"
              />
              <div class="absolute bottom-0 left-0 right-0 text-white py-2">
                <h3 class="z-20 relative">Hieu Tran</h3>
                <div
                  class="inset-0 absolute bg-gradient-to-t from-gray-900 to-transparent"
                />
              </div>
            </button>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="left-2 disabled:hidden" />
        <CarouselNext class="right-2" />
      </Carousel>
      <NewFeedPost v-if="$currentUser" />
    </div>
    <div class="col-span-12 lg:col-span-4">
      <div>Side bar</div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { Sparkle, Users, Telescope, UserSearch } from "lucide-vue-next";

const { $currentUser } = useNuxtApp();
</script>
