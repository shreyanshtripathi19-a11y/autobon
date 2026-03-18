import Image from "next/image";
import Link from "next/link";

const NullDataInfo = ({
  title,
  description,
  buttonLabel,
  href = "",
}: {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
}) => {
  return (
    <div className="w-full bg-gray-100 flex flex-row justify-between gap-x-4 md:gap-x-16 items-center rounded-2xl p-4 md:p-8">
      <Image
        src={"/CarNotFound.svg"}
        width={10}
        height={10}
        alt="car icon"
        className="md:h-32 md:w-44 h-16 w-20"
      />
      <div className="flex flex-col items-start justify-center gap-y-6 flex-1">
        <div>
          {title && (
            <p className="font-semibold text-gray-800 mb-2 md:text-base text-sm">
              {title}
            </p>
          )}
          {description && (
            <p className="text-gray-600 md:text-base text-xs">{description}</p>
          )}
        </div>
        {buttonLabel && (
          <Link
            href={href}
            className="font-semibold text-white bg-gray-800 rounded-full md:px-4 py-1.5 px-3 text-sm md:text-base"
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default NullDataInfo;
