declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react";

  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.jpg?*" {
  const src: string;
  export default src;
}

declare module "*.jpeg?*" {
  const src: string;
  export default src;
}

declare module "*.png?*" {
  const src: string;
  export default src;
}
