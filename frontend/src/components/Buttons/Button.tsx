import SpinnerLoader from "../Loaders/SpinnerLoader";

type BtnVarients = "primary" | "secondary" | "ghost";
type BtnSizeVarients = "sm" | "md" | "lg";

interface ButtonProps {
  variant: BtnVarients;
  size?: BtnSizeVarients;
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  customStyle? : object;
  contentPosition?: string;
  textHidden?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function getStyleClassForBtn(
  styleVarient: BtnVarients,
  btnSize: BtnSizeVarients
): string {
  let customStyle = "";

  switch (styleVarient) {
    case "primary":
      customStyle += "bg-indigo-700 text-white";
      break;
    case "secondary":
      customStyle += "bg-indigo-200 text-indigo-900";
      break;
    case "ghost":
      customStyle += "text-gray-950 hover:bg-gray-300";
      break;
    default:
      customStyle += "bg-indigo-700 text-white";
      break;
  }
  switch (btnSize) {
    case "lg":
        customStyle += " px-10 py-4 text-lg"
      break;
    case "sm" :
      customStyle += " p-1 text-sm";
    break;
    default:
      customStyle += " px-6 py-3 md:text-base";
      break;
  }
  return customStyle;
}

function Button(props: ButtonProps) {
  return (
    <button
    type="button"
      disabled={props?.disabled || props?.loading}
      style={props.customStyle}
      onClick={props.onClick}
      className={`hover:bg-opacity-70 transition-all select-none ${props?.disabled && "opacity-50 cursor-not-allowed"} flex flex-nowrap items-center justify-${props?.contentPosition || "center"} gap-2 md:gap-3 rounded-md leading-none ${getStyleClassForBtn(props.variant, props.size || "md")}`}
    >
      {props?.startIcon && <div>{props.startIcon}</div>}
      <div className={`${props.textHidden && "hidden"}`}>{props?.loading ? <SpinnerLoader radius={6}/> : <p>{props.text}</p>}</div>
      {props?.endIcon && <div>{props.endIcon}</div>}
    </button>
  );
}

export default Button;
