import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

async function canNotify() {
  return isPermissionGranted();
}

export async function requestNotificationPermission(): Promise<boolean> {
  const permissionGranted = await isPermissionGranted();

  if (permissionGranted) {
    return true;
  }

  const permission = await requestPermission();
  return permission === 'granted';
}

export async function notify(title: string, body: string): Promise<void> {
  const permissionGranted = await canNotify();

  if (!permissionGranted) {
    return;
  }

  sendNotification({
    title,
    body,
  });
}
