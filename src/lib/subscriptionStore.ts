declare global {
  var __ADMIN_PUSH_SUBSCRIPTIONS:
    | Map<string, { endpoint: string; keys: { p256dh: string; auth: string } }>
    | undefined;
}

if (!global.__ADMIN_PUSH_SUBSCRIPTIONS) {
  global.__ADMIN_PUSH_SUBSCRIPTIONS = new Map();
}

export const inMemorySubscriptions = global.__ADMIN_PUSH_SUBSCRIPTIONS;
