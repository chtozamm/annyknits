export const SettingsIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
    />
  </svg>
);

// export const ShuffleIcon = ({ className }: { className: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 16 16"
//     strokeWidth={0.5}
//     strokeLinejoin="round"
//     stroke="currentColor"
//     className={className}
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M10.7499 1H9.99987V2.5H10.7499H12.4392L1.46954 13.4697L0.939209 14L1.99987 15.0607L2.5302 14.5303L13.4987 3.56182V5.25V6H14.9987V5.25V2C14.9987 1.44772 14.551 1 13.9987 1H10.7499Z"
//       fill="currentColor"
//     ></path>
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M6.0002 7.06067L5.46983 6.53038L1.4691 2.53034L0.938721 2.00005L1.99929 0.939301L2.52967 1.46959L6.5304 5.46963L7.06077 5.99992L6.0002 7.06067ZM12.4377 13.4994H10.7499H9.99994V14.9994H10.7499H13.9994C14.5517 14.9994 14.9994 14.5517 14.9994 13.9994V10.75V9.99999H13.4994V10.75V12.4398L10.5305 9.46978L10.0003 8.93934L8.93944 9.99979L9.46966 10.5302L12.4377 13.4994Z"
//       fill="currentColor"
//     ></path>
//   </svg>
// );

export const ArrowLeftIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

export const ArrowRightIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

export const XIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

export const PlusIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const ChevronUpIcon = ({
  className,
  strokeWidth,
}: {
  className: string;
  strokeWidth: string | number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    shapeRendering="geometricPrecision"
    className={className}
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

export const ChevronDownIcon = ({
  className,
  strokeWidth,
}: {
  className: string;
  strokeWidth: string | number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    shapeRendering="geometricPrecision"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);
