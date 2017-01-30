import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  formulae : String;
  laplace : String;
  sinat : String;
  sqrtt : String;
  katexx : String;
  fromjson : String;
  largee : String;

  constructor(public navCtrl: NavController) {
    this.formulae = "sum_(i=1)^n i^3=((n(n+1))/2)^2";
    this.laplace  = "f(t)=L^-1{F(s)}";
    this.sinat    = "sin(at)=a/(s^2 + a^2)"
    this.sqrtt    = "sqrt t= sqrt pi/(2s^(3/2))"
    this.katexx   = 'f(x) = \int_{-\infty}^\infty'
    this.fromjson = "1\cdot 3=1+1+1" // $1\\cdot 3=1+1+1$
    // escape stupid slashes!!!!
    this.largee = "\\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)"
  }

}
