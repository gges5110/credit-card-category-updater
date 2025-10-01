import { Source } from "src/types";

export const getSourceUrl = (source: Source): string => {
  switch (source) {
    case "Discover":
      return "https://www.discover.com/credit-cards/cashback-bonus/cashback-calendar";
    case "Chase Freedom":
      return "https://www.chase.com/personal/credit-cards/freedom/freedomfive";
    default:
      return "";
  }
};

export const getSourceColor = (source: Source): string => {
  switch (source) {
    case "Discover":
      return "bg-orange-50 border-orange-200 text-orange-800";
    case "Chase Freedom":
      return "bg-blue-50 border-blue-200 text-blue-800";
    default:
      return "bg-gray-50 border-gray-200 text-gray-800";
  }
};

export const getButtonColor = (source: Source): string => {
  switch (source) {
    case "Discover":
      return "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500";
    case "Chase Freedom":
      return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
    default:
      return "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500";
  }
};
