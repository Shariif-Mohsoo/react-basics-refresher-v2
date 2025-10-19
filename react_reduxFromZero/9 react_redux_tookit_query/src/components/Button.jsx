import classNames from "classnames";
import { GoSync } from "react-icons/go";

//Testing the classNames JS library.

// let finalClassName = classNames("px-3", "py-1.3", "bg-blue-300");
// console.log(finalClassName);

// finalClassName = classNames("px-1.4", {
//   "bg-blue-500": true,
//   "text-red-200": false,
// });
// console.log(finalClassName);

const Button = ({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}) => {
  //rest is an object with remaning keys.
  // console.log(rest);

  const classes = classNames(
    rest.className,
    "flex items-center  px-3 py-1.5 border",
    {
      "border-blue-500": primary,
      "border-gray-900": secondary,
      "border-green-500": success,
      "border-yellow-400": warning,
      "border-red-500": danger,

      // Only apply bg and text-white when not outlined
      "bg-blue-500 text-white": primary && !outline,
      "bg-gray-900 text-white": secondary && !outline,
      "bg-green-500 text-white": success && !outline,
      "bg-yellow-400 text-white": warning && !outline,
      "bg-red-500 text-white": danger && !outline,

      "rounded-full": rounded,
      "bg-white": outline,

      // Outline text colors
      "text-blue-500": outline && primary,
      "text-gray-500": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-500": outline && warning,
      "text-red-500": outline && danger,
    }
  );

  return (
    <button disabled={loading} {...rest} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
};

Button.propTypes = {
  checkVariationValue: (props) => {
    console.log(props);
    const { primary, secondary, success, warning, danger } = props;
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    console.log("Variation count:", count);

    if (count > 1) {
      return new Error(
        `Invalid props combination in <${componentName}>: Only one of primary, secondary, success, warning, or danger can be true.`
      );
    }
    return null;
  },
};

export default Button;
