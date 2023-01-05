import { AnyObject } from './types';
import { itemUnauthentic } from './messages';
import nodeCrypto from 'crypto';

const createNodeCryptoHmac = (data: string, key: Uint8Array): string =>
  nodeCrypto.createHmac('sha256', key).update(data).digest('hex');

const createWebCryptoHmac = async (data: string, key: Uint8Array): Promise<string> => {
  // eslint-disable-next-line no-undef
  const webCrypto = crypto.subtle;

  const enc = new TextEncoder();

  const cryptoKey = await webCrypto.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: { name: 'SHA-256' }},
    false,
    [ 'sign', 'verify' ]
  );

  const signature = await webCrypto.sign('HMAC', cryptoKey, enc.encode(data));
  const signatureUint8 = new Uint8Array(signature);

  return Array.prototype.map.call(signatureUint8, (x): string => x.toString(16).padStart(2, '0')).join('');
};

const createHmac = async (data: string, key: Uint8Array): Promise<string> => {
  // eslint-disable-next-line no-undef
  if (typeof crypto === 'undefined') {
    return createNodeCryptoHmac(data, key);
  }

  return await createWebCryptoHmac(data, key);
};

const sign = async (item: AnyObject, key: Uint8Array): Promise<AnyObject> => {
  const itemString = JSON.stringify(item);
  const hmac = await createHmac(itemString, key);

  return { ...item, hmac };
};

const verify = async (hmacedItem: AnyObject, key: Uint8Array): Promise<AnyObject> => {
  const { hmac, ...item } = hmacedItem;
  const itemString = JSON.stringify(item);

  const checkHmac = await createHmac(itemString, key);

  if (hmac !== checkHmac) {
    throw new Error(itemUnauthentic);
  }

  return item;
};

export { sign, verify };
