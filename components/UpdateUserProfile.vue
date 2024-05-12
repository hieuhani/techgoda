<template>
  <Button variant="link" class="px-1" @click="toggleDialog">
    <SquarePen />
  </Button>
  <Dialog :open="open" @update:open="toggleDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update profile</DialogTitle>
      </DialogHeader>
      <form @submit="onSubmit" class="space-y-2">
        <FormField v-slot="{ componentField }" name="displayName">
          <FormItem>
            <FormLabel>Display Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" :disabled="loading">Save</Button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { SquarePen } from "lucide-vue-next";
import * as z from "zod";
import { updateMyProfile } from "~/lib/publiz";
import { useToast } from "./ui/toast";

const { toast } = useToast();
const open = ref(false);
const loading = ref(false);
const { $refreshGetMyProfile, $currentUser } = useNuxtApp();

const formSchema = toTypedSchema(
  z.object({
    displayName: z.string().min(2).max(30),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    displayName: $currentUser?.value?.displayName ?? "",
  },
});

const toggleDialog = () => {
  if (loading.value) return;
  open.value = !open.value;
};

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true;
    await updateMyProfile(values);
    open.value = false;
    toast({
      title: "Success",
      description: "Profile updated",
    });
    if (typeof $refreshGetMyProfile === "function") {
      $refreshGetMyProfile();
    }
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.code,
    });
  }
  loading.value = false;
});
</script>
