<template>
  <NuxtLoadingIndicator :throttle="0" />

  <Html lang="vi">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Toaster />
    </Body>
  </Html>
</template>
