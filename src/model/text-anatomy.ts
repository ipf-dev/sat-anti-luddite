export default class TextAnatomy {
    public static REG_ASCENDER = /[bdfhijklt]+/;
    public static REG_DESCENDER = /[gjpqy]+/;
    public static REG_CAPITAL = /[A-Z]+/;
    private readonly text: string;
    private readonly ascender: boolean;
    private readonly descender: boolean;
    private readonly capital: boolean;

    public constructor(text: string) {
        this.text = text;
        this.ascender = TextAnatomy.REG_ASCENDER.test(text);
        this.descender = TextAnatomy.REG_DESCENDER.test(text);
        this.capital = TextAnatomy.REG_CAPITAL.test(text);
    }

    public hasAscender():boolean {
        return this.ascender;
    }

    public hasDescender(): boolean {
        return this.descender;
    }

    public hasCapital(): boolean {
        return this.capital;
    }

    public isFullHeight(): boolean {
        return (this.ascender || this.capital) && this.descender;
    }
}