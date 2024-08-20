<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <PencilIcon v-if="metaSchema" class="h-4 w-4" />
      <PlusCircleIcon v-else class="h-4 w-4" />
    </DialogTrigger>

    <DialogContent>
      <form v-if="open" @submit="onSubmit">
        <DialogHeader>
          <DialogTitle> Add meta schema</DialogTitle>
        </DialogHeader>
        <div class="space-y-2 mb-3">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="schema">
            <FormItem>
              <FormLabel>Schema</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="target">
            <FormItem>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="version">
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button>Save</Button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { PlusCircleIcon, PencilIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";
import type { MetaSchema } from "~/lib/publiz";

type FormValues = {
  name: string;
  schema: string;
  target: string;
  version: number;
  updateMetaSchemaId?: number;
};
const emits = defineEmits<{
  (e: "submit", payload: FormValues): void;
}>();

const props = defineProps<{
  metaSchema?: MetaSchema;
}>();

const open = ref(false);

const validationSchema = {
  name: "required",
  schema: "required",
  target: "required",
  version: "required",
};

const form = useForm({
  initialValues: {
    name: props.metaSchema?.name ?? "",
    schema: props.metaSchema?.schema
      ? JSON.stringify(props.metaSchema.schema, null, "\t")
      : "",
    target: props.metaSchema?.target ?? "post",
    version: props.metaSchema?.version ?? 1,
  },
  validationSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emits("submit", {
    ...values,
    updateMetaSchemaId: props.metaSchema?.id,
  });
});
</script>
