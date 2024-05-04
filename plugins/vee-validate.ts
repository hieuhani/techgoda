import { defineRule } from "vee-validate";
import { required, email, min, max } from "@vee-validate/rules";

defineRule("required", (value: string) => {
  if (required(value)) {
    return true;
  }
  return "Hãy nhập thông tin";
});

defineRule("email", (value: string) => {
  if (email(value)) {
    return true;
  }
  return "Email không hợp lệ";
});

defineRule("min", (value: string, params: [string | number]) => {
  if (min(value, params)) {
    return true;
  }

  return `Độ dài tối thiểu là ${params[0]} kí tự`;
});

defineRule("max", (value: string, params: [string | number]) => {
  if (max(value, params)) {
    return true;
  }

  return `Độ dài tối đa là ${params[0]} kí tự`;
});
export default defineNuxtPlugin(() => {});
