// import {Directive, ElementRef, Input, Component} from '@angular/core';
import {Directive, ElementRef, Input} from '@angular/core';
// import {MathJax} from '@types/mathjax';
import katex from 'katex';
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
      console.log('>> ngOnChanges');
      //let MathJax : any;
        //this.el.nativeElement.style.backgroundColor = 'yellow';
      katex.render(this.KatexInput,this.el.nativeElement);
      // this.el.nativeElement.innerHTML = this.KatexInput;
      console.log(this.KatexInput);
      //katex.render("c = \\pm\\sqrt{a^2 + b^2}", this.el.nativeElement);
      // using eval to prevent premature errors (load order) 
      // eval('MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.el.nativeElement])');
      // eval('MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.el.nativeElement])');


    }
}
