<template>
  <Container v-if="dataUser" class="mt-2">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 lg:col-span-9 bg-white rounded-lg">
        <UserCard v-if="user" :user="user" />
      </div>
      <div class="col-span-3">SD</div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { decodeId } from "~/lib/id";
import { useGetUser } from "~/lib/publiz";

const route = useRoute();
const idString = String(route.params.id);
const id = idString ? decodeId(idString) : 0;

const { data: dataUser } = useGetUser(id);
const user = computed(() => dataUser.value?.data);
</script>
