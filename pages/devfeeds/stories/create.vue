<template>
  <Container class="mt-2 max-w-3xl gap-4 grid grid-cols-12">
    <div class="col-span-7">
      <div class="max-w-96 aspect-[2/3] mx-auto rounded-lg overflow-hidden">
        <canvas ref="canvasRef" class="w-full h-full touch-none" />
      </div>
    </div>
    <div class="col-span-5 space-y-3">
      <Button class="w-full">Post story</Button>
      <div class="bg-white px-3 py-3 rounded space-y-3">
        <div>
          <h3 class="mb-3 font-medium">Texts</h3>
          <div>
            <div v-if="activeObjectType === 'text'">
              <div class="flex space-x-1 mb-1">
                <Select
                  @update:model-value="
                    (value) => updateTextObject('fontFamily', value)
                  "
                >
                  <SelectTrigger class="h-9 px-2 bg-secondary border-0">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="font in fonts"
                      :key="font"
                      :value="font"
                      :style="`font-family: ${font}`"
                    >
                      {{ font }}
                    </SelectItem>
                  </SelectContent>
                  <Button
                    variant="secondary"
                    size="sm"
                    @click="() => updateTextObject('fontWeight', 'bold')"
                  >
                    <Bold class="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    @click="() => updateTextObject('fontStyle', 'italic')"
                  >
                    <Italic class="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    @click="() => updateTextObject('underline', 'underline')"
                  >
                    <Underline class="w-4 h-4" />
                  </Button>
                </Select>
              </div>
              <div class="flex space-x-1">
                <Button
                  variant="secondary"
                  size="sm"
                  @click="() => updateTextObject('textAlign', 'left')"
                >
                  <AlignLeft class="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  @click="() => updateTextObject('textAlign', 'center')"
                >
                  <AlignCenter class="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  @click="() => updateTextObject('textAlign', 'right')"
                >
                  <AlignRight class="w-4 h-4" />
                </Button>

                <Popover>
                  <PopoverTrigger as-child>
                    <Button variant="secondary" size="sm" class="w-10">
                      <Palette class="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ColorPalette
                      :colors="colors"
                      @update:model-value="updateTextObject('fill', $event)"
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  variant="destructive"
                  size="sm"
                  @click="removeActiveObject"
                >
                  Remove
                </Button>
              </div>
            </div>
            <button
              v-else
              variant="secondary"
              class="w-full text-left flex items-center space-x-2 hover:text-primary"
              @click="addText"
            >
              <div class="bg-gray-100 rounded-full p-2">
                <ALargeSmall />
              </div>
              <span>Add Text</span>
            </button>
          </div>
        </div>
        <div>
          <h3 class="mb-3 font-medium">Images</h3>
          <div v-if="activeObjectType === 'image'">
            <div class="flex space-x-1">
              <Button
                variant="destructive"
                size="sm"
                @click="removeActiveObject"
              >
                Remove
              </Button>
            </div>
          </div>
          <div v-else>
            <div>
              <label
                class="w-full text-left flex items-center space-x-2 hover:text-primary cursor-pointer"
                for="select-image"
              >
                <div class="bg-gray-100 rounded-full p-2">
                  <Image />
                </div>
                <span>Add Image</span>
              </label>
              <input
                id="select-image"
                @change="onSelectImage"
                type="file"
                class="hidden"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 class="mb-3 font-medium">Backgrounds</h3>
          <ColorPalette
            :colors="colors"
            @update:model-value="updateBackgroundColor"
          />
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { Canvas, FabricImage, Textbox } from "fabric";
import {
  ALargeSmall,
  Image,
  Bold,
  Italic,
  Underline,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Palette,
} from "lucide-vue-next";
const canvasRef = ref<HTMLCanvasElement | null>(null);

const colors = [
  "#020617",
  "#b91c1c",
  "#facc15",
  "#38a169",
  "#3182ce",
  "#805ad5",
  "#0d9488",
  "#ec4899",
  "#d53f8c",
  "#f43f5e",
  "#f0f0f0",
  "#f9fafb",
];

const fonts = ["Helvetica", "Arial", "Verdana"];

let canvas: Canvas | null = null;
const hasImage = ref(false);
const canvasRect = ref({ width: 0, height: 0 });
const activeObject = ref<any>(null);
const onSelectionCreated = (e: any) => {
  if (e.selected[0]) {
    activeObject.value = e.selected[0];
  } else {
    activeObject.value = null;
  }
};

const onSelectionCleared = (e: any) => {
  activeObject.value = null;
};
const activeObjectType = computed(() => {
  if (activeObject.value instanceof Textbox) {
    return "text";
  } else if (activeObject.value instanceof FabricImage) {
    return "image";
  }
  return null;
});

const initializeCanvas = () => {
  if (!canvasRef.value) {
    return;
  }
  const { width, height } = canvasRef.value.getBoundingClientRect().toJSON();
  canvasRect.value = { width, height };
  canvas = new Canvas(canvasRef.value, {
    width,
    height,
  });

  canvas.backgroundColor = colors[4];
  canvas.renderAll();

  canvas.on("selection:created", onSelectionCreated);
  canvas.on("selection:cleared", onSelectionCleared);
};

onMounted(() => {
  initializeCanvas();
});

onUnmounted(() => {
  if (canvas) {
    canvas.off("selection:created", onSelectionCreated);
    canvas.off("selection:cleared", onSelectionCleared);
    canvas.dispose();
  }
});

const onSelectImage = async (e: Event) => {
  if (!canvas) {
    return null;
  }
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const image = await FabricImage.fromURL(url);
    image.scaleToWidth(canvasRect.value.width);

    canvas.add(image);
    canvas.setActiveObject(image);
    hasImage.value = true;
  }
};

const updateBackgroundColor = (color: string) => {
  if (canvas) {
    canvas.backgroundColor = color;
    canvas.renderAll();
  }
};

const addText = () => {
  if (canvas) {
    const text = new Textbox("Start typing", {
      width: 150,
      fontSize: 20,
      fill: "#fff",
      fontFamily: "Helvetica",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  }
};

const removeActiveObject = () => {
  if (canvas) {
    const aObject = canvas.getActiveObject();
    if (aObject) {
      canvas.remove(aObject);
      canvas.renderAll();
      activeObject.value = null;
    }
  }
};

const updateTextObject = (key: string, value: any) => {
  if (canvas) {
    const aObject = canvas.getActiveObject() as Textbox;
    if (aObject) {
      aObject.set(key, value);
      canvas.renderAll();
    }
  }
};
</script>
