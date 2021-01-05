import fs from 'fs';

import { add, get } from '../../src/playable-sentence/handler';
import invoke from '../lambda-mock';

test('When_Add_Expect_Http201', async () => {
    const rawData = fs.readFileSync('test/params/add-playable-sentence.json', 'utf8');
    const param = JSON.parse(rawData);
    const result = await invoke(add, param);

    expect(result.statusCode).toEqual(201);
});

test('When_Get_Expect_HaveResults', async () => {
    const rawData = fs.readFileSync('test/params/get-playable-sentence.json', 'utf8');
    const param = JSON.parse(rawData);
    const result = await invoke(get, param);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toEqual(200);
    expect(body.total).toBeGreaterThanOrEqual(0);
    expect(body.sentence).toEqual(
        expect.arrayContaining([]),
    );
});

test('When_GetUnauthorized_Expect_Http401', async () => {
    const rawData = fs.readFileSync('test/params/get-playable-sentence-unauthorized.json', 'utf8');
    const param = JSON.parse(rawData);
    const result = await invoke(get, param);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toEqual(401);
});
