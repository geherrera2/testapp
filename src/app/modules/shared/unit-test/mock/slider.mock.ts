export class SlidesMock {
    _index: number = 0;
    _length: number = 6;
    // plt: PlatformMock;
    // _renderer: Renderer;
    // _zone: NgZone;

    public getActiveIndex(): number {
        return this._index;
    }

    public slideNext(): void {
        this._index++;
    }

    public slidePrevious(): void {
        this._index--;
    }

    public isEnd(): boolean {
        return this._index === this._length - 1;
    }

    public isBeginning(): boolean {
        return this._index === 0;
    }

    public initEvents(): boolean {
        return true;
    }
}