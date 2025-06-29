export const getSourceUrl = (source: string): string => {
  if (source.includes("Discover")) {
    return "https://www.discover.com/credit-cards/cashback-bonus/cashback-calendar";
  } else if (source.includes("Chase")) {
    return "https://www.chase.com/personal/credit-cards/freedom/freedomfive";
  }
  return "";
};

export const getSourceColor = (source: string): string => {
  if (source.includes("Discover")) {
    return "bg-orange-50 border-orange-200 text-orange-800";
  } else if (source.includes("Chase")) {
    return "bg-blue-50 border-blue-200 text-blue-800";
  }
  return "bg-gray-50 border-gray-200 text-gray-800";
};

export const getButtonColor = (source: string): string => {
  if (source.includes("Discover")) {
    return "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500";
  } else if (source.includes("Chase")) {
    return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  }
  return "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500";
};
