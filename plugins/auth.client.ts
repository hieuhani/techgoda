import { firebaseAuth } from "~/lib/firebase";
import { useGetMyOrganizations, useGetMyProfile } from "~/lib/publiz";

export default defineNuxtPlugin((nuxtApp) => {
  const { data: myProfileResponse, refresh: refreshGetMyProfile } =
    useGetMyProfile({
      immediate: false,
    });
  const { data: myOrganizationsResponse, refresh: refreshGetMyOrganizations } =
    useGetMyOrganizations({
      immediate: false,
    });

  firebaseAuth.onAuthStateChanged(() => {
    refreshGetMyProfile();
    refreshGetMyOrganizations();
  });

  const currentUser = computed(() => myProfileResponse.value?.data);
  const myOrganizations = computed(
    () => myOrganizationsResponse.value?.data || []
  );

  return {
    provide: {
      currentUser,
      myOrganizations,
      refreshGetMyProfile,
    },
  };
});
