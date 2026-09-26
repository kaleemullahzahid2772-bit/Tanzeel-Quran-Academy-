import webPush from "web-push";

export const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  "BPdk80vUwRyflYgiCGXj9Z8I-mTor70KoJI27RuG-rRz3LKgGMGhOcDXAJVp67O9E4SvnvwAB9SNBsM-j-mxlLY";

export const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY ||
  "7Gubef8d5peSEpb_oY1fAnWGNFNkvn_w9vBzJ7P-k8k";

export const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT || "mailto:info@altanzeelquranacademy.com";

try {
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
} catch (err) {
  console.warn("VAPID setup warning:", err);
}

export default webPush;
