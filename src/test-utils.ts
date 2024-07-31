// TODO: Mock riff data with prebuilt checks for render/edit/scale modes

// TODO: make this a custom RTL assert? `.toHaveDedashedText(`)
export function dedash(str: string | null) {
  return str?.replace(/-/g, '');
}
