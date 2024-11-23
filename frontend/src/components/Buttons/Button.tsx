type BtnVarients = "primary" | "secondary" | "ghost";
type BtnSizeVarients = "sm" | "md" | "lg";

interface ButtonProps {
  variant: BtnVarients;
  size?: BtnSizeVarients;
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  customStyle? : object
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
      customStyle += "text-indigo-900";
      break;
    default:
      customStyle += "bg-indigo-700 text-white";
      break;
  }
  switch (btnSize) {
    case "lg":
        customStyle += " px-10 py-4"
      break;
    case "sm" :
      customStyle += " p-2"
    break;
    default:
      customStyle += " px-8 py-3";
      break;
  }
  return customStyle;
}

function Button(props: ButtonProps) {
  return (
    <button
      style={props.customStyle}
      onClick={props.onClick}
      className={`hover:bg-opacity-70 transition-all flex flex-nowrap items-center justify-center gap-2 rounded-md leading-none ${getStyleClassForBtn(props.variant, props.size || "md")} items-center justify-center`}
    >
      {props?.startIcon && <div>{props.startIcon}</div>}
      <p className="">{props.text}</p>
      {props?.endIcon && <div>{props.endIcon}</div>}
    </button>
  );
}

export default Button;
