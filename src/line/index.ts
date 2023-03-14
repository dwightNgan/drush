import { ILineUpOptions, lineUp } from "./bresenham";


export class LineAlgo {
  lineUp: typeof lineUp = (a, b, plot, ) => lineUp(a, b, plot, { spacing: this.spacing, endPointValidate: this.endPointValidate });
  spacing: ILineUpOptions['spacing'] = 1
  endPointValidate: ILineUpOptions['endPointValidate'];
  setSpacing(spacing: number) {
    this.spacing = spacing;
  }
  setEndPointValidate(validate: ILineUpOptions['endPointValidate']) {
    this.endPointValidate = validate;
  }
}