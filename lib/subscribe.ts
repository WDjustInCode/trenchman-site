"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TRENCHMAN_SUBSCRIBERS_SEGMENT_ID = "4ae5f13f-522d-43dc-986e-08a1ec2f8d50";

export async function subscribeToNewsletter(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  const { error } = await resend.contacts.create({
    email,
    firstName,
    properties: { contact_type: role },
    segments: [{ id: TRENCHMAN_SUBSCRIBERS_SEGMENT_ID }],
  });

  if (error) {
    return { success: false };
  }
  return { success: true };
}
