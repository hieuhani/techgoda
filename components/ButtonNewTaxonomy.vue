<template>
  <Dialog>
    <DialogTrigger>
      <PlusCircleIcon class="h-4 w-4" />
    </DialogTrigger>

    <DialogContent>
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle> New Taxonomy </DialogTitle>
        </DialogHeader>
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="slug">
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="mt-3">
          <Button>Save</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { PlusCircleIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";

type FormValues = {
  name: string;
  slug: string;
};
const emits = defineEmits<{
  (e: "submit", payload: FormValues): void;
}>();

const validationSchema = {
  name: "required",
  slug: "required",
};

const form = useForm({
  initialValues: {
    name: "",
    slug: "",
  },
  validationSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emits("submit", values);
});
</script>
