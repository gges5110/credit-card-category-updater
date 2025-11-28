import React from "react";
import { GitHubIcon, AlertTriangleIcon } from "src/icons";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={"bg-gray-50 border-t border-gray-200 mt-16"}>
      <div className={"max-w-4xl mx-auto px-4 py-8"}>
        <div className={"text-center space-y-4"}>
          <div
            className={
              "flex items-center justify-center space-x-6 text-sm text-gray-600"
            }
          >
            <a
              className={
                "inline-flex items-center hover:text-gray-900 transition-colors duration-200"
              }
              href={"https://github.com/gges5110/credit-card-category-updater"}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              <GitHubIcon className={"h-4 w-4 mr-2"} />
              View on GitHub
            </a>

            <span className={"text-gray-400"}>•</span>

            <span>Data updates monthly via automated parsing</span>
          </div>

          <div className={"border-t border-gray-200 pt-4"}>
            <p className={"text-sm text-gray-500"}>
              &copy; {currentYear} Credit Card Category Tracker. This tool is
              not affiliated with Discover or Chase.
            </p>
            <p className={"text-xs text-gray-400 mt-2"}>
              Always verify categories and activation requirements directly with
              your credit card issuer.
            </p>
          </div>

          <div
            className={
              "bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left"
            }
          >
            <div className={"flex items-start"}>
              <div className={"flex-shrink-0"}>
                <AlertTriangleIcon
                  className={"h-5 w-5 text-yellow-400 mt-0.5"}
                />
              </div>
              <div className={"ml-3"}>
                <h3 className={"text-sm font-medium text-yellow-800"}>
                  Important Reminder
                </h3>
                <div className={"mt-1 text-sm text-yellow-700"}>
                  <p>
                    Remember to activate your quarterly categories to earn bonus
                    cashback. Activation is typically required before making
                    purchases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
