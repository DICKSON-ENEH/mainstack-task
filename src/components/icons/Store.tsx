interface StoreProps {
  isHovered?: boolean;
}

const Store = ({ isHovered = false }: StoreProps) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M26.9998 30.0599H12.9798C12.6298 30.0599 12.3398 29.7799 12.3398 29.4199V15.3999C12.3398 15.0499 12.6198 14.7599 12.9798 14.7599H26.9998C27.3498 14.7599 27.6398 15.0399 27.6398 15.3999V29.4199C27.6398 29.7699 27.3498 30.0599 26.9998 30.0599Z"
          fill={
            isHovered ? "url(#paint0_linear_19708_1452)" : "url(#paint0_grey)"
          }
        />
        <path
          d="M28.4602 23.72L15.5902 13.22C15.1302 12.84 15.3902 12.09 15.9902 12.09H28.8602C29.2102 12.09 29.5002 12.37 29.5002 12.73V23.24C29.5002 23.77 28.8802 24.06 28.4602 23.72Z"
          fill={
            isHovered ? "url(#paint1_linear_19708_1452)" : "url(#paint1_grey)"
          }
        />
        <path
          d="M11.54 21.58L24.41 11.07C24.87 10.69 24.61 9.94 24.01 9.94H11.14C10.79 9.94 10.5 10.22 10.5 10.58V21.09C10.5 21.62 11.12 21.92 11.54 21.58Z"
          fill={
            isHovered ? "url(#paint2_linear_19708_1452)" : "url(#paint2_grey)"
          }
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_19708_1452"
          x1="12.3418"
          y1="22.4112"
          x2="27.6375"
          y2="22.4112"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9868" />
          <stop offset="1" stopColor="#FF5403" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_19708_1452"
          x1="15.3529"
          y1="17.9792"
          x2="29.5002"
          y2="17.9792"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03FFE5" />
          <stop offset="1" stopColor="#14B348" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_19708_1452"
          x1="10.5"
          y1="15.8319"
          x2="24.6472"
          y2="15.8319"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCFF1C" />
          <stop offset="1" stopColor="#FF9D0A" />
        </linearGradient>

        <linearGradient
          id="paint0_grey"
          x1="12.3418"
          y1="22.4112"
          x2="27.6375"
          y2="22.4112"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0B0B0" />
          <stop offset="1" stopColor="#808080" />
        </linearGradient>
        <linearGradient
          id="paint1_grey"
          x1="15.3529"
          y1="17.9792"
          x2="29.5002"
          y2="17.9792"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0A0A0" />
          <stop offset="1" stopColor="#707070" />
        </linearGradient>
        <linearGradient
          id="paint2_grey"
          x1="10.5"
          y1="15.8319"
          x2="24.6472"
          y2="15.8319"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C0C0C0" />
          <stop offset="1" stopColor="#909090" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Store;
