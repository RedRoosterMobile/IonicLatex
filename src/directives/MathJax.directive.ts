// import {Directive, ElementRef, Input, Component} from '@angular/core';
import {Directive, ElementRef, Input} from '@angular/core';
// import {MathJax} from '@types/mathjax';
// import 'MathJax';
declare var MathJax: any;

import '../../node_modules/mathjax/MathJax.js'

@Directive({
    selector: '[MathJax]'
})
export class MathJaxDirective {
    @Input('MathJax') MathJaxInput: string;
    constructor(private el: ElementRef) {
    }
    /*ngOnChanges() {
      console.log('>> ngOnChanges');
      //let MathJax : any;
        //this.el.nativeElement.style.backgroundColor = 'yellow';
      this.el.nativeElement.innerHTML = this.MathJaxInput;
      console.log(this.MathJaxInput);
      // using eval to prevent premature errors (load order) 
      eval('MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.el.nativeElement])');
      eval('MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.el.nativeElement])');
}*/
    ngOnChanges() {
        this.el.nativeElement.innerHTML = this.MathJaxInput;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
    }
}
