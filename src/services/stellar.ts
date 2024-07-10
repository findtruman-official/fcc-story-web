import { request } from '@umijs/max';

const API = `/stellar`;

export const getPublishAssetXDR = async (data: {
  publicKey: string;
  story_id: string;
  code: string;
  name: string;
  description: string;
  imageCID: string;
  total: string;
  price: string;
  authorReserved: string;
}): Promise<string> => {
  return request<string>(`${API}/publishAsset`, {
    method: 'POST',
    data,
  });
};

export const getBuyAssetXDR = async (data: {
  publicKey: string;
  story_id: string;
  buyNum: string;
  story_author: string;
}): Promise<string> => {
  return request<string>(`${API}/buyAsset`, {
    method: 'POST',
    data,
  });
};

export const getClaimReservedAssetXDR = async (data: {
  publicKey: string;
  story_id: string;
  buyNum: string;
}): Promise<string> => {
  return request<string>(`${API}/claimReservedAsset`, {
    method: 'POST',
    data,
  });
};

export const getCreateTaskTransferXDR = async (data: {
  publicKey: string;
  story_id: string;
  cid: string;
  nft_address: string;
  reward_nfts: string;
}): Promise<string> => {
  return request<string>(`${API}/createTaskTransfer`, {
    method: 'POST',
    data,
  });
};

export const getCreateTaskXDR = async (data: {
  publicKey: string;
  story_id: string;
  cid: string;
  nft_address: string;
  reward_nfts: string;
}): Promise<string> => {
  return request<string>(`${API}/createTask`, {
    method: 'POST',
    data,
  });
};

export const getStellarAssetSale = async (
  storyId: string,
): Promise<API.StellarAsset> => {
  return request(`${API}/asset/${storyId}`, {
    method: 'GET',
  });
};
