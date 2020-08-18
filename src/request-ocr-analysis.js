const Textract = require('./module/aws/textract');
const ElasticSearch = require('./module/aws/elastic-search');

const textract = new Textract();
const elasticSearch = new ElasticSearch();

module.exports.OCRAnalysisJPG = async (event, context, callback) => {
    const bid = 'TPSDM06';
    const page = event.page;

    const ocrResult = await textract.detectDocumentText({ key: `${bid}/${String(page).padStart(2, '0')}.jpg` });
    const documentBody = {
        bid: bid,
        page: page,
        result: ocrResult.Blocks,
    };
    const result = await elasticSearch.index({
        id: `${bid}_${page}`,
        index: 'ocr-result',
        body: documentBody,
    });
    console.log(result);
};


module.exports.requestOCRAnalysisPDF = async (event, context, callback) => {
    const bid = event.bid;
    const ocrResult = await textract.startDocumentTextDetection({ key: `${bid}/${bid}.pdf` });
    console.log(ocrResult);
};

module.exports.saveOCRAnalysisResultPDF = async (event) => {
    const jobId = event.jobId;
    const bid = event.bid;
    const page = 0;

    const ocrResult = await textract.getDocumentTextDetection({ jobId });
    const documentBody = {
        bid: bid,
        page: page,
        result: ocrResult.Blocks,
    };
    const result = await elasticSearch.index({
        id: `${bid}_${page}`,
        index: 'ocr-result',
        body: documentBody,
    });
    console.log(result);
};