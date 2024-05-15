<template>
  <div>
    <h3 class="text-xl font-medium text-gray-600">Settings</h3>
    <h4 class="text-gray-600">Organization contacts</h4>
    <form @submit="onSubmit" class="space-y-2" v-if="schema">
      <FormField
        v-for="(value, field) in schema.properties"
        v-slot="{ componentField }"
        :name="field"
        :key="field"
      >
        <FormItem>
          <FormLabel>{{ fieldsDictionary[field] }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full"> Change </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import {
  useGetMetaSchema,
  type MetadataSchema,
  type Organization,
  updateOrganizationMetadata,
} from "~/lib/publiz";

const { toast } = useToast();
const { data: dataSchema } = await useGetMetaSchema("organization:1");
const schema = computed(() => dataSchema.value?.data.schema as MetadataSchema);
const organization = inject<Ref<Organization | undefined>>("organization");
const refreshOrganization = inject<() => Promise<unknown>>(
  "refreshOrganization"
);
const fieldsDictionary: Record<string, string> = {
  email: "Email",
  phone: "Phone",
  address: "Address",
  website: "Website",
  linkedin: "LinkedIn",
};

const initialOrganization = computed<Record<string, string>>(() =>
  Object.keys(organization?.value?.metadata || {}).reduce((prev, current) => {
    if (fieldsDictionary[current]) {
      return {
        ...prev,
        [current]: organization?.value?.metadata[current] || "",
      };
    }
    return {
      ...prev,
    };
  }, {})
);

const form = useForm({
  initialValues: initialOrganization.value,
});

const onSubmit = form.handleSubmit(async (values) => {
  const metadata = Object.keys(values).reduce<Record<string, string>>(
    (prev, current) => {
      if (values[current]) {
        return {
          ...prev,
          [current]: values[current],
        };
      }
      return {
        ...prev,
      };
    },
    {}
  );

  try {
    await updateOrganizationMetadata(organization?.value?.id!, {
      metadata,
      metaSchemaId: dataSchema.value?.data.id!,
    });
    refreshOrganization?.();
    toast({
      title: "Update successful",
    });
  } catch (error: any) {
    const { response: { _data: errorResponse } = { _data: undefined } } = ({} =
      error);
    if (errorResponse?.code === 400102) {
      const { extra = [] } = errorResponse;
      extra.forEach((error: { instancePath: string; message: string }) => {
        form.setFieldError(error.instancePath.substring(1), error.message);
      });
    }
  }
});
</script>
