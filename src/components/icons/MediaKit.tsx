interface MediaKitProps {
  isHovered?: boolean;
}

const MediaKit = ({ isHovered = false }: MediaKitProps) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8403 2.37V8.47C13.8403 8.86 13.5303 9.17 13.1403 9.17H7.98027C7.59027 9.17 7.28027 8.86 7.28027 8.47V7.5H2.98027C2.59027 7.5 2.28027 7.19 2.28027 6.8V0.7C2.28027 0.31 2.59027 0 2.98027 0H8.14027C8.53027 0 8.84027 0.31 8.84027 0.7V1.67H13.1403C13.5203 1.67 13.8403 1.99 13.8403 2.37Z"
        fill={
          isHovered ? "url(#paint0_linear_19708_1460)" : "url(#paint0_grey)"
        }
      />
      <path
        d="M9.59 11.6299H0.7C0.31 11.6299 0 11.3199 0 10.9299V3.99993C0 3.60993 0.31 3.29993 0.7 3.29993H9.59C9.98 3.29993 10.29 3.60993 10.29 3.99993V10.9299C10.29 11.3199 9.98 11.6299 9.59 11.6299Z"
        fill={
          isHovered ? "url(#paint1_linear_19708_1460)" : "url(#paint1_grey)"
        }
      />
      <path
        d="M19.3 18.89H0.7C0.31 18.89 0 18.58 0 18.19V5.91997C0 5.52997 0.31 5.21997 0.7 5.21997H19.3C19.69 5.21997 20 5.52997 20 5.91997V18.19C20 18.58 19.69 18.89 19.3 18.89Z"
        fill={
          isHovered ? "url(#paint2_linear_19708_1460)" : "url(#paint2_grey)"
        }
      />
      <defs>
        <linearGradient
          id="paint0_linear_19708_1460"
          x1="2.27548"
          y1="4.58745"
          x2="13.8365"
          y2="4.58745"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCFF1C" />
          <stop offset="1" stopColor="#FF9D0A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_19708_1460"
          x1="0"
          y1="7.46731"
          x2="10.293"
          y2="7.46731"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E7CFFF" />
          <stop offset="1" stopColor="#870FFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_19708_1460"
          x1="0"
          y1="12.0593"
          x2="20"
          y2="12.0593"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03FFE5" />
          <stop offset="1" stopColor="#14B348" />
        </linearGradient>

        <linearGradient
          id="paint0_grey"
          x1="2.27548"
          y1="4.58745"
          x2="13.8365"
          y2="4.58745"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C0C0C0" />
          <stop offset="1" stopColor="#909090" />
        </linearGradient>
        <linearGradient
          id="paint1_grey"
          x1="0"
          y1="7.46731"
          x2="10.293"
          y2="7.46731"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0D0D0" />
          <stop offset="1" stopColor="#A0A0A0" />
        </linearGradient>
        <linearGradient
          id="paint2_grey"
          x1="0"
          y1="12.0593"
          x2="20"
          y2="12.0593"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B0B0B0" />
          <stop offset="1" stopColor="#808080" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MediaKit;
