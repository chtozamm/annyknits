"use server";

import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();

export async function signin(formData: FormData, referrer?: string) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error !== null)
    return {
      error: error.name,
      status: error.status,
      code: error.code,
      ok: false,
    };

  if (data.session) {
    cookieStore.set("access_token", data.session.access_token, {
      expires: Date.now() + data.session.expires_in * 1000,
      httpOnly: true,
    });
    cookieStore.set("user_id", data.session.user.id, {
      expires: Date.now() + data.session.expires_in * 1000,
      httpOnly: true,
    });
    redirect(referrer || "/");
  }
}

export async function signup(formData: FormData, referrer?: string) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error !== null)
    return {
      error: error.name,
      status: error.status,
      code: error.code,
      ok: false,
    };

  if (data.session) {
    cookieStore.set("access_token", data.session.access_token, {
      expires: Date.now() + data.session.expires_in * 1000,
      httpOnly: true,
    });
    redirect(referrer || "/");
  }
}

export async function signout() {
  const { error } = await supabase.auth.signOut();

  if (error !== null) {
    return {
      error: error.name,
      status: error.status,
      code: error.code,
      ok: false,
    };
  } else {
    cookieStore.delete("access_token");
    redirect("/");
  }
}
