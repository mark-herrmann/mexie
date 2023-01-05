import { AnyObject } from '../../lib/types';
import { assert } from 'assertthat';
import { itemUnauthentic } from '../../lib/messages';
import { sign, verify } from '../../lib/hmac';

suite('hmac', (): void => {
  const key = new Uint8Array(Buffer.from('abcdefghijklmnopqrstuvwxyz012345', 'utf8'));
  const testItem: AnyObject = { id: 'id', timestamp: 1_234_567_890_123, prop: 'abc' };
  const expectedHmac = '376544a54699ad7bc87ebf410ab14c4f3c97f18f8e72b82483c3b0594ad21c24';

  test('returns correctly hmaced item.', async (): Promise<void> => {
    const expectedHmacedItem = { ...testItem, hmac: expectedHmac };

    const hmacedItem = await sign(testItem, key);

    assert.that(hmacedItem).is.equalTo(expectedHmacedItem);
  });

  test('returns item due to valid hmac.', async (): Promise<void> => {
    const hmacedItem = { ...testItem, hmac: expectedHmac };

    const item = await verify(hmacedItem, key);

    assert.that(item).is.equalTo(testItem);
  });

  test('throws error due to invalid hmac.', async (): Promise<void> => {
    const hmacedItem = { ...testItem, hmac: 'invalid' };

    await assert.that(async (): Promise<void> => {
      await verify(hmacedItem, key);
    }).is.throwingAsync(itemUnauthentic);
  });

  test('throws error due to manipulated item.', async (): Promise<void> => {
    const hmacedItem = { ...testItem, prop: 'manipulated', hmac: expectedHmac };

    await assert.that(async (): Promise<void> => {
      await verify(hmacedItem, key);
    }).is.throwingAsync(itemUnauthentic);
  });
});
