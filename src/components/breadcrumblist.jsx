import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

export function BreadcrumbWithCustomSeparator({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-gray-500">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <li>
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              </li>
            )}
            <li>
              {index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-500 font-medium">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
