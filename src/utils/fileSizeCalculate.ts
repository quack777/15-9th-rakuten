export const fileSizeCalculate = (
  bytes: number | null | undefined,
  decimals = 2
): string => {
  if (bytes === 0 || !bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const expiresDate = (expiresAt: number): boolean | undefined => {
  if (expiresAt * 1000 - new Date().getTime() > 0) {
    return true;
  } else false;
};
