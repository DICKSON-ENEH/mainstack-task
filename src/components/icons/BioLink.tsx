interface BioLinkProps {
  isHovered?: boolean;
}

const BioLink = ({ isHovered = false }: BioLinkProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5073 12.9H8.50732C6.15732 12.9 4.25732 11 4.25732 8.65V8.25C4.25732 5.9 6.15732 4 8.50732 4H12.5073C14.8573 4 16.7573 5.9 16.7573 8.25V8.65C16.7573 10.99 14.8473 12.9 12.5073 12.9Z"
        stroke={
          isHovered ? "url(#paint0_linear_19708_1448)" : "url(#paint0_grey)"
        }
        strokeWidth="2.7"
        strokeMiterlimit="10"
      />
      <path
        d="M16.7773 16.9H12.7773C10.4273 16.9 8.52734 15 8.52734 12.65V12.25C8.52734 9.9 10.4273 8 12.7773 8H16.7773C19.1273 8 21.0273 9.9 21.0273 12.25V12.65C21.0273 15 19.1273 16.9 16.7773 16.9Z"
        stroke={
          isHovered ? "url(#paint1_linear_19708_1448)" : "url(#paint1_grey)"
        }
        strokeWidth="2.7"
        strokeMiterlimit="10"
      />
      <path
        d="M5.4575 18.6L5.2075 18.99C5.1475 19.09 5.0275 19.12 4.9375 19.06L3.6575 18.3C3.5575 18.24 3.5275 18.12 3.5875 18.03L3.8375 17.64C3.8975 17.54 3.8675 17.42 3.7675 17.37L3.0975 16.98C2.9675 16.9 2.9675 16.71 3.0975 16.63L6.4375 14.75C6.5775 14.67 6.7375 14.77 6.7375 14.93L6.6975 18.77C6.6975 18.92 6.5275 19.02 6.3975 18.94L5.7275 18.55C5.6475 18.47 5.5175 18.51 5.4575 18.6Z"
        fill={
          isHovered ? "url(#paint2_linear_19708_1448)" : "url(#paint2_grey)"
        }
      />
      <defs>
        {/* Color gradients for hover */}
        <linearGradient
          id="paint0_linear_19708_1448"
          x1="2.89818"
          y1="8.44539"
          x2="18.1055"
          y2="8.44539"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#870FFF" />
          <stop offset="1" stopColor="#E7CFFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_19708_1448"
          x1="7.16915"
          y1="12.4546"
          x2="22.3765"
          y2="12.4546"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDDCD" />
          <stop offset="1" stopColor="#FF5403" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_19708_1448"
          x1="3.66394"
          y1="15.6385"
          x2="7.30948"
          y2="17.8092"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCFF1C" />
          <stop offset="1" stopColor="#FF9D0A" />
        </linearGradient>

        <linearGradient
          id="paint0_grey"
          x1="2.89818"
          y1="8.44539"
          x2="18.1055"
          y2="8.44539"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A0A0A0" />
          <stop offset="1" stopColor="#D0D0D0" />
        </linearGradient>
        <linearGradient
          id="paint1_grey"
          x1="7.16915"
          y1="12.4546"
          x2="22.3765"
          y2="12.4546"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C0C0C0" />
          <stop offset="1" stopColor="#808080" />
        </linearGradient>
        <linearGradient
          id="paint2_grey"
          x1="3.66394"
          y1="15.6385"
          x2="7.30948"
          y2="17.8092"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0B0B0" />
          <stop offset="1" stopColor="#909090" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BioLink;
