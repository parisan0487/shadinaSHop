const LoadingSpinner = () => {
  return (
    <svg className="pl w-24 h-24 ml-[35rem] mt-32" viewBox="0 0 240 240">
      <circle
        className="pl__ring pl__ring--a animate-ringA"
        cx="120"
        cy="120"
        r="105"
        fill="none"
        stroke="#f42f25"
        strokeWidth="20"
        strokeDasharray="0 660"
        strokeDashoffset="-330"
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--b animate-ringB"
        cx="120"
        cy="120"
        r="35"
        fill="none"
        stroke="#f49725"
        strokeWidth="20"
        strokeDasharray="0 220"
        strokeDashoffset="-110"
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--c animate-ringC"
        cx="85"
        cy="120"
        r="70"
        fill="none"
        stroke="#255ff4"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
      <circle
        className="pl__ring pl__ring--d animate-ringD"
        cx="155"
        cy="120"
        r="70"
        fill="none"
        stroke="#f42582"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LoadingSpinner;
