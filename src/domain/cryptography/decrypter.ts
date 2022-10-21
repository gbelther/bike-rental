export interface Decrypter {
  decrypt: (textEncrypted: string) => Promise<any>;
}
