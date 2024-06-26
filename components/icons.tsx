import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  HomeIcon,
  User,
  UserIcon,
} from "lucide-react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  github: (props: IconProps) => (
    <div className="inline-flex items-center justify-center whitespace-nowrap hover:cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 32 32">
        <path
          fillRule="evenodd"
          d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"></path>
      </svg>
    </div>
  ),
  home: (props: IconProps) => <HomeIcon />,

  low: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
      <path
        d="M12.5 6.1c.5-.3 1.1-.1 1.4.4.3.5.1 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.6-.2-.7-.9-.4-1.3.2-.5.9-.7 1.3-.4L8 8.8l4.5-2.7z"
        fill="#0065ff"
      />
    </svg>
  ),
  lower: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
      <path
        d="M12.504883 8.14541c.5-.3 1.1-.1 1.4.4s.1 1-.4 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.2-.4.8-.6 1.3-.3l4.5 2.7 4.5-2.7z"
        fill="#0065ff"
      />
      <path
        d="M12.504883 3.84541c.5-.3 1.1-.2 1.4.3s.1 1.1-.4 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z"
        fill="#2684ff"
      />
    </svg>
  ),
  medium: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
      <path d="M3 5h10v2H3z" fill="#ff5630" />
      <path d="M3 9h10v2H3z" fill="#ff7452" />
    </svg>
  ),
  high: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
      <path
        d="M3.5 9.9c-.5.3-1.1.1-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3L8 7.2 3.5 9.9z"
        fill="#ff5630"
      />
    </svg>
  ),
  highest: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
      <path
        d="M3.47876 7.9c-.5.3-1.1.1-1.4-.4s-.1-1 .4-1.3l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.2.4-.8.6-1.3.3l-4.5-2.7-4.5 2.7z"
        fill="#ff5630"
      />
      <path
        d="M3.47876 12.2c-.5.3-1.1.2-1.4-.3s-.1-1.1.4-1.4l5-3c.3-.2.7-.2 1 0l5 3c.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3l-4.4-2.7-4.5 2.7z"
        fill="#ff7452"
      />
    </svg>
  ),
  bug: (props: IconProps) => (
    <svg
      width="112"
      height="112"
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4">
      <path
        d="M96 0H16C7.16344 0 0 7.16344 0 16V96C0 104.837 7.16344 112 16 112H96C104.837 112 112 104.837 112 96V16C112 7.16344 104.837 0 96 0Z"
        fill="#E5493A"
      />
    </svg>
  ),
  story: (props: IconProps) => (
    <svg
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4">
      <path
        d="M96 0H16C7.16344 0 0 7.16344 0 16V96C0 104.837 7.16344 112 16 112H96C104.837 112 112 104.837 112 96V16C112 7.16344 104.837 0 96 0Z"
        fill="#63BA3C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72 24H40C35.584 24 32 27.584 32 32V84C32 86.208 33.792 88 36 88C37.4 88 38.568 87.24 39.28 86.152L39.312 86.16L54.72 68.32C55.36 67.472 56.64 67.472 57.28 68.32L72.688 86.16L72.72 86.152C73.432 87.24 74.6 88 76 88C78.208 88 80 86.208 80 84V32C80 27.584 76.416 24 72 24Z"
        fill="white"
      />
    </svg>
  ),
  user: (props: IconProps) => <UserIcon />,
  eye: (props: IconProps) => <Eye />,
  chevronUp: (props: IconProps) => <ChevronUp />,
  chevronDown: (props: IconProps) => <ChevronDown />,
  chevronRight: (props: IconProps) => <ChevronRight />,
  chevronLeft: (props: IconProps) => <ChevronLeft {...props} />,
  login: (props: IconProps) => <User />,
};
