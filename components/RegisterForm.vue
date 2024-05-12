<template>
  <form @submit="onSubmit" class="space-y-2">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="passwordConfirmation">
      <FormItem>
        <FormLabel>Confirm password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="loading">Register</Button>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as z from "zod";
import { useToast } from "./ui/toast";

const auth = useFirebaseAuth()!;
const { toast } = useToast();

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      passwordConfirmation: z.string(),
    })
    .refine(
      (values) => {
        return values.password === values.passwordConfirmation;
      },
      {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      }
    )
);
const loading = ref(false);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    navigateTo("/");
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.code,
    });
  }
  loading.value = false;
});
</script>
