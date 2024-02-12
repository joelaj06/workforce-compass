export function getInitials(firstName: string, lastName: string): string {
  if (!firstName || !lastName) {
    return "**";
  }
  // Get the first character of each name
  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);

  // Return the initials
  return `${firstInitial}${lastInitial}`;
}

export function stringToColor(firstname: string, lastname: string): string {
  let hash = 0;
  let i;
  const fullName = `${firstname.toLowerCase()} ${lastname.toLowerCase()}`;
  /* eslint-disable no-bitwise */
  for (i = 0; i < fullName.length; i += 1) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
