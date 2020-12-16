# Anti Luddite

Anti Luddite는 음성/이미지 인식 기술을 이용하여 Spindle Books의 페이지 내 음원 데이터 저작을 자동화하고, 재생 가능한 문장 데이터의 구축 및 활용을 담당하는 어플리케이션 입니다.

## 개발 환경
* nodejs 12.x
* [serverless](https://www.serverless.com/)
* TypeScript
* Jest

## Serverless Command

### 배포
`deploy` 명령어를 통해 배포합니다.

alias 옵션으로 환경(`production`, `stage`)을 명시합니다. 명시하지 않을 경우 디폴트 값은 `stage` 입니다.

```shell script
serverless deploy --alias {environmnet}
```

### 함수 호출
`invoke` 명령어를 통해 로컬 환경의 함수를 테스트 파라미터와 함께 호출할 수 있습니다.

```shell script
serverless invoke local --function {function-name} --path test/params/{function-name}.json
```

## 람다 함수
### STT

| Lambda function      | Description                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request-stt-analysis | S3 버킷에 업로드된 음원 파일에 대한 Transcribe 분석 작업을 요청합니다. S3 버킷에 음원 파일 업로드시, S3 Object의 파일명은 `{BID}_{US or UK}_{SEQ}.mp3` 으로 합니다. (e.g. TPSBS90_US_01.mp3) 파일명은 그대로 Elastic Search의 `stt-result`와 `stt-sentence` index에서 도큐먼트 아이디가 됩니다. 또한 US or UK 값에 따라 음원 분석 작업 시의 언어코드 설정이 달라집니다.                                                    |
| save-stt-result      | Transcribe 작업 완료 이벤트를 수신하여, 분석 결과물인 JSON 파일을 Elastic Search의 `stt-result`  index에 저장합니다. SNS 퍼블리시를 통해 `stt-sent-tokenize` 함수를 호출한 뒤 종료합니다.                                                                                                                                                                                                           |

### OCR

| Lambda function                      | Description                                                                                                                                                                                                                                                                                                                   |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| request-ocr-analysis-and-save-result | S3 버킷에 저장된 이미지로 Textract OCR 분석 요청 수행한 뒤 그 결과를 Elastic Search의 `ocr-result` index에 저장합니다. SNS 퍼블리시를 통해 `ocr-body-filter` 함수를 호출한 뒤 종료합니다.                                                                                                                                     |
| ocr-body-filter                      | Textract의 OCR 기술로 인식된 결과 텍스트를 Elastic Search의 `ocr-result` index로 부터 가져온 뒤 텍스트의 위치, 형태와 본문 이미지를 기반으로 각각의 텍스트 요소로 분류합니다. 분류가 완료된 결과물을 Elastic Search의 `ocr-categorized` index에 저장하고 SNS 퍼블리시를 통해 `ocr-sent-tokenize` 함수를 호출한 뒤 종료합니다. |

### Sentence Binder

| Lambda function       | Description                                                                       |
|-----------------------|-----------------------------------------------------------------------------------|
| request-bind-sentence | OCR 인식 결과와 STT 인식 결과를 분석 후 조합하여, SAT Audio Element를 생성합니다. |

### Playable Sentence API

| Lambda function       | Description                                   |
|-----------------------|-----------------------------------------------|
| get-playable-sentence | 재생 가능한 문장을 조회하는 API를 제공합니다. |
| add-playable-sentence | 재생 가능한 문장을 추가하는 API를 제공합니다. |

## Unit testing
Jest 프레임워크를 사용합니다. 테스트 파일은 `test` 폴더 하위에 `{filename}.test.ts` 이름으로 생성합니다. `_init.js` 스크립트는 각 테스트 파일의 테스트 수행 전에 실행되어 환경 변수 설정의 역할을 합니다. 

아래의 명령어를 통해 전체 Unit 테스트를 실행합니다.

```shell script
npm t
```
