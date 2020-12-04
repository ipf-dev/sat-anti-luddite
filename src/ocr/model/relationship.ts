export default class Relationship {
    readonly type: string;
    readonly ids: string[];

    public constructor(relationship: any) {
        this.type = relationship.Type;
        this.ids = relationship.Ids;
    }
}