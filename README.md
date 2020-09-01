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
|STT_OUTPUT_BUCKET|음원 분석 결과 저장용 ap-northeast-2 리젼 S3 버킷의 이름|
|ELASTIC_SEARCH_HOST|AWS Elastic Search 서비스 호스트 URL|

## Lambda functions
### request-stt-analysis
S3 버킷으로부터 음원 파일 업로드시 이벤트 알림을 수신하여 해당 음원 파일에 대한 Transcribe 분석 작업을 요청합니다. S3 버킷에 별도로 이벤트 설정이 필요합니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```shell script
serverless invoke local --function request-stt-analysis --data '{"Records":[{"s3": {"bucket": {"name":"your-s3-bucket-name"}, "object":{"key":"your-s3-object-key"}}}]}'
```

### save-stt-result
Transcribe 작업 완료 이벤트를 수신하여, 분석 결과물인 JSON 파일을 Elastic Search의 `stt-result` index에 저장합니다. 별도의 CloudWatch 이벤트 설정이 필요 없습니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```shell script
serverless invoke local --function save-stt-result --data '{"detail": {"TranscriptionJobStatus": "COMPLETED","TranscriptionJobName": "your-transcription-job-name"}}'
```

### ocr-body-filter
Textract의 OCR 기술로 인식된 텍스트에 대해서 텍스트의 위치, 형태와 본문 이미지를 기반으로 각각의 텍스트 요소로 분류합니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```shell script
serverless invoke local --function ocr-body-filter --data '{"documentId": "your-ocr-result-document-id"}'
```

## Unit testing
Jest 프레임워크를 사용합니다. 테스트 파일은 `test` 폴더 하위에 `{filename}.test.ts` 이름으로 생성합니다. `_init.js` 스크립트는 각 테스트 파일의 테스트 수행 전에 실행되어 환경 변수 설정의 역할을 합니다. 

아래의 명령어를 통해 전체 Unit 테스트를 실행합니다.

```shell script
npm t
```