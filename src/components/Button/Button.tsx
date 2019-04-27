import { AlumisButton, AlumisButtonAttributes } from "@alumis/button";
import * as cssClasses from "./_button.scss";

export class Button extends AlumisButton {

  constructor(attrs: AlumisButtonAttributes, children: any[]) {

    super(attrs, children, cssClasses as any);
  }
}