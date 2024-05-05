<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/4966345?v=4"
          alt=""
        />
        <AvatarFallback>GP</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuGroup>
        <!-- <DropdownMenuItem>
          <UserIcon class="mr-2 h-4 w-4" />
          <span>Trang cá nhân</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings class="mr-2 h-4 w-4" />
          <span>Cài đặt</span>
        </DropdownMenuItem> -->
        <DropdownMenuItem as-child>
          <NuxtLink to="/write">
            <Users class="mr-2 h-4 w-4" />
            <span> Write </span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <!-- <DropdownMenuLabel>Organizations</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="myOrganization in myOrganizationsWithUrl"
          :key="myOrganization.id"
          as-child
        >
          <NuxtLink :to="myOrganization.baseUrl">
            <Users class="mr-2 h-4 w-4" />
            <span>
              {{ myOrganization.name }}
            </span>
          </NuxtLink>
        </DropdownMenuItem>

        <DropdownMenuItem asChild v-if="!tenant">
          <NuxtLink to="/new_organization">
            <Plus class="mr-2 h-4 w-4" />
            <span>Create organization</span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuGroup> -->

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
  Plus,
  Settings,
  User as UserIcon,
  Users,
} from "lucide-vue-next";
import { type MyOrganization, type User } from "~/lib/publiz";
import { useBuildTenantUrl } from "~/lib/utils";

interface Props {
  user: User;
  myOrganizations: MyOrganization[];
}

const tenant = useTenant();

const props = defineProps<Props>();
const auth = useFirebaseAuth()!;
const onLogOut = () => {
  signOut(auth);
  window.location.reload();
};

const myOrganizationsWithUrl = computed(() => {
  return props.myOrganizations.map((org) => ({
    ...org,
    baseUrl: useBuildTenantUrl(org.slug),
  }));
});
</script>
