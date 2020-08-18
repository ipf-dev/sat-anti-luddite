import { ElasticSearch } from './elastic-search';
import Mock from '@elastic/elasticsearch-mock';

const mock = new Mock();

export class ElasticSearchMock extends ElasticSearch {
    constructor() {
        super();
        this.addMock();
    }

    // override
    getClientInitParam() {
        return {
            ...super.getClientInitParam(),
            Connection: mock.getConnection()
        };
    }

    addMock() {
        const truncatedResponse = {
            "_index" : "ocr-result",
            "_type" : "_doc",
            "_id" : "TPSDM06_9",
            "_version" : 1,
            "_seq_no" : 18,
            "_primary_term" : 1,
            "found" : true,
            "_source" : {
              "bid" : "TPSDM06",
              "page" : "9",
              "result" : [ // truncated
                {
                  "BlockType" : "PAGE",
                  "Geometry" : {
                    "BoundingBox" : {
                      "Width" : 1,
                      "Height" : 1,
                      "Left" : 0,
                      "Top" : 0
                    },
                    "Polygon" : [
                      {
                        "X" : 0,
                        "Y" : 0
                      },
                      {
                        "X" : 1,
                        "Y" : 0
                      },
                      {
                        "X" : 1,
                        "Y" : 1
                      },
                      {
                        "X" : 0,
                        "Y" : 1
                      }
                    ]
                  },
                  "Id" : "766661ed-380d-49cc-9d5d-e07dff9d8020",
                  "Relationships" : [
                    {
                      "Type" : "CHILD",
                      "Ids" : [
                        "a4bb5e77-cbfc-40ba-bb2c-99f07fe5f514",
                        "7c3cc275-cb49-4b15-83f1-1f477b041a21",
                        "2a2b77c5-72c0-47f0-ba40-e372ca2cac3e",
                        "830402d2-bb76-4f27-add7-33b67f37c3d1",
                        "c9360bbc-52cf-4152-9ebe-8529d6be32f5",
                        "2fba69b7-0aa1-40f1-8690-a86c0d9c9f28",
                        "8a39583f-655f-48e4-b531-60fd08c14dd4",
                        "74455e28-0b37-401e-ac2d-13ecee184676",
                        "b2ab6f94-b645-4762-ad34-91e893098f24",
                        "b2b91ee3-29d1-4bb6-9b2e-3396c3996674",
                        "fe8f872e-9c92-4d76-ad97-2e976e61bfeb",
                        "2693abfa-716a-4d5f-b893-fd5db3e3c079",
                        "50f569fb-82dd-442b-bc49-79294284cfdd",
                        "669397b4-2938-484a-b436-80149df2a98e",
                        "4fd28123-6013-4a0f-968e-1865790e4e70",
                        "0e44098f-09ed-4a5f-8bdc-abeb65b857e1",
                        "e010f75d-193e-4bf1-9bae-4deed66544d8",
                        "8981abc3-8d08-4b31-91a4-7ad7c9dee973",
                        "e8bf33f7-7aa6-4907-80cd-e201bedcac78",
                        "21abff30-cd73-457f-a34f-497ceb8741f3",
                        "d7321215-6fcc-46c0-9044-1ac29343923e"
                      ]
                    }
                  ]
                },
                {
                  "BlockType" : "LINE",
                  "Confidence" : 99.66389465332031,
                  "Text" : "toad a small fat",
                  "Geometry" : {
                    "BoundingBox" : {
                      "Width" : 0.12100633978843689,
                      "Height" : 0.012469083070755005,
                      "Left" : 0.06528374552726746,
                      "Top" : 0.08759814500808716
                    },
                    "Polygon" : [
                      {
                        "X" : 0.06528374552726746,
                        "Y" : 0.08759814500808716
                      },
                      {
                        "X" : 0.18629008531570435,
                        "Y" : 0.08759814500808716
                      },
                      {
                        "X" : 0.18629008531570435,
                        "Y" : 0.10006722807884216
                      },
                      {
                        "X" : 0.06528374552726746,
                        "Y" : 0.10006722807884216
                      }
                    ]
                  },
                  "Id" : "a4bb5e77-cbfc-40ba-bb2c-99f07fe5f514",
                  "Relationships" : [
                    {
                      "Type" : "CHILD",
                      "Ids" : [
                        "48bb62f2-4521-4fbe-b327-1967a0e68353",
                        "c72bb6ae-4490-4a71-92b7-7c09386c5d72",
                        "4f143d8e-8a64-4b94-bb6f-ecc18e998b24",
                        "ba83fb59-fa1f-4fd4-b8c3-2f90a3d8d96a"
                      ]
                    }
                  ]
                },
                {
                  "BlockType" : "LINE",
                  "Confidence" : 98.67277526855469,
                  "Text" : "Merlin's only friend is a toad. One day, Merlin visits",
                  "Geometry" : {
                    "BoundingBox" : {
                      "Width" : 0.6444903016090393,
                      "Height" : 0.020967727527022362,
                      "Left" : 0.24206608533859253,
                      "Top" : 0.08295702189207077
                    },
                    "Polygon" : [
                      {
                        "X" : 0.24206608533859253,
                        "Y" : 0.08295702189207077
                      },
                      {
                        "X" : 0.8865563869476318,
                        "Y" : 0.08295702189207077
                      },
                      {
                        "X" : 0.8865563869476318,
                        "Y" : 0.10392475128173828
                      },
                      {
                        "X" : 0.24206608533859253,
                        "Y" : 0.10392475128173828
                      }
                    ]
                  },
                  "Id" : "7c3cc275-cb49-4b15-83f1-1f477b041a21",
                  "Relationships" : [
                    {
                      "Type" : "CHILD",
                      "Ids" : [
                        "742c440d-5da0-4057-bee1-98310facec18",
                        "97b3aeed-4240-4aa0-9f6b-f0539bf422f6",
                        "75f4df74-2d27-4f2a-809b-84de8fb6025c",
                        "f2485964-fa25-4eb2-aa83-c8e5ecf769d6",
                        "f494c1ce-0c06-4d04-b87b-5b841854783f",
                        "21b864ba-5cc6-4350-96ac-a5a3d6d528d4",
                        "5185034c-061e-4fc2-ad39-d32401b34d35",
                        "b8fcb52c-4871-4a01-acd7-657a336436d2",
                        "e0ce9e9e-a37b-4239-960c-76d95ea69293",
                        "038c655f-2b0b-4b47-aa3b-cfd40f603577"
                      ]
                    }
                  ]
                },
              ]
            }
          };
        mock.add({
            method: 'GET',
            path: '/ocr-result/_doc/TPSDM06_9'
          }, () => truncatedResponse);
    }
}