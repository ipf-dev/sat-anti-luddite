import Mock from '@elastic/elasticsearch-mock';

import ElasticSearch from './aws-elastic-search';

const mock = new Mock();

export default class ElasticSearchMock extends ElasticSearch {
    public constructor() {
        super();
        this.addMock();
    }

    // override
    protected getClientInitParam() {
        return {
            ...super.getClientInitParam(),
            Connection: mock.getConnection(),
        };
    }

    private addMock() {
        this.getMerlinP9();
        this.getMerlinP11();
    }

    private getMerlinP9() {
        const shortenedResponse = {
            _index: 'ocr-result',
            _type: '_doc',
            _id: 'TPSDM06_9',
            _version: 1,
            _seq_no: 18,
            _primary_term: 1,
            found: true,
            _source: {
                bid: 'TPSDM06',
                page: '9',
                result: [ // truncated
                    {
                        BlockType: 'PAGE',
                        Geometry: {
                            BoundingBox: {
                                Width: 1,
                                Height: 1,
                                Left: 0,
                                Top: 0,
                            },
                            Polygon: [
                                {
                                    X: 0,
                                    Y: 0,
                                },
                                {
                                    X: 1,
                                    Y: 0,
                                },
                                {
                                    X: 1,
                                    Y: 1,
                                },
                                {
                                    X: 0,
                                    Y: 1,
                                },
                            ],
                        },
                        Id: '766661ed-380d-49cc-9d5d-e07dff9d8020',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'a4bb5e77-cbfc-40ba-bb2c-99f07fe5f514',
                                    '7c3cc275-cb49-4b15-83f1-1f477b041a21',
                                    '2a2b77c5-72c0-47f0-ba40-e372ca2cac3e',
                                    '830402d2-bb76-4f27-add7-33b67f37c3d1',
                                    'c9360bbc-52cf-4152-9ebe-8529d6be32f5',
                                    '2fba69b7-0aa1-40f1-8690-a86c0d9c9f28',
                                    '8a39583f-655f-48e4-b531-60fd08c14dd4',
                                    '74455e28-0b37-401e-ac2d-13ecee184676',
                                    'b2ab6f94-b645-4762-ad34-91e893098f24',
                                    'b2b91ee3-29d1-4bb6-9b2e-3396c3996674',
                                    'fe8f872e-9c92-4d76-ad97-2e976e61bfeb',
                                    '2693abfa-716a-4d5f-b893-fd5db3e3c079',
                                    '50f569fb-82dd-442b-bc49-79294284cfdd',
                                    '669397b4-2938-484a-b436-80149df2a98e',
                                    '4fd28123-6013-4a0f-968e-1865790e4e70',
                                    '0e44098f-09ed-4a5f-8bdc-abeb65b857e1',
                                    'e010f75d-193e-4bf1-9bae-4deed66544d8',
                                    '8981abc3-8d08-4b31-91a4-7ad7c9dee973',
                                    'e8bf33f7-7aa6-4907-80cd-e201bedcac78',
                                    '21abff30-cd73-457f-a34f-497ceb8741f3',
                                    'd7321215-6fcc-46c0-9044-1ac29343923e',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.66389465332031,
                        Text: 'Chapter 1',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.12100633978843689,
                                Height: 0.012469083070755005,
                                Left: 0.06528374552726746,
                                Top: 0.08759814500808716,
                            },
                            Polygon: [
                                {
                                    X: 0.06528374552726746,
                                    Y: 0.08759814500808716,
                                },
                                {
                                    X: 0.18629008531570435,
                                    Y: 0.08759814500808716,
                                },
                                {
                                    X: 0.18629008531570435,
                                    Y: 0.10006722807884216,
                                },
                                {
                                    X: 0.06528374552726746,
                                    Y: 0.10006722807884216,
                                },
                            ],
                        },
                        Id: 'a4bb5e77-cbfc-40ba-bb2c-99f07fe5f514',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '48bb62f2-4521-4fbe-b327-1967a0e68353',
                                    'c72bb6ae-4490-4a71-92b7-7c09386c5d72',
                                    '4f143d8e-8a64-4b94-bb6f-ecc18e998b24',
                                    'ba83fb59-fa1f-4fd4-b8c3-2f90a3d8d96a',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 98.67277526855469,
                        Text: "Merlin's only friend is a toad. One day, Merlin visits",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6444903016090393,
                                Height: 0.020967727527022362,
                                Left: 0.24206608533859253,
                                Top: 0.08295702189207077,
                            },
                            Polygon: [
                                {
                                    X: 0.24206608533859253,
                                    Y: 0.08295702189207077,
                                },
                                {
                                    X: 0.8865563869476318,
                                    Y: 0.08295702189207077,
                                },
                                {
                                    X: 0.8865563869476318,
                                    Y: 0.10392475128173828,
                                },
                                {
                                    X: 0.24206608533859253,
                                    Y: 0.10392475128173828,
                                },
                            ],
                        },
                        Id: '7c3cc275-cb49-4b15-83f1-1f477b041a21',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '742c440d-5da0-4057-bee1-98310facec18',
                                    '97b3aeed-4240-4aa0-9f6b-f0539bf422f6',
                                    '75f4df74-2d27-4f2a-809b-84de8fb6025c',
                                    'f2485964-fa25-4eb2-aa83-c8e5ecf769d6',
                                    'f494c1ce-0c06-4d04-b87b-5b841854783f',
                                    '21b864ba-5cc6-4350-96ac-a5a3d6d528d4',
                                    '5185034c-061e-4fc2-ad39-d32401b34d35',
                                    'b8fcb52c-4871-4a01-acd7-657a336436d2',
                                    'e0ce9e9e-a37b-4239-960c-76d95ea69293',
                                    '038c655f-2b0b-4b47-aa3b-cfd40f603577',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.72232818603516,
                        Text: "Merlin's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10141365975141525,
                                Height: 0.017308460548520088,
                                Left: 0.24206608533859253,
                                Top: 0.08322028070688248,
                            },
                            Polygon: [
                                {
                                    X: 0.24206608533859253,
                                    Y: 0.08322028070688248,
                                },
                                {
                                    X: 0.3434797525405884,
                                    Y: 0.08322028070688248,
                                },
                                {
                                    X: 0.3434797525405884,
                                    Y: 0.10052873939275742,
                                },
                                {
                                    X: 0.24206608533859253,
                                    Y: 0.10052873939275742,
                                },
                            ],
                        },
                        Id: '742c440d-5da0-4057-bee1-98310facec18',
                    },
                ],
            },
        };
        mock.add({
            method: 'GET',
            path: '/ocr-result/_doc/TPSDM06_9',
        }, () => shortenedResponse);
    }

    private getMerlinP11() {
        const response = {
            _index: 'ocr-result',
            _type: '_doc',
            _id: 'TPSDM06_11',
            _score: 1.6931472,
            _source: {
                bid: 'TPSDM06',
                page: '11',
                result: [
                    {
                        BlockType: 'PAGE',
                        Geometry: {
                            BoundingBox: {
                                Width: 1,
                                Height: 1,
                                Left: 0,
                                Top: 0,
                            },
                            Polygon: [
                                {
                                    X: 0,
                                    Y: 0,
                                },
                                {
                                    X: 1,
                                    Y: 0,
                                },
                                {
                                    X: 1,
                                    Y: 1,
                                },
                                {
                                    X: 0,
                                    Y: 1,
                                },
                            ],
                        },
                        Id: '5cf3ae38-c7d8-487f-968b-d6865390f911',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'a6c5bc69-1948-407b-9998-e237960d7856',
                                    'e5b2e341-1c96-4cfc-a58d-58491c86f47e',
                                    'e283b7ec-6392-49f9-bfc6-2190316173ad',
                                    '3a5fd0ed-06de-443a-aec7-6a0786312bc3',
                                    '1500c536-1229-4f45-8221-72e248586dfa',
                                    'b44f22f6-bd97-4bd5-9083-d5b375c2d737',
                                    '62fa4237-6639-47c9-b16e-e447e73531ce',
                                    '0d22fbc8-8c47-4d2b-9f4d-c520d8577c9c',
                                    '29a27715-11d5-4fb1-9720-f8f641601cad',
                                    'e69127a3-569b-406b-bdd5-7c9aac5f7531',
                                    'f4287e44-daea-490e-bb6e-7437b7753e0f',
                                    'a1392684-274a-4fc2-81c6-37a75e268d51',
                                    '7740d0f1-8575-49dd-a4f3-f6944c50e11c',
                                    '53624011-c2be-4373-b96b-65dea484f6fb',
                                    '2e6eb146-37d3-4a0a-8f0a-1f34073b368e',
                                    'd3f2941a-28ce-420d-9525-2520f576799d',
                                    '2dcd5460-3ba9-4a0b-99b7-448b1119b82a',
                                    'ac799b53-fc95-48ac-bcae-2a9f37e03a15',
                                    'c5733923-31bd-4707-9037-a40eee582400',
                                    'af1299b0-6868-4755-a412-48d63bb43e75',
                                    '6344e2ab-5647-4350-9c97-2b8720b968d0',
                                    'e92a22a2-bf25-484d-ac30-a68f8c56e069',
                                    '825dc969-6149-494f-b4da-51fc5f4c49b8',
                                    'a0d0dbc2-cf21-49c1-9c76-0cbb654effcc',
                                    '09433966-7832-4955-b948-48ea1bb80e5f',
                                    'ac75b75c-f04e-43ba-9b84-944bbc51cf79',
                                    '37822772-37d6-406a-8b16-df8ce6a1e066',
                                    'ab7fe08b-40e5-48af-9ed9-d4a4338b93d8',
                                    '031f165e-3078-4c63-a0d4-fa28075b28b8',
                                    '86a813a2-4969-4daa-900a-ec3ed103b048',
                                    '9027eb43-1d72-4f49-b476-5e1b07b28314',
                                    'a0606e36-1cc8-4d85-af15-016653b2ce39',
                                    '7c93480a-8460-4ae7-9248-7d7da74664c5',
                                    '51944689-3b47-4579-848f-99571aadf20a',
                                    'e8f4a4a9-9135-479d-a0e5-22fc8dad2837',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.48358154296875,
                        Text: 'Chapter 2',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.20523394644260406,
                                Height: 0.029118552803993225,
                                Left: 0.45112335681915283,
                                Top: 0.06964782625436783,
                            },
                            Polygon: [
                                {
                                    X: 0.45112335681915283,
                                    Y: 0.06964782625436783,
                                },
                                {
                                    X: 0.6563572883605957,
                                    Y: 0.06964782625436783,
                                },
                                {
                                    X: 0.6563572883605957,
                                    Y: 0.09876637905836105,
                                },
                                {
                                    X: 0.45112335681915283,
                                    Y: 0.09876637905836105,
                                },
                            ],
                        },
                        Id: 'a6c5bc69-1948-407b-9998-e237960d7856',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'ccb68789-4dfd-4d43-b103-18b334acc0d6',
                                    'bf8788fd-aa30-43b8-ae6f-692f60325877',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.11296844482422,
                        Text: 'The bullies come back',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.4375247061252594,
                                Height: 0.02623591013252735,
                                Left: 0.33521196246147156,
                                Top: 0.10929401218891144,
                            },
                            Polygon: [
                                {
                                    X: 0.33521196246147156,
                                    Y: 0.10929401218891144,
                                },
                                {
                                    X: 0.772736668586731,
                                    Y: 0.10929401218891144,
                                },
                                {
                                    X: 0.772736668586731,
                                    Y: 0.13552992045879364,
                                },
                                {
                                    X: 0.33521196246147156,
                                    Y: 0.13552992045879364,
                                },
                            ],
                        },
                        Id: 'e5b2e341-1c96-4cfc-a58d-58491c86f47e',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '88e1be33-aa52-41c4-897b-447c62aef180',
                                    'e23c8876-2822-46c5-b7b9-b548ae318f08',
                                    'a73ee78e-edf8-4ea9-8d67-d2f7eeee25ba',
                                    '9a14398d-06c7-4e4a-a3bd-8e03cd383e5e',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 96.68842315673828,
                        Text: "'I can talk to those bullies, Princess Adhan says.",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6185235977172852,
                                Height: 0.021675128489732742,
                                Left: 0.22228491306304932,
                                Top: 0.16768161952495575,
                            },
                            Polygon: [
                                {
                                    X: 0.22228491306304932,
                                    Y: 0.16768161952495575,
                                },
                                {
                                    X: 0.8408085107803345,
                                    Y: 0.16768161952495575,
                                },
                                {
                                    X: 0.8408085107803345,
                                    Y: 0.1893567442893982,
                                },
                                {
                                    X: 0.22228491306304932,
                                    Y: 0.1893567442893982,
                                },
                            ],
                        },
                        Id: 'e283b7ec-6392-49f9-bfc6-2190316173ad',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'fdbd3f39-8b5c-488a-8332-0242eb4aa069',
                                    '0eef19da-c495-46e0-a28c-cedb1e3e7fcb',
                                    'febd8d97-202f-4d6a-9f67-8c1d44bd2e69',
                                    '56056547-f188-4ffb-973f-b153a414bd05',
                                    '7fe970a6-3284-4a61-9bf6-04f138c6f515',
                                    'd130016e-98c5-4daa-be9e-786c16f96768',
                                    '19998e7f-b84a-43e5-a2d6-007f28973ceb',
                                    'b454e2ca-8a45-4037-a484-0600552b7e43',
                                    'ea19bbbd-ab86-4834-a750-6321d4f88ad0',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 97.89269256591797,
                        Text: "'No,' Merlin answers. 'They call me a \"mother's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6434613466262817,
                                Height: 0.021692106500267982,
                                Left: 0.24345023930072784,
                                Top: 0.19652427732944489,
                            },
                            Polygon: [
                                {
                                    X: 0.24345023930072784,
                                    Y: 0.19652427732944489,
                                },
                                {
                                    X: 0.8869115710258484,
                                    Y: 0.19652427732944489,
                                },
                                {
                                    X: 0.8869115710258484,
                                    Y: 0.21821638941764832,
                                },
                                {
                                    X: 0.24345023930072784,
                                    Y: 0.21821638941764832,
                                },
                            ],
                        },
                        Id: '3a5fd0ed-06de-443a-aec7-6a0786312bc3',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'e8e79ca9-38bf-4cbb-829b-e939e325e833',
                                    '1016f8c6-c4e3-4ffa-995c-381584ed1cae',
                                    '7b9bba6e-7af1-4a00-9cc7-68768689a606',
                                    'afa7b325-352b-4600-9e3e-4c9466a65cdc',
                                    '602f14b8-1c18-445b-a6b6-7ecd287dc124',
                                    'e5d24a42-865f-4fcf-bfcf-997b4cc5b523',
                                    '63602c43-4969-4a6c-bc02-7c4fb3fb6819',
                                    '6a5d17de-8e47-46d1-b8f0-4e21d2809c61',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.10733795166016,
                        Text: "boy\" without that!'",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.2407914400100708,
                                Height: 0.021467793732881546,
                                Left: 0.22174474596977234,
                                Top: 0.2255953997373581,
                            },
                            Polygon: [
                                {
                                    X: 0.22174474596977234,
                                    Y: 0.2255953997373581,
                                },
                                {
                                    X: 0.46253618597984314,
                                    Y: 0.2255953997373581,
                                },
                                {
                                    X: 0.46253618597984314,
                                    Y: 0.24706318974494934,
                                },
                                {
                                    X: 0.22174474596977234,
                                    Y: 0.24706318974494934,
                                },
                            ],
                        },
                        Id: '1500c536-1229-4f45-8221-72e248586dfa',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'f395febd-5460-4de8-8e59-6a360cb19d54',
                                    'fc21f6f7-f8a7-4e4e-bf3f-540f44a7ef53',
                                    'bd87dddd-6675-4cc8-81f9-8f2fcdfe9079',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 97.69754791259766,
                        Text: '"Then your father can speak to them after he comes',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6430249810218811,
                                Height: 0.02132594585418701,
                                Left: 0.24376697838306427,
                                Top: 0.25399839878082275,
                            },
                            Polygon: [
                                {
                                    X: 0.24376697838306427,
                                    Y: 0.25399839878082275,
                                },
                                {
                                    X: 0.886792004108429,
                                    Y: 0.25399839878082275,
                                },
                                {
                                    X: 0.886792004108429,
                                    Y: 0.27532434463500977,
                                },
                                {
                                    X: 0.24376697838306427,
                                    Y: 0.27532434463500977,
                                },
                            ],
                        },
                        Id: 'b44f22f6-bd97-4bd5-9083-d5b375c2d737',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '3973d126-cd7d-4b2b-86a4-94386054dbc9',
                                    'd7ba6c8e-65d0-4748-8b94-673abb33b75b',
                                    'fd037f76-bb71-47e9-9a71-7ddbe1d4cf00',
                                    'a19e2a8f-5dfd-456b-a837-1395c20484c4',
                                    'e4092876-ebb4-4d65-a034-45f1980ac29c',
                                    '71dbb18e-5635-4af2-8a4c-4765b3c6656e',
                                    '19c2f463-5ea4-4d7c-b513-b9391ccbfc57',
                                    '3136b09f-bb04-4e1f-b1fa-69029ba40c16',
                                    'de29f4c1-e60f-4a02-a3fa-7018626d716c',
                                    '0df09828-e632-4b43-843c-ef819151c8a3',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.11067962646484,
                        Text: "home, she smiles. 'But be careful with Morfran. He's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.665332555770874,
                                Height: 0.022261321544647217,
                                Left: 0.22116626799106598,
                                Top: 0.28157272934913635,
                            },
                            Polygon: [
                                {
                                    X: 0.22116626799106598,
                                    Y: 0.28157272934913635,
                                },
                                {
                                    X: 0.8864988088607788,
                                    Y: 0.28157272934913635,
                                },
                                {
                                    X: 0.8864988088607788,
                                    Y: 0.30383405089378357,
                                },
                                {
                                    X: 0.22116626799106598,
                                    Y: 0.30383405089378357,
                                },
                            ],
                        },
                        Id: '62fa4237-6639-47c9-b16e-e447e73531ce',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '348689a3-fefe-4212-ba75-39ea935c56f6',
                                    'ec9fa752-a17d-4604-9d30-a61a967c9e04',
                                    '7a007987-85df-44d0-8fea-ea6c3b078122',
                                    '977f5dac-8145-419f-837e-21358a93db5f',
                                    '5215b92a-77f1-4bec-8a3b-b5dd74f0a868',
                                    'e52b2932-b026-4b8d-a767-8dcdbc7e06ff',
                                    'ef019530-07d9-4f88-9a74-63392db38aa5',
                                    'c8ed36dc-9a63-479a-ab89-c84e7e4ff7de',
                                    'f310435c-28d8-4fe2-86c1-09180151e4a1',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.20044708251953,
                        Text: "Ceridwen's son.'",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.19995790719985962,
                                Height: 0.018287187442183495,
                                Left: 0.22171887755393982,
                                Top: 0.31161928176879883,
                            },
                            Polygon: [
                                {
                                    X: 0.22171887755393982,
                                    Y: 0.31161928176879883,
                                },
                                {
                                    X: 0.42167678475379944,
                                    Y: 0.31161928176879883,
                                },
                                {
                                    X: 0.42167678475379944,
                                    Y: 0.3299064636230469,
                                },
                                {
                                    X: 0.22171887755393982,
                                    Y: 0.3299064636230469,
                                },
                            ],
                        },
                        Id: '0d22fbc8-8c47-4d2b-9f4d-c520d8577c9c',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '28caddeb-3622-4e52-bea3-174ef66373cd',
                                    '4fe75886-ed10-42d3-bb7b-530dd473ef50',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.57730102539062,
                        Text: 'Next week, Merlin goes to the village shop with his',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6433367729187012,
                                Height: 0.02184620127081871,
                                Left: 0.24272292852401733,
                                Top: 0.3398398756980896,
                            },
                            Polygon: [
                                {
                                    X: 0.24272292852401733,
                                    Y: 0.3398398756980896,
                                },
                                {
                                    X: 0.8860597014427185,
                                    Y: 0.3398398756980896,
                                },
                                {
                                    X: 0.8860597014427185,
                                    Y: 0.3616860806941986,
                                },
                                {
                                    X: 0.24272292852401733,
                                    Y: 0.3616860806941986,
                                },
                            ],
                        },
                        Id: '29a27715-11d5-4fb1-9720-f8f641601cad',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'b365e0e3-4a82-4101-a60b-0757c59b9836',
                                    '8bfbc909-3761-4ee3-81b5-7eadb8123b50',
                                    '712f4f68-37c0-4148-881f-d5ce8e08bd8f',
                                    '3b0c7212-70b8-432a-85a5-b49162c14c67',
                                    'be97557d-bbb3-4daf-9883-063283291348',
                                    '13b75c4c-0e41-4df0-8a2c-05a935adc531',
                                    '53872cae-72f6-4a0e-9486-81a73f4abfd6',
                                    '3e9d787a-ce9a-40e7-b788-259ea3016f72',
                                    '2845101c-4af5-4bd7-9129-b6106a4c6d53',
                                    '4cba2d44-90cd-45f6-aa1a-d950c520c1a9',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.48493957519531,
                        Text: 'mother. He sits near the door with his toad in his',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6647905111312866,
                                Height: 0.018951475620269775,
                                Left: 0.22191384434700012,
                                Top: 0.3687896132469177,
                            },
                            Polygon: [
                                {
                                    X: 0.22191384434700012,
                                    Y: 0.3687896132469177,
                                },
                                {
                                    X: 0.8867043256759644,
                                    Y: 0.3687896132469177,
                                },
                                {
                                    X: 0.8867043256759644,
                                    Y: 0.3877410888671875,
                                },
                                {
                                    X: 0.22191384434700012,
                                    Y: 0.3877410888671875,
                                },
                            ],
                        },
                        Id: 'e69127a3-569b-406b-bdd5-7c9aac5f7531',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'eea13bd0-01d1-4257-bc63-53d221535c03',
                                    '0f3e6c50-d663-4622-a609-60e85cfc2f8e',
                                    'f8941768-dc50-4a3a-9e46-774bddddfea2',
                                    'ee4d0f61-94af-4b4f-963c-7ced6ebf7b6c',
                                    'b15faf9c-a7ad-46b0-8284-b51cbc4e8bd9',
                                    '317e0dbd-f717-4047-95cf-9256afe71be3',
                                    '73ce074d-376d-4867-ac77-c48c1fb79ecd',
                                    'e2c9a618-9626-4dc1-9f57-61e4b25932d5',
                                    '0e5de773-bd98-4c47-9b28-a9f702882947',
                                    'fea71a30-4b46-4f3b-a298-91b3bd79acb7',
                                    '6539b086-2776-49e6-b032-afacb0521e24',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.5708236694336,
                        Text: 'hand. Suddenly, Morfran and Arwel jump out in',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6647904515266418,
                                Height: 0.02194378525018692,
                                Left: 0.22169433534145355,
                                Top: 0.39710405468940735,
                            },
                            Polygon: [
                                {
                                    X: 0.22169433534145355,
                                    Y: 0.39710405468940735,
                                },
                                {
                                    X: 0.8864848017692566,
                                    Y: 0.39710405468940735,
                                },
                                {
                                    X: 0.8864848017692566,
                                    Y: 0.41904783248901367,
                                },
                                {
                                    X: 0.22169433534145355,
                                    Y: 0.41904783248901367,
                                },
                            ],
                        },
                        Id: 'f4287e44-daea-490e-bb6e-7437b7753e0f',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '4a01bd6d-4d7b-4cf2-b36c-510ab60e4bc0',
                                    '71b15e07-a633-4020-aee8-d729aac2d6f5',
                                    'e618db10-d770-43eb-8016-c8d4fe91a71d',
                                    '6e6f554e-9bb3-45a8-95ba-dab7a5c2c848',
                                    '6f0b7443-e17a-46df-af00-d2e8c790441f',
                                    '2f497729-9f4c-4f7a-87e3-2630d635d2d6',
                                    'ed07ba4c-b2f4-4b36-8909-9dcd549e63f5',
                                    'de3acc63-8062-4701-a8ff-7f9dc0e476e5',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 98.37529754638672,
                        Text: "front of him. 'It's Merlin and his toad!' they cry.",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.5921643972396851,
                                Height: 0.0216334480792284,
                                Left: 0.22189940512180328,
                                Top: 0.42575645446777344,
                            },
                            Polygon: [
                                {
                                    X: 0.22189940512180328,
                                    Y: 0.42575645446777344,
                                },
                                {
                                    X: 0.8140637874603271,
                                    Y: 0.42575645446777344,
                                },
                                {
                                    X: 0.8140637874603271,
                                    Y: 0.4473899006843567,
                                },
                                {
                                    X: 0.22189940512180328,
                                    Y: 0.4473899006843567,
                                },
                            ],
                        },
                        Id: 'a1392684-274a-4fc2-81c6-37a75e268d51',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'a07f143f-32a9-419e-abfb-c91fc14d0303',
                                    '07a465c1-26a1-48a8-b953-f0de5c34a789',
                                    'fa38c8c6-be77-4e3b-a373-c7c02c45321e',
                                    'ff7a259a-3cb3-4daf-9e86-ca9deeab3470',
                                    '3a73fe96-089f-44e9-97c4-94bbc023e0a1',
                                    'fb54f4ce-9c04-4ff1-bd9b-c655710afc34',
                                    '288ca1b8-860f-4397-8fc8-b222a710ce25',
                                    '4ec19294-ad86-410a-80eb-3bde97891477',
                                    'd2707e23-c901-40db-a3b2-fe7f719e0532',
                                    'bdd400ad-8eb6-47fa-91f7-547138b81fba',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.74909210205078,
                        Text: 'bully (plural',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.09723953902721405,
                                Height: 0.014473557472229004,
                                Left: 0.06595893204212189,
                                Top: 0.6231448650360107,
                            },
                            Polygon: [
                                {
                                    X: 0.06595893204212189,
                                    Y: 0.6231448650360107,
                                },
                                {
                                    X: 0.16319847106933594,
                                    Y: 0.6231448650360107,
                                },
                                {
                                    X: 0.16319847106933594,
                                    Y: 0.6376184225082397,
                                },
                                {
                                    X: 0.06595893204212189,
                                    Y: 0.6376184225082397,
                                },
                            ],
                        },
                        Id: '7740d0f1-8575-49dd-a4f3-f6944c50e11c',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'ef5665c8-07ef-4fc1-8e18-04216a1e9a4a',
                                    'b11f0e83-5a8f-4282-8585-34e844fc35de',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.1036376953125,
                        Text: 'bullies) a',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07371851801872253,
                                Height: 0.013484716415405273,
                                Left: 0.06626714766025543,
                                Top: 0.6384684443473816,
                            },
                            Polygon: [
                                {
                                    X: 0.06626714766025543,
                                    Y: 0.6384684443473816,
                                },
                                {
                                    X: 0.13998566567897797,
                                    Y: 0.6384684443473816,
                                },
                                {
                                    X: 0.13998566567897797,
                                    Y: 0.6519531607627869,
                                },
                                {
                                    X: 0.06626714766025543,
                                    Y: 0.6519531607627869,
                                },
                            ],
                        },
                        Id: '53624011-c2be-4373-b96b-65dea484f6fb',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '3d3ce230-f684-455c-8e6a-ec37c2f31fbb',
                                    'e0dcfbe6-9b66-479f-87f3-0b3c3ddfe9f8',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.30107116699219,
                        Text: 'person who does',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.1215924397110939,
                                Height: 0.01351199857890606,
                                Left: 0.06629902869462967,
                                Top: 0.6537526249885559,
                            },
                            Polygon: [
                                {
                                    X: 0.06629902869462967,
                                    Y: 0.6537526249885559,
                                },
                                {
                                    X: 0.18789146840572357,
                                    Y: 0.6537526249885559,
                                },
                                {
                                    X: 0.18789146840572357,
                                    Y: 0.6672645807266235,
                                },
                                {
                                    X: 0.06629902869462967,
                                    Y: 0.6672645807266235,
                                },
                            ],
                        },
                        Id: '2e6eb146-37d3-4a0a-8f0a-1f34073b368e',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'ec835d17-8f49-406b-b691-faf5b11abe47',
                                    '344297e2-bf60-4ec2-a787-4ca92ceebbac',
                                    '62506f70-5aa3-4649-b8ad-aac7ff2881ff',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.10347747802734,
                        Text: 'bad things to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.09342299401760101,
                                Height: 0.014373183250427246,
                                Left: 0.06621353328227997,
                                Top: 0.6681649684906006,
                            },
                            Polygon: [
                                {
                                    X: 0.06621353328227997,
                                    Y: 0.6681649684906006,
                                },
                                {
                                    X: 0.15963652729988098,
                                    Y: 0.6681649684906006,
                                },
                                {
                                    X: 0.15963652729988098,
                                    Y: 0.6825381517410278,
                                },
                                {
                                    X: 0.06621353328227997,
                                    Y: 0.6825381517410278,
                                },
                            ],
                        },
                        Id: 'd3f2941a-28ce-420d-9525-2520f576799d',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'ed59a510-323d-4034-9133-18decb360a68',
                                    'b3be8b0a-0849-47ee-8396-b93c41907422',
                                    'ab5a5711-4c99-4d5a-8107-e8049dca967c',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.5930404663086,
                        Text: 'somebody and',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10548648983240128,
                                Height: 0.014050072059035301,
                                Left: 0.06602232903242111,
                                Top: 0.6841810941696167,
                            },
                            Polygon: [
                                {
                                    X: 0.06602232903242111,
                                    Y: 0.6841810941696167,
                                },
                                {
                                    X: 0.1715088188648224,
                                    Y: 0.6841810941696167,
                                },
                                {
                                    X: 0.1715088188648224,
                                    Y: 0.6982311606407166,
                                },
                                {
                                    X: 0.06602232903242111,
                                    Y: 0.6982311606407166,
                                },
                            ],
                        },
                        Id: '2dcd5460-3ba9-4a0b-99b7-448b1119b82a',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '420b3654-7901-4236-9e99-604cd60b3546',
                                    '02dfe304-67cd-44dc-8f2d-d0710fe277f4',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.53929901123047,
                        Text: 'makes them',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08588016033172607,
                                Height: 0.012358368374407291,
                                Left: 0.06654031574726105,
                                Top: 0.69905024766922,
                            },
                            Polygon: [
                                {
                                    X: 0.06654031574726105,
                                    Y: 0.69905024766922,
                                },
                                {
                                    X: 0.15242047607898712,
                                    Y: 0.69905024766922,
                                },
                                {
                                    X: 0.15242047607898712,
                                    Y: 0.7114086151123047,
                                },
                                {
                                    X: 0.06654031574726105,
                                    Y: 0.7114086151123047,
                                },
                            ],
                        },
                        Id: 'ac799b53-fc95-48ac-bcae-2a9f37e03a15',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '78adbb98-aa11-425a-96ff-00c675c1c068',
                                    '04d32c74-e042-490e-928e-cc083a9dd08e',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.05641174316406,
                        Text: 'fee afraid; to do',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.11342762410640717,
                                Height: 0.013355365954339504,
                                Left: 0.06560147553682327,
                                Top: 0.7139785885810852,
                            },
                            Polygon: [
                                {
                                    X: 0.06560147553682327,
                                    Y: 0.7139785885810852,
                                },
                                {
                                    X: 0.17902910709381104,
                                    Y: 0.7139785885810852,
                                },
                                {
                                    X: 0.17902910709381104,
                                    Y: 0.7273339629173279,
                                },
                                {
                                    X: 0.06560147553682327,
                                    Y: 0.7273339629173279,
                                },
                            ],
                        },
                        Id: 'c5733923-31bd-4707-9037-a40eee582400',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '5fc472a0-1010-4a69-b3d2-b2eaca7b2704',
                                    '72ec7a41-6d9c-4d29-afb8-6d6230c8c61a',
                                    '67564fbe-74ca-4e94-880a-3ec3f8db3d14',
                                    'b5348e5f-1b44-447c-8772-e80b6b220471',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 98.10102081298828,
                        Text: 'bad things to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0935644656419754,
                                Height: 0.014011098071932793,
                                Left: 0.0660984069108963,
                                Top: 0.729338526725769,
                            },
                            Polygon: [
                                {
                                    X: 0.0660984069108963,
                                    Y: 0.729338526725769,
                                },
                                {
                                    X: 0.1596628725528717,
                                    Y: 0.729338526725769,
                                },
                                {
                                    X: 0.1596628725528717,
                                    Y: 0.7433496117591858,
                                },
                                {
                                    X: 0.0660984069108963,
                                    Y: 0.7433496117591858,
                                },
                            ],
                        },
                        Id: 'af1299b0-6868-4755-a412-48d63bb43e75',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '22f72c4f-cf8b-40a4-8a5e-858008b4240a',
                                    '8de8d78b-228b-44f5-87b9-88bff53331eb',
                                    'f6cab95f-f7f4-4c50-85c8-043b5f94fcbe',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.47615051269531,
                        Text: 'somebody and',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10499598830938339,
                                Height: 0.014004195109009743,
                                Left: 0.06639175862073898,
                                Top: 0.7446085214614868,
                            },
                            Polygon: [
                                {
                                    X: 0.06639175862073898,
                                    Y: 0.7446085214614868,
                                },
                                {
                                    X: 0.17138774693012238,
                                    Y: 0.7446085214614868,
                                },
                                {
                                    X: 0.17138774693012238,
                                    Y: 0.7586126923561096,
                                },
                                {
                                    X: 0.06639175862073898,
                                    Y: 0.7586126923561096,
                                },
                            ],
                        },
                        Id: '6344e2ab-5647-4350-9c97-2b8720b968d0',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '8ee741df-0e4e-44c7-8b06-4befc3ef76ee',
                                    '95a1dd85-b7e2-453b-9405-01e8c95fc362',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.20674896240234,
                        Text: 'make them fee',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10893036425113678,
                                Height: 0.013823747634887695,
                                Left: 0.06606705486774445,
                                Top: 0.7592059373855591,
                            },
                            Polygon: [
                                {
                                    X: 0.06606705486774445,
                                    Y: 0.7592059373855591,
                                },
                                {
                                    X: 0.17499741911888123,
                                    Y: 0.7592059373855591,
                                },
                                {
                                    X: 0.17499741911888123,
                                    Y: 0.7730296850204468,
                                },
                                {
                                    X: 0.06606705486774445,
                                    Y: 0.7730296850204468,
                                },
                            ],
                        },
                        Id: 'e92a22a2-bf25-484d-ac30-a68f8c56e069',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '6fa52f46-c5e5-4364-9e66-1751b9444b75',
                                    'a833a5f4-effb-479d-8884-527499587241',
                                    '0d3f66ef-ebdb-4f0b-bd6e-9a8a58045c85',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.64202117919922,
                        Text: 'afraid',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.038943491876125336,
                                Height: 0.015059113502502441,
                                Left: 0.06611350923776627,
                                Top: 0.7735607028007507,
                            },
                            Polygon: [
                                {
                                    X: 0.06611350923776627,
                                    Y: 0.7735607028007507,
                                },
                                {
                                    X: 0.1050570011138916,
                                    Y: 0.7735607028007507,
                                },
                                {
                                    X: 0.1050570011138916,
                                    Y: 0.7886198163032532,
                                },
                                {
                                    X: 0.06611350923776627,
                                    Y: 0.7886198163032532,
                                },
                            ],
                        },
                        Id: '825dc969-6149-494f-b4da-51fc5f4c49b8',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'd2ab3eda-3ac2-4e28-a119-d72573765b55',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.14495086669922,
                        Text: 'jump to move',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.11366603523492813,
                                Height: 0.0148237943649292,
                                Left: 0.06510207056999207,
                                Top: 0.796963095664978,
                            },
                            Polygon: [
                                {
                                    X: 0.06510207056999207,
                                    Y: 0.796963095664978,
                                },
                                {
                                    X: 0.1787680983543396,
                                    Y: 0.796963095664978,
                                },
                                {
                                    X: 0.1787680983543396,
                                    Y: 0.8117868900299072,
                                },
                                {
                                    X: 0.06510207056999207,
                                    Y: 0.8117868900299072,
                                },
                            ],
                        },
                        Id: 'a0d0dbc2-cf21-49c1-9c76-0cbb654effcc',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'b68f741d-0e08-4d84-8fba-00f4d67333eb',
                                    '1a74fbf7-90ee-4d78-9395-829051180e80',
                                    '5a2fa428-ed6b-489a-873f-b02b4b1b5c71',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.42979431152344,
                        Text: 'suddenly from one',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.13313347101211548,
                                Height: 0.01399540901184082,
                                Left: 0.06566374748945236,
                                Top: 0.8128846883773804,
                            },
                            Polygon: [
                                {
                                    X: 0.06566374748945236,
                                    Y: 0.8128846883773804,
                                },
                                {
                                    X: 0.19879722595214844,
                                    Y: 0.8128846883773804,
                                },
                                {
                                    X: 0.19879722595214844,
                                    Y: 0.8268800973892212,
                                },
                                {
                                    X: 0.06566374748945236,
                                    Y: 0.8268800973892212,
                                },
                            ],
                        },
                        Id: '09433966-7832-4955-b948-48ea1bb80e5f',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '2fb9f325-b23b-43ae-9094-032ab28c8d41',
                                    '6b1efe95-372b-4d97-b2b8-f940b680a7fd',
                                    'a2781ada-d01f-4be4-8c64-032ef852df46',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 98.87553405761719,
                        Text: 'place to a different',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.13147340714931488,
                                Height: 0.014255642890930176,
                                Left: 0.06599386781454086,
                                Top: 0.8278272151947021,
                            },
                            Polygon: [
                                {
                                    X: 0.06599386781454086,
                                    Y: 0.8278272151947021,
                                },
                                {
                                    X: 0.19746728241443634,
                                    Y: 0.8278272151947021,
                                },
                                {
                                    X: 0.19746728241443634,
                                    Y: 0.8420828580856323,
                                },
                                {
                                    X: 0.06599386781454086,
                                    Y: 0.8420828580856323,
                                },
                            ],
                        },
                        Id: 'ac75b75c-f04e-43ba-9b84-944bbc51cf79',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '0c682d1f-0ab2-463d-9a1f-23cd69ed3937',
                                    'fbabad57-3298-4a58-a4f8-3ce2bd514bb1',
                                    'd5f74651-2e4a-4ff3-8587-7fe1933a7540',
                                    'd96bba42-193e-4659-a3f5-a959fb3bf11a',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.79322814941406,
                        Text: 'place',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03745947778224945,
                                Height: 0.01420438289642334,
                                Left: 0.06632117927074432,
                                Top: 0.8430476188659668,
                            },
                            Polygon: [
                                {
                                    X: 0.06632117927074432,
                                    Y: 0.8430476188659668,
                                },
                                {
                                    X: 0.10378065705299377,
                                    Y: 0.8430476188659668,
                                },
                                {
                                    X: 0.10378065705299377,
                                    Y: 0.8572520017623901,
                                },
                                {
                                    X: 0.06632117927074432,
                                    Y: 0.8572520017623901,
                                },
                            ],
                        },
                        Id: '37822772-37d6-406a-8b16-df8ce6a1e066',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '07f085ff-b453-4b51-8c34-5a5739f1743b',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 98.46208953857422,
                        Text: 'fall to go down',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.11956337094306946,
                                Height: 0.01489568967372179,
                                Left: 0.06539788097143173,
                                Top: 0.8648961186408997,
                            },
                            Polygon: [
                                {
                                    X: 0.06539788097143173,
                                    Y: 0.8648961186408997,
                                },
                                {
                                    X: 0.1849612444639206,
                                    Y: 0.8648961186408997,
                                },
                                {
                                    X: 0.1849612444639206,
                                    Y: 0.879791796207428,
                                },
                                {
                                    X: 0.06539788097143173,
                                    Y: 0.879791796207428,
                                },
                            ],
                        },
                        Id: 'ab7fe08b-40e5-48af-9ed9-d4a4338b93d8',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '2effdb0a-30a1-44b0-8c54-4769c62eb7f1',
                                    'f03c1917-7cd5-41b7-b066-efef1003b3b3',
                                    '3d576b06-eda4-45c3-8fbe-696b3a789d41',
                                    '28ed58d5-e1f2-40cf-8e3c-4c64ab144d70',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 98.607177734375,
                        Text: "The toad is afraid. It falls to the ground. 'Let's see",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.644835889339447,
                                Height: 0.02156147174537182,
                                Left: 0.2419712096452713,
                                Top: 0.8547940850257874,
                            },
                            Polygon: [
                                {
                                    X: 0.2419712096452713,
                                    Y: 0.8547940850257874,
                                },
                                {
                                    X: 0.8868070840835571,
                                    Y: 0.8547940850257874,
                                },
                                {
                                    X: 0.8868070840835571,
                                    Y: 0.8763555884361267,
                                },
                                {
                                    X: 0.2419712096452713,
                                    Y: 0.8763555884361267,
                                },
                            ],
                        },
                        Id: '031f165e-3078-4c63-a0d4-fa28075b28b8',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '0d9829a1-72f3-4ad9-9070-2ad6d140214c',
                                    'f7dac8dc-28cf-43ac-b3d3-3b694104def4',
                                    '1377ce5e-b567-4b2d-b699-acfe2046af50',
                                    '06dc4b79-7673-46e7-a0d5-9843ca862505',
                                    'e3e62985-48cf-4e85-ba29-001edafec9dd',
                                    '3c13999c-a6fe-4aff-9d35-cf89fb420fb3',
                                    'dacc471b-2ca0-4e8a-9590-04ef50449891',
                                    'cc7bffcd-22ac-4b45-9318-1af46f838010',
                                    '4ba17ec4-b513-46c6-94dd-113c0870af90',
                                    '81be48ed-ae70-4e5d-9e85-35829c904b5a',
                                    'da7b6cb3-2d52-43f1-925a-e18eccf9b42c',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.65095520019531,
                        Text: 'suddenly',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06441591680049896,
                                Height: 0.014025449752807617,
                                Left: 0.06608641147613525,
                                Top: 0.8811320066452026,
                            },
                            Polygon: [
                                {
                                    X: 0.06608641147613525,
                                    Y: 0.8811320066452026,
                                },
                                {
                                    X: 0.13050232827663422,
                                    Y: 0.8811320066452026,
                                },
                                {
                                    X: 0.13050232827663422,
                                    Y: 0.8951574563980103,
                                },
                                {
                                    X: 0.06608641147613525,
                                    Y: 0.8951574563980103,
                                },
                            ],
                        },
                        Id: '86a813a2-4969-4daa-900a-ec3ed103b048',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '44669ca4-b2c0-4bf8-b2ab-957f43247664',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.40687561035156,
                        Text: 'your toad jump! Morfran laughs. He runs after it.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.6217450499534607,
                                Height: 0.021625399589538574,
                                Left: 0.2218400239944458,
                                Top: 0.8838726878166199,
                            },
                            Polygon: [
                                {
                                    X: 0.2218400239944458,
                                    Y: 0.8838726878166199,
                                },
                                {
                                    X: 0.8435850739479065,
                                    Y: 0.8838726878166199,
                                },
                                {
                                    X: 0.8435850739479065,
                                    Y: 0.9054980874061584,
                                },
                                {
                                    X: 0.2218400239944458,
                                    Y: 0.9054980874061584,
                                },
                            ],
                        },
                        Id: '9027eb43-1d72-4f49-b476-5e1b07b28314',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'c93f6318-0e71-4603-9b0a-1a63bd3d85ef',
                                    'd7d3ad78-80a8-4ef7-90f9-62a09f9a9efa',
                                    '45388177-7319-480b-a522-678e6a436cb6',
                                    '3cebb14e-cce7-4634-8a26-d1b098b40791',
                                    'defb514d-11b6-454e-b48d-ab6235ea404a',
                                    '96918851-8999-4ac1-b812-7efee6aa242e',
                                    '0ff6c303-5ff9-4319-9b6f-ffa8c2cb26b8',
                                    '1a7084ad-1cbe-47bc-8272-8fb7de203d90',
                                    '1ff65c93-7913-42e1-9df8-ebd50c0ee0d2',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 94.33527374267578,
                        Text: 'ground we walk',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.13164572417736053,
                                Height: 0.01590263843536377,
                                Left: 0.06562492996454239,
                                Top: 0.9017877578735352,
                            },
                            Polygon: [
                                {
                                    X: 0.06562492996454239,
                                    Y: 0.9017877578735352,
                                },
                                {
                                    X: 0.19727064669132233,
                                    Y: 0.9017877578735352,
                                },
                                {
                                    X: 0.19727064669132233,
                                    Y: 0.9176903963088989,
                                },
                                {
                                    X: 0.06562492996454239,
                                    Y: 0.9176903963088989,
                                },
                            ],
                        },
                        Id: 'a0606e36-1cc8-4d85-af15-016653b2ce39',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '8f42936a-0669-4b39-8b8a-ac571e0166ed',
                                    'f1052164-9ca7-4a21-b09c-ac4846601dad',
                                    '32693f99-991b-4404-9457-4dcfff7568b5',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 94.58120727539062,
                        Text: 'on this',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0486535020172596,
                                Height: 0.011786341667175293,
                                Left: 0.0659475326538086,
                                Top: 0.9191312193870544,
                            },
                            Polygon: [
                                {
                                    X: 0.0659475326538086,
                                    Y: 0.9191312193870544,
                                },
                                {
                                    X: 0.1146010309457779,
                                    Y: 0.9191312193870544,
                                },
                                {
                                    X: 0.1146010309457779,
                                    Y: 0.9309175610542297,
                                },
                                {
                                    X: 0.0659475326538086,
                                    Y: 0.9309175610542297,
                                },
                            ],
                        },
                        Id: '7c93480a-8460-4ae7-9248-7d7da74664c5',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '8d9229ac-90cc-4c6d-8615-16f191400665',
                                    '520c5de0-bad2-4519-949a-23c4221234e6',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 99.58892822265625,
                        Text: "When Merlin's mother arrives, the bullies leave.",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.5946003198623657,
                                Height: 0.02054636739194393,
                                Left: 0.24277228116989136,
                                Top: 0.9121136665344238,
                            },
                            Polygon: [
                                {
                                    X: 0.24277228116989136,
                                    Y: 0.9121136665344238,
                                },
                                {
                                    X: 0.8373726010322571,
                                    Y: 0.9121136665344238,
                                },
                                {
                                    X: 0.8373726010322571,
                                    Y: 0.9326600432395935,
                                },
                                {
                                    X: 0.24277228116989136,
                                    Y: 0.9326600432395935,
                                },
                            ],
                        },
                        Id: '51944689-3b47-4579-848f-99571aadf20a',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    '5ab3985c-9644-4ae2-932c-07bd82af157a',
                                    'fb653f1f-1eb3-476e-9019-89ac16e48d9a',
                                    'c6e10e44-727e-4eb4-8239-61e72d2c3a0b',
                                    '994f2a53-2dad-48a1-93a9-d4ffd320dab0',
                                    'e7e79b66-0c0d-4396-88c1-2a840eb85ff3',
                                    '567a443a-e596-47cf-b7dc-95ce3c001f08',
                                    'fd872385-5cd1-417e-b36d-27e5fe31dd2e',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'LINE',
                        Confidence: 95.49703216552734,
                        Text: '4',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.011703968048095703,
                                Height: 0.013266205787658691,
                                Left: 0.048014335334300995,
                                Top: 0.9593043327331543,
                            },
                            Polygon: [
                                {
                                    X: 0.048014335334300995,
                                    Y: 0.9593043327331543,
                                },
                                {
                                    X: 0.0597183033823967,
                                    Y: 0.9593043327331543,
                                },
                                {
                                    X: 0.0597183033823967,
                                    Y: 0.972570538520813,
                                },
                                {
                                    X: 0.048014335334300995,
                                    Y: 0.972570538520813,
                                },
                            ],
                        },
                        Id: 'e8f4a4a9-9135-479d-a0e5-22fc8dad2837',
                        Relationships: [
                            {
                                Type: 'CHILD',
                                Ids: [
                                    'a1f96545-0ed1-48f2-bb17-5d32653b7b7d',
                                ],
                            },
                        ],
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.82379913330078,
                        Text: 'Chapter',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.1687859445810318,
                                Height: 0.029118554666638374,
                                Left: 0.45112335681915283,
                                Top: 0.06964782625436783,
                            },
                            Polygon: [
                                {
                                    X: 0.45112335681915283,
                                    Y: 0.06964782625436783,
                                },
                                {
                                    X: 0.6199092864990234,
                                    Y: 0.06964782625436783,
                                },
                                {
                                    X: 0.6199092864990234,
                                    Y: 0.09876637905836105,
                                },
                                {
                                    X: 0.45112335681915283,
                                    Y: 0.09876637905836105,
                                },
                            ],
                        },
                        Id: 'ccb68789-4dfd-4d43-b103-18b334acc0d6',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.14337158203125,
                        Text: '2',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.021791400387883186,
                                Height: 0.024579135701060295,
                                Left: 0.6345658898353577,
                                Top: 0.0717199370265007,
                            },
                            Polygon: [
                                {
                                    X: 0.6345658898353577,
                                    Y: 0.0717199370265007,
                                },
                                {
                                    X: 0.6563572883605957,
                                    Y: 0.0717199370265007,
                                },
                                {
                                    X: 0.6563572883605957,
                                    Y: 0.09629907459020615,
                                },
                                {
                                    X: 0.6345658898353577,
                                    Y: 0.09629907459020615,
                                },
                            ],
                        },
                        Id: 'bf8788fd-aa30-43b8-ae6f-692f60325877',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.581787109375,
                        Text: 'The',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0720382109284401,
                                Height: 0.025856060907244682,
                                Left: 0.33521196246147156,
                                Top: 0.10929401218891144,
                            },
                            Polygon: [
                                {
                                    X: 0.33521196246147156,
                                    Y: 0.10929401218891144,
                                },
                                {
                                    X: 0.40725016593933105,
                                    Y: 0.10929401218891144,
                                },
                                {
                                    X: 0.40725016593933105,
                                    Y: 0.13515007495880127,
                                },
                                {
                                    X: 0.33521196246147156,
                                    Y: 0.13515007495880127,
                                },
                            ],
                        },
                        Id: '88e1be33-aa52-41c4-897b-447c62aef180',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.71839904785156,
                        Text: 'bullies',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.12531299889087677,
                                Height: 0.025002360343933105,
                                Left: 0.4192427098751068,
                                Top: 0.10990083962678909,
                            },
                            Polygon: [
                                {
                                    X: 0.4192427098751068,
                                    Y: 0.10990083962678909,
                                },
                                {
                                    X: 0.5445557236671448,
                                    Y: 0.10990083962678909,
                                },
                                {
                                    X: 0.5445557236671448,
                                    Y: 0.1349032074213028,
                                },
                                {
                                    X: 0.4192427098751068,
                                    Y: 0.1349032074213028,
                                },
                            ],
                        },
                        Id: 'e23c8876-2822-46c5-b7b9-b548ae318f08',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 97.84294128417969,
                        Text: 'come',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10992783308029175,
                                Height: 0.020163239911198616,
                                Left: 0.5581991672515869,
                                Top: 0.11481258273124695,
                            },
                            Polygon: [
                                {
                                    X: 0.5581991672515869,
                                    Y: 0.11481258273124695,
                                },
                                {
                                    X: 0.6681270003318787,
                                    Y: 0.11481258273124695,
                                },
                                {
                                    X: 0.6681270003318787,
                                    Y: 0.13497582077980042,
                                },
                                {
                                    X: 0.5581991672515869,
                                    Y: 0.13497582077980042,
                                },
                            ],
                        },
                        Id: 'a73ee78e-edf8-4ea9-8d67-d2f7eeee25ba',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.30876159667969,
                        Text: 'back',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.09305637329816818,
                                Height: 0.026030369102954865,
                                Left: 0.6796802878379822,
                                Top: 0.10949955135583878,
                            },
                            Polygon: [
                                {
                                    X: 0.6796802878379822,
                                    Y: 0.10949955135583878,
                                },
                                {
                                    X: 0.772736668586731,
                                    Y: 0.10949955135583878,
                                },
                                {
                                    X: 0.772736668586731,
                                    Y: 0.13552992045879364,
                                },
                                {
                                    X: 0.6796802878379822,
                                    Y: 0.13552992045879364,
                                },
                            ],
                        },
                        Id: '9a14398d-06c7-4e4a-a3bd-8e03cd383e5e',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 74.26154327392578,
                        Text: "'I",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.01785917952656746,
                                Height: 0.018168039619922638,
                                Left: 0.22228491306304932,
                                Top: 0.16890278458595276,
                            },
                            Polygon: [
                                {
                                    X: 0.22228491306304932,
                                    Y: 0.16890278458595276,
                                },
                                {
                                    X: 0.24014408886432648,
                                    Y: 0.16890278458595276,
                                },
                                {
                                    X: 0.24014408886432648,
                                    Y: 0.1870708167552948,
                                },
                                {
                                    X: 0.22228491306304932,
                                    Y: 0.1870708167552948,
                                },
                            ],
                        },
                        Id: 'fdbd3f39-8b5c-488a-8332-0242eb4aa069',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.76412963867188,
                        Text: 'can',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04538514092564583,
                                Height: 0.014101419597864151,
                                Left: 0.2465854436159134,
                                Top: 0.17260998487472534,
                            },
                            Polygon: [
                                {
                                    X: 0.2465854436159134,
                                    Y: 0.17260998487472534,
                                },
                                {
                                    X: 0.2919705808162689,
                                    Y: 0.17260998487472534,
                                },
                                {
                                    X: 0.2919705808162689,
                                    Y: 0.1867114007472992,
                                },
                                {
                                    X: 0.2465854436159134,
                                    Y: 0.1867114007472992,
                                },
                            ],
                        },
                        Id: '0eef19da-c495-46e0-a28c-cedb1e3e7fcb',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.61634063720703,
                        Text: 'talk',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0480499193072319,
                                Height: 0.019056620076298714,
                                Left: 0.2999002933502197,
                                Top: 0.16829878091812134,
                            },
                            Polygon: [
                                {
                                    X: 0.2999002933502197,
                                    Y: 0.16829878091812134,
                                },
                                {
                                    X: 0.3479502201080322,
                                    Y: 0.16829878091812134,
                                },
                                {
                                    X: 0.3479502201080322,
                                    Y: 0.1873553991317749,
                                },
                                {
                                    X: 0.2999002933502197,
                                    Y: 0.1873553991317749,
                                },
                            ],
                        },
                        Id: 'febd8d97-202f-4d6a-9f67-8c1d44bd2e69',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.57404327392578,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02472635917365551,
                                Height: 0.01744884066283703,
                                Left: 0.35442814230918884,
                                Top: 0.1698165386915207,
                            },
                            Polygon: [
                                {
                                    X: 0.35442814230918884,
                                    Y: 0.1698165386915207,
                                },
                                {
                                    X: 0.3791545033454895,
                                    Y: 0.1698165386915207,
                                },
                                {
                                    X: 0.3791545033454895,
                                    Y: 0.18726538121700287,
                                },
                                {
                                    X: 0.35442814230918884,
                                    Y: 0.18726538121700287,
                                },
                            ],
                        },
                        Id: '56056547-f188-4ffb-973f-b153a414bd05',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.70040130615234,
                        Text: 'those',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06689081341028214,
                                Height: 0.018492870032787323,
                                Left: 0.3865256607532501,
                                Top: 0.16859203577041626,
                            },
                            Polygon: [
                                {
                                    X: 0.3865256607532501,
                                    Y: 0.16859203577041626,
                                },
                                {
                                    X: 0.45341646671295166,
                                    Y: 0.16859203577041626,
                                },
                                {
                                    X: 0.45341646671295166,
                                    Y: 0.18708491325378418,
                                },
                                {
                                    X: 0.3865256607532501,
                                    Y: 0.18708491325378418,
                                },
                            ],
                        },
                        Id: '7fe970a6-3284-4a61-9bf6-04f138c6f515',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.79348754882812,
                        Text: 'bullies,',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10569793730974197,
                                Height: 0.020206870511174202,
                                Left: 0.45990926027297974,
                                Top: 0.1681831032037735,
                            },
                            Polygon: [
                                {
                                    X: 0.45990926027297974,
                                    Y: 0.1681831032037735,
                                },
                                {
                                    X: 0.5656071901321411,
                                    Y: 0.1681831032037735,
                                },
                                {
                                    X: 0.5656071901321411,
                                    Y: 0.18838997185230255,
                                },
                                {
                                    X: 0.45990926027297974,
                                    Y: 0.18838997185230255,
                                },
                            ],
                        },
                        Id: 'd130016e-98c5-4daa-be9e-786c16f96768',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.72726440429688,
                        Text: 'Princess',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10405027866363525,
                                Height: 0.017577409744262695,
                                Left: 0.576833963394165,
                                Top: 0.1692599207162857,
                            },
                            Polygon: [
                                {
                                    X: 0.576833963394165,
                                    Y: 0.1692599207162857,
                                },
                                {
                                    X: 0.6808842420578003,
                                    Y: 0.1692599207162857,
                                },
                                {
                                    X: 0.6808842420578003,
                                    Y: 0.1868373304605484,
                                },
                                {
                                    X: 0.576833963394165,
                                    Y: 0.1868373304605484,
                                },
                            ],
                        },
                        Id: '19998e7f-b84a-43e5-a2d6-007f28973ceb',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.58432006835938,
                        Text: 'Adhan',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08644711971282959,
                                Height: 0.02021297998726368,
                                Left: 0.6873289346694946,
                                Top: 0.16768161952495575,
                            },
                            Polygon: [
                                {
                                    X: 0.6873289346694946,
                                    Y: 0.16768161952495575,
                                },
                                {
                                    X: 0.7737760543823242,
                                    Y: 0.16768161952495575,
                                },
                                {
                                    X: 0.7737760543823242,
                                    Y: 0.18789459764957428,
                                },
                                {
                                    X: 0.6873289346694946,
                                    Y: 0.18789459764957428,
                                },
                            ],
                        },
                        Id: 'b454e2ca-8a45-4037-a484-0600552b7e43',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.1742172241211,
                        Text: 'says.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.059613291174173355,
                                Height: 0.016758879646658897,
                                Left: 0.7811951637268066,
                                Top: 0.17259785532951355,
                            },
                            Polygon: [
                                {
                                    X: 0.7811951637268066,
                                    Y: 0.17259785532951355,
                                },
                                {
                                    X: 0.8408084511756897,
                                    Y: 0.17259785532951355,
                                },
                                {
                                    X: 0.8408084511756897,
                                    Y: 0.1893567442893982,
                                },
                                {
                                    X: 0.7811951637268066,
                                    Y: 0.1893567442893982,
                                },
                            ],
                        },
                        Id: 'ea19bbbd-ab86-4834-a750-6321d4f88ad0',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 97.52269744873047,
                        Text: "'No,'",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05698736011981964,
                                Height: 0.01979205012321472,
                                Left: 0.24345023930072784,
                                Top: 0.19731442630290985,
                            },
                            Polygon: [
                                {
                                    X: 0.24345023930072784,
                                    Y: 0.19731442630290985,
                                },
                                {
                                    X: 0.3004375994205475,
                                    Y: 0.19731442630290985,
                                },
                                {
                                    X: 0.3004375994205475,
                                    Y: 0.21710647642612457,
                                },
                                {
                                    X: 0.24345023930072784,
                                    Y: 0.21710647642612457,
                                },
                            ],
                        },
                        Id: 'e8e79ca9-38bf-4cbb-829b-e939e325e833',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.532470703125,
                        Text: 'Merlin',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08128538727760315,
                                Height: 0.018892770633101463,
                                Left: 0.31581544876098633,
                                Top: 0.19720347225666046,
                            },
                            Polygon: [
                                {
                                    X: 0.31581544876098633,
                                    Y: 0.19720347225666046,
                                },
                                {
                                    X: 0.3971008360385895,
                                    Y: 0.19720347225666046,
                                },
                                {
                                    X: 0.3971008360385895,
                                    Y: 0.21609623730182648,
                                },
                                {
                                    X: 0.31581544876098633,
                                    Y: 0.21609623730182648,
                                },
                            ],
                        },
                        Id: '1016f8c6-c4e3-4ffa-995c-381584ed1cae',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.26207733154297,
                        Text: 'answers.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.11105004698038101,
                                Height: 0.013760440051555634,
                                Left: 0.41196754574775696,
                                Top: 0.20170597732067108,
                            },
                            Polygon: [
                                {
                                    X: 0.41196754574775696,
                                    Y: 0.20170597732067108,
                                },
                                {
                                    X: 0.5230175852775574,
                                    Y: 0.20170597732067108,
                                },
                                {
                                    X: 0.5230175852775574,
                                    Y: 0.2154664248228073,
                                },
                                {
                                    X: 0.41196754574775696,
                                    Y: 0.2154664248228073,
                                },
                            ],
                        },
                        Id: '7b9bba6e-7af1-4a00-9cc7-68768689a606',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 90.07518005371094,
                        Text: "'They",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06972873210906982,
                                Height: 0.020900730043649673,
                                Left: 0.5381658673286438,
                                Top: 0.19731566309928894,
                            },
                            Polygon: [
                                {
                                    X: 0.5381658673286438,
                                    Y: 0.19731566309928894,
                                },
                                {
                                    X: 0.6078945994377136,
                                    Y: 0.19731566309928894,
                                },
                                {
                                    X: 0.6078945994377136,
                                    Y: 0.21821638941764832,
                                },
                                {
                                    X: 0.5381658673286438,
                                    Y: 0.21821638941764832,
                                },
                            ],
                        },
                        Id: 'afa7b325-352b-4600-9e3e-4c9466a65cdc',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.79351806640625,
                        Text: 'call',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.044345200061798096,
                                Height: 0.018689870834350586,
                                Left: 0.6216939091682434,
                                Top: 0.19727960228919983,
                            },
                            Polygon: [
                                {
                                    X: 0.6216939091682434,
                                    Y: 0.19727960228919983,
                                },
                                {
                                    X: 0.6660391092300415,
                                    Y: 0.19727960228919983,
                                },
                                {
                                    X: 0.6660391092300415,
                                    Y: 0.21596947312355042,
                                },
                                {
                                    X: 0.6216939091682434,
                                    Y: 0.21596947312355042,
                                },
                            ],
                        },
                        Id: '602f14b8-1c18-445b-a6b6-7ecd287dc124',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.32410430908203,
                        Text: 'me',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03962074965238571,
                                Height: 0.013403479941189289,
                                Left: 0.6796505451202393,
                                Top: 0.20177841186523438,
                            },
                            Polygon: [
                                {
                                    X: 0.6796505451202393,
                                    Y: 0.20177841186523438,
                                },
                                {
                                    X: 0.7192713022232056,
                                    Y: 0.20177841186523438,
                                },
                                {
                                    X: 0.7192713022232056,
                                    Y: 0.2151818871498108,
                                },
                                {
                                    X: 0.6796505451202393,
                                    Y: 0.2151818871498108,
                                },
                            ],
                        },
                        Id: 'e5d24a42-865f-4fcf-bfcf-997b4cc5b523',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.19434356689453,
                        Text: 'a',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.015879269689321518,
                                Height: 0.01383292954415083,
                                Left: 0.7325038313865662,
                                Top: 0.20164594054222107,
                            },
                            Polygon: [
                                {
                                    X: 0.7325038313865662,
                                    Y: 0.20164594054222107,
                                },
                                {
                                    X: 0.748383104801178,
                                    Y: 0.20164594054222107,
                                },
                                {
                                    X: 0.748383104801178,
                                    Y: 0.21547886729240417,
                                },
                                {
                                    X: 0.7325038313865662,
                                    Y: 0.21547886729240417,
                                },
                            ],
                        },
                        Id: '63602c43-4969-4a6c-bc02-7c4fb3fb6819',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.43717956542969,
                        Text: "\"mother's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.12403479963541031,
                                Height: 0.01783742941915989,
                                Left: 0.7628768086433411,
                                Top: 0.19652427732944489,
                            },
                            Polygon: [
                                {
                                    X: 0.7628768086433411,
                                    Y: 0.19652427732944489,
                                },
                                {
                                    X: 0.8869115710258484,
                                    Y: 0.19652427732944489,
                                },
                                {
                                    X: 0.8869115710258484,
                                    Y: 0.21436171233654022,
                                },
                                {
                                    X: 0.7628768086433411,
                                    Y: 0.21436171233654022,
                                },
                            ],
                        },
                        Id: '6a5d17de-8e47-46d1-b8f0-4e21d2809c61',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.78980255126953,
                        Text: 'boy"',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.057643499225378036,
                                Height: 0.0214000903069973,
                                Left: 0.22174474596977234,
                                Top: 0.22566309571266174,
                            },
                            Polygon: [
                                {
                                    X: 0.22174474596977234,
                                    Y: 0.22566309571266174,
                                },
                                {
                                    X: 0.2793882489204407,
                                    Y: 0.22566309571266174,
                                },
                                {
                                    X: 0.2793882489204407,
                                    Y: 0.24706318974494934,
                                },
                                {
                                    X: 0.22174474596977234,
                                    Y: 0.24706318974494934,
                                },
                            ],
                        },
                        Id: 'f395febd-5460-4de8-8e59-6a360cb19d54',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.25504302978516,
                        Text: 'without',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10100778937339783,
                                Height: 0.018348630517721176,
                                Left: 0.28681883215904236,
                                Top: 0.2255953997373581,
                            },
                            Polygon: [
                                {
                                    X: 0.28681883215904236,
                                    Y: 0.2255953997373581,
                                },
                                {
                                    X: 0.3878266215324402,
                                    Y: 0.2255953997373581,
                                },
                                {
                                    X: 0.3878266215324402,
                                    Y: 0.24394403398036957,
                                },
                                {
                                    X: 0.28681883215904236,
                                    Y: 0.24394403398036957,
                                },
                            ],
                        },
                        Id: 'fc21f6f7-f8a7-4e4e-bf3f-540f44a7ef53',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.27716827392578,
                        Text: "that!'",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06840594112873077,
                                Height: 0.01806657947599888,
                                Left: 0.39413025975227356,
                                Top: 0.22595718502998352,
                            },
                            Polygon: [
                                {
                                    X: 0.39413025975227356,
                                    Y: 0.22595718502998352,
                                },
                                {
                                    X: 0.46253618597984314,
                                    Y: 0.22595718502998352,
                                },
                                {
                                    X: 0.46253618597984314,
                                    Y: 0.24402377009391785,
                                },
                                {
                                    X: 0.39413025975227356,
                                    Y: 0.24402377009391785,
                                },
                            ],
                        },
                        Id: 'bd87dddd-6675-4cc8-81f9-8f2fcdfe9079',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 87.57200622558594,
                        Text: '"Then',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0713752880692482,
                                Height: 0.018995830789208412,
                                Left: 0.24376697838306427,
                                Top: 0.2542647123336792,
                            },
                            Polygon: [
                                {
                                    X: 0.24376697838306427,
                                    Y: 0.2542647123336792,
                                },
                                {
                                    X: 0.31514227390289307,
                                    Y: 0.2542647123336792,
                                },
                                {
                                    X: 0.31514227390289307,
                                    Y: 0.27326053380966187,
                                },
                                {
                                    X: 0.24376697838306427,
                                    Y: 0.27326053380966187,
                                },
                            ],
                        },
                        Id: '3973d126-cd7d-4b2b-86a4-94386054dbc9',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.40813446044922,
                        Text: 'your',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05786668881773949,
                                Height: 0.016854459419846535,
                                Left: 0.3232148587703705,
                                Top: 0.2584698796272278,
                            },
                            Polygon: [
                                {
                                    X: 0.3232148587703705,
                                    Y: 0.2584698796272278,
                                },
                                {
                                    X: 0.38108155131340027,
                                    Y: 0.2584698796272278,
                                },
                                {
                                    X: 0.38108155131340027,
                                    Y: 0.27532434463500977,
                                },
                                {
                                    X: 0.3232148587703705,
                                    Y: 0.27532434463500977,
                                },
                            ],
                        },
                        Id: 'd7ba6c8e-65d0-4748-8b94-673abb33b75b',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.67347717285156,
                        Text: 'father',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07490987330675125,
                                Height: 0.01941538043320179,
                                Left: 0.38861820101737976,
                                Top: 0.25399839878082275,
                            },
                            Polygon: [
                                {
                                    X: 0.38861820101737976,
                                    Y: 0.25399839878082275,
                                },
                                {
                                    X: 0.4635280668735504,
                                    Y: 0.25399839878082275,
                                },
                                {
                                    X: 0.4635280668735504,
                                    Y: 0.2734137773513794,
                                },
                                {
                                    X: 0.38861820101737976,
                                    Y: 0.2734137773513794,
                                },
                            ],
                        },
                        Id: 'fd037f76-bb71-47e9-9a71-7ddbe1d4cf00',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.26234436035156,
                        Text: 'can',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.046226151287555695,
                                Height: 0.012549339793622494,
                                Left: 0.46972835063934326,
                                Top: 0.25957822799682617,
                            },
                            Polygon: [
                                {
                                    X: 0.46972835063934326,
                                    Y: 0.25957822799682617,
                                },
                                {
                                    X: 0.5159544944763184,
                                    Y: 0.25957822799682617,
                                },
                                {
                                    X: 0.5159544944763184,
                                    Y: 0.27212756872177124,
                                },
                                {
                                    X: 0.46972835063934326,
                                    Y: 0.27212756872177124,
                                },
                            ],
                        },
                        Id: 'a19e2a8f-5dfd-456b-a837-1395c20484c4',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 93.31333923339844,
                        Text: 'speak',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07080770283937454,
                                Height: 0.02030532993376255,
                                Left: 0.5232520699501038,
                                Top: 0.2548426687717438,
                            },
                            Polygon: [
                                {
                                    X: 0.5232520699501038,
                                    Y: 0.2548426687717438,
                                },
                                {
                                    X: 0.5940597653388977,
                                    Y: 0.2548426687717438,
                                },
                                {
                                    X: 0.5940597653388977,
                                    Y: 0.2751480042934418,
                                },
                                {
                                    X: 0.5232520699501038,
                                    Y: 0.2751480042934418,
                                },
                            ],
                        },
                        Id: 'e4092876-ebb4-4d65-a034-45f1980ac29c',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.67871856689453,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.024896850809454918,
                                Height: 0.016943100839853287,
                                Left: 0.6012561917304993,
                                Top: 0.2558204233646393,
                            },
                            Polygon: [
                                {
                                    X: 0.6012561917304993,
                                    Y: 0.2558204233646393,
                                },
                                {
                                    X: 0.6261530518531799,
                                    Y: 0.2558204233646393,
                                },
                                {
                                    X: 0.6261530518531799,
                                    Y: 0.27276352047920227,
                                },
                                {
                                    X: 0.6012561917304993,
                                    Y: 0.27276352047920227,
                                },
                            ],
                        },
                        Id: '71dbb18e-5635-4af2-8a4c-4765b3c6656e',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.68865203857422,
                        Text: 'them',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0648685097694397,
                                Height: 0.018782610073685646,
                                Left: 0.6330200433731079,
                                Top: 0.25426703691482544,
                            },
                            Polygon: [
                                {
                                    X: 0.6330200433731079,
                                    Y: 0.25426703691482544,
                                },
                                {
                                    X: 0.6978885531425476,
                                    Y: 0.25426703691482544,
                                },
                                {
                                    X: 0.6978885531425476,
                                    Y: 0.27304965257644653,
                                },
                                {
                                    X: 0.6330200433731079,
                                    Y: 0.27304965257644653,
                                },
                            ],
                        },
                        Id: '19c2f463-5ea4-4d7c-b513-b9391ccbfc57',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.68993377685547,
                        Text: 'after',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0582101009786129,
                                Height: 0.01822430081665516,
                                Left: 0.705029308795929,
                                Top: 0.25453832745552063,
                            },
                            Polygon: [
                                {
                                    X: 0.705029308795929,
                                    Y: 0.25453832745552063,
                                },
                                {
                                    X: 0.7632393836975098,
                                    Y: 0.25453832745552063,
                                },
                                {
                                    X: 0.7632393836975098,
                                    Y: 0.27276262640953064,
                                },
                                {
                                    X: 0.705029308795929,
                                    Y: 0.27276262640953064,
                                },
                            ],
                        },
                        Id: '3136b09f-bb04-4e1f-b1fa-69029ba40c16',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.69721984863281,
                        Text: 'he',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.030879400670528412,
                                Height: 0.018116550520062447,
                                Left: 0.7699964046478271,
                                Top: 0.2546326518058777,
                            },
                            Polygon: [
                                {
                                    X: 0.7699964046478271,
                                    Y: 0.2546326518058777,
                                },
                                {
                                    X: 0.8008757829666138,
                                    Y: 0.2546326518058777,
                                },
                                {
                                    X: 0.8008757829666138,
                                    Y: 0.2727491855621338,
                                },
                                {
                                    X: 0.7699964046478271,
                                    Y: 0.2727491855621338,
                                },
                            ],
                        },
                        Id: 'de29f4c1-e60f-4a02-a3fa-7018626d716c',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.9916763305664,
                        Text: 'comes',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07941599935293198,
                                Height: 0.015570039860904217,
                                Left: 0.8073760271072388,
                                Top: 0.2576090395450592,
                            },
                            Polygon: [
                                {
                                    X: 0.8073760271072388,
                                    Y: 0.2576090395450592,
                                },
                                {
                                    X: 0.886792004108429,
                                    Y: 0.2576090395450592,
                                },
                                {
                                    X: 0.886792004108429,
                                    Y: 0.2731790840625763,
                                },
                                {
                                    X: 0.8073760271072388,
                                    Y: 0.2731790840625763,
                                },
                            ],
                        },
                        Id: '0df09828-e632-4b43-843c-ef819151c8a3',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.42254638671875,
                        Text: 'home,',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0831204503774643,
                                Height: 0.022261319682002068,
                                Left: 0.22116626799106598,
                                Top: 0.28157272934913635,
                            },
                            Polygon: [
                                {
                                    X: 0.22116626799106598,
                                    Y: 0.28157272934913635,
                                },
                                {
                                    X: 0.3042867183685303,
                                    Y: 0.28157272934913635,
                                },
                                {
                                    X: 0.3042867183685303,
                                    Y: 0.30383405089378357,
                                },
                                {
                                    X: 0.22116626799106598,
                                    Y: 0.30383405089378357,
                                },
                            ],
                        },
                        Id: '348689a3-fefe-4212-ba75-39ea935c56f6',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.4723129272461,
                        Text: 'she',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.042183201760053635,
                                Height: 0.018540089949965477,
                                Left: 0.31602370738983154,
                                Top: 0.2830814719200134,
                            },
                            Polygon: [
                                {
                                    X: 0.31602370738983154,
                                    Y: 0.2830814719200134,
                                },
                                {
                                    X: 0.3582068979740143,
                                    Y: 0.2830814719200134,
                                },
                                {
                                    X: 0.3582068979740143,
                                    Y: 0.30162155628204346,
                                },
                                {
                                    X: 0.31602370738983154,
                                    Y: 0.30162155628204346,
                                },
                            ],
                        },
                        Id: 'ec9fa752-a17d-4604-9d30-a61a967c9e04',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.51704406738281,
                        Text: 'smiles.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08331046998500824,
                                Height: 0.019658269360661507,
                                Left: 0.3657292127609253,
                                Top: 0.28253766894340515,
                            },
                            Polygon: [
                                {
                                    X: 0.3657292127609253,
                                    Y: 0.28253766894340515,
                                },
                                {
                                    X: 0.44903966784477234,
                                    Y: 0.28253766894340515,
                                },
                                {
                                    X: 0.44903966784477234,
                                    Y: 0.3021959364414215,
                                },
                                {
                                    X: 0.3657292127609253,
                                    Y: 0.3021959364414215,
                                },
                            ],
                        },
                        Id: '7a007987-85df-44d0-8fea-ea6c3b078122',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 96.1572265625,
                        Text: "'But",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.051592081785202026,
                                Height: 0.018522579222917557,
                                Left: 0.45919206738471985,
                                Top: 0.28335392475128174,
                            },
                            Polygon: [
                                {
                                    X: 0.45919206738471985,
                                    Y: 0.28335392475128174,
                                },
                                {
                                    X: 0.5107841491699219,
                                    Y: 0.28335392475128174,
                                },
                                {
                                    X: 0.5107841491699219,
                                    Y: 0.3018764853477478,
                                },
                                {
                                    X: 0.45919206738471985,
                                    Y: 0.3018764853477478,
                                },
                            ],
                        },
                        Id: '977f5dac-8145-419f-837e-21358a93db5f',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.22407531738281,
                        Text: 'be',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02870820090174675,
                                Height: 0.018403170630335808,
                                Left: 0.5182868242263794,
                                Top: 0.28317856788635254,
                            },
                            Polygon: [
                                {
                                    X: 0.5182868242263794,
                                    Y: 0.28317856788635254,
                                },
                                {
                                    X: 0.5469949841499329,
                                    Y: 0.28317856788635254,
                                },
                                {
                                    X: 0.5469949841499329,
                                    Y: 0.3015817403793335,
                                },
                                {
                                    X: 0.5182868242263794,
                                    Y: 0.3015817403793335,
                                },
                            ],
                        },
                        Id: '5215b92a-77f1-4bec-8a3b-b5dd74f0a868',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.72785186767578,
                        Text: 'careful',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08600612729787827,
                                Height: 0.017884839326143265,
                                Left: 0.5547223687171936,
                                Top: 0.28331395983695984,
                            },
                            Polygon: [
                                {
                                    X: 0.5547223687171936,
                                    Y: 0.28331395983695984,
                                },
                                {
                                    X: 0.6407284736633301,
                                    Y: 0.28331395983695984,
                                },
                                {
                                    X: 0.6407284736633301,
                                    Y: 0.301198810338974,
                                },
                                {
                                    X: 0.5547223687171936,
                                    Y: 0.301198810338974,
                                },
                            ],
                        },
                        Id: 'e52b2932-b026-4b8d-a767-8dcdbc7e06ff',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.5830078125,
                        Text: 'with',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05626535043120384,
                                Height: 0.018960479646921158,
                                Left: 0.6492016911506653,
                                Top: 0.2827451229095459,
                            },
                            Polygon: [
                                {
                                    X: 0.6492016911506653,
                                    Y: 0.2827451229095459,
                                },
                                {
                                    X: 0.7054670453071594,
                                    Y: 0.2827451229095459,
                                },
                                {
                                    X: 0.7054670453071594,
                                    Y: 0.30170559883117676,
                                },
                                {
                                    X: 0.6492016911506653,
                                    Y: 0.30170559883117676,
                                },
                            ],
                        },
                        Id: 'ef019530-07d9-4f88-9a74-63392db38aa5',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.59253692626953,
                        Text: 'Morfran.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.11043719947338104,
                                Height: 0.01803744025528431,
                                Left: 0.7130684852600098,
                                Top: 0.28321993350982666,
                            },
                            Polygon: [
                                {
                                    X: 0.7130684852600098,
                                    Y: 0.28321993350982666,
                                },
                                {
                                    X: 0.823505699634552,
                                    Y: 0.28321993350982666,
                                },
                                {
                                    X: 0.823505699634552,
                                    Y: 0.3012573719024658,
                                },
                                {
                                    X: 0.7130684852600098,
                                    Y: 0.3012573719024658,
                                },
                            ],
                        },
                        Id: 'c8ed36dc-9a63-479a-ab89-c84e7e4ff7de',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.29951477050781,
                        Text: "He's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05335859954357147,
                                Height: 0.01782136969268322,
                                Left: 0.8331401944160461,
                                Top: 0.2835133969783783,
                            },
                            Polygon: [
                                {
                                    X: 0.8331401944160461,
                                    Y: 0.2835133969783783,
                                },
                                {
                                    X: 0.8864988088607788,
                                    Y: 0.2835133969783783,
                                },
                                {
                                    X: 0.8864988088607788,
                                    Y: 0.30133476853370667,
                                },
                                {
                                    X: 0.8331401944160461,
                                    Y: 0.30133476853370667,
                                },
                            ],
                        },
                        Id: 'f310435c-28d8-4fe2-86c1-09180151e4a1',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.8234634399414,
                        Text: "Ceridwen's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.13573722541332245,
                                Height: 0.018237590789794922,
                                Left: 0.22171887755393982,
                                Top: 0.31161928176879883,
                            },
                            Polygon: [
                                {
                                    X: 0.22171887755393982,
                                    Y: 0.31161928176879883,
                                },
                                {
                                    X: 0.3574560880661011,
                                    Y: 0.31161928176879883,
                                },
                                {
                                    X: 0.3574560880661011,
                                    Y: 0.32985687255859375,
                                },
                                {
                                    X: 0.22171887755393982,
                                    Y: 0.32985687255859375,
                                },
                            ],
                        },
                        Id: '28caddeb-3622-4e52-bea3-174ef66373cd',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.57743072509766,
                        Text: "son.'",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05618780106306076,
                                Height: 0.01759897917509079,
                                Left: 0.3654889762401581,
                                Top: 0.3123074769973755,
                            },
                            Polygon: [
                                {
                                    X: 0.3654889762401581,
                                    Y: 0.3123074769973755,
                                },
                                {
                                    X: 0.42167678475379944,
                                    Y: 0.3123074769973755,
                                },
                                {
                                    X: 0.42167678475379944,
                                    Y: 0.3299064636230469,
                                },
                                {
                                    X: 0.3654889762401581,
                                    Y: 0.3299064636230469,
                                },
                            ],
                        },
                        Id: '4fe75886-ed10-42d3-bb7b-530dd473ef50',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.5943832397461,
                        Text: 'Next',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05890021100640297,
                                Height: 0.018526369705796242,
                                Left: 0.24272292852401733,
                                Top: 0.34044885635375977,
                            },
                            Polygon: [
                                {
                                    X: 0.24272292852401733,
                                    Y: 0.34044885635375977,
                                },
                                {
                                    X: 0.30162313580513,
                                    Y: 0.34044885635375977,
                                },
                                {
                                    X: 0.30162313580513,
                                    Y: 0.35897523164749146,
                                },
                                {
                                    X: 0.24272292852401733,
                                    Y: 0.35897523164749146,
                                },
                            ],
                        },
                        Id: 'b365e0e3-4a82-4101-a60b-0757c59b9836',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.40872955322266,
                        Text: 'week,',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07077279686927795,
                                Height: 0.019380809739232063,
                                Left: 0.30936798453330994,
                                Top: 0.3404584228992462,
                            },
                            Polygon: [
                                {
                                    X: 0.30936798453330994,
                                    Y: 0.3404584228992462,
                                },
                                {
                                    X: 0.3801407814025879,
                                    Y: 0.3404584228992462,
                                },
                                {
                                    X: 0.3801407814025879,
                                    Y: 0.35983923077583313,
                                },
                                {
                                    X: 0.30936798453330994,
                                    Y: 0.35983923077583313,
                                },
                            ],
                        },
                        Id: '8bfbc909-3761-4ee3-81b5-7eadb8123b50',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.59622955322266,
                        Text: 'Merlin',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08220258355140686,
                                Height: 0.018970850855112076,
                                Left: 0.3894570469856262,
                                Top: 0.34005939960479736,
                            },
                            Polygon: [
                                {
                                    X: 0.3894570469856262,
                                    Y: 0.34005939960479736,
                                },
                                {
                                    X: 0.4716596305370331,
                                    Y: 0.34005939960479736,
                                },
                                {
                                    X: 0.4716596305370331,
                                    Y: 0.35903024673461914,
                                },
                                {
                                    X: 0.3894570469856262,
                                    Y: 0.35903024673461914,
                                },
                            ],
                        },
                        Id: '712f4f68-37c0-4148-881f-d5ce8e08bd8f',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.50816345214844,
                        Text: 'goes',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.054853130131959915,
                                Height: 0.017020300030708313,
                                Left: 0.48043209314346313,
                                Top: 0.34455350041389465,
                            },
                            Polygon: [
                                {
                                    X: 0.48043209314346313,
                                    Y: 0.34455350041389465,
                                },
                                {
                                    X: 0.535285234451294,
                                    Y: 0.34455350041389465,
                                },
                                {
                                    X: 0.535285234451294,
                                    Y: 0.3615737855434418,
                                },
                                {
                                    X: 0.48043209314346313,
                                    Y: 0.3615737855434418,
                                },
                            ],
                        },
                        Id: '3b0c7212-70b8-432a-85a5-b49162c14c67',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.68738555908203,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02480890043079853,
                                Height: 0.01731855981051922,
                                Left: 0.5434699058532715,
                                Top: 0.34133774042129517,
                            },
                            Polygon: [
                                {
                                    X: 0.5434699058532715,
                                    Y: 0.34133774042129517,
                                },
                                {
                                    X: 0.5682787895202637,
                                    Y: 0.34133774042129517,
                                },
                                {
                                    X: 0.5682787895202637,
                                    Y: 0.35865628719329834,
                                },
                                {
                                    X: 0.5434699058532715,
                                    Y: 0.35865628719329834,
                                },
                            ],
                        },
                        Id: 'be97557d-bbb3-4daf-9883-063283291348',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.67781066894531,
                        Text: 'the',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.041978128254413605,
                                Height: 0.017829529941082,
                                Left: 0.5761817693710327,
                                Top: 0.34066256880760193,
                            },
                            Polygon: [
                                {
                                    X: 0.5761817693710327,
                                    Y: 0.34066256880760193,
                                },
                                {
                                    X: 0.6181598901748657,
                                    Y: 0.34066256880760193,
                                },
                                {
                                    X: 0.6181598901748657,
                                    Y: 0.3584921061992645,
                                },
                                {
                                    X: 0.5761817693710327,
                                    Y: 0.3584921061992645,
                                },
                            ],
                        },
                        Id: '13b75c4c-0e41-4df0-8a2c-05a935adc531',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.74432373046875,
                        Text: 'village',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08121901005506516,
                                Height: 0.021604059264063835,
                                Left: 0.6261976361274719,
                                Top: 0.3400820195674896,
                            },
                            Polygon: [
                                {
                                    X: 0.6261976361274719,
                                    Y: 0.3400820195674896,
                                },
                                {
                                    X: 0.7074166536331177,
                                    Y: 0.3400820195674896,
                                },
                                {
                                    X: 0.7074166536331177,
                                    Y: 0.3616860806941986,
                                },
                                {
                                    X: 0.6261976361274719,
                                    Y: 0.3616860806941986,
                                },
                            ],
                        },
                        Id: '53872cae-72f6-4a0e-9486-81a73f4abfd6',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.67503356933594,
                        Text: 'shop',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.059715598821640015,
                                Height: 0.021123280748724937,
                                Left: 0.7153552174568176,
                                Top: 0.3404134213924408,
                            },
                            Polygon: [
                                {
                                    X: 0.7153552174568176,
                                    Y: 0.3404134213924408,
                                },
                                {
                                    X: 0.7750707864761353,
                                    Y: 0.3404134213924408,
                                },
                                {
                                    X: 0.7750707864761353,
                                    Y: 0.3615367114543915,
                                },
                                {
                                    X: 0.7153552174568176,
                                    Y: 0.3615367114543915,
                                },
                            ],
                        },
                        Id: '3e9d787a-ce9a-40e7-b788-259ea3016f72',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.52623748779297,
                        Text: 'with',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.057229429483413696,
                                Height: 0.02002524957060814,
                                Left: 0.7830783724784851,
                                Top: 0.3398398756980896,
                            },
                            Polygon: [
                                {
                                    X: 0.7830783724784851,
                                    Y: 0.3398398756980896,
                                },
                                {
                                    X: 0.8403078317642212,
                                    Y: 0.3398398756980896,
                                },
                                {
                                    X: 0.8403078317642212,
                                    Y: 0.35986512899398804,
                                },
                                {
                                    X: 0.7830783724784851,
                                    Y: 0.35986512899398804,
                                },
                            ],
                        },
                        Id: '2845101c-4af5-4bd7-9129-b6106a4c6d53',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.35469818115234,
                        Text: 'his',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0366177000105381,
                                Height: 0.018809080123901367,
                                Left: 0.8494420051574707,
                                Top: 0.34014296531677246,
                            },
                            Polygon: [
                                {
                                    X: 0.8494420051574707,
                                    Y: 0.34014296531677246,
                                },
                                {
                                    X: 0.8860597014427185,
                                    Y: 0.34014296531677246,
                                },
                                {
                                    X: 0.8860597014427185,
                                    Y: 0.35895204544067383,
                                },
                                {
                                    X: 0.8494420051574707,
                                    Y: 0.35895204544067383,
                                },
                            ],
                        },
                        Id: '4cba2d44-90cd-45f6-aa1a-d950c520c1a9',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.60105895996094,
                        Text: 'mother.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.09728030115365982,
                                Height: 0.018151819705963135,
                                Left: 0.22191384434700012,
                                Top: 0.36899274587631226,
                            },
                            Polygon: [
                                {
                                    X: 0.22191384434700012,
                                    Y: 0.36899274587631226,
                                },
                                {
                                    X: 0.31919413805007935,
                                    Y: 0.36899274587631226,
                                },
                                {
                                    X: 0.31919413805007935,
                                    Y: 0.3871445655822754,
                                },
                                {
                                    X: 0.22191384434700012,
                                    Y: 0.3871445655822754,
                                },
                            ],
                        },
                        Id: 'eea13bd0-01d1-4257-bc63-53d221535c03',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.62749481201172,
                        Text: 'He',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03608626127243042,
                                Height: 0.017481569200754166,
                                Left: 0.3310970366001129,
                                Top: 0.36963433027267456,
                            },
                            Polygon: [
                                {
                                    X: 0.3310970366001129,
                                    Y: 0.36963433027267456,
                                },
                                {
                                    X: 0.36718329787254333,
                                    Y: 0.36963433027267456,
                                },
                                {
                                    X: 0.36718329787254333,
                                    Y: 0.3871158957481384,
                                },
                                {
                                    X: 0.3310970366001129,
                                    Y: 0.3871158957481384,
                                },
                            ],
                        },
                        Id: '0f3e6c50-d663-4622-a609-60e85cfc2f8e',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.39278411865234,
                        Text: 'sits',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0416158102452755,
                                Height: 0.01708466000854969,
                                Left: 0.3782278299331665,
                                Top: 0.3701823353767395,
                            },
                            Polygon: [
                                {
                                    X: 0.3782278299331665,
                                    Y: 0.3701823353767395,
                                },
                                {
                                    X: 0.4198436439037323,
                                    Y: 0.3701823353767395,
                                },
                                {
                                    X: 0.4198436439037323,
                                    Y: 0.38726699352264404,
                                },
                                {
                                    X: 0.3782278299331665,
                                    Y: 0.38726699352264404,
                                },
                            ],
                        },
                        Id: 'f8941768-dc50-4a3a-9e46-774bddddfea2',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.93767547607422,
                        Text: 'near',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.058799438178539276,
                                Height: 0.013090490363538265,
                                Left: 0.4314473271369934,
                                Top: 0.37351465225219727,
                            },
                            Polygon: [
                                {
                                    X: 0.4314473271369934,
                                    Y: 0.37351465225219727,
                                },
                                {
                                    X: 0.4902467727661133,
                                    Y: 0.37351465225219727,
                                },
                                {
                                    X: 0.4902467727661133,
                                    Y: 0.3866051435470581,
                                },
                                {
                                    X: 0.4314473271369934,
                                    Y: 0.3866051435470581,
                                },
                            ],
                        },
                        Id: 'ee4d0f61-94af-4b4f-963c-7ced6ebf7b6c',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.5992202758789,
                        Text: 'the',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04161309823393822,
                                Height: 0.018207479268312454,
                                Left: 0.5013095140457153,
                                Top: 0.3689536154270172,
                            },
                            Polygon: [
                                {
                                    X: 0.5013095140457153,
                                    Y: 0.3689536154270172,
                                },
                                {
                                    X: 0.5429226160049438,
                                    Y: 0.3689536154270172,
                                },
                                {
                                    X: 0.5429226160049438,
                                    Y: 0.38716110587120056,
                                },
                                {
                                    X: 0.5013095140457153,
                                    Y: 0.38716110587120056,
                                },
                            ],
                        },
                        Id: 'b15faf9c-a7ad-46b0-8284-b51cbc4e8bd9',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.59737396240234,
                        Text: 'door',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05813544988632202,
                                Height: 0.01831956021487713,
                                Left: 0.5545485019683838,
                                Top: 0.36885184049606323,
                            },
                            Polygon: [
                                {
                                    X: 0.5545485019683838,
                                    Y: 0.36885184049606323,
                                },
                                {
                                    X: 0.6126839518547058,
                                    Y: 0.36885184049606323,
                                },
                                {
                                    X: 0.6126839518547058,
                                    Y: 0.3871713876724243,
                                },
                                {
                                    X: 0.5545485019683838,
                                    Y: 0.3871713876724243,
                                },
                            ],
                        },
                        Id: '317e0dbd-f717-4047-95cf-9256afe71be3',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.65419006347656,
                        Text: 'with',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05604654178023338,
                                Height: 0.01877875067293644,
                                Left: 0.6250101923942566,
                                Top: 0.3688300549983978,
                            },
                            Polygon: [
                                {
                                    X: 0.6250101923942566,
                                    Y: 0.3688300549983978,
                                },
                                {
                                    X: 0.6810567378997803,
                                    Y: 0.3688300549983978,
                                },
                                {
                                    X: 0.6810567378997803,
                                    Y: 0.3876087963581085,
                                },
                                {
                                    X: 0.6250101923942566,
                                    Y: 0.3876087963581085,
                                },
                            ],
                        },
                        Id: '73ce074d-376d-4867-ac77-c48c1fb79ecd',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.5385971069336,
                        Text: 'his',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.037365060299634933,
                                Height: 0.018132079392671585,
                                Left: 0.6946074366569519,
                                Top: 0.3690965175628662,
                            },
                            Polygon: [
                                {
                                    X: 0.6946074366569519,
                                    Y: 0.3690965175628662,
                                },
                                {
                                    X: 0.7319725155830383,
                                    Y: 0.3690965175628662,
                                },
                                {
                                    X: 0.7319725155830383,
                                    Y: 0.3872286081314087,
                                },
                                {
                                    X: 0.6946074366569519,
                                    Y: 0.3872286081314087,
                                },
                            ],
                        },
                        Id: 'e2c9a618-9626-4dc1-9f57-61e4b25932d5',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.70960998535156,
                        Text: 'toad',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.055503059178590775,
                                Height: 0.018951499834656715,
                                Left: 0.7436879873275757,
                                Top: 0.3687896132469177,
                            },
                            Polygon: [
                                {
                                    X: 0.7436879873275757,
                                    Y: 0.3687896132469177,
                                },
                                {
                                    X: 0.7991910576820374,
                                    Y: 0.3687896132469177,
                                },
                                {
                                    X: 0.7991910576820374,
                                    Y: 0.3877410888671875,
                                },
                                {
                                    X: 0.7436879873275757,
                                    Y: 0.3877410888671875,
                                },
                            ],
                        },
                        Id: '0e5de773-bd98-4c47-9b28-a9f702882947',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.25162506103516,
                        Text: 'in',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.025003930553793907,
                                Height: 0.017477519810199738,
                                Left: 0.8113657236099243,
                                Top: 0.36976802349090576,
                            },
                            Polygon: [
                                {
                                    X: 0.8113657236099243,
                                    Y: 0.36976802349090576,
                                },
                                {
                                    X: 0.8363696336746216,
                                    Y: 0.36976802349090576,
                                },
                                {
                                    X: 0.8363696336746216,
                                    Y: 0.3872455358505249,
                                },
                                {
                                    X: 0.8113657236099243,
                                    Y: 0.3872455358505249,
                                },
                            ],
                        },
                        Id: 'fea71a30-4b46-4f3b-a298-91b3bd79acb7',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.4247055053711,
                        Text: 'his',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.037267401814460754,
                                Height: 0.01824738085269928,
                                Left: 0.8494369983673096,
                                Top: 0.36906251311302185,
                            },
                            Polygon: [
                                {
                                    X: 0.8494369983673096,
                                    Y: 0.36906251311302185,
                                },
                                {
                                    X: 0.8867043852806091,
                                    Y: 0.36906251311302185,
                                },
                                {
                                    X: 0.8867043852806091,
                                    Y: 0.38730987906455994,
                                },
                                {
                                    X: 0.8494369983673096,
                                    Y: 0.38730987906455994,
                                },
                            ],
                        },
                        Id: '6539b086-2776-49e6-b032-afacb0521e24',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.50984954833984,
                        Text: 'hand.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07229337841272354,
                                Height: 0.018855350092053413,
                                Left: 0.22169433534145355,
                                Top: 0.39710405468940735,
                            },
                            Polygon: [
                                {
                                    X: 0.22169433534145355,
                                    Y: 0.39710405468940735,
                                },
                                {
                                    X: 0.2939877212047577,
                                    Y: 0.39710405468940735,
                                },
                                {
                                    X: 0.2939877212047577,
                                    Y: 0.4159593880176544,
                                },
                                {
                                    X: 0.22169433534145355,
                                    Y: 0.4159593880176544,
                                },
                            ],
                        },
                        Id: '4a01bd6d-4d7b-4cf2-b36c-510ab60e4bc0',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.83472442626953,
                        Text: 'Suddenly,',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.12050820142030716,
                                Height: 0.021408269181847572,
                                Left: 0.3090244233608246,
                                Top: 0.39740103483200073,
                            },
                            Polygon: [
                                {
                                    X: 0.3090244233608246,
                                    Y: 0.39740103483200073,
                                },
                                {
                                    X: 0.42953261733055115,
                                    Y: 0.39740103483200073,
                                },
                                {
                                    X: 0.42953261733055115,
                                    Y: 0.41880929470062256,
                                },
                                {
                                    X: 0.3090244233608246,
                                    Y: 0.41880929470062256,
                                },
                            ],
                        },
                        Id: '71b15e07-a633-4020-aee8-d729aac2d6f5',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.38013458251953,
                        Text: 'Morfran',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10304427146911621,
                                Height: 0.018364200368523598,
                                Left: 0.4451414942741394,
                                Top: 0.39769071340560913,
                            },
                            Polygon: [
                                {
                                    X: 0.4451414942741394,
                                    Y: 0.39769071340560913,
                                },
                                {
                                    X: 0.5481857657432556,
                                    Y: 0.39769071340560913,
                                },
                                {
                                    X: 0.5481857657432556,
                                    Y: 0.416054904460907,
                                },
                                {
                                    X: 0.4451414942741394,
                                    Y: 0.416054904460907,
                                },
                            ],
                        },
                        Id: 'e618db10-d770-43eb-8016-c8d4fe91a71d',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.36603546142578,
                        Text: 'and',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.048375241458415985,
                                Height: 0.019057879224419594,
                                Left: 0.5639002919197083,
                                Top: 0.39726102352142334,
                            },
                            Polygon: [
                                {
                                    X: 0.5639002919197083,
                                    Y: 0.39726102352142334,
                                },
                                {
                                    X: 0.6122755408287048,
                                    Y: 0.39726102352142334,
                                },
                                {
                                    X: 0.6122755408287048,
                                    Y: 0.4163188934326172,
                                },
                                {
                                    X: 0.5639002919197083,
                                    Y: 0.4163188934326172,
                                },
                            ],
                        },
                        Id: '6e6f554e-9bb3-45a8-95ba-dab7a5c2c848',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.72993469238281,
                        Text: 'Arwel',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07430583983659744,
                                Height: 0.018850600346922874,
                                Left: 0.627333402633667,
                                Top: 0.39741578698158264,
                            },
                            Polygon: [
                                {
                                    X: 0.627333402633667,
                                    Y: 0.39741578698158264,
                                },
                                {
                                    X: 0.7016392350196838,
                                    Y: 0.39741578698158264,
                                },
                                {
                                    X: 0.7016392350196838,
                                    Y: 0.41626641154289246,
                                },
                                {
                                    X: 0.627333402633667,
                                    Y: 0.41626641154289246,
                                },
                            ],
                        },
                        Id: '6f0b7443-e17a-46df-af00-d2e8c790441f',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.69796752929688,
                        Text: 'jump',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07302972674369812,
                                Height: 0.021086210384964943,
                                Left: 0.715455174446106,
                                Top: 0.3979616165161133,
                            },
                            Polygon: [
                                {
                                    X: 0.715455174446106,
                                    Y: 0.3979616165161133,
                                },
                                {
                                    X: 0.7884849309921265,
                                    Y: 0.3979616165161133,
                                },
                                {
                                    X: 0.7884849309921265,
                                    Y: 0.41904783248901367,
                                },
                                {
                                    X: 0.715455174446106,
                                    Y: 0.41904783248901367,
                                },
                            ],
                        },
                        Id: '2f497729-9f4c-4f7a-87e3-2630d635d2d6',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.45932006835938,
                        Text: 'out',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.043696459382772446,
                                Height: 0.016307059675455093,
                                Left: 0.8035260438919067,
                                Top: 0.3997155725955963,
                            },
                            Polygon: [
                                {
                                    X: 0.8035260438919067,
                                    Y: 0.3997155725955963,
                                },
                                {
                                    X: 0.8472225069999695,
                                    Y: 0.3997155725955963,
                                },
                                {
                                    X: 0.8472225069999695,
                                    Y: 0.4160226285457611,
                                },
                                {
                                    X: 0.8035260438919067,
                                    Y: 0.4160226285457611,
                                },
                            ],
                        },
                        Id: 'ed07ba4c-b2f4-4b36-8909-9dcd549e63f5',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.58861541748047,
                        Text: 'in',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02577524073421955,
                                Height: 0.01814842037856579,
                                Left: 0.8607094883918762,
                                Top: 0.3981177508831024,
                            },
                            Polygon: [
                                {
                                    X: 0.8607094883918762,
                                    Y: 0.3981177508831024,
                                },
                                {
                                    X: 0.8864847421646118,
                                    Y: 0.3981177508831024,
                                },
                                {
                                    X: 0.8864847421646118,
                                    Y: 0.41626617312431335,
                                },
                                {
                                    X: 0.8607094883918762,
                                    Y: 0.41626617312431335,
                                },
                            ],
                        },
                        Id: 'de3acc63-8062-4701-a8ff-7f9dc0e476e5',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 92.90648651123047,
                        Text: 'front',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06146080046892166,
                                Height: 0.017985699698328972,
                                Left: 0.22189940512180328,
                                Top: 0.4260917007923126,
                            },
                            Polygon: [
                                {
                                    X: 0.22189940512180328,
                                    Y: 0.4260917007923126,
                                },
                                {
                                    X: 0.28336021304130554,
                                    Y: 0.4260917007923126,
                                },
                                {
                                    X: 0.28336021304130554,
                                    Y: 0.44407740235328674,
                                },
                                {
                                    X: 0.22189940512180328,
                                    Y: 0.44407740235328674,
                                },
                            ],
                        },
                        Id: 'a07f143f-32a9-419e-abfb-c91fc14d0303',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.52018737792969,
                        Text: 'of',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.025976810604333878,
                                Height: 0.018304400146007538,
                                Left: 0.2906390428543091,
                                Top: 0.42601948976516724,
                            },
                            Polygon: [
                                {
                                    X: 0.2906390428543091,
                                    Y: 0.42601948976516724,
                                },
                                {
                                    X: 0.31661584973335266,
                                    Y: 0.42601948976516724,
                                },
                                {
                                    X: 0.31661584973335266,
                                    Y: 0.44432389736175537,
                                },
                                {
                                    X: 0.2906390428543091,
                                    Y: 0.44432389736175537,
                                },
                            ],
                        },
                        Id: '07a465c1-26a1-48a8-b953-f0de5c34a789',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.27251434326172,
                        Text: 'him.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05619052052497864,
                                Height: 0.018547959625720978,
                                Left: 0.324646919965744,
                                Top: 0.42601820826530457,
                            },
                            Polygon: [
                                {
                                    X: 0.324646919965744,
                                    Y: 0.42601820826530457,
                                },
                                {
                                    X: 0.38083744049072266,
                                    Y: 0.42601820826530457,
                                },
                                {
                                    X: 0.38083744049072266,
                                    Y: 0.44456616044044495,
                                },
                                {
                                    X: 0.324646919965744,
                                    Y: 0.44456616044044495,
                                },
                            ],
                        },
                        Id: 'fa38c8c6-be77-4e3b-a373-c7c02c45321e',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 96.42443084716797,
                        Text: "'It's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04563144966959953,
                                Height: 0.017880380153656006,
                                Left: 0.38992801308631897,
                                Top: 0.42632177472114563,
                            },
                            Polygon: [
                                {
                                    X: 0.38992801308631897,
                                    Y: 0.42632177472114563,
                                },
                                {
                                    X: 0.4355594515800476,
                                    Y: 0.42632177472114563,
                                },
                                {
                                    X: 0.4355594515800476,
                                    Y: 0.44420215487480164,
                                },
                                {
                                    X: 0.38992801308631897,
                                    Y: 0.44420215487480164,
                                },
                            ],
                        },
                        Id: 'ff7a259a-3cb3-4daf-9e86-ca9deeab3470',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.12889862060547,
                        Text: 'Merlin',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08263196051120758,
                                Height: 0.019179049879312515,
                                Left: 0.4417853355407715,
                                Top: 0.42575645446777344,
                            },
                            Polygon: [
                                {
                                    X: 0.4417853355407715,
                                    Y: 0.42575645446777344,
                                },
                                {
                                    X: 0.5244172811508179,
                                    Y: 0.42575645446777344,
                                },
                                {
                                    X: 0.5244172811508179,
                                    Y: 0.44493550062179565,
                                },
                                {
                                    X: 0.4417853355407715,
                                    Y: 0.44493550062179565,
                                },
                            ],
                        },
                        Id: '3a73fe96-089f-44e9-97c4-94bbc023e0a1',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.50560760498047,
                        Text: 'and',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04844195023179054,
                                Height: 0.018408000469207764,
                                Left: 0.531396746635437,
                                Top: 0.4260878264904022,
                            },
                            Polygon: [
                                {
                                    X: 0.531396746635437,
                                    Y: 0.4260878264904022,
                                },
                                {
                                    X: 0.5798386931419373,
                                    Y: 0.4260878264904022,
                                },
                                {
                                    X: 0.5798386931419373,
                                    Y: 0.44449582695961,
                                },
                                {
                                    X: 0.531396746635437,
                                    Y: 0.44449582695961,
                                },
                            ],
                        },
                        Id: 'fb54f4ce-9c04-4ff1-bd9b-c655710afc34',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.14278411865234,
                        Text: 'his',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.036832429468631744,
                                Height: 0.01826893910765648,
                                Left: 0.5867096781730652,
                                Top: 0.4261948764324188,
                            },
                            Polygon: [
                                {
                                    X: 0.5867096781730652,
                                    Y: 0.4261948764324188,
                                },
                                {
                                    X: 0.6235421299934387,
                                    Y: 0.4261948764324188,
                                },
                                {
                                    X: 0.6235421299934387,
                                    Y: 0.4444638192653656,
                                },
                                {
                                    X: 0.5867096781730652,
                                    Y: 0.4444638192653656,
                                },
                            ],
                        },
                        Id: '288ca1b8-860f-4397-8fc8-b222a710ce25',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.34612274169922,
                        Text: "toad!'",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06990239769220352,
                                Height: 0.01873481087386608,
                                Left: 0.6306043267250061,
                                Top: 0.4260101616382599,
                            },
                            Polygon: [
                                {
                                    X: 0.6306043267250061,
                                    Y: 0.4260101616382599,
                                },
                                {
                                    X: 0.7005066871643066,
                                    Y: 0.4260101616382599,
                                },
                                {
                                    X: 0.7005066871643066,
                                    Y: 0.4447449743747711,
                                },
                                {
                                    X: 0.6306043267250061,
                                    Y: 0.4447449743747711,
                                },
                            ],
                        },
                        Id: '4ec19294-ad86-410a-80eb-3bde97891477',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.66990661621094,
                        Text: 'they',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05598590150475502,
                                Height: 0.021277369931340218,
                                Left: 0.7084077000617981,
                                Top: 0.4261125326156616,
                            },
                            Polygon: [
                                {
                                    X: 0.7084077000617981,
                                    Y: 0.4261125326156616,
                                },
                                {
                                    X: 0.7643936276435852,
                                    Y: 0.4261125326156616,
                                },
                                {
                                    X: 0.7643936276435852,
                                    Y: 0.4473899006843567,
                                },
                                {
                                    X: 0.7084077000617981,
                                    Y: 0.4473899006843567,
                                },
                            ],
                        },
                        Id: 'd2707e23-c901-40db-a3b2-fe7f719e0532',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.83604431152344,
                        Text: 'cry.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04392315074801445,
                                Height: 0.016700029373168945,
                                Left: 0.7701406478881836,
                                Top: 0.4300305247306824,
                            },
                            Polygon: [
                                {
                                    X: 0.7701406478881836,
                                    Y: 0.4300305247306824,
                                },
                                {
                                    X: 0.8140637874603271,
                                    Y: 0.4300305247306824,
                                },
                                {
                                    X: 0.8140637874603271,
                                    Y: 0.4467305541038513,
                                },
                                {
                                    X: 0.7701406478881836,
                                    Y: 0.4467305541038513,
                                },
                            ],
                        },
                        Id: 'bdd400ad-8eb6-47fa-91f7-547138b81fba',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.81060791015625,
                        Text: 'bully',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04427715763449669,
                                Height: 0.01447353046387434,
                                Left: 0.06595893204212189,
                                Top: 0.6231448650360107,
                            },
                            Polygon: [
                                {
                                    X: 0.06595893204212189,
                                    Y: 0.6231448650360107,
                                },
                                {
                                    X: 0.11023608595132828,
                                    Y: 0.6231448650360107,
                                },
                                {
                                    X: 0.11023608595132828,
                                    Y: 0.6376184225082397,
                                },
                                {
                                    X: 0.06595893204212189,
                                    Y: 0.6376184225082397,
                                },
                            ],
                        },
                        Id: 'ef5665c8-07ef-4fc1-8e18-04216a1e9a4a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.68759155273438,
                        Text: '(plural',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.044054385274648666,
                                Height: 0.014003770425915718,
                                Left: 0.11914407461881638,
                                Top: 0.6232125163078308,
                            },
                            Polygon: [
                                {
                                    X: 0.11914407461881638,
                                    Y: 0.6232125163078308,
                                },
                                {
                                    X: 0.16319845616817474,
                                    Y: 0.6232125163078308,
                                },
                                {
                                    X: 0.16319845616817474,
                                    Y: 0.6372162699699402,
                                },
                                {
                                    X: 0.11914407461881638,
                                    Y: 0.6372162699699402,
                                },
                            ],
                        },
                        Id: 'b11f0e83-5a8f-4282-8585-34e844fc35de',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.73445892333984,
                        Text: 'bullies)',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06095746159553528,
                                Height: 0.013484720140695572,
                                Left: 0.06626714766025543,
                                Top: 0.6384684443473816,
                            },
                            Polygon: [
                                {
                                    X: 0.06626714766025543,
                                    Y: 0.6384684443473816,
                                },
                                {
                                    X: 0.1272246092557907,
                                    Y: 0.6384684443473816,
                                },
                                {
                                    X: 0.1272246092557907,
                                    Y: 0.6519531607627869,
                                },
                                {
                                    X: 0.06626714766025543,
                                    Y: 0.6519531607627869,
                                },
                            ],
                        },
                        Id: '3d3ce230-f684-455c-8e6a-ec37c2f31fbb',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.4728012084961,
                        Text: 'a',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.008288850076496601,
                                Height: 0.010472999885678291,
                                Left: 0.13169682025909424,
                                Top: 0.6405056118965149,
                            },
                            Polygon: [
                                {
                                    X: 0.13169682025909424,
                                    Y: 0.6405056118965149,
                                },
                                {
                                    X: 0.13998566567897797,
                                    Y: 0.6405056118965149,
                                },
                                {
                                    X: 0.13998566567897797,
                                    Y: 0.6509786248207092,
                                },
                                {
                                    X: 0.13169682025909424,
                                    Y: 0.6509786248207092,
                                },
                            ],
                        },
                        Id: 'e0dcfbe6-9b66-479f-87f3-0b3c3ddfe9f8',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.73111724853516,
                        Text: 'person',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0477459691464901,
                                Height: 0.01166009996086359,
                                Left: 0.06629902869462967,
                                Top: 0.6556044816970825,
                            },
                            Polygon: [
                                {
                                    X: 0.06629902869462967,
                                    Y: 0.6556044816970825,
                                },
                                {
                                    X: 0.11404500156641006,
                                    Y: 0.6556044816970825,
                                },
                                {
                                    X: 0.11404500156641006,
                                    Y: 0.6672645807266235,
                                },
                                {
                                    X: 0.06629902869462967,
                                    Y: 0.6672645807266235,
                                },
                            ],
                        },
                        Id: 'ec835d17-8f49-406b-b691-faf5b11abe47',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.60823822021484,
                        Text: 'who',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0317571684718132,
                                Height: 0.012072229757905006,
                                Left: 0.11817056685686111,
                                Top: 0.6538063287734985,
                            },
                            Polygon: [
                                {
                                    X: 0.11817056685686111,
                                    Y: 0.6538063287734985,
                                },
                                {
                                    X: 0.14992773532867432,
                                    Y: 0.6538063287734985,
                                },
                                {
                                    X: 0.14992773532867432,
                                    Y: 0.6658785343170166,
                                },
                                {
                                    X: 0.11817056685686111,
                                    Y: 0.6658785343170166,
                                },
                            ],
                        },
                        Id: '344297e2-bf60-4ec2-a787-4ca92ceebbac',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.56385803222656,
                        Text: 'does',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03424860164523125,
                                Height: 0.012259029783308506,
                                Left: 0.15364284813404083,
                                Top: 0.6537526249885559,
                            },
                            Polygon: [
                                {
                                    X: 0.15364284813404083,
                                    Y: 0.6537526249885559,
                                },
                                {
                                    X: 0.18789145350456238,
                                    Y: 0.6537526249885559,
                                },
                                {
                                    X: 0.18789145350456238,
                                    Y: 0.6660116314888,
                                },
                                {
                                    X: 0.15364284813404083,
                                    Y: 0.6660116314888,
                                },
                            ],
                        },
                        Id: '62506f70-5aa3-4649-b8ad-aac7ff2881ff',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.31968688964844,
                        Text: 'bad',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.026853669434785843,
                                Height: 0.012948630377650261,
                                Left: 0.06621353328227997,
                                Top: 0.6682977676391602,
                            },
                            Polygon: [
                                {
                                    X: 0.06621353328227997,
                                    Y: 0.6682977676391602,
                                },
                                {
                                    X: 0.09306719899177551,
                                    Y: 0.6682977676391602,
                                },
                                {
                                    X: 0.09306719899177551,
                                    Y: 0.6812463998794556,
                                },
                                {
                                    X: 0.06621353328227997,
                                    Y: 0.6812463998794556,
                                },
                            ],
                        },
                        Id: 'ed59a510-323d-4034-9133-18decb360a68',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.5311050415039,
                        Text: 'things',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.043859198689460754,
                                Height: 0.014373180456459522,
                                Left: 0.09694668650627136,
                                Top: 0.6681649684906006,
                            },
                            Polygon: [
                                {
                                    X: 0.09694668650627136,
                                    Y: 0.6681649684906006,
                                },
                                {
                                    X: 0.14080588519573212,
                                    Y: 0.6681649684906006,
                                },
                                {
                                    X: 0.14080588519573212,
                                    Y: 0.6825381517410278,
                                },
                                {
                                    X: 0.09694668650627136,
                                    Y: 0.6825381517410278,
                                },
                            ],
                        },
                        Id: 'b3be8b0a-0849-47ee-8396-b93c41907422',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.45965576171875,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.014504089951515198,
                                Height: 0.011790700256824493,
                                Left: 0.14513245224952698,
                                Top: 0.6696239709854126,
                            },
                            Polygon: [
                                {
                                    X: 0.14513245224952698,
                                    Y: 0.6696239709854126,
                                },
                                {
                                    X: 0.15963654220104218,
                                    Y: 0.6696239709854126,
                                },
                                {
                                    X: 0.15963654220104218,
                                    Y: 0.6814147233963013,
                                },
                                {
                                    X: 0.14513245224952698,
                                    Y: 0.6814147233963013,
                                },
                            ],
                        },
                        Id: 'ab5a5711-4c99-4d5a-8107-e8049dca967c',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.80400848388672,
                        Text: 'somebody',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07406122237443924,
                                Height: 0.013494360260665417,
                                Left: 0.06602232903242111,
                                Top: 0.6847367882728577,
                            },
                            Polygon: [
                                {
                                    X: 0.06602232903242111,
                                    Y: 0.6847367882728577,
                                },
                                {
                                    X: 0.14008355140686035,
                                    Y: 0.6847367882728577,
                                },
                                {
                                    X: 0.14008355140686035,
                                    Y: 0.6982311606407166,
                                },
                                {
                                    X: 0.06602232903242111,
                                    Y: 0.6982311606407166,
                                },
                            ],
                        },
                        Id: '420b3654-7901-4236-9e99-604cd60b3546',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.3820571899414,
                        Text: 'and',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02731934003531933,
                                Height: 0.012314430437982082,
                                Left: 0.14418946206569672,
                                Top: 0.6841810941696167,
                            },
                            Polygon: [
                                {
                                    X: 0.14418946206569672,
                                    Y: 0.6841810941696167,
                                },
                                {
                                    X: 0.1715088039636612,
                                    Y: 0.6841810941696167,
                                },
                                {
                                    X: 0.1715088039636612,
                                    Y: 0.696495532989502,
                                },
                                {
                                    X: 0.14418946206569672,
                                    Y: 0.696495532989502,
                                },
                            ],
                        },
                        Id: '02dfe304-67cd-44dc-8f2d-d0710fe277f4',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.6275634765625,
                        Text: 'makes',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04454817250370979,
                                Height: 0.012352700345218182,
                                Left: 0.06654031574726105,
                                Top: 0.69905024766922,
                            },
                            Polygon: [
                                {
                                    X: 0.06654031574726105,
                                    Y: 0.69905024766922,
                                },
                                {
                                    X: 0.11108849197626114,
                                    Y: 0.69905024766922,
                                },
                                {
                                    X: 0.11108849197626114,
                                    Y: 0.711402952671051,
                                },
                                {
                                    X: 0.06654031574726105,
                                    Y: 0.711402952671051,
                                },
                            ],
                        },
                        Id: '78adbb98-aa11-425a-96ff-00c675c1c068',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.45103454589844,
                        Text: 'them',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03741459175944328,
                                Height: 0.01208684965968132,
                                Left: 0.11500588804483414,
                                Top: 0.6993217468261719,
                            },
                            Polygon: [
                                {
                                    X: 0.11500588804483414,
                                    Y: 0.6993217468261719,
                                },
                                {
                                    X: 0.15242047607898712,
                                    Y: 0.6993217468261719,
                                },
                                {
                                    X: 0.15242047607898712,
                                    Y: 0.7114086151123047,
                                },
                                {
                                    X: 0.11500588804483414,
                                    Y: 0.7114086151123047,
                                },
                            ],
                        },
                        Id: '04d32c74-e042-490e-928e-cc083a9dd08e',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.19429779052734,
                        Text: 'fee',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.025653554126620293,
                                Height: 0.012624000199139118,
                                Left: 0.06560147553682327,
                                Top: 0.7139785885810852,
                            },
                            Polygon: [
                                {
                                    X: 0.06560147553682327,
                                    Y: 0.7139785885810852,
                                },
                                {
                                    X: 0.09125503152608871,
                                    Y: 0.7139785885810852,
                                },
                                {
                                    X: 0.09125503152608871,
                                    Y: 0.7266026139259338,
                                },
                                {
                                    X: 0.06560147553682327,
                                    Y: 0.7266026139259338,
                                },
                            ],
                        },
                        Id: '5fc472a0-1010-4a69-b3d2-b2eaca7b2704',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.5420913696289,
                        Text: 'afraid;',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0425138995051384,
                                Height: 0.013305299915373325,
                                Left: 0.09533409029245377,
                                Top: 0.7140286564826965,
                            },
                            Polygon: [
                                {
                                    X: 0.09533409029245377,
                                    Y: 0.7140286564826965,
                                },
                                {
                                    X: 0.13784798979759216,
                                    Y: 0.7140286564826965,
                                },
                                {
                                    X: 0.13784798979759216,
                                    Y: 0.7273339629173279,
                                },
                                {
                                    X: 0.09533409029245377,
                                    Y: 0.7273339629173279,
                                },
                            ],
                        },
                        Id: '72ec7a41-6d9c-4d29-afb8-6d6230c8c61a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.20649719238281,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.015041939914226532,
                                Height: 0.010775799863040447,
                                Left: 0.14120237529277802,
                                Top: 0.7156165838241577,
                            },
                            Polygon: [
                                {
                                    X: 0.14120237529277802,
                                    Y: 0.7156165838241577,
                                },
                                {
                                    X: 0.15624432265758514,
                                    Y: 0.7156165838241577,
                                },
                                {
                                    X: 0.15624432265758514,
                                    Y: 0.726392388343811,
                                },
                                {
                                    X: 0.14120237529277802,
                                    Y: 0.726392388343811,
                                },
                            ],
                        },
                        Id: '67564fbe-74ca-4e94-880a-3ec3f8db3d14',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.28274536132812,
                        Text: 'do',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.01874757930636406,
                                Height: 0.012108569964766502,
                                Left: 0.16028152406215668,
                                Top: 0.7147485017776489,
                            },
                            Polygon: [
                                {
                                    X: 0.16028152406215668,
                                    Y: 0.7147485017776489,
                                },
                                {
                                    X: 0.17902910709381104,
                                    Y: 0.7147485017776489,
                                },
                                {
                                    X: 0.17902910709381104,
                                    Y: 0.72685706615448,
                                },
                                {
                                    X: 0.16028152406215668,
                                    Y: 0.72685706615448,
                                },
                            ],
                        },
                        Id: 'b5348e5f-1b44-447c-8772-e80b6b220471',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 97.79252624511719,
                        Text: 'bad',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.026784684509038925,
                                Height: 0.01250865962356329,
                                Left: 0.0660984069108963,
                                Top: 0.729338526725769,
                            },
                            Polygon: [
                                {
                                    X: 0.0660984069108963,
                                    Y: 0.729338526725769,
                                },
                                {
                                    X: 0.09288309514522552,
                                    Y: 0.729338526725769,
                                },
                                {
                                    X: 0.09288309514522552,
                                    Y: 0.7418471574783325,
                                },
                                {
                                    X: 0.0660984069108963,
                                    Y: 0.7418471574783325,
                                },
                            ],
                        },
                        Id: '22f72c4f-cf8b-40a4-8a5e-858008b4240a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.9680404663086,
                        Text: 'things',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04350443184375763,
                                Height: 0.013819100335240364,
                                Left: 0.09714844822883606,
                                Top: 0.7295305132865906,
                            },
                            Polygon: [
                                {
                                    X: 0.09714844822883606,
                                    Y: 0.7295305132865906,
                                },
                                {
                                    X: 0.1406528800725937,
                                    Y: 0.7295305132865906,
                                },
                                {
                                    X: 0.1406528800725937,
                                    Y: 0.7433496117591858,
                                },
                                {
                                    X: 0.09714844822883606,
                                    Y: 0.7433496117591858,
                                },
                            ],
                        },
                        Id: '8de8d78b-228b-44f5-87b9-88bff53331eb',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 97.54249572753906,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.014655079692602158,
                                Height: 0.01104809995740652,
                                Left: 0.14500778913497925,
                                Top: 0.7307248115539551,
                            },
                            Polygon: [
                                {
                                    X: 0.14500778913497925,
                                    Y: 0.7307248115539551,
                                },
                                {
                                    X: 0.1596628725528717,
                                    Y: 0.7307248115539551,
                                },
                                {
                                    X: 0.1596628725528717,
                                    Y: 0.7417728900909424,
                                },
                                {
                                    X: 0.14500778913497925,
                                    Y: 0.7417728900909424,
                                },
                            ],
                        },
                        Id: 'f6cab95f-f7f4-4c50-85c8-043b5f94fcbe',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.68836975097656,
                        Text: 'somebody',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07426928728818893,
                                Height: 0.013825659640133381,
                                Left: 0.06639175862073898,
                                Top: 0.7447870373725891,
                            },
                            Polygon: [
                                {
                                    X: 0.06639175862073898,
                                    Y: 0.7447870373725891,
                                },
                                {
                                    X: 0.14066104590892792,
                                    Y: 0.7447870373725891,
                                },
                                {
                                    X: 0.14066104590892792,
                                    Y: 0.7586126923561096,
                                },
                                {
                                    X: 0.06639175862073898,
                                    Y: 0.7586126923561096,
                                },
                            ],
                        },
                        Id: '8ee741df-0e4e-44c7-8b06-4befc3ef76ee',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.2639389038086,
                        Text: 'and',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.026944100856781006,
                                Height: 0.012562200427055359,
                                Left: 0.14444364607334137,
                                Top: 0.7446085214614868,
                            },
                            Polygon: [
                                {
                                    X: 0.14444364607334137,
                                    Y: 0.7446085214614868,
                                },
                                {
                                    X: 0.17138774693012238,
                                    Y: 0.7446085214614868,
                                },
                                {
                                    X: 0.17138774693012238,
                                    Y: 0.7571706771850586,
                                },
                                {
                                    X: 0.14444364607334137,
                                    Y: 0.7571706771850586,
                                },
                            ],
                        },
                        Id: '95a1dd85-b7e2-453b-9405-01e8c95fc362',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.98828887939453,
                        Text: 'make',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03844728320837021,
                                Height: 0.012076860293745995,
                                Left: 0.06606705486774445,
                                Top: 0.7599070072174072,
                            },
                            Polygon: [
                                {
                                    X: 0.06606705486774445,
                                    Y: 0.7599070072174072,
                                },
                                {
                                    X: 0.10451433807611465,
                                    Y: 0.7599070072174072,
                                },
                                {
                                    X: 0.10451433807611465,
                                    Y: 0.7719838619232178,
                                },
                                {
                                    X: 0.06606705486774445,
                                    Y: 0.7719838619232178,
                                },
                            ],
                        },
                        Id: '6fa52f46-c5e5-4364-9e66-1751b9444b75',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.99578094482422,
                        Text: 'them',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03695661947131157,
                                Height: 0.013823759742081165,
                                Left: 0.10836286097764969,
                                Top: 0.7592059373855591,
                            },
                            Polygon: [
                                {
                                    X: 0.10836286097764969,
                                    Y: 0.7592059373855591,
                                },
                                {
                                    X: 0.14531947672367096,
                                    Y: 0.7592059373855591,
                                },
                                {
                                    X: 0.14531947672367096,
                                    Y: 0.7730296850204468,
                                },
                                {
                                    X: 0.10836286097764969,
                                    Y: 0.7730296850204468,
                                },
                            ],
                        },
                        Id: 'a833a5f4-effb-479d-8884-527499587241',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.63618469238281,
                        Text: 'fee',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.025500910356640816,
                                Height: 0.012529860250651836,
                                Left: 0.14949651062488556,
                                Top: 0.7594526410102844,
                            },
                            Polygon: [
                                {
                                    X: 0.14949651062488556,
                                    Y: 0.7594526410102844,
                                },
                                {
                                    X: 0.17499741911888123,
                                    Y: 0.7594526410102844,
                                },
                                {
                                    X: 0.17499741911888123,
                                    Y: 0.7719824910163879,
                                },
                                {
                                    X: 0.14949651062488556,
                                    Y: 0.7719824910163879,
                                },
                            ],
                        },
                        Id: '0d3f66ef-ebdb-4f0b-bd6e-9a8a58045c85',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.64202117919922,
                        Text: 'afraid',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03894348070025444,
                                Height: 0.015059100463986397,
                                Left: 0.06611350923776627,
                                Top: 0.7735607028007507,
                            },
                            Polygon: [
                                {
                                    X: 0.06611350923776627,
                                    Y: 0.7735607028007507,
                                },
                                {
                                    X: 0.105056993663311,
                                    Y: 0.7735607028007507,
                                },
                                {
                                    X: 0.105056993663311,
                                    Y: 0.7886198163032532,
                                },
                                {
                                    X: 0.06611350923776627,
                                    Y: 0.7886198163032532,
                                },
                            ],
                        },
                        Id: 'd2ab3eda-3ac2-4e28-a119-d72573765b55',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.84252166748047,
                        Text: 'jump',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04595668986439705,
                                Height: 0.014823799952864647,
                                Left: 0.06510207056999207,
                                Top: 0.796963095664978,
                            },
                            Polygon: [
                                {
                                    X: 0.06510207056999207,
                                    Y: 0.796963095664978,
                                },
                                {
                                    X: 0.11105875670909882,
                                    Y: 0.796963095664978,
                                },
                                {
                                    X: 0.11105875670909882,
                                    Y: 0.8117868900299072,
                                },
                                {
                                    X: 0.06510207056999207,
                                    Y: 0.8117868900299072,
                                },
                            ],
                        },
                        Id: 'b68f741d-0e08-4d84-8fba-00f4d67333eb',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.04750061035156,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.015713604167103767,
                                Height: 0.011271740309894085,
                                Left: 0.11947676539421082,
                                Top: 0.798771858215332,
                            },
                            Polygon: [
                                {
                                    X: 0.11947676539421082,
                                    Y: 0.798771858215332,
                                },
                                {
                                    X: 0.13519036769866943,
                                    Y: 0.798771858215332,
                                },
                                {
                                    X: 0.13519036769866943,
                                    Y: 0.8100435733795166,
                                },
                                {
                                    X: 0.11947676539421082,
                                    Y: 0.8100435733795166,
                                },
                            ],
                        },
                        Id: '1a74fbf7-90ee-4d78-9395-829051180e80',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.54481506347656,
                        Text: 'move',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03944643959403038,
                                Height: 0.009822940453886986,
                                Left: 0.13932165503501892,
                                Top: 0.7999178767204285,
                            },
                            Polygon: [
                                {
                                    X: 0.13932165503501892,
                                    Y: 0.7999178767204285,
                                },
                                {
                                    X: 0.1787680983543396,
                                    Y: 0.7999178767204285,
                                },
                                {
                                    X: 0.1787680983543396,
                                    Y: 0.8097408413887024,
                                },
                                {
                                    X: 0.13932165503501892,
                                    Y: 0.8097408413887024,
                                },
                            ],
                        },
                        Id: '5a2fa428-ed6b-489a-873f-b02b4b1b5c71',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.36306762695312,
                        Text: 'suddenly',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06463789194822311,
                                Height: 0.013995399698615074,
                                Left: 0.06566374748945236,
                                Top: 0.8128846883773804,
                            },
                            Polygon: [
                                {
                                    X: 0.06566374748945236,
                                    Y: 0.8128846883773804,
                                },
                                {
                                    X: 0.13030163943767548,
                                    Y: 0.8128846883773804,
                                },
                                {
                                    X: 0.13030163943767548,
                                    Y: 0.8268800973892212,
                                },
                                {
                                    X: 0.06566374748945236,
                                    Y: 0.8268800973892212,
                                },
                            ],
                        },
                        Id: '2fb9f325-b23b-43ae-9094-032ab28c8d41',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.67113494873047,
                        Text: 'from',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03426197171211243,
                                Height: 0.012278770096600056,
                                Left: 0.13336725533008575,
                                Top: 0.8129379749298096,
                            },
                            Polygon: [
                                {
                                    X: 0.13336725533008575,
                                    Y: 0.8129379749298096,
                                },
                                {
                                    X: 0.16762922704219818,
                                    Y: 0.8129379749298096,
                                },
                                {
                                    X: 0.16762922704219818,
                                    Y: 0.8252167701721191,
                                },
                                {
                                    X: 0.13336725533008575,
                                    Y: 0.8252167701721191,
                                },
                            ],
                        },
                        Id: '6b1efe95-372b-4d97-b2b8-f940b680a7fd',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.25519561767578,
                        Text: 'one',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02751513011753559,
                                Height: 0.010015100240707397,
                                Left: 0.1712820827960968,
                                Top: 0.815057098865509,
                            },
                            Polygon: [
                                {
                                    X: 0.1712820827960968,
                                    Y: 0.815057098865509,
                                },
                                {
                                    X: 0.19879721105098724,
                                    Y: 0.815057098865509,
                                },
                                {
                                    X: 0.19879721105098724,
                                    Y: 0.8250722289085388,
                                },
                                {
                                    X: 0.1712820827960968,
                                    Y: 0.8250722289085388,
                                },
                            ],
                        },
                        Id: 'a2781ada-d01f-4be4-8c64-032ef852df46',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.564453125,
                        Text: 'place',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03771410882472992,
                                Height: 0.014255659654736519,
                                Left: 0.06599386781454086,
                                Top: 0.8278272151947021,
                            },
                            Polygon: [
                                {
                                    X: 0.06599386781454086,
                                    Y: 0.8278272151947021,
                                },
                                {
                                    X: 0.10370797663927078,
                                    Y: 0.8278272151947021,
                                },
                                {
                                    X: 0.10370797663927078,
                                    Y: 0.8420828580856323,
                                },
                                {
                                    X: 0.06599386781454086,
                                    Y: 0.8420828580856323,
                                },
                            ],
                        },
                        Id: '0c682d1f-0ab2-463d-9a1f-23cd69ed3937',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.24032592773438,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.01495910994708538,
                                Height: 0.011260510422289371,
                                Left: 0.10737518966197968,
                                Top: 0.8289696574211121,
                            },
                            Polygon: [
                                {
                                    X: 0.10737518966197968,
                                    Y: 0.8289696574211121,
                                },
                                {
                                    X: 0.1223343014717102,
                                    Y: 0.8289696574211121,
                                },
                                {
                                    X: 0.1223343014717102,
                                    Y: 0.8402301669120789,
                                },
                                {
                                    X: 0.10737518966197968,
                                    Y: 0.8402301669120789,
                                },
                            ],
                        },
                        Id: 'fbabad57-3298-4a58-a4f8-3ce2bd514bb1',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 97.92428588867188,
                        Text: 'a',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.008351510390639305,
                                Height: 0.009854800067842007,
                                Left: 0.12602995336055756,
                                Top: 0.8302711248397827,
                            },
                            Polygon: [
                                {
                                    X: 0.12602995336055756,
                                    Y: 0.8302711248397827,
                                },
                                {
                                    X: 0.1343814581632614,
                                    Y: 0.8302711248397827,
                                },
                                {
                                    X: 0.1343814581632614,
                                    Y: 0.8401259183883667,
                                },
                                {
                                    X: 0.12602995336055756,
                                    Y: 0.8401259183883667,
                                },
                            ],
                        },
                        Id: 'd5f74651-2e4a-4ff3-8587-7fe1933a7540',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.77306365966797,
                        Text: 'different',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.058903131633996964,
                                Height: 0.012173039838671684,
                                Left: 0.13856416940689087,
                                Top: 0.8281155824661255,
                            },
                            Polygon: [
                                {
                                    X: 0.13856416940689087,
                                    Y: 0.8281155824661255,
                                },
                                {
                                    X: 0.19746729731559753,
                                    Y: 0.8281155824661255,
                                },
                                {
                                    X: 0.19746729731559753,
                                    Y: 0.8402886390686035,
                                },
                                {
                                    X: 0.13856416940689087,
                                    Y: 0.8402886390686035,
                                },
                            ],
                        },
                        Id: 'd96bba42-193e-4659-a3f5-a959fb3bf11a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.79322814941406,
                        Text: 'place',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03745948150753975,
                                Height: 0.014204399660229683,
                                Left: 0.06632117927074432,
                                Top: 0.8430476188659668,
                            },
                            Polygon: [
                                {
                                    X: 0.06632117927074432,
                                    Y: 0.8430476188659668,
                                },
                                {
                                    X: 0.10378065705299377,
                                    Y: 0.8430476188659668,
                                },
                                {
                                    X: 0.10378065705299377,
                                    Y: 0.8572520017623901,
                                },
                                {
                                    X: 0.06632117927074432,
                                    Y: 0.8572520017623901,
                                },
                            ],
                        },
                        Id: '07f085ff-b453-4b51-8c34-5a5739f1743b',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.45623779296875,
                        Text: 'fall',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.028755219653248787,
                                Height: 0.012713899835944176,
                                Left: 0.06539788097143173,
                                Top: 0.8648961186408997,
                            },
                            Polygon: [
                                {
                                    X: 0.06539788097143173,
                                    Y: 0.8648961186408997,
                                },
                                {
                                    X: 0.09415309876203537,
                                    Y: 0.8648961186408997,
                                },
                                {
                                    X: 0.09415309876203537,
                                    Y: 0.8776100277900696,
                                },
                                {
                                    X: 0.06539788097143173,
                                    Y: 0.8776100277900696,
                                },
                            ],
                        },
                        Id: '2effdb0a-30a1-44b0-8c54-4769c62eb7f1',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.02266693115234,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.015417389571666718,
                                Height: 0.011414160020649433,
                                Left: 0.10214052349328995,
                                Top: 0.8666921854019165,
                            },
                            Polygon: [
                                {
                                    X: 0.10214052349328995,
                                    Y: 0.8666921854019165,
                                },
                                {
                                    X: 0.11755791306495667,
                                    Y: 0.8666921854019165,
                                },
                                {
                                    X: 0.11755791306495667,
                                    Y: 0.8781063556671143,
                                },
                                {
                                    X: 0.10214052349328995,
                                    Y: 0.8781063556671143,
                                },
                            ],
                        },
                        Id: 'f03c1917-7cd5-41b7-b066-efef1003b3b3',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 96.7503662109375,
                        Text: 'go',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.018912870436906815,
                                Height: 0.011772999539971352,
                                Left: 0.12119107693433762,
                                Top: 0.8680188059806824,
                            },
                            Polygon: [
                                {
                                    X: 0.12119107693433762,
                                    Y: 0.8680188059806824,
                                },
                                {
                                    X: 0.14010395109653473,
                                    Y: 0.8680188059806824,
                                },
                                {
                                    X: 0.14010395109653473,
                                    Y: 0.879791796207428,
                                },
                                {
                                    X: 0.12119107693433762,
                                    Y: 0.879791796207428,
                                },
                            ],
                        },
                        Id: '3d576b06-eda4-45c3-8fbe-696b3a789d41',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.61908721923828,
                        Text: 'down',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04123298078775406,
                                Height: 0.01235520001500845,
                                Left: 0.14372825622558594,
                                Top: 0.8661363124847412,
                            },
                            Polygon: [
                                {
                                    X: 0.14372825622558594,
                                    Y: 0.8661363124847412,
                                },
                                {
                                    X: 0.1849612444639206,
                                    Y: 0.8661363124847412,
                                },
                                {
                                    X: 0.1849612444639206,
                                    Y: 0.8784915208816528,
                                },
                                {
                                    X: 0.14372825622558594,
                                    Y: 0.8784915208816528,
                                },
                            ],
                        },
                        Id: '28ed58d5-e1f2-40cf-8e3c-4c64ab144d70',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.75568389892578,
                        Text: 'The',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.0493638701736927,
                                Height: 0.018942300230264664,
                                Left: 0.2419712096452713,
                                Top: 0.8552423715591431,
                            },
                            Polygon: [
                                {
                                    X: 0.2419712096452713,
                                    Y: 0.8552423715591431,
                                },
                                {
                                    X: 0.2913350760936737,
                                    Y: 0.8552423715591431,
                                },
                                {
                                    X: 0.2913350760936737,
                                    Y: 0.8741847276687622,
                                },
                                {
                                    X: 0.2419712096452713,
                                    Y: 0.8741847276687622,
                                },
                            ],
                        },
                        Id: '0d9829a1-72f3-4ad9-9070-2ad6d140214c',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.30709838867188,
                        Text: 'toad',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05504155158996582,
                                Height: 0.01915905997157097,
                                Left: 0.2996947765350342,
                                Top: 0.8551056385040283,
                            },
                            Polygon: [
                                {
                                    X: 0.2996947765350342,
                                    Y: 0.8551056385040283,
                                },
                                {
                                    X: 0.354736328125,
                                    Y: 0.8551056385040283,
                                },
                                {
                                    X: 0.354736328125,
                                    Y: 0.8742647171020508,
                                },
                                {
                                    X: 0.2996947765350342,
                                    Y: 0.8742647171020508,
                                },
                            ],
                        },
                        Id: 'f7dac8dc-28cf-43ac-b3d3-3b694104def4',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.79121398925781,
                        Text: 'is',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.019905919209122658,
                                Height: 0.017998000606894493,
                                Left: 0.3624460995197296,
                                Top: 0.8562273979187012,
                            },
                            Polygon: [
                                {
                                    X: 0.3624460995197296,
                                    Y: 0.8562273979187012,
                                },
                                {
                                    X: 0.3823520243167877,
                                    Y: 0.8562273979187012,
                                },
                                {
                                    X: 0.3823520243167877,
                                    Y: 0.874225378036499,
                                },
                                {
                                    X: 0.3624460995197296,
                                    Y: 0.874225378036499,
                                },
                            ],
                        },
                        Id: '1377ce5e-b567-4b2d-b699-acfe2046af50',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.73812866210938,
                        Text: 'afraid.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07862749695777893,
                                Height: 0.01748570054769516,
                                Left: 0.39028990268707275,
                                Top: 0.8558266758918762,
                            },
                            Polygon: [
                                {
                                    X: 0.39028990268707275,
                                    Y: 0.8558266758918762,
                                },
                                {
                                    X: 0.4689173996448517,
                                    Y: 0.8558266758918762,
                                },
                                {
                                    X: 0.4689173996448517,
                                    Y: 0.8733124136924744,
                                },
                                {
                                    X: 0.39028990268707275,
                                    Y: 0.8733124136924744,
                                },
                            ],
                        },
                        Id: '06dc4b79-7673-46e7-a0d5-9843ca862505',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.56236267089844,
                        Text: 'It',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.019816700369119644,
                                Height: 0.01784254051744938,
                                Left: 0.47839710116386414,
                                Top: 0.8560872077941895,
                            },
                            Polygon: [
                                {
                                    X: 0.47839710116386414,
                                    Y: 0.8560872077941895,
                                },
                                {
                                    X: 0.4982137978076935,
                                    Y: 0.8560872077941895,
                                },
                                {
                                    X: 0.4982137978076935,
                                    Y: 0.8739297389984131,
                                },
                                {
                                    X: 0.47839710116386414,
                                    Y: 0.8739297389984131,
                                },
                            ],
                        },
                        Id: 'e3e62985-48cf-4e85-ba29-001edafec9dd',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.75353240966797,
                        Text: 'falls',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05953190103173256,
                                Height: 0.01988529972732067,
                                Left: 0.5058425068855286,
                                Top: 0.8547940850257874,
                            },
                            Polygon: [
                                {
                                    X: 0.5058425068855286,
                                    Y: 0.8547940850257874,
                                },
                                {
                                    X: 0.5653743743896484,
                                    Y: 0.8547940850257874,
                                },
                                {
                                    X: 0.5653743743896484,
                                    Y: 0.8746793866157532,
                                },
                                {
                                    X: 0.5058425068855286,
                                    Y: 0.8746793866157532,
                                },
                            ],
                        },
                        Id: '3c13999c-a6fe-4aff-9d35-cf89fb420fb3',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.64329528808594,
                        Text: 'to',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.024616599082946777,
                                Height: 0.017906399443745613,
                                Left: 0.5734808444976807,
                                Top: 0.8563554883003235,
                            },
                            Polygon: [
                                {
                                    X: 0.5734808444976807,
                                    Y: 0.8563554883003235,
                                },
                                {
                                    X: 0.5980974435806274,
                                    Y: 0.8563554883003235,
                                },
                                {
                                    X: 0.5980974435806274,
                                    Y: 0.8742619156837463,
                                },
                                {
                                    X: 0.5734808444976807,
                                    Y: 0.8742619156837463,
                                },
                            ],
                        },
                        Id: 'dacc471b-2ca0-4e8a-9590-04ef50449891',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.67958068847656,
                        Text: 'the',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04133749008178711,
                                Height: 0.01832740008831024,
                                Left: 0.6060788631439209,
                                Top: 0.8556212186813354,
                            },
                            Polygon: [
                                {
                                    X: 0.6060788631439209,
                                    Y: 0.8556212186813354,
                                },
                                {
                                    X: 0.647416353225708,
                                    Y: 0.8556212186813354,
                                },
                                {
                                    X: 0.647416353225708,
                                    Y: 0.8739485740661621,
                                },
                                {
                                    X: 0.6060788631439209,
                                    Y: 0.8739485740661621,
                                },
                            ],
                        },
                        Id: 'cc7bffcd-22ac-4b45-9318-1af46f838010',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.77102661132812,
                        Text: 'ground.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.11131089925765991,
                                Height: 0.02150610089302063,
                                Left: 0.6547121405601501,
                                Top: 0.8548495173454285,
                            },
                            Polygon: [
                                {
                                    X: 0.6547121405601501,
                                    Y: 0.8548495173454285,
                                },
                                {
                                    X: 0.7660230398178101,
                                    Y: 0.8548495173454285,
                                },
                                {
                                    X: 0.7660230398178101,
                                    Y: 0.8763555884361267,
                                },
                                {
                                    X: 0.6547121405601501,
                                    Y: 0.8763555884361267,
                                },
                            ],
                        },
                        Id: '4ba17ec4-b513-46c6-94dd-113c0870af90',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 90.26980590820312,
                        Text: "'Let's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06424540281295776,
                                Height: 0.019024260342121124,
                                Left: 0.7758588194847107,
                                Top: 0.8552879095077515,
                            },
                            Polygon: [
                                {
                                    X: 0.7758588194847107,
                                    Y: 0.8552879095077515,
                                },
                                {
                                    X: 0.8401042222976685,
                                    Y: 0.8552879095077515,
                                },
                                {
                                    X: 0.8401042222976685,
                                    Y: 0.874312162399292,
                                },
                                {
                                    X: 0.7758588194847107,
                                    Y: 0.874312162399292,
                                },
                            ],
                        },
                        Id: '81be48ed-ae70-4e5d-9e85-35829c904b5a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.40723419189453,
                        Text: 'see',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.039181601256132126,
                                Height: 0.014070659875869751,
                                Left: 0.8476253747940063,
                                Top: 0.8595092296600342,
                            },
                            Polygon: [
                                {
                                    X: 0.8476253747940063,
                                    Y: 0.8595092296600342,
                                },
                                {
                                    X: 0.8868070244789124,
                                    Y: 0.8595092296600342,
                                },
                                {
                                    X: 0.8868070244789124,
                                    Y: 0.8735798597335815,
                                },
                                {
                                    X: 0.8476253747940063,
                                    Y: 0.8735798597335815,
                                },
                            ],
                        },
                        Id: 'da7b6cb3-2d52-43f1-925a-e18eccf9b42c',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.65095520019531,
                        Text: 'suddenly',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06441591680049896,
                                Height: 0.014025459997355938,
                                Left: 0.06608641147613525,
                                Top: 0.8811320066452026,
                            },
                            Polygon: [
                                {
                                    X: 0.06608641147613525,
                                    Y: 0.8811320066452026,
                                },
                                {
                                    X: 0.13050232827663422,
                                    Y: 0.8811320066452026,
                                },
                                {
                                    X: 0.13050232827663422,
                                    Y: 0.8951574563980103,
                                },
                                {
                                    X: 0.06608641147613525,
                                    Y: 0.8951574563980103,
                                },
                            ],
                        },
                        Id: '44669ca4-b2c0-4bf8-b2ab-957f43247664',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.55093383789062,
                        Text: 'your',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.058958180248737335,
                                Height: 0.016279330477118492,
                                Left: 0.2218400239944458,
                                Top: 0.8888891935348511,
                            },
                            Polygon: [
                                {
                                    X: 0.2218400239944458,
                                    Y: 0.8888891935348511,
                                },
                                {
                                    X: 0.28079819679260254,
                                    Y: 0.8888891935348511,
                                },
                                {
                                    X: 0.28079819679260254,
                                    Y: 0.9051685333251953,
                                },
                                {
                                    X: 0.2218400239944458,
                                    Y: 0.9051685333251953,
                                },
                            ],
                        },
                        Id: 'c93f6318-0e71-4603-9b0a-1a63bd3d85ef',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.78988647460938,
                        Text: 'toad',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.055491771548986435,
                                Height: 0.020016800612211227,
                                Left: 0.28744056820869446,
                                Top: 0.884584903717041,
                            },
                            Polygon: [
                                {
                                    X: 0.28744056820869446,
                                    Y: 0.884584903717041,
                                },
                                {
                                    X: 0.3429323434829712,
                                    Y: 0.884584903717041,
                                },
                                {
                                    X: 0.3429323434829712,
                                    Y: 0.9046016931533813,
                                },
                                {
                                    X: 0.28744056820869446,
                                    Y: 0.9046016931533813,
                                },
                            ],
                        },
                        Id: 'd7d3ad78-80a8-4ef7-90f9-62a09f9a9efa',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.87939453125,
                        Text: 'jump!',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07787369936704636,
                                Height: 0.019962700083851814,
                                Left: 0.3498679995536804,
                                Top: 0.8844251036643982,
                            },
                            Polygon: [
                                {
                                    X: 0.3498679995536804,
                                    Y: 0.8844251036643982,
                                },
                                {
                                    X: 0.4277417063713074,
                                    Y: 0.8844251036643982,
                                },
                                {
                                    X: 0.4277417063713074,
                                    Y: 0.9043877720832825,
                                },
                                {
                                    X: 0.3498679995536804,
                                    Y: 0.9043877720832825,
                                },
                            ],
                        },
                        Id: '45388177-7319-480b-a522-678e6a436cb6',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.15473175048828,
                        Text: 'Morfran',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10327204316854477,
                                Height: 0.01809954084455967,
                                Left: 0.43648356199264526,
                                Top: 0.8843866586685181,
                            },
                            Polygon: [
                                {
                                    X: 0.43648356199264526,
                                    Y: 0.8843866586685181,
                                },
                                {
                                    X: 0.5397555828094482,
                                    Y: 0.8843866586685181,
                                },
                                {
                                    X: 0.5397555828094482,
                                    Y: 0.9024862051010132,
                                },
                                {
                                    X: 0.43648356199264526,
                                    Y: 0.9024862051010132,
                                },
                            ],
                        },
                        Id: '3cebb14e-cce7-4634-8a26-d1b098b40791',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.8379898071289,
                        Text: 'laughs.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.09122402220964432,
                                Height: 0.021625399589538574,
                                Left: 0.5471809506416321,
                                Top: 0.8838726878166199,
                            },
                            Polygon: [
                                {
                                    X: 0.5471809506416321,
                                    Y: 0.8838726878166199,
                                },
                                {
                                    X: 0.6384049654006958,
                                    Y: 0.8838726878166199,
                                },
                                {
                                    X: 0.6384049654006958,
                                    Y: 0.9054980874061584,
                                },
                                {
                                    X: 0.5471809506416321,
                                    Y: 0.9054980874061584,
                                },
                            ],
                        },
                        Id: 'defb514d-11b6-454e-b48d-ab6235ea404a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.6435775756836,
                        Text: 'He',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.03561989963054657,
                                Height: 0.01745310053229332,
                                Left: 0.6466616988182068,
                                Top: 0.8849524259567261,
                            },
                            Polygon: [
                                {
                                    X: 0.6466616988182068,
                                    Y: 0.8849524259567261,
                                },
                                {
                                    X: 0.6822816133499146,
                                    Y: 0.8849524259567261,
                                },
                                {
                                    X: 0.6822816133499146,
                                    Y: 0.9024055004119873,
                                },
                                {
                                    X: 0.6466616988182068,
                                    Y: 0.9024055004119873,
                                },
                            ],
                        },
                        Id: '96918851-8999-4ac1-b812-7efee6aa242e',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.6206283569336,
                        Text: 'runs',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05811804160475731,
                                Height: 0.01377629954367876,
                                Left: 0.688326358795166,
                                Top: 0.8888136744499207,
                            },
                            Polygon: [
                                {
                                    X: 0.688326358795166,
                                    Y: 0.8888136744499207,
                                },
                                {
                                    X: 0.7464444041252136,
                                    Y: 0.8888136744499207,
                                },
                                {
                                    X: 0.7464444041252136,
                                    Y: 0.9025899767875671,
                                },
                                {
                                    X: 0.688326358795166,
                                    Y: 0.9025899767875671,
                                },
                            ],
                        },
                        Id: '0ff6c303-5ff9-4319-9b6f-ffa8c2cb26b8',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.73098754882812,
                        Text: 'after',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.05703260004520416,
                                Height: 0.01787710003554821,
                                Left: 0.7540156245231628,
                                Top: 0.8850300908088684,
                            },
                            Polygon: [
                                {
                                    X: 0.7540156245231628,
                                    Y: 0.8850300908088684,
                                },
                                {
                                    X: 0.8110482096672058,
                                    Y: 0.8850300908088684,
                                },
                                {
                                    X: 0.8110482096672058,
                                    Y: 0.9029071927070618,
                                },
                                {
                                    X: 0.7540156245231628,
                                    Y: 0.9029071927070618,
                                },
                            ],
                        },
                        Id: '1a7084ad-1cbe-47bc-8272-8fb7de203d90',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.45374298095703,
                        Text: 'it.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02525470033288002,
                                Height: 0.017385359853506088,
                                Left: 0.8183304071426392,
                                Top: 0.8851892352104187,
                            },
                            Polygon: [
                                {
                                    X: 0.8183304071426392,
                                    Y: 0.8851892352104187,
                                },
                                {
                                    X: 0.8435850739479065,
                                    Y: 0.8851892352104187,
                                },
                                {
                                    X: 0.8435850739479065,
                                    Y: 0.9025745987892151,
                                },
                                {
                                    X: 0.8183304071426392,
                                    Y: 0.9025745987892151,
                                },
                            ],
                        },
                        Id: '1ff65c93-7913-42e1-9df8-ebd50c0ee0d2',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.78630065917969,
                        Text: 'ground',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06339424103498459,
                                Height: 0.01590264029800892,
                                Left: 0.06562492996454239,
                                Top: 0.9017877578735352,
                            },
                            Polygon: [
                                {
                                    X: 0.06562492996454239,
                                    Y: 0.9017877578735352,
                                },
                                {
                                    X: 0.12901917099952698,
                                    Y: 0.9017877578735352,
                                },
                                {
                                    X: 0.12901917099952698,
                                    Y: 0.9176903963088989,
                                },
                                {
                                    X: 0.06562492996454239,
                                    Y: 0.9176903963088989,
                                },
                            ],
                        },
                        Id: '8f42936a-0669-4b39-8b8a-ac571e0166ed',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 88.5737533569336,
                        Text: 'we',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.021701419726014137,
                                Height: 0.008497119881212711,
                                Left: 0.13838405907154083,
                                Top: 0.9067845344543457,
                            },
                            Polygon: [
                                {
                                    X: 0.13838405907154083,
                                    Y: 0.9067845344543457,
                                },
                                {
                                    X: 0.16008548438549042,
                                    Y: 0.9067845344543457,
                                },
                                {
                                    X: 0.16008548438549042,
                                    Y: 0.9152816534042358,
                                },
                                {
                                    X: 0.13838405907154083,
                                    Y: 0.9152816534042358,
                                },
                            ],
                        },
                        Id: 'f1052164-9ca7-4a21-b09c-ac4846601dad',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 94.6457748413086,
                        Text: 'walk',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.034226421266794205,
                                Height: 0.012343499809503555,
                                Left: 0.16304422914981842,
                                Top: 0.9034888744354248,
                            },
                            Polygon: [
                                {
                                    X: 0.16304422914981842,
                                    Y: 0.9034888744354248,
                                },
                                {
                                    X: 0.19727064669132233,
                                    Y: 0.9034888744354248,
                                },
                                {
                                    X: 0.19727064669132233,
                                    Y: 0.9158324003219604,
                                },
                                {
                                    X: 0.16304422914981842,
                                    Y: 0.9158324003219604,
                                },
                            ],
                        },
                        Id: '32693f99-991b-4404-9457-4dcfff7568b5',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 98.0931167602539,
                        Text: 'on',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.018927739933133125,
                                Height: 0.00932134035974741,
                                Left: 0.0659475326538086,
                                Top: 0.9211885333061218,
                            },
                            Polygon: [
                                {
                                    X: 0.0659475326538086,
                                    Y: 0.9211885333061218,
                                },
                                {
                                    X: 0.08487527072429657,
                                    Y: 0.9211885333061218,
                                },
                                {
                                    X: 0.08487527072429657,
                                    Y: 0.9305098652839661,
                                },
                                {
                                    X: 0.0659475326538086,
                                    Y: 0.9305098652839661,
                                },
                            ],
                        },
                        Id: '8d9229ac-90cc-4c6d-8615-16f191400665',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 91.06929016113281,
                        Text: 'this',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.02645372413098812,
                                Height: 0.011786360293626785,
                                Left: 0.08814730495214462,
                                Top: 0.9191312193870544,
                            },
                            Polygon: [
                                {
                                    X: 0.08814730495214462,
                                    Y: 0.9191312193870544,
                                },
                                {
                                    X: 0.1146010309457779,
                                    Y: 0.9191312193870544,
                                },
                                {
                                    X: 0.1146010309457779,
                                    Y: 0.9309175610542297,
                                },
                                {
                                    X: 0.08814730495214462,
                                    Y: 0.9309175610542297,
                                },
                            ],
                        },
                        Id: '520c5de0-bad2-4519-949a-23c4221234e6',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.3107681274414,
                        Text: 'When',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.07478106021881104,
                                Height: 0.018928900361061096,
                                Left: 0.24277228116989136,
                                Top: 0.9126697182655334,
                            },
                            Polygon: [
                                {
                                    X: 0.24277228116989136,
                                    Y: 0.9126697182655334,
                                },
                                {
                                    X: 0.3175533413887024,
                                    Y: 0.9126697182655334,
                                },
                                {
                                    X: 0.3175533413887024,
                                    Y: 0.9315986037254333,
                                },
                                {
                                    X: 0.24277228116989136,
                                    Y: 0.9315986037254333,
                                },
                            ],
                        },
                        Id: '5ab3985c-9644-4ae2-932c-07bd82af157a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.7265853881836,
                        Text: "Merlin's",
                        Geometry: {
                            BoundingBox: {
                                Width: 0.10164698958396912,
                                Height: 0.01828859932720661,
                                Left: 0.3247418701648712,
                                Top: 0.9125317931175232,
                            },
                            Polygon: [
                                {
                                    X: 0.3247418701648712,
                                    Y: 0.9125317931175232,
                                },
                                {
                                    X: 0.42638885974884033,
                                    Y: 0.9125317931175232,
                                },
                                {
                                    X: 0.42638885974884033,
                                    Y: 0.9308204054832458,
                                },
                                {
                                    X: 0.3247418701648712,
                                    Y: 0.9308204054832458,
                                },
                            ],
                        },
                        Id: 'fb653f1f-1eb3-476e-9019-89ac16e48d9a',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.49809265136719,
                        Text: 'mother',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08980350941419601,
                                Height: 0.018171099945902824,
                                Left: 0.4359719157218933,
                                Top: 0.913015604019165,
                            },
                            Polygon: [
                                {
                                    X: 0.4359719157218933,
                                    Y: 0.913015604019165,
                                },
                                {
                                    X: 0.5257754325866699,
                                    Y: 0.913015604019165,
                                },
                                {
                                    X: 0.5257754325866699,
                                    Y: 0.9311866760253906,
                                },
                                {
                                    X: 0.4359719157218933,
                                    Y: 0.9311866760253906,
                                },
                            ],
                        },
                        Id: 'c6e10e44-727e-4eb4-8239-61e72d2c3a0b',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.79023742675781,
                        Text: 'arrives,',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.09246066212654114,
                                Height: 0.018566610291600227,
                                Left: 0.5325460433959961,
                                Top: 0.9140934348106384,
                            },
                            Polygon: [
                                {
                                    X: 0.5325460433959961,
                                    Y: 0.9140934348106384,
                                },
                                {
                                    X: 0.6250066757202148,
                                    Y: 0.9140934348106384,
                                },
                                {
                                    X: 0.6250066757202148,
                                    Y: 0.9326600432395935,
                                },
                                {
                                    X: 0.5325460433959961,
                                    Y: 0.9326600432395935,
                                },
                            ],
                        },
                        Id: '994f2a53-2dad-48a1-93a9-d4ffd320dab0',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.78643798828125,
                        Text: 'the',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.04083976894617081,
                                Height: 0.019999980926513672,
                                Left: 0.6327084302902222,
                                Top: 0.9121136665344238,
                            },
                            Polygon: [
                                {
                                    X: 0.6327084302902222,
                                    Y: 0.9121136665344238,
                                },
                                {
                                    X: 0.6735482215881348,
                                    Y: 0.9121136665344238,
                                },
                                {
                                    X: 0.6735482215881348,
                                    Y: 0.9321136474609375,
                                },
                                {
                                    X: 0.6327084302902222,
                                    Y: 0.9321136474609375,
                                },
                            ],
                        },
                        Id: 'e7e79b66-0c0d-4396-88c1-2a840eb85ff3',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.49103546142578,
                        Text: 'bullies',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.08066049963235855,
                                Height: 0.019522789865732193,
                                Left: 0.6810815930366516,
                                Top: 0.9121657609939575,
                            },
                            Polygon: [
                                {
                                    X: 0.6810815930366516,
                                    Y: 0.9121657609939575,
                                },
                                {
                                    X: 0.761742115020752,
                                    Y: 0.9121657609939575,
                                },
                                {
                                    X: 0.761742115020752,
                                    Y: 0.9316885471343994,
                                },
                                {
                                    X: 0.6810815930366516,
                                    Y: 0.9316885471343994,
                                },
                            ],
                        },
                        Id: '567a443a-e596-47cf-b7dc-95ce3c001f08',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 99.51933288574219,
                        Text: 'leave.',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.06868290156126022,
                                Height: 0.019159769639372826,
                                Left: 0.7686896920204163,
                                Top: 0.9125468730926514,
                            },
                            Polygon: [
                                {
                                    X: 0.7686896920204163,
                                    Y: 0.9125468730926514,
                                },
                                {
                                    X: 0.8373726010322571,
                                    Y: 0.9125468730926514,
                                },
                                {
                                    X: 0.8373726010322571,
                                    Y: 0.9317066669464111,
                                },
                                {
                                    X: 0.7686896920204163,
                                    Y: 0.9317066669464111,
                                },
                            ],
                        },
                        Id: 'fd872385-5cd1-417e-b36d-27e5fe31dd2e',
                    },
                    {
                        BlockType: 'WORD',
                        Confidence: 95.49703216552734,
                        Text: '4',
                        Geometry: {
                            BoundingBox: {
                                Width: 0.011703968048095703,
                                Height: 0.013266210444271564,
                                Left: 0.048014335334300995,
                                Top: 0.9593043327331543,
                            },
                            Polygon: [
                                {
                                    X: 0.048014335334300995,
                                    Y: 0.9593043327331543,
                                },
                                {
                                    X: 0.0597183033823967,
                                    Y: 0.9593043327331543,
                                },
                                {
                                    X: 0.0597183033823967,
                                    Y: 0.972570538520813,
                                },
                                {
                                    X: 0.048014335334300995,
                                    Y: 0.972570538520813,
                                },
                            ],
                        },
                        Id: 'a1f96545-0ed1-48f2-bb17-5d32653b7b7d',
                    },
                ],
            },
        };
        mock.add({
            method: 'GET',
            path: '/ocr-result/_doc/TPSDM06_11',
        }, () => response);
    }
}