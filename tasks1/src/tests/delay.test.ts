import {delay} from "../utils/delay";

test('function should resolve after a specified delay', async () => {
    const start = Date.now();
    await delay(500);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(500);
});

test('function can be used in Promise', async () => {
    const start = Date.now();
    await Promise.resolve()
        .then(() => delay(500))
        .then(() => {
            const end = Date.now();
            expect(end - start).toBeGreaterThanOrEqual(500);
        })
});
