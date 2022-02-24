export const expiresDate = (expiresAt: number): boolean | undefined => {
  if (expiresAt * 1000 - new Date().getTime() > 0) {
    return true;
  } else false;
};
