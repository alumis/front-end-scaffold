import { AlumisTextInput, IAlumisTextInputAttributes } from "@alumis/textinput";
import * as cssClasses from "../../theme/_forms.scss";

export class TextInput extends AlumisTextInput {

  constructor(attrs: IAlumisTextInputAttributes) {

    super(attrs, cssClasses as any);
  }
}