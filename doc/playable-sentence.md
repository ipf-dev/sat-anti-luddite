# Playable sentence

## 🔮 Elastic search

### Stage

- Domain: sat-stage-anti-luddite
- Index: playable-sentence
- Endpoint: [https://search-sat-stage-anti-luddite-ccybc63h3f65mernaaxc7yryie.ap-northeast-2.es.amazonaws.com](https://search-sat-stage-anti-luddite-ccybc63h3f65mernaaxc7yryie.ap-northeast-2.es.amazonaws.com/)

### Production

- Domain: sat-prod-anti-luddite
- Index: playable-sentence
- Endpoint: [https://search-sat-prod-anti-luddite-s2kxzzso4x7ubni7ikq4dreccu.ap-northeast-2.es.amazonaws.com](https://search-sat-prod-anti-luddite-s2kxzzso4x7ubni7ikq4dreccu.ap-northeast-2.es.amazonaws.com/)

### 데이터 예시

```json
{
	"text": "They were on a beach, but it was very different from most beaches.",
	"bid": "TPSRI35",
	"page": 5,
	"audio": [
		{
			"pronunciation": "US",
			"url": "https://playable-sentence.s3.ap-northeast-2.amazonaws.com/mhvXdrZT4jP5T8vBxuvm75-US.mp3"
		},
		{
			"pronunciation": "UK",
			"url": "https://playable-sentence.s3.ap-northeast-2.amazonaws.com/mhvXdrZT4jP5T8vBxuvm75-UK.mp3"	
		}
	]
}
```

## 🧚‍ Rest API

### 기본 정보

#### Base URL

- Stage: [https://dw0wlqiegh.execute-api.ap-northeast-2.amazonaws.com/stage](https://dw0wlqiegh.execute-api.ap-northeast-2.amazonaws.com/stage)
- Prod:  [https://dw0wlqiegh.execute-api.ap-northeast-2.amazonaws.com/production](https://dw0wlqiegh.execute-api.ap-northeast-2.amazonaws.com/production)

#### Authentication

`x-api-key` 또는 `X-API-Key` 헤더에 환경에 맞는 secret key를 포함한다.

- Stage: `4TbU8CkDrs2RQk7uDuNWV2`
- Prod: `wu76dxucjuQ2Pg4vfVg4G5`

#### HTTP Status

- `200`: OK
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

### GET /api/sentence

재생 가능한 문장 조회

#### Parameters
|Name|M/O|설명|예시|
|---|---|---|---|
|bid|optional|문장을 포함한 도서의 bid|TPSRI35|
|includes|optional|문장이 포함한 단어|beach|
|from|optional|(defailt: 0)	검색 결과 중 건너뛸 문장의 수|30|
|size|optional|(defailt: 10)	한 번에 조회하고 싶은 문장 수|30|

#### Response 예시

```json
{
	"total": 1,
	"sentence": [
		{
			"text": "They were on a beach, but it was very different from most beaches.",
			"bid": "TPSRI35",
			"page": 5,
			"audio": [
				{
					"pronunciation": "US",
					"url": "https://playable-sentence.s3.ap-northeast-2.amazonaws.com/mhvXdrZT4jP5T8vBxuvm75-US.mp3"
				},
				{
					"pronunciation": "UK",
					"url": "https://playable-sentence.s3.ap-northeast-2.amazonaws.com/mhvXdrZT4jP5T8vBxuvm75-UK.mp3"	
				}
			]
		}
	]
}
```

### POST /api/sentence

재생 가능한 문장 추가

#### Parameters
|Name|M/O|설명|   
|---|---|---|  
|sentence|mandatory|문장 array. 최소 하나 이상의 object를 포함 해야 함|
|sentence[].text|mandatory|문장 내용 텍스트|
|sentence[].bid|optional|문장을 포함한 도서의 bid|
|sentence[].page|optional|문장을 포함한 도서의 페이지|
|sentence[].audio|mandatory|음원 파일 array. 최소 하나 이상의 object를 포함 해야 함|
|sentence[].audio[].pronunciation|optional(default: US)|발음. UK 또는 US.|
|sentence[].audio[].url|mandatory|음원 파일 URL|

#### Request 예시

```json
{
	"sentence": [
		{
			"text": "They were on a beach, but it was very different from most beaches.",
			"bid": "TPSRI35",
			"page": 5,
			"audio": [
				{
					"pronunciation": "US",
					"url": "https://hostname.com/filename1.mp3"
				},
				{
					"pronunciation": "UK",
					"url": "https://hostname.com/filename2.mp3"
				}
			]
		}
	]
}
```

#### Response

생성에 성공한 경우 HTTP Status 201 응답을 반환합니다.
