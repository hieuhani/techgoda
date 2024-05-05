<template>
  <Container class="grid pt-3 grid-cols-12 gap-3">
    <div class="col-span-2">
      <div>SD</div>
    </div>
    <div class="col-span-7 space-y-4">
      <Carousel class="relative">
        <CarouselContent>
          <CarouselItem class="basis-auto">
            <button class="w-36 bg-gray-100 rounded-lg overflow-hidden">
              <div class="overflow-hidden h-44">
                <img
                  src="https://images.unsplash.com/photo-1714675520565-5cab94e5046b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  class="hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div class="pt-5 pb-3 relative">
                <div
                  class="bg-primary text-white w-9 h-9 rounded-full grid place-content-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-100 border-2"
                >
                  <Plus />
                </div>
                <h3 class="font-medium text-gray-500">Create story</h3>
              </div>
            </button>
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
      <div class="bg-white rounded-lg px-3 py-3">
        <div class="flex space-x-3 mb-3">
          <Avatar class="h-10 w-10 text-md">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/4966345?v=4"
              alt=""
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <button
            class="bg-gray-100 flex-1 text-left px-3 rounded-full text-gray-600"
          >
            What's on your mind, Hieu?
          </button>
        </div>
        <div class="flex justify-around ml-12">
          <button class="text-left flex items-center space-x-2">
            <Image />
            <span>Image</span>
          </button>

          <button class="text-left flex items-center space-x-2">
            <Vote />
            <span>Poll</span>
          </button>
          <button class="text-left flex items-center space-x-2">
            <CalendarDays />
            <span>Event</span>
          </button>
          <button class="text-left flex items-center space-x-2">
            <MapPin />
            <span>Location</span>
          </button>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      <div>SD</div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { Plus, Image, Vote, CalendarDays, MapPin } from "lucide-vue-next";
</script>
