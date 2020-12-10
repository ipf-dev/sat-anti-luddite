import esb from 'elastic-builder';

type GetSentenceRequestBuilderParam = {
    bid?: string,
    text?: string,
    includes?: string,
    from?: number,
    size?: number,
};

export default class GetSentenceRequestBuilder {
    private readonly bid?: string;
    private readonly text?: string;
    private readonly includes?: string;
    private readonly from?: number;
    private readonly size?: number;
    private query: esb.BoolQuery;
    private search: esb.RequestBodySearch;

    constructor(param: GetSentenceRequestBuilderParam) {
        this.bid = param.bid;
        this.text = param.text;
        this.includes = param.includes;
        this.from = param.from;
        this.size = param.size;
        this.query = esb.boolQuery();
        this.search = esb.requestBodySearch();
    }

    public build(): esb.RequestBodySearch {
        this.buildQuery();
        this.buildPagination();
        return this.search;
    }

    private buildQuery() {
        if (this.bid) this.buildBidQuery();
        if (this.text) this.buildTextQuery();
        if (this.includes) this.buildIncludesQuery();
        this.search.query(this.query);
    }

    private buildBidQuery() {
        this.query = this.query
            .must(esb.termQuery('bid.keyword', this.bid));
    }

    private buildTextQuery() {
        this.query = this.query
            .must(esb.termQuery('text.keyword', this.text));
    }

    private buildIncludesQuery() {
        this.query = this.query
            .must(esb.matchQuery('text', this.includes))
            .should(esb.matchPhraseQuery('text', this.includes));
    }

    private buildPagination() {
        if (this.from) this.search = this.search.from(this.from);
        if (this.size) this.search = this.search.size(this.size);
    }
}
