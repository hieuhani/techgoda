<template>
  <Header />
  <slot v-if="organization" />
  <div class="text-center py-2">
    <div class="text-gray-600 text-sm">
      <span class="mr-1/2">Powered by</span>
      <a href="https://techgoda.net" class="text-gray-600 hover:underline">
        Techgoda
      </a>
    </div>
  </div>
  <div class="h-16 lg:hidden" />
</template>

<script setup lang="ts">
import {
  useGetOrganizationById,
  type OrganizationRole,
  getOrganizationRoles,
} from "~/lib/publiz";

const tenant = useTenant();
const { $myOrganizations } = useNuxtApp();
const { data: dataOrganizationResponse, refresh: refreshOrganization } =
  useGetOrganizationById(tenant);

const organization = computed(() => dataOrganizationResponse.value?.data);

useSeoMeta({
  title: "Techgoda",
  ogTitle: "Techgoda",
  description: "Techgoda is a publishing platform for developers.",
  ogDescription: "Techgoda is a publishing platform for developers.",
});

const organizationRoles = ref<OrganizationRole[]>([]);

const myWorkingOrganization = computed(() => {
  return $myOrganizations?.value?.find(
    (org) => org.id === organization.value?.id
  );
});

const organizationRolesDict = computed(() => {
  return organizationRoles.value.reduce<Record<string, string>>((acc, role) => {
    acc[role.id] = role.name;
    return acc;
  }, {});
});

const amIOrganizationAdmin = computed(() => {
  return (
    myWorkingOrganization.value?.organizationRoleIds
      .map((roleId) => organizationRolesDict.value?.[roleId])
      .includes("Administrator") || false
  );
});

const fetchOrganizationRoles = async () => {
  if (organization.value?.id) {
    const { data } = await getOrganizationRoles(organization.value?.id);
    organizationRoles.value = data;
  }
};
watchEffect(() => {
  if (myWorkingOrganization && typeof window !== "undefined") {
    fetchOrganizationRoles();
  }
});

provide("organization", organization);
provide("amIOrganizationAdmin", amIOrganizationAdmin);
provide("refreshOrganization", refreshOrganization);
</script>
