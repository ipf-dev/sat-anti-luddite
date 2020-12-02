# SAT Anti Luddite

SAT Anti Luddite는 음성/이미지 인식 기술을 이용하여 Spindle Books의 페이지 내 음원 데이터 저작을 자동화 하려는 목적으로 만들어진 Serverless 어플리케이션 입니다.

## 개발 환경
* nodejs 12.x
* [serverless](https://www.serverless.com/)
* TypeScript
* Jest

### Environment variables
어플리케이션에서 사용중인 환경변수는 아래와 같습니다. 로컬 환경 실행을 위해서는 프로젝트 루트 디렉토리에 환경변수 설정파일(`environment-variables.yml`)을 추가해야 합니다.

|Name|Description|
|---|---|
|STT_TRIGGER_BUCKET|음원 분석 요청을 트리거하는 음원 업로드용 ap-northeast-2 리젼 S3 버킷의 이름|
|STT_OUTPUT_BUCKET|음원 분석 결과 저장용 ap-northeast-2 리젼 S3 버킷의 이름|
|ELASTIC_SEARCH_HOST|AWS Elastic Search 서비스 호스트 URL|
|TEXTRACT_REGION|request-ocr-analysis-and-save-result 함수에서 Textract 작업을 요청할 AWS 리젼|
|TEXTRACT_INPUT_BUCKET|request-ocr-analysis-and-save-result 함수에서 Textract 작업을 수행할 이미지가 저장된 버킷의 이름|
|SNS_OCR_SENT_TOKENIZE|ocr-sent-tokenize 함수를 invoke 하기 위한 SNS Topic ARN|
|SNS_STT_SENT_TOKENIZE|stt-sent-tokenize 함수를 invoke 하기 위한 SNS Topic ARN|

## Lambda functions
### request-stt-analysis
S3 버킷에 업로드된 음원 파일에 대한 Transcribe 분석 작업을 요청합니다.

S3 버킷에 음원 파일 업로드시, S3 Object의 파일명은 `{BID}_{US or UK}_{SEQ}.mp3`으로 합니다. (e.g. TPSBS90_US_01.mp3) 파일명은 그대로 Elastic Search의 `stt-result`와 `stt-sentence` index에서 도큐먼트 아이디가 됩니다. 또한 US or UK 값에 따라 음원 분석 작업 시의 언어코드 설정이 달라집니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```shell script
serverless invoke local --function request-stt-analysis --data '{"bucket":"your-s3-bucket", "s3Key": "path/to/object/TPSBC023_UK_01.mp3"}'
```

### save-stt-result
Transcribe 작업 완료 이벤트를 수신하여, 분석 결과물인 JSON 파일을 Elastic Search의 `stt-result` index에 저장합니다. SNS 퍼블리시를 통해 `stt-sent-tokenize` 함수를 호출한 뒤 종료합니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```shell script
serverless invoke local --function save-stt-result --data '{"detail": {"TranscriptionJobStatus": "COMPLETED","TranscriptionJobName": "your-transcription-job-name"}}'
```

### request-ocr-analysis-and-save-result
S3 버킷에 저장된 이미지로 Textract OCR 분석 요청 수행한 뒤 그 결과를 Elastic Search의 `ocr-result` index에 저장합니다. SNS 퍼블리시를 통해 `ocr-body-filter` 함수를 호출한 뒤 종료합니다.

```shell script
serverless invoke local --function request-ocr-analysis-and-save-result --path test/params/ocr-analysis-and-save-request.json
```

### ocr-body-filter
Textract의 OCR 기술로 인식된 결과 텍스트를 Elastic Search의 `ocr-result` index로 부터 가져온 뒤 텍스트의 위치, 형태와 본문 이미지를 기반으로 각각의 텍스트 요소로 분류합니다. 분류가 완료된 결과물을 Elastic Search의 `ocr-categorized` index에 저장하고 SNS 퍼블리시를 통해 `ocr-sent-tokenize` 함수를 호출한 뒤 종료합니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```shell script
serverless invoke local --function ocr-body-filter --data '{"Records": [{"Sns":{"Message":"{\"documentId\":\"your-ocr-result-document-id\"}"}}]}'
```

## Unit testing
Jest 프레임워크를 사용합니다. 테스트 파일은 `test` 폴더 하위에 `{filename}.test.ts` 이름으로 생성합니다. `_init.js` 스크립트는 각 테스트 파일의 테스트 수행 전에 실행되어 환경 변수 설정의 역할을 합니다. 

아래의 명령어를 통해 전체 Unit 테스트를 실행합니다.

```shell script
npm t
```