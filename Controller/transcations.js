import { TranscationModel } from "../Database/model/transcation.js";

export async function searchTranscation(req, res) {
  const searchQ = req.query.search;
  console.log(searchQ);
  const monthQ = req.query.month;
  const pageQ = req.query.page;
  const skipPages = parseInt(pageQ) * 10;
  var updateMonthQ = `-${monthQ}-`;
  try {
    const result = await TranscationModel.find({
      $or: [
        { description: { $regex: searchQ, $options: "i" } },
        { title: { $regex: searchQ, $options: "i" } },
      ],
      dateOfSale: { $regex: updateMonthQ },
    })
      .skip(skipPages - 10)
      .limit(10);
    if (result) {
      res.send({ status: true, data: result });
    } else {
      res.send({ status: false, message: "failed to find" });
    }
  } catch (error) {
    res.send({ status: false, message: "internal error" });
  }
}
export async function deleteAllTranscations(req, res) {
  try {
    const result = await TranscationModel.deleteMany();
    if (result) {
      res.send({ message: "deleted", count: result });
    } else {
      res.send("failed");
    }
  } catch (error) {
    res.send("internal server error");
  }
}
export async function transcationStatistics(req, res) {
  const result = await getMonthTranscations(req.query.month);
  res.send(getTranscationStatics(result));
}
export async function barChartRange(req, res) {
  const result = await getMonthTranscations(req.query.month);
  console.log(req);
  var resp = await getBarChart(result);
  res.send(resp);
}
export async function pieChartOfTranscation(req, res) {
  const result = await getMonthTranscations(req.query.month);
  res.send(getPieChart(result));
}
export async function getAllTranscationInfo(req, res) {
  try {
  } catch (error) {}
  const result = await getMonthTranscations(req.query.month);
  res.send({
    pieChart: getPieChart(result),
    barChart: getBarChart(result),
    statistics: getTranscationStatics(result),
  });
}
function getIndexOfPrice(price) {
  if (price >= 0 && price <= 100) {
    return 0;
  } else if (price > 100 && price <= 200) {
    return 1;
  } else if (price > 200 && price <= 300) {
    return 2;
  } else if (price > 300 && price <= 400) {
    return 3;
  } else if (price > 400 && price <= 500) {
    return 4;
  } else if (price > 500 && price <= 600) {
    return 5;
  } else if (price > 600 && price <= 700) {
    return 6;
  } else if (price > 700 && price <= 800) {
    return 7;
  } else if (price > 800 && price <= 900) {
    return 8;
  } else if (price > 900) {
    return 9;
  }
}
async function getMonthTranscations(monthQ) {
  var updateMonthQ = `-${monthQ}-`;
  const result = await TranscationModel.find({
    dateOfSale: { $regex: updateMonthQ },
  });
  return result;
}
function getTranscationStatics(result) {
  try {
    var totalSaleAmount = 0;
    var totalSold = 0;

    if (result) {
      for (var transcation of result) {
        if (transcation.sold) {
          totalSold += 1;
          totalSaleAmount += transcation.price;
        }
      }
      return {
        totalSaleAmount: totalSaleAmount,
        totalSold: totalSold,
        totalNotSold: result.length - totalSold,
        status: true,
      };
    } else {
      return {
        status: false,
        message: "No Transcations",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "internal error",
    };
  }
}
async function getBarChart(result) {
  try {
    var priceRange = [
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
      {
        count: 0,
      },
    ];
    for (var transcation of result) {
      console.log(getIndexOfPrice(transcation.price));
      priceRange[getIndexOfPrice(transcation.price)].count += 1;
    }
    return {
      data: priceRange,
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      message: "internal error",
    };
  }
}
function getPieChart(result) {
  try {
    var category = {};
    var tempMap = new Map();
    for (var transcation of result) {
      if (tempMap.has(transcation.category)) {
        category[transcation.category] += 1;
      } else {
        tempMap.set(transcation.category, 0);
        category = { ...category, [transcation.category]: 1 };
      }
    }
    return {
      status: true,
      data: category,
    };
  } catch (error) {
    return {
      status: false,
      message: "internal error",
    };
  }
}
