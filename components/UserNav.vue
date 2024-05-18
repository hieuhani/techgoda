<template>
  <DropdownMenu>
    <DropdownMenuTrigger title="User avatar">
      <Avatar>
        <AvatarImage
          :src="
            user.metadata?.avatar?.src ? user.metadata.avatar.src : '/hi.webp'
          "
          role="img"
          alt="Avatar"
        />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem as-child>
          <NuxtLink :to="`/user/${encodeId(user.id)}`">
            <UserIcon class="mr-2 h-4 w-4" />
            <span>My profile</span>
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <NuxtLink :to="`/user/my-posts`">
            <Newspaper class="mr-2 h-4 w-4" />
            <span>My posts</span>
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <NuxtLink to="/write?schema=post">
            <SquarePen class="mr-2 h-4 w-4" />
            <span> Write </span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Organizations</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="myOrganization in myOrganizationsWithUrl"
          :key="myOrganization.id"
          as-child
        >
          <NuxtLink :to="myOrganization.baseUrl">
            <Building class="mr-2 h-4 w-4" />
            <span>
              {{ myOrganization.name }}
            </span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as-child>
          <button @click="onLogOut" class="w-full">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
import {
  LogOut,
  Building,
  User as UserIcon,
  Newspaper,
  SquarePen,
} from "lucide-vue-next";
import type { MyOrganization, User } from "~/lib/publiz";
import { useBuildTenantUrl } from "~/lib/utils";
import { encodeId } from "~/lib/id";

interface Props {
  user: User;
  myOrganizations: MyOrganization[];
}
const { $refreshGetMyProfile } = useNuxtApp();

const props = defineProps<Props>();
const auth = useFirebaseAuth()!;
const onLogOut = async () => {
  await signOut(auth);
  if (typeof $refreshGetMyProfile === "function") {
    $refreshGetMyProfile({
      cache: "no-cache",
    });
  }
  window.location.reload();
};

const myOrganizationsWithUrl = computed(() => {
  return props.myOrganizations.map((org) => ({
    ...org,
    baseUrl: useBuildTenantUrl(org.slug),
  }));
});
</script>
