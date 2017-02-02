import {Directive, ElementRef, Input} from '@angular/core';
import katex from 'katex';
// import renderMathInElement from 'katex/contrib';
// dunno..
// import { renderMathInElement } from 'auto-renderer';
// import { renderMathInElement } from "../../node_modules/katex/dist/contrib/auto-renderer.min.js";

@Directive({
    selector: '[Katex]'
})
export class KatexDirective {
    @Input('Katex') KatexInput: string;

    inlineOptions : any;

    constructor(private el: ElementRef) {
      // HACK to get renderMathInElement working
      // there is no @types/.. for that..
      // renderMathInElement depends on window.katex
      if (!window['katex']) {
        window['katex'] = katex
      }
      this.inlineOptions = {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ]
      };
    }
    ngOnChanges() {
      this.el.nativeElement.innerHTML = this.KatexInput;
      // another type circumvention HACK
      window['renderMathInElement'](this.el.nativeElement, this.inlineOptions);
    }
}
