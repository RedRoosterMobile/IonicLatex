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
  cdot : String;
  katexx : String;
  fromjson : String;
  largee : String;
  largeeMj : String;

  constructor(public navCtrl: NavController) {
    this.formulae="$$\\left(\\begin{array}{c} distr \\\\ 8 \\\\ 19 \\\\ 17 \\\\1 \\end{array}\\right) $$";
    this.laplace="$$\\begin{pmatrix}\n5 & 7 & -1 \\\\\n-3 & 5 & -4 \\\\\n2 & 0 & 1 \n\\end{pmatrix} \\cdot \\left(\\begin{array}{c} 2 \\\\ -2 \\\\ -4 \\end{array}\\right)= $$";
    this.sinat="$$\\left(\\begin{array}{c} 0 \\\\ 0 \\\\ 0 \\end{array}\\right)$$";
    this.sqrtt="'**Sed** ut per{**spicia**}tis $a^{2}$ unde {*omnis*} iste natus error sit {voluptatem} accusantium {doloremque laudantium}, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae {dicta} {sunt} explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro nem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi conse{quatur?} Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla {pariatur} *kursiv* ?'";
    this.cdot = " your momma $(${a-b}$)^2 =a^2-2ab+b^2$ is awesome";

    this.largeeMj = "$(a+b)^2$ = {a²+2ab !! a²+2*a*b !! a*a+2*a*b !! a*a+2ab !! 2ab + a² !! 2*a*b + a² !! 2*a*b + a*a !! 2ab + a*a} $+b^2$";
    //this.largee = "Wir wenden auf den Zähler $x^2-4x+4$ des Ausgangsterms $\\frac{x^2-4x+4}{x-2}$ die zweite binomische Formel mit $(a-b)^2=a^2 -2ab + b^2$ an und erhalten somit den Bruch: $\\frac{(x-2)^2}{x-2}$.\n\nDa nun der Zähler und der Nenner denselben Faktor $(x-2)$ enthalten, können wir diesen kürzen und erhalten: $\\frac{x-2}{1}$.\n\nWenn im Nenner nur eine $1$ steht, können wir den Bruch vereinfachen zu: $x-2$.";
  }

}
