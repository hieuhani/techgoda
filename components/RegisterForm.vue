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
    <Button type="submit" class="w-full" :disabled="loading">Register</Button>
    <Button
      type="button"
      class="flex bg-black hover:bg-black/80 text-white w-full"
      @click="signInWithGithub"
    >
      <Github />
      <span class="ml-2">Sign in with Github</span>
    </Button>
    <Button
      type="button"
      class="flex bg-red-500 hover:bg-red-400 text-white w-full"
      @click="signInWithGoogle"
    >
      <span class="text-xl">
        <GoogleLogo />
      </span>
      <span class="ml-2">Sign in with Google</span>
    </Button>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import * as z from "zod";
import { Github } from "lucide-vue-next";
import { useToast } from "./ui/toast";
import GoogleLogo from "@/components/icons/GoogleLogo.vue";
import { firebaseAuth } from "~/lib/firebase";

const { toast } = useToast();
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

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
  validateOnMount: true,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true;
    await createUserWithEmailAndPassword(
      firebaseAuth,
      values.email,
      values.password
    );
    navigateTo("/");
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.code,
    });
  }
  loading.value = false;
});

const signInWithGithub = async () => {
  try {
    loading.value = true;
    await signInWithPopup(firebaseAuth, githubProvider);
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.code,
    });
  }
  loading.value = false;
};

const signInWithGoogle = async () => {
  try {
    loading.value = true;
    await signInWithPopup(firebaseAuth, googleProvider);
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.code,
    });
  }
  loading.value = false;
};
</script>
