"use server";

import { cookies } from "next/headers";

export async function createCookie(key: string, value: string) {
  cookies().set(key, value);
}

export async function deleteCookie(key: string) {
  cookies().delete(key);
}

export async function hasCookie(key: string) {
  return cookies().has(key);
}

export async function getCookie(key: string) {
  const cookie = cookies().get(key);
  return cookie;
}

