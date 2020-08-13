# SAT Anti Luddite

SAT Anti Luddite는 음성/이미지 인식 기술을 이용하여 Spindle Books의 페이지 내 음원 데이터 저작을 자동화 하려는 목적으로 만들어진 Serverless 어플리케이션 입니다.

## 개발 환경
* nodejs 12.x
* [serverless](https://www.serverless.com/)

## Lambda functions
### 1. request-stt-analysis
S3 버킷으로부터 음원 파일 업로드시 이벤트 알림을 수신하여 해당 음원 파일에 대한 Transcribe 분석 작업을 요청합니다. S3 버킷에 별도로 이벤트 설정이 필요합니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```
serverless invoke local --function request-stt-analysis --data '{"Records":[{"s3": {"bucket": {"name":"your-s3-bucket-name"}, "object":{"key":"your-s3-object-key"}}}]}'
```

### 2. process-stt-analysis-result
Transcribe 작업 완료 이벤트를 수신하여, 분석 결과물인 JSON 파일을 Elastic Search의 `stt-result` index에 저장합니다. 별도의 CloudWatch 이벤트 설정이 필요 없습니다.

로컬 환경에서 함수 호출 시에는 아래의 명령어를 사용합니다.

```
serverless invoke local --function process-stt-analysis-result --data '{"detail": {"TranscriptionJobStatus": "COMPLETED","TranscriptionJobName": "your-transcription-job-name"}}'
```

## Environment variables

어플리케이션에서 사용중인 환경변수는 아래와 같습니다. 로컬 환경 실행을 위해서는 프로젝트 루트 디렉토리에 환경변수 설정파일(`environment-variables.yml`)을 추가해야 합니다.

|Name|Description|
|---|---|
|STT_OUTPUT_BUCKET|음원 분석 결과 저장용 ap-northeast-2 리젼 S3 버킷의 이름|
|ELASTIC_SEARCH_HOST|AWS Elastic Search 서비스 호스트 URL|