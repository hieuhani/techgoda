<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="link" class="px-1">
        <WandIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem as-child>
        <label for="selectAvatarFile">Avatar</label>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <label for="selectCoverFile">Cover</label>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <input
    id="selectAvatarFile"
    @change="onSelectAvatarFile"
    class="w-0 h-0 overflow-hidden opacity-0"
    accept=".jpg,.jpeg,.png,.webp,.gif"
    type="file"
  />
  <input
    id="selectCoverFile"
    @change="onSelectCoverFile"
    class="w-0 h-0 overflow-hidden opacity-0"
    accept=".jpg,.jpeg,.png,.webp,.gif"
    type="file"
  />
  <Dialog v-if="image" :open="!!image">
    <DialogContent :class="uploadType === 'avatar' ? 'max-w-xl' : 'max-w-5xl'">
      <DialogHeader>
        <DialogTitle>
          {{ title }}
        </DialogTitle>
        <DialogDescription>
          Please select an appropriate image
        </DialogDescription>
      </DialogHeader>
      <div class="flex justify-center">
        <vue-cropper
          ref="cropper"
          :src="image"
          alt="Source Image"
          :aspectRatio="uploadType === 'avatar' ? 1 : 21 / 9"
        />
      </div>
      <DialogFooter>
        <Button :disabled="loading" type="button" @click="upload">
          Upload
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { WandIcon } from "lucide-vue-next";
// @ts-ignore
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { uploadMyProfileImage } from "~/lib/publiz";

const onSelectAvatarFile = (e: Event) => {
  onSelectFile(e, "avatar");
};
const { $refreshGetMyProfile } = useNuxtApp();

const onSelectCoverFile = (e: Event) => {
  onSelectFile(e, "cover");
};
const cropper = ref<any>(null);
const uploadType = ref("");
const image = ref("");
const loading = ref(false);
const title = computed(() =>
  uploadType.value === "avatar" ? "Change avatar" : "Change cover"
);
const onSelectFile = (e: Event, type: string) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    image.value = url;
    uploadType.value = type;
  }
};

const upload = async () => {
  if (cropper.value) {
    loading.value = true;
    cropper.value
      .getCroppedCanvas({
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: "#fff",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      })
      .toBlob(
        async (blob: Blob) => {
          const formData = new FormData();
          const fileName = `${uploadType.value}.jpg`;
          formData.append(
            "file",
            new File([blob], fileName, {
              type: blob.type,
            })
          );
          formData.append("type", uploadType.value);
          await uploadMyProfileImage(formData);
          image.value = "";
          uploadType.value = "";
          loading.value = false;

          if (typeof $refreshGetMyProfile === "function") {
            $refreshGetMyProfile();
          }
        },
        "image/jpeg",
        0.95
      );
  }
};
</script>
