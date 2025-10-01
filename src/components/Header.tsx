import React from "react";
import { CreditCardIcon, RefreshIcon, ClockIcon } from "src/icons";

interface HeaderProps {
  lastUpdated?: string;
  nextUpdate?: string;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, nextUpdate }) => {
  return (
    <header className={"bg-white shadow-sm border-b border-gray-200"}>
      <div className={"max-w-4xl mx-auto px-4 py-8"}>
        <div className={"text-center"}>
          <div className={"flex items-center justify-center mb-4"}>
            <CreditCardIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className={"text-3xl font-bold text-gray-900"}>
              Credit Card Categories
            </h1>
          </div>

          <p className={"text-lg text-gray-600 mb-6 max-w-2xl mx-auto"}>
            Track quarterly cashback categories for Discover and Chase Freedom
            credit cards. Easily add upcoming categories to your Google
            Calendar.
          </p>

          <div
            className={
              "bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block"
            }
          >
            <div
              className={
                "flex items-center justify-center space-x-6 text-sm text-blue-800"
              }
            >
              {lastUpdated && (
                <div className={"flex items-center"}>
                  <RefreshIcon className="h-4 w-4 mr-2" />
                  <span>
                    Last updated: {new Date(lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              )}

              {nextUpdate && (
                <div className={"flex items-center"}>
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span>Next update: {nextUpdate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
