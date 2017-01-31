// import {Directive, ElementRef, Input, Component} from '@angular/core';
import {Directive, ElementRef, Input} from '@angular/core';
// import {MathJax} from '@types/mathjax';
import katex from 'katex';
//import { contrib } from "../../node_modules/katex/dist/contrib/auto-renderer.min.js";

 // import * from '@types/katex';
//import katex ;

@Directive({
    selector: '[Katex]'
})
export class KatexDirective {
    @Input('Katex') KatexInput: string;
    constructor(private el: ElementRef) {
    }
    ngOnChanges() {
      //console.log(contrib);
      console.log('>> ngOnChanges');
      let input = this.KatexInput.replace('`','').replace('`','').replace('$','').replace('$','').replace('$','').replace('$','').replace('/\\/g','\\\\').replace('`','').replace('/\\/g','\\\\');
        //this.el.nativeElement.style.backgroundColor = 'yellow';
        console.log('input');
        console.log(input);
      katex.render(input,this.el.nativeElement);
      /*
      http://stackoverflow.com/questions/38181548/render-math-in-node-js-template-with-katex?rq=1
      // old angluar: doas auto-render
      // https://github.com/tfoxy/angular-katex/blob/master/angular-katex.js
      this.el.nativeElement.innerHTML = this.KatexInput;
      katex.renderMathInElement(
        this.el.nativeElement,
        [
          {left: "$$", right: "$$", display: true},
          {left: "\\[", right: "\\]", display: true},
          {left: "\\(", right: "\\)", display: false}
        ]
        );*/
      //console.log(this.KatexInput);
      //katex.render("c = \\pm\\sqrt{a^2 + b^2}", this.el.nativeElement);
    }
}
