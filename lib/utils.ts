import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRequestURL } from "nuxt/app";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useBuildTenantUrl = (tenant: string) => {
  const { protocol, host } = useRequestURL();
  if (host.startsWith(tenant)) {
    return `${protocol}//${host}`;
  }
  return `${protocol}//${tenant ? `${tenant}.` : ""}${host}`;
};
