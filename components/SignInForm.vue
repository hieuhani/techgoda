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

    <Button
      type="submit"
      class="w-full"
      :disabled="loading || Object.keys(form.errors.value).length > 0"
      >Sign in</Button
    >
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
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import GoogleLogo from "@/components/icons/GoogleLogo.vue";
import { Github } from "lucide-vue-next";
import * as z from "zod";
import { useToast } from "./ui/toast";

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const auth = useFirebaseAuth()!;
const { toast } = useToast();
const loading = ref(false);

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
);

const form = useForm({
  validationSchema: formSchema,
  validateOnMount: true,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true;
    await signInWithEmailAndPassword(auth, values.email, values.password);
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
    await signInWithPopup(auth, githubProvider);
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
    await signInWithPopup(auth, googleProvider);
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.code,
    });
  }
  loading.value = false;
};
</script>
