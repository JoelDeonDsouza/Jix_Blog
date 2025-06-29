export interface ImageKitResponse {
  filePath: string;
}

export interface ImageKitAuthResponse {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
}
