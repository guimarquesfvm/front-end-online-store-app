import React from "react";

function NotFilled() {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.9999 8.23565L15.6085 7.53039L12.3289 0L9.04939 7.54177L0.657959 8.23565L7.03031 13.6161L5.11627 21.6129L12.3289 17.3699L19.5416 21.6129L17.6392 13.6161L23.9999 8.23565ZM12.3289 15.2428L7.94064 17.825L9.10774 12.9564L5.23298 9.68031L10.3449 9.24805L12.3289 4.66384L14.3247 9.25942L19.4365 9.69168L15.5618 12.9677L16.7289 17.8363L12.3289 15.2428Z"
        fill="#94979D"
      />
    </svg>
  );
}

function Filled() {
  return (
    <svg
      width="31"
      height="28"
      viewBox="0 0 31 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.9202 10.6695L20.0489 9.75579L15.8002 0L11.5515 9.77053L0.680176 10.6695L8.9357 17.64L6.45602 28L15.8002 22.5032L25.1443 28L22.6798 17.64L30.9202 10.6695Z"
        fill="#94979D"
      />
    </svg>
  );
}

export default { Filled, NotFilled };
