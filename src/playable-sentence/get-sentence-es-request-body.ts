import esb from 'elastic-builder';

export type GenerateParam = {
    bid?: string,
    text?: string,
    includes?: string,
    from?: number,
    size?: number,
};

export default class GetSentenceEsRequestBody {
    public static generate(param: GenerateParam): object {
        let search = esb.requestBodySearch();
        search = GetSentenceEsRequestBody.appendQuery(search, param.bid, param.text, param.includes);
        search = GetSentenceEsRequestBody.appendPagination(search, param.from, param.size);
        return search.toJSON();
    }

    private static appendQuery(search: esb.RequestBodySearch, bid?: string, text?: string, includes?: string): esb.RequestBodySearch {
        let query = esb.boolQuery();
        if (bid) query = this.appendBidQuery(query, bid);
        if (text) query = this.appendTextQuery(query, text);
        if (includes) query = this.appendIncludesQuery(query, includes);
        return search.query(query);
    }

    private static appendBidQuery(query: esb.BoolQuery, bid: string): esb.BoolQuery {
        return query.must(esb.termQuery('bid.keyword', bid));
    }

    private static appendTextQuery(query: esb.BoolQuery, text: string): esb.BoolQuery {
        return query.must(esb.termQuery('text.keyword', text));
    }

    private static appendIncludesQuery(query: esb.BoolQuery, includes: string): esb.BoolQuery {
        return query.must(esb.matchQuery('text', includes))
            .should(esb.matchPhraseQuery('text', includes));
    }

    private static appendPagination(oldSearch: esb.RequestBodySearch, from?: number, size?: number): esb.RequestBodySearch {
        let newSearch = oldSearch;
        if (from) newSearch = newSearch.from(from);
        if (size) newSearch = newSearch.size(size);
        return newSearch;
    }
}
